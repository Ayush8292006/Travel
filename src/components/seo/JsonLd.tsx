import { TripPackage } from "@/data/trips";
import { FaqItem } from "@/data/faqs";

const SITE_URL = "https://trailstories.in";

export function TravelAgencyJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Trail Stories",
    alternateName: "@trailstories.in",
    url: SITE_URL,
    telephone: "+91-9876543210",
    email: "concierge@trailstories.in",
    description:
      "Luxury editorial curated tours and slow adventure expeditions across Spiti Valley, Kashmir, Ladakh, Manali, Rajasthan, Kerala and Goa.",
    sameAs: ["https://instagram.com/trailstories.in"],
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1221",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristTripJsonLd({ trip }: { trip: TripPackage }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.overview,
    url: `${SITE_URL}/packages/${trip.slug}`,
    touristType: trip.filterTags,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: trip.itinerary.length,
      itemListElement: trip.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        name: `Day ${day.day}: ${day.title}`,
        description: day.description,
      })),
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/packages/${trip.slug}`,
      priceCurrency: "INR",
      price: String(trip.price),
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(trip.rating),
      reviewCount: String(trip.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqPageJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

