"use client";

import { motion } from "framer-motion";
import { Globe, LayoutTemplate, Cpu, Zap, Palette, Search } from "lucide-react";

const ease = [0.0, 0.0, 0.2, 1.0] as [number, number, number, number];

const secondaryServices = [
  {
    icon: LayoutTemplate,
    title: "Web Applications",
    description:
      "Custom booking systems, client portals, and internal tools built to handle the specific way your business operates.",
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    description:
      "AI-powered tools integrated into your website or workflow — chatbots, automation, and intelligent lead capture.",
    tag: "Coming Soon",
  },
  {
    icon: Zap,
    title: "Business Automation",
    description:
      "Systems that save you hours every week by automating repetitive tasks — from follow-ups to scheduling.",
    tag: "Coming Soon",
  },
  {
    icon: Palette,
    title: "Branding",
    description:
      "Logo design, brand identity, and visual systems that make your business look like it belongs at the top of your industry.",
  },
  {
    icon: Search,
    title: "SEO & Growth",
    description:
      "Google Business Profile optimization, SEO foundations, and analytics setup so new clients can find you online.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[#F8FAFC]"
      aria-label="Services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="max-w-xl mb-12"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB] mb-4">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0F172A] leading-[1.15] mb-5">
            Services Designed to
            <br />
            Grow Your Business
          </h2>
          <p className="text-[16px] text-[#64748B] leading-[1.7]">
            Every service we offer is built around one outcome: more clients for
            your business. We handle the technology. You focus on what you do
            best.
          </p>
        </motion.div>

        {/* Featured: Website Design */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="bg-[#0F172A] rounded-2xl p-8 lg:p-10 mb-5 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center"
        >
          <div>
            <span className="inline-flex items-center text-[10px] font-bold tracking-[0.08em] uppercase bg-[#2563EB] text-white px-3 py-1.5 rounded-full mb-5">
              Most Popular
            </span>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center flex-shrink-0">
                <Globe size={22} className="text-[#2563EB]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[22px] font-bold text-white tracking-[-0.02em]">
                Website Design
              </h3>
            </div>
            <p className="text-[15px] text-white/60 leading-[1.7] max-w-xl">
              Custom-built websites that reflect your brand, convert visitors,
              and grow your business — no templates, ever.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="shimmer inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-150 whitespace-nowrap"
            >
              Start a Project
            </a>
          </div>
        </motion.div>

        {/* Secondary services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryServices.map((service, i) => {
            const Icon = service.icon;
            const isComingSoon = service.tag === "Coming Soon";
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className={`group relative bg-white border rounded-2xl p-7 transition-all duration-200 ${
                  isComingSoon
                    ? "border-[#E2E8F0] opacity-65 cursor-default"
                    : "border-[#E2E8F0] cursor-default hover:border-[#2563EB]/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.10),0_12px_40px_rgba(0,0,0,0.09)] hover:-translate-y-1"
                }`}
              >
                {isComingSoon && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.06em] uppercase bg-[#F1F5F9] text-[#64748B] px-2.5 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 ${
                    isComingSoon ? "bg-[#EFF6FF]" : "bg-[#EFF6FF] group-hover:bg-[#2563EB]"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-colors duration-200 ${
                      isComingSoon ? "text-[#2563EB]" : "text-[#2563EB] group-hover:text-white"
                    }`}
                  />
                </div>

                <h3
                  className={`text-[17px] font-bold tracking-[-0.01em] mb-2.5 transition-colors duration-200 ${
                    isComingSoon ? "text-[#0F172A]" : "text-[#0F172A] group-hover:text-[#2563EB]"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-[14px] text-[#64748B] leading-[1.65]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
