"use client";

import { useState } from "react";
import { TESTIMONIALS_DATA } from "@/data/faqs";
import RealImage from "@/components/ui/RealImage";

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TESTIMONIALS_DATA.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-alt="60"
      className="bg-deep-beige text-white"
    >
      <div data-frame className="relative min-h-[100svh] overflow-hidden bg-ink flex flex-col justify-between">
        <img
          src="/images/hero-ladakh.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink/90" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 pt-24 sm:pt-32 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="chapter-rule text-gold/80">06 · Guest Letters</span>
            <h2
              id="testimonials-heading"
              className="font-serif text-4xl sm:text-6xl font-light text-white leading-none"
            >
              Words from the <em className="italic text-gold">Return</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="min-h-[44px] min-w-[44px] px-4 border border-white/30 text-white label-caps hover:bg-beige hover:text-black transition-colors duration-500"
            >
              ←
            </button>
            <span className="font-mono text-xs tracking-[0.2em] px-2 text-beige/80">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="min-h-[44px] min-w-[44px] px-4 border border-white/30 text-white label-caps hover:bg-beige hover:text-black transition-colors duration-500"
            >
              →
            </button>
          </div>
        </div>

        {/* All quotes stay in the SSR DOM; the active one is shown */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 pb-20 sm:pb-28 pt-16">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <blockquote
                key={item.id}
                className={`quote-swap grid-cols-1 lg:grid-cols-12 gap-10 items-end ${isCurrent ? "grid" : "hidden"}`}
              >
                <div className="lg:col-span-9 space-y-8 order-2 lg:order-1">
                  <p className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.12]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-beige/60">
                    <span>Journey: {item.tripTitle}</span>
                    <span>Departed: {item.date}</span>
                  </footer>
                </div>
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end gap-4 order-1 lg:order-2 lg:text-right">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 overflow-hidden rounded-full border border-gold/40">
                    <RealImage imageKey={item.imageKey} compactSkeleton className="w-full h-full" />
                  </div>
                  <div>
                    <cite className="not-italic font-serif text-2xl text-white block">{item.author}</cite>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold block mt-1">
                      {item.city} · ★ {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
