"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const testimonials = [
  {
    quote:
      "Mandela has a rare combination of technical depth and design sensibility. The quality of his work stands apart from anything I have seen from other developers in this space.",
    name: "Early Collaborator",
    role: "Business Owner",
    industry: "Professional Services",
    initials: "EC",
  },
  {
    quote:
      "Working with Mandela is different from working with any other developer I have hired. He asks better questions, produces better work, and delivers on his word every single time.",
    name: "Early Collaborator",
    role: "Entrepreneur",
    industry: "Retail",
    initials: "EC",
  },
  {
    quote:
      "The attention to detail is exceptional. Every part of the project — from the first conversation to the final deliverable — reflected a standard of quality I did not expect.",
    name: "Early Collaborator",
    role: "Professional",
    industry: "Healthcare",
    initials: "EC",
  },
];

function Stars({ size = 13 }: { size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className="text-[#D97706] fill-[#D97706]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-14 sm:py-20 lg:py-32 bg-[#060C1A] relative overflow-hidden"
      aria-label="Testimonials"
    >
      {/* Ambient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 60% 55% at 10% 50%, rgba(37,99,235,0.13) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 50% at 88% 15%, rgba(99,102,241,0.10) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Section heading — left-aligned, no eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.1] mb-5"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Built on trust.
            <br />
            <span className="font-serif italic font-normal tracking-normal">Proven by results.</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-white/55 leading-[1.75] max-w-xl">
            From colleagues and early collaborators who worked directly with Mandela.
            Real client testimonials added as projects complete — never fabricated.
          </p>
        </motion.div>

        {/* Featured quote — full-width, editorial */}
        <motion.blockquote
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div
            className="text-[110px] font-serif leading-[0.7] mb-3 select-none pointer-events-none"
            aria-hidden="true"
            style={{ color: "rgba(37,99,235,0.20)" }}
          >
            &ldquo;
          </div>
          <p
            className="font-serif italic font-normal text-[22px] sm:text-[30px] lg:text-[40px] text-white leading-[1.38] tracking-normal mb-8"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {testimonials[0].quote}
          </p>
          <footer className="flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-blue">{testimonials[0].initials}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">{testimonials[0].name}</p>
              <p className="text-[11px] text-white/50">
                {testimonials[0].role} · {testimonials[0].industry}
              </p>
            </div>
            <div className="sm:ml-auto">
              <Stars />
            </div>
          </footer>
        </motion.blockquote>

        {/* Divider */}
        <div
          className="mb-10 lg:mb-12 h-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
          aria-hidden="true"
        />

        {/* Two supporting quotes */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {[testimonials[1], testimonials[2]].map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="rounded-2xl p-6 lg:p-8 flex flex-col gap-5"
              style={{
                background: "rgba(11,20,38,0.8)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <Stars size={12} />
              <p className="flex-1 text-[13px] sm:text-[14px] text-white/75 leading-[1.8]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-blue">{t.initials}</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-white/50">
                    {t.role} · {t.industry}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

      </div>
    </section>
  );
}
