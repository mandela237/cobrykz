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
      className="isolate overflow-hidden border-b border-border bg-white pt-16"
    >
      <div
        data-mobile-video-stage
        className="relative aspect-video overflow-hidden bg-[#d8e0e6] text-white"
      >
        <video
          data-mobile-hero-backdrop
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-video-poster.jpg"
          className="absolute inset-0 h-full w-full object-contain object-[center_top] motion-reduce:hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 hidden bg-[url('/hero-video-poster.jpg')] bg-contain bg-top bg-no-repeat motion-reduce:block"
          aria-hidden="true"
        />
        <div
          data-mobile-text-overlay
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[88%] bg-[linear-gradient(to_top,rgba(11,23,40,.78)_0%,rgba(11,23,40,.44)_58%,transparent_100%)]"
          aria-hidden="true"
        />

        <div
          data-mobile-hero-copy
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[430px] px-5 pb-3"
        >
          <div
            className={`${mobileHeroSans.className} flex items-center gap-2 text-[10px] font-semibold leading-4 text-white/80`}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-evergreen"
              aria-hidden="true"
            />
            Founder-led web design
          </div>

          <h1
            className={`${mobileHeroSans.className} mt-2 text-[26px] font-normal leading-none tracking-[-0.02em] text-white min-[400px]:text-[28px]`}
          >
            A website that
            <span className="mt-0.5 block font-serif text-[31px] font-normal italic leading-none text-white min-[400px]:text-[33px]">
              earns trust.
            </span>
          </h1>

          <p
            className={`${mobileHeroSans.className} mt-2 max-w-[340px] text-[13px] font-medium leading-[1.45] text-white/85`}
          >
            Built for local businesses whose website no longer matches their
            work.
          </p>
        </div>
      </div>

      <div data-mobile-hero-cta className="bg-white px-5 py-5">
        <a
          href="#m-contact"
          className={`${mobileHeroSans.className} action-transition mx-auto inline-flex min-h-12 w-full max-w-[390px] items-center justify-center gap-1.5 rounded-lg bg-blue px-4 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(31,94,255,0.18)] hover:bg-blue-dark active:bg-blue-dark`}
        >
          Start a project
          <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
