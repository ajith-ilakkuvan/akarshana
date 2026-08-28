"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * next/link wrapper that fires an analytics event on click. Exists so
 * Server Components can render a tracked internal link without needing to
 * pass an event-handler function across the server/client boundary
 * themselves (React forbids that) — this component owns the handler.
 */
export function TrackedNavLink({
  href,
  event,
  eventPayload,
  children,
  ...rest
}: {
  href: string;
  event: AnalyticsEvent;
  eventPayload?: Record<string, string | number | boolean | undefined>;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} {...rest} onClick={() => trackEvent(event, eventPayload)}>
      {children}
    </Link>
  );
}
