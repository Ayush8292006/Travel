import type { MetadataRoute } from "next";
import { TRIPS } from "@/data/trips";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://trailstories.in";
  const now = new Date();

  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const destinationEntries: MetadataRoute.Sitemap = DESTINATIONS.map((dest) => ({
    url: `${baseUrl}${getDestinationUrl(dest)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const packageEntries: MetadataRoute.Sitemap = TRIPS.map((trip) => ({
    url: `${baseUrl}/packages/${trip.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...homeEntry, ...destinationEntries, ...packageEntries];
}
