import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const moments = [
  {
    src: "/showcase/bridal-1.webp",
    alt: "Bride wearing an elaborate red and gold bridal jewellery set",
    caption: "Bridal Sets",
  },
  {
    src: "/showcase/bridal-2.webp",
    alt: "Bride wearing a layered gold temple-jewellery necklace",
    caption: "Temple Jewellery",
  },
  {
    src: "/showcase/bridal-3.webp",
    alt: "Bride wearing a gold necklace, maang tikka and jhumka earrings",
    caption: "Wedding Occasions",
  },
];

export function GoldMomentsSection() {
  return (
    <section className="overflow-hidden bg-charcoal py-16 sm:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Gold That Matters"
          title="Every Piece Holds a Story"
          description="From bridal sets to family heirlooms, we understand the sentimental value behind every piece of gold you bring to us — and make sure that value is reflected in your valuation."
        />

        <RevealGroup
          variant="fade-up"
          staggerMs={110}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {moments.map((moment, index) => (
            <div
              key={moment.src}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-3xl border border-brand-gold/25 shadow-xl shadow-black/30",
                index === 1 && "sm:mt-8",
              )}
            >
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-brand-gold/0 transition-all duration-500 group-hover:ring-brand-gold/60"
              />
              <p className="absolute inset-x-0 bottom-0 translate-y-2 p-5 font-display text-lg font-semibold text-brand-gold-light opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {moment.caption}
              </p>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
