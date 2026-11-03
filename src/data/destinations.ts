export interface Destination {
  id: string;
  name: string;
  shortName: string;
  regionSlug: string;
  regionLabel: string;
  destinationSlug: string;
  tagline: string;
  description: string;
  coordinates: string;
  altitudeOrClimate: string;
  bestSeason: string;
  startingPrice: number;
  packageCount: number;
  imageKey: string;
  vibes: ("Mountains" | "Heritage" | "Backwaters & Coast" | "High Altitude" | "Winter Snow")[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: "spiti",
    name: "Spiti Valley",
    shortName: "Spiti",
    regionSlug: "north-india",
    regionLabel: "North India • Himalayas",
    destinationSlug: "spiti-valley",
    tagline: "Where thousand-year-old mud monasteries guard the silence of the cold desert.",
    description:
      "Carved by glacial rivers between Tibet and Ladakh, Spiti is a high-altitude sanctuary of whitewashed gompas, fossil-rich valleys, and star-drenched skies.",
    coordinates: "32.2461° N, 78.0349° E",
    altitudeOrClimate: "4,270m • Trans-Himalayan Desert",
    bestSeason: "May – October",
    startingPrice: 34500,
    packageCount: 4,
    imageKey: "dest-spiti",
    vibes: ["Mountains", "High Altitude"],
  },
  {
    id: "kashmir",
    name: "Kashmir",
    shortName: "Kashmir",
    regionSlug: "north-india",
    regionLabel: "North India • Western Himalayas",
    destinationSlug: "kashmir",
    tagline: "Hand-carved walnut houseboats, saffron mist, and high alpine glacier meadows.",
    description:
      "Beyond the fabled waters of Nigeen and Dal lie quiet shepherd valleys, pine-scented trails in Pahalgam, and snow-draped ridges of Gulmarg.",
    coordinates: "34.0837° N, 74.7973° E",
    altitudeOrClimate: "1,850m – 3,900m • Alpine Valley",
    bestSeason: "April – October & Winter Snow",
    startingPrice: 29800,
    packageCount: 5,
    imageKey: "dest-kashmir",
    vibes: ["Mountains", "Winter Snow"],
  },
  {
    id: "manali",
    name: "Manali & Lahaul",
    shortName: "Manali",
    regionSlug: "north-india",
    regionLabel: "North India • Himachal",
    destinationSlug: "manali",
    tagline: "Ancient deodar groves, Kathkuni timber estates, and the gateway to Lahaul.",
    description:
      "Step away from the bustle into orchard estates, quiet stone hamlets above the Beas river, and the dramatic glacial waterfalls of Sissu and Jispa.",
    coordinates: "32.2432° N, 77.1892° E",
    altitudeOrClimate: "2,050m – 3,300m • Himalayan Cedar",
    bestSeason: "Year Round",
    startingPrice: 22500,
    packageCount: 4,
    imageKey: "dest-manali",
    vibes: ["Mountains", "Winter Snow"],
  },
  {
    id: "ladakh",
    name: "Ladakh",
    shortName: "Ladakh",
    regionSlug: "north-india",
    regionLabel: "North India • Trans-Himalaya",
    destinationSlug: "ladakh",
    tagline: "Monastic masked chants, silver sand dunes of Nubra, and the cobalt expanse of Pangong.",
    description:
      "A land of high passes where prayer flags flutter against ochre moonscapes, centuries-old stupas overlook the Indus, and hospitality is served with butter tea.",
    coordinates: "34.1526° N, 77.5771° E",
    altitudeOrClimate: "3,500m – 5,359m • High Passes",
    bestSeason: "May – September",
    startingPrice: 42000,
    packageCount: 5,
    imageKey: "dest-ladakh",
    vibes: ["Mountains", "High Altitude", "Heritage"],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    shortName: "Rajasthan",
    regionSlug: "west-india",
    regionLabel: "West India • Royal Desert",
    destinationSlug: "rajasthan",
    tagline: "Sandstone citadels, candlelit stepwells, and private tented camps in the Thar.",
    description:
      "Journey through the indigo lanes of Jodhpur, lakes of Udaipur, and golden dunes of Jaisalmer with private historians, folk musicians, and heritage havelis.",
    coordinates: "26.9157° N, 70.9083° E",
    altitudeOrClimate: "225m • Arid Desert & Aravalli Hills",
    bestSeason: "October – March",
    startingPrice: 36000,
    packageCount: 4,
    imageKey: "dest-rajasthan",
    vibes: ["Heritage"],
  },
  {
    id: "kerala",
    name: "Kerala",
    shortName: "Kerala",
    regionSlug: "south-india",
    regionLabel: "South India • Malabar & Ghats",
    destinationSlug: "kerala",
    tagline: "Misty cardamom hills of Munnar, private kettuvallam barges, and Malabar spice estates.",
    description:
      "Unwind along tranquil palm-lined lagoons, colonial merchant quarters of Fort Kochi, and high tea plantations shrouded in Western Ghats cloud.",
    coordinates: "9.9312° N, 76.2673° E",
    altitudeOrClimate: "Sea Level – 1,600m • Tropical & Cloud Forest",
    bestSeason: "September – March",
    startingPrice: 31500,
    packageCount: 4,
    imageKey: "dest-kerala",
    vibes: ["Backwaters & Coast", "Heritage"],
  },
  {
    id: "goa",
    name: "Goa",
    shortName: "Goa",
    regionSlug: "west-india",
    regionLabel: "West India • Konkan Coast",
    destinationSlug: "goa",
    tagline: "Indo-Portuguese manor houses, mangrove estuaries, and unhurried southern coves.",
    description:
      "Discover the quiet soul of Goa—architectural walks through Fontainhas, feni tastings in ancestral tropical estates, and secluded beaches of Canacona.",
    coordinates: "15.2993° N, 74.1240° E",
    altitudeOrClimate: "Konkan Coast • Tropical Maritime",
    bestSeason: "November – March",
    startingPrice: 24500,
    packageCount: 3,
    imageKey: "dest-goa",
    vibes: ["Backwaters & Coast", "Heritage"],
  },
];

export function getDestinationUrl(dest: Destination): string {
  return `/india-tour-packages/${dest.regionSlug}/${dest.destinationSlug}`;
}

