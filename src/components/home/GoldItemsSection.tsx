import Image from "next/image";
import { Gem, Link as LinkIcon, Coins, Package, Crown, Recycle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { goldItemCategories, type GoldItemCategory } from "@/config/goldItems";

const icons: Record<GoldItemCategory["icon"], typeof Gem> = {
  gem: Gem,
  link: LinkIcon,
  coins: Coins,
  package: Package,
  crown: Crown,
  recycle: Recycle,
};

/**
 * Duplicated once so `.marquee-track`'s "shift by exactly one copy-width"
 * animation loops seamlessly — see the `@keyframes marquee-scroll` comment
 * in globals.css.
 */
const track = [...goldItemCategories, ...goldItemCategories];

export function GoldItemsSection() {
  return (
    <section className="overflow-hidden bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Buy"
          title="We Buy All Kinds of Gold Jewellery"
          description="From wedding jewellery to old coins, bars and broken pieces — if it's gold, we'll value it fairly."
        />
      </Container>

      <Reveal variant="fade-in" className="mt-12">
        <div className="marquee-track flex w-max gap-6 px-4 sm:px-6">
          {track.map((item, index) => {
            const hidden = index >= goldItemCategories.length;

            if (item.photo) {
              return (
                <div
                  key={`${item.slug}-${index}`}
                  aria-hidden={hidden}
                  className="flex w-56 shrink-0 flex-col overflow-hidden rounded-3xl border border-brand-gold/25 bg-white shadow-lg shadow-black/10 sm:w-64"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={item.photo.src}
                      alt={item.photo.alt}
                      fill
                      sizes="(min-width: 640px) 256px, 224px"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 py-5 text-center">
                    <GoldOrnament className="justify-center" />
                    <p className="mt-3 font-display text-lg font-semibold tracking-wide text-charcoal">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            }

            const Icon = icons[item.icon];
            return (
              <div
                key={`${item.slug}-${index}`}
                aria-hidden={hidden}
                className="gold-item-card flex w-56 shrink-0 flex-col items-center gap-5 rounded-3xl border border-brand-gold/25 px-6 py-10 text-center shadow-lg shadow-black/20 sm:w-64"
              >
                <span className="relative flex size-24 items-center justify-center">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand-gold/25 blur-xl" />
                  <span aria-hidden="true" className="absolute inset-0 rounded-full border border-brand-gold/40" />
                  <span className="relative flex size-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark text-brand-red-dark shadow-inner">
                    <Icon aria-hidden="true" className="size-9" />
                  </span>
                </span>
                <div>
                  <GoldOrnament className="justify-center" />
                  <p className="mt-3 font-display text-lg font-semibold tracking-wide text-white">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
