"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";

const crumbs = [{ label: "Cart", href: "/cart/" }];

export default function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeItem, isHydrated } = useCart();

  return (
    <>
      <PageHeader crumbs={crumbs} title="Your Cart" />

      <section className="py-10 sm:py-14">
        <Container>
          {!isHydrated ? null : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-charcoal/20 bg-cream py-20 text-center">
              <ShoppingBag aria-hidden="true" className="size-10 text-charcoal/30" />
              <p className="text-charcoal/70">Your cart is empty.</p>
              <Button href="/shop/">Continue Shopping</Button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-4 rounded-2xl border border-charcoal/10 bg-white p-4"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-cream">
                      {item.image && <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/product/${item.slug}/`} className="font-display font-semibold text-charcoal hover:text-brand-black">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-charcoal/60">{formatInr(item.price)} each</p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.productId)}
                          className="text-charcoal/40 hover:text-brand-black"
                        >
                          <Trash2 aria-hidden="true" className="size-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          quantity={item.quantity}
                          max={item.stock}
                          onChange={(next) => updateQuantity(item.productId, next)}
                        />
                        <span className="font-display font-semibold text-charcoal">
                          {formatInr(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="h-fit rounded-2xl border border-charcoal/10 bg-cream p-6">
                <h2 className="font-display text-lg font-semibold text-charcoal">Order Summary</h2>
                <dl className="mt-4 space-y-2 text-sm text-charcoal/70">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{formatInr(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd>{shipping === 0 ? "Free" : formatInr(shipping)}</dd>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-charcoal/50">
                      Free shipping on orders above {formatInr(FREE_SHIPPING_THRESHOLD)}.
                    </p>
                  )}
                </dl>
                <div className="mt-4 flex justify-between border-t border-charcoal/10 pt-4 font-display text-lg font-semibold text-charcoal">
                  <span>Total</span>
                  <span>{formatInr(total)}</span>
                </div>
                <Button href="/checkout/" className="mt-6 w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
