"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { CART_STORAGE_KEY, calculateTotal, type CartItem } from "@/lib/cart";
import { useIsHydrated } from "@/hooks/useIsHydrated";

/**
 * Module-scoped external store rather than plain useState + a
 * useEffect(() => setItems(readLocalStorage())) hydration effect — reading
 * localStorage and syncing it straight into state inside an effect is
 * exactly the "external system sync" case useSyncExternalStore exists for
 * (see useScrolled/useReducedMotion for the same pattern in this codebase),
 * and avoids the cascading-render footgun of setState-in-effect.
 */
const EMPTY_CART: CartItem[] = [];
let cartState: CartItem[] = EMPTY_CART;
let didHydrate = false;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch {
    // Storage may be full or blocked (private browsing) — cart just won't persist.
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Lazily hydrates from localStorage on first client read, then is a plain field access. */
function getSnapshot(): CartItem[] {
  if (!didHydrate) {
    didHydrate = true;
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) cartState = JSON.parse(stored);
    } catch {
      // Corrupt/blocked storage — start with an empty cart rather than crashing.
    }
  }
  return cartState;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useIsHydrated();

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    const existing = cartState.find((entry) => entry.productId === item.productId);
    cartState = existing
      ? cartState.map((entry) =>
          entry.productId === item.productId
            ? { ...entry, quantity: Math.min(entry.quantity + quantity, entry.stock) }
            : entry,
        )
      : [...cartState, { ...item, quantity: Math.min(quantity, item.stock) }];
    persist();
    notify();
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartState = cartState
      .map((entry) => (entry.productId === productId ? { ...entry, quantity: Math.max(0, quantity) } : entry))
      .filter((entry) => entry.quantity > 0);
    persist();
    notify();
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartState = cartState.filter((entry) => entry.productId !== productId);
    persist();
    notify();
  }, []);

  const clearCart = useCallback(() => {
    cartState = [];
    persist();
    notify();
  }, []);

  const totals = useMemo(() => calculateTotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, itemCount, ...totals, addItem, updateQuantity, removeItem, clearCart, isHydrated }),
    [items, itemCount, totals, addItem, updateQuantity, removeItem, clearCart, isHydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
