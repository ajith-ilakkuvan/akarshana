import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

const crumbs = [{ label: "Terms & Conditions", href: "/terms/" }];

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use and sale for the ${siteConfig.name} website.`,
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
            <h2 className="font-display text-lg font-semibold text-charcoal">Orders &amp; Pricing</h2>
            <p className="mt-2">
              Prices shown on this website include applicable making charges and are subject to change without
              notice, in line with movements in gold and gemstone rates. The price shown at checkout is the price
              charged for that order.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Payments</h2>
            <p className="mt-2">
              Online payments are processed securely through Razorpay. We do not store your card, UPI or banking
              details.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Exchange &amp; Returns</h2>
            <p className="mt-2">
              Exchange is available on eligible items within a specified period from purchase, subject to the item
              being unused, in its original condition, and accompanied by the original invoice. Contact us to begin
              an exchange.
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
