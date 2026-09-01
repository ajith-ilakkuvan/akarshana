/**
 * Contact details used across the header, footer, sticky CTA bar and
 * structured data. Replace the placeholder values with the client's
 * confirmed details before launch.
 */

export const contactConfig = {
  /** Digits-only, with country code, used for `tel:` and `wa.me` links. */
  phoneDisplay: "+91 90000 00000",
  phoneE164: "+919000000000",
  whatsappE164: "919000000000",
  whatsappDefaultMessage:
    "Hi Akarshana Gold, I would like to get my gold valued.",
  email: "info@akarshanagold.com",
  businessHours: [
    { days: "Monday – Saturday", hours: "10:00 AM – 8:00 PM" },
    { days: "Sunday", hours: "10:00 AM – 2:00 PM" },
  ],
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export function telHref(): string {
  return `tel:${contactConfig.phoneE164}`;
}

export function whatsappHref(message = contactConfig.whatsappDefaultMessage): string {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${contactConfig.whatsappE164}?${params.toString()}`;
}
