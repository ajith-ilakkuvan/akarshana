/**
 * Services offered, sourced from the client's poster. Wording has been kept
 * credible and non-absolute per the client's legal guidance — see the task
 * brief for the reasoning behind each description.
 */

export interface ServiceItem {
  slug: string;
  title: string;
  headline?: string;
  description: string;
  cta: { label: string; href: string };
  icon: "coins" | "unlock" | "handshake" | "home" | "banknote";
}

export const services: ServiceItem[] = [
  {
    slug: "best-price",
    title: "Best Price for Your Gold",
    description:
      "Get your gold jewellery professionally evaluated. We offer competitive value for your gold based on current market rates.",
    cta: { label: "Get a Gold Valuation", href: "/contact/" },
    icon: "coins",
  },
  {
    slug: "pledged-gold-release",
    title: "Pledged Gold Release",
    description: "We assist customers with pledged gold release-related services.",
    cta: { label: "Enquire Now", href: "/contact/?service=pledged-gold-release" },
    icon: "unlock",
  },
  {
    slug: "gold-buying",
    title: "Gold Buying",
    description:
      "Sell your gold through a transparent valuation process based on the applicable current gold market rate.",
    cta: { label: "Sell Your Gold", href: "/contact/?service=sell-gold" },
    icon: "handshake",
  },
  {
    slug: "doorstep-service",
    title: "Doorstep Gold Service",
    headline: "Gold Service at Your Doorstep",
    description:
      "Request convenient gold service from Akarshana Gold without the need to make an unnecessary trip.",
    cta: { label: "Book Doorstep Service", href: "/contact/?service=doorstep-service" },
    icon: "home",
  },
  {
    slug: "cash-for-gold",
    title: "Cash for Gold",
    description:
      "Turn your eligible gold into value through a simple and transparent valuation process.",
    cta: { label: "Get a Gold Valuation", href: "/contact/" },
    icon: "banknote",
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

/** Options shown in the lead form's "Preferred Service" field. */
export const leadServiceOptions = [
  { value: "sell-gold", label: "Sell Gold" },
  { value: "pledged-gold-release", label: "Pledged Gold Release" },
  { value: "doorstep-service", label: "Doorstep Service" },
  { value: "gold-valuation", label: "Gold Valuation" },
  { value: "other", label: "Other" },
] as const;

export type LeadServiceValue = (typeof leadServiceOptions)[number]["value"];

export const preferredContactOptions = [
  { value: "call", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type PreferredContactValue = (typeof preferredContactOptions)[number]["value"];
