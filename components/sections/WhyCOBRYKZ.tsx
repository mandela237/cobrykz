"use client";

import { motion } from "framer-motion";
import { FileX, UserCheck, Award, Clock, Code2 } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const differentiators = [
  {
    icon: FileX,
    title: "No Templates. Ever.",
    description:
      "Every project starts from a blank canvas. Your business is unique — your website should be too. We never recycle layouts or use pre-built themes.",
  },
  {
    icon: UserCheck,
    title: "Direct Founder Access",
    description:
      "You work directly with Mandela Atud, not a junior account manager. Every decision, every design review — the same person, from start to finish.",
  },
  {
    icon: Award,
    title: "Premium Quality, Built to Last",
    description:
      "We build websites that still feel premium in three years. No shortcuts in code, no compromises in design, no cutting corners on performance.",
  },
  {
    icon: Clock,
    title: "Long-term Thinking",
    description:
      "We are not a vendor. We are a partner. Our work is designed to scale with your business, and our relationship does not end at launch.",
  },
  {
    icon: Code2,
    title: "Full-Stack Capability",
    description:
      "From initial design to deployed production code — we handle it all in-house. No outsourcing, no handoffs, no communication gaps.",
  },
];

export default function WhyCOBRYKZ() {
  return (
    <section
      id="why-cobrykz"
      className="py-24 lg:py-32 bg-white"
      aria-label="Why COBRYKZ"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky thesis column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="lg:sticky lg:top-28"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-[#0F172A] leading-[1.1] mb-7">
              Built different.
              <br />
              By design.
            </h2>
            <p className="text-[16px] text-[#64748B] leading-[1.75] mb-8">
              Most agencies will give you a templated website, a junior
              designer, and a 12-week timeline. We do the opposite.
            </p>
            <p className="text-[16px] text-[#64748B] leading-[1.75] mb-12">
              COBRYKZ exists for business owners who are serious about their
              digital presence and understand that the right investment pays
              for itself many times over.
            </p>

            {/* Pull quote — the closing argument */}
            <blockquote>
              <p className="text-[21px] sm:text-[24px] font-extrabold text-[#0F172A] leading-[1.35] tracking-[-0.025em] mb-5">
                &ldquo;If COBRYKZ puts this much care into its own business,
                I want them to build mine.&rdquo;
              </p>
              <footer className="text-[12px] text-[#94A3B8] tracking-[0.08em] uppercase">
                The standard we hold ourselves to
              </footer>
            </blockquote>
          </motion.div>

          {/* Right — differentiator rows */}
          <div className="divide-y divide-[#E2E8F0]">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  className="group flex gap-5 py-7 hover:bg-[#F8FAFC] -mx-4 px-4 rounded-xl transition-colors duration-150"
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <Icon
                      size={20}
                      className="text-[#2563EB]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors duration-150">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#64748B] leading-[1.65]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
