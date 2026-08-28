/**
 * Minimal in-process TTL cache used by `GoldRateService`.
 *
 * This is intentionally simple: it lives for as long as the Node.js
 * process/serverless instance stays warm, which is enough to satisfy the
 * "don't call the external API on every request" requirement without
 * introducing infrastructure (Redis, etc.) the current MVP doesn't need.
 *
 * If the app is deployed across many concurrent serverless instances and
 * the number of upstream calls needs to be tightened further, swap this
 * for a shared cache (e.g. Upstash Redis) behind the same `get`/`set`
 * interface — nothing outside this file needs to change.
 */
export class TtlCache<T> {
  private value: T | null = null;
  private expiresAt = 0;
  private setAt = 0;

  /** Fresh (non-expired) cached value, or null. */
  get(): T | null {
    if (this.value !== null && Date.now() < this.expiresAt) {
      return this.value;
    }
    return null;
  }

  /** Cached value regardless of expiry — used for stale-fallback display. */
  getStale(): { value: T; setAt: number } | null {
    if (this.value === null) return null;
    return { value: this.value, setAt: this.setAt };
  }

  set(value: T, ttlSeconds: number): void {
    this.value = value;
    this.setAt = Date.now();
    this.expiresAt = Date.now() + ttlSeconds * 1000;
  }
}
