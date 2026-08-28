"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getServerSnapshot(): boolean {
  return false;
}

/** True once the page has been scrolled past `thresholdPx`. */
export function useScrolled(thresholdPx = 8): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > thresholdPx,
    getServerSnapshot,
  );
}
