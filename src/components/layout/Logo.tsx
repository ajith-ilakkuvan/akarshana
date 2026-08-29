import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Display height per context — the source art is a tall vertical lockup (icon + wordmark + tagline stacked), not a wide horizontal one, so it reads best sized by height with auto width rather than stretched into a header-bar strip. */
const sizeStyles = {
  default: "h-14 w-auto sm:h-16",
  lg: "h-20 w-auto sm:h-24",
};

export function Logo({ className, size = "default" }: { className?: string; size?: keyof typeof sizeStyles }) {
  return (
    <Link href="/" className={className} aria-label={`${siteConfig.name} — home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size static brand asset, served as-is */}
      <img
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className={cn(sizeStyles[size], "rounded-md")}
      />
    </Link>
  );
}
