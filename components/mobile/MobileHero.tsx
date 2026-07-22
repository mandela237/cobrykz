import { Manrope } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const mobileHeroSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function MobileHero() {
  return (
    <section
      id="m-top"
      className="relative isolate grid min-h-[520px] grid-cols-[46%_54%] overflow-hidden border-b border-border bg-gray-light text-navy"
    >
      <div
        data-mobile-hero-copy
        className="relative z-20 flex min-w-0 flex-col justify-center px-3 pb-8 pt-24 min-[350px]:px-4"
      >
        <div
          className={`${mobileHeroSans.className} flex items-center gap-2 text-[10px] font-semibold leading-4 text-slate`}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-evergreen"
            aria-hidden="true"
          />
          Founder-led web design
        </div>

        <h1
          className={`${mobileHeroSans.className} mt-5 text-[25px] font-normal leading-[1.04] tracking-[-0.02em] text-navy min-[350px]:text-[28px] min-[400px]:text-[31px]`}
        >
          A website that
          <span
            className="mt-1 block font-serif text-[31px] font-normal italic leading-none text-blue min-[350px]:text-[35px] min-[400px]:text-[38px]"
          >
            earns trust.
          </span>
        </h1>

        <p
          className={`${mobileHeroSans.className} mt-4 text-[12px] font-medium leading-[1.55] text-navy/80 min-[400px]:text-[13px]`}
        >
          Built for local businesses whose website no longer matches their work.
        </p>

        <a
          href="#m-contact"
          className={`${mobileHeroSans.className} shimmer mt-6 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-2 text-[11px] font-semibold text-white shadow-[0_8px_22px_rgba(31,94,255,0.2)] transition-colors hover:bg-blue-dark min-[350px]:text-[12px]`}
        >
          Start a project
          <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
        </a>
      </div>

      <div
        data-mobile-portrait-stage
        className="relative min-w-0 overflow-hidden border-l border-border bg-[#eef3f7]"
      >
        <video
          data-mobile-hero-backdrop
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-video-poster.jpg"
          className="h-full w-full object-cover object-[52%_center]"
          aria-label="COBRYKZ brand animation"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
