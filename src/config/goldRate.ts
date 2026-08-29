/**
 * Gold rate PROVIDER configuration — server-only. This file reads secret
 * and semi-sensitive environment variables and must never be imported from
 * a Client Component; it is only ever used inside `src/lib/goldRate/`
 * (server-side) and API routes. Purity math constants that ARE safe to use
 * on the client live in `./goldPurity.ts`.
 *
 * Everything provider-specific lives behind environment variables so the
 * business can switch providers (or plug in its own approved buying rates)
 * without touching application code. See `.env.example` for the full list
 * with descriptions.
 */
import "server-only";

const DEFAULT_CACHE_SECONDS = 180;
const MIN_CACHE_SECONDS = 60;
const MAX_CACHE_SECONDS = 300;

function parseCacheSeconds(): number {
  const raw = Number(process.env.GOLD_RATE_CACHE_SECONDS);
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_CACHE_SECONDS;
  return Math.min(Math.max(raw, MIN_CACHE_SECONDS), MAX_CACHE_SECONDS);
}

const MAX_DOMESTIC_PREMIUM_PERCENT = 30;

/**
 * The free gold-api.com feed returns the raw international spot price
 * (XAU/USD), converted to INR — it does not include India's import duty,
 * GST, or the local bullion-market premium baked into a domestically
 * quoted rate (e.g. what a Chennai jewellers' association publishes), so
 * it reads lower than that by design, not by bug. This env-configurable
 * percentage is added on top of the raw converted rate to close that gap
 * without paying for a domestic bullion API. It defaults to 0 (raw
 * international rate, unchanged) — set it only after comparing today's
 * calculated rate against a real domestic quote and picking a percentage
 * that closes the gap you actually observe; re-check it periodically,
 * since the gap moves with duty/GST changes and local market premiums.
 */
function parseDomesticPremiumPercent(): number {
  const raw = Number(process.env.GOLD_RATE_DOMESTIC_PREMIUM_PERCENT);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  return Math.min(raw, MAX_DOMESTIC_PREMIUM_PERCENT);
}

export const goldRateConfig = {
  /** Gold spot price provider (defaults to the free Gold API). */
  apiUrl: process.env.GOLD_PRICE_API_URL || "https://api.gold-api.com/price/XAU",
  /** Optional — the current free endpoint does not require a key. */
  apiKey: process.env.GOLD_PRICE_API_KEY || "",
  /** USD → INR conversion source (the gold API returns USD per troy ounce). */
  currencyApiUrl:
    process.env.CURRENCY_API_URL || "https://api.frankfurter.dev/v1/latest?from=USD&to=INR",
  /**
   * Last-resort USD→INR rate used only if the live currency API is
   * unreachable AND there is no cached conversion to fall back to. This is
   * a foreign-exchange fallback, not a fabricated gold price — the gold
   * price itself always comes from the live provider or a timestamped
   * cache, never a hardcoded number.
   */
  fallbackUsdToInr: Number(process.env.GOLD_RATE_FALLBACK_USD_INR) || 88,
  cacheSeconds: parseCacheSeconds(),
  /** See `parseDomesticPremiumPercent` above for what this is and how to set it. */
  domesticPremiumPercent: parseDomesticPremiumPercent(),
  /** Fetch timeout so a slow upstream never hangs a page request. */
  requestTimeoutMs: 8000,
  source: "Gold API",
} as const;
