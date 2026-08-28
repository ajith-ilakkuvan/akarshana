"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** Plain anchor (tel:/wa.me links) that fires an analytics event on click. */
export function TrackedLink({
  event,
  eventPayload,
  children,
  ...rest
}: {
  event: AnalyticsEvent;
  eventPayload?: Record<string, string | number | boolean | undefined>;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} onClick={() => trackEvent(event, eventPayload)}>
      {children}
    </a>
  );
}
