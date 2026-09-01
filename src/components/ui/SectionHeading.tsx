import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** "dark" for use on a red/charcoal background — swaps to white/gold text. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-brand-gold-light" : "text-brand-black",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-semibold sm:text-4xl",
          tone === "dark" ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base sm:text-lg", tone === "dark" ? "text-white/75" : "text-charcoal/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
