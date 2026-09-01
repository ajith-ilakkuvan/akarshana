import type { PointerEvent } from "react";

/**
 * Tracks the cursor's position within a `.gold-glow-hover` element as CSS
 * custom properties, so the spotlight glow in globals.css follows the
 * pointer continuously as it moves — unlike `setLiquidOrigin` (liquidFill.ts),
 * which records a single entry point for a one-shot wipe. Bind this to both
 * `onPointerEnter` and `onPointerMove`. Mutates the DOM directly via the
 * event target, so it doesn't trigger a React re-render on every mouse move.
 */
export function setGlowPosition<T extends HTMLElement>(event: PointerEvent<T>): void {
  if (event.pointerType === "touch") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--glow-x", `${x}%`);
  el.style.setProperty("--glow-y", `${y}%`);
}
