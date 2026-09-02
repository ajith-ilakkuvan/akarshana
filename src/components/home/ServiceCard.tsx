import { Coins, Unlock, Handshake, Home as HomeIcon, Banknote } from "lucide-react";
import { TrackedButtonLink } from "@/components/cta/TrackedButtonLink";
import type { ServiceItem } from "@/config/services";

const icons: Record<ServiceItem["icon"], typeof Coins> = {
  coins: Coins,
  unlock: Unlock,
  handshake: Handshake,
  home: HomeIcon,
  banknote: Banknote,
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = icons[service.icon];

  return (
    <article className="neumorphic-gold-card flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white p-6">
      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
        {service.headline ?? service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm text-charcoal/70">{service.description}</p>
      <TrackedButtonLink
        href={service.cta.href}
        variant="ghost"
        size="sm"
        className="mt-5 self-start px-0"
        event="service_click"
        eventPayload={{ service: service.slug }}
      >
        {service.cta.label} →
      </TrackedButtonLink>
    </article>
  );
}
