import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);
  if (products.length === 0) return null;

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Handpicked" title="Featured Pieces" />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
        <div className="mt-10 text-center">
          <Button href="/shop/" variant="outline">
            Shop All Jewellery
          </Button>
        </div>
      </Container>
    </section>
  );
}
