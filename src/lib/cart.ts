export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

export const CART_STORAGE_KEY = "prashwa-cart";
/** Flat-rate shipping in rupees. Free above the threshold. */
export const SHIPPING_FLAT_RATE = 250;
export const FREE_SHIPPING_THRESHOLD = 25000;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
}

export function calculateTotal(items: CartItem[]): { subtotal: number; shipping: number; total: number } {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}
