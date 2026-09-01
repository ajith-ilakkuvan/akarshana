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
const MAX_18K_EXTRA_PREMIUM_PERCENT = 15;

/**
 * The free gold-api.com feed returns the raw international spot price
 * (XAU/USD), converted to INR — it does not include India's import duty,
 * GST, or the local bullion-market premium baked into a domestically
 * quoted rate (e.g. what NDTV's Chennai gold-rate page publishes), so it
 * reads lower than that by design, not by bug. This percentage is added
 * on top of the raw converted 24K rate (and therefore the 22K rate
 * derived from it, since 22K = 24K x 22/24 in both the raw feed and real
 * domestic quotes) to close that gap without paying for a domestic
 * bullion API.
 *
 * Default calibrated 2026-09-01 against NDTV's Chennai gold rate
 * (https://www.ndtv.com/gold-rate/gold-price-chennai): raw 24K ₹13,339
 * vs NDTV ₹15,664 = +17.43%; raw 22K ₹12,227 vs NDTV ₹14,359 confirms
 * the same ~17.43% gap. This is a markup on duty/GST/market premium,
 * which drifts slowly (weeks/months), not on the spot price itself
 * (which already updates live) — so it doesn't need daily updating, but
 * should be re-checked against a real quote periodically and the
 * default below (or the env var) adjusted if the gap has moved.
 */
function parseDomesticPremiumPercent(): number {
  const raw = Number(process.env.GOLD_RATE_DOMESTIC_PREMIUM_PERCENT);
  if (!Number.isFinite(raw) || raw < 0) return 17.43;
  return Math.min(raw, MAX_DOMESTIC_PREMIUM_PERCENT);
}

/**
 * 18K in Indian domestic quotes runs a bit above pure 18/24 fineness
 * math (unlike 22K, which lines up with fineness almost exactly) — this
 * extra percentage is applied to the 18K tier only, on top of
 * `domesticPremiumPercent`, to match that.
 *
 * Default calibrated the same day/source as above: with the 17.43%
 * base premium applied, raw 18K lands at ₹11,748 vs NDTV's ₹12,131 —
 * an extra +3.26% closes that remaining gap.
 */
function parse18kExtraPremiumPercent(): number {
  const raw = Number(process.env.GOLD_RATE_18K_EXTRA_PREMIUM_PERCENT);
  if (!Number.isFinite(raw) || raw < 0) return 3.26;
  return Math.min(raw, MAX_18K_EXTRA_PREMIUM_PERCENT);
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
  /** See `parse18kExtraPremiumPercent` above for what this is and how to set it. */
  premium18kExtraPercent: parse18kExtraPremiumPercent(),
  /** Fetch timeout so a slow upstream never hangs a page request. */
  requestTimeoutMs: 8000,
  source: "Gold API",
} as const;
