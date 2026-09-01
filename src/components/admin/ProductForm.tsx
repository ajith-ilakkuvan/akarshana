"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import type { ProductFormState } from "@/lib/actions/adminProducts";

interface CategoryOption {
  id: string;
  name: string;
}

interface ExistingImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductDefaults {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  metal: string;
  purity: string;
  weightGrams: number | null;
  gemstone: string;
  sku: string;
  stock: number;
  featured: boolean;
  isActive: boolean;
  categoryId: string;
  images: ExistingImage[];
}

const emptyProduct: ProductDefaults = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  compareAtPrice: null,
  metal: "Gold",
  purity: "",
  weightGrams: null,
  gemstone: "",
  sku: "",
  stock: 0,
  featured: false,
  isActive: true,
  categoryId: "",
  images: [],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({
  action,
  categories,
  product = emptyProduct,
  submitLabel = "Save Product",
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  categories: CategoryOption[];
  product?: ProductDefaults;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(product.slug));
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  return (
    <form action={formAction} className="max-w-3xl space-y-6 rounded-2xl border border-charcoal/10 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Name</span>
          <input name="name" required value={name} onChange={(e) => handleNameChange(e.target.value)} className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Slug (URL)</span>
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
        <textarea name="description" required defaultValue={product.description} rows={4} className="input mt-1" />
      </label>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Price (₹)</span>
          <input type="number" name="price" min={0} required defaultValue={product.price} className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Compare-at Price (₹)</span>
          <input type="number" name="compareAtPrice" min={0} defaultValue={product.compareAtPrice ?? ""} className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Stock</span>
          <input type="number" name="stock" min={0} required defaultValue={product.stock} className="input mt-1" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Category</span>
          <select name="categoryId" required defaultValue={product.categoryId} className="input mt-1">
            <option value="" disabled>
              Choose a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">SKU</span>
          <input name="sku" required defaultValue={product.sku} className="input mt-1" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Metal</span>
          <input name="metal" required defaultValue={product.metal} className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Purity</span>
          <input name="purity" defaultValue={product.purity} placeholder="e.g. 22K" className="input mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Weight (grams)</span>
          <input type="number" step="0.1" name="weightGrams" defaultValue={product.weightGrams ?? ""} className="input mt-1" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-charcoal">Gemstone (optional)</span>
        <input name="gemstone" defaultValue={product.gemstone} className="input mt-1" />
      </label>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input type="checkbox" name="featured" defaultChecked={product.featured} />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input type="checkbox" name="isActive" defaultChecked={product.isActive} />
          Visible in shop
        </label>
      </div>

      {product.images.length > 0 && (
        <div>
          <span className="text-sm font-medium text-charcoal">Existing Photos</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {product.images.map((image) => {
              const marked = removedImages.includes(image.id);
              return (
                <label key={image.id} className="relative">
                  <div className={`relative size-20 overflow-hidden rounded-lg bg-cream ${marked ? "opacity-30" : ""}`}>
                    <Image src={image.url} alt={image.alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <input
                    type="checkbox"
                    name="removeImage"
                    value={image.id}
                    checked={marked}
                    onChange={(e) =>
                      setRemovedImages((current) =>
                        e.target.checked ? [...current, image.id] : current.filter((id) => id !== image.id),
                      )
                    }
                    className="absolute top-1 right-1"
                    aria-label={`Remove photo`}
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}

      <label className="block">
        <span className="text-sm font-medium text-charcoal">Add Photos</span>
        <input type="file" name="newImages" accept="image/*" multiple className="mt-1 block text-sm" />
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
