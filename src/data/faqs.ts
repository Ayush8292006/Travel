export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  city: string;
  tripTitle: string;
  date: string;
  rating: number;
  imageKey: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How are Trail Stories itineraries different from standard tour operators?",
    answer:
      "We design journeys around unhurried pacing and architectural character rather than tourist checklists. Groups are capped at 8 to 12 guests, stays are handpicked heritage homestays, houseboats, or boutique estates, and every high-altitude route incorporates progressive acclimatization days.",
    category: "Philosophy",
  },
  {
    id: "faq-2",
    question: "How do you manage high-altitude safety in Spiti Valley and Ladakh?",
    answer:
      "Safety is engineered into the route geometry. On Spiti circuits we ascend slowly via the Shimla-Kinnaur corridor rather than rushing up from Manali; in Ladakh, the first 48 hours are strictly dedicated to Indus Valley acclimatization. Every vehicle carries medical-grade supplemental oxygen, pulse oximeters, and a wilderness-certified expedition lead.",
    category: "Safety",
  },
  {
    id: "faq-3",
    question: "Can any group itinerary be customized for a private couple or family?",
    answer:
      "Yes. Every route in our archive can be commissioned as a private departure with custom dates, private chauffeur-driven SUVs, and upgraded luxury heritage properties tailored to your family or partner.",
    category: "Customization",
  },
  {
    id: "faq-4",
    question: "Are solo travellers welcome on group departures?",
    answer:
      "More than half of our group guests travel solo. Solo travellers can opt to share a twin room with a verified same-gender fellow traveller at no extra cost or request a private single-occupancy suite.",
    category: "Solo Travel",
  },
  {
    id: "faq-5",
    question: "What is the booking and cancellation policy?",
    answer:
      "A 25% reservation deposit secures your seat or private dates, with the balance due 21 days prior to departure. If mountain passes or flights are disrupted by weather, we offer 100% credit transfers toward any future Trail Stories departure.",
    category: "Booking",
  },
  {
    id: "faq-6",
    question: "Are inner-line permits and environmental fees included?",
    answer:
      "Yes. All Restricted Area Permits (Nubra, Pangong, Turtuk), Himachal inner-line clearances, and local monastery/environmental conservation levies are arranged in advance by our operations desk.",
    category: "Permits",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "Waking up to the low horn of morning prayers at Key Monastery while snow dusted the mud eaves in Kaza felt like stepping outside of time. Trail Stories paced every single pass with quiet mastery.",
    author: "Arundhati Deshmukh",
    city: "Mumbai",
    tripTitle: "Spiti Circuit: Monasteries & High Villages",
    date: "September",
    rating: 5.0,
    imageKey: "traveler-1",
  },
  {
    id: "test-2",
    quote:
      "Our walnut-wood houseboat on Nigeen Lake was worlds away from the tourist noise. From saffron kahwa at dawn to a private riverside picnic in Pahalgam, every detail felt deeply personal.",
    author: "Kabir & Rhea Malhotra",
    city: "New Delhi",
    tripTitle: "Kashmir Alpine Sanctuary & Heritage Houseboat",
    date: "July",
    rating: 4.9,
    imageKey: "traveler-2",
  },
  {
    id: "test-3",
    quote:
      "Not a single guest in our group of ten felt altitude sickness in Ladakh because the first two days were so thoughtfully curated around rest, old Leh walks, and warm Ladakhi home kitchens.",
    author: "Devansh Singhania",
    city: "Bengaluru",
    tripTitle: "Ladakh: Monasteries, Nubra Dunes & Pangong Tso",
    date: "June",
    rating: 4.9,
    imageKey: "traveler-3",
  },
  {
    id: "test-4",
    quote:
      "We expected a desert camp; we got silence, a sky thick with stars and a fire with musicians whose families have sung there for generations. The kids still talk about the dawn camel walk.",
    author: "Meera Nair",
    city: "Kochi",
    tripTitle: "Thar Nights: Jaisalmer Fort & Private Desert Camp",
    date: "December",
    rating: 4.9,
    imageKey: "traveler-4",
  },
];

