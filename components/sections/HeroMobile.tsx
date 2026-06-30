"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

export default function HeroMobile() {
  return (
    <div
      className="relative bg-[#06090F] overflow-hidden"
      style={{ height: "84svh", minHeight: "600px", maxHeight: "740px" }}
    >
      {/* Portrait */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mandela-portrait-sharp.jpg"
            alt="Mandela Atud — Founder & CEO, COBRYKZ"
            fill
            preload
            quality={90}
            loading="eager"
            className="object-cover object-[50%_8%]"
            sizes="100vw"
            style={{ filter: "contrast(1.08) saturate(1.02)" }}
          />
        </div>
      </motion.div>

      {/* Blue ambient bloom */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 120% 55% at 50% 0%, rgba(37,99,235,0.28) 0%, transparent 58%)",
            "radial-gradient(ellipse 80% 42% at 85% 88%, rgba(99,102,241,0.15) 0%, transparent 52%)",
          ].join(", "),
        }}
      />

      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-8 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, #06090F, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-8 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to left, #06090F, transparent)" }}
      />

      {/* Cinematic bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          height: "68%",
          background:
            "linear-gradient(to top, #06090F 0%, #06090F 40%, rgba(6,9,15,0.96) 56%, rgba(6,9,15,0.6) 72%, transparent 90%)",
        }}
      />

      {/* Directional light */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.035) 0%, transparent 40%, rgba(0,0,0,0.14) 100%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid opacity-[0.07] z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* Text — anchored to bottom */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-6 pb-8">
        {/* Headline */}
        <div className="mb-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
            className="block text-[36px] min-[390px]:text-[42px] font-extrabold tracking-[-0.04em] text-white leading-[1.02]"
          >
            We build websites
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease }}
            className="block font-serif italic font-normal text-[38px] min-[390px]:text-[44px] text-white/90 leading-[1.1] tracking-normal"
          >
            your business deserves.
          </motion.span>
        </div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease }}
          className="text-[13px] text-white/65 leading-[1.68] mb-5 max-w-[290px]"
        >
          Premium websites that help local businesses earn trust, attract
          better clients, and grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <a
            href="#contact"
            className="shimmer inline-flex items-center bg-blue hover:bg-blue-dark text-white text-[13px] font-semibold px-5 py-3 rounded-xl transition-colors duration-150 active:scale-[0.97] active:translate-y-[2px]"
            style={{
              boxShadow: [
                "0 4px 0 #1a3e9e",
                "0 6px 22px rgba(37,99,235,0.42)",
                "inset 0 1px 0 rgba(255,255,255,0.12)",
              ].join(", "),
            }}
          >
            Book a Discovery Call
          </a>
          <a
            href="#our-standard"
            className="text-white/60 hover:text-white text-[12px] font-medium transition-colors duration-150 group inline-flex items-center gap-1"
          >
            Our work
            <span
              className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
