"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  quantity,
  max,
  onChange,
}: {
  quantity: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-charcoal/20">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="flex size-9 items-center justify-center text-charcoal disabled:opacity-30"
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-charcoal">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="flex size-9 items-center justify-center text-charcoal disabled:opacity-30"
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
