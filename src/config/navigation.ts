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
  { label: "Shop", href: "/shop/" },
  { label: "Collections", href: "/collections/" },
  { label: "About", href: "/about/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about/" },
    { label: "Our Collections", href: "/collections/" },
    { label: "Shop All", href: "/shop/" },
    { label: "Contact", href: "/contact/" },
  ],
  resources: [
    { label: "FAQs", href: "/faq/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms & Conditions", href: "/terms/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms & Conditions", href: "/terms/" },
  ],
} as const;

export const ctaLabels = {
  primary: "Shop Now",
  shopCollection: "Shop This Collection",
  addToCart: "Add to Cart",
  buyNow: "Buy Now",
  viewProduct: "View Details",
  bookAppointment: "Book a Store Visit",
  callNow: "Call Now",
  whatsappUs: "WhatsApp Us",
  enquireNow: "Enquire Now",
  checkout: "Proceed to Checkout",
} as const;
