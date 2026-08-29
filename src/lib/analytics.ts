/**
 * Analytics event tracking, ready to wire up to whichever tool the
 * business chooses (GA4, Meta Pixel, etc.) — no analytics ID is invented
 * here. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and load the provider's script
 * in `src/app/layout.tsx` when one is chosen; `trackEvent` already no-ops
 * safely until then.
 */

export type AnalyticsEvent =
  | "gold_rate_view"
  | "gold_calculator_used"
  | "gold_valuation_submit"
  | "whatsapp_click"
  | "phone_click"
  | "doorstep_booking"
  | "location_page_view"
  | "service_click"
  | "cta_click"
  | "career_apply_click";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${event}`, payload);
  }
}
