"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CobrykzLogo from "../CobrykzLogo";

const story = [
  {
    act: "Observation",
    text: "I watched talented business owners get overlooked online — not because they lacked quality, but because their digital presence did not reflect it. A barbershop that had been in the community for twenty years, a medical practice run by a brilliant doctor — all of them losing clients to competitors with inferior services but better websites.",
  },
  {
    act: "Belief",
    text: "I believe every business — regardless of size or industry — deserves a digital presence that commands respect. The tools that were once only available to large corporations with big budgets should be accessible to every serious business owner.",
  },
  {
    act: "Decision",
    text: "So I built COBRYKZ. A premium technology company that starts with websites because that is where most businesses need help first. No templates. No junior designers. No outsourced work. Just high-quality, founder-led execution on every single project.",
  },
  {
    act: "Commitment",
    text: "Today, I put my name and my reputation on every project we take on. When you work with COBRYKZ, you work with me directly. That will not change as we grow. Our quality depends on that commitment.",
  },
  {
    act: "Invitation",
    text: "If you are ready to build a digital presence that actually matches the quality of your business, I would like to talk. Not to sell you something. To understand what you are building and see if we can help.",
  },
];

export default function Founder() {
  return (
    <section
      id="founder"
      className="py-24 lg:py-32 bg-[#0F172A] overflow-hidden"
      aria-label="About the founder"
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 15% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative">
              {/* Portrait frame */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 aspect-[3/4] rounded-3xl border border-white/10 overflow-hidden relative">
                {/* Real photo */}
                <Image
                  src="/mandela-portrait.jpg"
                  alt="Mandela Atud — Founder & CEO, COBRYKZ"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 384px, 384px"
                />
                {/* Blue accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                {/* Bottom gradient for name card legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.15) 45%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                {/* Name card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0F172A]/75 backdrop-blur-md border border-white/12 rounded-2xl px-5 py-4">
                  <p className="text-[15px] font-extrabold text-white tracking-[-0.01em]">
                    Mandela Atud
                  </p>
                  <p className="text-[11px] text-white/50 tracking-[0.08em] uppercase mt-0.5">
                    Founder & CEO · COBRYKZ
                  </p>
                </div>
              </div>

              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-[#2563EB]/20 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl border border-[#2563EB]/10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          >
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB] mb-4">
              Founder
            </p>

            {/* Pull quote */}
            <blockquote className="mb-10">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.03em] leading-[1.2]">
                &ldquo;Every business deserves a digital presence that
                commands respect.&rdquo;
              </p>
            </blockquote>

            {/* 5-act story */}
            <div className="space-y-7">
              {story.map((act, i) => (
                <motion.div
                  key={act.act}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
                  }}
                >
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#2563EB]/70 mb-1.5">
                    {act.act}
                  </p>
                  <p className="text-[15px] text-white/65 leading-[1.8]">
                    {act.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/08 flex items-center gap-4"
            >
              <CobrykzLogo size={28} variant="reversed" />
              <div>
                <p className="text-[13px] font-bold text-white">Mandela Atud</p>
                <p className="text-[11px] text-white/40">Founder & CEO, COBRYKZ</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
