import RealImage from "@/components/ui/RealImage";
import { INSTA_KEYS, getImage } from "@/data/images";

export default function InstagramStrip() {
  return (
    <section
      aria-labelledby="instagram-heading"
      data-alt="30"
      className="bg-beige text-black grain-overlay py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="chapter-rule text-muted">Field Journal</span>
            <h2 id="instagram-heading" className="font-serif text-3xl sm:text-5xl font-light text-black mt-1">
              Follow <em className="italic">@trailstories.in</em>
            </h2>
          </div>
          <a
            href="https://instagram.com/trailstories.in"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-6 inline-flex items-center justify-center border border-black text-black label-caps hover:bg-black hover:text-white transition-colors"
          >
            Open Instagram ↗
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {INSTA_KEYS.map((key, i) => (
            <div key={key} data-wipe={(i % 8) * 0.025} className="aspect-square bg-ink">
              <a
                href="https://instagram.com/trailstories.in"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                aria-label={`${getImage(key).alt} — view on Instagram`}
                className="group block w-full h-full overflow-hidden"
              >
                <RealImage
                  imageKey={key}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-75"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
