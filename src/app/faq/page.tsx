import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { faqJsonLd } from "@/lib/structuredData";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { generalFaqs } from "@/config/faq";

const crumbs = [{ label: "FAQs", href: "/faq/" }];

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about gold valuation, gold purity, today's gold rate, doorstep service and pledged gold release at Akarshana Gold.",
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

      <FinalCtaSection />
    </>
  );
}
