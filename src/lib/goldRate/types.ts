import type { GoldPurity } from "@/config/goldPurity";

/**
 * The only shape the rest of the application should ever depend on.
 * Whatever provider is behind `GoldRateService`, it must normalize into
 * this format — components never see provider-specific fields.
 */
export interface NormalizedGoldRate {
  currency: "INR";
  unit: "gram";
  rates: Record<GoldPurity, number>;
  updatedAt: string;
  source: string;
}

export type GoldRateStatus = "ok" | "stale" | "unavailable";

export interface GoldRateResult {
  status: GoldRateStatus;
  data: NormalizedGoldRate | null;
}

/** Raw spot price, before currency conversion or purity math. */
export interface SpotPrice {
  currency: "USD";
  unit: "troy_ounce";
  price: number;
  updatedAt: string;
  source: string;
}

export interface CurrencyRate {
  rate: number;
  source: string;
}

/** Implemented by any gold spot-price data source (see `providers/`). */
export interface GoldPriceProvider {
  getSpotPriceUsdPerOunce(): Promise<SpotPrice>;
}

/** Implemented by any USD → INR conversion data source. */
export interface CurrencyRateProvider {
  getUsdToInr(): Promise<CurrencyRate>;
}
