import { Phone, MessageCircle } from "lucide-react";
import { telHref, whatsappHref } from "@/config/contact";
import { cn } from "@/lib/utils";
import { TrackedLink } from "./TrackedLink";

const baseIconButton =
  "inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200";

export function PhoneCta({ className, label }: { className?: string; label?: string }) {
  return (
    <TrackedLink
      event="phone_click"
      href={telHref()}
      className={cn(baseIconButton, "bg-charcoal text-white hover:bg-brand-red", className)}
      aria-label={label ?? "Call Akarshana Gold"}
    >
      <Phone aria-hidden="true" className="size-5" />
    </TrackedLink>
  );
}

export function WhatsappCta({ className, label }: { className?: string; label?: string }) {
  return (
    <TrackedLink
      event="whatsapp_click"
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseIconButton, "bg-[#25D366] text-white hover:bg-[#1DA851]", className)}
      aria-label={label ?? "WhatsApp Akarshana Gold"}
    >
      <MessageCircle aria-hidden="true" className="size-5" />
    </TrackedLink>
  );
}
