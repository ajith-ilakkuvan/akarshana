import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "@/lib/actions/adminCategories";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Add Category</h1>
      <div className="mt-6">
        <CategoryForm action={createCategory} submitLabel="Create Category" />
      </div>
    </div>
  );
}
