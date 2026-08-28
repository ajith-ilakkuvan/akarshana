import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { howItWorksSteps } from "@/config/howItWorks";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Process"
          title="How It Works"
          description="A straightforward, five-step process from start to finish."
        />

        <RevealGroup
          variant="fade-up"
          staggerMs={90}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="relative rounded-2xl border border-charcoal/10 bg-white p-6">
              <span className="font-display text-3xl font-bold text-brand-gold">{item.step}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">{item.title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
