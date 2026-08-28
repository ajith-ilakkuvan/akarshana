import { GRAMS_PER_TROY_OUNCE, purityFactors, type GoldPurity } from "@/config/goldPurity";

/**
 * All gold-purity math lives here so it is calculated exactly once and
 * reused everywhere (homepage rate card, gold-rate page, calculator, local
 * SEO pages) instead of being duplicated per component.
 */
export function calculatePurityRatesInrPerGram(
  spotPriceUsdPerOunce: number,
  usdToInrRate: number,
): Record<GoldPurity, number> {
  const pricePerGram24k = (spotPriceUsdPerOunce * usdToInrRate) / GRAMS_PER_TROY_OUNCE;

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
