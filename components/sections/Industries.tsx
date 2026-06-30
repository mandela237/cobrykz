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
      className="relative py-14 sm:py-20 lg:py-32 bg-navy overflow-hidden"
      aria-label="Industries we serve"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 72% 65% at 50% 50%, rgba(37,99,235,0.11) 0%, transparent 68%)",
            "radial-gradient(ellipse 40% 45% at 90% 10%, rgba(99,102,241,0.09) 0%, transparent 52%)",
          ].join(", "),
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
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] mb-5"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            We build for businesses
            <br />
            <span className="font-serif italic font-normal tracking-normal">like yours.</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-white/70 leading-[1.75]">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B1426]/90 border border-white/[0.14] hover:bg-[#0E1A30] hover:border-white/[0.22] transition-all duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
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
          <p className="text-[14px] text-white/60 mb-4">
            Don&apos;t see your industry listed?
          </p>
          <a
            href="#contact"
            className="text-[14px] font-semibold text-blue hover:text-[#3b82f6] transition-colors"
          >
            We work with any business — reach out &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
