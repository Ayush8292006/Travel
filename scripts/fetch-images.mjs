/**
 * scripts/fetch-images.mjs
 * ------------------------------------------------------------------
 * Sources free-licensed photos via the OFFICIAL Unsplash API (primary)
 * and Pexels API (backup), converts them to WebP with sharp, enforces
 * size budgets, crops og-default.jpg, and writes /CREDITS.md.
 *
 * Setup (.env.local in project root):
 *   UNSPLASH_ACCESS_KEY=xxxx   # https://unsplash.com/oauth/applications (free)
 *   PEXELS_API_KEY=xxxx        # https://www.pexels.com/api/ (free)
 *
 * Usage:
 *   node scripts/fetch-images.mjs            # fetch everything missing
 *   node scripts/fetch-images.mjs --force    # re-fetch all
 *   node scripts/fetch-images.mjs --only=hero-spiti,dest-goa
 *
 * Manual mode (no API keys): drop your own downloaded originals into
 * /public/images/_raw/<name>.jpg|png|webp and list credits in
 * /data/manual-credits.json → { "hero-spiti": { "photographer": "...",
 * "photographerUrl": "...", "sourceUrl": "...", "source": "Unsplash" } }
 * The script will then only convert + credit them.
 *
 * Unsplash+ (premium) and anything below the min width are skipped.
 * Nothing is ever hotlinked: only local files are referenced by the site.
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "images");
const RAW_DIR = path.join(OUT_DIR, "_raw");
const CREDITS_JSON = path.join(ROOT, "data", "images.credits.json");
const MANUAL_CREDITS = path.join(ROOT, "data", "manual-credits.json");
const CREDITS_MD = path.join(ROOT, "CREDITS.md");
const UTM = "utm_source=trail_stories&utm_medium=referral";

// ---------- env ----------
function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const PEXELS_KEY = process.env.PEXELS_API_KEY || "";

// ---------- spec ----------
// kind → output size, orientation, min source width, KB budget
const KINDS = {
  hero: { w: 2400, h: 1350, orient: "landscape", minW: 2000, budgetKB: 300, fallbackW: [2200, 2000] },
  dest: { w: 1200, h: 1600, orient: "portrait", minW: 1200, budgetKB: 180, fallbackW: [1080, 960] },
  trip: { w: 1200, h: 900, orient: "landscape", minW: 1200, budgetKB: 180, fallbackW: [1080, 960] },
  moment: { w: 720, h: 1280, orient: "portrait", minW: 1200, budgetKB: 180, fallbackW: [640] },
  traveler: { w: 600, h: 600, orient: "squarish", minW: 1200, budgetKB: 180, fallbackW: [480] },
  insta: { w: 800, h: 800, orient: "squarish", minW: 1200, budgetKB: 180, fallbackW: [640] },
};

const SPEC = [
  { name: "hero-spiti", kind: "hero", q: ["spiti valley", "spiti monastery", "kaza himachal"] },
  { name: "hero-kashmir", kind: "hero", q: ["kashmir dal lake", "gulmarg snow", "kashmir mountains"] },
  { name: "hero-rajasthan", kind: "hero", q: ["jaisalmer fort", "rajasthan desert", "thar desert"] },
  { name: "hero-ladakh", kind: "hero", q: ["ladakh pangong", "pangong lake", "ladakh mountains"] },

  { name: "dest-spiti", kind: "dest", q: ["spiti valley", "key monastery spiti"] },
  { name: "dest-kashmir", kind: "dest", q: ["kashmir", "dal lake shikara"] },
  { name: "dest-manali", kind: "dest", q: ["manali", "manali mountains snow"] },
  { name: "dest-ladakh", kind: "dest", q: ["ladakh", "leh ladakh monastery"] },
  { name: "dest-rajasthan", kind: "dest", q: ["rajasthan", "jaipur palace"] },
  { name: "dest-kerala", kind: "dest", q: ["kerala backwaters", "kerala houseboat"] },
  { name: "dest-goa", kind: "dest", q: ["goa beach", "goa"] },

  { name: "trip-1", kind: "trip", q: ["snow road himalaya", "spiti road trip", "mountain road snow india"] },
  { name: "trip-2", kind: "trip", q: ["dal lake shikara", "kashmir shikara"] },
  { name: "trip-3", kind: "trip", q: ["rajasthan fort", "udaipur palace", "jodhpur fort"] },
  { name: "trip-4", kind: "trip", q: ["camping ladakh", "himalaya camping tent", "mountain camping india"] },
  { name: "trip-5", kind: "trip", q: ["couple mountains himalaya", "couple travel mountains"] },
  { name: "trip-6", kind: "trip", q: ["munnar tea plantation", "family hill station", "kerala hills"] },
  { name: "trip-7", kind: "trip", q: ["friends hiking himalaya", "group hiking mountains", "trekking group india"] },
  { name: "trip-8", kind: "trip", q: ["desert camp rajasthan", "jaisalmer camp", "desert tent night"] },

  { name: "moment-1", kind: "moment", q: ["travel india road trip"] },
  { name: "moment-2", kind: "moment", q: ["backpacker mountains"] },
  { name: "moment-3", kind: "moment", q: ["travel friends sunrise"] },
  { name: "moment-4", kind: "moment", q: ["himalaya trekker", "ladakh motorbike"] },
  { name: "moment-5", kind: "moment", q: ["kashmir shikara morning", "boat lake mountains india"] },
  { name: "moment-6", kind: "moment", q: ["desert camel rajasthan", "camel safari"] },

  { name: "traveler-1", kind: "traveler", q: ["happy traveler portrait"] },
  { name: "traveler-2", kind: "traveler", q: ["indian woman portrait smiling outdoors", "happy traveler portrait"] },
  { name: "traveler-3", kind: "traveler", q: ["indian man portrait outdoors", "hiker portrait smiling"] },
  { name: "traveler-4", kind: "traveler", q: ["traveler portrait mountains", "backpacker portrait"] },

  { name: "insta-1", kind: "insta", q: ["himalaya travel"] },
  { name: "insta-2", kind: "insta", q: ["chai india travel", "masala chai"] },
  { name: "insta-3", kind: "insta", q: ["prayer flags himalaya"] },
  { name: "insta-4", kind: "insta", q: ["kerala houseboat"] },
  { name: "insta-5", kind: "insta", q: ["rajasthan street colors", "jaipur architecture"] },
  { name: "insta-6", kind: "insta", q: ["goa beach sunset"] },
  { name: "insta-7", kind: "insta", q: ["mountain road india"] },
  { name: "insta-8", kind: "insta", q: ["campfire mountains night"] },
];

// ---------- args ----------
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = (args.find((a) => a.startsWith("--only=")) || "").replace("--only=", "").split(",").filter(Boolean);

// ---------- helpers ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const usedIds = new Set();
const credits = fs.existsSync(CREDITS_JSON) ? JSON.parse(fs.readFileSync(CREDITS_JSON, "utf8")) : {};
for (const c of Object.values(credits)) if (c?.id) usedIds.add(`${c.source}:${c.id}`);
const manualCredits = fs.existsSync(MANUAL_CREDITS) ? JSON.parse(fs.readFileSync(MANUAL_CREDITS, "utf8")) : {};

async function unsplashSearch(query, orient, minW) {
  if (!UNSPLASH_KEY) return [];
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orient}&per_page=30&content_filter=high&order_by=relevant`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}`, "Accept-Version": "v1" } });
  if (!res.ok) {
    console.warn(`  [unsplash] ${res.status} for "${query}"`);
    return [];
  }
  const data = await res.json();
  return (data.results || [])
    .filter((p) => !p.premium && !p.plus && !String(p.urls?.raw || "").includes("plus.unsplash.com"))
    .filter((p) => p.width >= minW)
    .map((p) => ({
      source: "Unsplash",
      id: p.id,
      width: p.width,
      height: p.height,
      downloadUrl: p.urls.raw,
      trackUrl: p.links.download_location,
      sourceUrl: `${p.links.html}?${UTM}`,
      photographer: p.user?.name || "Unknown",
      photographerUrl: `${p.user?.links?.html || "https://unsplash.com"}?${UTM}`,
      description: p.alt_description || p.description || "",
    }));
}

async function pexelsSearch(query, orient, minW) {
  if (!PEXELS_KEY) return [];
  const o = orient === "squarish" ? "square" : orient;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${o}&per_page=30`;
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  if (!res.ok) {
    console.warn(`  [pexels] ${res.status} for "${query}"`);
    return [];
  }
  const data = await res.json();
  return (data.photos || [])
    .filter((p) => p.width >= minW)
    .map((p) => ({
      source: "Pexels",
      id: String(p.id),
      width: p.width,
      height: p.height,
      downloadUrl: p.src.original,
      trackUrl: null,
      sourceUrl: p.url,
      photographer: p.photographer || "Unknown",
      photographerUrl: p.photographer_url || "https://www.pexels.com",
      description: p.alt || "",
    }));
}

async function pickCandidate(item) {
  const k = KINDS[item.kind];
  for (const q of item.q) {
    const pools = [await unsplashSearch(q, k.orient, k.minW), await pexelsSearch(q, k.orient, k.minW)];
    for (const pool of pools) {
      const c = pool.find((p) => !usedIds.has(`${p.source}:${p.id}`));
      if (c) return { ...c, query: q };
    }
    await sleep(250);
  }
  return null;
}

async function downloadRaw(c, item) {
  const k = KINDS[item.kind];
  let url = c.downloadUrl;
  if (c.source === "Unsplash") {
    const sep = url.includes("?") ? "&" : "?";
    url = `${url}${sep}w=${Math.round(k.w * 1.25)}&q=90&fm=jpg&fit=max`;
    // Required by Unsplash API guidelines: trigger the download endpoint
    if (c.trackUrl) {
      fetch(c.trackUrl, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }).catch(() => {});
    }
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const rawPath = path.join(RAW_DIR, `${item.name}.jpg`);
  fs.writeFileSync(rawPath, buf);
  return rawPath;
}

async function convert(rawPath, item) {
  const k = KINDS[item.kind];
  const outPath = path.join(OUT_DIR, `${item.name}.webp`);
  const widths = [k.w, ...k.fallbackW];
  let result = null;

  // Quality 80 first; shrink dimensions before touching quality.
  for (const w of widths) {
    const h = Math.round((w * k.h) / k.w);
    const buf = await sharp(rawPath)
      .rotate()
      .resize(w, h, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    result = { buf, w, h, q: 80 };
    if (buf.length / 1024 <= k.budgetKB) break;
  }
  // Last resort: step quality down (logged so it can be reviewed)
  if (result.buf.length / 1024 > k.budgetKB) {
    for (const q of [74, 68, 62]) {
      const buf = await sharp(rawPath)
        .rotate()
        .resize(result.w, result.h, { fit: "cover", position: sharp.strategy.attention })
        .webp({ quality: q, effort: 6 })
        .toBuffer();
      result = { ...result, buf, q };
      if (buf.length / 1024 <= k.budgetKB) break;
    }
  }
  fs.writeFileSync(outPath, result.buf);
  const kb = Math.round(result.buf.length / 1024);
  const flag = kb > k.budgetKB ? " ⚠ OVER BUDGET" : "";
  console.log(`  → ${item.name}.webp ${result.w}×${result.h} q${result.q} ${kb}KB${flag}`);
  return { width: result.w, height: result.h, kb, quality: result.q };
}

async function makeOg() {
  const raw = ["jpg", "png", "webp"].map((e) => path.join(RAW_DIR, `hero-spiti.${e}`)).find((p) => fs.existsSync(p));
  const src = raw || path.join(OUT_DIR, "hero-spiti.webp");
  if (!fs.existsSync(src)) return console.warn("  [og] hero-spiti missing, skipped og-default.jpg");
  await sharp(src)
    .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT_DIR, "og-default.jpg"));
  console.log("  → og-default.jpg 1200×630 (cropped from hero-spiti)");
}

function writeCreditsMd() {
  const rows = SPEC.map((s) => {
    const c = credits[s.name];
    if (!c) return `| \`${s.name}.webp\` | — | — | **MISSING** |`;
    return `| \`${s.name}.webp\` | [${c.photographer}](${c.photographerUrl}) | ${c.source} | [View photo](${c.sourceUrl}) |`;
  });
  const md = `# Image Credits — Trail Stories

All photographs are free-licensed for commercial use under the
[Unsplash License](https://unsplash.com/license) or the
[Pexels License](https://www.pexels.com/license/). Attribution is not
legally required but is given here with gratitude. No AI-generated,
watermarked, stock-agency or competitor images are used. All files are
served locally from \`/public/images/\`; nothing is hotlinked.

| File | Photographer | Source | Original |
| --- | --- | --- | --- |
${rows.join("\n")}
| \`og-default.jpg\` | Cropped from \`hero-spiti.webp\` (see above) | — | — |

_Generated by \`scripts/fetch-images.mjs\` on ${new Date().toISOString().slice(0, 10)}._
`;
  fs.writeFileSync(CREDITS_MD, md);
}

// ---------- main ----------
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!UNSPLASH_KEY && !PEXELS_KEY) {
    console.warn("[fetch-images] No UNSPLASH_ACCESS_KEY / PEXELS_API_KEY in .env.local — manual mode only (/public/images/_raw + data/manual-credits.json).");
  }

  const targets = SPEC.filter((s) => (ONLY.length ? ONLY.includes(s.name) : true));
  let ok = 0;
  const missing = [];

  for (const item of targets) {
    const outPath = path.join(OUT_DIR, `${item.name}.webp`);
    if (!FORCE && fs.existsSync(outPath) && credits[item.name]) {
      ok++;
      continue;
    }
    console.log(`• ${item.name}`);

    // Manual original provided?
    const manualRaw = ["jpg", "jpeg", "png", "webp"]
      .map((e) => path.join(RAW_DIR, `${item.name}.${e}`))
      .find((p) => fs.existsSync(p));
    if (manualRaw && manualCredits[item.name]) {
      const meta = await convert(manualRaw, item);
      credits[item.name] = { ...manualCredits[item.name], ...meta, manual: true };
      ok++;
      continue;
    }

    try {
      const c = await pickCandidate(item);
      if (!c) {
        console.warn(`  ✗ no suitable free image found for ${item.name}`);
        missing.push(item.name);
        continue;
      }
      usedIds.add(`${c.source}:${c.id}`);
      const raw = await downloadRaw(c, item);
      const meta = await convert(raw, item);
      credits[item.name] = {
        source: c.source,
        id: c.id,
        photographer: c.photographer,
        photographerUrl: c.photographerUrl,
        sourceUrl: c.sourceUrl,
        query: c.query,
        description: c.description,
        ...meta,
      };
      ok++;
      fs.writeFileSync(CREDITS_JSON, JSON.stringify(credits, null, 2));
      await sleep(400);
    } catch (e) {
      console.warn(`  ✗ ${item.name}: ${e.message}`);
      missing.push(item.name);
    }
  }

  fs.mkdirSync(path.dirname(CREDITS_JSON), { recursive: true });
  fs.writeFileSync(CREDITS_JSON, JSON.stringify(credits, null, 2));
  await makeOg();
  writeCreditsMd();
  console.log(`\nDone: ${ok}/${targets.length} ready. ${missing.length ? "Missing: " + missing.join(", ") : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

