"use client";

import { useEffect, useRef, useState } from "react";
import { MOMENTS, MomentAsset } from "@/data/images";
import RealImage from "@/components/ui/RealImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A moment shows its 9:16 photo. If an optional MP4 (videoSrc) is provided,
 * it lazy-autoplays muted when in view and falls back to the photo on error.
 */
function MomentCard({ item, reducedMotion, index }: { item: MomentAsset; reducedMotion: boolean; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(item.videoSrc) && !videoFailed && !reducedMotion;

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const vid = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) vid.play().catch(() => undefined);
        else vid.pause();
      },
      { threshold: 0.4 }
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div
      data-rise={(index % 6) * 0.035}
      className={`snap-start shrink-0 w-[72vw] sm:w-auto h-full ${index % 2 === 1 ? "sm:mt-16" : ""}`}
    >
      <article className="text-black flex flex-col h-full">
        <div data-wipe={(index % 6) * 0.035} className="relative aspect-[9/16] w-full overflow-hidden bg-ink rounded-[14px]">
          <RealImage
            imageKey={item.imageKey}
            className="absolute inset-0 w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          {showVideo && (
            <video
              ref={videoRef}
              src={item.videoSrc}
              width={720}
              height={1280}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div
            className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none"
          >
            <span className="px-2.5 py-1 bg-ink/80 text-gold font-mono text-[10px] tracking-[0.15em]">
              ★ {item.rating.toFixed(1)}
            </span>
            <span className="px-2.5 py-1 bg-ink/80 text-beige font-mono text-[10px] tracking-[0.15em] uppercase">
              {item.tripCount}
            </span>
          </div>
        </div>
        <div className="pt-4 space-y-1">
          <span className="label-caps text-[10px] text-muted block">{item.location}</span>
          <h3 className="font-serif text-xl text-black font-normal">{item.title}</h3>
          <p className="text-xs text-muted">Shared by {item.traveler}</p>
        </div>
      </article>
    </div>
  );
}

export default function MomentsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="moments"
      aria-labelledby="moments-heading"
      data-alt="120"
      className="bg-deep-beige text-black grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/15">
          <div className="space-y-3">
            <span className="chapter-rule text-muted">05 · Unscripted Dispatches</span>
            <h2
              id="moments-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-none"
            >
              <span className="mask-wrap"><span data-mask className="block">Traveler <em className="italic">Moments</em></span></span>
            </h2>
          </div>
          <div className="text-left md:text-right space-y-1">
            <span className="font-serif text-3xl text-black block">
              4.9 ★ <em className="italic text-muted text-xl">across 2,500+ guests</em>
            </span>
            <span className="label-caps text-[10px] text-muted block">Frames from the trail</span>
          </div>
        </div>

        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {MOMENTS.map((item, i) => (
            <MomentCard key={item.key} item={item} reducedMotion={reducedMotion} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
