import type { Metadata } from "next";
import { ShieldCheck, Gem, Sparkles, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { getAboutContent } from "@/lib/settings";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

const crumbs = [{ label: "About", href: "/about/" }];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Prashwa Jewels is a boutique jewellery house in Coimbatore, a sister concern of RV Thangamalikai, crafting handcrafted, hallmarked gold and diamond jewellery.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    description: "Every gold piece is BIS hallmarked, and diamond/gemstone pieces carry the relevant certification.",
  },
  {
    icon: Gem,
    title: "Handcrafted Detail",
    description: "From temple-style bridal sets to everyday chains, each piece is handcrafted with close attention to detail.",
  },
  {
    icon: Sparkles,
    title: "Palace-Inspired Boutique",
    description: "Our Coimbatore store is compact in footprint but designed inside and out to feel like a palace.",
  },
  {
    icon: MapPin,
    title: "A Trusted Legacy",
    description: `As ${siteConfig.sisterConcernOf}, we carry forward a legacy of trusted jewellery craftsmanship.`,
  },
];

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title="About Prashwa Jewels" description={siteConfig.tagline} />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-lg text-charcoal/80">{about.story}</p>
          </Reveal>

          <RevealGroup variant="fade-up" staggerMs={90} className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-charcoal/10 bg-cream p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-black text-brand-gold-light">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-charcoal">{title}</h2>
                <p className="mt-2 text-sm text-charcoal/70">{description}</p>
              </div>
            ))}
          </RevealGroup>

          <Reveal variant="fade-up" className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-charcoal">
              <MapPin aria-hidden="true" className="size-5 text-brand-gold-dark" />
              Visit Our Boutique
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              {contactConfig.addressLine1}, {contactConfig.addressLine2}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
