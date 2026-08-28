import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { generalFaqs } from "@/config/faq";

export function FaqSection() {
  const preview = generalFaqs.slice(0, 6);

  return (
    <section className="py-16 sm:py-24">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQs" title="Common Questions" />
        <Reveal variant="fade-up" className="mt-10">
          <Accordion items={preview} />
        </Reveal>
        <div className="mt-8 text-center">
          <Button href="/faq/" variant="ghost">
            View all FAQs →
          </Button>
        </div>
      </Container>
    </section>
  );
}
