"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/adminProducts";

export function DeleteProductButton({ productId, productName }: { productId: string; productName: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${productName}"? This can't be undone (products with existing orders are deactivated instead).`)) {
      return;
    }
    startTransition(() => deleteProduct(productId));
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${productName}`}
      className="text-charcoal/50 hover:text-red-600 disabled:opacity-40"
    >
      <Trash2 aria-hidden="true" className="size-4" />
    </button>
  );
}
