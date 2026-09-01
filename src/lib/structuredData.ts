import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import type { ProductWithRelations } from "@/lib/products";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    description: siteConfig.description,
    telephone: contactConfig.phoneE164,
    email: contactConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactConfig.addressLine2,
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    priceRange: "$$$",
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

export function productJsonLd(product: ProductWithRelations) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((image) => `${siteConfig.url}${image.url}`),
    category: product.category.name,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}/`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}
