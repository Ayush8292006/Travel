import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TRIPS, formatINR } from "@/data/trips";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import { FAQS } from "@/data/faqs";
import { getManifestImage } from "@/data/images.manifest";
import RealImage from "@/components/ui/RealImage";
import FaqAccordion from "@/components/trust/FaqAccordion";
import EnquirySection from "@/components/trust/EnquirySection";
import {
  BreadcrumbJsonLd,
  FaqPageJsonLd,
  TouristTripJsonLd,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRIPS.map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = TRIPS.find((t) => t.slug === slug);

  if (!trip) {
    return { title: "Package Not Found | Trail Stories" };
  }

  const imageAsset = getManifestImage(trip.imageKey);
  const canonicalPath = `/packages/${trip.slug}`;

  return {
    title: `${trip.title} (${trip.days}D/${trip.nights}N) | Trail Stories`,
    description: `${trip.subtitle} Starting from ${formatINR(trip.price)}. Rated ${trip.rating}/5 across ${trip.reviewCount} reviews.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${trip.title} | Trail Stories`,
      description: trip.overview,
      url: canonicalPath,
      type: "website",
      images: [
        {
          url: imageAsset.src,
          width: imageAsset.width,
          height: imageAsset.height,
          alt: imageAsset.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${trip.title} (${trip.days}D/${trip.nights}N)`,
      description: trip.subtitle,
      images: [imageAsset.src],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = TRIPS.find((t) => t.slug === slug);

  if (!trip) {
    notFound();
  }

  const destination = DESTINATIONS.find(
    (d) => d.destinationSlug === trip.destinationSlug
  );
  const destinationHref = destination
    ? getDestinationUrl(destination)
    : "/#destinations";

  const whatsappText = encodeURIComponent(
    `Hello Trail Stories, I would like to enquire about "${trip.title}" (${trip.days}D/${trip.nights}N) starting at ${formatINR(trip.price)}.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    {
      name: trip.destinationName,
      path: destinationHref,
    },
    { name: trip.title, path: `/packages/${trip.slug}` },
  ];

  return (
    <>
      <TouristTripJsonLd trip={trip} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqPageJsonLd faqs={FAQS} />

      <div className="bg-beige text-black grain-overlay pt-24">
        {/* Breadcrumb Strip */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 border-b border-black/10"
        >
          <ol className="flex flex-wrap items-center gap-2 label-caps text-[10px] text-muted">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={destinationHref} className="hover:text-black">
                {trip.destinationName}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-black">
              {trip.title}
            </li>
          </ol>
        </nav>

        {/* Editorial Hero Header */}
        <header className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-b border-black/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-black text-beige label-caps text-[10px]">
                  {trip.badgeTag}
                </span>
                <span className="px-3 py-1 bg-white border border-black/15 font-serif text-lg text-black">
                  {trip.days} Days / {trip.nights} Nights
                </span>
                <span className="px-3 py-1 bg-white border border-black/15 text-xs text-black">
                  ★ {trip.rating.toFixed(1)} ({trip.reviewCount} Reviews)
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-[1.02]">
                {trip.title}
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                {trip.subtitle}
              </p>

              {/* Route Stops Breakdown */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-black">
                <span className="label-caps text-[10px] text-muted mr-1">
                  Route:
                </span>
                {trip.routeStops.map((stop, idx) => (
                  <span key={stop.place} className="inline-flex items-center gap-2">
                    <span className="px-3 py-1 bg-deep-beige/60 border border-black/10">
                      <strong className="font-serif text-base">{stop.days}D</strong>{" "}
                      {stop.place}
                    </span>
                    {idx < trip.routeStops.length - 1 && (
                      <span aria-hidden="true" className="text-muted">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-black/15 p-6 space-y-4">
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4">
                <div>
                  <span className="label-caps text-[10px] text-muted block">
                    Curated Tariff
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-serif text-4xl text-black font-medium">
                      {formatINR(trip.price)}
                    </span>
                    <span className="font-serif text-xl text-muted line-through">
                      {formatINR(trip.originalPrice)}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted">per guest</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted">
                <div>
                  <span className="label-caps text-[10px] block">Max Altitude</span>
                  <strong className="text-black font-normal">{trip.maxAltitude}</strong>
                </div>
                <div>
                  <span className="label-caps text-[10px] block">Group Size</span>
                  <strong className="text-black font-normal">{trip.groupSize}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFFFFF", backgroundColor: "#0E0E0E" }}
                  className="min-h-[48px] px-4 inline-flex items-center justify-center bg-black text-white label-caps text-[10px] text-center hover:bg-muted transition-colors font-medium border border-black"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href="#enquiry"
                  style={{ color: "#0E0E0E", backgroundColor: "#EFE7DA" }}
                  className="min-h-[48px] px-4 inline-flex items-center justify-center border border-black text-black bg-beige label-caps text-[10px] text-center hover:bg-deep-beige transition-colors font-medium"
                >
                  Request Callback
                </a>
              </div>
            </div>
          </div>

          {/* Primary Feature Image */}
          <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-black/15">
            <RealImage
              imageKey={trip.imageKey}
              priority
              className="w-full h-full"
            />
          </div>
        </header>

        {/* Main Content Grid: Overview, Highlights, Itinerary, Inclusions/Exclusions */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section aria-labelledby="overview-heading" className="space-y-4">
              <span className="label-caps text-muted block">
                01 • Narrative Overview
              </span>
              <h2
                id="overview-heading"
                className="font-serif text-3xl sm:text-5xl font-light text-black"
              >
                About This <em className="italic">Curation</em>
              </h2>
              <p className="text-base sm:text-lg text-black/85 leading-relaxed">
                {trip.overview}
              </p>

              {/* Highlights */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.highlights.map((item) => (
                  <div
                    key={item}
                    className="p-4 bg-white border border-black/15 flex items-start gap-3 text-sm text-black"
                  >
                    <span className="font-serif italic text-lg text-muted leading-none">
                      ✦
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Day-by-Day Itinerary */}
            <section
              aria-labelledby="itinerary-heading"
              className="space-y-6 pt-12 border-t border-black/15"
            >
              <span className="label-caps text-muted block">
                02 • Daily Progression
              </span>
              <h2
                id="itinerary-heading"
                className="font-serif text-3xl sm:text-5xl font-light text-black"
              >
                Day-by-Day <em className="italic">Itinerary</em>
              </h2>

              <div className="divide-y divide-black/15 border-t border-b border-black/15">
                {trip.itinerary.map((dayItem, idx) => (
                  <details
                    key={dayItem.day}
                    open={idx === 0}
                    className="group py-6"
                  >
                    <summary className="min-h-[44px] list-none cursor-pointer flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif italic text-2xl text-muted shrink-0">
                          Day 0{dayItem.day}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-light text-black">
                          {dayItem.title}
                        </h3>
                      </div>
                      <span className="label-caps text-[10px] text-muted shrink-0">
                        {dayItem.elevationOrNote}
                      </span>
                    </summary>
                    <div className="pt-4 pl-0 sm:pl-16 text-sm sm:text-base text-muted leading-relaxed">
                      <p>{dayItem.description}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section
              aria-labelledby="inclusions-heading"
              className="space-y-6 pt-12 border-t border-black/15"
            >
              <span className="label-caps text-muted block">
                03 • Tariff Transparency
              </span>
              <h2
                id="inclusions-heading"
                className="font-serif text-3xl sm:text-5xl font-light text-black"
              >
                Inclusions &amp; <em className="italic">Exclusions</em>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-black/15 p-6 space-y-4">
                  <h3 className="label-caps text-black border-b border-black/10 pb-3">
                    Included in Your Journey
                  </h3>
                  <ul className="space-y-3 text-sm text-black/85">
                    {trip.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="text-black font-bold">
                          +
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-black/15 p-6 space-y-4">
                  <h3 className="label-caps text-muted border-b border-black/10 pb-3">
                    Not Included
                  </h3>
                  <ul className="space-y-3 text-sm text-muted">
                    {trip.exclusions.map((exc) => (
                      <li key={exc} className="flex items-start gap-2.5">
                        <span aria-hidden="true">–</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Right Concierge Summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 bg-white border border-black/15 p-6 sm:p-8 space-y-6">
            <span className="label-caps text-muted block">
              Expedition Fact Sheet
            </span>
            <h2 className="font-serif text-3xl text-black font-light">
              {trip.title}
            </h2>

            <dl className="divide-y divide-black/10 text-xs border-y border-black/10">
              <div className="py-3 flex justify-between">
                <dt className="label-caps text-[10px] text-muted">Duration</dt>
                <dd className="font-serif text-base text-black">
                  {trip.days}D / {trip.nights}N
                </dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="label-caps text-[10px] text-muted">Start / End</dt>
                <dd className="text-black">
                  {trip.startingPoint} → {trip.endingPoint}
                </dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="label-caps text-[10px] text-muted">Next Window</dt>
                <dd className="text-black">{trip.nextDeparture}</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="label-caps text-[10px] text-muted">Peak Elevation</dt>
                <dd className="text-black">{trip.maxAltitude}</dd>
              </div>
            </dl>

            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] w-full inline-flex items-center justify-center bg-black text-white label-caps hover:bg-muted transition-colors"
              >
                WhatsApp Concierge ↗
              </a>
              <a
                href="#enquiry"
                className="min-h-[48px] w-full inline-flex items-center justify-center border border-black text-black bg-beige label-caps hover:bg-deep-beige transition-colors"
              >
                Request Callback
              </a>
            </div>
          </aside>
        </div>
      </div>

      <FaqAccordion />
      <EnquirySection
        defaultDestination={trip.destinationName}
        defaultPackageName={trip.title}
      />
    </>
  );
}

