import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { howItWorksSteps } from "@/config/howItWorks";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-center">
        <Reveal variant="fade-up" className="mx-auto hidden w-full max-w-sm lg:mx-0 lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-brand-gold/25 shadow-xl shadow-black/10">
            <Image
              src="/showcase/bridal-6.webp"
              alt="Bride wearing an elaborate temple-style gold necklace, jhumka earrings and maang tikka"
              fill
              sizes="360px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            className="mx-0 max-w-none"
            eyebrow="The Process"
            title="How It Works"
            description="A straightforward, five-step process from start to finish."
          />

          <RevealGroup
            variant="fade-up"
            staggerMs={90}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-charcoal/10 bg-white p-6">
                <span className="font-display text-3xl font-bold text-brand-gold">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{item.description}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
