import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GoldRateCard } from "@/components/gold/GoldRateCard";
import { GoldCalculator } from "@/components/gold/GoldCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";

const crumbs = [{ label: "Gold Rate", href: "/gold-rate/" }];

export const metadata: Metadata = {
  title: "Today's Gold Rate — 24K, 22K & 18K Gold Price per Gram",
  description:
    "Check today's gold rate for 24K, 22K and 18K gold per gram, updated from a live market source, and estimate your gold's value with our calculator.",
  alternates: { canonical: "/gold-rate/" },
};

export default function GoldRatePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Today's Gold Rate"
        description="Reference gold rates for 24K, 22K and 18K gold, shown per gram in Indian Rupees."
      />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-12">
          <Reveal variant="fade-up">
            <GoldRateCard variant="full" />
          </Reveal>

          <Reveal variant="fade-up">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6 text-sm text-charcoal/70 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-charcoal">About This Rate</h2>
              <p className="mt-3">
                The gold rate shown above reflects the applicable current market reference rate and is updated
                periodically from a live market source. Market rates change frequently through the day and can
                differ across sources. The rate displayed here is indicative and intended to help you understand
                current market conditions — it is not automatically the final price offered for your gold, which
                also depends on purity, weight and applicable valuation factors assessed at the time of service.
              </p>
            </div>
          </Reveal>

          <Reveal variant="fade-up" as="div" delayMs={80}>
            <GoldCalculator id="calculator" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
