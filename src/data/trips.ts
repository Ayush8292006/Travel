export type TripFilterTag =
  | "Popular"
  | "Under 5 Days"
  | "5-8 Days"
  | "Couples"
  | "Family"
  | "Groups";

export interface RouteStop {
  days: number;
  place: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  elevationOrNote: string;
  description: string;
}

export interface TripPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  regionSlug: string;
  destinationSlug: string;
  destinationName: string;
  badgeTag: string; // e.g., "Group Tour", "Private Couple", "Family Curation"
  days: number;
  nights: number;
  routeStops: RouteStop[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  filterTags: TripFilterTag[];
  imageKey: string;
  nextDeparture: string;
  groupSize: string;
  maxAltitude: string;
  startingPoint: string;
  endingPoint: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export const TRIPS: TripPackage[] = [
  {
    id: "trip-1",
    slug: "spiti-circuit-expedition",
    title: "Spiti Circuit: Monasteries & High Villages",
    subtitle: "Traverse the complete Shimla-Kinnaur-Kaza-Chandratal high-altitude loop.",
    regionSlug: "north-india",
    destinationSlug: "spiti-valley",
    destinationName: "Spiti Valley",
    badgeTag: "Group Tour",
    days: 8,
    nights: 7,
    routeStops: [
      { days: 2, place: "Kinnaur" },
      { days: 3, place: "Kaza & Langza" },
      { days: 1, place: "Chandratal" },
      { days: 1, place: "Manali" },
    ],
    price: 34500,
    originalPrice: 41000,
    rating: 4.9,
    reviewCount: 184,
    filterTags: ["Popular", "5-8 Days", "Groups"],
    imageKey: "trip-1",
    nextDeparture: "14 June & 28 June",
    groupSize: "10 – 12 Guests",
    maxAltitude: "4,590m (Kunzum La)",
    startingPoint: "Chandigarh / Shimla",
    endingPoint: "Manali",
    overview:
      "Designed with progressive altitude acclimatization, this 8-day expedition ascends gradually through the lush Sutlej gorges of Kinnaur into the stark, monumental silence of Spiti Valley. Stay in solar-passive mud-brick homestays, share butter tea with resident monks at Key Gompa, and camp beneath the Milky Way near Chandratal.",
    highlights: [
      "Private morning prayer attendance at 1,000-year-old Key Monastery",
      "Postcards dispatched from Hikkim, the world's highest post office (4,400m)",
      "Fossil walk across the Tethys seabed ridges of Langza village",
      "Alpine glamping near the turquoise crescent of Chandratal Lake",
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla to Sangla Valley via Narkanda",
        elevationOrNote: "2,680m • 7 hrs drive",
        description:
          "Ascend along the old Hindustan-Tibet highway into the Baspa river valley, settling into a heritage timber estate surrounded by apple orchards.",
      },
      {
        day: 2,
        title: "Chitkul Last Village & Kalpa Sunset",
        elevationOrNote: "2,960m • Acclimatization",
        description:
          "Walk beside the turquoise Baspa river at India's last border hamlet before watching twilight turn the Kinner Kailash massif gold.",
      },
      {
        day: 3,
        title: "Confluence at Khab, Nako Lake & Tabo Gompa",
        elevationOrNote: "3,280m • Enter Spiti",
        description:
          "Witness the merging of Spiti and Sutlej rivers, pause at willow-ringed Nako lake, and sleep near the 996 AD mud-walled Tabo Monastery.",
      },
      {
        day: 4,
        title: "Dhankar Cliff Fort & Pin Valley National Park",
        elevationOrNote: "3,890m • Pin River",
        description:
          "Hike to the dramatic cliffside monastery of Dhankar before turning into the emerald pastures of Mud village in Pin Valley.",
      },
      {
        day: 5,
        title: "Key Monastery & High Villages of Langza, Hikkim, Komic",
        elevationOrNote: "4,587m • High Plateau",
        description:
          "Explore Spiti's crown jewel monastery followed by unhurried afternoon walks through the fossil hamlets and highest post office.",
      },
      {
        day: 6,
        title: "Kaza to Chandratal via Chicham Bridge & Kunzum La",
        elevationOrNote: "4,300m • High Pass",
        description:
          "Cross Asia's highest suspension bridge and pay respects at Kunzum Mata temple before reaching the crescent moon lake of Chandratal.",
      },
      {
        day: 7,
        title: "Chandratal to Manali via Atal Tunnel",
        elevationOrNote: "2,050m • Lahaul Traverse",
        description:
          "Navigate the raw glacial streams of Batal and Chacha-Chachi dhaba, emerging into the lush greenery of Kullu valley.",
      },
      {
        day: 8,
        title: "Morning Cedar Walk & Departure from Manali",
        elevationOrNote: "Departure Day",
        description:
          "Enjoy a slow breakfast overlooking the Beas river before onward connections.",
      },
    ],
    inclusions: [
      "Expedition-grade SUV / Tempo Traveller with experienced mountain captain",
      "7 nights curated boutique stays, heritage homestays & alpine lake camps",
      "Daily local breakfast and slow-cooked mountain dinners",
      "Dedicated Trail Stories expedition host, medical oxygen & pulse oximeter",
      "All inner-line permits, wildlife fees, and monastery conservation tokens",
    ],
    exclusions: [
      "Airfare or train tickets to Chandigarh/Shimla and from Manali",
      "Lunches at local cafes and personal beverages",
      "5% GST and personal travel insurance",
    ],
  },
  {
    id: "trip-2",
    slug: "kashmir-alpine-sanctuary",
    title: "Kashmir Alpine Sanctuary & Heritage Houseboat",
    subtitle: "Private cedar houseboats on Nigeen Lake, shepherd trails of Pahalgam & Gulmarg meadows.",
    regionSlug: "north-india",
    destinationSlug: "kashmir",
    destinationName: "Kashmir",
    badgeTag: "Couple & Family",
    days: 6,
    nights: 5,
    routeStops: [
      { days: 2, place: "Srinagar Houseboat" },
      { days: 2, place: "Pahalgam" },
      { days: 1, place: "Gulmarg" },
    ],
    price: 29800,
    originalPrice: 35500,
    rating: 4.9,
    reviewCount: 246,
    filterTags: ["Popular", "5-8 Days", "Couples", "Family"],
    imageKey: "trip-2",
    nextDeparture: "Flexible Private & Weekly Batches",
    groupSize: "2 – 10 Guests",
    maxAltitude: "3,980m (Apharwat Gondola)",
    startingPoint: "Srinagar Airport (SXR)",
    endingPoint: "Srinagar Airport (SXR)",
    overview:
      "Experience Kashmir with quiet intimacy. Anchored on the tranquil waters of Nigeen Lake away from commercial crowds, this curation pairs heirloom walnut-wood houseboats with guided walks through Old Srinagar's craft guilds, riverside picnics by the Lidder in Pahalgam, and high alpine vistas in Gulmarg.",
    highlights: [
      "Dawn floating vegetable market glide by private cushioned shikara",
      "Stay aboard a third-generation handcrafted walnut-wood houseboat on Nigeen Lake",
      "Private saffron harvest & heirloom pashmina loom walk in Old Srinagar",
      "Riverside pine forest picnic in Aru and Betaab Valley",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Nigeen Lake Houseboat Welcome",
        elevationOrNote: "1,585m • Nigeen Lake",
        description:
          "Private transfer to your carved cedar houseboat. Enjoy almond kahwa on the front deck as the sun sets behind Hari Parbat fort.",
      },
      {
        day: 2,
        title: "Mughal Chinar Gardens & Old City Craft Guilds",
        elevationOrNote: "1,600m • Heritage Walk",
        description:
          "Explore Nishat and Shalimar terraced gardens at opening hour, followed by visits to master papier-mâché and walnut wood artisans.",
      },
      {
        day: 3,
        title: "Srinagar to Pahalgam via Pampore Saffron Fields",
        elevationOrNote: "2,200m • Lidder Valley",
        description:
          "Drive south past ancient Avantipora ruins and saffron plateaus into the pine-draped valley of shepherds.",
      },
      {
        day: 4,
        title: "Aru Meadow Walk & Lidder River Retreat",
        elevationOrNote: "2,410m • Alpine Pastures",
        description:
          "Spend an unhurried day walking through Aru's wildflower meadows and dining beside glacial waters.",
      },
      {
        day: 5,
        title: "Pahalgam to Gulmarg Highland Meadow",
        elevationOrNote: "2,650m • Meadow of Flowers",
        description:
          "Ascend through tangential tangmarg fir forests to Gulmarg, riding the gondola toward Apharwat snow ridges.",
      },
      {
        day: 6,
        title: "Morning Kahwa & Transfer to Srinagar Airport",
        elevationOrNote: "Departure Day",
        description:
          "Descend back to the valley floor for your onward afternoon flight.",
      },
    ],
    inclusions: [
      "Private chauffeur-driven Innova Crysta for the complete itinerary",
      "2 nights luxury heritage houseboat + 3 nights boutique mountain resorts",
      "Daily breakfast and authentic Kashmiri dinners including a curated Wazwan feast",
      "Private shikara rides, Aru/Betaab union cab transfers & garden entries",
    ],
    exclusions: [
      "Flights to and from Srinagar (SXR)",
      "Gulmarg Phase 2 Gondola tickets and pony rides",
      "Personal shopping and gratuities",
    ],
  },
  {
    id: "trip-3",
    slug: "manali-lahaul-highlands",
    title: "Manali & Lahaul: Kathkuni Estates & Glacial Valleys",
    subtitle: "A short mountain escape through Old Manali cedar groves, Sissu waterfall & Jispa.",
    regionSlug: "north-india",
    destinationSlug: "manali",
    destinationName: "Manali & Lahaul",
    badgeTag: "Short Escape",
    days: 4,
    nights: 3,
    routeStops: [
      { days: 2, place: "Manali Estate" },
      { days: 1, place: "Sissu & Jispa" },
    ],
    price: 22500,
    originalPrice: 26900,
    rating: 4.8,
    reviewCount: 132,
    filterTags: ["Under 5 Days", "Couples", "Family"],
    imageKey: "trip-5",
    nextDeparture: "Every Thursday & Custom Dates",
    groupSize: "2 – 8 Guests",
    maxAltitude: "3,200m (Jispa)",
    startingPoint: "Manali / Bhuntar Airport",
    endingPoint: "Manali / Bhuntar Airport",
    overview:
      "Crafted for travellers seeking deep mountain stillness in four days. Stay inside a restored stone-and-deodar Kathkuni homestead above Naggar and Manali, cross the Atal Tunnel into the stark beauty of Lahaul valley, and dine on Himachali siddu and trout under apple blossoms.",
    highlights: [
      "Stay in an authentic Kathkuni timber-and-stone heritage estate",
      "Private forest walk to Jogini falls and Nicholas Roerich art estate",
      "Cross into Lahaul valley for Sissu glacial waterfall and Chandra river banks",
      "Wood-fired Himachali farm-to-table dining experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali & Naggar Castle Heritage Walk",
        elevationOrNote: "2,050m • Kullu Valley",
        description:
          "Check into your orchard sanctuary, followed by a sunset walk through Naggar's 15th-century stone castle.",
      },
      {
        day: 2,
        title: "Cross Atal Tunnel to Sissu & Jispa Riverbank",
        elevationOrNote: "3,200m • Lahaul Valley",
        description:
          "Enter the rain-shadow landscape of Lahaul, spending the afternoon along the cobalt Bhaga river in Jispa.",
      },
      {
        day: 3,
        title: "Old Manali Deodar Trail & Local Craft Kitchen",
        elevationOrNote: "2,100m • Forest Trail",
        description:
          "Return to Kullu for a guided cedar forest walk around Hadimba sacred grove and a slow wood-fired dinner.",
      },
      {
        day: 4,
        title: "Orchard Breakfast & Departure",
        elevationOrNote: "Departure Day",
        description:
          "Leisurely morning coffee in the orchard before airport or highway transfer.",
      },
    ],
    inclusions: [
      "Private SUV transport across Kullu and Lahaul valleys",
      "3 nights boutique heritage orchard estate & riverside lodge",
      "Daily breakfast and 3 artisanal dinners",
      "Guided forest walks and heritage monument admissions",
    ],
    exclusions: [
      "Transport to/from Delhi or Chandigarh (available as add-on)",
      "Adventure sports (paragliding/rafting) and lunches",
    ],
  },
  {
    id: "trip-4",
    slug: "ladakh-monasteries-moonland",
    title: "Ladakh: Monasteries, Nubra Dunes & Pangong Tso",
    subtitle: "Slow-paced trans-Himalayan odyssey across Leh, Thiksey, Hunder & Pangong Lake.",
    regionSlug: "north-india",
    destinationSlug: "ladakh",
    destinationName: "Ladakh",
    badgeTag: "Group Tour",
    days: 7,
    nights: 6,
    routeStops: [
      { days: 3, place: "Leh & Indus" },
      { days: 2, place: "Nubra Valley" },
      { days: 1, place: "Pangong Tso" },
    ],
    price: 42000,
    originalPrice: 48500,
    rating: 4.9,
    reviewCount: 219,
    filterTags: ["Popular", "5-8 Days", "Groups", "Couples"],
    imageKey: "trip-4",
    nextDeparture: "22 May & 06 June",
    groupSize: "8 – 12 Guests",
    maxAltitude: "5,359m (Khardung La)",
    startingPoint: "Leh Airport (IXL)",
    endingPoint: "Leh Airport (IXL)",
    overview:
      "Respecting the rhythm of high altitude, our 7-day Ladakh curation begins with 48 hours of gentle Indus Valley acclimatization before crossing Khardung La into the apricot orchards of Nubra and the surreal turquoise shores of Pangong Tso.",
    highlights: [
      "Dawn butter-lamp ceremony and chanting at Thiksey Monastery",
      "Traditional Ladakhi kitchen table lunch in a 200-year-old Stok family home",
      "Sunset walk across the silver sand dunes of Hunder with Bactrian camels",
      "Boutique heated lakeside cottage overlooking Pangong Tso",
    ],
    itinerary: [
      {
        day: 1,
        title: "Touchdown in Leh • Complete High-Altitude Rest",
        elevationOrNote: "3,500m • Acclimatization",
        description:
          "Airport pickup to a quiet poplar-ringed boutique hotel in Leh. Rest, hydrate with sea-buckthorn tea, and let your body adjust.",
      },
      {
        day: 2,
        title: "Indus Valley Monasteries, Sangam & Shanti Stupa",
        elevationOrNote: "3,500m • Indus Corridor",
        description:
          "Visit Alchi's 11th-century Kashmiri-style frescoes, the Zanskar-Indus confluence, and Leh Palace at dusk.",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La Pass",
        elevationOrNote: "3,048m (Sleep) • 5,359m (Pass)",
        description:
          "Ascend across Khardung La before dropping into the warm, oxygen-rich Shyok river canyon of Diskit and Hunder.",
      },
      {
        day: 4,
        title: "Turtuk Balti Heritage Village Excursion",
        elevationOrNote: "2,900m • Baltistan Border",
        description:
          "Explore stone water channels, buckwheat fields, and royal Yagbo house museum in India's northernmost Balti village.",
      },
      {
        day: 5,
        title: "Nubra to Pangong Tso via Shyok River Route",
        elevationOrNote: "4,250m • High Salt Lake",
        description:
          "Follow the dramatic Shyok river gorge to witness the first reveal of Pangong Tso's shifting blues.",
      },
      {
        day: 6,
        title: "Pangong Sunrise & Return to Leh via Chang La & Thiksey",
        elevationOrNote: "3,500m • Return to Leh",
        description:
          "Watch early sunlight strike the Karakoram peaks across the water before returning to Leh via Chang La.",
      },
      {
        day: 7,
        title: "Transfer to Leh Airport over the Himalayan Crest",
        elevationOrNote: "Departure Day",
        description:
          "Morning transfer to Kushok Bakula Rimpochee Airport for your flight home.",
      },
    ],
    inclusions: [
      "Dedicated Toyota Innova / Xylo fleet with seasoned Ladakhi drivers",
      "6 nights boutique heritage hotels, apricot orchard camps & lakeside cottages",
      "Daily breakfast, packed pass refreshments, and dinner",
      "Inner Line Permits, Ladakh environmental fee, and supplemental oxygen cylinder",
    ],
    exclusions: [
      "Flights to and from Leh (IXL)",
      "Monastery camera fees and camel ride tickets",
      "Personal medical or travel insurance",
    ],
  },
  {
    id: "trip-5",
    slug: "rajasthan-desert-palaces",
    title: "Rajasthan: Blue Citadels & Private Thar Wilderness",
    subtitle: "An architectural and culinary passage through Jodhpur, Jaisalmer & private dunes.",
    regionSlug: "west-india",
    destinationSlug: "rajasthan",
    destinationName: "Rajasthan",
    badgeTag: "Private Luxury",
    days: 6,
    nights: 5,
    routeStops: [
      { days: 2, place: "Jodhpur" },
      { days: 2, place: "Jaisalmer Fort" },
      { days: 1, place: "Thar Desert Camp" },
    ],
    price: 36000,
    originalPrice: 42500,
    rating: 4.9,
    reviewCount: 168,
    filterTags: ["Popular", "5-8 Days", "Couples", "Family"],
    imageKey: "trip-3",
    nextDeparture: "October – March • Daily Private",
    groupSize: "2 – 10 Guests",
    maxAltitude: "250m • Thar Desert",
    startingPoint: "Jodhpur Airport (JDH)",
    endingPoint: "Jodhpur / Jaisalmer",
    overview:
      "Step into the golden light of Marwar. Walk the ramparts of Mehrangarh with a local historian, sleep inside restored sandstone havelis in Jaisalmer, and spend an unforgettable night in a private canvas tented camp deep in the non-commercial Thar wilderness with Manganiyar folk musicians.",
    highlights: [
      "Private champagne/kahwa sundowner overlooking Mehrangarh Fort",
      "Guided architectural walk through the carved sandstone havelis of Jaisalmer",
      "Private 4x4 dune drive and candlelit dinner in a secluded Thar desert reserve",
      "Live acoustic performance by hereditary Manganiyar desert musicians",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jodhpur & Blue City Stepwell Walk",
        elevationOrNote: "Jodhpur • Marwar",
        description:
          "Check into a heritage boutique haveli near Toorji Ka Jhalra stepwell and explore the indigo brahmin lanes at dusk.",
      },
      {
        day: 2,
        title: "Mehrangarh Ramparts, Jaswant Thada & Bishnoi Craft",
        elevationOrNote: "Jodhpur • Royal Citadel",
        description:
          "Morning tour of Mehrangarh's museum galleries followed by a visit to traditional dhurrie weavers.",
      },
      {
        day: 3,
        title: "Drive across the Desert Scrub to Jaisalmer Golden Fort",
        elevationOrNote: "Jaisalmer • 4.5 hrs",
        description:
          "Journey west to the living fort of Jaisalmer, watching sunset from the quiet cenotaphs of Bada Bagh.",
      },
      {
        day: 4,
        title: "Patwon Ki Haveli, Gadisar Lake & Private Thar Camp",
        elevationOrNote: "Thar Wilderness",
        description:
          "Marvel at intricate jali stonework before transferring to your luxury canvas suite among untouched sand dunes.",
      },
      {
        day: 5,
        title: "Desert Dawn, Kuldhara Ruins & Return to Jodhpur",
        elevationOrNote: "Desert to Jodhpur",
        description:
          "Wake to desert birdlife and visit the abandoned 13th-century stone village of Kuldhara before returning to Jodhpur.",
      },
      {
        day: 6,
        title: "Marwari Breakfast & Departure",
        elevationOrNote: "Departure Day",
        description:
          "Private transfer to Jodhpur Airport or railway junction.",
      },
    ],
    inclusions: [
      "Private air-conditioned SUV with uniformed chauffeur throughout",
      "4 nights heritage boutique havelis + 1 night luxury Thar desert camp",
      "Daily breakfast, desert sundowner, and royal Rajasthani dinner under the stars",
      "Private historian guides at Mehrangarh and Jaisalmer Fort",
    ],
    exclusions: [
      "Domestic airfare to/from Jodhpur or Jaisalmer",
      "Lunches and monument photography tickets",
    ],
  },
  {
    id: "trip-6",
    slug: "kerala-backwaters-spice-hills",
    title: "Kerala: Fort Kochi, Munnar Cloud Estates & Alleppey",
    subtitle: "Slow southern passage from spice-laden harbour towns to high tea ridges and lagoons.",
    regionSlug: "south-india",
    destinationSlug: "kerala",
    destinationName: "Kerala",
    badgeTag: "Couple & Family",
    days: 6,
    nights: 5,
    routeStops: [
      { days: 1, place: "Fort Kochi" },
      { days: 2, place: "Munnar Hills" },
      { days: 2, place: "Alleppey & Marari" },
    ],
    price: 31500,
    originalPrice: 37000,
    rating: 4.9,
    reviewCount: 154,
    filterTags: ["5-8 Days", "Couples", "Family"],
    imageKey: "trip-6",
    nextDeparture: "Weekly & Custom Private Dates",
    groupSize: "2 – 8 Guests",
    maxAltitude: "1,600m (Munnar)",
    startingPoint: "Cochin Airport (COK)",
    endingPoint: "Cochin Airport (COK)",
    overview:
      "A sensory journey across Malabar. Trace centuries of spice trade history in the quiet lanes of Fort Kochi, ascend into the cool mist of Munnar's colonial tea bungalows, and drift through quiet palm-shaded canals aboard a private teakwood kettuvallam barge.",
    highlights: [
      "Heritage walk through Fort Kochi, Jew Town, and Chinese fishing nets at dusk",
      "Guided dawn walk through Kolukkumalai & Munnar high-elevation tea estates",
      "Private single-bedroom teakwood houseboat cruise with onboard Toddy-shop chef",
      "Traditional Kathakali performance and Ayurvedic abhyanga consultation",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Fort Kochi & Spice Harbour Walk",
        elevationOrNote: "Fort Kochi • Coast",
        description:
          "Settle into a restored Dutch-era boutique hotel and stroll along the historic waterfront at sunset.",
      },
      {
        day: 2,
        title: "Climb the Western Ghats to Munnar Tea Sanctuary",
        elevationOrNote: "1,600m • Cloud Forest",
        description:
          "Wind past rubber and cardamom plantations into the cool mountain air of Munnar.",
      },
      {
        day: 3,
        title: "High Ridge Tea Trail & Spice Plantation Table",
        elevationOrNote: "1,750m • Tea Estates",
        description:
          "Walk through emerald tea slopes with a resident naturalist followed by a pepper and cardamom tasting.",
      },
      {
        day: 4,
        title: "Descend to Alleppey & Board Private Kettuvallam",
        elevationOrNote: "Vembanad Backwaters",
        description:
          "Board your private thatched houseboat, gliding past village temples, paddy fields below sea level, and kingfishers.",
      },
      {
        day: 5,
        title: "Backwater Canoe Glide & Marari Coastal Retreat",
        elevationOrNote: "Mararikulam Coast",
        description:
          "Disembark for a short transfer to the quiet coconut-lined shores of Marari beach.",
      },
      {
        day: 6,
        title: "Morning Sea Breeze & Cochin Airport Transfer",
        elevationOrNote: "Departure Day",
        description:
          "1.5-hour coastal drive back to Cochin International Airport.",
      },
    ],
    inclusions: [
      "Private air-conditioned vehicle with English-speaking Malabar host-driver",
      "4 nights boutique heritage/plantation stays + 1 night private houseboat",
      "Daily breakfast and all meals (lunch, evening snacks, dinner) aboard the houseboat",
      "Guided spice walk, tea museum visit, and country canoe excursion",
    ],
    exclusions: [
      "Flights to and from Cochin (COK)",
      "Optional Ayurvedic spa treatments and personal expenses",
    ],
  },
  {
    id: "trip-7",
    slug: "goa-heritage-slow-coast",
    title: "Goa Unhurried: Indo-Portuguese Mansions & South Coves",
    subtitle: "Beyond the beaches—Fontainhas architecture, Chorao island mangroves & Agonda stillness.",
    regionSlug: "west-india",
    destinationSlug: "goa",
    destinationName: "Goa",
    badgeTag: "Short Escape",
    days: 4,
    nights: 3,
    routeStops: [
      { days: 2, place: "Fontainhas & Divar" },
      { days: 1, place: "South Goa Coves" },
    ],
    price: 24500,
    originalPrice: 28900,
    rating: 4.8,
    reviewCount: 118,
    filterTags: ["Under 5 Days", "Couples", "Groups"],
    imageKey: "dest-goa",
    nextDeparture: "Every Friday & Private Dates",
    groupSize: "2 – 10 Guests",
    maxAltitude: "Konkan Sea Level",
    startingPoint: "Goa Mopa (GOX) / Dabolim (GOI)",
    endingPoint: "Goa Mopa (GOX) / Dabolim (GOI)",
    overview:
      "Rediscover Goa through the lens of architecture, ecology, and Saraswat-Portuguese gastronomy. Stay in a restored 19th-century manor house, ferry across the Mandovi to sleepy river islands, and spend your final day by the turtle-nesting shores of Galgibaga and Agonda.",
    highlights: [
      "Curated architectural walk through Latin Quarter of Fontainhas with local conservationist",
      "Ferry ride to Divar and Chorao islands for mangrove birding and bakery visits",
      "Private artisanal feni & urak tasting paired with Goan Saraswat coastal cuisine",
      "Sunset kayaking in the calm Cola and Palolem backwater lagoons",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Panjim & Fontainhas Heritage Walk",
        elevationOrNote: "Panjim Latin Quarter",
        description:
          "Check into a heritage boutique casa. Walk past ochre and indigo shell-window homes as evening bakery ovens warm up.",
      },
      {
        day: 2,
        title: "Divar Island Ferry, Old Goa Basilicas & Feni Estate",
        elevationOrNote: "Mandovi River Islands",
        description:
          "Take the river ferry to Divar island's timeless villages, followed by a private cashew orchard tasting.",
      },
      {
        day: 3,
        title: "Southward to Chandor Manor & Quiet Coves of Canacona",
        elevationOrNote: "South Goa Coast",
        description:
          "Tour the grand ballroom of a 400-year-old Portuguese mansion in Chandor before reaching the serene beaches of the south.",
      },
      {
        day: 4,
        title: "Morning Sea Swim & Airport Transfer",
        elevationOrNote: "Departure Day",
        description:
          "Enjoy fresh poee bread and Goan coffee overlooking the Arabian Sea before departure.",
      },
    ],
    inclusions: [
      "Private chauffeur-driven vehicle for arrival, sightseeing & south coast transfers",
      "3 nights boutique Indo-Portuguese heritage villa & coastal eco-retreat",
      "Daily breakfast and 1 curated heritage dinner with feni pairing",
      "Guided Fontainhas walk, island ferry tickets & manor house entry",
    ],
    exclusions: [
      "Flights to and from Goa",
      "Personal bar bills, lunches, and watersports",
    ],
  },
];

