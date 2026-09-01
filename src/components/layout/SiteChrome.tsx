"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Swaps between the public storefront chrome (header/footer/mobile CTA
 * bar) and a bare shell for /admin — the admin dashboard has its own
 * sidebar shell (AdminShell) and showing the customer-facing nav above an
 * internal tool would be confusing. Header/Footer/MobileStickyCta are
 * rendered by the (server) root layout and passed in as already-rendered
 * elements, rather than imported here, so they stay Server Components
 * instead of being pulled into the client bundle just to gate them on
 * `usePathname()`.
 */
export function SiteChrome({
  header,
  footer,
  mobileCta,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  mobileCta: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main-content" className="pb-16 lg:pb-0">
        {children}
      </main>
      {footer}
      {mobileCta}
    </>
  );
}
