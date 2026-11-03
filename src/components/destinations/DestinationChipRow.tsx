import Link from "next/link";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import RealImage from "@/components/ui/RealImage";

export default function DestinationChipRow() {
  return (
    <section
      aria-label="Quick Destination Selector"
      className="bg-beige border-b border-black/10 pt-4"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center gap-3 overflow-x-auto no-scrollbar">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted shrink-0 pr-3 border-r border-black/15">
          Regions
        </span>

        {DESTINATIONS.map((dest) => (
          <Link
            key={dest.id}
            href={getDestinationUrl(dest)}
            className="min-h-[44px] shrink-0 inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 border border-black/10 hover:bg-ink hover:text-beige transition-colors duration-500 group"
          >
            <div className="w-8 h-8 overflow-hidden shrink-0 border border-black/10">
              <RealImage
                imageKey={dest.imageKey}
                compactSkeleton
                className="w-full h-full"
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-medium">
                {dest.shortName}
              </span>
              <span className="block text-[10px] opacity-60 font-serif italic">
                {dest.packageCount} Curation{dest.packageCount > 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

