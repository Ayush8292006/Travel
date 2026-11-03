import { FAQS, FaqItem } from "@/data/faqs";

interface FaqAccordionProps {
  items?: FaqItem[];
  heading?: string;
}

export default function FaqAccordion({
  items = FAQS,
  heading = "Frequently Asked Questions",
}: FaqAccordionProps) {
  return (
    <section
      id="faqs"
      aria-labelledby="faq-section-heading"
      data-alt="12"
      className="bg-beige text-black grain-overlay py-24 sm:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28 self-start">
          <span className="chapter-rule text-muted">
            07 · Expedition Clarifications
          </span>
          <h2
            id="faq-section-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-black leading-none"
          >
            <span className="mask-wrap"><span data-mask className="block">{heading}</span></span>
          </h2>
          <p className="text-sm text-muted max-w-sm leading-relaxed pt-2">
            Every route is bespoke. For specific altitude, visa, or private charter inquiries, reach our concierge desk directly.
          </p>
        </div>

        <div className="lg:col-span-7 divide-y divide-black/15 border-t border-b border-black/15">
          {items.map((faq, idx) => (
            <details
              key={faq.id}
              open={idx === 0}
              data-rise={(idx % 4) * 0.03}
              className="group py-5"
            >
              <summary className="min-h-[44px] list-none cursor-pointer flex items-center justify-between gap-6 font-serif text-2xl sm:text-3xl font-light text-black">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full border border-black/15 font-mono text-base text-black group-open:rotate-45 group-open:bg-ink group-open:text-gold transition-all duration-500"
                >
                  +
                </span>
              </summary>
              <div className="pt-4 pr-8 text-sm sm:text-base text-muted leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

