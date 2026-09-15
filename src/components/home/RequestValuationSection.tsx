import Image from "next/image";
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
    <section id="get-valuation" className="overflow-hidden bg-brand-red py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
        <Reveal variant="fade-up" className="mx-auto hidden w-full max-w-sm lg:mx-0 lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-brand-gold/30 shadow-xl shadow-black/30">
            <Image
              src="/showcase/bridal-5.webp"
              alt="Woman wearing a gold necklace, earrings and maang tikka jewellery set"
              fill
              sizes="380px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-xl">
          <SectionHeading
            tone="dark"
            eyebrow="Get Started"
            title="Request a Free Gold Valuation"
            description="Share a few details and our team will confirm your gold's value at today's market rate."
          />
          <Reveal variant="fade-up" delayMs={120} className="mt-10">
            <LeadForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
