import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollParallax } from "@/components/ui/ScrollParallax";

/**
 * Shared banner for inner pages: breadcrumb trail + H1 + optional intro
 * copy. Reveal fires on mount here (it's above the fold, so its
 * IntersectionObserver reports "already visible" immediately) — every
 * inner page gets the same soft entrance animation from this one place
 * rather than each page having to remember to wrap its own title. The two
 * ScrollParallax rings echo Hero's decorative treatment (same shape,
 * same drift technique) so every page — not just the homepage — has a
 * background element that moves gently as the visitor scrolls.
 */
export function PageHeader({
  crumbs,
  title,
  description,
}: {
  crumbs: Crumb[];
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-red py-10 sm:py-14">
      <ScrollParallax amplitudeY={24} amplitudeX={8} wavelength={750} className="absolute -top-20 -right-16">
        <div className="size-56 rounded-full border border-brand-gold/20" />
      </ScrollParallax>
      <ScrollParallax
        amplitudeY={18}
        amplitudeX={12}
        wavelength={950}
        phase={1.6}
        className="absolute -bottom-24 -left-10"
      >
        <div className="size-64 rounded-full border border-brand-gold/15" />
      </ScrollParallax>

      <Container className="relative">
        <Reveal variant="fade-up">
          <Breadcrumbs items={crumbs} tone="dark" />
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-base text-white/80">{description}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
