"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="text-[#D97706] fill-[#D97706]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[#F8FAFC]"
      aria-label="Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB] mb-4">
            What People Are Saying
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] leading-[1.15] mb-5">
            Built on trust.
            <br />
            Proven by results.
          </h2>
          <p className="text-[15px] text-[#64748B] leading-[1.7]">
            These testimonials are from colleagues and early collaborators who
            have worked directly with Mandela. As client projects are completed,
            they will be added here — never fabricated.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
              }}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-7 flex flex-col gap-5"
            >
              <Stars />

              <blockquote className="flex-1">
                <p className="text-[15px] text-[#0F172A] leading-[1.75] font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <footer className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#2563EB]">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A]">{t.name}</p>
                  <p className="text-[11px] text-[#64748B]">
                    {t.role} · {t.industry}
                  </p>
                </div>
              </footer>
            </motion.div>
          ))}
        </div>

        {/* Real client note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-[12px] text-[#94A3B8] mt-8"
        >
          Real client testimonials are added as projects are completed. No
          fabricated reviews, ever.
        </motion.p>
      </div>
    </section>
  );
}
