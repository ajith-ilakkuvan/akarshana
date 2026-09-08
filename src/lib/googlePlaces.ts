import { locations, type LocationSlug } from "@/config/locations";
import type { Review } from "@/config/reviews";

/**
 * Live Google reviews, fetched server-side from the Places API (New) —
 * https://developers.google.com/maps/platform/place-details.
 *
 * Set `GOOGLE_PLACES_API_KEY` plus one `GOOGLE_PLACE_ID_<CITY>` per branch
 * (see `.env.example`) to enable this. With any of those unset, or if the
 * request fails, `fetchAllBranchReviews` returns an empty array and
 * `ReviewsSection` falls back to the placeholder reviews in
 * `src/config/reviews.ts` — so the site works either way.
 */

const PLACE_ID_ENV_VAR: Record<LocationSlug, string> = {
  pollachi: "GOOGLE_PLACE_ID_POLLACHI",
  udumalpet: "GOOGLE_PLACE_ID_UDUMALPET",
  coimbatore: "GOOGLE_PLACE_ID_COIMBATORE",
  tiruppur: "GOOGLE_PLACE_ID_TIRUPPUR",
};

const FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

interface PlacesApiAuthorAttribution {
  displayName?: string;
  photoUri?: string;
}

interface PlacesApiReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: PlacesApiAuthorAttribution;
  relativePublishTimeDescription?: string;
}

interface PlacesApiPlaceDetails {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
}

export interface BranchReviews {
  city: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri?: string;
  reviews: Review[];
}

function toStarRating(value: number | undefined): 1 | 2 | 3 | 4 | 5 {
  const rounded = Math.min(5, Math.max(1, Math.round(value ?? 5)));
  return rounded as 1 | 2 | 3 | 4 | 5;
}

async function fetchBranchReviews(slug: LocationSlug, cityName: string, apiKey: string): Promise<BranchReviews | null> {
  const placeId = process.env[PLACE_ID_ENV_VAR[slug]];
  if (!placeId) return null;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as PlacesApiPlaceDetails;
    if (!Array.isArray(data.reviews)) return null;

    return {
      city: cityName,
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      googleMapsUri: data.googleMapsUri,
      reviews: data.reviews.map((review) => ({
        name: review.authorAttribution?.displayName ?? "Google user",
        location: cityName,
        rating: toStarRating(review.rating),
        text: review.text?.text ?? review.originalText?.text ?? "",
        time: review.relativePublishTimeDescription,
      })),
    };
  } catch {
    return null;
  }
}

/**
 * Fetches reviews for every branch that has a Place ID configured, in
 * parallel. Returns `[]` (never throws) when the API key is unset or every
 * branch request fails/is unconfigured — callers should treat that as
 * "no live data available" and fall back to placeholder content.
 */
export async function fetchAllBranchReviews(): Promise<{ reviews: Review[]; sources: BranchReviews[] }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return { reviews: [], sources: [] };

  const results = await Promise.all(
    locations.map((location) => fetchBranchReviews(location.slug, location.name, apiKey)),
  );
  const sources = results.filter((result): result is BranchReviews => result !== null);
  const reviews = sources.flatMap((source) => source.reviews);
  return { reviews, sources };
}
