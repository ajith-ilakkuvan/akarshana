import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { updateCategory } from "@/lib/actions/adminCategories";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await db.category.findUnique({ where: { id } });
  if (!category) notFound();

  const boundAction = updateCategory.bind(null, category.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Category</h1>
      <div className="mt-6">
        <CategoryForm
          action={boundAction}
          submitLabel="Save Changes"
          category={{
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
            image: category.image ?? "",
            sortOrder: category.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
