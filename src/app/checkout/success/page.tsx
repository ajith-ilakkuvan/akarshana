import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { formatInr } from "@/lib/utils";
import { contactConfig, whatsappHref } from "@/config/contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; pending?: string }>;
}) {
  const { order: orderNumber, pending } = await searchParams;
  const order = orderNumber
    ? await db.order.findUnique({ where: { orderNumber }, include: { items: true } })
    : null;

  return (
    <section className="py-20">
      <Container className="mx-auto max-w-xl text-center">
        {order ? (
          <>
            <CheckCircle2 aria-hidden="true" className="mx-auto size-14 text-green-600" />
            <h1 className="mt-6 font-display text-3xl font-bold text-charcoal">
              {pending ? "Order Received" : "Order Confirmed"}
            </h1>
            <p className="mt-3 text-charcoal/70">
              Thank you, {order.customerName}. Your order <strong>{order.orderNumber}</strong> for{" "}
              {formatInr(order.total)} has been {pending ? "received" : "placed"}.
            </p>

            {pending && (
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-900">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <p>
                  Online payment isn&apos;t live yet — our team will reach out on WhatsApp or phone to confirm payment
                  and delivery for this order.
                </p>
              </div>
            )}

            <ul className="mt-8 space-y-2 rounded-2xl border border-charcoal/10 bg-cream p-5 text-left text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between text-charcoal/70">
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>{formatInr(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/shop/">Continue Shopping</Button>
              <Button href={whatsappHref(`Hi, I'd like an update on order ${order.orderNumber}.`)} variant="outline" target="_blank" rel="noopener noreferrer">
                Message Us on WhatsApp
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold text-charcoal">Order Not Found</h1>
            <p className="mt-3 text-charcoal/70">
              We couldn&apos;t find that order. If you just completed a payment, contact us at {contactConfig.phoneDisplay} and
              we&apos;ll confirm it right away.
            </p>
            <Button href="/shop/" className="mt-8">
              Back to Shop
            </Button>
          </>
        )}
        <p className="mt-8">
          <Link href="/" className="text-sm text-charcoal/60 hover:text-brand-black">
            ← Back to home
          </Link>
        </p>
      </Container>
    </section>
  );
}
