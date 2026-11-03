"use client";

import { useState } from "react";
import Link from "next/link";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import { formatINR } from "@/data/trips";
import RealImage from "@/components/ui/RealImage";

const GETAWAY_TABS = [
  "All",
  "Mountains",
  "High Altitude",
  "Heritage",
  "Backwaters & Coast",
  "Winter Snow",
] as const;

type GetawayTab = (typeof GETAWAY_TABS)[number];

export default function PerfectGetaway() {
  const [activeTab, setActiveTab] = useState<GetawayTab>("All");

  return (
    <section
      id="perfect-getaway"
      aria-labelledby="perfect-getaway-heading"
      data-alt="1200"
      className="bg-deep-beige text-black grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        {/* Heading & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-black/15">
          <div className="space-y-3">
            <span className="chapter-rule text-muted">
              Season &amp; Terrain Curation
            </span>
            <h2
              id="perfect-getaway-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-black"
            >
              <span className="mask-wrap"><span data-mask className="block">Find Your Perfect <em className="italic">Getaway</em></span></span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter destinations by travel style"
            className="flex flex-wrap gap-2"
          >
            {GETAWAY_TABS.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[44px] px-5 py-2 label-caps transition-colors border ${
                    isSelected
                      ? "bg-ink text-gold border-ink"
                      : "bg-transparent text-black border-black/20 hover:border-black"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* All Destination Tiles in SSR DOM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.filter((d) => activeTab === "All" || d.vibes.includes(activeTab)).map((dest, i) => {
            const matches =
              activeTab === "All" || dest.vibes.includes(activeTab);
            if (!matches) return null;

            return (
              <div key={dest.id} data-rise={(i % 4) * 0.05} className="h-full">
                <Link
                  href={getDestinationUrl(dest)}
                  data-cursor="view"
                  className="group bg-beige flex flex-col justify-between h-full"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-ink">
                    <div data-wipe className="w-full h-full">
                      <RealImage
                        imageKey={dest.imageKey}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between label-caps text-[10px] text-muted">
                      <span>{dest.bestSeason}</span>
                      <span>{dest.packageCount} Trips</span>
                    </div>
                    <h3 className="font-serif text-2xl text-black">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2">
                      {dest.tagline}
                    </p>
                    <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                      <span className="label-caps text-[10px] text-muted">
                        From {formatINR(dest.startingPrice)}
                      </span>
                      <span className="label-caps text-[10px] text-black transition-transform duration-500 group-hover:translate-x-1">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

