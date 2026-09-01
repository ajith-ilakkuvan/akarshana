"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag, Store } from "lucide-react";
import { whatsappHref } from "@/config/contact";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/analytics";

/** Sticky bottom CTA bar shown only on mobile/tablet — hidden on lg+. */
export function MobileStickyCta() {
  const { itemCount, isHydrated } = useCart();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal/10 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-charcoal active:bg-cream"
      >
        <MessageCircle aria-hidden="true" className="size-5 text-[#25D366]" />
        WhatsApp
      </a>
      <Link
        href="/cart/"
        onClick={() => trackEvent("cta_click", { location: "sticky_bar_cart" })}
        className="relative flex flex-col items-center justify-center gap-0.5 border-x border-charcoal/10 py-2.5 text-xs font-medium text-charcoal active:bg-cream"
      >
        <span className="relative">
          <ShoppingBag aria-hidden="true" className="size-5 text-charcoal" />
          {isHydrated && itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-charcoal"
            >
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </span>
        Cart
      </Link>
      <Link
        href="/shop/"
        onClick={() => trackEvent("cta_click", { location: "sticky_bar_shop" })}
        className="flex flex-col items-center justify-center gap-0.5 bg-brand-black py-2.5 text-xs font-semibold text-white active:bg-brand-black-deep"
      >
        <Store aria-hidden="true" className="size-5" />
        Shop
      </Link>
    </div>
  );
}
