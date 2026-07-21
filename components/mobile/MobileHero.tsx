import Image from "next/image";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";

const mobileHeroSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const mobileHeroSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export default function MobileHero() {
  return (
    <section
      id="m-top"
      className="relative isolate min-h-[620px] overflow-hidden border-b border-border bg-gray-light text-navy min-[375px]:min-h-[720px] min-[600px]:min-h-[700px]"
    >
      <div
        data-mobile-portrait-stage
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          data-mobile-hero-backdrop
          src="/mandela-portrait-sharp.jpg"
          alt="Mandela Atud, founder of COBRYKZ"
          fill
          preload
          quality={90}
          className="object-cover object-[53%_top]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_32%)]"
          aria-hidden="true"
        />
      </div>

      <div
        data-mobile-glass-veil
        className="absolute inset-x-0 bottom-0 z-10 h-[56%] bg-[linear-gradient(180deg,rgba(247,250,255,0.04)_0%,rgba(247,250,255,0.24)_20%,rgba(247,250,255,0.76)_48%,rgba(247,250,255,0.96)_100%)]"
        aria-hidden="true"
      />

      <div className="m-shell relative z-20 flex min-h-[620px] flex-col justify-end pb-6 pt-24 min-[375px]:min-h-[720px] min-[600px]:min-h-[700px]">
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
              data-mobile-hero-serif="cormorant-garamond"
              className={`${mobileHeroSerif.className} mt-1 block text-[38px] font-normal italic leading-none text-blue`}
            >
              earns trust.
            </span>
          </h1>

          <p
            className={`${mobileHeroSans.className} mt-3 max-w-[292px] text-[14px] font-medium leading-[1.6] text-navy/80`}
          >
            Premium websites for local businesses, built directly with Mandela.
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

          <div
            className={`${mobileHeroSans.className} mt-5 flex items-center gap-2 text-[11px] font-medium text-navy/75`}
          >
            <ShieldCheck
              size={14}
              strokeWidth={1.7}
              className="shrink-0 text-evergreen"
              aria-hidden="true"
            />
            <span>Direct access</span>
            <span className="h-3 w-px bg-navy/15" aria-hidden="true" />
            <span>Custom-built</span>
            <span className="h-3 w-px bg-navy/15" aria-hidden="true" />
            <span>Clear process</span>
          </div>
        </div>
      </div>
    </section>
  );
}
