"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Cpu, BarChart2 } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(24px)", scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease } },
};

const chipClass =
  "flex items-center gap-2.5 backdrop-blur-xl bg-white/[0.07] border border-white/20 rounded-2xl px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] whitespace-nowrap";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen bg-[#0F172A] pt-16"
      aria-label="Hero"
    >
      {/* Dot grid — very low opacity to feel like depth, not decoration */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Background bloom — light source from upper-right, where the portrait is */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 70% 75% at 88% 30%, rgba(37,99,235,0.24) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 40% at 10% 85%, rgba(15,23,42,0.5) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* ── Portrait: fills the right half at md+ ── */}
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[50%] lg:w-[46%] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/mandela-portrait.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="50vw"
          />
        </div>

        {/* Left gradient — portrait dissolves into the dark background */}
        <div
          className="absolute inset-y-0 left-0 w-56 lg:w-72"
          style={{
            background:
              "linear-gradient(to right, #0F172A 0%, #0F172A 10%, rgba(15,23,42,0.88) 35%, rgba(15,23,42,0.4) 65%, transparent 100%)",
          }}
        />
        {/* Bottom gradient — portrait grounds into the page */}
        <div
          className="absolute bottom-0 inset-x-0 h-72"
          style={{
            background:
              "linear-gradient(to top, #0F172A 0%, #0F172A 12%, rgba(15,23,42,0.7) 45%, transparent 100%)",
          }}
        />
        {/* Top gradient — portrait fades into top edge */}
        <div
          className="absolute top-0 inset-x-0 h-32"
          style={{
            background: "linear-gradient(to bottom, #0F172A, transparent)",
          }}
        />
        {/* Subtle tint for editorial depth */}
        <div className="absolute inset-0 bg-[#0F172A]/15" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col justify-center min-h-[calc(100vh-64px)] py-16 lg:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[520px] lg:max-w-[560px] xl:max-w-[600px]"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
            <span className="h-px w-5 bg-[#2563EB]" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB]">
              Premium Digital Solutions
            </span>
          </motion.div>

          {/* Headline — poster treatment */}
          <div className="mb-8">
            <motion.span
              variants={fadeUp}
              className="block text-[17px] sm:text-lg font-medium text-white/35 mb-0.5 tracking-wide"
            >
              Your Business Deserves to
            </motion.span>
            <motion.span
              variants={wordReveal}
              className="block text-[64px] sm:text-[80px] md:text-[72px] lg:text-[92px] xl:text-[108px] font-black leading-[0.86] tracking-[-0.055em] text-[#2563EB]"
            >
              COMPETE
            </motion.span>
            <motion.span
              variants={fadeUp}
              className="block text-[17px] sm:text-lg font-medium text-white/35 mt-1.5 tracking-wide"
            >
              at the Highest Level.
            </motion.span>
          </div>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-[16px] sm:text-[17px] text-white/50 leading-[1.85] mb-10 max-w-[420px]"
          >
            We build premium websites and digital systems that help local
            businesses earn more trust, attract better clients, and grow faster
            — without the agency overhead.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-12">
            <a
              href="#contact"
              className="shimmer inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 active:scale-[0.98] shadow-[0_4px_24px_rgba(37,99,235,0.35),0_1px_0_rgba(255,255,255,0.06)_inset]"
            >
              Book a Discovery Call
            </a>
            <a
              href="#our-standard"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white/90 text-[14px] font-medium transition-colors duration-150 group"
            >
              See Our Standard
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
                →
              </span>
            </a>
          </motion.div>

          {/* Social proof line */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#334155] to-[#1E293B] border-2 border-[#0F172A] flex items-center justify-center text-[7px] font-bold text-white/50"
                  aria-hidden="true"
                >
                  {["MA", "LF", "RK", "JT"][i]}
                </div>
              ))}
            </div>
            <span className="text-[12px] text-white/35">
              Trusted across 10+ industries
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Mobile portrait ── */}
      <div className="md:hidden px-6 pb-16 max-w-sm mx-auto w-full">
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="/mandela-portrait.jpg"
            alt="Mandela Atud — Founder & CEO, COBRYKZ"
            fill
            priority
            className="object-cover object-top"
            sizes="90vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 55%)" }}
          />
          {/* Mobile chips */}
          <div className="absolute bottom-5 left-4 right-4">
            <div className="flex flex-wrap gap-2">
              {[
                { Icon: Globe, label: "Web Design" },
                { Icon: Cpu, label: "AI Solutions" },
                { Icon: BarChart2, label: "Analytics" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-[#0F172A]/70 backdrop-blur border border-white/15 rounded-full px-3 py-1.5">
                  <Icon size={11} className="text-[#2563EB]" strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating chips: Desktop — glassmorphism over portrait ── */}
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease }}
        className="hidden md:block absolute z-20 top-[22%] right-[6%] lg:right-[7%]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
          className={chipClass}
        >
          <Globe size={13} className="text-[#2563EB]" strokeWidth={1.5} />
          <span className="text-[12px] font-semibold text-white/85">Web Design</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 14, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.05, ease }}
        className="hidden md:block absolute z-20 top-[50%] right-[30%] lg:right-[34%] -translate-y-1/2"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className={chipClass}
        >
          <Cpu size={13} className="text-[#2563EB]" strokeWidth={1.5} />
          <span className="text-[12px] font-semibold text-white/85">AI Solutions</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
        className="hidden md:block absolute z-20 top-[70%] right-[8%] lg:right-[10%]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className={chipClass}
        >
          <BarChart2 size={13} className="text-[#2563EB]" strokeWidth={1.5} />
          <span className="text-[12px] font-semibold text-white/85">Analytics</span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0F172A)" }}
        aria-hidden="true"
      />
    </section>
  );
}
