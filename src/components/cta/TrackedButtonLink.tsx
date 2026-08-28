"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * `Button` (as a link) with an analytics event attached — see
 * `TrackedNavLink` for why this needs to be its own Client Component
 * rather than a Server Component passing an inline onClick down.
 */
export function TrackedButtonLink({
  event,
  eventPayload,
  ...buttonProps
}: {
  event: AnalyticsEvent;
  eventPayload?: Record<string, string | number | boolean | undefined>;
} & Extract<ButtonProps, { href: string }>) {
  return <Button {...buttonProps} onClick={() => trackEvent(event, eventPayload)} />;
}
