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
  /**
   * Optional Google Maps share link (the exact pin, more precise than a
   * geocoded address query) — when omitted, `branchDirectionsHref` below
   * builds a directions link from the address text instead.
   */
  mapLink?: string;
}

/** "Get Directions" target: the branch's own share link if we have one, otherwise a directions link geocoded from its address. */
export function branchDirectionsHref(branch: Branch): string {
  if (branch.mapLink) return branch.mapLink;
  const query = encodeURIComponent(`${branch.addressLine1}, ${branch.addressLine2}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
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
  {
    slug: "udumalpet",
    name: "Udumalpet",
    region: "Tamil Nadu",
    path: "/gold-buyers-udumalpet/",
    branch: {
      // Client-provided text expanded "Oop" -> "Opp." and "P.Coplex" -> "P Complex"
      // (consistent with the "U.K.P Complex" reading and the "Opp. <landmark>"
      // pattern used in the Pollachi address) — confirm this reads correctly.
      addressLine1: "U.K.P Complex, Bus Stand, Anusham Nagar",
      addressLine2: "Opp. Udumalaipettai Municipality, Tamil Nadu 642126",
      postalCode: "642126",
      mapLink: "https://maps.app.goo.gl/TAtmESXY9A3ZBFXW7",
    },
  },
  { slug: "coimbatore", name: "Coimbatore", region: "Tamil Nadu", path: "/gold-buyers-coimbatore/" },
  { slug: "tiruppur", name: "Tiruppur", region: "Tamil Nadu", path: "/gold-buyers-tiruppur/" },
];

export function getLocationBySlug(slug: string): LocationSummary | undefined {
  return locations.find((location) => location.slug === slug);
}
