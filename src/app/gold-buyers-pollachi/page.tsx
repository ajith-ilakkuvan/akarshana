import { buildLocationMetadata, LocationPageBySlug } from "@/components/locations/LocationPageBySlug";

export const metadata = buildLocationMetadata("pollachi");

export default function Page() {
  return <LocationPageBySlug slug="pollachi" />;
}
