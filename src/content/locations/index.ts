import type { LocationSlug } from "@/config/locations";
import type { LocationContent } from "./types";
import { pollachi } from "./pollachi";
import { udumalpet } from "./udumalpet";
import { coimbatore } from "./coimbatore";
import { tiruppur } from "./tiruppur";

export const locationContent: Record<LocationSlug, LocationContent> = {
  pollachi,
  udumalpet,
  coimbatore,
  tiruppur,
};
