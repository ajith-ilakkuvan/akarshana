import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";

/**
 * Homepage's primary lead-capture section — the site gives a real,
 * in-person/doorstep valuation rather than an on-page rate/calculator, so
 * this is a direct enquiry form rather than a self-serve estimate tool.
 */
export function RequestValuationSection() {
  return (
    <section id="get-valuation" className="bg-brand-red py-16 sm:py-24">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading
          tone="dark"
          eyebrow="Get Started"
          title="Request a Free Gold Valuation"
          description="Share a few details and our team will confirm your gold's value at today's market rate."
        />
        <Reveal variant="fade-up" className="mt-10">
          <LeadForm />
        </Reveal>
      </Container>
    </section>
  );
}
