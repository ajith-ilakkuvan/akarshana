import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

const crumbs = [{ label: "Privacy Policy", href: "/privacy-policy/" }];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects information submitted through this website.`,
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader crumbs={crumbs} title="Privacy Policy" />
      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-charcoal/80">
          <Reveal variant="fade-up" className="rounded-lg bg-brand-gold-light/50 p-4 text-xs text-charcoal/70">
            This is a template privacy policy pending review by {siteConfig.legalName}&apos;s legal counsel. Replace
            this content with the business&apos;s confirmed policy before launch.
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Information We Collect</h2>
            <p className="mt-2">
              When you submit a gold valuation, doorstep service, or contact request through this website, we
              collect the information you provide — such as your name, phone number, approximate gold weight,
              location and preferred service. We do not request or store sensitive financial or identification
              information through this website.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">How We Use It</h2>
            <p className="mt-2">
              Information submitted is used only to respond to your enquiry — for example, to contact you about a
              gold valuation, confirm a doorstep visit, or answer a question. We do not sell your information to
              third parties.
            </p>
          </Reveal>

          <Reveal variant="fade-up">
            <h2 className="font-display text-lg font-semibold text-charcoal">Contact</h2>
            <p className="mt-2">
              For questions about this policy, contact us at{" "}
              <a href={`mailto:${contactConfig.email}`} className="text-brand-red underline">
                {contactConfig.email}
              </a>{" "}
              or {contactConfig.phoneDisplay}.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
