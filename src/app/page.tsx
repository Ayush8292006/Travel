import DestinationChipRow from "@/components/destinations/DestinationChipRow";
import Hero from "@/components/hero/Hero";
import DestinationIndex from "@/components/destinations/DestinationIndex";
import DestinationJourney from "@/components/destinations/DestinationJourney";
import CuratedTrips from "@/components/trips/CuratedTrips";
import PerfectGetaway from "@/components/destinations/PerfectGetaway";
import WhyTrailStories from "@/components/trust/WhyTrailStories";
import MomentsStrip from "@/components/trust/MomentsStrip";
import TestimonialsSlider from "@/components/trust/TestimonialsSlider";
import InstagramStrip from "@/components/trust/InstagramStrip";
import FaqAccordion from "@/components/trust/FaqAccordion";
import EnquirySection from "@/components/trust/EnquirySection";
import { BreadcrumbJsonLd, FaqPageJsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <FaqPageJsonLd faqs={FAQS} />

      {/* Pinned 3D scroll story: photo → live WebGL relief → map of the four chapters */}
      <Hero />

      {/* Next chapter lifts over the receding hero stage */}
      <div className="lift-over bg-beige">
        <DestinationChipRow />
        <DestinationIndex />
      </div>

      {/* Pinned 3D arc: plates bend round a cylinder as you scroll */}
      <DestinationJourney />

      {/* PHASE 4: Curated Trips with Client Filter Tabs (All Cards in SSR HTML) */}
      <CuratedTrips />

      {/* Find Your Perfect Getaway Filter Tabs + Destination Tiles */}
      <PerfectGetaway />

      {/* PHASE 5A: Why Trail Stories (4 Principles + Thin-Line Icons + Counters) */}
      <WhyTrailStories />

      {/* PHASE 5B: Moments Strip (9:16 Lazy-Autoplay Muted Traveler Clips) */}
      <MomentsStrip />

      {/* PHASE 5C: Testimonials (Large Serif Quote Slider with Traveler Portraits) */}
      <TestimonialsSlider />

      {/* PHASE 5D: Instagram Strip (@trailstories.in) */}
      <InstagramStrip />

      {/* PHASE 5E: Server-Rendered FAQ Accordion */}
      <FaqAccordion />

      {/* PHASE 5F: Black Final CTA Band + Validated Enquiry Form + WhatsApp Deep Link */}
      <EnquirySection />
    </>
  );
}
