import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { locations } from "@/config/locations";

export function DoorstepSection() {
  return (
    <section id="doorstep" className="bg-cream py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal variant="fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-dark">
            Doorstep Gold Service
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Your Gold. Your Convenience.
          </h2>
          <p className="mt-4 max-w-md text-charcoal/70">
            Request convenient gold service at your doorstep — no need to make an unnecessary trip.
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-red">Available in</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/80">
            {locations.map((location) => (
              <li key={location.slug}>{location.name}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="scale-in" delayMs={120}>
          <LeadForm
            defaultService="doorstep-service"
            title="Book a Doorstep Visit"
            description="Share your details and preferred time — we'll confirm your doorstep visit."
          />
        </Reveal>
      </Container>
    </section>
  );
}
