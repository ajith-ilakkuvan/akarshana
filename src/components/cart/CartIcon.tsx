"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { setLiquidOrigin } from "@/lib/liquidFill";
import { cn } from "@/lib/utils";

export function CartIcon({ className }: { className?: string }) {
  const { itemCount, isHydrated } = useCart();

  return (
    <Link
      href="/cart/"
      aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      onPointerEnter={setLiquidOrigin}
      className={cn(
        "liquid-fill relative inline-flex size-11 items-center justify-center rounded-full bg-charcoal text-white",
        className,
      )}
    >
      <span aria-hidden="true" className="liquid-fill__layer bg-brand-gold" />
      <ShoppingBag aria-hidden="true" className="liquid-fill__content size-5" />
      {isHydrated && itemCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-gold text-[11px] font-bold text-charcoal"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
