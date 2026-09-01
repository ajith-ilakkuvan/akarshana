import type { PointerEvent } from "react";

/**
 * Tracks the cursor's position within a `.glow-card` element as CSS custom
 * properties, so the radial gold spotlight overlay in globals.css can
 * follow the pointer as it moves across the card, rather than sitting
 * fixed in the center. Mutates the DOM directly via the event target — no
 * React state, so it doesn't trigger a re-render on every pointer move.
 */
export function setSpotlightPosition<T extends HTMLElement>(event: PointerEvent<T>): void {
  if (event.pointerType === "touch") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--spot-x", `${x}%`);
  el.style.setProperty("--spot-y", `${y}%`);
}
