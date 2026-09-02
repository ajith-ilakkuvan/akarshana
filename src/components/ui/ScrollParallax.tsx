"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Wraps a single decorative element and gives it a gentle, bounded drift
 * tied to scroll position — `amplitude * sin(scrollY / wavelength + phase)`
 * rather than a linear multiple of scroll position, so the motion stays a
 * soft float regardless of how far the page scrolls (no risk of the shape
 * drifting off-screen on a long page, and a one-screen page like Privacy
 * Policy gets the same scale of movement as the long homepage).
 *
 * Purely visual — always renders `aria-hidden` and `pointer-events-none`,
 * so it never needs repeating at call sites and can never intercept a
 * click. The transform is written directly to the DOM node (not React
 * state) and only recalculated once per animation frame while a scroll
 * event is in flight, matching the same "mutate directly, no re-render"
 * approach as the site's other cursor/scroll-driven effects (liquid-fill,
 * gold-glow). No scroll listener attaches at all when the visitor prefers
 * reduced motion — the shape renders once, statically, and stays put.
 */
export function ScrollParallax({
  children,
  amplitudeX = 0,
  amplitudeY = 24,
  wavelength = 900,
  phase = 0,
  className,
}: {
  children: ReactNode;
  amplitudeX?: number;
  amplitudeY?: number;
  wavelength?: number;
  phase?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const apply = () => {
      const y = amplitudeY * Math.sin(window.scrollY / wavelength + phase);
      const x = amplitudeX * Math.cos(window.scrollY / wavelength + phase);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, amplitudeX, amplitudeY, wavelength, phase]);

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none", className)}>
      {children}
    </div>
  );
}
