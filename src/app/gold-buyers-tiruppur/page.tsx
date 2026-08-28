import { buildLocationMetadata, LocationPageBySlug } from "@/components/locations/LocationPageBySlug";

export const metadata = buildLocationMetadata("tiruppur");

export default function Page() {
  return <LocationPageBySlug slug="tiruppur" />;
}
