"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/analytics";
import { ctaLabels } from "@/config/navigation";

interface Props {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock: number;
}

export function AddToCartButton({ productId, name, slug, price, image, stock }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = stock <= 0;

  function handleAdd() {
    if (outOfStock) return;
    addItem({ productId, name, slug, price, image, stock }, quantity);
    trackEvent("add_to_cart", { productId, quantity });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  function handleBuyNow() {
    if (outOfStock) return;
    addItem({ productId, name, slug, price, image, stock }, quantity);
    trackEvent("add_to_cart", { productId, quantity, source: "buy_now" });
    router.push("/checkout/");
  }

  if (outOfStock) {
    return (
      <Button variant="outline" size="lg" disabled className="w-full sm:w-auto">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantityStepper quantity={quantity} max={stock} onChange={setQuantity} />
      <Button variant="outline" size="lg" icon={justAdded ? <Check className="size-4" /> : <ShoppingBag className="size-4" />} onClick={handleAdd}>
        {justAdded ? "Added" : ctaLabels.addToCart}
      </Button>
      <Button size="lg" onClick={handleBuyNow}>
        {ctaLabels.buyNow}
      </Button>
    </div>
  );
}
