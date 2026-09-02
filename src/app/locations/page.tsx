import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedNavLink } from "@/components/cta/TrackedNavLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { locations } from "@/config/locations";

const crumbs = [{ label: "Locations", href: "/locations/" }];

export const metadata: Metadata = {
  title: "Locations We Serve",
  description:
    "Akarshana Gold currently serves Pollachi, Udumalpet, Coimbatore and Tiruppur with gold valuation, gold buying and doorstep service.",
  alternates: { canonical: "/locations/" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Our Service Locations"
        description="Currently serving these four locations, with more planned as we grow."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={90} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <TrackedNavLink
                key={location.slug}
                href={location.path}
                event="location_page_view"
                eventPayload={{ location: location.slug, source: "locations_page" }}
                className="neumorphic-gold-card group flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">
                    Gold Buyers in {location.name}
                  </h2>
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
    </>
  );
}
