import { PhoneCta, WhatsappCta } from "@/components/cta/PhoneWhatsappCta";

/**
 * Persistent call + WhatsApp buttons pinned to the bottom-right corner —
 * desktop/tablet only (lg+). `MobileStickyCta` already covers small screens
 * with its own full-width bottom bar, so the two are mutually exclusive by
 * breakpoint rather than stacking.
 */
export function FloatingContactButtons() {
  return (
    <div className="fixed right-5 bottom-5 z-40 hidden flex-col gap-3 lg:flex">
      <div className="rounded-full shadow-lg shadow-black/25">
        <WhatsappCta className="size-14" />
      </div>
      <div className="rounded-full shadow-lg shadow-black/25">
        <PhoneCta className="size-14" />
      </div>
    </div>
  );
}
