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
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.85, ease },
          scale: { duration: 0.85, ease },
        }}
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
    </div>
  );
}
