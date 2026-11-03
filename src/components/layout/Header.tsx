"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const hero = document.getElementById("hero");
      setOnDark(Boolean(hero && hero.getBoundingClientRect().bottom > 80));
      if (y > lastY + 6 && y > 600) setHidden(true);
      else if (y < lastY - 6) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    magneticRef.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.28}px, 0)`;
  };

  const handleMagneticLeave = () => {
    if (!magneticRef.current) return;
    magneticRef.current.style.transform = "translate3d(0px, 0px, 0px)";
  };

  const navItems = [
    { label: "Destinations", href: "/#destinations" },
    { label: "Curated Trips", href: "/#curated-trips" },
    { label: "Getaways", href: "/#perfect-getaway" },
    { label: "Moments", href: "/#moments" },
    { label: "Philosophy", href: "/#why-trail-stories" },
    { label: "FAQs", href: "/#faqs" },
  ];

  return (
    <header
      data-dark={onDark && !menuOpen ? "1" : "0"}
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,transform] duration-500 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        onDark && !menuOpen
          ? "bg-transparent border-b border-white/10 text-white"
          : scrolled
            ? "bg-beige/90 backdrop-blur-md border-b border-black/10 text-black"
            : "bg-beige/80 backdrop-blur-xs border-b border-black/5 text-black"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="min-h-[44px] flex flex-col justify-center group"
          aria-label="Trail Stories Home"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-tight text-black leading-none font-light">
            Trail <em className="italic font-light">Stories</em>
          </span>
          <span className="label-caps text-[10px] text-muted mt-1">
            @trailstories.in
          </span>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] inline-flex items-center label-caps text-black/80 hover:text-black transition-colors relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-2 left-0 w-full h-px bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions: Magnetic "Plan My Trip" + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Link
            ref={magneticRef}
            href="/#enquiry"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            style={{ color: "#FFFFFF", backgroundColor: "#0E0E0E" }}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 bg-black text-white label-caps transition-transform duration-300 ease-out hover:bg-muted"
          >
            Plan My Trip
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center border border-black/15 bg-beige text-black px-3"
          >
            <span className="label-caps">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-beige grain-overlay border-b border-black/15 px-6 py-8 space-y-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-between border-b border-black/10 py-3 font-serif text-2xl text-black"
              >
                <span>{item.label}</span>
                <span className="label-caps text-muted">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/#enquiry"
              onClick={() => setMenuOpen(false)}
              className="min-h-[48px] w-full inline-flex items-center justify-center bg-black text-white label-caps"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

