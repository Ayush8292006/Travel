import Link from "next/link";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import RealImage from "@/components/ui/RealImage";

/**
 * Pinned 3D atlas: vertical scroll drives the track sideways while every
 * plate bends round a cylinder (rotateY + depth by distance from centre).
 * The motion is owned by MotionEngine via data-arc hooks.
 */
export default function DestinationJourney() {
  return (
    <section
      aria-labelledby="destination-journey-heading"
      data-arc
      data-alt="2650"
      className="relative bg-ink text-white grain-overlay"
    >
      <div className="arc-sticky sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 pb-8 sm:pb-10 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="chapter-rule text-gold/80">02 · Visual Atlas</span>
            <h2
              id="destination-journey-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-none"
            >
              Across <em className="italic text-gold">Landscapes</em>
            </h2>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-beige/60">
            Keep scrolling · {DESTINATIONS.length} plates
          </p>
        </div>

        <div className="relative z-10" style={{ perspective: "1600px" }}>
          <div
            data-arc-track
            className="flex gap-5 sm:gap-8 w-max pl-[8vw] pr-[8vw] will-change-transform no-scrollbar"
            style={{ transformStyle: "preserve-3d" }}
          >
            {DESTINATIONS.map((dest, idx) => (
              <article
                key={dest.id}
                data-arc-card
                className="shrink-0 w-[72vw] sm:w-[340px] lg:w-[380px]"
              >
                <Link href={getDestinationUrl(dest)} data-cursor="view" className="group block">
                  <div className="relative aspect-[3/4] max-h-[58svh] w-full overflow-hidden bg-black">
                    <RealImage
                      imageKey={dest.imageKey}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
                      <span className="text-gold">
                        {String(idx + 1).padStart(2, "0")} / {String(DESTINATIONS.length).padStart(2, "0")}
                      </span>
                      <span className="text-beige/80">{dest.bestSeason}</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-beige/60">
                        <span>{dest.regionLabel}</span>
                        <span className="hidden sm:inline">{dest.coordinates}</span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">{dest.name}</h3>
                      <p className="text-xs text-beige/70 line-clamp-2 leading-relaxed">{dest.tagline}</p>
                      <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                        <span className="label-caps text-[10px] text-beige">Explore {dest.packageCount} Packages</span>
                        <span className="font-serif italic text-lg text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
