import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import MotionEngine from "@/components/motion/MotionEngine";
import ViewCursor from "@/components/ui/ViewCursor";
import { TravelAgencyJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://trailstories.in"),
  title: {
    default: "Trail Stories (@trailstories.in) | Luxury Curated India Tours & Expeditions",
    template: "%s | Trail Stories",
  },
  description:
    "Quiet luxury meets slow adventure. Handcrafted private and small-group journeys across Spiti Valley, Kashmir, Ladakh, Manali, Rajasthan, Kerala and Goa by Trail Stories (@trailstories.in).",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://trailstories.in",
    siteName: "Trail Stories",
    title: "Trail Stories | Quiet Luxury & Curated India Expeditions",
    description:
      "Handcrafted itineraries across Spiti, Kashmir, Rajasthan, Ladakh, Manali, Kerala & Goa.",
    images: [
      {
        url: "/images/real/hero-spiti.webp",
        width: 1920,
        height: 1080,
        alt: "Trail Stories — Curated India Expeditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trail Stories (@trailstories.in) | Curated India Journeys",
    description:
      "Quiet luxury meets slow adventure across the Indian Himalayas, desert citadels, and backwaters.",
    images: ["/images/real/hero-spiti.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300;1,500&family=Manrope:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <TravelAgencyJsonLd />
      </head>
      <body className="bg-beige text-black font-sans antialiased selection:bg-black selection:text-beige">
        {/* Skip to Main Content Link for Keyboard & Screen Reader Users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-black focus:text-white label-caps"
        >
          Skip to main content
        </a>

        <>
          <MotionEngine />
          <ViewCursor />
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <MobileBottomBar />
        </>
      </body>
    </html>
  );
}
