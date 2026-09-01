import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import type { LocationSummary } from "@/config/locations";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    description: siteConfig.description,
    telephone: contactConfig.phoneE164,
    email: contactConfig.email,
    areaServed: ["Pollachi", "Udumalpet", "Coimbatore", "Tiruppur"],
  };
}

export function localBusinessJsonLd(location: LocationSummary) {
  const branch = location.branch;
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `${siteConfig.name} — ${location.name}`,
    parentOrganization: { "@type": "Organization", name: siteConfig.legalName },
    description: `Gold buying and gold valuation services from ${siteConfig.name} serving ${location.name} and nearby areas.`,
    url: `${siteConfig.url}${location.path}`,
    telephone: contactConfig.phoneE164,
    address: {
      "@type": "PostalAddress",
      ...(branch ? { streetAddress: `${branch.addressLine1}, ${branch.addressLine2}` } : {}),
      addressLocality: location.name,
      addressRegion: location.region,
      ...(branch ? { postalCode: branch.postalCode } : {}),
      addressCountry: "IN",
    },
    ...(branch ? { hasMap: branch.mapLink } : {}),
    areaServed: location.name,
    priceRange: "$$",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
