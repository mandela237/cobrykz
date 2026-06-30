"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const glass =
  "backdrop-blur-xl bg-white/[0.06] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.65),0_3px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.18)]";

export default function HeroMobile() {
  return (
    <div
      className="relative bg-[#06090F] overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Portrait — fills entire viewport as background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateY: [-0.6, 0.6, -0.6],
        }}
        transition={{
          opacity: { duration: 0.85, ease },
          scale: { duration: 0.85, ease },
          rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.85 },
        }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mandela-portrait.jpg"
            alt="Mandela Atud — Founder & CEO, COBRYKZ"
            fill
            priority
            className="object-cover object-[50%_10%]"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* ── Atmospheric depth layers (all z-[1], pointer-events-none) ── */}

      {/* 1. Blue ambient bloom — simulates studio light from above */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 110% 48% at 50% 0%, rgba(37,99,235,0.20) 0%, transparent 55%)",
        }}
      />

      {/* 2. Left edge fade — portrait bleeds naturally into dark bg */}
      <div
        className="absolute inset-y-0 left-0 w-10 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, #06090F, transparent)" }}
      />

      {/* 3. Right edge fade */}
      <div
        className="absolute inset-y-0 right-0 w-10 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to left, #06090F, transparent)" }}
      />

      {/* 4. Cinematic bottom gradient — dark canvas for text section */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, #06090F 0%, #06090F 35%, rgba(6,9,15,0.97) 52%, rgba(6,9,15,0.72) 66%, transparent 82%)",
        }}
      />

      {/* 5. Directional lighting overlay — light from upper-left creates 3D depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 42%, rgba(0,0,0,0.14) 100%)",
        }}
      />

      {/* 6. Dot grid texture — barely visible material texture */}
      <div
        className="absolute inset-0 dot-grid opacity-[0.15] z-[1] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Floating glass card: Performance 100 — right shoulder zone ── */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.9, ease }}
        className="absolute z-20 right-4 top-[35%]"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className={`${glass} px-3 py-2.5`}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-[8px] font-bold uppercase tracking-wide text-white/45">
              Performance
            </span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[20px] font-black text-white leading-none">100</span>
            <span className="text-[8px] text-white/30">/100</span>
          </div>
          <div className="flex gap-0.5 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[2.5px] rounded-full bg-emerald-400/65"
                aria-hidden="true"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating glass card: Client Rating 5.0 — left shoulder zone ── */}
      <motion.div
        initial={{ opacity: 0, x: -16, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 1.05, ease }}
        className="absolute z-20 left-4 top-[45%]"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className={`${glass} px-3 py-2.5`}
        >
          <span className="text-[8px] font-bold uppercase tracking-wide text-white/45 block mb-1.5">
            Client Rating
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[20px] font-black text-white leading-none">5.0</span>
            <span className="text-[8px] text-white/30">/5</span>
          </div>
          <div className="flex gap-0.5 mt-1.5" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="8" height="8" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Name badge — lower-left, identifies Mandela ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 1.2 }}
        className="absolute z-20 left-4 top-[68%]"
      >
        <div
          className="bg-black/55 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          <p className="text-[11px] font-bold text-white leading-tight">Mandela Atud</p>
          <p className="text-[8px] text-white/40 tracking-[0.07em] uppercase mt-0.5">
            Founder & CEO · COBRYKZ
          </p>
        </div>
      </motion.div>

      {/* ── Text — anchored to bottom of viewport ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 px-6 pb-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-3.5 h-px bg-[#2563EB]" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#2563EB]">
            Premium Digital Solutions
          </span>
        </motion.div>

        {/* Headline — 3D text-shadow on COMPETE gives letters physical thickness */}
        <div className="mb-4">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="block text-[13px] font-medium text-white/30 tracking-wide mb-0.5"
          >
            Your Business Deserves to
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.38, ease }}
            className="block text-[68px] font-black leading-[0.86] tracking-[-0.05em] text-[#2563EB]"
            style={{
              textShadow: [
                "0 1px 0 rgba(0,50,170,0.55)",
                "0 2px 0 rgba(0,35,130,0.38)",
                "0 3px 0 rgba(0,22,90,0.22)",
                "0 6px 20px rgba(0,0,0,0.55)",
              ].join(", "),
            }}
          >
            COMPETE
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.46, ease }}
            className="block text-[13px] font-medium text-white/30 tracking-wide mt-1"
          >
            at the Highest Level.
          </motion.span>
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.54, ease }}
          className="text-[14px] text-white/50 leading-[1.72] mb-6 max-w-[270px]"
        >
          Premium websites that help local businesses earn trust, attract
          better clients, and grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.62, ease }}
          className="flex items-center gap-4 mb-6"
        >
          {/* Primary — 3D bottom-face shadow makes button look pressable */}
          <a
            href="#contact"
            className="shimmer inline-flex items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150 active:scale-[0.97] active:translate-y-[2px]"
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

          {/* Secondary */}
          <a
            href="#our-standard"
            className="text-white/35 hover:text-white/70 text-[12px] font-medium transition-colors duration-150 group inline-flex items-center gap-1"
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

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease }}
          className="flex items-center gap-2"
        >
          <div className="flex -space-x-1.5">
            {["MA", "LF", "RK", "JT"].map((init, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-[#334155] to-[#1E293B] border border-[#06090F] flex items-center justify-center text-[5px] font-bold text-white/50"
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.45)" }}
                aria-hidden="true"
              >
                {init}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-white/30">
            Trusted across 10+ industries
          </span>
        </motion.div>

      </div>
    </div>
  );
}
