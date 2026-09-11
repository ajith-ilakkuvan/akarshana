import { CreditCard, Fingerprint, BookUser, Receipt } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { requiredDocuments, type RequiredDocument } from "@/config/documents";

const icons: Record<RequiredDocument["icon"], typeof CreditCard> = {
  pan: CreditCard,
  aadhaar: Fingerprint,
  ration: BookUser,
  bill: Receipt,
};

export function DocumentsSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Come Prepared"
          title="Documents Required to Complete the Sale"
          description="Once you've requested your valuation and decided to sell, here's what to bring to the branch."
        />

        <RevealGroup
          variant="fade-up"
          staggerMs={90}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {requiredDocuments.map((doc) => {
            const Icon = icons[doc.icon];
            return (
              <div
                key={doc.title}
                className="group neumorphic-gold-card rounded-2xl border border-charcoal/10 bg-white p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{doc.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{doc.description}</p>
              </div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
