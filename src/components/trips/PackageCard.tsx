"use client";

import Link from "next/link";
import { TripPackage, formatINR } from "@/data/trips";
import RealImage from "@/components/ui/RealImage";

interface PackageCardProps {
  trip: TripPackage;
  visible?: boolean;
  index?: number;
}

export default function PackageCard({ trip, visible = true, index = 0 }: PackageCardProps) {
  const whatsappText = encodeURIComponent(
    `Hello Trail Stories, I would like to enquire about the "${trip.title}" (${trip.days}D/${trip.nights}N) package.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  if (!visible) return null;

  return (
    <div data-rise={(index % 3) * 0.06} className="h-full">
      <article className="group/card bg-paper border border-black/10 flex flex-col justify-between h-full">
        <div>
          {/* Image Frame with 3D Floating Badges */}
          <Link
            href={`/packages/${trip.slug}`}
            data-cursor="view"
            className="block relative aspect-[3/2] overflow-hidden bg-ink group"
          >
            <div data-wipe className="absolute inset-0">
            <RealImage
              imageKey={trip.imageKey}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover"
            />
            </div>

            {/* Top Bar: Floating Package Tag + Rating in 3D */}
            <div
              className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none"
            >
              <span className="px-3 py-1 bg-ink/85 text-gold font-mono text-[10px] tracking-[0.18em] uppercase">
                {trip.badgeTag}
              </span>
              <span className="px-2.5 py-1 bg-ink/85 text-beige text-xs flex items-center gap-1">
                <span aria-hidden="true">★</span>
                <span>{trip.rating.toFixed(1)}</span>
                <span className="text-beige/60 text-[11px]">({trip.reviewCount})</span>
              </span>
            </div>

            {/* Bottom Bar: Duration Floating in 3D space */}
            <div
              className="absolute bottom-0 left-0 px-4 py-2 bg-paper text-black pointer-events-none"
            >
              <span className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                {trip.days}D / {trip.nights}N
              </span>
            </div>
          </Link>

          {/* Card Content Body */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between label-caps text-[10px] text-muted">
              <span>{trip.destinationName}</span>
              <span>Max {trip.groupSize}</span>
            </div>

            <h3 className="font-serif text-2xl text-black font-light leading-snug">
              <Link href={`/packages/${trip.slug}`} className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] group-hover/card:bg-[length:100%_1px] transition-[background-size] duration-500">{trip.title}</Link>
            </h3>

            <p className="text-xs text-muted line-clamp-2 leading-relaxed">
              {trip.subtitle}
            </p>

            {/* Route Stops with subtle chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-black">
              {trip.routeStops.map((stop, idx) => (
                <span key={stop.place} className="inline-flex items-center gap-1">
                  <span className="px-2 py-0.5 border border-black/10 text-[11px] font-sans">
                    {stop.place}
                  </span>
                  {idx < trip.routeStops.length - 1 && (
                    <span aria-hidden="true" className="text-muted text-[10px]">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Dual Action Footer */}
        <div className="px-6 pb-6 pt-2 space-y-4 border-t border-black/10">
          <div className="flex items-baseline justify-between pt-2">
            <div>
              <span className="label-caps text-[10px] text-muted block">
                Starting From
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-3xl text-black font-medium">
                  {formatINR(trip.price)}
                </span>
                <span className="font-serif text-base text-muted line-through">
                  {formatINR(trip.originalPrice)}
                </span>
              </div>
            </div>
            <span className="text-[11px] text-muted">per guest</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFFFFF", backgroundColor: "#0E0E0E" }}
              className="min-h-[44px] px-3 inline-flex items-center justify-center bg-black text-white label-caps text-[10px] text-center hover:bg-muted transition-colors font-medium border border-black"
            >
              WhatsApp
            </a>

            <Link
              href={`/#enquiry?package=${encodeURIComponent(trip.title)}`}
              style={{ color: "#0E0E0E", backgroundColor: "#EFE7DA" }}
              className="min-h-[44px] px-3 inline-flex items-center justify-center border border-black text-black bg-beige label-caps text-[10px] text-center hover:bg-deep-beige transition-colors font-medium"
            >
              Request Callback
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
