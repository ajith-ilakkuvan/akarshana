import { Coins, Unlock, Handshake, Home as HomeIcon, Banknote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { TrackedButtonLink } from "@/components/cta/TrackedButtonLink";
import { services, type ServiceItem } from "@/config/services";

const icons: Record<ServiceItem["icon"], typeof Coins> = {
  coins: Coins,
  unlock: Unlock,
  handshake: Handshake,
  home: HomeIcon,
  banknote: Banknote,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Gold Services You Can Trust"
          description="From valuation to doorstep convenience, every service is built around transparency."
        />

        <RevealGroup
          variant="fade-up"
          staggerMs={90}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.slug}
                className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
                  {service.headline ?? service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-charcoal/70">{service.description}</p>
                <TrackedButtonLink
                  href={service.cta.href}
                  variant="ghost"
                  size="sm"
                  className="mt-5 self-start px-0"
                  event="service_click"
                  eventPayload={{ service: service.slug }}
                >
                  {service.cta.label} →
                </TrackedButtonLink>
              </article>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
