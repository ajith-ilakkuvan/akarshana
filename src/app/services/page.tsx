import type { Metadata } from "next";
import { Coins, Unlock, Handshake, Home as HomeIcon, Banknote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedButtonLink } from "@/components/cta/TrackedButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { services, type ServiceItem } from "@/config/services";

const crumbs = [{ label: "Services", href: "/services/" }];

const icons: Record<ServiceItem["icon"], typeof Coins> = {
  coins: Coins,
  unlock: Unlock,
  handshake: Handshake,
  home: HomeIcon,
  banknote: Banknote,
};

export const metadata: Metadata = {
  title: "Gold Buying Services",
  description:
    "Gold valuation, gold buying, pledged gold release assistance, doorstep gold service and cash-for-gold from Akarshana Gold Company.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Our Services"
        description="Every service is built around transparent, professional gold valuation."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={90} className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="neumorphic-gold-card scroll-mt-24 rounded-2xl border border-charcoal/10 bg-white p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-charcoal">
                    {service.headline ?? service.title}
                  </h2>
                  <p className="mt-3 text-charcoal/70">{service.description}</p>
                  <TrackedButtonLink
                    href={service.cta.href}
                    size="sm"
                    className="mt-6"
                    event="service_click"
                    eventPayload={{ service: service.slug, source: "services_page" }}
                  >
                    {service.cta.label}
                  </TrackedButtonLink>
                </article>
              );
            })}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
