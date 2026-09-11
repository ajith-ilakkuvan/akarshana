import { MapPin, ArrowRight, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedNavLink } from "@/components/cta/TrackedNavLink";
import { TrackedLink } from "@/components/cta/TrackedLink";
import { locations, branchDirectionsHref } from "@/config/locations";

export function LocationsSection() {
  return (
    <section id="locations" className="bg-brand-red py-16 sm:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Where We Serve"
          title="Our Service Locations"
          description="Currently serving these four locations, with more planned as we grow."
        />

        <RevealGroup variant="fade-up" staggerMs={90} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <div
              key={location.slug}
              className="neumorphic-gold-card flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6"
            >
              <div>
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                  Old Gold Buyers in {location.name}
                </h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  Gold valuation, gold buying and doorstep service in {location.name}.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <TrackedNavLink
                  href={location.path}
                  event="location_page_view"
                  eventPayload={{ location: location.slug, source: "homepage" }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
                >
                  View Details
                  <ArrowRight aria-hidden="true" className="size-4" />
                </TrackedNavLink>
                {location.branch && (
                  <TrackedLink
                    href={branchDirectionsHref(location.branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="map_click"
                    eventPayload={{ location: location.slug, source: "homepage" }}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-charcoal/20 px-4 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
                  >
                    Map
                    <Navigation aria-hidden="true" className="size-3.5" />
                  </TrackedLink>
                )}
              </div>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
