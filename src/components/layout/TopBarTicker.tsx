import { tickerItems } from "@/config/ticker";
import { cn } from "@/lib/utils";

/**
 * Duplicated once so `.ticker-track`'s "shift by exactly one copy-width"
 * animation loops seamlessly — see the `@keyframes ticker-scroll` comment
 * in globals.css. The duplicate copy is hidden from assistive tech so
 * each announcement is only ever announced once.
 */
const track = [...tickerItems, ...tickerItems];

export function TopBarTicker() {
  return (
    <div className="overflow-hidden border-b border-white/10 bg-charcoal">
      <div className="ticker-track flex w-max items-center gap-3 py-2 whitespace-nowrap">
        {track.map((item, index) => (
          <span key={`${item.text}-${index}`} aria-hidden={index >= tickerItems.length} className="flex items-center gap-3">
            <span
              className={cn(
                "text-xs sm:text-sm",
                item.lang === "ta" ? "font-tamil text-brand-gold-light" : "font-medium text-brand-gold-light",
              )}
            >
              {item.text}
            </span>
            <span aria-hidden="true" className="text-brand-gold/50">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
