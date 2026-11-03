# Trail Stories (`@trailstories.in`) — Quiet Luxury & Curated India Expeditions

A luxury editorial website built across 6 structured phases for **Trail Stories** (`@trailstories.in`) — blending Aman-inspired quiet luxury with National Geographic field depth.

---

## 1. Strict Design Tokens
- **Palette**:
  - `white`: `#FFFFFF`
  - `beige`: `#EFE7DA`
  - `deep-beige`: `#D9CBB5`
  - `black`: `#0E0E0E`
  - `muted`: `#5B554C`
  - Film grain: `3%` (`opacity: 0.03`) on beige and black sections.
- **Typography**:
  - Headings & Numbers: **Cormorant Garamond** (`300` / `500` + `italic` for emphasis words), Hero scale `clamp(56px, 12vw, 160px)`.
  - Body & UI: **Manrope** (`400` / `500` / `600`), small-caps labels `11–12px`, tracking `0.2em`.

---

## 2. Real Images & Videos Workflow (`/public/images/real/`)
- Never uses AI-generated, scraped, or competitor images.
- All media is referenced through [`src/data/images.manifest.ts`](file:///d:/Techora/Travel/src/data/images.manifest.ts).
- If a file is not yet present in `/public/images/real/`, [`RealImage.tsx`](file:///d:/Techora/Travel/src/components/ui/RealImage.tsx) and [`MomentsStrip.tsx`](file:///d:/Techora/Travel/src/components/trust/MomentsStrip.tsx) render an architectural beige skeleton (`#EFE7DA`) and log a `console.warn` TODO in DevTools.
- Drop the following files into `/public/images/real/`:
  - **Hero (1920×1080)**: `hero-spiti.webp`, `hero-kashmir.webp`, `hero-rajasthan.webp`, `hero-ladakh.webp`
  - **Destinations (1200×1500)**: `dest-spiti.webp`, `dest-kashmir.webp`, `dest-manali.webp`, `dest-ladakh.webp`, `dest-rajasthan.webp`, `dest-kerala.webp`, `dest-goa.webp`
  - **Trips (1200×800)**:
    - `trip-spiti-circuit-expedition.webp`
    - `trip-kashmir-alpine-sanctuary.webp`
    - `trip-manali-lahaul-highlands.webp`
    - `trip-ladakh-monasteries-moonland.webp`
    - `trip-rajasthan-desert-palaces.webp`
    - `trip-kerala-backwaters-spice-hills.webp`
    - `trip-goa-heritage-slow-coast.webp`
  - **Moments (720×1280 9:16 MP4)**: `moment-1.mp4`, `moment-2.mp4`, `moment-3.mp4`, `moment-4.mp4`
  - **Testimonials (240×240)**: `traveler-1.webp`, `traveler-2.webp`, `traveler-3.webp`

### Image Utility Scripts
```bash
# Convert raw .jpg/.png photos in /public/images/real/ to optimized .webp and .avif
node scripts/optimize-images.mjs

# Generate -sky.webp, -mid.webp, and -fg.webp depth layers for the 4 hero photos
node scripts/make-depth-layers.mjs
```

---

## 3. Running Locally
```bash
npm run dev
```
Open `http://localhost:3000`.

---

## 4. Phase-by-Phase Pre-Launch Checklist

### SEO
- [x] Single `<h1>` per page (`Spiti` on Home Hero, `{trip.title}` on `/packages/[slug]`, `{dest.name} Curations` on `/india-tour-packages/[region]/[destination]`).
- [x] All 4 hero headlines, all 7 package cards, all testimonials, and all FAQ answers exist in server-rendered HTML.
- [x] Dynamic `generateMetadata` with canonical URLs and OpenGraph/Twitter cards on every route.
- [x] Reusable JSON-LD schemas (`TravelAgency`, `TouristTrip`, `AggregateRating`, `FAQPage`, `BreadcrumbList`).
- [x] Dynamic `/sitemap.xml` and `/robots.txt`.

### Performance
- [x] Hero `<h1>` and primary slide preloaded; below-the-fold images use `loading="lazy"` and explicit `width`/`height` (`CLS < 0.1`).
- [x] Animations restricted strictly to `opacity` and `transform` (`scale`, `translate3d`, `yPercent`).
- [x] Three.js `HeroParticles` dynamically imported (`ssr: false`) and disabled on viewports `< 1024px`.

### Accessibility & Reduced Motion
- [x] `Skip to main content` link at the top of `layout.tsx`.
- [x] `useReducedMotion` hook disables Lenis smooth scroll, unpins the 350vh Hero and horizontal Journey, and renders clean static layouts when `prefers-reduced-motion: reduce` is enabled.
- [x] High-contrast `:focus-visible` outlines on both `#EFE7DA` and `#0E0E0E` surfaces.

### Mobile
- [x] Sticky Mobile Bottom Bar (`Trips | WhatsApp | Call`) with `>= 44px` tap targets.
- [x] Horizontal Journey switches automatically to native touch swipe (`snap-x snap-mandatory`) on `< 1024px`.
- [x] Never traps vertical scroll.


---

## 3D Scroll System (v2 restyle)

The whole homepage is now driven by scroll like a film timeline. Nothing floats on hover; depth comes from the camera moving.

- **Hero** (`src/components/hero/Hero.tsx` + `terrainScene.ts`): pinned for ~5.6 screens. The Spiti photo dollies in, dissolves into a live three.js relief of the Himalaya (real 3D mountains, snow caps, 50 m contour survey lines that draw outward), the camera dives into the river valley, then pulls up to a map with the four chapters pinned on it. The next section then slides up over the hero while it recedes.
- **Motion engine** (`src/components/motion/MotionEngine.tsx`): Lenis smooth scroll (desktop only), top progress bar, and a fixed altimeter that descends from 4,270 m to sea level as you scroll. Effects are declared with data attributes:
  - `data-rise` 3D lift-in (rotateX + depth), `data-wipe` image wipe with de-zoom, `data-mask` heading reveal, `data-scrub` word-by-word text, `data-frame` window-to-full-bleed, `data-wordmark` footer rise, `data-alt` altimeter value.
  - `data-arc` + `data-arc-track` + `data-arc-card`: pinned horizontal gallery where plates bend round a 3D cylinder (used by Visual Atlas).
- `prefers-reduced-motion` turns all of it off and shows a static page; phones get lighter geometry and native scrolling.
- `Tilt3D` (hover tilt + glare cards) was removed on purpose.
