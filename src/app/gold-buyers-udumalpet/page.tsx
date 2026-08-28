import { buildLocationMetadata, LocationPageBySlug } from "@/components/locations/LocationPageBySlug";

export const metadata = buildLocationMetadata("udumalpet");

export default function Page() {
  return <LocationPageBySlug slug="udumalpet" />;
}
