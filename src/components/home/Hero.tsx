import { ShieldCheck, Scale, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldRateCard } from "@/components/gold/GoldRateCard";
import { ctaLabels } from "@/config/navigation";

const trustPoints = [
  { icon: Scale, label: "Transparent valuation" },
  { icon: ShieldCheck, label: "Current market rate" },
  { icon: HomeIcon, label: "Doorstep convenience" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(184,147,74,0.16),_transparent_55%)]"
      />
      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <Reveal variant="fade-up">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            Akarshana Gold Company
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.25rem]">
            Your Gold Deserves Its True Value.
          </h1>
          <p className="mt-5 max-w-lg text-base text-charcoal/70 sm:text-lg">
            Get your gold valued transparently at the current market rate with convenient service from Akarshana
            Gold.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact/" size="lg">
              {ctaLabels.primary}
            </Button>
            <Button href="/contact/?service=doorstep-service" variant="outline" size="lg">
              {ctaLabels.bookDoorstep}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
                <Icon aria-hidden="true" className="size-4 text-brand-red" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="scale-in" delayMs={120}>
          <GoldRateCard variant="full" />
        </Reveal>
      </Container>
    </section>
  );
}
