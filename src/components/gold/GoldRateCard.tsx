"use client";

import { useEffect } from "react";
import { Phone, MessageCircle, RefreshCw } from "lucide-react";
import { useGoldRate } from "@/hooks/useGoldRate";
import { Button } from "@/components/ui/Button";
import { telHref, whatsappHref } from "@/config/contact";
import { ctaLabels } from "@/config/navigation";
import { formatInr, formatUpdatedAt } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const purityOrder = ["24K", "22K", "18K"] as const;

export function GoldRateCard({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const { status, data, refresh } = useGoldRate();

  useEffect(() => {
    if (status === "ok" || status === "stale") {
      trackEvent("gold_rate_view", { status });
    }
  }, [status]);

  if (status === "loading") {
    return <RateCardSkeleton className={className} />;
  }

  if (status === "unavailable" || status === "error" || !data) {
    return (
      <div className={cn("rounded-2xl border border-charcoal/10 bg-cream p-6 text-center", className)}>
        <p className="font-display text-lg font-semibold text-charcoal">
          Gold rates are temporarily unavailable.
        </p>
        <p className="mt-2 text-sm text-charcoal/70">
          Please try again shortly, or reach out directly — our team can share today&apos;s rate.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button href={telHref()} variant="outline" size="sm" icon={<Phone className="size-4" aria-hidden="true" />}>
            {ctaLabels.callNow}
          </Button>
          <Button href={whatsappHref()} target="_blank" rel="noopener noreferrer" size="sm" icon={<MessageCircle className="size-4" aria-hidden="true" />}>
            {ctaLabels.whatsappUs}
          </Button>
          <Button href="/contact/" variant="outline" size="sm">
            {ctaLabels.primary}
          </Button>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-red hover:underline"
        >
          <RefreshCw aria-hidden="true" className="size-3.5" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-brand-gold/30 bg-charcoal p-6 text-cream sm:p-8", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">Today&apos;s Gold Rate</h3>
        {status === "stale" && (
          <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-medium text-brand-gold-light">
            Showing last known rate
          </span>
        )}
      </div>

      <div className={cn("mt-6 grid gap-4", variant === "full" ? "sm:grid-cols-3" : "grid-cols-3")}>
        {purityOrder.map((purity) => (
          <div key={purity} className="rounded-xl bg-white/5 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-light">{purity} Gold</p>
            <p className="mt-2 font-display text-lg font-bold text-white sm:text-2xl">
              {formatInr(data.rates[purity])}
            </p>
            <p className="text-xs text-cream/60">per gram</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-cream/50">Last updated: {formatUpdatedAt(data.updatedAt)}</p>

      <Button href="/gold-rate/#calculator" variant="secondary" size="sm" className="mt-5 w-full sm:w-auto">
        {ctaLabels.calculateValue}
      </Button>
    </div>
  );
}

function RateCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading today's gold rate"
      className={cn("animate-pulse rounded-2xl border border-charcoal/10 bg-charcoal p-6 sm:p-8", className)}
    >
      <div className="h-6 w-40 rounded bg-white/10" />
      <div className="mt-6 grid grid-cols-3 gap-4">
        {purityOrder.map((purity) => (
          <div key={purity} className="h-24 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="mt-5 h-3 w-32 rounded bg-white/10" />
    </div>
  );
}
