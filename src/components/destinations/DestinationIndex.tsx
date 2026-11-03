"use client";

import { useState } from "react";
import Link from "next/link";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import { formatINR } from "@/data/trips";
import RealImage from "@/components/ui/RealImage";
import SplitWords from "@/components/motion/SplitWords";

/**
 * Geographic Index as an elevation profile: the seven regions plotted at
 * their real altitude on a layered ridge-line, Himalaya to the Konkan coast.
 * The whole relief stands up from flat (rotateX) and the line draws itself
 * as it scrolls in (MotionEngine: data-tilt / data-draw).
 */

const W = 1400;
const H = 560;
const BASE = 500; // y of sea level
const TOP = 70; // y of 6,000 m
const MAX_ALT = 6000;
const PAD_X = W / 14; // markers sit on the centre of each legend column

const altitudeOf = (s: string) => {
  const nums = (s.match(/\d[\d,]*/g) || []).map((n) => parseInt(n.replace(/,/g, ""), 10));
  return nums.length ? Math.max(...nums) : 0;
};
const yOf = (alt: number) => BASE - (alt / MAX_ALT) * (BASE - TOP);

const POINTS = DESTINATIONS.map((d, i) => {
  const alt = altitudeOf(d.altitudeOrClimate);
  const x = PAD_X + (i * (W - PAD_X * 2)) / (DESTINATIONS.length - 1);
  return { d, alt, x, y: yOf(alt) };
});

// deterministic ridge noise so server and client render the same path
const rnd = (n: number) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

