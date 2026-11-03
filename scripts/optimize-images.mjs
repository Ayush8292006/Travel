/**
 * scripts/optimize-images.mjs
 * Optimizes raw photographs (.jpg, .jpeg, .png, .webp) in /public/images/real/
 * into compressed WebP and AVIF assets matching /data/images.manifest.ts.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 */

import fs from "fs";
import path from "path";

const REAL_DIR = path.join(process.cwd(), "public", "images", "real");

async function optimizeAll() {
  let sharpLib;
  try {
    const mod = await import("sharp");
    sharpLib = mod.default || mod;
  } catch {
    console.warn(
      "[optimize-images] 'sharp' is not installed. Run 'npm i -D sharp' to optimize images."
    );
    return;
  }

  if (!fs.existsSync(REAL_DIR)) {
    console.warn(`[optimize-images] Directory does not exist: ${REAL_DIR}`);
    return;
  }

  const files = fs.readdirSync(REAL_DIR);
  const rawImages = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

  if (rawImages.length === 0) {
    console.log(
      "[optimize-images] No raw .jpg/.png files found in /public/images/real/. Place raw images there to convert to .webp and .avif."
    );
    return;
  }

  for (const file of rawImages) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const inputPath = path.join(REAL_DIR, file);
    const webpOut = path.join(REAL_DIR, `${base}.webp`);
    const avifOut = path.join(REAL_DIR, `${base}.avif`);

    const isHero = base.startsWith("hero-");
    const maxWidth = isHero ? 1920 : 1200;

    await sharpLib(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(webpOut);

    await sharpLib(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .avif({ quality: 68, effort: 5 })
      .toFile(avifOut);

    console.log(`[optimize-images] Generated ${base}.webp & ${base}.avif`);
  }
}

optimizeAll().catch((err) => {
  console.error("[optimize-images] Failed:", err);
  process.exit(1);
});

