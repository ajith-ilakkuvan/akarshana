/**
 * Central brand / site configuration.
 *
 * Change the business name, tagline, description or canonical URL here —
 * every page (metadata, structured data, footer) reads from this file.
 */

export const siteConfig = {
  name: "Akarshana Gold",
  legalName: "Akarshana Gold Company",
  tagline: "Pure • Precious • Forever",
  description:
    "Akarshana Gold Company offers transparent gold valuation and gold buying services in Pollachi, Udumalpet, Coimbatore and Tiruppur, with convenient doorstep service.",
  shortDescription:
    "Transparent gold valuation and gold buying, at your convenience.",
  /**
   * Update once the production domain is known. `||` (not `??`) so a
   * blank-but-defined env var on the hosting platform still falls back
   * safely instead of producing `new URL("")` and crashing the build.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.akarshanagold.com",
  locale: "en_IN",
  themeColor: "#7a1220",
  logo: {
    src: "/logo.webp",
    alt: "Aksharana Gold Company logo",
    width: 400,
    height: 529,
  },
  ogImage: "/og-image.jpg",
} as const;
