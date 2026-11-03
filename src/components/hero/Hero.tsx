"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SplitWords from "@/components/motion/SplitWords";
import type { TerrainScene } from "./terrainScene";

export interface HeroChapter {
  indexLabel: string;
  name: string;
  regionTag: string;
  poeticLine: string;
  emphasisWord: string;
  coordinates: string;
  altitude: string;
  imageKey: string;
  href: string;
}

export const HERO_CHAPTERS: HeroChapter[] = [
  {
    indexLabel: "01",
    name: "Spiti Valley",
    regionTag: "Trans-Himalayan Cold Desert • Himachal",
    poeticLine: "Where the road dissolves into monastic",
    emphasisWord: "silence.",
    coordinates: "32.2461° N, 78.0349° E",
    altitude: "4,270 M",
    imageKey: "hero-spiti",
    href: "/india-tour-packages/north-india/spiti-valley",
  },
  {
    indexLabel: "02",
    name: "Kashmir Valley",
    regionTag: "Nigeen Lake & Lidder Valley • Western Himalaya",
    poeticLine: "Heirloom walnut houseboats & alpine",
    emphasisWord: "meadows.",
    coordinates: "34.0837° N, 74.7973° E",
    altitude: "2,650 M",
    imageKey: "hero-kashmir",
    href: "/india-tour-packages/north-india/kashmir",
  },
  {
    indexLabel: "03",
    name: "The Great Thar",
    regionTag: "Marwar & Jaisalmer • Desert Citadel",
    poeticLine: "Sandstone fortresses & candlelit dune",
    emphasisWord: "wilderness.",
    coordinates: "26.9157° N, 70.9083° E",
    altitude: "225 M",
    imageKey: "hero-rajasthan",
    href: "/india-tour-packages/west-india/rajasthan",
  },
  {
    indexLabel: "04",
    name: "Ladakh Highlands",
    regionTag: "Pangong Tso & Nubra Valley • High Passes",
    poeticLine: "Azure waters mirrored under high-altitude",
    emphasisWord: "skies.",
    coordinates: "34.1526° N, 77.5771° E",
    altitude: "4,350 M",
    imageKey: "hero-ladakh",
    href: "/india-tour-packages/north-india/ladakh",
  },
];

// rough real-world layout on the relief map (north = away from camera)
const WAYPOINTS = [
  { x: 8, z: -1 }, // Spiti
  { x: -11, z: -9 }, // Kashmir
  { x: -14, z: 11 }, // Thar
  { x: 3, z: -13 }, // Ladakh
];

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const whatsappUrl =
  "https://wa.me/919876543210?text=" +
  encodeURIComponent("Hello Trail Stories! I would like to enquire about your curated India journeys.");

