import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { setLiquidOrigin } from "@/lib/liquidFill";

type Variant = "primary" | "secondary" | "outline" | "outlineOnDark" | "ghost";
type Size = "md" | "lg" | "sm";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark shadow-sm shadow-brand-red/20",
  secondary:
    "bg-brand-gold text-charcoal hover:bg-brand-gold-dark hover:text-white",
  outline:
    "border border-charcoal/20 text-charcoal hover:border-brand-red hover:text-brand-red bg-white",
  /** Outline button meant to sit on a red/dark background — no opaque fill. */
  outlineOnDark:
    "border border-white/40 text-white hover:border-brand-gold hover:text-brand-gold-light",
  ghost: "text-charcoal hover:text-brand-red",
};

/**
 * Same variants, but without each one's flat `hover:bg-*` — when `liquid`
 * is on, the expanding `.liquid-fill__layer` provides the color change
 * instead, so a competing flat hover background would just fight it.
 * Hover text/border colors are kept since those still read fine layered
 * on top of the liquid wave.
 */
const variantStylesLiquid: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:text-charcoal shadow-sm shadow-brand-red/20",
  secondary: "bg-brand-gold text-charcoal hover:text-white",
  outline: "border border-charcoal/20 text-charcoal hover:border-brand-red hover:text-brand-red bg-white",
  outlineOnDark: "border border-white/40 text-white hover:border-brand-gold hover:text-brand-gold-light",
  ghost: "text-charcoal hover:text-brand-red",
};

/** Fill color the liquid wave expands in, chosen per variant for contrast. */
const liquidFillColor: Record<Variant, string> = {
  primary: "bg-brand-gold",
  secondary: "bg-brand-red-dark",
  outline: "bg-brand-red/10",
  outlineOnDark: "bg-white/15",
  ghost: "bg-brand-red/5",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-7 py-4 text-base sm:text-lg",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  /** Liquid-fill hover animation, expanding from wherever the cursor entered. */
  liquid?: boolean;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, liquid = false, ...rest } = props;
  const classes = cn(
    baseStyles,
    liquid ? variantStylesLiquid[variant] : variantStyles[variant],
    sizeStyles[size],
    liquid && "liquid-fill",
    className,
  );

  const content = liquid ? (
    <>
      <span aria-hidden="true" className={cn("liquid-fill__layer", liquidFillColor[variant])} />
      <span className="liquid-fill__content inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  ) : (
    <>
      {children}
      {icon}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = rest as ButtonAsLink;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onPointerEnter={liquid ? setLiquidOrigin : undefined}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} onPointerEnter={liquid ? setLiquidOrigin : undefined} {...buttonRest}>
      {content}
    </button>
  );
}
