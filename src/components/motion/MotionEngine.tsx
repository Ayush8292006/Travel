"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * One scroll engine for the whole site (same idea as a film timeline):
 * every effect is scrubbed by scroll position, not fired by hover, so the
 * page reads as a camera moving through space rather than cards floating.
 *
 * Declarative hooks (add to any element):
 *   data-rise[="0.06"]   3D lift-in: tilts up from depth (rotateX + translateZ). Value = stagger in viewport fractions.
 *   data-wipe            clip-path wipe from the bottom; the first <img> inside de-zooms 1.25 → 1.
 *   data-scrub           words fade from 12% → 100% as the block crosses the viewport (children with class "w").
 *   data-mask            heading slides up out of a mask.
 *   data-parallax="0.12" vertical depth parallax.
 *   data-alt="4270"      section altitude for the fixed altimeter.
 *   data-arc             pinned horizontal track: [data-arc-track] with [data-arc-card] children bend round a 3D cylinder.
 *   data-frame           frame that opens from an inset rounded window to full bleed.
 *   data-wordmark        rises up as it enters.
 */

type Item = { el: HTMLElement; top: number; h: number; v: number };

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function css(el: HTMLElement & { _c?: Record<string, string> }, prop: string, val: string) {
  const c = el._c || (el._c = {});
  if (c[prop] !== val) {
    c[prop] = val;
    el.style.setProperty(prop, val);
  }
}

