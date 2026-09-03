/**
 * Minimal in-process rate limiter for public POST endpoints (currently just
 * `/api/lead`). This lives for the life of the warm serverless instance —
 * sufficient to blunt casual spam/bot traffic for the current scale. If
 * the app later runs across many concurrent instances and this needs to
 * be authoritative, replace the `Map` below with a shared store (e.g.
 * Upstash Redis) behind the same `check()` call.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

/** Occasionally trim old keys so the map doesn't grow unbounded. */
function cleanup(now: number) {
  for (const [key, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  if (Math.random() < 0.05) cleanup(now);

  const timestamps = (hits.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestInWindow = timestamps[0];
    const retryAfterSeconds = Math.ceil((oldestInWindow + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(identifier, timestamps);
  return { allowed: true };
}
