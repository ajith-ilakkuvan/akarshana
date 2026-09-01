import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getAllCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

const crumbs = [{ label: "Collections", href: "/collections/" }];

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore Prashwa Jewels' collections — necklaces, earrings, bangles, rings, bridal sets and chains, handcrafted in Coimbatore.",
  alternates: { canonical: "/collections/" },
};

export default async function CollectionsPage() {
  const categories = await getAllCategories();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title="Our Collections" description="Each collection is handcrafted with its own character — browse by category to find yours." />

      <section className="py-14 sm:py-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={80} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}/`}
                className="group block overflow-hidden rounded-2xl border border-charcoal/10 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl font-semibold text-charcoal">{category.name}</h2>
                  <p className="mt-1 text-sm text-charcoal/60">{category._count.products} pieces</p>
                  {category.description && <p className="mt-2 text-sm text-charcoal/70">{category.description}</p>}
                </div>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
