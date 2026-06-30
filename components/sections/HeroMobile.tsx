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
    </div>
  );
}
