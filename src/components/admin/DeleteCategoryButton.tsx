"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/lib/actions/adminCategories";

export function DeleteCategoryButton({
  categoryId,
  categoryName,
  hasProducts,
}: {
  categoryId: string;
  categoryName: string;
  hasProducts: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (hasProducts) {
      alert(`Move or delete the products in "${categoryName}" first.`);
      return;
    }
    if (!confirm(`Delete category "${categoryName}"?`)) return;
    startTransition(() => deleteCategory(categoryId));
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${categoryName}`}
      className="text-charcoal/50 hover:text-red-600 disabled:opacity-40"
    >
      <Trash2 aria-hidden="true" className="size-4" />
    </button>
  );
}
