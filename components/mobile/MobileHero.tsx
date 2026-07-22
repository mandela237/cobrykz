import { Manrope } from "next/font/google";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const mobileHeroSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function MobileHero() {
  return (
    <section
      id="m-top"
      className="relative isolate overflow-hidden border-b border-border bg-gray-light text-navy"
    >
      <div
        data-mobile-portrait-stage
        className="relative mt-16 aspect-video overflow-hidden border-y border-border bg-[#eef3f7]"
      >
        <video
          data-mobile-hero-backdrop
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-video-poster.jpg"
          className="h-full w-full object-cover"
          aria-label="COBRYKZ brand animation"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="m-shell relative z-20 py-8">
        <div data-mobile-hero-copy className="max-w-[330px]">
          <p
            data-mobile-glass-chip
            className={`${mobileHeroSans.className} inline-flex min-h-8 items-center gap-2 rounded-full border border-white bg-white/90 px-3 text-[11px] font-semibold text-navy shadow-[0_8px_20px_rgba(11,23,40,0.07)]`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-evergreen"
              aria-hidden="true"
            />
            Founder-led web design
          </p>

          <h1
            data-mobile-hero-sans="manrope"
            className={`${mobileHeroSans.className} mt-4 max-w-[310px] text-[30px] font-normal leading-[1.08] tracking-[-0.015em] text-navy min-[375px]:text-[33px]`}
          >
            A website that
            <span
              data-mobile-hero-serif="playfair"
              className="mt-1 block font-serif text-[38px] font-normal italic leading-none text-blue"
            >
              earns trust.
            </span>
          </h1>

          <p
            className={`${mobileHeroSans.className} mt-3 max-w-[292px] text-[14px] font-medium leading-[1.6] text-navy/80`}
          >
            Built for local businesses whose website no longer matches their work.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="#m-contact"
              className={`${mobileHeroSans.className} shimmer inline-flex min-h-12 min-w-[172px] items-center justify-center gap-2 rounded-lg bg-blue px-5 text-[13px] font-medium text-white shadow-[0_8px_22px_rgba(31,94,255,0.2)] transition-colors hover:bg-blue-dark`}
            >
              Start a project
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a
              href="#m-services"
              aria-label="Explore services"
              className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white bg-white/90 text-navy shadow-[0_8px_20px_rgba(11,23,40,0.07)]"
            >
              <ArrowDown size={18} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
