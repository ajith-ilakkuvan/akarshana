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
  /**
   * Real product photo, shown instead of the icon medallion once supplied
   * for that category. Categories without one yet fall back to the icon
   * treatment — see GoldItemsSection.
   */
  photo?: { src: string; alt: string };
}

export const goldItemCategories: GoldItemCategory[] = [
  {
    slug: "jewellery",
    label: "Gold Jewellery",
    icon: "gem",
    photo: { src: "/gold-items/jewellery.webp", alt: "Gold temple jewellery set with necklace, jhumka earrings and maang tikka" },
  },
  {
    slug: "chains-bangles",
    label: "Chains & Bangles",
    icon: "link",
    photo: { src: "/gold-items/chains-bangles.webp", alt: "Gold chain-set bangles with a matching necklace and jhumka earrings" },
  },
  { slug: "coins", label: "Gold Coins", icon: "coins" },
  { slug: "bars", label: "Gold Bars", icon: "package" },
  { slug: "bridal-antique", label: "Bridal & Antique Sets", icon: "crown" },
  {
    slug: "old-broken",
    label: "Old / Broken Gold",
    icon: "recycle",
    photo: { src: "/gold-items/old-broken.webp", alt: "A pile of old and broken gold jewellery, chains and rings" },
  },
];
