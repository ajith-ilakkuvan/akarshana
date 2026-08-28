import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneCta, WhatsappCta } from "@/components/cta/PhoneWhatsappCta";
import { ctaLabels } from "@/config/navigation";

export function FinalCta() {
  return (
    <section className="bg-brand-red py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal variant="fade-up">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Ready to Get Your Gold Valued?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Reach out today for a transparent gold valuation, or book doorstep service at your convenience.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact/" variant="secondary" size="lg">
              {ctaLabels.primary}
            </Button>
            <div className="flex gap-3">
              <PhoneCta className="bg-white/10 hover:bg-white/20" />
              <WhatsappCta />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
