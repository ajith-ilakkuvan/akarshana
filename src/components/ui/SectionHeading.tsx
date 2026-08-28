import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
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
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-charcoal/70 sm:text-lg">{description}</p>}
    </div>
  );
}
