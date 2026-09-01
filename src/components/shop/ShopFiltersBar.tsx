"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryOption {
  slug: string;
  name: string;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopFiltersBar({ categories, metals }: { categories: CategoryOption[]; metals: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`.replace(/\?$/, ""));
  }

  const activeCategory = searchParams.get("category") ?? "";
  const activeMetal = searchParams.get("metal") ?? "";
  const activeSort = searchParams.get("sort") ?? "newest";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <FilterPill active={activeCategory === ""} onClick={() => updateParam("category", "")}>
          All
        </FilterPill>
        {categories.map((category) => (
          <FilterPill
            key={category.slug}
            active={activeCategory === category.slug}
            onClick={() => updateParam("category", category.slug)}
          >
            {category.name}
          </FilterPill>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {metals.length > 1 && (
          <select
            value={activeMetal}
            onChange={(event) => updateParam("metal", event.target.value)}
            className="rounded-full border border-charcoal/20 bg-white px-4 py-2 text-sm text-charcoal"
            aria-label="Filter by metal"
          >
            <option value="">All Metals</option>
            {metals.map((metal) => (
              <option key={metal} value={metal}>
                {metal}
              </option>
            ))}
          </select>
        )}
        <select
          value={activeSort}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="rounded-full border border-charcoal/20 bg-white px-4 py-2 text-sm text-charcoal"
          aria-label="Sort products"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-brand-black bg-brand-black text-white"
          : "border-charcoal/20 text-charcoal hover:border-brand-black",
      )}
    >
      {children}
    </button>
  );
}
