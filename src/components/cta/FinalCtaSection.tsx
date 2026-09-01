import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldOrnament } from "@/components/ui/GoldOrnament";
import { PhoneCta, WhatsappCta } from "@/components/cta/PhoneWhatsappCta";
import { ctaLabels } from "@/config/navigation";

/**
 * The site's closing call-to-action banner — used at the bottom of most
 * content pages (not the legal pages, where a sales pitch would be out of
 * place). Kept generic/reusable rather than per-page copy, since "shop the
 * collection or visit us" is the right closing ask everywhere it appears.
 */
export function FinalCtaSection() {
  return (
    <section className="bg-brand-black py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal variant="fade-up">
          <GoldOrnament className="justify-center" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to Find Your Next Piece?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Shop our collections online, or visit our Coimbatore boutique to see them in person.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/shop/" variant="secondary" size="lg">
              {ctaLabels.primary}
            </Button>
            <div className="flex gap-3">
              <PhoneCta />
              <WhatsappCta />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
