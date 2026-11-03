"use client";

import Link from "next/link";
import { DESTINATIONS, getDestinationUrl } from "@/data/destinations";
import { TRIPS } from "@/data/trips";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
      if (lenis) lenis.scrollTo(0, { duration: 2.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-ink text-beige grain-overlay border-t border-white/10 pt-20 pb-28 lg:pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Top Editorial Masthead */}
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="label-caps text-deep-beige block">
              Trail Stories • Curated India
            </span>
            <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05]">
              Quiet luxury at the edge of the <em className="italic">wild</em>.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://instagram.com/trailstories.in"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center px-6 border border-white/25 text-white label-caps hover:bg-white hover:text-black transition-colors"
            >
              Instagram @trailstories.in ↗
            </a>
            <Link
              href="/#enquiry"
              className="min-h-[44px] inline-flex items-center px-6 bg-beige text-black label-caps hover:bg-deep-beige transition-colors"
            >
              Commission a Journey
            </Link>
          </div>
        </div>

        {/* 4-Column Information Architecture: Company | Destinations | Important Links & Policies | Contact */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">
          {/* Column 1: Company */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="label-caps text-deep-beige">Company</h2>
            <p className="text-sm text-beige/75 leading-relaxed">
              Trail Stories crafts slow, architecture-forward, and high-altitude journeys across the Indian subcontinent. Every route is personally recce-tested and hosted by regional specialists.
            </p>
            <ul className="space-y-1 pt-2 text-sm text-beige/80">
              <li>
                <Link href="/#why-trail-stories" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  Our Philosophy & Stewardship
                </Link>
              </li>
              <li>
                <Link href="/#moments" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  Traveler Moments Archive
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  Guest Letters & Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Regional Destination Hubs */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="label-caps text-deep-beige">Destinations</h2>
            <ul className="space-y-1 text-sm text-beige/80">
              {DESTINATIONS.map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={getDestinationUrl(dest)}
                    className="min-h-[44px] inline-flex items-center justify-between w-full hover:text-white transition-colors border-b border-white/5"
                  >
                    <span>{dest.name} Tour Packages</span>
                    <span className="font-serif italic text-deep-beige text-xs">
                      {dest.regionSlug.replace("-india", "")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links & Policies */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="label-caps text-deep-beige">Important Links & Policies</h2>
            <ul className="space-y-1 text-sm text-beige/80">
              {TRIPS.slice(0, 4).map((trip) => (
                <li key={trip.id}>
                  <Link
                    href={`/packages/${trip.slug}`}
                    className="min-h-[44px] inline-flex items-center hover:text-white transition-colors"
                  >
                    {trip.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#faqs" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  Cancellation & Weather Policy
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  High-Altitude Safety Protocol
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="min-h-[44px] inline-flex items-center hover:text-white transition-colors">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Desk */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="label-caps text-deep-beige">Concierge Desk</h2>
            <div className="space-y-3 text-sm text-beige/80">
              <p>
                <span className="label-caps text-[10px] text-deep-beige block mb-1">
                  Direct WhatsApp & Telephone
                </span>
                <a
                  href="tel:+919876543210"
                  className="min-h-[44px] inline-flex items-center font-serif text-2xl text-white hover:text-deep-beige transition-colors"
                >
                  +91 98765 43210
                </a>
              </p>
              <p>
                <span className="label-caps text-[10px] text-deep-beige block mb-1">
                  Electronic Mail
                </span>
                <a
                  href="mailto:concierge@trailstories.in"
                  className="min-h-[44px] inline-flex items-center text-white hover:text-deep-beige transition-colors underline underline-offset-4"
                >
                  concierge@trailstories.in
                </a>
              </p>
              <p className="text-xs text-beige/60 pt-2 leading-relaxed">
                Hours: Monday – Sunday, 09:00 to 21:00 IST. On-trail satellite & emergency support operates 24/7 for active departures.
              </p>
            </div>
          </div>
        </div>

        {/* Rising wordmark */}
        <div aria-hidden="true" className="overflow-hidden pt-10 select-none">
          <div data-wordmark className="font-serif font-light text-beige leading-[0.8] tracking-[-0.03em] whitespace-nowrap text-[clamp(64px,16.5vw,260px)]">
            Trail <em className="italic text-gold">Stories</em>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-beige/60">
          <p>© {new Date().getFullYear()} Trail Stories (@trailstories.in). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="label-caps text-[10px] text-deep-beige">
              Crafted for Quiet Luxury &amp; Slow Adventure
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="min-h-[44px] inline-flex items-center gap-1 label-caps text-[10px] text-beige/70 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
