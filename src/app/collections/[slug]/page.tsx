import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getCategoryBySlug, getShopProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || `Shop ${category.name} from Prashwa Jewels.`,
    alternates: { canonical: `/collections/${category.slug}/` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getShopProducts({ category: category.slug });
  const crumbs = [
    { label: "Collections", href: "/collections/" },
    { label: category.name, href: `/collections/${category.slug}/` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title={category.name} description={category.description ?? undefined} />

      <section className="py-10 sm:py-14">
        <Container>
          <ProductGrid products={products} />
        </Container>
      </section>
    </>
  );
}
