import type { Metadata } from "next";
import { MapPin, ArrowRight, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedNavLink } from "@/components/cta/TrackedNavLink";
import { TrackedLink } from "@/components/cta/TrackedLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { locations, branchDirectionsHref } from "@/config/locations";

const crumbs = [{ label: "Locations", href: "/locations/" }];

export const metadata: Metadata = {
  title: "Our Branches — Gold Buyers in Pollachi, Udumalpet, Coimbatore & Tiruppur",
  description:
    "Find your nearest Akarshana Gold branch for gold valuation and cash-for-gold service in Pollachi, Udumalpet, Coimbatore or Tiruppur.",
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
              <div
                key={location.slug}
                className="neumorphic-gold-card flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-white p-6"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">
                    Old Gold Buyers in {location.name}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/70">
                    Gold valuation, gold buying and doorstep service in {location.name}.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TrackedNavLink
                    href={location.path}
                    event="location_page_view"
                    eventPayload={{ location: location.slug, source: "locations_page" }}
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
                      eventPayload={{ location: location.slug, source: "locations_page" }}
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
    </>
  );
}
