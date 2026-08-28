import type { PointerEvent } from "react";

/**
 * Records where the cursor entered a `.liquid-fill` element as CSS custom
 * properties, so the fill wave in globals.css expands from that exact
 * point. Mutates the DOM directly via the event target — no React state,
 * so it doesn't trigger a re-render on every hover.
 */
export function setLiquidOrigin<T extends HTMLElement>(event: PointerEvent<T>): void {
  if (event.pointerType === "touch") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--liquid-x", `${x}%`);
  el.style.setProperty("--liquid-y", `${y}%`);
}
