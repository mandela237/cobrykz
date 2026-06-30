"use client";

import { motion } from "framer-motion";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const differentiators = [
  {
    title: "No Templates. Ever.",
    description:
      "Every project starts from a blank canvas. Your business is unique — your website should be too. We never recycle layouts or use pre-built themes.",
  },
  {
    title: "Direct Founder Access",
    description:
      "You work directly with Mandela Atud, not a junior account manager. Every decision, every design review — the same person, from start to finish.",
  },
  {
    title: "Premium Quality, Built to Last",
    description:
      "We build websites that still feel premium in three years. No shortcuts in code, no compromises in design, no cutting corners on performance.",
  },
  {
    title: "Long-term Thinking",
    description:
      "We are not a vendor. We are a partner. Our work is designed to scale with your business, and our relationship does not end at launch.",
  },
  {
    title: "Full-Stack Capability",
    description:
      "From initial design to deployed production code — we handle it all in-house. No outsourcing, no handoffs, no communication gaps.",
  },
];

export default function WhyCOBRYKZ() {
  return (
    <section
      id="why-cobrykz"
      className="py-14 sm:py-20 lg:py-32 bg-white"
      aria-label="Why COBRYKZ"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — sticky thesis column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="lg:sticky lg:top-28"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-navy leading-[1.1] mb-7"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Built different.
              <br />
              <span className="font-serif italic font-normal tracking-normal">By design.</span>
            </h2>
            <p className="text-[14px] sm:text-[16px] text-slate leading-[1.75] mb-10">
              Most agencies will give you a templated website, a junior
              designer, and a 12-week timeline. We do the opposite.
            </p>

            {/* Elevated blockquote */}
            <blockquote className="relative">
              <div
                className="text-[96px] font-serif leading-[0.72] mb-2 select-none pointer-events-none -ml-1"
                aria-hidden="true"
                style={{ color: "rgba(37,99,235,0.15)" }}
              >
                &ldquo;
              </div>
              <p
                className="font-serif italic font-normal text-[19px] sm:text-[22px] lg:text-[25px] text-navy leading-[1.45] tracking-normal mb-5"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                If COBRYKZ puts this much care into its own business,
                I want them to build mine.
              </p>
              <footer className="text-[11px] text-slate-light tracking-[0.08em] uppercase">
                The standard we hold ourselves to
              </footer>
            </blockquote>
          </motion.div>

          {/* Right — editorial numbered list */}
          <div className="divide-y divide-border">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="group flex gap-5 sm:gap-7 py-8 sm:py-9"
              >
                {/* Decorative number */}
                <div className="flex-shrink-0 w-10 sm:w-14 pt-0.5" aria-hidden="true">
                  <span
                    className="block text-[38px] sm:text-[48px] font-serif italic leading-none select-none"
                    style={{ color: "rgba(37,99,235,0.13)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif italic font-normal text-[18px] sm:text-[21px] text-navy leading-tight tracking-normal mb-2.5 group-hover:text-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-slate leading-[1.72]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
