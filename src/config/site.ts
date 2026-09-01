/**
 * Central brand / site configuration.
 *
 * Change the business name, tagline, description or canonical URL here —
 * every page (metadata, structured data, footer) reads from this file.
 */

export const siteConfig = {
  name: "Prashwa Jewels",
  legalName: "Prashwa Jewels",
  /** Shown under the shop name in the storefront signage and footer. */
  sisterConcernOf: "Sister Concern of RV Thangamalikai",
  tagline: "Handcrafted Fine Jewels",
  description:
    "Prashwa Jewels is a premium jewellery boutique in Coimbatore, crafting handcrafted gold, diamond and bridal jewellery — shop our collections online or visit our palace-inspired store.",
  shortDescription: "Handcrafted fine jewels, from a palace-inspired boutique in Coimbatore.",
  /**
   * Update once the production domain is known. `||` (not `??`) so a
   * blank-but-defined env var on the hosting platform still falls back
   * safely instead of producing `new URL("")` and crashing the build.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.prashwajewels.com",
  locale: "en_IN",
  themeColor: "#1a160f",
  logo: {
    src: "/logo.svg",
    alt: "Prashwa Jewels logo",
    width: 160,
    height: 160,
  },
  ogImage: "/og-image.jpg",
} as const;
