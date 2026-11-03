"use client";

import Link from "next/link";

export default function MobileBottomBar() {
  const whatsappHref =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hello Trail Stories, I would like to enquire about a curated India journey."
    );

  return (
    <nav
      aria-label="Mobile Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black text-white border-t border-white/15 grid grid-cols-3"
    >
      <Link
        href="/#curated-trips"
        style={{ color: "#EFE7DA", backgroundColor: "#0E0E0E" }}
        className="min-h-[52px] flex items-center justify-center border-r border-white/15 label-caps text-[11px] text-beige hover:bg-white/10 transition-colors font-medium"
      >
        Trips
      </Link>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#0E0E0E", backgroundColor: "#EFE7DA" }}
        className="min-h-[52px] flex items-center justify-center border-r border-white/15 label-caps text-[11px] bg-beige text-black font-semibold hover:bg-deep-beige transition-colors"
      >
        WhatsApp
      </a>

      <a
        href="tel:+919876543210"
        style={{ color: "#EFE7DA", backgroundColor: "#0E0E0E" }}
        className="min-h-[52px] flex items-center justify-center label-caps text-[11px] text-beige hover:bg-white/10 transition-colors font-medium"
      >
        Call
      </a>
    </nav>
  );
}

