import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { TrackedLink } from "@/components/cta/TrackedLink";
import { contactConfig, telHref, whatsappHref } from "@/config/contact";

const pillBase =
  "flex items-center gap-2.5 rounded-full py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-colors duration-200";

/**
 * Persistent call + WhatsApp pills pinned to the bottom-right corner —
 * desktop/tablet only (lg+). `MobileStickyCta` already covers small screens
 * with its own full-width bottom bar, so the two are mutually exclusive by
 * breakpoint rather than stacking.
 */
export function FloatingContactButtons() {
  return (
    <div className="fixed right-5 bottom-5 z-40 hidden flex-col items-end gap-3 lg:flex">
      <TrackedLink
        event="whatsapp_click"
        eventPayload={{ location: "floating_widget" }}
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${pillBase} bg-[#25D366] hover:bg-[#1DA851]`}
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        Check Your Gold Value
      </TrackedLink>
      <TrackedLink
        event="phone_click"
        eventPayload={{ location: "floating_widget" }}
        href={telHref()}
        className={`${pillBase} bg-brand-red hover:bg-brand-red-dark`}
      >
        <Phone aria-hidden="true" className="size-5 shrink-0" />
        {contactConfig.phoneDisplay}
      </TrackedLink>
    </div>
  );
}
