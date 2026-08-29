import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { footerLinks } from "@/config/navigation";
import { locations } from "@/config/locations";
import { contactConfig, telHref, whatsappHref } from "@/config/contact";

const socialLinks = [
  { key: "instagram" as const, href: contactConfig.socialLinks.instagram, label: "Instagram" },
  { key: "facebook" as const, href: contactConfig.socialLinks.facebook, label: "Facebook" },
  { key: "youtube" as const, href: contactConfig.socialLinks.youtube, label: "YouTube" },
].filter((item) => item.href);

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-red-dark text-cream/80">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          {/* No separate tagline line here — the logo art already includes "Pure • Precious • Forever". */}
          <Logo size="lg" />
          <p className="mt-4 max-w-sm text-sm text-cream/70">{siteConfig.description}</p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ key, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-red-dark"
                >
                  <SocialIcon platform={key} className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <FooterColumn title="Company" links={footerLinks.company} />
        <FooterColumn title="Resources" links={footerLinks.resources} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Locations</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link href={location.path} className="hover:text-brand-gold-light">
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-8">
        <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
          <a href={telHref()} className="flex items-start gap-3 hover:text-brand-gold-light">
            <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {contactConfig.phoneDisplay}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 hover:text-brand-gold-light"
          >
            <MessageCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            WhatsApp Us
          </a>
          <div className="flex items-start gap-3">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {contactConfig.addressLine1}
              <br />
              {contactConfig.addressLine2}
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-start gap-3 text-sm">
          <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <ul>
            {contactConfig.businessHours.map((entry) => (
              <li key={entry.days}>
                {entry.days}: {entry.hours}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
        <div className="flex gap-5">
          {footerLinks.legal.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-gold-light">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-brand-gold-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
