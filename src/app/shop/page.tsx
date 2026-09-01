import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopFiltersBar } from "@/components/shop/ShopFiltersBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getShopProducts, getAllCategories, getDistinctMetals, type ShopFilters } from "@/lib/products";

export const dynamic = "force-dynamic";

const crumbs = [{ label: "Shop", href: "/shop/" }];

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description: "Browse Prashwa Jewels' full collection of handcrafted gold, diamond and bridal jewellery, shipped from our Coimbatore boutique.",
  alternates: { canonical: "/shop/" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; metal?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const filters: ShopFilters = {
    category: params.category || undefined,
    metal: params.metal || undefined,
    sort: (params.sort as ShopFilters["sort"]) || "newest",
  };

  const [products, categories, metals] = await Promise.all([
    getShopProducts(filters),
    getAllCategories(),
    getDistinctMetals(),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title="Shop All Jewellery" description="Handcrafted gold, diamond and bridal pieces, ready to ship from Coimbatore." />

      <section className="py-10 sm:py-14">
        <Container className="space-y-8">
          <ShopFiltersBar categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} metals={metals} />
          <ProductGrid products={products} />
        </Container>
      </section>
    </>
  );
}
