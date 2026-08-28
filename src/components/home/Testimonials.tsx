import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";

/**
 * Placeholder testimonial slots. Replace `quote`/`author` with real,
 * client-supplied reviews before launch — nothing here is a fabricated
 * customer review.
 */
const placeholders = [
  { quote: "Customer testimonial to be added.", author: "Awaiting customer review" },
  { quote: "Customer testimonial to be added.", author: "Awaiting customer review" },
  { quote: "Customer testimonial to be added.", author: "Awaiting customer review" },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Customer Experience" title="What Our Customers Say" />

        <RevealGroup variant="fade-up" staggerMs={90} className="mt-12 grid gap-6 sm:grid-cols-3">
          {placeholders.map((item, index) => (
            <figure
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-dashed border-charcoal/20 bg-cream p-6"
            >
              <Quote aria-hidden="true" className="size-6 text-brand-gold" />
              <blockquote className="mt-4 flex-1 text-sm italic text-charcoal/60">{item.quote}</blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                {item.author}
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
