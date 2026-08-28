import { cn } from "@/lib/utils";

/** Small gold flourish — a line-diamond-line divider for premium moments on a dark/red background. */
export function GoldOrnament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold" />
      <span className="size-1.5 rotate-45 bg-brand-gold" />
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold" />
    </div>
  );
}
