"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";
import { saveUploadedImage } from "@/lib/imageStorage";
import { productSchema } from "@/lib/validation/productSchema";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("Not authorized.");
}

export interface ProductFormState {
  error?: string;
}

function parseProductForm(formData: FormData) {
  const compareAtRaw = formData.get("compareAtPrice");
  const weightRaw = formData.get("weightGrams");

  return productSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase(),
    description: String(formData.get("description") ?? ""),
    price: Number(formData.get("price") ?? 0),
    compareAtPrice: compareAtRaw ? Number(compareAtRaw) : null,
    metal: String(formData.get("metal") ?? ""),
    purity: String(formData.get("purity") ?? ""),
    weightGrams: weightRaw ? Number(weightRaw) : null,
    gemstone: String(formData.get("gemstone") ?? ""),
    sku: String(formData.get("sku") ?? ""),
    stock: Number(formData.get("stock") ?? 0),
    featured: formData.get("featured") === "on",
    isActive: formData.get("isActive") !== "off",
    categoryId: String(formData.get("categoryId") ?? ""),
    images: [],
  });
}

async function uploadNewImages(formData: FormData): Promise<{ url: string; alt: string }[]> {
  const files = formData.getAll("newImages").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const uploaded: { url: string; alt: string }[] = [];
  for (const file of files) {
    const { url } = await saveUploadedImage(file);
    uploaded.push({ url, alt: "" });
  }
  return uploaded;
}

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };

  let newImages: { url: string; alt: string }[];
  try {
    newImages = await uploadNewImages(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  try {
    await db.product.create({
      data: {
        ...parsed.data,
        purity: parsed.data.purity || null,
        gemstone: parsed.data.gemstone || null,
        images: { create: newImages.map((image, index) => ({ ...image, sortOrder: index })) },
      },
    });
  } catch {
    return { error: "A product with that slug or SKU already exists." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products/");
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };

  let newImages: { url: string; alt: string }[];
  try {
    newImages = await uploadNewImages(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  const removedImageIds = formData.getAll("removeImage").map(String);
  const existingCount = await db.productImage.count({ where: { productId, id: { notIn: removedImageIds } } });

  const data = parsed.data;

  try {
    await db.$transaction([
      db.product.update({
        where: { id: productId },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price,
          compareAtPrice: data.compareAtPrice,
          metal: data.metal,
          purity: data.purity || null,
          gemstone: data.gemstone || null,
          weightGrams: data.weightGrams,
          sku: data.sku,
          stock: data.stock,
          featured: data.featured,
          isActive: data.isActive,
          categoryId: data.categoryId,
        },
      }),
      ...(removedImageIds.length
        ? [db.productImage.deleteMany({ where: { id: { in: removedImageIds }, productId } })]
        : []),
      ...(newImages.length
        ? [
            db.product.update({
              where: { id: productId },
              data: {
                images: {
                  create: newImages.map((image, index) => ({ ...image, sortOrder: existingCount + index })),
                },
              },
            }),
          ]
        : []),
    ]);
  } catch {
    return { error: "A product with that slug or SKU already exists." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${parsed.data.slug}`);
  redirect("/admin/products/");
}

export async function deleteProduct(productId: string): Promise<void> {
  await requireAdmin();
  try {
    await db.product.delete({ where: { id: productId } });
  } catch {
    // Product has existing orders referencing it (FK restrict) — deactivate
    // instead of deleting so past orders keep a valid product reference.
    await db.product.update({ where: { id: productId }, data: { isActive: false } });
  }
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
