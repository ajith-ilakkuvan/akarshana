"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type RevealVariant = "fade-up" | "fade-in" | "scale-in";
type RevealTag = "div" | "li" | "span";

const variantClasses: Record<RevealVariant, { hidden: string; visible: string }> = {
  "fade-up": { hidden: "opacity-0 translate-y-6", visible: "opacity-100 translate-y-0" },
  "fade-in": { hidden: "opacity-0", visible: "opacity-100" },
  "scale-in": { hidden: "opacity-0 scale-95", visible: "opacity-100 scale-100" },
};

/**
 * Reusable scroll-reveal wrapper — the single place scroll animation logic
 * lives. Every homepage/page section should compose this instead of
 * re-implementing IntersectionObserver logic.
 *
 * - Uses opacity/transform only, so it never causes layout shift (CLS).
 * - Disables itself when the visitor prefers reduced motion.
 * - Animates once (unobserves after the first intersection).
 */
export function Reveal({
  children,
  variant = "fade-up",
  delayMs = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement & HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const isVisible = reducedMotion || visible;
  const { hidden, visible: visibleClass } = variantClasses[variant];
  const classes = cn(
    "transition-all duration-700 ease-out will-change-transform",
    isVisible ? visibleClass : hidden,
    className,
  );
  const style = { transitionDelay: isVisible ? `${delayMs}ms` : "0ms" };

  if (as === "li") {
    return (
      <li ref={ref} className={classes} style={style}>
        {children}
      </li>
    );
  }

  if (as === "span") {
    return (
      <span ref={ref} className={classes} style={style}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}

/** Applies staggered Reveal delays to a list of items — for card grids. */
export function RevealGroup({
  children,
  variant = "fade-up",
  staggerMs = 90,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  variant?: RevealVariant;
  staggerMs?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} variant={variant} delayMs={index * staggerMs} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
