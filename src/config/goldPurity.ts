/**
 * Purity math constants. Kept separate from `goldRate.ts` (which holds
 * server-only provider URLs/keys) so client components — like the gold
 * value calculator's purity dropdown — can safely import this file without
 * ever bundling API configuration into browser JavaScript.
 */

/** Standard karat fineness fractions relative to 24K (999 fine) gold. */
export const purityFactors = {
  "24K": 1,
  "22K": 22 / 24,
  "18K": 18 / 24,
} as const;

export type GoldPurity = keyof typeof purityFactors;

export const goldPurityOptions: GoldPurity[] = ["24K", "22K", "18K"];

export const GRAMS_PER_TROY_OUNCE = 31.1034768;
