export interface Review {
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

/**
 * Placeholder reviews styled after the client's real Google Business
 * Profile reviews — swap this array for the actual review text (and
 * ratings) once the client supplies them. Keep the same shape so
 * `ReviewsSection` needs no changes.
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

export function averageRating(items: Review[] = reviews): number {
  if (items.length === 0) return 0;
  return items.reduce((sum, review) => sum + review.rating, 0) / items.length;
}
