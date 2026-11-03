/**
 * Central image registry. Every image on the site resolves through here.
 * Files live in /public/images/ and are sourced by scripts/fetch-images.mjs
 * (Unsplash / Pexels, free commercial license). Credits: /CREDITS.md.
 * Nothing is hotlinked.
 */

export interface ImageAsset {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
}

export interface MomentAsset {
  key: string;
  imageKey: string;
  /** Optional 9:16 MP4 at /public/images/<key>.mp4 — image is used if absent */
  videoSrc?: string;
  title: string;
  location: string;
  traveler: string;
  rating: number;
  tripCount: string;
}

const hero = (key: string, alt: string): ImageAsset => ({
  key,
  src: `/images/${key}.webp`,
  width: 2400,
  height: 1350,
  alt,
  priority: true,
});
const dest = (key: string, alt: string): ImageAsset => ({ key, src: `/images/${key}.webp`, width: 1200, height: 1600, alt });
const trip = (key: string, alt: string): ImageAsset => ({ key, src: `/images/${key}.webp`, width: 1200, height: 900, alt });
const moment = (key: string, alt: string): ImageAsset => ({ key, src: `/images/${key}.webp`, width: 720, height: 1280, alt });
const square = (key: string, alt: string, size: number): ImageAsset => ({
  key,
  src: `/images/${key}.webp`,
  width: size,
  height: size,
  alt,
});

export const IMAGES: Record<string, ImageAsset> = {
  // HERO (16:9)
  "hero-spiti": hero("hero-spiti", "Barren mountain ridges and river valley in Spiti, Himachal Pradesh"),
  "hero-kashmir": hero("hero-kashmir", "Calm lake framed by snow-capped peaks in Kashmir"),
  "hero-rajasthan": hero("hero-rajasthan", "Golden sandstone fort and desert landscape in Rajasthan"),
  "hero-ladakh": hero("hero-ladakh", "Blue waters of Pangong Lake beneath mountains in Ladakh"),

  // DESTINATIONS (3:4)
  "dest-spiti": dest("dest-spiti", "High-altitude cold desert landscape of Spiti Valley"),
  "dest-kashmir": dest("dest-kashmir", "Lake and mountain scenery in the Kashmir valley"),
  "dest-manali": dest("dest-manali", "Pine forests and snowy peaks around Manali"),
  "dest-ladakh": dest("dest-ladakh", "Monastery and rugged mountains in Ladakh"),
  "dest-rajasthan": dest("dest-rajasthan", "Ornate palace architecture in Rajasthan"),
  "dest-kerala": dest("dest-kerala", "Palm-lined backwaters of Kerala"),
  "dest-goa": dest("dest-goa", "Quiet beach and coastline in Goa"),

  // TRIPS (4:3)
  "trip-1": trip("trip-1", "Mountain road winding through snow in the Himalayas"),
  "trip-2": trip("trip-2", "Wooden shikara boat gliding on a Kashmir lake"),
  "trip-3": trip("trip-3", "Historic fort and palace walls in Rajasthan"),
  "trip-4": trip("trip-4", "Tents pitched at a high-altitude mountain campsite"),
  "trip-5": trip("trip-5", "Couple looking out over Himalayan mountains"),
  "trip-6": trip("trip-6", "Green hill-station tea slopes in South India"),
  "trip-7": trip("trip-7", "Group of friends hiking a mountain trail"),
  "trip-8": trip("trip-8", "Desert camp tents among sand dunes at dusk"),

  // MOMENTS (9:16)
  "moment-1": moment("moment-1", "Road trip through Indian mountain landscape"),
  "moment-2": moment("moment-2", "Backpacker standing before mountain ranges"),
  "moment-3": moment("moment-3", "Friends watching sunrise together on a trip"),
  "moment-4": moment("moment-4", "Trekker on a high Himalayan trail"),
  "moment-5": moment("moment-5", "Boat on a still mountain lake at morning"),
  "moment-6": moment("moment-6", "Camel caravan crossing desert dunes"),

  // TESTIMONIAL PEOPLE (1:1)
  "traveler-1": square("traveler-1", "Portrait of Trail Stories traveler Arundhati", 600),
  "traveler-2": square("traveler-2", "Portrait of Trail Stories travelers Kabir and Rhea", 600),
  "traveler-3": square("traveler-3", "Portrait of Trail Stories traveler Devansh", 600),
  "traveler-4": square("traveler-4", "Portrait of Trail Stories traveler Meera", 600),

  // INSTAGRAM STRIP (1:1)
  "insta-1": square("insta-1", "Himalayan travel scene", 800),
  "insta-2": square("insta-2", "Cup of chai on a journey through India", 800),
  "insta-3": square("insta-3", "Prayer flags against a mountain sky", 800),
  "insta-4": square("insta-4", "Houseboat on Kerala backwaters", 800),
  "insta-5": square("insta-5", "Colourful street and architecture in Rajasthan", 800),
  "insta-6": square("insta-6", "Sunset over a Goa beach", 800),
  "insta-7": square("insta-7", "Open mountain road in India", 800),
  "insta-8": square("insta-8", "Campfire beneath mountains at night", 800),
};

export const OG_IMAGE = { src: "/images/og-default.jpg", width: 1200, height: 630, alt: "Trail Stories — Curated India Journeys" };

export const MOMENTS: MomentAsset[] = [
  { key: "moment-1", imageKey: "moment-1", title: "Open Roads, No Rush", location: "Spiti Valley • 4,270m", traveler: "Arundhati D.", rating: 4.9, tripCount: "420+ trips" },
  { key: "moment-2", imageKey: "moment-2", title: "Above the Tree Line", location: "Lahaul • Himachal", traveler: "Rohan K.", rating: 4.9, tripCount: "310+ trips" },
  { key: "moment-3", imageKey: "moment-3", title: "First Light, Together", location: "Ladakh • Nubra", traveler: "Devansh S.", rating: 5.0, tripCount: "380+ trips" },
  { key: "moment-4", imageKey: "moment-4", title: "The Long Climb", location: "Hampta Pass • 4,270m", traveler: "Ishaan M.", rating: 4.8, tripCount: "190+ trips" },
  { key: "moment-5", imageKey: "moment-5", title: "Morning on the Lake", location: "Srinagar • Kashmir", traveler: "Kabir & Rhea", rating: 5.0, tripCount: "610+ trips" },
  { key: "moment-6", imageKey: "moment-6", title: "Dunes at Dusk", location: "Jaisalmer • Rajasthan", traveler: "Meera N.", rating: 4.9, tripCount: "290+ trips" },
];

export const INSTA_KEYS = ["insta-1", "insta-2", "insta-3", "insta-4", "insta-5", "insta-6", "insta-7", "insta-8"];

export function getImage(key: string): ImageAsset {
  const asset = IMAGES[key];
  if (asset) return asset;
  if (typeof window !== "undefined") {
    console.warn(`[Trail Stories TODO] Image key "${key}" is not registered in data/images.ts`);
  }
  return { key, src: `/images/${key}.webp`, width: 1200, height: 900, alt: "Trail Stories travel photograph" };
}

// Back-compat aliases
export const getManifestImage = getImage;
export const IMAGES_MANIFEST = IMAGES;

