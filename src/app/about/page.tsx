import type { Metadata } from "next";
import { Scale, TrendingUp, UserCheck, Home as HomeIcon, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { locations } from "@/config/locations";
import { siteConfig } from "@/config/site";

const crumbs = [{ label: "About", href: "/about/" }];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Akarshana Gold Company offers transparent, professional gold valuation and gold buying services with convenient doorstep access across Pollachi, Udumalpet, Coimbatore and Tiruppur.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    icon: Scale,
    title: "Trust",
    description: "We aim to build every customer interaction on clear, honest communication about how gold is valued.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description: "Valuations are based on the applicable current gold market rate, explained clearly at every step.",
  },
  {
    icon: UserCheck,
    title: "Professional Valuation",
    description: "Our team follows a consistent process for purity and weight assessment before sharing a valuation.",
  },
  {
    icon: HomeIcon,
    title: "Convenience",
    description: "Doorstep service is available so you can request gold valuation without an unnecessary trip.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="About Akarshana Gold"
        description={siteConfig.tagline}
      />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-lg text-charcoal/80">
              Akarshana Gold Company is a gold buying and gold valuation business, focused on giving customers a
              transparent, professional way to understand the value of their gold. We evaluate gold based on the
              applicable current market rate, explain our process clearly, and offer the convenience of doorstep
              service where needed.
            </p>
            <p className="mt-4 text-lg text-charcoal/80">
              We currently serve customers in Pollachi, Udumalpet, Coimbatore and Tiruppur, with plans to expand
              to additional locations over time.
            </p>
          </Reveal>

          <RevealGroup variant="fade-up" staggerMs={90} className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-charcoal/10 bg-cream p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-red text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">{title}</h2>
                <p className="mt-2 text-sm text-charcoal/70">{description}</p>
              </div>
            ))}
          </RevealGroup>

          <Reveal variant="fade-up" className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-charcoal">
              <MapPin aria-hidden="true" className="size-5 text-brand-red" />
              Where We Serve
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              {locations.map((location) => location.name).join(", ")}.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
