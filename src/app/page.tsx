import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { RequestValuationSection } from "@/components/home/RequestValuationSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GoldItemsSection } from "@/components/home/GoldItemsSection";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DoorstepSection } from "@/components/home/DoorstepSection";
import { DocumentsSection } from "@/components/home/DocumentsSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";

export const metadata: Metadata = {
  title:
    "Old Gold Buyers & Gold Valuation in Pollachi, Udumalpet, Coimbatore & Tiruppur | Akarshana Gold",
  description:
    "Sell your old gold for cash at today's transparent market rate. Akarshana Gold buys gold jewellery, coins & bars in Pollachi, Udumalpet, Coimbatore and Tiruppur — with free doorstep valuation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <RequestValuationSection />
      <ServicesSection />
      <GoldItemsSection />
      <WhyUs />
      <HowItWorks />
      <DoorstepSection />
      <DocumentsSection />
      <LocationsSection />
      <ReviewsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
