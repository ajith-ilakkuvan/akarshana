/**
 * The kinds of gold items customers can bring in for valuation — shown in
 * the homepage's horizontally scrolling showcase (GoldItemsSection). Kept
 * to gold only, matching the services actually offered (see services.ts) —
 * no diamonds/silver, since those aren't part of the business.
 */

export interface GoldItemCategory {
  slug: string;
  label: string;
  icon: "gem" | "link" | "coins" | "package" | "crown" | "recycle" | "sparkles";
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
    photo: { src: "/gold-items/jewellery.webp", alt: "Ornate gold temple-style necklace with pearl and floral detailing" },
  },
  {
    slug: "chains-bangles",
    label: "Bangles",
    icon: "link",
    photo: { src: "/gold-items/chains-bangles.webp", alt: "A pair of ornate gold bangles with intricate filigree detailing" },
  },
  {
    slug: "coins",
    label: "Gold Coins",
    icon: "coins",
    photo: { src: "/gold-items/coins.webp", alt: "A stack of plain gold coins with a few loose coins beside it" },
  },
  {
    slug: "bars",
    label: "Gold Bars",
    icon: "package",
    photo: { src: "/gold-items/bars.webp", alt: "Two stacked fine gold bars, 999.9 purity, 1000g each" },
  },
  {
    slug: "bridal-antique",
    label: "Bridal & Antique Sets",
    icon: "crown",
    photo: { src: "/gold-items/bridal-antique.webp", alt: "Antique temple-style gold necklace with a goddess and peacock motif pendant" },
  },
  {
    slug: "old-broken",
    label: "Old / Broken Gold",
    icon: "recycle",
    photo: { src: "/gold-items/old-broken.webp", alt: "Broken gold bangles, tangled chains and a cracked ring collected for valuation" },
  },
  {
    slug: "earrings",
    label: "Earrings",
    icon: "sparkles",
    photo: { src: "/gold-items/earrings.webp", alt: "Pair of ornate gold jhumka earrings with ruby-red stone drops" },
  },
];
