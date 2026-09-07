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
    title: {
      absolute: `Old Gold Buyers in ${location.name} — Cash for Gold & Doorstep Valuation | Akarshana Gold`,
    },
    description: `Sell old gold in ${location.name} for instant cash at today's market rate. Free purity check, transparent valuation and doorstep gold service available across ${location.name}.`,
    alternates: { canonical: location.path },
  };
}

export function LocationPageBySlug({ slug }: { slug: LocationSlug }) {
  const location = getLocationBySlug(slug);
  if (!location) return null;
  return <LocationPageTemplate location={location} content={locationContent[slug]} />;
}
