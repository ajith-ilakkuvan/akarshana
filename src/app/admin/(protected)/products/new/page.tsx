import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/adminProducts";

export default async function NewProductPage() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Add Product</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} categories={categories} submitLabel="Create Product" />
      </div>
    </div>
  );
}
