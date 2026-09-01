/**
 * The kinds of gold items customers can bring in for valuation — shown in
 * the homepage's horizontally scrolling showcase (GoldItemsSection). Kept
 * to gold only, matching the services actually offered (see services.ts) —
 * no diamonds/silver, since those aren't part of the business.
 */

export interface GoldItemCategory {
  slug: string;
  label: string;
  icon: "gem" | "link" | "coins" | "package" | "crown" | "recycle";
}

export const goldItemCategories: GoldItemCategory[] = [
  { slug: "jewellery", label: "Gold Jewellery", icon: "gem" },
  { slug: "chains-bangles", label: "Chains & Bangles", icon: "link" },
  { slug: "coins", label: "Gold Coins", icon: "coins" },
  { slug: "bars", label: "Gold Bars", icon: "package" },
  { slug: "bridal-antique", label: "Bridal & Antique Sets", icon: "crown" },
  { slug: "old-broken", label: "Old / Broken Gold", icon: "recycle" },
];
