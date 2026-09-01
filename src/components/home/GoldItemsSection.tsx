import { Gem, Link as LinkIcon, Coins, Package, Crown, Recycle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
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
            const Icon = icons[item.icon];
            return (
              <div
                key={`${item.slug}-${index}`}
                aria-hidden={index >= goldItemCategories.length}
                className="flex w-52 shrink-0 flex-col items-center gap-4 rounded-2xl border border-brand-gold/20 bg-brand-red-dark px-6 py-8 text-center sm:w-60"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-light">
                  <Icon aria-hidden="true" className="size-8" />
                </span>
                <p className="font-display text-base font-semibold text-white">{item.label}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
