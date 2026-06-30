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

export default function Services() {
  return (
    <section
      id="services"
      className="py-14 sm:py-20 lg:py-32 bg-gray-light"
      aria-label="Services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header — no eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="max-w-xl mb-10 sm:mb-14"
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-[2.75rem] font-extrabold tracking-[-0.035em] text-navy leading-[1.12] mb-5"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Services Designed to
            <br />
            <span className="font-serif italic font-normal tracking-normal">Grow Your Business</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] text-slate leading-[1.7] max-w-[420px]">
            Every service is built around one outcome: more clients. We handle
            the technology — you focus on what you do best.
          </p>
        </motion.div>

        {/* Featured: Website Design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="bg-navy rounded-2xl p-5 sm:p-8 lg:p-10 mb-4 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-center"
        >
          <div>
            <span className="inline-flex items-center text-[10px] font-bold tracking-[0.08em] uppercase bg-blue text-white px-3 py-1.5 rounded-full mb-5">
              Most Popular
            </span>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <Globe size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif italic font-normal text-[24px] sm:text-[28px] text-white tracking-normal">
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
              className="shimmer inline-flex items-center gap-2 bg-blue hover:bg-blue-dark text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-colors duration-150 whitespace-nowrap"
            >
              Start a Project
            </a>
          </div>
        </motion.div>

        {/* Secondary services — editorial list, not card grid */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E2E8F0" }}
        >
          {secondaryServices.map((service, i) => {
            const Icon = service.icon;
            const isComingSoon = service.tag === "Coming Soon";
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05, ease }}
                className={`group flex items-center gap-5 sm:gap-7 px-5 sm:px-8 py-5 sm:py-6 transition-colors duration-200 ${
                  i < secondaryServices.length - 1 ? "border-b border-border" : ""
                } ${isComingSoon ? "opacity-55" : "hover:bg-[#F0F6FF] cursor-default"}`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                    !isComingSoon ? "group-hover:scale-105" : ""
                  }`}
                  style={{
                    background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} className="text-blue" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5 sm:mb-1.5 flex-wrap">
                    <h3
                      className={`text-[14px] sm:text-[16px] font-bold tracking-[-0.01em] transition-colors duration-200 ${
                        isComingSoon
                          ? "text-navy"
                          : "text-navy group-hover:text-blue"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {isComingSoon && (
                      <span className="text-[10px] font-bold tracking-[0.06em] uppercase bg-gray-100 text-slate px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="hidden sm:block text-[13px] sm:text-[14px] text-slate leading-[1.65]">
                    {service.description}
                  </p>
                </div>

                {!isComingSoon && (
                  <span
                    className="flex-shrink-0 text-blue text-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
