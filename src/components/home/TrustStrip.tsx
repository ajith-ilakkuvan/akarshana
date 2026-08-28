import { Scale, TrendingUp, Users, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";

const points = [
  { icon: Scale, label: "Transparent Valuation" },
  { icon: TrendingUp, label: "Current Market Rate" },
  { icon: Users, label: "Professional Service" },
  { icon: HomeIcon, label: "Doorstep Convenience" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-charcoal/10 bg-white py-8">
      <Container>
        <RevealGroup
          variant="fade-in"
          staggerMs={80}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {points.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:text-left">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-gold-light text-brand-gold-dark">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-sm font-semibold text-charcoal">{label}</span>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
