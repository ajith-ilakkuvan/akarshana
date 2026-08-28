import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { howItWorksSteps } from "@/config/howItWorks";

const crumbs = [{ label: "How It Works", href: "/how-it-works/" }];

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Akarshana Gold's gold valuation process works, from sharing your gold to purity check, weight verification and valuation.",
  alternates: { canonical: "/how-it-works/" },
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="How It Works"
        description="A straightforward, five-step process from start to finish."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={90} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-charcoal/10 bg-white p-6">
                <span className="font-display text-3xl font-bold text-brand-gold">{item.step}</span>
                <h2 className="mt-3 font-display text-lg font-semibold text-charcoal">{item.title}</h2>
                <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
