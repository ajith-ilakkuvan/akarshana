import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/home/ServiceCard";
import { services } from "@/config/services";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Offer"
          title="Gold Services You Can Trust"
          description="From valuation to doorstep convenience, every service is built around transparency."
        />

        <RevealGroup
          variant="fade-up"
          staggerMs={90}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
