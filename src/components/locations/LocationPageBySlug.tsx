import type { Metadata } from "next";
import { LocationPageTemplate } from "./LocationPageTemplate";
import { getLocationBySlug, type LocationSlug } from "@/config/locations";
import { locationContent } from "@/content/locations";

/**
 * Builds the `metadata` export for a `/gold-buyers-<city>/` route file
 * from its slug — keeps the four (soon possibly more) route files tiny
 * and consistent instead of hand-writing metadata in each one.
 */
export function buildLocationMetadata(slug: LocationSlug): Metadata {
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return {
    title: `Gold Buyers in ${location.name}`,
    description: `Sell gold, get a gold valuation, pledged gold release assistance and doorstep gold service in ${location.name} from Akarshana Gold.`,
    alternates: { canonical: location.path },
  };
}

export function LocationPageBySlug({ slug }: { slug: LocationSlug }) {
  const location = getLocationBySlug(slug);
  if (!location) return null;
  return <LocationPageTemplate location={location} content={locationContent[slug]} />;
}
