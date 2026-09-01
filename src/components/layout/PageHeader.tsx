import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared banner for inner pages: breadcrumb trail + H1 + optional intro
 * copy. Reveal fires on mount here (it's above the fold, so its
 * IntersectionObserver reports "already visible" immediately) — every
 * inner page gets the same soft entrance animation from this one place
 * rather than each page having to remember to wrap its own title.
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
    <section className="border-b border-white/10 bg-brand-red py-10 sm:py-14">
      <Container>
        <Reveal variant="fade-up">
          <Breadcrumbs items={crumbs} tone="dark" />
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-base text-white/80">{description}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
