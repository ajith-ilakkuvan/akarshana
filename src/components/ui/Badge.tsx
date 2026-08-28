import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-brand-gold-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gold-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
