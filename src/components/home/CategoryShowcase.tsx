import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { getAllCategories } from "@/lib/products";

export async function CategoryShowcase() {
  const categories = await getAllCategories();
  if (categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Shop by Collection" title="Find Your Piece" />
        <RevealGroup
          variant="fade-up"
          staggerMs={70}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6"
        >
          {categories.map((category) => (
            <Link key={category.id} href={`/collections/${category.slug}/`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-full border border-brand-gold/30 bg-cream">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-charcoal group-hover:text-brand-black">
                {category.name}
              </p>
            </Link>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
