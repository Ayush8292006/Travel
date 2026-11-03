"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitWords from "@/components/motion/SplitWords";

const PRINCIPLES = [
  {
    number: "01",
    title: "Unhurried Acclimatization",
    body: "Every high-altitude route is engineered around gradual ascent curves, private rest days, and medical-grade safety protocols.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M4 32L15 14L23 25L30 17L36 32H4Z" />
        <circle cx="29" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Heirloom Architecture",
    body: "We bypass generic hotel chains for third-generation walnut houseboats, mud-brick Spitian homestays, and restored Kathkuni estates.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <rect x="7" y="16" width="26" height="18" />
        <path d="M4 16L20 6L36 16" />
        <line x1="20" y1="22" x2="20" y2="34" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Intimate Group Geometry",
    body: "Group departures are capped strictly at 8 to 12 kindred travellers, preserving quietude at monasteries and access to remote villages.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" />
        <polygon points="20,10 23,20 20,30 17,20" />
        <line x1="6" y1="20" x2="34" y2="20" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Native Custodianship",
    body: "Led by regional historians, Balti storytellers, and mountaineering-certified captains whose families call these valleys home.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M20 6V34M10 14C14 10 26 10 30 14M8 26C14 22 26 22 32 26" />
      </svg>
    ),
  },
];

const STATS = [
  { target: 2500, suffix: "+", decimals: 0, label: "Curated Journeys Hosted" },
  { target: 4.9, suffix: " / 5", decimals: 1, label: "Verified Traveler Rating" },
  { target: 12, suffix: " Max", decimals: 0, label: "Guests Per Group Batch" },
  { target: 100, suffix: "%", decimals: 0, label: "Recce-Tested Stays" },
];

export default function WhyTrailStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState(STATS.map((s) => s.target));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || animated || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setAnimated(true);
          const duration = 1400;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(
              STATS.map((s) =>
                Number((s.target * eased).toFixed(s.decimals))
              )
            );
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, animated]);

  return (
    <section
      id="why-trail-stories"
      ref={sectionRef}
      aria-labelledby="why-heading"
      data-alt="225"
      className="bg-beige text-black grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-black/15">
          <div className="space-y-3">
            <span className="chapter-rule text-muted">
              04 · The Trail Stories Ethos
            </span>
            <h2
              id="why-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-none"
            >
              <span className="mask-wrap"><span data-mask className="block">Quiet <em className="italic">Mastery</em> on Every Trail</span></span>
            </h2>
          </div>

          <p data-scrub className="font-serif text-2xl sm:text-3xl text-black max-w-md leading-snug">
            <SplitWords text="Aman-inspired serenity paired with National Geographic field rigor. Four principles guide every itinerary we sign." />
          </p>
        </div>

        {/* 4 Principles Grid with Thin-Line SVG Icons & 3D Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-black/15">
          {PRINCIPLES.map((item, i) => (
            <div key={item.number} data-rise={i * 0.05} className="h-full">
              <div className="group relative p-8 lg:p-10 flex flex-col justify-between gap-16 h-full border-b lg:border-b-0 sm:border-r border-black/15 overflow-hidden">
                <span aria-hidden="true" className="absolute inset-0 bg-ink origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]" />
                <div className="relative flex items-center justify-between text-black group-hover:text-gold transition-colors duration-700">
                  <span className="font-mono text-xs tracking-[0.2em]">
                    {item.number}
                  </span>
                  <div>{item.icon}</div>
                </div>

                <div className="relative space-y-3 group-hover:text-beige transition-colors duration-700">
                  <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Counters Band */}
        <div data-rise className="bg-ink text-beige grain-overlay p-8 sm:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 rounded-[20px]">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="space-y-2 border-l border-white/15 pl-4 sm:pl-6"
            >
              <div className="font-serif text-4xl sm:text-6xl text-white font-light">
                {counts[idx].toFixed(stat.decimals)}
                <em className="italic text-gold">{stat.suffix}</em>
              </div>
              <p className="label-caps text-[10px] text-deep-beige">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

