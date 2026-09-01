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

/** A real, physical branch address — only present for cities with an actual office (not every service-area page has one). */
export interface Branch {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  /** The Google Maps share link, used for the "Get Directions" button. */
  mapLink: string;
}

export interface LocationSummary {
  /** Used in the URL: /gold-buyers-<slug>/ */
  slug: LocationSlug;
  name: string;
  region: string;
  path: string;
  /** Set only for cities with a real physical office; omitted for service-area-only pages. */
  branch?: Branch;
}

export const locations: LocationSummary[] = [
  {
    slug: "pollachi",
    name: "Pollachi",
    region: "Tamil Nadu",
    path: "/gold-buyers-pollachi/",
    branch: {
      addressLine1: "MKG Complex, Arutchelvar Dr N Mahalingam Rd",
      addressLine2: "Near Welcare Fitness Equipment, Opp. Gowri Krishna Hotel, Pollachi, Tamil Nadu 642001",
      postalCode: "642001",
      mapLink: "https://maps.app.goo.gl/tJhdasPryNKcLDjF6",
    },
  },
  { slug: "udumalpet", name: "Udumalpet", region: "Tamil Nadu", path: "/gold-buyers-udumalpet/" },
  { slug: "coimbatore", name: "Coimbatore", region: "Tamil Nadu", path: "/gold-buyers-coimbatore/" },
  { slug: "tiruppur", name: "Tiruppur", region: "Tamil Nadu", path: "/gold-buyers-tiruppur/" },
];

export function getLocationBySlug(slug: string): LocationSummary | undefined {
  return locations.find((location) => location.slug === slug);
}
