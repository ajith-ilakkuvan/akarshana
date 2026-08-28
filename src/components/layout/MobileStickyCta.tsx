"use client";

import { Phone, MessageCircle, Gem } from "lucide-react";
import Link from "next/link";
import { telHref, whatsappHref } from "@/config/contact";
import { ctaLabels } from "@/config/navigation";
import { trackEvent } from "@/lib/analytics";

/** Sticky bottom CTA bar shown only on mobile/tablet — hidden on lg+. */
export function MobileStickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal/10 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={telHref()}
        onClick={() => trackEvent("phone_click", { location: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-charcoal active:bg-cream"
      >
        <Phone aria-hidden="true" className="size-5 text-charcoal" />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 border-x border-charcoal/10 py-2.5 text-xs font-medium text-charcoal active:bg-cream"
      >
        <MessageCircle aria-hidden="true" className="size-5 text-[#25D366]" />
        WhatsApp
      </a>
      <Link
        href="/contact/"
        onClick={() => trackEvent("cta_click", { location: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 bg-brand-red py-2.5 text-xs font-semibold text-white active:bg-brand-red-dark"
      >
        <Gem aria-hidden="true" className="size-5" />
        {ctaLabels.primary.replace("Get a ", "")}
      </Link>
    </div>
  );
}
