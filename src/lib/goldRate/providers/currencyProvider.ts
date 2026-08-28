import { goldRateConfig } from "@/config/goldRate";
import type { CurrencyRate, CurrencyRateProvider } from "../types";
import { fetchWithTimeout } from "../fetchWithTimeout";

/**
 * The gold spot price is quoted in USD per troy ounce, so it needs
 * converting to INR. This provider uses Frankfurter (ECB reference rates,
 * free, no API key) and is only ever consulted as a secondary lookup — if
 * it fails, `GoldRateService` falls back to cached or configured rates
 * rather than failing the whole gold-rate feature.
 */
export class FrankfurterCurrencyProvider implements CurrencyRateProvider {
  async getUsdToInr(): Promise<CurrencyRate> {
    const response = await fetchWithTimeout(goldRateConfig.currencyApiUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      timeoutMs: goldRateConfig.requestTimeoutMs,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Currency API request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const rate = extractRate(payload);

    if (rate === null || !Number.isFinite(rate) || rate <= 0) {
      throw new Error("Currency API response did not contain a usable INR rate");
    }

    return { rate, source: "Frankfurter" };
  }
}

function extractRate(payload: unknown): number | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const rates = record.rates;
  if (typeof rates === "object" && rates !== null) {
    const inr = (rates as Record<string, unknown>).INR;
    if (typeof inr === "number") return inr;
  }
  return null;
}
