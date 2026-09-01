import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/adminProducts";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    db.product.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: "asc" } } } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  const boundAction = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Product</h1>
      <div className="mt-6">
        <ProductForm
          action={boundAction}
          categories={categories}
          submitLabel="Save Changes"
          product={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            metal: product.metal,
            purity: product.purity ?? "",
            weightGrams: product.weightGrams,
            gemstone: product.gemstone ?? "",
            sku: product.sku,
            stock: product.stock,
            featured: product.featured,
            isActive: product.isActive,
            categoryId: product.categoryId,
            images: product.images.map((image) => ({ id: image.id, url: image.url, alt: image.alt })),
          }}
        />
      </div>
    </div>
  );
}
