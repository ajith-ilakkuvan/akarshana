import "server-only";
import { createHmac } from "node:crypto";

/**
 * Thin Razorpay integration via direct REST calls (Basic Auth with
 * key_id:key_secret) rather than the `razorpay` SDK — one HTTP call and one
 * HMAC check don't need an extra dependency. Swap RAZORPAY_KEY_ID /
 * RAZORPAY_KEY_SECRET for live keys when the client's merchant account is
 * ready; everything else here is provider-agnostic in shape.
 */

const RAZORPAY_API = "https://api.razorpay.com/v1";

function isConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function authHeader(): string {
  const credentials = `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

/** Creates a Razorpay order for `amountInRupees`. Throws if keys aren't configured. */
export async function createRazorpayOrder(amountInRupees: number, receipt: string): Promise<RazorpayOrder> {
  if (!isConfigured()) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (test-mode keys work for development).",
    );
  }

  const response = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amountInRupees * 100),
      currency: "INR",
      receipt,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Razorpay order creation failed (${response.status}): ${body}`);
  }

  return response.json();
}

export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");
  return expected === params.signature;
}

export function isRazorpayConfigured(): boolean {
  return isConfigured();
}