export default function Hero() {
  const pinRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLParagraphElement>(null);
  const t2 = useRef<HTMLParagraphElement>(null);
  const t3 = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const chapter = HERO_CHAPTERS[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lite = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760;

    const pin = pinRef.current!;
    const stage = stageRef.current!;
    const photo = photoRef.current!;
    const canvas = canvasRef.current!;
    const lines = [t1.current!, t2.current!, t3.current!];
    const words = lines.map((l) => Array.from(l.querySelectorAll<HTMLElement>(".w")));
    const pinEls = Array.from(pinsRef.current!.children) as HTMLElement[];

    let scene: TerrainScene | null = null;
    let alive = true;
    let raf = 0;
    let ps = 0; // smoothed progress for the camera
    let VH = window.innerHeight;
    const start = performance.now();
    const cache = new WeakMap<HTMLElement, Record<string, string>>();
    const set = (el: HTMLElement, prop: string, val: string) => {
      let c = cache.get(el);
      if (!c) cache.set(el, (c = {}));
      if (c[prop] !== val) {
        c[prop] = val;
        el.style.setProperty(prop, val);
      }
    };

    const revealWords = (list: HTMLElement[], p: number, a: number, b: number) => {
      const n = list.length;
      for (let i = 0; i < n; i++) {
        const s = a + (b - a - 0.04) * (i / Math.max(1, n - 1));
        const k = Math.round(seg(p, s, s + 0.045) * 60) / 60;
        set(list[i], "opacity", String(k));
        set(list[i], "transform", `translate3d(0, ${(26 * (1 - k)).toFixed(1)}px, 0)`);
        if (!lite) set(list[i], "filter", k < 1 ? `blur(${(10 * (1 - k)).toFixed(1)}px)` : "none");
      }
    };

    const size = () => {
      VH = window.innerHeight;
      const r = stage.getBoundingClientRect();
      scene?.resize(r.width, r.height);
    };

    Promise.all([import("three"), import("./terrainScene")])
      .then(([THREE, mod]) => {
        if (!alive) return;
        try {
          scene = mod.createTerrainScene(THREE, canvas, WAYPOINTS, lite);
          size();
        } catch {
          scene = null; // no WebGL: the photo simply stays
        }
      })
      .catch(() => undefined);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const r = pin.getBoundingClientRect();
      if (r.bottom < 0 || r.top > VH) return;

      const span = pin.offsetHeight - 2 * VH;
      const p = clamp(-r.top / span);
      const cover = clamp((-r.top - span) / VH);
      ps += (p - ps) * (lite ? 0.25 : 0.09);
      const time = (now - start) / 1000;
      const gl = !!scene;

      // stage recedes as the next chapter lifts over it
      set(stage, "transform", cover > 0 ? `scale(${(1 - 0.08 * cover).toFixed(4)})` : "none");
      set(stage, "border-radius", cover > 0 ? `${(cover * 28).toFixed(1)}px` : "0px");
      set(dimRef.current!, "opacity", (0.6 * cover).toFixed(3));

      // 1 — dolly into the photograph
      const b = seg(p, 0, 0.07);
      set(baseRef.current!, "opacity", String(1 - b));
      set(baseRef.current!, "transform", `translate3d(0, ${(-50 * b).toFixed(1)}px, 0)`);
      set(baseRef.current!, "pointer-events", b > 0.5 ? "none" : "auto");
      set(hintRef.current!, "opacity", String(1 - b));
      set(photo, "transform", `scale(${(1 + 0.6 * easeIO(seg(p, 0, 0.42))).toFixed(4)})`);
      set(photo, "opacity", gl ? String(1 - seg(p, 0.32, 0.44)) : "1");
      revealWords(words[0], p, 0.06, 0.28);
      const o1 = seg(p, 0.3, 0.36);
      set(lines[0], "opacity", String(1 - o1));
      set(lines[0], "transform", `translate3d(0, ${(-70 * o1).toFixed(1)}px, 0)`);

      // 2 — the photo resolves into a live 3D survey of the range, camera dives into the valley
      const canvasO = seg(p, 0.3, 0.42) * (1 - seg(p, 0.985, 1));
      set(canvas, "opacity", canvasO.toFixed(3));
      revealWords(words[1], p, 0.44, 0.6);
      const o2 = seg(p, 0.62, 0.68);
      set(lines[1], "opacity", String(1 - o2));
      set(lines[1], "transform", `translate3d(0, ${(-70 * o2).toFixed(1)}px, 0)`);

      // 3 — pull up to the whole map; the four chapters are pinned on it
      const overview = easeIO(seg(ps, 0.64, 0.84));
      revealWords(words[2], p, 0.76, 0.9);
      const pinsO = seg(p, 0.8, 0.9);
      set(metaRef.current!, "opacity", seg(p, 0.34, 0.44).toFixed(3));
      set(shadeRef.current!, "opacity", (0.85 * seg(p, 0.74, 0.86)).toFixed(3));

      if (scene && canvasO > 0) {
        scene.render({
          flight: easeIO(seg(ps, 0.32, 0.7)),
          overview,
          reveal: easeIO(seg(ps, 0.3, 0.5)),
          time,
        });
        pinEls.forEach((el, i) => {
          const q = scene!.project(i);
          set(el, "transform", `translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0)`);
          const o = q.visible ? seg(pinsO, i * 0.12, i * 0.12 + 0.64) : 0;
          set(el, "opacity", o.toFixed(3));
          set(el, "pointer-events", o > 0.6 ? "auto" : "none");
        });
      }
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", size);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      scene?.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={pinRef}
      aria-label="Trail Stories — a scroll journey from Spiti into the Himalayan range"
      data-alt="4270"
      className="hero-pin relative bg-ink"
    >
      <div ref={stageRef} className="hero-stage sticky top-0 h-[100svh] w-full overflow-hidden bg-ink text-white origin-top">
        {/* Layer 1: the photograph */}
        <div ref={photoRef} className="absolute inset-0 will-change-transform origin-[50%_56%]">
          <img
            src="/images/hero-spiti.webp"
            alt="Barren mountain ridges and river valley in Spiti, Himachal Pradesh"
            width={2400}
            height={1350}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>

        {/* Layer 2: live WebGL relief */}
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ opacity: 0 }} />

        {/* survey readout */}
        <div
          ref={metaRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-24 px-4 sm:px-8 lg:px-12 flex items-start justify-between text-gold/80 font-mono text-[10px] tracking-[0.2em] uppercase pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span>Survey · Western Himalaya</span>
          <span className="hidden sm:block">1 : 250 000 · Contour 50 m</span>
        </div>

        {/* legibility shade for the map chapter */}
        <div ref={shadeRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/60 to-transparent pointer-events-none" style={{ opacity: 0 }} />

        {/* waypoint pins projected from 3D */}
        <div ref={pinsRef} className="absolute inset-0 pointer-events-none">
          {HERO_CHAPTERS.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="hero-pin-label absolute left-0 top-0 group"
              style={{ opacity: 0 }}
              tabIndex={-1}
            >
              <span className="block -translate-x-1/2 -translate-y-full pb-2 text-center whitespace-nowrap">
                <span className="block font-mono text-[10px] tracking-[0.2em] text-gold">{c.indexLabel} · {c.altitude}</span>
                <span className="block font-serif text-xl sm:text-2xl text-white group-hover:text-gold transition-colors">
                  {c.name}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Scroll-told lines */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
          <p ref={t1} className="hero-line absolute max-w-4xl text-center font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
            <SplitWords text={`${chapter.poeticLine} *${chapter.emphasisWord}*`} emClassName="italic text-gold" />
          </p>
          <p ref={t2} className="hero-line absolute max-w-4xl text-center font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
            <SplitWords text="Every ridge we send you up, *we walked first.*" emClassName="italic text-gold" />
          </p>
          <div ref={t3} className="hero-line absolute bottom-[12vh] sm:bottom-[10vh] inset-x-0 text-center">
            <p className="font-serif font-light text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
              <SplitWords text="Four chapters. *One unhurried story.*" emClassName="italic text-gold" />
            </p>
          </div>
        </div>

        {/* Opening frame */}
        <div ref={baseRef} className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-12 pb-16 sm:pb-20 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gold">
                <span>Chapter {chapter.indexLabel} / 0{HERO_CHAPTERS.length}</span>
                <span className="w-8 h-px bg-gold/60" />
                <span className="text-beige/80">{chapter.regionTag}</span>
              </div>
              <h1 className="font-serif font-light text-white leading-[0.88] tracking-[-0.02em] text-[clamp(64px,13vw,190px)]">
                {chapter.name.split(" ")[0]} <em className="italic text-gold">{chapter.name.split(" ")[1]}</em>
              </h1>
              <p className="max-w-md text-sm sm:text-base text-beige/80 leading-relaxed">
                Curated private &amp; small-group expeditions across India — hosted slowly, recce-tested, and capped at twelve guests.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3">
              <Link
                href="#curated-trips"
                className="btn-solid min-h-[52px] px-8 inline-flex items-center justify-center label-caps"
              >
                Explore Curated Trips
              </Link>
              <Link
                href="#enquiry"
                className="btn-line min-h-[52px] px-8 inline-flex items-center justify-center label-caps"
              >
                Plan My Journey
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center lg:justify-end gap-2 label-caps text-[11px] text-beige/80 hover:text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                WhatsApp Concierge ↗
              </a>
            </div>
          </div>
          <div className="absolute top-28 right-4 sm:right-8 lg:right-12 text-right font-mono text-[10px] tracking-[0.2em] text-beige/70 uppercase hidden sm:block">
            <div>{chapter.coordinates}</div>
            <div className="text-gold">Elev {chapter.altitude}</div>
          </div>
        </div>

        <div
          ref={hintRef}
          aria-hidden="true"
          className="hero-hint absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-beige/70 font-mono text-[10px] tracking-[0.25em] uppercase pointer-events-none"
        >
          <span>Scroll to explore</span>
          <span className="hint-line" />
        </div>

        <div ref={dimRef} aria-hidden="true" className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: 0 }} />
      </div>
    </section>
  );
}
