import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GoldItemsSection } from "@/components/home/GoldItemsSection";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DoorstepSection } from "@/components/home/DoorstepSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CalculatorSection />
      <ServicesSection />
      <GoldItemsSection />
      <WhyUs />
      <HowItWorks />
      <DoorstepSection />
      <LocationsSection />
      <Testimonials />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
