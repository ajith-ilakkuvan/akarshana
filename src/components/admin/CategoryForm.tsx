"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import type { CategoryFormState } from "@/lib/actions/adminCategories";

interface CategoryDefaults {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
}

const emptyCategory: CategoryDefaults = { name: "", slug: "", description: "", image: "", sortOrder: 0 };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CategoryForm({
  action,
  category = emptyCategory,
  submitLabel = "Save Category",
}: {
  action: (state: CategoryFormState, formData: FormData) => Promise<CategoryFormState>;
  category?: CategoryDefaults;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(category.slug));

  return (
    <form action={formAction} className="max-w-xl space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6">
      <input type="hidden" name="existingImage" value={category.image} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Name</span>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="input mt-1"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Slug</span>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="input mt-1"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Description</span>
        <textarea name="description" defaultValue={category.description} rows={3} className="input mt-1" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Sort Order</span>
        <input type="number" name="sortOrder" defaultValue={category.sortOrder} className="input mt-1" />
      </label>
      {category.image && (
        <div className="relative size-24 overflow-hidden rounded-lg bg-cream">
          <Image src={category.image} alt="" fill sizes="96px" className="object-cover" />
        </div>
      )}
      <label className="block">
        <span className="text-sm font-medium text-charcoal">Photo</span>
        <input type="file" name="image" accept="image/*" className="mt-1 block text-sm" />
      </label>
      {state.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-black-deep disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
