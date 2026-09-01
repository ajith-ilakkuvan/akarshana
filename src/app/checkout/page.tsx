"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { createCheckoutOrder, verifyCheckoutPayment } from "@/lib/actions/checkout";
import { checkoutAddressSchema, type CheckoutAddress } from "@/lib/validation/checkoutSchema";
import { formatInr } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const crumbs = [{ label: "Cart", href: "/cart/" }, { label: "Checkout", href: "/checkout/" }];

const initialAddress: CheckoutAddress = {
  customerName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart, isHydrated } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState<CheckoutAddress>(initialAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutAddress, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Clearing the cart on a successful order also drops items.length to 0,
  // which would otherwise race the effect below into bouncing the user
  // back to /cart/ instead of letting the success-page navigation win.
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (isHydrated && items.length === 0 && !orderPlacedRef.current) router.replace("/cart/");
  }, [isHydrated, items.length, router]);

  function handleChange(field: keyof CheckoutAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsed = checkoutAddressSchema.safeParse(address);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CheckoutAddress, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof CheckoutAddress;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    trackEvent("begin_checkout", { itemCount: items.length, total });

    try {
      const result = await createCheckoutOrder({
        address: parsed.data,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      });

      if (!result.ok) {
        setFormError(result.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (!result.razorpayConfigured) {
        orderPlacedRef.current = true;
        clearCart();
        router.push(`/checkout/success/?order=${result.orderNumber}&pending=1`);
        return;
      }

      if (!window.Razorpay) {
        setFormError("Payment could not load. Please check your connection and try again.");
        setSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: result.keyId,
        amount: result.amount,
        currency: "INR",
        name: "Prashwa Jewels",
        description: "Order payment",
        order_id: result.razorpayOrderId,
        prefill: { name: parsed.data.customerName, email: parsed.data.email, contact: parsed.data.phone },
        theme: { color: "#1a160f" },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verification = await verifyCheckoutPayment({
            orderId: result.orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          if (verification.ok) {
            trackEvent("purchase", { orderNumber: verification.orderNumber, total });
            orderPlacedRef.current = true;
            clearCart();
            router.push(`/checkout/success/?order=${verification.orderNumber}`);
          } else {
            setFormError(verification.error ?? "Payment verification failed. Please contact us with your order details.");
          }
          setSubmitting(false);
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });
      razorpay.open();
    } catch {
      setFormError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (!isHydrated || items.length === 0) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <PageHeader crumbs={crumbs} title="Checkout" />

      <section className="py-10 sm:py-14">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">Shipping Details</h2>

            <Field label="Full Name" error={errors.customerName}>
              <input
                value={address.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                className="input"
                autoComplete="name"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="input"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  value={address.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="input"
                  autoComplete="tel"
                />
              </Field>
            </div>
            <Field label="Address Line 1" error={errors.addressLine1}>
              <input
                value={address.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
                className="input"
                autoComplete="address-line1"
              />
            </Field>
            <Field label="Address Line 2 (optional)">
              <input
                value={address.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
                className="input"
                autoComplete="address-line2"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="City" error={errors.city}>
                <input value={address.city} onChange={(e) => handleChange("city", e.target.value)} className="input" />
              </Field>
              <Field label="State" error={errors.state}>
                <input value={address.state} onChange={(e) => handleChange("state", e.target.value)} className="input" />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input value={address.pincode} onChange={(e) => handleChange("pincode", e.target.value)} className="input" />
              </Field>
            </div>

            {formError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Processing..." : `Pay ${formatInr(total)}`}
            </Button>
          </form>

          <div className="h-fit rounded-2xl border border-charcoal/10 bg-cream p-6">
            <h2 className="font-display text-lg font-semibold text-charcoal">Order Summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between text-charcoal/70">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatInr(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm text-charcoal/70">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatInr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatInr(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex justify-between border-t border-charcoal/10 pt-3 font-display text-lg font-semibold text-charcoal">
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
