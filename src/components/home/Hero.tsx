import Image from "next/image";
import { ShieldCheck, Scale, Home as HomeIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { GoldRateCard } from "@/components/gold/GoldRateCard";
import { ctaLabels } from "@/config/navigation";

const trustPoints = [
  { icon: Scale, label: "Transparent valuation" },
  { icon: ShieldCheck, label: "Current market rate" },
  { icon: HomeIcon, label: "Doorstep convenience" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-red">
      {/* Warm gold glow + faint corner arcs — an original, abstract nod to the
          gold ornamentation on the client's poster, not a copy of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,243,207,0.22),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(201,151,46,0.25),_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border border-brand-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full border border-brand-gold/15"
      />

      <Container className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr_1.15fr] lg:items-center lg:gap-8 lg:py-28">
        <Reveal variant="scale-in" className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-brand-gold/40 shadow-xl shadow-black/25">
            {/*
              Placeholder — add the real photo as public/hero-model.jpg and
              change `src` below to "/hero-model.jpg" (then delete
              public/hero-model.svg, it's only this stand-in).
            */}
            <Image
              src="/hero-model.svg"
              alt="Customer wearing gold jewellery valued by Akarshana Gold"
              fill
              priority
              sizes="(min-width: 1024px) 320px, 90vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal variant="fade-up" delayMs={80}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
            Akarshana Gold Company
          </span>
          <GoldOrnament className="mt-4 justify-start" />
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            Your Gold Deserves Its True Value.
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
            Get your gold valued transparently at the current market rate with convenient service from Akarshana
            Gold.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact/" variant="secondary" size="lg">
              {ctaLabels.primary}
            </Button>
            <Button href="/contact/?service=doorstep-service" variant="outlineOnDark" size="lg">
              {ctaLabels.bookDoorstep}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Icon aria-hidden="true" className="size-4 text-brand-gold-light" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="scale-in" delayMs={160}>
          <GoldRateCard variant="full" />
        </Reveal>
      </Container>
    </section>
  );
}
