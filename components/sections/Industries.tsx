"use client";

import { motion } from "framer-motion";

const industries = [
  "Restaurants",
  "Barbershops",
  "Hair Salons",
  "Law Firms",
  "Medical Practices",
  "Construction Companies",
  "Cleaning Services",
  "Churches",
  "Nonprofits",
  "Real Estate",
  "African-Owned Businesses",
  "Dental Practices",
  "Spas & Wellness",
  "Auto Shops",
  "Accountants",
  "Coaches & Consultants",
  "Event Planners",
  "Fitness Studios",
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const tag = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] },
  },
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="py-24 lg:py-32 bg-[#0F172A] overflow-hidden"
      aria-label="Industries we serve"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB] mb-4">
            Industries Served
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-white leading-[1.15] mb-5">
            We build for businesses
            <br />
            like yours.
          </h2>
          <p className="text-[16px] text-white/50 leading-[1.75]">
            Every industry has its own language, its own clients, and its own
            standards. We speak yours — and we build websites that make your
            visitors feel at home from the first second.
          </p>
        </motion.div>

        {/* Tag cloud */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry}
              variants={tag}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/05 border border-white/10 hover:bg-white/08 hover:border-white/18 transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
              <span className="text-[13px] font-medium text-white/75 tracking-[0.01em]">
                {industry}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          className="text-center mt-12"
        >
          <p className="text-[14px] text-white/35 mb-4">
            Don&apos;t see your industry listed?
          </p>
          <a
            href="#contact"
            className="text-[14px] font-semibold text-[#2563EB] hover:text-[#3b82f6] transition-colors"
          >
            We work with any business — reach out &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
