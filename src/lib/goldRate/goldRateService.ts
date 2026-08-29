import { goldRateConfig } from "@/config/goldRate";
import { calculatePurityRatesInrPerGram } from "./calculator";
import { TtlCache } from "./cache";
import { GoldApiProvider } from "./providers/goldApiProvider";
import { FrankfurterCurrencyProvider } from "./providers/currencyProvider";
import type {
  CurrencyRateProvider,
  GoldPriceProvider,
  GoldRateResult,
  NormalizedGoldRate,
} from "./types";

/**
 * The single entry point the rest of the app should use for gold rates.
 *
 * UI code and API routes call `goldRateService.getRates()` and never touch
 * a provider directly. To move off the free Gold API — to a paid provider,
 * or to Akarshana's own approved daily buying rate — implement
 * `GoldPriceProvider` (see `providers/goldApiProvider.ts` for the shape)
 * and swap the instance passed into `GoldRateService` below.
 */
export class GoldRateService {
  private readonly cache = new TtlCache<NormalizedGoldRate>();

  constructor(
    private readonly priceProvider: GoldPriceProvider,
    private readonly currencyProvider: CurrencyRateProvider,
  ) {}

  async getRates(): Promise<GoldRateResult> {
    const cached = this.cache.get();
    if (cached) {
      return { status: "ok", data: cached };
    }

    try {
      const normalized = await this.fetchAndNormalize();
      this.cache.set(normalized, goldRateConfig.cacheSeconds);
      return { status: "ok", data: normalized };
    } catch {
      const stale = this.cache.getStale();
      if (stale) {
        return { status: "stale", data: stale.value };
      }
      return { status: "unavailable", data: null };
    }
  }

  private async fetchAndNormalize(): Promise<NormalizedGoldRate> {
    const [spot, currency] = await Promise.all([
      this.priceProvider.getSpotPriceUsdPerOunce(),
      this.getCurrencyRate(),
    ]);

    const rates = calculatePurityRatesInrPerGram(spot.price, currency.rate, goldRateConfig.domesticPremiumPercent);

    return {
      currency: "INR",
      unit: "gram",
      rates,
      updatedAt: spot.updatedAt,
      source: spot.source,
    };
  }

  /** Currency lookup is best-effort: fall back rather than fail the rate. */
  private async getCurrencyRate(): Promise<{ rate: number; source: string }> {
    try {
      return await this.currencyProvider.getUsdToInr();
    } catch {
      return { rate: goldRateConfig.fallbackUsdToInr, source: "fallback" };
    }
  }
}

/** Shared singleton so the in-process cache is actually shared. */
export const goldRateService = new GoldRateService(
  new GoldApiProvider(),
  new FrankfurterCurrencyProvider(),
);
