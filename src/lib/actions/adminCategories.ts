"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";
import { saveUploadedImage } from "@/lib/imageStorage";
import { categorySchema } from "@/lib/validation/productSchema";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("Not authorized.");
}

export interface CategoryFormState {
  error?: string;
}

async function resolveImage(formData: FormData, existing?: string | null): Promise<string> {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const { url } = await saveUploadedImage(file);
    return url;
  }
  return existing ?? "";
}

export async function createCategory(_prevState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  await requireAdmin();
  const parsed = categorySchema.safeParse({
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase(),
    description: String(formData.get("description") ?? ""),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid category data." };

  let image: string;
  try {
    image = await resolveImage(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  try {
    await db.category.create({ data: { ...parsed.data, description: parsed.data.description || null, image: image || null } });
  } catch {
    return { error: "A category with that slug already exists." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/collections");
  return {};
}

export async function updateCategory(
  categoryId: string,
  _prevState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireAdmin();
  const existing = await db.category.findUnique({ where: { id: categoryId } });
  const parsed = categorySchema.safeParse({
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase(),
    description: String(formData.get("description") ?? ""),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid category data." };

  let image: string;
  try {
    image = await resolveImage(formData, existing?.image);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  try {
    await db.category.update({
      where: { id: categoryId },
      data: { ...parsed.data, description: parsed.data.description || null, image: image || null },
    });
  } catch {
    return { error: "A category with that slug already exists." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/collections");
  return {};
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await requireAdmin();
  const productCount = await db.product.count({ where: { categoryId } });
  if (productCount > 0) return;
  await db.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/collections");
}
