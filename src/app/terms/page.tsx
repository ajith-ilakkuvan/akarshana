import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

const crumbs = [{ label: "Terms & Conditions", href: "/terms/" }];

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use for the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms/" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader crumbs={crumbs} title="Terms & Conditions" />
      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-charcoal/80">
          <Reveal variant="fade-up" className="rounded-lg bg-brand-gold-light/50 p-4 text-xs text-charcoal/70">
            This is a template terms page pending review by {siteConfig.legalName}&apos;s legal counsel. Replace
            this content with the business&apos;s confirmed terms before launch.
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Valuation Disclaimer</h2>
            <p className="mt-2">
              Any gold value discussed with our team is an estimate based on the applicable market rate at the time,
              and is subject to purity, weight and other valuation factors assessed in person. It does not
              constitute a final purchase offer until confirmed at the time of service.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Use of This Website</h2>
            <p className="mt-2">
              This website is provided to help you learn about {siteConfig.legalName}&apos;s services and submit
              enquiries. Content is provided in good faith but should not be treated as a final quote, financial
              advice, or a legal or regulatory guarantee.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Contact</h2>
            <p className="mt-2">
              For questions about these terms, contact us at {contactConfig.email} or {contactConfig.phoneDisplay}.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