TRIPS.push(
  {
    id: "trip-8",
    slug: "hampta-pass-crossing",
    title: "Hampta Pass: From Green Kullu to Lunar Lahaul",
    subtitle: "A small-group alpine crossing for friends who like their views earned.",
    regionSlug: "north-india",
    destinationSlug: "manali",
    destinationName: "Manali & Lahaul",
    badgeTag: "Group Trek",
    days: 5,
    nights: 4,
    routeStops: [
      { days: 1, place: "Jobra" },
      { days: 2, place: "Balu Ka Ghera" },
      { days: 1, place: "Shea Goru" },
      { days: 1, place: "Chatru" },
    ],
    price: 16500,
    originalPrice: 19500,
    rating: 4.8,
    reviewCount: 97,
    filterTags: ["5-8 Days", "Groups"],
    imageKey: "trip-7",
    nextDeparture: "June – September • Weekly",
    groupSize: "8 – 12 Guests",
    maxAltitude: "4,270m (Hampta Pass)",
    startingPoint: "Manali",
    endingPoint: "Manali",
    overview:
      "One of the Himalaya's most dramatic crossovers: forested Kullu meadows on one side, the stark rain-shadow desert of Lahaul on the other. Small groups, certified trek leads, alpine tents and hot meals at every camp.",
    highlights: [
      "Cross the 4,270m Hampta Pass with a certified mountain lead",
      "Camp beside glacial streams in Balu Ka Ghera meadow",
      "Descend into the moonscape of Lahaul at Shea Goru",
      "Optional drive to Chandratal lake on the final day",
    ],
    itinerary: [
      { day: 1, title: "Manali to Jobra & Chika Meadow", elevationOrNote: "3,100m • 2 hrs walk", description: "Short drive to the trailhead, then an easy walk through maple and birch to the first riverside camp." },
      { day: 2, title: "Chika to Balu Ka Ghera", elevationOrNote: "3,600m • 5 hrs", description: "Follow the Rani Nallah through open meadows to a wide camp beneath the pass." },
      { day: 3, title: "Cross Hampta Pass to Shea Goru", elevationOrNote: "4,270m • 8 hrs", description: "An early start for the climb to the pass, then a steep descent into the stark Lahaul valley." },
      { day: 4, title: "Shea Goru to Chatru", elevationOrNote: "3,300m • 4 hrs", description: "Gentle descent along the Chandra river with views across the Spiti side." },
      { day: 5, title: "Chatru to Manali via Atal Tunnel", elevationOrNote: "Departure Day", description: "Drive back to Manali through the Atal Tunnel, arriving by early afternoon." },
    ],
    inclusions: [
      "Certified trek lead, local guides, cook and support staff",
      "4 nights alpine tents (twin sharing) with sleeping bags and mats",
      "All meals on the trek, Day 1 lunch to Day 5 breakfast",
      "Forest permits, camping fees and first-aid kit with oxygen",
    ],
    exclusions: [
      "Travel to and from Manali",
      "Personal trekking gear and porter for personal bags",
    ],
  },
  {
    id: "trip-9",
    slug: "thar-desert-camp-weekend",
    title: "Thar Nights: Jaisalmer Fort & Private Desert Camp",
    subtitle: "A short, slow escape into the golden city and the silence of the dunes.",
    regionSlug: "west-india",
    destinationSlug: "rajasthan",
    destinationName: "Rajasthan",
    badgeTag: "Short Escape",
    days: 3,
    nights: 2,
    routeStops: [
      { days: 2, place: "Jaisalmer" },
      { days: 1, place: "Thar Desert Camp" },
    ],
    price: 18900,
    originalPrice: 22500,
    rating: 4.9,
    reviewCount: 88,
    filterTags: ["Under 5 Days", "Couples", "Family"],
    imageKey: "trip-8",
    nextDeparture: "October – March • Every Friday",
    groupSize: "2 – 10 Guests",
    maxAltitude: "225m • Thar Desert",
    startingPoint: "Jaisalmer",
    endingPoint: "Jaisalmer",
    overview:
      "Wander the living fort of Jaisalmer, then trade the city for a quiet canvas camp far from the crowded dune strips. Folk music by the fire, a sky full of stars and a camel walk at dawn.",
    highlights: [
      "Guided walk inside the living Jaisalmer Fort",
      "Sunset at the Bada Bagh cenotaphs",
      "Private canvas suite in a low-impact desert camp",
      "Manganiyar folk music and dinner under the stars",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Jaisalmer Fort Walk", elevationOrNote: "Jaisalmer", description: "Check in to a heritage haveli and explore the fort lanes with a local guide." },
      { day: 2, title: "Havelis, Bada Bagh & Desert Camp", elevationOrNote: "Thar Desert", description: "Morning haveli walk, sunset at Bada Bagh, then a drive out to camp for dinner by the fire." },
      { day: 3, title: "Dawn Camel Walk & Departure", elevationOrNote: "Departure Day", description: "An unhurried camel walk at first light, breakfast at camp and transfer back to Jaisalmer." },
    ],
    inclusions: [
      "Private transfers in Jaisalmer and to the desert camp",
      "1 night heritage haveli + 1 night private desert camp",
      "Daily breakfast and dinner, plus folk music evening",
      "Local guide for the fort and havelis",
    ],
    exclusions: ["Travel to and from Jaisalmer", "Monument camera fees and lunches"],
  }
);

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

