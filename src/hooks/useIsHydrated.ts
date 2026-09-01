"use client";

import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * True once the component has mounted on the client. Implemented via
 * useSyncExternalStore (matching useScrolled/useReducedMotion in this
 * codebase) rather than useState + useEffect(() => setHydrated(true)) —
 * the latter is exactly the "sync external truth into state inside an
 * effect" pattern React's set-state-in-effect lint rule flags; this way
 * the mismatch between server and first-client render is resolved by
 * getServerSnapshot/getSnapshot the way the hook is designed for.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
