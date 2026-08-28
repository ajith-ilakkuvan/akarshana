import { buildLocationMetadata, LocationPageBySlug } from "@/components/locations/LocationPageBySlug";

export const metadata = buildLocationMetadata("coimbatore");

export default function Page() {
  return <LocationPageBySlug slug="coimbatore" />;
}