function ridge(seed: number, lift: number, rough: number) {
  const pts: [number, number][] = [[0, yOf(POINTS[0].alt * 0.7 * lift)]];
  POINTS.forEach((p, i) => {
    pts.push([p.x, yOf(p.alt * lift)]);
    const next = POINTS[i + 1];
    if (!next) return;
    const steps = 4;
    for (let k = 1; k < steps; k++) {
      const t = k / steps;
      // valleys sag between summits, with the odd shoulder rising off them
      const alt = (p.alt + (next.alt - p.alt) * t) * (1 - 0.18 * Math.sin(Math.PI * t));
      const bump = (rnd(seed + i * 7 + k) - 0.5) * rough * (alt + 400);
      pts.push([p.x + (next.x - p.x) * t, yOf(Math.max(0, (alt + bump) * lift))]);
    }
  });
  pts.push([W, yOf(POINTS[POINTS.length - 1].alt * lift)]);
  // Catmull-Rom → cubic Bézier
  let d = `M${pts[0][0]},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
  }
  return d;
}

const FRONT = ridge(3, 1, 0.12);
const MID = ridge(11, 1.06, 0.45);
const BACK = ridge(29, 1.12, 0.7);
const close = (d: string) => `${d} L${W},${H} L0,${H} Z`;

const GRID = [0, 1000, 2000, 3000, 4000, 5000, 6000];

export default function DestinationIndex() {
  const [active, setActive] = useState<number | null>(null);
  const a = active !== null ? POINTS[active] : null;

  return (
    <section
      id="destinations"
      aria-labelledby="destination-index-heading"
      data-alt="3200"
      className="relative bg-beige text-black grain-overlay pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 gap-6">
          <div className="space-y-3">
            <span className="chapter-rule text-muted">01 · Geographic Index</span>
            <h2
              id="destination-index-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-black leading-none"
            >
              <span className="mask-wrap">
                <span data-mask className="block">
                  Seven <em className="italic">Regions</em> of Wonder
                </span>
              </span>
            </h2>
          </div>
          <p data-scrub className="font-serif text-2xl sm:text-3xl text-black max-w-md leading-snug">
            <SplitWords text="From 5,359 metres in Ladakh down to the Konkan coast, every region plotted where it really stands." />
          </p>
        </div>

        {/* The relief */}
        <div className="relative" style={{ perspective: "1800px" }}>
          <div data-tilt="58" className="relative origin-bottom" style={{ transformStyle: "preserve-3d" }}>
            {/* far ranges behind the plotted line */}
            {[
              { d: BACK, fill: "#E6DAC7", z: 1 },
              { d: MID, fill: "#DDCFB7", z: 2 },
            ].map((l) => (
              <svg
                key={l.z}
                aria-hidden="true"
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                style={{ overflow: "hidden" }}
              >
                <path d={close(l.d)} fill={l.fill} />
                <path d={l.d} fill="none" stroke="#0E0E0E" strokeOpacity="0.12" strokeWidth="1" />
              </svg>
            ))}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="relative w-full h-auto block overflow-visible"
              role="img"
              aria-label="Elevation profile of the seven Trail Stories regions, from Spiti at 4,270 m to Goa at sea level"
            >
              <defs>
                <linearGradient id="rp-front" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#CDBB9E" />
                  <stop offset="1" stopColor="#EFE7DA" stopOpacity="0.96" />
                </linearGradient>
              </defs>

              {/* altitude grid lines (behind the front range) */}
              {GRID.map((g) => (
                <line key={g} x1={0} x2={W} y1={yOf(g)} y2={yOf(g)} stroke="#0E0E0E" strokeOpacity={g === 0 ? 0.35 : 0.08} strokeDasharray={g === 0 ? undefined : "2 6"} />
              ))}

              <path d={close(FRONT)} fill="url(#rp-front)" />
              <path d={FRONT} fill="none" stroke="#0E0E0E" strokeWidth="1.4" pathLength={1} data-draw />

              {/* altitude labels on top */}
              {GRID.map((g) => (
                <text key={g} x={0} y={yOf(g) - 6} className="font-mono" fontSize="11" letterSpacing="2" fill="#5B554C">
                  {g === 0 ? "SEA LEVEL" : `${g.toLocaleString("en-IN")} M`}
                </text>
              ))}

              {/* region markers */}
              {POINTS.map((p, i) => {
                const on = active === i;
                return (
                  <g key={p.d.id}>
                    <line x1={p.x} x2={p.x} y1={p.y} y2={BASE} stroke="#0E0E0E" strokeOpacity={on ? 0.6 : 0.2} strokeDasharray="3 4" />
                    <circle cx={p.x} cy={p.y} r={on ? 11 : 7} fill={on ? "#0D0B09" : "#EFE7DA"} stroke="#0D0B09" strokeWidth="1.4" style={{ transition: "r .4s, fill .4s" }} />
                    {on && <circle cx={p.x} cy={p.y} r={20} fill="none" stroke="#B8955A" strokeWidth="1" />}
                    <text x={p.x} y={p.y - 22} textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="1.5" fill={on ? "#0E0E0E" : "#5B554C"}>
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* photo plate rising off the active summit */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute pointer-events-none w-56 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{
                left: a ? `${(a.x / W) * 100}%` : "50%",
                top: a ? `${(a.y / H) * 100}%` : "50%",
                opacity: a ? 1 : 0,
                transform: `translate(-50%, calc(-100% - 34px)) translateY(${a ? 0 : 16}px)`,
              }}
            >
              {a && (
                <div className="bg-ink text-beige shadow-[0_30px_60px_rgba(0,0,0,.35)]">
                  <RealImage imageKey={a.d.imageKey} className="w-full aspect-[4/3]" />
                  <div className="px-3 py-2 flex items-center justify-between font-mono text-[10px] tracking-[0.15em] uppercase">
                    <span className="text-gold">{a.d.bestSeason}</span>
                    <span>{a.d.packageCount} trips</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* region legend: aligned under each summit on desktop, a list on mobile */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 border-t border-black/15 mt-2">
          {POINTS.map((p, i) => (
            <li key={p.d.id} data-rise={0.02 * (i % 7)} className="border-b lg:border-b-0 border-black/10">
              <Link
                href={getDestinationUrl(p.d)}
                data-cursor="view"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group block h-full px-2 lg:px-3 py-5 lg:py-6 transition-colors duration-500 ${
                  active === i ? "bg-ink text-beige" : ""
                }`}
              >
                <div className="flex items-baseline gap-3 lg:block">
                  <span className={`font-mono text-[11px] tracking-[0.15em] ${active === i ? "text-gold" : "text-muted"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-3xl lg:text-[32px] font-light leading-none lg:mt-3">{p.d.shortName}</h3>
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.15em] uppercase opacity-70">
                  {p.alt > 0 ? `${p.alt.toLocaleString("en-IN")} m` : "Sea level"}
                </p>
                <p className="mt-1 font-serif italic text-sm opacity-70 line-clamp-1">
                  {p.d.altitudeOrClimate.split("•")[1]?.trim()}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="label-caps text-[10px]">From {formatINR(p.d.startingPrice)}</span>
                  <span className={`transition-transform duration-500 group-hover:translate-x-1 ${active === i ? "text-gold" : ""}`}>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}