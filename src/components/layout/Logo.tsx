import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label={`${siteConfig.name} — home`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static vector, no optimization needed */}
      <img
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
