import { Phone, MessageCircle } from "lucide-react";
import { telHref, whatsappHref } from "@/config/contact";
import { cn } from "@/lib/utils";
import { setLiquidOrigin } from "@/lib/liquidFill";
import { TrackedLink } from "./TrackedLink";

const baseIconButton = "inline-flex size-11 items-center justify-center rounded-full";

interface IconCtaProps {
  className?: string;
  label?: string;
  /** Liquid-fill hover animation, expanding from wherever the cursor entered. */
  liquid?: boolean;
}

export function PhoneCta({ className, label, liquid = false }: IconCtaProps) {
  return (
    <TrackedLink
      event="phone_click"
      href={telHref()}
      onPointerEnter={liquid ? setLiquidOrigin : undefined}
      className={cn(
        baseIconButton,
        "bg-charcoal text-white",
        liquid ? "liquid-fill" : "transition-colors duration-200 hover:bg-brand-red",
        className,
      )}
      aria-label={label ?? "Call Akarshana Gold"}
    >
      {liquid && <span aria-hidden="true" className="liquid-fill__layer bg-brand-red" />}
      <Phone aria-hidden="true" className={cn("size-5", liquid && "liquid-fill__content")} />
    </TrackedLink>
  );
}

export function WhatsappCta({ className, label, liquid = false }: IconCtaProps) {
  return (
    <TrackedLink
      event="whatsapp_click"
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={liquid ? setLiquidOrigin : undefined}
      className={cn(
        baseIconButton,
        "bg-[#25D366] text-white",
        liquid ? "liquid-fill" : "transition-colors duration-200 hover:bg-[#1DA851]",
        className,
      )}
      aria-label={label ?? "WhatsApp Akarshana Gold"}
    >
      {liquid && <span aria-hidden="true" className="liquid-fill__layer bg-[#1DA851]" />}
      <MessageCircle aria-hidden="true" className={cn("size-5", liquid && "liquid-fill__content")} />
    </TrackedLink>
  );
}
