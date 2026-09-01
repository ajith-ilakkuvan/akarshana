import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href: string;
}

/** Visual breadcrumb trail. Pair with `BreadcrumbJsonLd` for structured data. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm", tone === "dark" ? "text-white/70" : "text-charcoal/60")}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className={cn("size-3.5", tone === "dark" ? "text-white/40" : "text-charcoal/30")}
                />
              )}
              {isLast ? (
                <span aria-current="page" className={cn("font-medium", tone === "dark" ? "text-white" : "text-charcoal")}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={tone === "dark" ? "hover:text-brand-gold-light" : "hover:text-brand-black"}>
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[]) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };
}
