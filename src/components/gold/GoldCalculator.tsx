"use client";

import { useId, useState, type FormEvent } from "react";
import { useGoldRate } from "@/hooks/useGoldRate";
import { estimateGoldValue } from "@/lib/goldRate/calculator";
import { goldPurityOptions, type GoldPurity } from "@/config/goldPurity";
import { Button } from "@/components/ui/Button";
import { ctaLabels } from "@/config/navigation";
import { formatInr } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function GoldCalculator({ id }: { id?: string }) {
  const { status, data } = useGoldRate();
  const [purity, setPurity] = useState<GoldPurity>("22K");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ purity: GoldPurity; weight: number; rate: number; value: number } | null>(
    null,
  );
  const weightId = useId();

  const ratesAvailable = (status === "ok" || status === "stale") && data !== null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ratesAvailable || !data) return;

    const weightGrams = Number(weight);
    if (!Number.isFinite(weightGrams) || weightGrams <= 0) {
      setResult(null);
      return;
    }

    const rate = data.rates[purity];
    const value = estimateGoldValue(rate, weightGrams);
    setResult({ purity, weight: weightGrams, rate, value });
    trackEvent("gold_calculator_used", { purity, weight: weightGrams });
  }

  return (
    <div id={id} className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-2xl font-semibold text-charcoal">
        How Much Is Your Gold Worth Today?
      </h3>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor={`${weightId}-purity`} className="block text-sm font-medium text-charcoal">
            Gold Purity
          </label>
          <select
            id={`${weightId}-purity`}
            value={purity}
            onChange={(event) => setPurity(event.target.value as GoldPurity)}
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-3.5 py-3 text-charcoal focus-visible:outline-2 focus-visible:outline-brand-red"
          >
            {goldPurityOptions.map((option) => (
              <option key={option} value={option}>
                {option} Gold
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={weightId} className="block text-sm font-medium text-charcoal">
            Gold Weight (grams)
          </label>
          <input
            id={weightId}
            type="number"
            inputMode="decimal"
            min={0.1}
            step={0.1}
            required
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="e.g. 10"
            className="mt-2 w-full rounded-lg border border-charcoal/20 bg-white px-3.5 py-3 text-charcoal placeholder:text-charcoal/40 focus-visible:outline-2 focus-visible:outline-brand-red"
          />
        </div>

        <Button type="submit" disabled={!ratesAvailable} className="w-full sm:w-auto">
          Calculate Value
        </Button>
      </form>

      {!ratesAvailable && (
        <p className="mt-4 text-sm text-charcoal/60">
          The calculator needs today&apos;s gold rate, which is currently unavailable. Please try again shortly.
        </p>
      )}

      {result && (
        <div className="mt-6 rounded-xl bg-cream p-5 sm:p-6">
          <dl className="grid grid-cols-3 gap-4 text-center">
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal/60">Purity</dt>
              <dd className="mt-1 font-semibold text-charcoal">{result.purity}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal/60">Weight</dt>
              <dd className="mt-1 font-semibold text-charcoal">{result.weight} g</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal/60">Applicable Rate</dt>
              <dd className="mt-1 font-semibold text-charcoal">{formatInr(result.rate)}/g</dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-charcoal/10 pt-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">Estimated Gold Value</p>
            <p className="mt-1 font-display text-3xl font-bold text-charcoal sm:text-4xl">
              {formatInr(result.value)}
            </p>
            <p className="mx-auto mt-3 max-w-md text-xs text-charcoal/60">
              Indicative value based on the displayed market rate. Final valuation may vary based on purity, weight
              and applicable valuation factors.
            </p>
            <Button href="/contact/" className="mt-5">
              {ctaLabels.accurateValuation}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
