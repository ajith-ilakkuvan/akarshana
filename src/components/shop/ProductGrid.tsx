import { RevealGroup } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductWithRelations } from "@/lib/products";

export function ProductGrid({ products }: { products: ProductWithRelations[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-charcoal/20 bg-cream py-16 text-center">
        <p className="text-charcoal/60">No products match these filters yet.</p>
      </div>
    );
  }

  return (
    <RevealGroup
      variant="fade-up"
      staggerMs={60}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </RevealGroup>
  );
}
