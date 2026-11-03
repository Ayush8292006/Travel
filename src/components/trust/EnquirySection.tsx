"use client";

import { useState } from "react";
import { DESTINATIONS } from "@/data/destinations";

interface EnquirySectionProps {
  defaultDestination?: string;
  defaultPackageName?: string;
}

export default function EnquirySection({
  defaultDestination = "Spiti Valley",
  defaultPackageName = "",
}: EnquirySectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(defaultDestination);
  const [guests, setGuests] = useState("2 Guests (Couple / Private)");
  const [month, setMonth] = useState("June – July");
  const [notes, setNotes] = useState(defaultPackageName ? `Package: ${defaultPackageName}` : "");

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppLink = () => {
    const summary = [
      `Hello Trail Stories (@trailstories.in), I would like to plan a journey.`,
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      `Destination: ${destination}`,
      `Guests: ${guests}`,
      `Preferred Window: ${month}`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/919876543210?text=${encodeURIComponent(summary)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const cleanedPhone = phone.replace(/[^0-9]/g, "");

    if (trimmedName.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (cleanedPhone.length < 10) {
      setError("Please enter a valid 10-digit WhatsApp or mobile number.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section
      id="enquiry"
      aria-labelledby="final-cta-heading"
      data-alt="0"
      className="bg-ink text-white grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        {/* Huge Editorial Headline Band */}
        <div className="space-y-6 max-w-5xl">
          <span className="chapter-rule text-gold/80">
            08 · Private Concierge &amp; Callback Desk
          </span>
          <h2
            id="final-cta-heading"
            className="font-serif font-light text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(48px, 8vw, 112px)" }}
          >
            <span className="mask-wrap"><span data-mask className="block">Begin Your <em className="italic text-gold">Trail Story</em>.</span></span>
          </h2>
          <p className="text-base sm:text-lg text-beige/80 max-w-2xl leading-relaxed">
            Share your preferred dates and travel style. A dedicated regional specialist will prepare a handcrafted route dossier within 6 hours.
          </p>
        </div>

        {/* Form + Direct WhatsApp Deep Link Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div data-rise className="lg:col-span-8 bg-beige text-black p-6 sm:p-12 rounded-[20px]">
            {submitted ? (
              <div className="py-12 space-y-6">
                <span className="label-caps text-muted block">
                  Dossier Request Registered
                </span>
                <h3 className="font-serif text-4xl text-black font-light">
                  Thank you, <em className="italic">{name}</em>.
                </h3>
                <p className="text-sm text-muted max-w-lg leading-relaxed">
                  Our route curator for <strong>{destination}</strong> has received your callback request on <strong>{phone}</strong>. For immediate itinerary sharing, open your pre-filled WhatsApp dispatch below.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-8 inline-flex items-center justify-center bg-black text-white label-caps"
                  >
                    Continue on WhatsApp ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="min-h-[48px] px-6 inline-flex items-center justify-center border border-black text-black label-caps"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {error && (
                  <div
                    role="alert"
                    className="p-4 bg-black text-beige text-xs tracking-wide border-l-4 border-deep-beige"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enq-name"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="enq-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Arundhati Deshmukh"
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black placeholder:text-muted/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enq-phone"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      id="enq-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black placeholder:text-muted/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="enq-dest"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Destination
                    </label>
                    <select
                      id="enq-dest"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                      <option value="Custom Multi-Region India">
                        Custom Multi-Region India
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enq-guests"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Travel Party
                    </label>
                    <select
                      id="enq-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black"
                    >
                      <option value="Solo Traveler (Group Batch)">
                        Solo Traveler (Group Batch)
                      </option>
                      <option value="2 Guests (Couple / Private)">
                        2 Guests (Couple / Private)
                      </option>
                      <option value="3 – 6 Guests (Family)">
                        3 – 6 Guests (Family)
                      </option>
                      <option value="7+ Guests (Private Group)">
                        7+ Guests (Private Group)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enq-month"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Travel Window
                    </label>
                    <select
                      id="enq-month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black"
                    >
                      <option value="May – June">May – June</option>
                      <option value="July – September">July – September</option>
                      <option value="October – December">October – December</option>
                      <option value="January – April">January – April</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="enq-email"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black placeholder:text-muted/60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enq-notes"
                      className="label-caps text-[10px] text-muted block mb-2"
                    >
                      Special Preferences / Dates
                    </label>
                    <input
                      id="enq-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Heritage stays, pace preferences, celebration..."
                      className="w-full min-h-[48px] px-4 bg-white border border-black/20 text-sm text-black placeholder:text-muted/60"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    className="min-h-[52px] px-8 bg-black text-white label-caps hover:bg-muted transition-colors"
                  >
                    Request Callback &amp; Dossier
                  </button>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[52px] px-8 inline-flex items-center justify-center border border-black text-black bg-deep-beige label-caps hover:bg-white transition-colors"
                  >
                    Send Directly on WhatsApp ↗
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right 4 Cols: Direct Concierge Promise */}
          <div className="lg:col-span-4 space-y-8 border border-white/15 p-8 bg-black">
            <div className="space-y-2">
              <span className="label-caps text-deep-beige block">
                Direct Line
              </span>
              <p className="font-serif text-3xl text-white font-light">
                Speak with a Regional Route Specialist
              </p>
            </div>

            <p className="text-sm text-beige/75 leading-relaxed">
              Every caller speaks directly with an expedition planner who has walked the route—never a scripted call center.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/15 text-sm">
              <div>
                <span className="label-caps text-[10px] text-deep-beige block">
                  WhatsApp &amp; Voice
                </span>
                <a
                  href="tel:+919876543210"
                  className="min-h-[44px] inline-flex items-center font-serif text-2xl text-white hover:text-deep-beige"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <span className="label-caps text-[10px] text-deep-beige block">
                  Instagram Dispatches
                </span>
                <a
                  href="https://instagram.com/trailstories.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center text-beige underline underline-offset-4"
                >
                  @trailstories.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

