"use client";

import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Hammer, Rocket } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    duration: "30 minutes",
    description:
      "We start with a conversation, not a pitch. We listen to your goals, your challenges, and what success looks like for your business. You leave with clarity — not a proposal.",
    outcome: "You understand exactly what's possible and how we work.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Design",
    duration: "1–2 weeks",
    description:
      "We design the structure, visual language, and user experience of your website before a single line of code is written. You review and approve everything before we build.",
    outcome: "A complete visual blueprint of your new website.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Build & Review",
    duration: "2–4 weeks",
    description:
      "We build your website using modern technology — fast, accessible, and built to rank on Google. You review the working site and we refine until it is exactly right.",
    outcome: "A live staging site, ready for your final sign-off.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    duration: "Ongoing",
    description:
      "We handle the technical launch, including domain setup, analytics, and performance checks. After launch, we remain available for updates, questions, and growth.",
    outcome: "Your website is live, optimized, and supported.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-white"
      aria-label="Our process"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header — no eyebrow; the h2 stands alone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="max-w-xl mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-[#0F172A] leading-[1.1] mb-5">
            A clear process.
            <br />
            No surprises.
          </h2>
          <p className="text-[16px] text-[#64748B] leading-[1.8]">
            Most projects fail because of poor communication, not poor talent.
            Our process is built to keep you informed, involved, and confident
            at every stage.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="hidden lg:block absolute left-[31px] top-14 bottom-24 w-px"
            style={{
              background:
                "linear-gradient(to bottom, #2563EB 0%, #E2E8F0 40%, #E2E8F0 100%)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  className="flex gap-7 lg:gap-12"
                >
                  {/* Step indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center pt-1 relative">
                    {/* Ghost number — decorative, behind icon */}
                    <span
                      className="absolute -top-3 -left-1 text-[52px] font-black text-[#F1F5F9] leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    {/* Icon circle — sits over ghost number */}
                    <div className="relative z-10 w-[62px] h-[62px] rounded-2xl bg-[#0F172A] flex flex-col items-center justify-center gap-1 shadow-[0_0_0_5px_#ffffff]">
                      <Icon size={20} className="text-[#2563EB]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.025em] text-[#0F172A]">
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-[15px] text-[#64748B] leading-[1.75] mb-4 max-w-2xl">
                      {step.description}
                    </p>
                    <div className="flex items-start gap-2.5">
                      <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="#16A34A" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="text-[13px] font-semibold text-[#0F172A]">
                        {step.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 bg-[#0F172A] rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#2563EB] mb-2">
              Step One is free
            </p>
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-white tracking-[-0.02em] mb-1">
              Ready to start the conversation?
            </h3>
            <p className="text-[14px] text-white/50">
              A 30-minute call is all it takes to find out if we are the right fit.
            </p>
          </div>
          <a
            href="#contact"
            className="shimmer flex-shrink-0 inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-150 active:scale-[0.98]"
          >
            Book a Discovery Call
          </a>
        </motion.div>

      </div>
    </section>
  );
}
