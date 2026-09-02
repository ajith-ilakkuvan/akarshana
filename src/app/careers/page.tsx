import type { Metadata } from "next";
import { Coins, Users, Truck, Store, MapPin, Briefcase, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { TrackedButtonLink } from "@/components/cta/TrackedButtonLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/components/ui/Breadcrumbs";
import { careerOpenings, careerApplyHref, type CareerOpening } from "@/config/careers";
import { contactConfig } from "@/config/contact";

const crumbs = [{ label: "Careers", href: "/careers/" }];

const icons: Record<CareerOpening["icon"], typeof Coins> = {
  coins: Coins,
  users: Users,
  truck: Truck,
  store: Store,
};

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore employment opportunities at Akarshana Gold Company across Pollachi, Udumalpet, Coimbatore and Tiruppur.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Careers at Akarshana Gold"
        description="Join a team building a transparent, professional gold valuation business across Pollachi, Udumalpet, Coimbatore and Tiruppur."
      />

      <section className="py-14 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-charcoal/80">
              We&rsquo;re growing our team of gold valuation and customer service professionals across our service
              locations. If you&rsquo;re reliable, detail-oriented and enjoy working with people, we&rsquo;d like to hear
              from you — current openings are listed below.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container>
          <RevealGroup variant="fade-up" staggerMs={90} className="grid gap-6 sm:grid-cols-2">
            {careerOpenings.map((opening) => {
              const Icon = icons[opening.icon];
              return (
                <article
                  key={opening.slug}
                  id={opening.slug}
                  className="neumorphic-gold-card scroll-mt-24 rounded-2xl border border-charcoal/10 bg-white p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-charcoal">{opening.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-charcoal/60">
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      {opening.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase aria-hidden="true" className="size-3.5" />
                      {opening.type}
                    </span>
                  </div>
                  <p className="mt-3 text-charcoal/70">{opening.summary}</p>

                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                      Responsibilities
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-charcoal/70">
                      {opening.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Requirements</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-charcoal/70">
                      {opening.requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <TrackedButtonLink
                    href={careerApplyHref(opening.title)}
                    size="sm"
                    className="mt-6"
                    event="career_apply_click"
                    eventPayload={{ role: opening.slug, source: "careers_page" }}
                  >
                    Apply Now
                  </TrackedButtonLink>
                </article>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <Reveal variant="fade-up">
            <h2 className="font-display text-2xl font-semibold text-charcoal">Don&rsquo;t See a Role That Fits?</h2>
            <p className="mt-3 text-charcoal/70">
              We&rsquo;re always open to hearing from motivated people interested in joining Akarshana Gold. Send us
              your details and we&rsquo;ll reach out when a suitable opening comes up.
            </p>
            <TrackedButtonLink
              href={careerApplyHref("Open Application")}
              variant="outline"
              className="mt-6"
              icon={<Mail aria-hidden="true" className="size-4" />}
              event="career_apply_click"
              eventPayload={{ role: "open-application", source: "careers_page" }}
            >
              Send an Open Application
            </TrackedButtonLink>
            <p className="mt-4 text-xs text-charcoal/50">Or email us directly at {contactConfig.email}</p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
