import "server-only";
import { db } from "@/lib/db";

/**
 * Admin-editable site copy: hero headline, about story, contact details
 * shown on the storefront. Backed by the `SiteContent` key/value table so
 * the client can change wording/photos from /admin without a code change.
 * Falls back to these defaults if a key hasn't been saved yet.
 */
export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  image: string;
}

export interface AboutContent {
  story: string;
  legacyNote: string;
}

const defaults = {
  hero: {
    eyebrow: "Prashwa Jewels — Coimbatore",
    headline: "Handcrafted Fine Jewels, from a Palace of Our Own",
    subheading:
      "A boutique jewellery house in the heart of Coimbatore — every piece handcrafted, hallmarked, and chosen to be worn for generations.",
    image: "",
  } satisfies HeroContent,
  about: {
    story:
      "Prashwa Jewels is a boutique jewellery house in Coimbatore, a sister concern of RV Thangamalikai. Though compact in footprint, our store is built to feel like stepping into a palace — crystal chandeliers, marble floors and gold-trimmed interiors set the stage for jewellery that's handcrafted with the same attention to detail. Every piece we sell is BIS hallmarked, and our team is trained to guide you through purity, design and sizing, whether you visit us in person or shop online.",
    legacyNote:
      "As a sister concern of RV Thangamalikai, Prashwa Jewels carries forward a legacy of trusted, transparent jewellery craftsmanship in Coimbatore.",
  } satisfies AboutContent,
};

async function getValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db.siteContent.findUnique({ where: { key } });
    if (!row) return fallback;
    return { ...fallback, ...(JSON.parse(row.value) as Partial<T>) };
  } catch {
    return fallback;
  }
}

export async function getHeroContent(): Promise<HeroContent> {
  return getValue("hero", defaults.hero);
}

export async function getAboutContent(): Promise<AboutContent> {
  return getValue("about", defaults.about);
}

export async function setSiteContent(key: string, value: unknown): Promise<void> {
  const serialized = JSON.stringify(value);
  await db.siteContent.upsert({
    where: { key },
    create: { key, value: serialized },
    update: { value: serialized },
  });
}

export const settingsDefaults = defaults;
