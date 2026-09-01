import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { productJsonLd } from "@/lib/structuredData";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatInr } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: product.images[0] ? { images: [{ url: product.images[0].url }] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const crumbs = [
    { label: product.category.name, href: `/collections/${product.category.slug}/` },
    { label: product.name, href: `/product/${product.slug}/` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={productJsonLd(product)} />

      <section className="py-8 sm:py-12">
        <Container>
          <Breadcrumbs items={crumbs} />

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal variant="fade-in">
              <div className="grid gap-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.slice(1).map((image) => (
                      <div key={image.id} className="relative aspect-square overflow-hidden rounded-xl bg-cream">
                        <Image src={image.url} alt={image.alt || product.name} fill sizes="20vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal variant="fade-up" delayMs={80}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">{product.category.name}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">{product.name}</h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl font-semibold text-charcoal">{formatInr(product.price)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-lg text-charcoal/40 line-through">{formatInr(product.compareAtPrice)}</span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>{product.metal}</Badge>
                {product.purity && <Badge>{product.purity}</Badge>}
                {product.gemstone && <Badge>{product.gemstone}</Badge>}
                {product.weightGrams && <Badge>{product.weightGrams}g</Badge>}
              </div>

              <p className="mt-6 text-base leading-relaxed text-charcoal/75">{product.description}</p>

              <p className="mt-4 text-xs text-charcoal/50">
                SKU: {product.sku} {product.stock > 0 && product.stock <= 3 ? `· Only ${product.stock} left` : ""}
              </p>

              <div className="mt-8">
                <AddToCartButton
                  productId={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image={product.images[0]?.url ?? ""}
                  stock={product.stock}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-charcoal/10 bg-cream p-5 text-sm text-charcoal/70">
                <p>BIS hallmarked purity · Secure encrypted checkout · Prefer to see it in person? Visit our Coimbatore boutique.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-charcoal/10 py-14 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-charcoal">You May Also Like</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
