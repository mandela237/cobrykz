"use client";

import { motion } from "framer-motion";
import { MessageCircle, Compass, Code2, Rocket } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const steps = [
  {
    icon: MessageCircle,
    title: "Discovery Call",
    duration: "30 min",
    description: "A focused conversation about your business, your goals, and whether we are the right fit.",
    bg: "30",
  },
  {
    icon: Compass,
    title: "Strategy & Design",
    duration: "2–3 days",
    description: "A complete visual blueprint — layout, content, and brand direction — before a line of code.",
    bg: "60",
  },
  {
    icon: Code2,
    title: "Build & Review",
    duration: "4–7 days",
    description: "Your site is built in code and staged for review. You sign off before anything goes live.",
    bg: "90",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    duration: "Ongoing",
    description: "We go live, monitor performance, and stay available for updates and improvements.",
    bg: "∞",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-14 sm:py-20 lg:py-32 bg-[#080E1C] dot-grid overflow-hidden"
      aria-label="Our process"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 75% 55% at 50% -5%, rgba(99,102,241,0.25) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 45% at 5% 95%, rgba(37,99,235,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 35% 35% at 95% 50%, rgba(37,99,235,0.08) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Header — no eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="max-w-xl mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.1] mb-4"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Done in 1–2 weeks.
            <br />
            <span className="font-serif italic font-normal tracking-normal">No surprises.</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-white/65 leading-[1.8]">
            Most agencies quote 6–12 weeks. We deliver complete, high-quality
            websites in 1–2 weeks — without cutting corners on quality or
            communication.
          </p>
        </motion.div>

        {/* Step cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group relative rounded-2xl p-4 sm:p-5 flex flex-col gap-4 overflow-hidden
                  bg-[#0B1426]/90 border border-white/[0.12]
                  hover:bg-[#0E1A30] hover:border-white/[0.2]
                  transition-all duration-300"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Top edge glow on hover */}
                <div
                  className="absolute inset-x-6 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), transparent)" }}
                  aria-hidden="true"
                />

                {/* Large decorative number — background texture */}
                <div
                  className="absolute bottom-1 right-2 text-[80px] sm:text-[96px] font-black leading-none select-none pointer-events-none"
                  aria-hidden="true"
                  style={{ color: "rgba(255,255,255,0.028)" }}
                >
                  {step.bg}
                </div>

                {/* Icon */}
                <div
                  className="w-[42px] h-[42px] sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
                    boxShadow: "0 4px 16px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                  aria-hidden="true"
                >
                  <Icon size={18} className="text-white" strokeWidth={1.75} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5 flex-1 relative z-10">
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-white tracking-[-0.02em] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-white/65 leading-[1.65]">
                    {step.description}
                  </p>
                </div>

                {/* Duration badge */}
                <span className="relative z-10 inline-flex items-center text-[10px] font-semibold text-[#60A5FA] bg-blue/[0.12] border border-[#2563EB]/[0.2] px-2.5 py-1 rounded-full w-fit">
                  {step.duration}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="relative rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6
            bg-[#0B1426]/90 border border-white/[0.12]"
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-3xl pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.5) 50%, transparent 100%)" }}
            aria-hidden="true"
          />
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-blue mb-2">
              Step one is free
            </p>
            <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-white tracking-[-0.02em] mb-1">
              Ready to start the conversation?
            </h3>
            <p className="text-[13px] text-white/55">
              A 30-minute call is all it takes to find out if we are the right fit.
            </p>
          </div>
          <a
            href="#contact"
            className="shimmer flex-shrink-0 inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-150 active:scale-[0.98]"
            style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}
          >
            Book a Discovery Call
          </a>
        </motion.div>

      </div>
    </section>
  );
}
