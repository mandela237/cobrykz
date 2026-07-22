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
      className="relative isolate h-[68svh] min-h-[500px] max-h-[620px] overflow-hidden border-b border-white/10 bg-navy text-white [@media(max-height:649px)]:h-svh"
    >
      <div className="absolute inset-0 bg-[#d8e0e6]">
        <video
          data-mobile-hero-backdrop
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-video-poster.jpg"
          className="h-full w-full object-contain object-[center_top] motion-reduce:hidden"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 hidden bg-[url('/hero-video-poster.jpg')] bg-contain bg-top bg-no-repeat motion-reduce:block"
          aria-hidden="true"
        />
      </div>

      <div
        data-mobile-hero-copy
        className="relative z-20 flex h-full w-full max-w-[430px] flex-col justify-end px-5 pb-8 pt-24 [@media(max-height:649px)]:pb-5 [@media(max-height:649px)]:pt-20"
      >
        <div
          data-mobile-text-overlay
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[390px] bg-[linear-gradient(to_top,rgba(11,23,40,.78)_0%,rgba(11,23,40,.54)_58%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10">
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
            className={`${mobileHeroSans.className} mt-5 text-[30px] font-normal leading-[1.04] tracking-[-0.02em] text-white min-[400px]:text-[33px] [@media(max-height:649px)]:mt-3`}
          >
            A website that
            <span className="mt-1 block font-serif text-[36px] font-normal italic leading-none text-white min-[400px]:text-[39px]">
              earns trust.
            </span>
          </h1>

          <p
            className={`${mobileHeroSans.className} mt-4 max-w-[340px] text-[14px] font-medium leading-[1.6] text-white/80 [@media(max-height:649px)]:mt-3`}
          >
            Built for local businesses whose website no longer matches their
            work.
          </p>

          <a
            href="#m-contact"
            className={`${mobileHeroSans.className} shimmer mt-6 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-4 text-[13px] font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition-colors hover:bg-blue-dark [@media(max-height:649px)]:mt-4`}
          >
            Start a project
            <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
