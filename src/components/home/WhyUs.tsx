import { ShieldCheck, Gem, Ruler, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "BIS Hallmarked",
    description: "Every gold piece we sell is BIS hallmarked, and gemstone pieces come with relevant certification.",
  },
  {
    icon: Gem,
    title: "Handcrafted In-House",
    description: "Our pieces are handcrafted with close attention to detail, from temple-style sets to everyday chains.",
  },
  {
    icon: Ruler,
    title: "Complimentary Resizing",
    description: "Rings and bangles come with complimentary resizing, so fit is never a compromise.",
  },
  {
    icon: Sparkles,
    title: "Palace-Inspired Boutique",
    description: "Visit our Coimbatore store — compact in footprint, but designed to feel like stepping into a palace.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-black py-16 sm:py-24">
      <Container>
        <SectionHeading tone="dark" eyebrow="Why Prashwa Jewels" title="Handcrafted, Certified, Trusted" />

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
