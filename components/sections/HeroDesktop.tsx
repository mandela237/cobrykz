"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function HeroDesktop() {
  return (
    <section
      className="relative min-h-screen bg-[#06090F] pt-16"
      aria-label="Hero"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 62% 78% at 95% 28%, rgba(37,99,235,0.34) 0%, transparent 55%)",
            "radial-gradient(ellipse 35% 45% at 4% 88%, rgba(8,12,24,0.7) 0%, transparent 50%)",
            "radial-gradient(ellipse 42% 50% at 28% 15%, rgba(99,102,241,0.09) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Portrait — fills right 52% */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[52%] lg:w-[50%] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mandela-portrait-sharp.jpg"
            alt=""
            fill
            preload
            quality={90}
            loading="eager"
            className="object-cover object-top"
            sizes="52vw"
            style={{ filter: "contrast(1.06) saturate(1.02)" }}
          />
        </div>

        {/* Left scrim — portrait dissolves into text column */}
        <div
          className="absolute inset-y-0 left-0 w-56 lg:w-72 xl:w-96"
          style={{
            background:
              "linear-gradient(to right, #06090F 0%, #06090F 6%, rgba(6,9,15,0.9) 36%, rgba(6,9,15,0.32) 70%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-56 lg:h-72"
          style={{
            background:
              "linear-gradient(to top, #06090F 0%, #06090F 8%, rgba(6,9,15,0.7) 48%, transparent 100%)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 inset-x-0 h-32"
          style={{ background: "linear-gradient(to bottom, #06090F, transparent)" }}
        />

        <div className="absolute inset-0 bg-[#06090F]/10" />
      </div>

      {/* Text column */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col justify-center min-h-[calc(100vh-64px)] py-20 lg:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[480px] lg:max-w-[520px] xl:max-w-[560px]"
        >
          {/* Headline — editorial two-tier */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="block text-[42px] sm:text-[52px] lg:text-[60px] xl:text-[70px] font-extrabold tracking-[-0.04em] text-white leading-[1.02]">
              We build websites
            </span>
            <span className="block font-serif italic font-normal text-[46px] sm:text-[56px] lg:text-[64px] xl:text-[74px] text-white/90 leading-[1.1] tracking-normal">
              your business deserves.
            </span>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-[15px] lg:text-[17px] text-white/60 leading-[1.88] mb-9 max-w-[400px]"
          >
            Premium websites and digital systems that help local businesses
            earn more trust, attract better clients, and grow — without the
            agency overhead.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-11">
            <a
              href="#contact"
              className="shimmer inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-[14px] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 active:scale-[0.98] shadow-[0_4px_28px_rgba(37,99,235,0.38),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              Book a Discovery Call
            </a>
            <a
              href="#our-standard"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[14px] font-medium transition-colors duration-150 group"
            >
              See Our Standard
              <span
                className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </motion.div>

          {/* Proof bar */}
          <motion.div variants={fadeUp} className="flex items-center gap-5 sm:gap-7">
            <div className="flex items-center gap-2.5">
              <span className="text-[22px] font-black text-white leading-none">100</span>
              <span className="text-[9px] text-white/38 leading-tight uppercase tracking-[0.07em]">
                Lighthouse
                <br />
                Score
              </span>
            </div>
            <div className="w-px h-7 bg-white/[0.09]" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <span className="text-[22px] font-black text-white leading-none">1–2</span>
              <span className="text-[9px] text-white/38 leading-tight uppercase tracking-[0.07em]">
                Week
                <br />
                Delivery
              </span>
            </div>
            <div className="w-px h-7 bg-white/[0.09]" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#D97706" aria-hidden="true">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="text-[9px] text-white/38 leading-tight uppercase tracking-[0.07em]">
                Client
                <br />
                Rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #06090F)" }}
        aria-hidden="true"
      />
    </section>
  );
}
