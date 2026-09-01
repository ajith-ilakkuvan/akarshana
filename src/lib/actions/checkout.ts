"use server";

import { db } from "@/lib/db";
import { createRazorpayOrder, verifyRazorpaySignature, isRazorpayConfigured } from "@/lib/razorpay";
import { checkRateLimit } from "@/lib/rateLimit";
import { calculateShipping } from "@/lib/cart";
import { createOrderRequestSchema, verifyPaymentRequestSchema } from "@/lib/validation/checkoutSchema";
import { headers } from "next/headers";

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `PJ${year}${random}`;
}

export interface CreateOrderResult {
  ok: boolean;
  error?: string;
  razorpayConfigured?: boolean;
  orderId?: string;
  orderNumber?: string;
  razorpayOrderId?: string;
  amount?: number;
  keyId?: string;
}

/**
 * Re-validates cart contents server-side (never trusts client-sent prices),
 * creates a PENDING order in our DB, and — if Razorpay is configured — a
 * matching Razorpay order for the same amount. If Razorpay isn't
 * configured yet (no merchant account set up), the order is still saved as
 * PENDING so the team can follow up manually, and the UI shows a clear
 * "payment isn't live yet" message instead of a broken checkout.
 */
export async function createCheckoutOrder(input: unknown): Promise<CreateOrderResult> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const rateLimit = checkRateLimit(`checkout:${ip}`);
  if (!rateLimit.allowed) {
    return { ok: false, error: "Too many attempts. Please wait a moment and try again." };
  }

  const parsed = createOrderRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid checkout request." };
  }
  const { address, items } = parsed.data;

  const products = await db.product.findMany({
    where: { id: { in: items.map((item) => item.productId) }, isActive: true },
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));
  let subtotal = 0;
  const orderItemsData: {
    productId: string;
    productName: string;
    productImage: string | null;
    price: number;
    quantity: number;
  }[] = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) return { ok: false, error: "One of the items in your cart is no longer available." };
    if (product.stock < item.quantity) {
      return { ok: false, error: `Only ${product.stock} of "${product.name}" left in stock.` };
    }
    subtotal += product.price * item.quantity;
    orderItemsData.push({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.url ?? null,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const orderNumber = generateOrderNumber();

  const order = await db.order.create({
    data: {
      orderNumber,
      customerName: address.customerName,
      email: address.email,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || null,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      subtotal,
      shipping,
      total,
      status: "PENDING",
      items: { create: orderItemsData },
    },
  });

  if (!isRazorpayConfigured()) {
    return { ok: true, razorpayConfigured: false, orderId: order.id, orderNumber: order.orderNumber };
  }

  try {
    const razorpayOrder = await createRazorpayOrder(total, order.orderNumber);
    await db.order.update({ where: { id: order.id }, data: { razorpayOrderId: razorpayOrder.id } });
    return {
      ok: true,
      razorpayConfigured: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Could not start payment." };
  }
}

export interface VerifyPaymentResult {
  ok: boolean;
  error?: string;
  orderNumber?: string;
}

export async function verifyCheckoutPayment(input: unknown): Promise<VerifyPaymentResult> {
  const parsed = verifyPaymentRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid payment verification request." };
  }
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;

  const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order || order.razorpayOrderId !== razorpayOrderId) {
    return { ok: false, error: "Order not found." };
  }

  const validSignature = verifyRazorpaySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  });

  if (!validSignature) {
    await db.order.update({ where: { id: order.id }, data: { status: "FAILED" } });
    return { ok: false, error: "Payment verification failed." };
  }

  await db.$transaction([
    db.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        razorpayPaymentId,
        razorpaySignature,
      },
    }),
    ...order.items.map((item) =>
      db.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      }),
    ),
  ]);

  return { ok: true, orderNumber: order.orderNumber };
}

/** Marks a PENDING order as PAID without Razorpay, for the "not configured yet" path — used only when isRazorpayConfigured() is false, so there is no real payment to fake. */
export async function confirmOfflineOrder(orderId: string): Promise<VerifyPaymentResult> {
  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) return { ok: false, error: "Order not found." };
  if (isRazorpayConfigured()) return { ok: false, error: "Online payment is available — please complete checkout normally." };

  return { ok: true, orderNumber: order.orderNumber };
}
