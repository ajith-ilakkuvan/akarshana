import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

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

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-7 py-4 text-base sm:text-lg",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
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
  const { variant = "primary", size = "md", className, children, icon, ...rest } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = rest as ButtonAsLink;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
      {icon}
    </button>
  );
}
