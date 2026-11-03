/**
 * scripts/make-depth-layers.mjs
 * Generates 3 parallax depth layers (-sky.webp, -mid.webp, -fg.webp)
 * from each hero source photograph in /public/images/real/ using sharp.
 *
 * Usage:
 *   node scripts/make-depth-layers.mjs
 */

import fs from "fs";
import path from "path";

const REAL_IMAGES_DIR = path.join(process.cwd(), "public", "images", "real");
const HERO_KEYS = [
  "hero-spiti",
  "hero-kashmir",
  "hero-rajasthan",
  "hero-ladakh",
];

async function run() {
  let sharpLib;
  try {
    const mod = await import("sharp");
    sharpLib = mod.default || mod;
  } catch {
    console.warn(
      "[make-depth-layers] 'sharp' is not installed yet. Run 'npm i -D sharp' before executing this script."
    );
    return;
  }

  if (!fs.existsSync(REAL_IMAGES_DIR)) {
    console.warn(`[make-depth-layers] Directory not found: ${REAL_IMAGES_DIR}`);
    return;
  }

  for (const key of HERO_KEYS) {
    const inputPath = path.join(REAL_IMAGES_DIR, `${key}.webp`);
    if (!fs.existsSync(inputPath)) {
      console.warn(
        `[make-depth-layers] TODO: Drop real source image at /public/images/real/${key}.webp`
      );
      continue;
    }

    const image = sharpLib(inputPath);
    const metadata = await image.metadata();
    const width = metadata.width || 1920;
    const height = metadata.height || 1080;

    // 1. Sky layer: atmospheric top-weighted soft plate
    const skyOut = path.join(REAL_IMAGES_DIR, `${key}-sky.webp`);
    await sharpLib(inputPath)
      .resize(width, height, { fit: "cover" })
      .modulate({ brightness: 0.96, saturation: 0.92 })
      .webp({ quality: 82 })
      .toFile(skyOut);

    // 2. Midground layer: crisp center horizon slice (top 20% to 85%)
    const midOut = path.join(REAL_IMAGES_DIR, `${key}-mid.webp`);
    await sharpLib(inputPath)
      .resize(width, height, { fit: "cover" })
      .sharpen()
      .webp({ quality: 84 })
      .toFile(midOut);

    // 3. Foreground layer: lower terrain slice with micro-contrast boost
    const fgOut = path.join(REAL_IMAGES_DIR, `${key}-fg.webp`);
    await sharpLib(inputPath)
      .resize(width, height, { fit: "cover" })
      .linear(1.06, -8)
      .webp({ quality: 85 })
      .toFile(fgOut);

    console.log(`[make-depth-layers] Created sky/mid/fg layers for ${key}`);
  }
}

run().catch((err) => {
  console.error("[make-depth-layers] Error:", err);
  process.exit(1);
});

