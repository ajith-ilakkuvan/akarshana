import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Display height per context — the source art is a tall vertical lockup (icon + wordmark + tagline stacked), not a wide horizontal one, so it reads best sized by height with auto width rather than stretched into a header-bar strip. */
const sizeStyles = {
  default: "h-14 w-auto sm:h-16",
  lg: "h-20 w-auto sm:h-24",
};

/** Icon-only mark is a squarer crop, so it needs a shorter height to visually match the full lockup's footprint next to a name. Smaller still on mobile, where it shares the header bar with the name text and the phone/WhatsApp/menu icons. */
const markSizeStyles = {
  default: "h-9 w-auto sm:h-12",
  lg: "h-16 w-auto sm:h-20",
};

export function Logo({
  className,
  size = "default",
  variant = "full",
}: {
  className?: string;
  size?: keyof typeof sizeStyles;
  /** "mark" pairs the icon-only crop with the English/Tamil name as separate text, for the header. "full" (default) is the single vertical lockup image with the wordmark baked in — used everywhere else so the name isn't rendered twice. */
  variant?: "full" | "mark";
}) {
  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={className ? `flex items-center gap-3 ${className}` : "flex items-center gap-3"}
        aria-label={`${siteConfig.legalName} — home`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size static brand asset, served as-is */}
        <img
          src={siteConfig.logoMark.src}
          alt=""
          width={siteConfig.logoMark.width}
          height={siteConfig.logoMark.height}
          className={markSizeStyles[size]}
        />
        <span className="flex flex-col leading-tight">
          <span className="whitespace-nowrap font-display text-xs font-semibold text-charcoal sm:text-base lg:text-lg">
            {siteConfig.legalName}
          </span>
          <span className="whitespace-nowrap font-tamil text-[10px] text-charcoal/60 sm:text-xs lg:text-sm">
            {siteConfig.legalNameTamil}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={className} aria-label={`${siteConfig.name} — home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size static brand asset, served as-is */}
      <img
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className={sizeStyles[size]}
      />
    </Link>
  );
}
