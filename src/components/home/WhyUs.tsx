import { Scale, TrendingUp, UserCheck, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: Scale,
    title: "Transparent Valuation",
    description: "Every gold item is evaluated openly, so you understand exactly how your value is arrived at.",
  },
  {
    icon: TrendingUp,
    title: "Current Market Rate",
    description: "Valuations are based on the applicable current gold market rate, not an arbitrary offer.",
  },
  {
    icon: UserCheck,
    title: "Professional Service",
    description: "Our team follows a consistent, professional process for purity and weight assessment.",
  },
  {
    icon: HomeIcon,
    title: "Doorstep Convenience",
    description: "Prefer not to travel? Request gold service at your doorstep across our service locations.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-red py-16 sm:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Why Akarshana Gold"
          title="Built Around Trust and Transparency"
        />

        <RevealGroup variant="fade-up" staggerMs={90} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-gold text-charcoal">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{description}</p>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
