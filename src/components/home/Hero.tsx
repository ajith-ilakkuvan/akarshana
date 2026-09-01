import Image from "next/image";
import { ShieldCheck, Sparkles, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { ctaLabels } from "@/config/navigation";
import { getHeroContent } from "@/lib/settings";

const trustPoints = [
  { icon: ShieldCheck, label: "BIS hallmarked" },
  { icon: Gem, label: "Handcrafted in-house" },
  { icon: Sparkles, label: "Secure checkout" },
];

export async function Hero() {
  const hero = await getHeroContent();

  return (
    <section className="relative overflow-hidden bg-brand-black">
      {/* Warm gold glow — an abstract nod to the storefront's chandelier and gold trim. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(247,236,201,0.16),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(184,137,47,0.2),_transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border border-brand-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full border border-brand-gold/15"
      />

      <Container className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:py-28">
        <Reveal variant="fade-up">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
            {hero.eyebrow}
          </span>
          <GoldOrnament className="mt-4 justify-start" />
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">{hero.subheading}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/shop/" variant="secondary" size="lg">
              {ctaLabels.primary}
            </Button>
            <Button href="/about/" variant="outlineOnDark" size="lg">
              Our Story
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

        <Reveal variant="scale-in" delayMs={120} className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-brand-gold/40 shadow-xl shadow-black/40">
            {hero.image ? (
              <Image
                src={hero.image}
                alt="Prashwa Jewels boutique"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-black-light to-brand-black-deep text-center">
                <Gem aria-hidden="true" className="size-10 text-brand-gold" />
                <p className="px-6 text-sm text-white/60">Storefront &amp; collection photos coming soon</p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
