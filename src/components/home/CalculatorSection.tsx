import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GoldCalculator } from "@/components/gold/GoldCalculator";

export function CalculatorSection() {
  return (
    <section id="calculator" className="bg-cream py-16 sm:py-24">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Gold Value Calculator"
          title="Estimate Your Gold's Value"
          description="Select purity and enter weight to see an estimated value based on today's market rate."
        />
        <Reveal variant="fade-up" className="mt-10">
          <GoldCalculator />
        </Reveal>
      </Container>
    </section>
  );
}
