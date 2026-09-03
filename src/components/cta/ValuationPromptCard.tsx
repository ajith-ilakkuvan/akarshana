import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { telHref, whatsappHref } from "@/config/contact";
import { ctaLabels } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * The site no longer displays a live gold rate or an on-page value
 * calculator — every enquiry goes through a real valuation instead. This
 * card is the compact "get a valuation" prompt used wherever the old
 * GoldRateCard used to sit (currently just the homepage hero).
 */
export function ValuationPromptCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 border-brand-gold/50 bg-cream p-6 text-center shadow-lg shadow-brand-red/10 sm:p-8",
        className,
      )}
    >
      <h3 className="font-display text-xl font-semibold text-charcoal sm:text-2xl">Get a Free Gold Valuation</h3>
      <p className="mt-3 text-sm text-charcoal/70">
        Share your gold&apos;s details with our team and get a transparent, no-obligation valuation at today&apos;s
        market rate.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href={telHref()} variant="outline" size="sm" icon={<Phone className="size-4" aria-hidden="true" />}>
          {ctaLabels.callNow}
        </Button>
        <Button
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          icon={<MessageCircle className="size-4" aria-hidden="true" />}
        >
          {ctaLabels.whatsappUs}
        </Button>
      </div>
      <Button href="/contact/" className="mt-4 w-full">
        {ctaLabels.primary}
      </Button>
    </div>
  );
}
