import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedNavLink } from "@/components/cta/TrackedNavLink";
import { locations } from "@/config/locations";

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
            <TrackedNavLink
              key={location.slug}
              href={location.path}
              event="location_page_view"
              eventPayload={{ location: location.slug, source: "homepage" }}
              className="neumorphic-gold-card group flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6"
            >
              <div>
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">Gold Buyers in {location.name}</h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  Gold valuation, gold buying and doorstep service in {location.name}.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red">
                View details
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </TrackedNavLink>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
