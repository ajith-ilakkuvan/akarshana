import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GoldRateCard } from "@/components/gold/GoldRateCard";
import { GoldCalculator } from "@/components/gold/GoldCalculator";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LeadForm } from "@/components/forms/LeadForm";
import { Accordion } from "@/components/ui/Accordion";
import { LocationMap } from "@/components/locations/LocationMap";
import { LocationGallery } from "@/components/locations/LocationGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import type { LocationSummary } from "@/config/locations";
import type { LocationContent } from "@/content/locations/types";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/structuredData";

/**
 * Shared layout for every `/gold-buyers-<city>/` page. The template is one
 * reusable component; what makes each page unique for SEO is the `content`
 * prop, sourced from `src/content/locations/<slug>.ts`. To add a new city:
 * add it to `config/locations.ts`, write a content file, and add one thin
 * route file under `src/app/` that renders this template — see any
 * existing `gold-buyers-*` folder for the pattern.
 */
export function LocationPageTemplate({
  location,
  content,
}: {
  location: LocationSummary;
  content: LocationContent;
}) {
  const crumbs = [{ label: "Locations", href: "/locations/" }, { label: location.name, href: location.path }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={localBusinessJsonLd(location)} />
      <JsonLd data={faqJsonLd(content.faqs)} />

      <PageHeader crumbs={crumbs} title={`Gold Buyers in ${location.name}`} />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-6 text-charcoal/80">
          <Reveal variant="fade-up">
            {content.intro.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {location.branch && (
        <section className="pb-14 sm:pb-20">
          <Container className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Visit Our {location.name} Branch
            </h2>
            <Reveal variant="fade-up" className="mt-6">
              <LocationMap branch={location.branch} locationName={location.name} />
            </Reveal>
          </Container>
        </section>
      )}

      {location.branch?.gallery && location.branch.gallery.length > 0 && (
        <section className="pb-14 sm:pb-20">
          <Container className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Photos from Our {location.name} Branch
            </h2>
            <div className="mt-6">
              <LocationGallery photos={location.branch.gallery} />
            </div>
          </Container>
        </section>
      )}

      <section className="pb-14 sm:pb-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <GoldRateCard variant="full" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Gold Value Calculator for {location.name}
          </h2>
          <Reveal variant="fade-up" className="mt-6">
            <GoldCalculator />
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-10">
          <ContentBlock title={`Sell Your Gold in ${location.name}`} body={content.sellGold} />
          <ContentBlock title="Pledged Gold Release" body={content.pledgedGoldRelease} />
          <ContentBlock title={`Doorstep Service in ${location.name}`} body={content.doorstepService} />
        </Container>
      </section>

      <HowItWorks />

      <section className="bg-cream py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-charcoal">Why Choose Akarshana Gold</h2>
          <Reveal variant="fade-up" className="mt-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {content.whyChoose.map((reason) => (
                <li key={reason} className="rounded-xl bg-white p-4 text-sm text-charcoal/70">
                  {reason}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <LeadForm
              defaultLocation={location.slug}
              title={`Request a Gold Valuation in ${location.name}`}
              description="Share your details and our team will confirm your gold valuation."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            FAQs — Gold Buying in {location.name}
          </h2>
          <Reveal variant="fade-up" className="mt-6">
            <Accordion items={content.faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <Reveal variant="fade-up">
      <h2 className="font-display text-2xl font-semibold text-charcoal">{title}</h2>
      <p className="mt-3 text-charcoal/70">{body}</p>
    </Reveal>
  );
}
