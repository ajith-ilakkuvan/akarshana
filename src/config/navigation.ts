/**
 * Primary site navigation and CTA labels. Edit here to change header/footer
 * links or the wording of any call-to-action button — the copy is reused
 * throughout the site so it stays consistent.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Gold Rate", href: "/gold-rate/" },
  { label: "Services", href: "/services/" },
  { label: "Locations", href: "/locations/" },
  { label: "About", href: "/about/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const footerLinks = {
  company: [
    { label: "About", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Careers", href: "/careers/" },
    { label: "Blog", href: "/blog/" },
  ],
  resources: [
    { label: "Today's Gold Rate", href: "/gold-rate/" },
    { label: "Locations", href: "/locations/" },
    { label: "FAQs", href: "/faq/" },
    { label: "Contact", href: "/contact/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms & Conditions", href: "/terms/" },
  ],
} as const;

export const ctaLabels = {
  primary: "Get a Gold Valuation",
  calculateValue: "Calculate Your Gold Value",
  bookDoorstep: "Book Doorstep Service",
  callNow: "Call Now",
  whatsappUs: "WhatsApp Us",
  sellGold: "Sell Your Gold",
  enquireNow: "Enquire Now",
  accurateValuation: "Get an Accurate Valuation",
  requestValuation: "Request Gold Valuation",
} as const;
