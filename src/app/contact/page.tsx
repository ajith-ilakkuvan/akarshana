import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { contactConfig, telHref, whatsappHref } from "@/config/contact";
import { leadServiceOptions, type LeadServiceValue } from "@/config/services";
import { locations } from "@/config/locations";

const crumbs = [{ label: "Contact", href: "/contact/" }];

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Akarshana Gold for a gold valuation, doorstep service or pledged gold release assistance in Pollachi, Udumalpet, Coimbatore or Tiruppur.",
  alternates: { canonical: "/contact/" },
};

const serviceValues = new Set<string>(leadServiceOptions.map((option) => option.value));
const locationSlugs = new Set<string>(locations.map((location) => location.slug));

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; location?: string }>;
}) {
  const params = await searchParams;
  const defaultService = serviceValues.has(params.service as LeadServiceValue)
    ? (params.service as LeadServiceValue)
    : undefined;
  const defaultLocation = locationSlugs.has(params.location ?? "") ? params.location : undefined;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Contact Akarshana Gold"
        description="Reach out for a gold valuation, doorstep service, or any other enquiry."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal variant="fade-up" className="space-y-6">
            <ContactRow icon={Phone} label="Phone" value={contactConfig.phoneDisplay} href={telHref()} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us" href={whatsappHref()} external />
            <ContactRow icon={Mail} label="Email" value={contactConfig.email} href={`mailto:${contactConfig.email}`} />
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-red" />
              <div>
                <p className="text-sm font-semibold text-charcoal">Address</p>
                <p className="text-sm text-charcoal/70">
                  {contactConfig.addressLine1}
                  <br />
                  {contactConfig.addressLine2}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-red" />
              <div>
                <p className="text-sm font-semibold text-charcoal">Business Hours</p>
                <ul className="text-sm text-charcoal/70">
                  {contactConfig.businessHours.map((entry) => (
                    <li key={entry.days}>
                      {entry.days}: {entry.hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delayMs={120}>
            <LeadForm defaultService={defaultService} defaultLocation={defaultLocation} />
          </Reveal>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-3 rounded-xl border border-charcoal/10 bg-white p-4 hover:border-brand-red"
    >
      <Icon aria-hidden="true" className="size-5 shrink-0 text-brand-red" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">{label}</p>
        <p className="text-sm font-medium text-charcoal">{value}</p>
      </div>
    </a>
  );
}
