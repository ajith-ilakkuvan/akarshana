import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { faqJsonLd } from "@/lib/structuredData";
import { generalFaqs } from "@/config/faq";

const crumbs = [{ label: "FAQs", href: "/faq/" }];

export const metadata: Metadata = {
  title: {
    absolute: "Gold Selling FAQs — Valuation, Purity, Pledged Release & More | Akarshana Gold",
  },
  description:
    "Answers to common questions about selling old gold, pledged-gold release, purity checks and doorstep valuation with Akarshana Gold.",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(generalFaqs)} />
      <PageHeader crumbs={crumbs} title="Frequently Asked Questions" />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <Accordion items={generalFaqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
