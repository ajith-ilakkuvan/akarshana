import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatInr } from "@/lib/utils";
import type { ProductWithRelations } from "@/lib/products";

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const image = product.images[0];
  const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug}/`}
      className="group block overflow-hidden rounded-2xl border border-charcoal/10 bg-white transition-shadow hover:shadow-lg hover:shadow-charcoal/10"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        {image && (
          <Image
            src={image.url}
            alt={image.alt || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-brand-black text-brand-gold-light">Featured</Badge>
        )}
        {outOfStock && (
          <span className="absolute top-3 right-3 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">{product.category.name}</p>
        <h3 className="mt-1 font-display text-base font-semibold text-charcoal line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-xs text-charcoal/50">
          {product.metal}
          {product.purity ? ` · ${product.purity}` : ""}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-charcoal">{formatInr(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-charcoal/40 line-through">{formatInr(product.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
