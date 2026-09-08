export interface Review {
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Relative publish time (e.g. "2 months ago") — set on reviews fetched live from Google, unset on placeholders. */
  time?: string;
}

/**
 * Placeholder reviews, shown only when no live Google reviews are
 * available (see `src/lib/googlePlaces.ts` — real reviews replace these
 * automatically once `GOOGLE_PLACES_API_KEY` and a branch's
 * `GOOGLE_PLACE_ID_<CITY>` are configured).
 */
export const reviews: Review[] = [
  {
    name: "Karthik R",
    location: "Pollachi",
    rating: 5,
    text: "Sold my old gold chain here — the valuation was quick and transparent. No pressure at all, and the rate matched what they explained upfront.",
  },
  {
    name: "Meena S",
    location: "Pollachi",
    rating: 5,
    text: "Very professional team. They checked purity right in front of me and explained everything clearly before finalising the value.",
  },
  {
    name: "Suresh Kumar",
    location: "Udumalpet",
    rating: 5,
    text: "Requested doorstep service for my mother's old jewellery. The staff arrived on time and the whole process was smooth and honest.",
  },
  {
    name: "Priya Dharshini",
    location: "Udumalpet",
    rating: 5,
    text: "Good experience overall. The purity check was transparent and I got a fair price for my old gold coins.",
  },
  {
    name: "Arun Prasath",
    location: "RS Puram, Coimbatore",
    rating: 5,
    text: "Excellent service — the team explained the current market rate clearly and there were no hidden deductions.",
  },
  {
    name: "Divya Bharathi",
    location: "Gandhipuram, Coimbatore",
    rating: 5,
    text: "Sold a few old bangles here. Friendly staff, transparent process, and quick payment once we agreed on the value.",
  },
  {
    name: "Manikandan V",
    location: "Tiruppur",
    rating: 5,
    text: "Needed help with pledged gold release and the team guided me through the whole process patiently.",
  },
  {
    name: "Lakshmi Priya",
    location: "Tiruppur",
    rating: 5,
    text: "Very trustworthy. They took the time to explain the weight and purity assessment before quoting the value.",
  },
];

/**
 * Shown next to the rating badge until live Google reviews are wired up
 * (see src/lib/googlePlaces.ts) — at that point the real count is summed
 * from each branch's `userRatingCount` instead. Update this if the
 * client's actual review count changes before then.
 */
export const placeholderReviewCount = 230;

export function averageRating(items: Review[] = reviews): number {
  if (items.length === 0) return 0;
  return items.reduce((sum, review) => sum + review.rating, 0) / items.length;
}
