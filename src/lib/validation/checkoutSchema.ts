import { z } from "zod";

export const checkoutAddressSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+ ]{10,15}$/, "Enter a valid phone number"),
  addressLine1: z.string().trim().min(4, "Enter your address").max(200),
  addressLine2: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Enter your city").max(100),
  state: z.string().trim().min(2, "Enter your state").max(100),
  pincode: z.string().trim().regex(/^[0-9]{6}$/, "Enter a valid 6-digit pincode"),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

export const createOrderRequestSchema = z.object({
  address: checkoutAddressSchema,
  items: z.array(cartItemSchema).min(1, "Your cart is empty"),
});

export const verifyPaymentRequestSchema = z.object({
  orderId: z.string().min(1),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export type CheckoutAddress = z.infer<typeof checkoutAddressSchema>;
export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;
