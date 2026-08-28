import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export interface Crumb {
  label: string;
  href: string;
}

/** Visual breadcrumb trail. Pair with `BreadcrumbJsonLd` for structured data. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight aria-hidden="true" className="size-3.5 text-charcoal/30" />}
              {isLast ? (
                <span aria-current="page" className="font-medium text-charcoal">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-brand-red">
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
