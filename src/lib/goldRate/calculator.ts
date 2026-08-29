import { GRAMS_PER_TROY_OUNCE, purityFactors, type GoldPurity } from "@/config/goldPurity";

/**
 * All gold-purity math lives here so it is calculated exactly once and
 * reused everywhere (homepage rate card, gold-rate page, calculator, local
 * SEO pages) instead of being duplicated per component.
 */
export function calculatePurityRatesInrPerGram(
  spotPriceUsdPerOunce: number,
  usdToInrRate: number,
  /** See `domesticPremiumPercent` in `config/goldRate.ts`. 0 = raw international rate. */
  domesticPremiumPercent = 0,
): Record<GoldPurity, number> {
  const rawPricePerGram24k = (spotPriceUsdPerOunce * usdToInrRate) / GRAMS_PER_TROY_OUNCE;
  const pricePerGram24k = rawPricePerGram24k * (1 + domesticPremiumPercent / 100);

  const entries = (Object.keys(purityFactors) as GoldPurity[]).map((purity) => [
    purity,
    Math.round(pricePerGram24k * purityFactors[purity]),
  ]);

  return Object.fromEntries(entries) as Record<GoldPurity, number>;
}

export function estimateGoldValue(ratePerGram: number, weightGrams: number): number {
  if (!Number.isFinite(ratePerGram) || !Number.isFinite(weightGrams) || weightGrams <= 0) {
    return 0;
  }
  return Math.round(ratePerGram * weightGrams);
}
