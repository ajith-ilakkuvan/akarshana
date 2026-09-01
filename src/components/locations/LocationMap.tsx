import { MapPin, Navigation } from "lucide-react";
import type { Branch } from "@/config/locations";

/**
 * Embedded Google Map for a physical branch. Uses the keyless `/maps?q=`
 * embed endpoint (no Google Maps API key required) rather than the
 * Embed API, since a single static pin is all this needs.
 */
export function LocationMap({ branch, locationName }: { branch: Branch; locationName: string }) {
  const query = encodeURIComponent(`${branch.addressLine1}, ${branch.addressLine2}`);
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
      <iframe
        src={embedSrc}
        title={`Map showing the ${locationName} branch location`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full sm:h-80"
      />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
          <p className="text-sm text-charcoal/80">
            {branch.addressLine1}
            <br />
            {branch.addressLine2}
          </p>
        </div>
        <a
          href={branch.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-charcoal/20 px-4 py-2 text-sm font-semibold text-charcoal hover:border-brand-red hover:text-brand-red sm:self-auto"
        >
          <Navigation aria-hidden="true" className="size-4" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