export default function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760;
    const root = document.documentElement;
    root.classList.add("motion-ready");
    if (reduce) root.classList.add("motion-reduce");

    let lenis: Lenis | null = null;
    let rafId = 0;
    if (!reduce && !lite) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      const loop = (t: number) => {
        lenis!.raf(t);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    let VH = window.innerHeight;
    let rises: Item[] = [];
    let wipes: Item[] = [];
    let scrubs: (Item & { w: HTMLElement[] })[] = [];
    let masks: Item[] = [];
    let pars: Item[] = [];
    let alts: Item[] = [];
    let frames: Item[] = [];
    let marks: Item[] = [];
    let tilts: Item[] = [];
    let draws: Item[] = [];
    let arcs: {
      el: HTMLElement;
      track: HTMLElement;
      cards: HTMLElement[];
      top: number;
      h: number;
      dist: number;
      pos: { x: number; w: number }[];
      left: number;
    }[] = [];

    const prog = document.getElementById("scroll-progress");
    const altNum = document.getElementById("alt-num");
    const altBox = document.getElementById("altimeter");
    let altShown = -1;
    let altTarget = 0;
    let altCurrent = 0;

    const absTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
    const grab = (sel: string, attr: string): Item[] =>
      Array.from(document.querySelectorAll<HTMLElement>(sel)).map((el) => ({
        el,
        top: 0,
        h: 0,
        v: parseFloat(el.getAttribute(attr) || "0") || 0,
      }));

    function measure() {
      VH = window.innerHeight;
      if (!reduce) {
        // pinned 3D arcs need their own scroll length before measuring tops below them
        arcs = Array.from(document.querySelectorAll<HTMLElement>("[data-arc]")).map((el) => {
          const track = el.querySelector<HTMLElement>("[data-arc-track]")!;
          const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-arc-card]"));
          track.style.transform = "translateX(0)";
          const dist = Math.max(0, track.scrollWidth - root.clientWidth);
          el.style.height = Math.round(VH + dist * 1.15) + "px";
          const left = track.getBoundingClientRect().left;
          return {
            el,
            track,
            cards,
            top: 0,
            h: 0,
            dist,
            left,
            pos: cards.map((c) => {
              const r = c.getBoundingClientRect();
              return { x: r.left - left, w: r.width };
            }),
          };
        });
      }
      rises = grab("[data-rise]", "data-rise");
      wipes = grab("[data-wipe]", "data-wipe");
      masks = grab("[data-mask]", "data-mask");
      pars = grab("[data-parallax]", "data-parallax");
      alts = grab("[data-alt]", "data-alt");
      frames = grab("[data-frame]", "data-frame");
      marks = grab("[data-wordmark]", "data-wordmark");
      tilts = grab("[data-tilt]", "data-tilt");
      draws = grab("[data-draw]", "data-draw");
      scrubs = grab("[data-scrub]", "data-scrub").map((s) => ({
        ...s,
        w: Array.from(s.el.querySelectorAll<HTMLElement>(".w")),
      }));
      // measure with transforms neutralised so tops are true layout positions
      [...rises, ...wipes, ...masks, ...pars, ...alts, ...frames, ...marks, ...scrubs, ...tilts, ...draws].forEach((it) => {
        const prev = it.el.style.transform;
        it.el.style.transform = "none";
        const r = it.el.getBoundingClientRect();
        it.top = r.top + window.scrollY;
        it.h = r.height;
        it.el.style.transform = prev;
      });
      arcs.forEach((a) => {
        a.top = absTop(a.el);
        a.h = a.el.offsetHeight;
      });
    }

    // fraction of the viewport an element's top has travelled: 0 at startFrac·VH, 1 at endFrac·VH
    const p01 = (top: number, y: number, s: number, e: number) => clamp((s * VH - (top - y)) / ((s - e) * VH));

    function frame() {
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - VH);
      if (prog) css(prog, "transform", `scaleX(${clamp(y / max).toFixed(4)})`);

      if (!reduce) {
        for (const it of rises) {
          const t = it.top - y;
          if (t > VH * 1.2 || t + it.h < -VH * 0.5) continue;
          const k = ease(p01(it.top, y, 1.02 + it.v, 0.68 + it.v));
          const i = 1 - k;
          css(
            it.el,
            "transform",
            k >= 1
              ? "none"
              : `perspective(1400px) translate3d(0, ${(i * 110).toFixed(1)}px, ${(-i * 220).toFixed(1)}px) rotateX(${(i * 16).toFixed(2)}deg)`
          );
          css(it.el, "opacity", (0.15 + 0.85 * k).toFixed(3));
        }
        for (const it of wipes) {
          const t = it.top - y;
          if (t > VH * 1.2 || t + it.h < -VH) continue;
          const k = ease(p01(it.top, y, 0.98 + it.v, 0.5 + it.v));
          css(it.el, "clip-path", `inset(${((1 - k) * 100).toFixed(2)}% 0 0 0)`);
          const img = it.el.querySelector("img") as HTMLElement | null;
          if (img) css(img, "transform", `scale(${(1.25 - 0.25 * k).toFixed(4)})`);
        }
        for (const it of masks) {
          const t = it.top - y;
          if (t > VH * 1.2 || t + it.h < -VH) continue;
          const k = ease(p01(it.top, y, 0.96, 0.7));
          css(it.el, "transform", `translateY(${((1 - k) * 60).toFixed(1)}%)`);
          css(it.el, "opacity", k.toFixed(3));
        }
        for (const s of scrubs) {
          const t = s.top - y;
          if (t + s.h < -50 || t > VH + 50) continue;
          const k = clamp((VH * 0.9 - t) / (VH * 0.45 + s.h));
          const n = s.w.length;
          for (let i = 0; i < n; i++) {
            const kk = clamp(k * n - i);
            css(s.w[i], "opacity", (0.12 + 0.88 * kk).toFixed(2));
          }
        }
        for (const it of pars) {
          const c = it.top + it.h / 2 - (y + VH / 2);
          if (Math.abs(c) > VH * 1.5) continue;
          css(it.el, "transform", `translate3d(0, ${(-c * it.v).toFixed(1)}px, 0)`);
        }
        for (const it of frames) {
          const t = it.top - y;
          if (t > VH || t < -it.h - VH) continue;
          const k = ease(p01(it.top, y, 0.9, 0.1));
          const i = 1 - k;
          css(
            it.el,
            "clip-path",
            `inset(${(7 * i).toFixed(2)}% ${(6 * i).toFixed(2)}% ${(7 * i).toFixed(2)}% ${(6 * i).toFixed(2)}% round ${(28 * i).toFixed(1)}px)`
          );
          const img = it.el.querySelector("img") as HTMLElement | null;
          if (img) css(img, "transform", `scale(${(1.3 - 0.3 * k).toFixed(4)})`);
        }
        for (const it of tilts) {
          // a flat relief map standing up as it arrives
          const t = it.top - y;
          if (t > VH * 1.2 || t + it.h < -VH) continue;
          const k = ease(p01(it.top, y, 1.0, 0.4));
          css(it.el, "transform", k >= 1 ? "none" : `rotateX(${(it.v * (1 - k)).toFixed(2)}deg) translateZ(${(-120 * (1 - k)).toFixed(1)}px)`);
        }
        for (const it of draws) {
          const t = it.top - y;
          if (t > VH * 1.2 || t + it.h < -VH) continue;
          const k = ease(p01(it.top, y, 0.95, 0.35));
          css(it.el, "stroke-dasharray", "1 1");
          css(it.el, "stroke-dashoffset", (1 - k).toFixed(4));
        }
        for (const it of marks) {
          const t = it.top - y;
          if (t > VH) continue;
          const k = clamp((VH - t) / Math.max(1, it.h * 1.4));
          css(it.el, "transform", `translateY(${(48 * (1 - k)).toFixed(1)}%)`);
        }
        for (const a of arcs) {
          const t = a.top - y;
          if (t + a.h < 0 || t > VH) continue;
          const hp = clamp(-t / Math.max(1, a.h - VH));
          const tx = -a.dist * hp;
          css(a.track, "transform", `translate3d(${tx.toFixed(1)}px,0,0)`);
          const cw = root.clientWidth;
          const cx = cw / 2;
          a.cards.forEach((c, i) => {
            const g = a.pos[i];
            if (!g) return;
            const d = (a.left + g.x + tx + g.w / 2 - cx) / cw; // signed, ~-1..1
            const ad = Math.min(1.2, Math.abs(d));
            css(
              c,
              "transform",
              `perspective(1600px) translateZ(${(-ad * 320).toFixed(1)}px) rotateY(${(-d * 42).toFixed(2)}deg)`
            );
            css(c, "opacity", (1 - 0.5 * clamp(ad)).toFixed(3));
          });
        }
      }

      // altimeter: altitude of the section under the middle of the screen
      if (alts.length && altNum) {
        let a = alts[0].v;
        for (const it of alts) if (it.top - y < VH * 0.5) a = it.v;
        altTarget = a;
        if (altBox) css(altBox, "opacity", y > VH * 0.25 ? "1" : "0");
      }
    }

    // altimeter counter rolls toward its target on its own clock
    let altRaf = 0;
    const altLoop = () => {
      if (altNum) {
        altCurrent += (altTarget - altCurrent) * 0.12;
        if (Math.abs(altTarget - altCurrent) < 0.5) altCurrent = altTarget;
        const v = Math.round(altCurrent);
        if (v !== altShown) {
          altShown = v;
          altNum.textContent = v <= 0 ? "SEA" : v.toLocaleString("en-IN");
          if (altBox) altBox.dataset.dir = altTarget > altCurrent ? "up" : "down";
        }
      }
      altRaf = requestAnimationFrame(altLoop);
    };
    altRaf = requestAnimationFrame(altLoop);

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        frame();
      });
    };

    let lastW = window.innerWidth;
    let rT: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(rT);
      rT = setTimeout(() => {
        // ignore mobile URL-bar height jitter
        if (lite && window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        measure();
        frame();
      }, 150);
    };

    // re-measure when content changes (filters, tabs, images loading)
    let mT: ReturnType<typeof setTimeout> | undefined;
    const remeasure = () => {
      clearTimeout(mT);
      mT = setTimeout(() => {
        measure();
        frame();
      }, 120);
    };
    const mo = new MutationObserver((muts) => {
      for (const m of muts) if (m.type === "childList" && (m.addedNodes.length || m.removedNodes.length)) return remeasure();
    });
    const main = document.getElementById("main-content");
    if (main) mo.observe(main, { childList: true, subtree: true });
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);

    measure();
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", remeasure);

    // anchor links glide with Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!a || !lenis) return;
      const href = a.getAttribute("href") || "";
      const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : "";
      if (!hash || (href.startsWith("/#") && window.location.pathname !== "/")) return;
      const id = hash.split("?")[0];
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -10, duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(altRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", remeasure);
      document.removeEventListener("click", onClick);
      mo.disconnect();
      ro.disconnect();
      lenis?.destroy();
    };
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      >
        <div id="scroll-progress" className="h-full w-full bg-gold origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      <div
        id="altimeter"
        aria-hidden="true"
        className="altimeter fixed z-[55] right-4 bottom-24 lg:right-8 lg:bottom-8 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span className="alt-label">Elev</span>
        <span id="alt-num" className="alt-num">4,270</span>
        <span className="alt-unit">m</span>
      </div>
    </>
  );
}