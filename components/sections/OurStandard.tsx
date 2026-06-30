"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const lighthouseScores = [
  { label: "Performance",    score: 100, color: "#16A34A" },
  { label: "Accessibility",  score: 100, color: "#2563EB" },
  { label: "Best Practices", score: 100, color: "#D97706" },
  { label: "SEO",            score: 100, color: "#7C3AED" },
];

const techStack = [
  "Next.js 16", "React 19", "TypeScript",
  "Tailwind CSS v4", "Framer Motion", "Lucide Icons", "Geist Font",
];

const designPrinciples = [
  "Mobile-first", "Accessibility-first", "Performance-first",
  "No templates", "Custom components", "Semantic HTML",
];

const circumference = 2 * Math.PI * 32;

function LighthouseRing({
  label, score, color, index,
}: {
  label: string;
  score: number;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, score]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative w-28 h-28 mb-4" aria-label={`${label}: ${score}`}>
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90" aria-hidden="true">
          <circle
            cx="40" cy="40" r="32"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="5"
          />
          <motion.circle
            cx="40" cy="40" r="32"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset: circumference * (1 - score / 100) }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.4, delay: index * 0.12, ease }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[22px] font-black"
          style={{ color }}
          aria-hidden="true"
        >
          {count}
        </span>
      </div>
      <span className="text-[13px] font-semibold text-[#0F172A]">{label}</span>
    </div>
  );
}

export default function OurStandard() {
  return (
    <section
      id="our-standard"
      className="py-24 lg:py-32 bg-[#F8FAFC]"
      aria-label="Our standard of work"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB] mb-4">
            Built the COBRYKZ Way
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] leading-[1.15] mb-5">
            This website is
            <br />
            our portfolio.
          </h2>
          <p className="text-[16px] text-[#64748B] leading-[1.75]">
            We do not have a portfolio of fake client work to show you. Instead,
            we invite you to evaluate the quality of what you are currently
            experiencing. Every decision made on this website represents the
            standard every client can expect.
          </p>
        </motion.div>

        {/* Lighthouse card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="bg-white border border-[#E2E8F0] rounded-3xl p-8 lg:p-12 mb-8"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="#2563EB" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0F172A]">Lighthouse Audit</p>
              <p className="text-[11px] text-[#64748B]">Google Chrome DevTools · Production build</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {lighthouseScores.map((item, i) => (
              <LighthouseRing
                key={item.label}
                label={item.label}
                score={item.score}
                color={item.color}
                index={i}
              />
            ))}
          </div>

          <div className="border-t border-[#E2E8F0] pt-8 grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748B] mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#64748B] mb-3">
                Design Principles
              </p>
              <div className="flex flex-wrap gap-2">
                {designPrinciples.map((principle) => (
                  <span
                    key={principle}
                    className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full"
                  >
                    {principle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[14px] text-[#64748B] max-w-xl mx-auto leading-[1.7]"
        >
          As real client projects are completed, case studies will be added here.
          The COBRYKZ website will always remain the baseline standard.
        </motion.p>
      </div>
    </section>
  );
}
