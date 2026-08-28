/**
 * Structured location data.
 *
 * To add a new city once the business expands: add an entry here, then add
 * a matching content file in `src/content/locations/<slug>.ts` (see that
 * folder's existing files for the shape). The location page route
 * (`src/app/gold-buyers-[city]/page.tsx`) reads `generateStaticParams` from
 * this list, so a new entry automatically becomes a new page — nothing else
 * needs to change.
 */

export type LocationSlug = "pollachi" | "udumalpet" | "coimbatore" | "tiruppur";

export interface LocationSummary {
  /** Used in the URL: /gold-buyers-<slug>/ */
  slug: LocationSlug;
  name: string;
  region: string;
  path: string;
}

export const locations: LocationSummary[] = [
  { slug: "pollachi", name: "Pollachi", region: "Tamil Nadu", path: "/gold-buyers-pollachi/" },
  { slug: "udumalpet", name: "Udumalpet", region: "Tamil Nadu", path: "/gold-buyers-udumalpet/" },
  { slug: "coimbatore", name: "Coimbatore", region: "Tamil Nadu", path: "/gold-buyers-coimbatore/" },
  { slug: "tiruppur", name: "Tiruppur", region: "Tamil Nadu", path: "/gold-buyers-tiruppur/" },
];

export function getLocationBySlug(slug: string): LocationSummary | undefined {
  return locations.find((location) => location.slug === slug);
}
