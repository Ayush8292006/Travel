"use client";

import { useState } from "react";
import Link from "next/link";
import { TRIPS, TripFilterTag } from "@/data/trips";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import PackageCard from "./PackageCard";

const FILTER_TABS: ("All" | TripFilterTag)[] = [
  "Popular",
  "Under 5 Days",
  "5-8 Days",
  "Couples",
  "Family",
  "Groups",
  "All",
];

export default function CuratedTrips() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | TripFilterTag>("Popular");

  return (
    <section
      id="curated-trips"
      aria-labelledby="curated-trips-heading"
      data-alt="2050"
      className="bg-beige text-black grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-black/15">
          <div className="space-y-3">
            <span className="chapter-rule text-muted">
              03 · Handcrafted Itineraries
            </span>
            <h2
              id="curated-trips-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-none"
            >
              <span className="mask-wrap"><span data-mask className="block">Curated <em className="italic">Journeys</em></span></span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter tour packages"
            className="flex flex-wrap gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const active = selectedFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedFilter(tab)}
                  className={`min-h-[44px] px-5 py-2 label-caps border transition-colors ${
                    active
                      ? "bg-ink text-gold border-ink"
                      : "bg-transparent text-black border-black/15 hover:border-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* All 7 Package Cards Stay in SSR HTML; CSS Toggles Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRIPS.filter((trip) => selectedFilter === "All" || trip.filterTags.includes(selectedFilter)).map((trip, i) => {
            const isVisible =
              selectedFilter === "All" ||
              trip.filterTags.includes(selectedFilter);
            return (
              <PackageCard
                key={trip.id}
                trip={trip}
                visible={isVisible}
                index={i}
              />
            );
          })}
        </div>

        {/* Destination-Wise Hub Directory with "View all" Links */}
        <div className="pt-12 border-t border-black/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-black">
              Browse Destination-Wise Package Archives
            </h3>
            <span className="label-caps text-muted">
              Regional Hub Directory
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTINATIONS.map((dest, i) => (
              <Link
                key={dest.id}
                href={getDestinationUrl(dest)}
                data-rise={(i % 4) * 0.04}
                className="min-h-[56px] px-5 py-4 bg-paper border border-black/10 hover:bg-ink hover:text-beige flex items-center justify-between transition-colors duration-500 group"
              >
                <div>
                  <span className="font-serif text-xl block">
                    {dest.name}
                  </span>
                  <span className="label-caps text-[10px] opacity-60">
                    {dest.packageCount} Curated Packages
                  </span>
                </div>
                <span className="label-caps text-[10px] group-hover:text-gold transition-colors">
                  View all →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

