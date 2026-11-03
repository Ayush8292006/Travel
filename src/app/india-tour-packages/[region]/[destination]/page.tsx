import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  DESTINATIONS,
  getDestinationUrl,
} from "@/data/destinations";
import { TRIPS, formatINR } from "@/data/trips";
import { FAQS } from "@/data/faqs";
import { getManifestImage } from "@/data/images.manifest";
import RealImage from "@/components/ui/RealImage";
import PackageCard from "@/components/trips/PackageCard";
import FaqAccordion from "@/components/trust/FaqAccordion";
import EnquirySection from "@/components/trust/EnquirySection";
import {
  BreadcrumbJsonLd,
  FaqPageJsonLd,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ region: string; destination: string }>;
}

export async function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    region: dest.regionSlug,
    destination: dest.destinationSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, destination } = await params;
  const dest = DESTINATIONS.find(
    (d) => d.regionSlug === region && d.destinationSlug === destination
  );

  if (!dest) {
    return { title: "Destination Not Found | Trail Stories" };
  }

  const imageAsset = getManifestImage(dest.imageKey);
  const canonicalPath = getDestinationUrl(dest);

  return {
    title: `${dest.name} Tour Packages (${dest.bestSeason}) | Trail Stories`,
    description: `${dest.tagline} Explore curated private and small-group ${dest.name} packages starting from ${formatINR(dest.startingPrice)}.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${dest.name} Curated Tour Packages | Trail Stories`,
      description: dest.description,
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
      title: `${dest.name} Tour Packages | Trail Stories`,
      description: dest.tagline,
      images: [imageAsset.src],
    },
  };
}

export default async function RegionalDestinationPage({ params }: PageProps) {
  const { region, destination } = await params;
  const dest = DESTINATIONS.find(
    (d) => d.regionSlug === region && d.destinationSlug === destination
  );

  if (!dest) {
    notFound();
  }

  const matchingTrips = TRIPS.filter(
    (t) => t.destinationSlug === dest.destinationSlug
  );
  const relatedRegionalTrips = TRIPS.filter(
    (t) =>
      t.regionSlug === dest.regionSlug &&
      t.destinationSlug !== dest.destinationSlug
  );

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: dest.regionLabel, path: `/#destinations` },
    { name: `${dest.name} Packages`, path: getDestinationUrl(dest) },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqPageJsonLd faqs={FAQS} />

      <div className="bg-beige text-black grain-overlay pt-24">
        {/* Breadcrumb */}
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
              <Link href="/#destinations" className="hover:text-black">
                {dest.regionLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-black">
              {dest.name}
            </li>
          </ol>
        </nav>

        {/* Destination Masthead */}
        <header className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20 border-b border-black/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3 label-caps text-[10px] text-muted">
                <span>{dest.regionLabel}</span>
                <span>•</span>
                <span>{dest.coordinates}</span>
                <span>•</span>
                <span>{dest.altitudeOrClimate}</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-black leading-[0.96]">
                {dest.name} <em className="italic">Curations</em>
              </h1>

              <p className="font-serif italic text-2xl sm:text-3xl text-black/85">
                {dest.tagline}
              </p>

              <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                {dest.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-6 border-t border-black/10 text-xs">
                <div>
                  <span className="label-caps text-[10px] text-muted block">
                    Optimal Window
                  </span>
                  <strong className="font-serif text-xl text-black font-normal">
                    {dest.bestSeason}
                  </strong>
                </div>
                <div>
                  <span className="label-caps text-[10px] text-muted block">
                    Starting Tariff
                  </span>
                  <strong className="font-serif text-xl text-black font-normal">
                    {formatINR(dest.startingPrice)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] w-full overflow-hidden border border-black/15 bg-deep-beige">
                <RealImage
                  imageKey={dest.imageKey}
                  priority
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Destination Packages Section */}
        <section
          aria-labelledby="dest-packages-heading"
          className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-20 space-y-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/15">
            <div>
              <span className="label-caps text-muted block">
                Signature Itineraries
              </span>
              <h2
                id="dest-packages-heading"
                className="font-serif text-3xl sm:text-5xl font-light text-black mt-1"
              >
                {dest.name} Tour <em className="italic">Packages</em>
              </h2>
            </div>
            <Link
              href="#enquiry"
              className="min-h-[44px] px-6 inline-flex items-center justify-center bg-black text-white label-caps"
            >
              Request Custom {dest.shortName} Route
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchingTrips.map((trip) => (
              <PackageCard key={trip.id} trip={trip} />
            ))}
          </div>

          {/* Related Regional Packages */}
          {relatedRegionalTrips.length > 0 && (
            <div className="pt-16 border-t border-black/15 space-y-8">
              <div className="space-y-1">
                <span className="label-caps text-muted block">
                  More in {dest.regionLabel}
                </span>
                <h3 className="font-serif text-3xl text-black font-light">
                  Companion Journeys Across the Region
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedRegionalTrips.map((trip) => (
                  <PackageCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          )}

          {/* Other Destination Hubs */}
          <div className="pt-12 border-t border-black/15 space-y-6">
            <span className="label-caps text-muted block">
              Explore Other Regions
            </span>
            <div className="flex flex-wrap gap-3">
              {DESTINATIONS.map((other) => (
                <Link
                  key={other.id}
                  href={getDestinationUrl(other)}
                  className={`min-h-[44px] px-5 inline-flex items-center border label-caps text-[10px] transition-colors ${
                    other.id === dest.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/15 hover:bg-deep-beige"
                  }`}
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <FaqAccordion
        heading={`Frequently Asked Questions — ${dest.name}`}
      />
      <EnquirySection defaultDestination={dest.name} />
    </>
  );
}

