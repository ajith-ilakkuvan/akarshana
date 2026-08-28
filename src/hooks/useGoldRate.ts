"use client";

import { useCallback, useEffect, useState } from "react";
import type { GoldRateResult } from "@/lib/goldRate/types";

const POLL_INTERVAL_MS = 120_000;

export type GoldRateHookStatus = "loading" | "ok" | "stale" | "unavailable" | "error";

export interface UseGoldRateResult {
  status: GoldRateHookStatus;
  data: GoldRateResult["data"];
  refresh: () => void;
}

/**
 * Client-side hook wrapping `/api/gold-rate`. Components never call the
 * external gold API directly — they only ever see this hook's normalized
 * result, matching the server-side `GoldRateService` abstraction.
 */
export function useGoldRate(): UseGoldRateResult {
  const [status, setStatus] = useState<GoldRateHookStatus>("loading");
  const [data, setData] = useState<GoldRateResult["data"]>(null);

  const fetchRates = useCallback(async () => {
    try {
      const response = await fetch("/api/gold-rate/", { cache: "no-store" });
      const payload: GoldRateResult = await response.json();
      setStatus(payload.status);
      setData(payload.data);
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // Fetching on mount + polling an external endpoint is the documented
    // use case for effects (https://react.dev/learn/synchronizing-with-effects).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetchRates sets state only after an awaited response, not synchronously.
    fetchRates();
    const interval = setInterval(fetchRates, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchRates]);

  return { status, data, refresh: fetchRates };
}
