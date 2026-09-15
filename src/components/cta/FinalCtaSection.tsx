import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PhoneCta, WhatsappCta } from "@/components/cta/PhoneWhatsappCta";
import { ctaLabels } from "@/config/navigation";
import { contactConfig } from "@/config/contact";

const socialLinks = [
  { key: "instagram" as const, href: contactConfig.socialLinks.instagram, label: "Instagram" },
  { key: "facebook" as const, href: contactConfig.socialLinks.facebook, label: "Facebook" },
  { key: "youtube" as const, href: contactConfig.socialLinks.youtube, label: "YouTube" },
].filter((item) => item.href);

/**
 * The site's closing call-to-action banner — used at the bottom of every
 * content page (not the contact form itself, and not the legal pages,
 * where a sales pitch would be out of place). Kept generic/reusable
 * rather than per-page copy, since "get a valuation" is the right closing
 * ask everywhere it appears.
 */
export function FinalCtaSection() {
  return (
    <section className="overflow-hidden bg-brand-red py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-center">
        <Reveal variant="fade-up" className="mx-auto hidden w-full max-w-xs lg:mx-0 lg:block">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-brand-gold/30 shadow-xl shadow-black/30">
            <Image
              src="/showcase/bridal-4.webp"
              alt="Bride wearing a gold necklace, maang tikka and jhumka earrings, smiling softly"
              fill
              sizes="360px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal variant="fade-up" delayMs={120} className="flex flex-col items-center gap-6 text-center">
          <GoldOrnament className="justify-center" />
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to Get Your Gold Valued?
          </h2>
          <p className="max-w-xl text-white/80">
            Reach out today for a transparent gold valuation, or book doorstep service at your convenience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact/" variant="secondary" size="lg">
              {ctaLabels.primary}
            </Button>
            <div className="flex gap-3">
              <PhoneCta />
              <WhatsappCta />
            </div>
          </div>
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ key, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-brand-gold hover:text-brand-red-dark"
                >
                  <SocialIcon platform={key} className="size-5" />
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
