import type { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { contactConfig, telHref, whatsappHref } from "@/config/contact";

const crumbs = [{ label: "Contact", href: "/contact/" }];

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Prashwa Jewels for enquiries, custom orders, or to book a visit to our Coimbatore boutique.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title="Contact Prashwa Jewels" description="Reach out for enquiries, custom orders, or to book a visit to our boutique." />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal variant="fade-up" className="space-y-6">
            <ContactRow icon={Phone} label="Phone" value={contactConfig.phoneDisplay} href={telHref()} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value="Chat with us" href={whatsappHref()} external />
            <ContactRow icon={Mail} label="Email" value={contactConfig.email} href={`mailto:${contactConfig.email}`} />
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-gold-dark" />
              <div>
                <p className="text-sm font-semibold text-charcoal">Boutique Address</p>
                <p className="text-sm text-charcoal/70">
                  {contactConfig.addressLine1}
                  <br />
                  {contactConfig.addressLine2}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-gold-dark" />
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
            <ContactForm />
          </Reveal>
        </Container>
      </section>
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
      className="flex items-center gap-3 rounded-xl border border-charcoal/10 bg-white p-4 hover:border-brand-black"
    >
      <Icon aria-hidden="true" className="size-5 shrink-0 text-brand-gold-dark" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">{label}</p>
        <p className="text-sm font-medium text-charcoal">{value}</p>
      </div>
    </a>
  );
}
