import { goldRateConfig } from "@/config/goldRate";
import type { GoldPriceProvider, SpotPrice } from "../types";
import { fetchWithTimeout } from "../fetchWithTimeout";

/**
 * Provider for https://gold-api.com/ (base: https://api.gold-api.com).
 *
 * The service publishes a `GET /price/{symbol}` endpoint (symbol `XAU` for
 * gold) that returns the current spot price in USD per troy ounce, with no
 * API key required. Parsing below is deliberately tolerant of the exact
 * field names in case the provider's response shape changes slightly —
 * only this file needs to change if it does; nothing downstream depends on
 * these field names directly.
 *
 * To switch providers entirely, implement `GoldPriceProvider` in a new file
 * and swap the instance created in `goldRateService.ts`.
 */
export class GoldApiProvider implements GoldPriceProvider {
  async getSpotPriceUsdPerOunce(): Promise<SpotPrice> {
    const response = await fetchWithTimeout(goldRateConfig.apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(goldRateConfig.apiKey ? { "x-api-key": goldRateConfig.apiKey } : {}),
      },
      timeoutMs: goldRateConfig.requestTimeoutMs,
      // Always hit the upstream fresh; caching is handled by GoldRateService.
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Gold API request failed with status ${response.status}`);
    }

    const payload: unknown = await response.json();
    const price = extractPrice(payload);

    if (price === null || !Number.isFinite(price) || price <= 0) {
      throw new Error("Gold API response did not contain a usable price");
    }

    return {
      currency: "USD",
      unit: "troy_ounce",
      price,
      updatedAt: extractUpdatedAt(payload) ?? new Date().toISOString(),
      source: goldRateConfig.source,
    };
  }
}

function extractPrice(payload: unknown): number | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;

  const candidates = [record.price, record.rate, record.value];
  for (const candidate of candidates) {
    if (typeof candidate === "number") return candidate;
    if (typeof candidate === "string" && candidate.trim() !== "" && !Number.isNaN(Number(candidate))) {
      return Number(candidate);
    }
  }

  if (typeof record.data === "object" && record.data !== null) {
    return extractPrice(record.data);
  }

  return null;
}

function extractUpdatedAt(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const record = payload as Record<string, unknown>;
  const candidates = [record.updatedAt, record.updatedAtReadable, record.timestamp, record.date];
  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const parsed = new Date(candidate);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }
    if (typeof candidate === "number") {
      const parsed = new Date(candidate > 1e12 ? candidate : candidate * 1000);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }
  }
  return null;
}
