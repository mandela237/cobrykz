"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import CobrykzLogo from "../CobrykzLogo";

const businessTypes = [
  "Restaurant / Food Service",
  "Barbershop / Hair Salon",
  "Medical / Dental Practice",
  "Law Firm",
  "Construction / Trades",
  "Cleaning Service",
  "Church / Nonprofit",
  "Real Estate",
  "Retail",
  "Fitness / Wellness",
  "Professional Services",
  "Other",
];

interface FormState {
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  message: string;
}

export default function FinalCTA() {
  const [form, setForm] = useState<FormState>({
    name: "",
    businessName: "",
    businessType: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full text-[14px] font-normal px-4 py-3.5 rounded-xl border border-white/[0.16] bg-[#08111F] text-white placeholder:text-white/50 outline-none transition-all duration-150 focus:border-[#3B82F6]/70 focus:bg-[#060D19] focus:ring-2 focus:ring-[#2563EB]/20";

  return (
    <section
      id="contact"
      className="relative py-14 sm:py-20 lg:py-32 bg-navy dot-grid"
      aria-label="Contact us"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 60% 70% at 85% 40%, rgba(37,99,235,0.20) 0%, transparent 60%)",
            "radial-gradient(ellipse 45% 55% at 15% 65%, rgba(99,102,241,0.13) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Personal note */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
            className="lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.1] mb-6">
              Ready to build
              <br />
              <span className="font-serif italic font-normal tracking-normal">something real?</span>
            </h2>

            <p className="text-[14px] sm:text-[16px] text-white/75 leading-[1.75] mb-8">
              Fill out the form and I will personally review your project and
              reach out within 24 hours to schedule a discovery call. No
              automated responses. No sales pitch. Just a real conversation
              about your business.
            </p>

            {/* What to expect */}
            <div className="space-y-3 mb-10">
              {[
                "30-minute discovery call, no charge",
                "Honest assessment of what you need",
                "Clear pricing within 24 hours",
                "No pressure. No obligation.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-[#16A34A] flex-shrink-0" strokeWidth={2} />
                  <span className="text-[14px] text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Founder signature */}
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center">
                <CobrykzLogo size={22} variant="reversed" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">Mandela Atud</p>
                <p className="text-[11px] text-white/60">Founder & CEO, COBRYKZ</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#08111F]/95 border border-white/[0.16] rounded-3xl p-10 text-center"
                  style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 12px 34px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.08)" }}
              >
                <div className="w-16 h-16 rounded-full bg-[#16A34A]/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-[#16A34A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[22px] font-extrabold text-white tracking-[-0.02em] mb-3">
                  Message received.
                </h3>
                <p className="text-[15px] text-white/75 leading-[1.7] mb-6">
                  Mandela will review your project personally and reach out
                  within 24 hours to schedule your discovery call.
                </p>
                <div className="space-y-3 text-left bg-[#0B1426] border border-white/[0.1] rounded-2xl p-5">
                  <p className="text-[12px] font-bold text-white/60 uppercase tracking-[0.1em] mb-3">
                    What happens next
                  </p>
                  {[
                    "You receive a confirmation email",
                    "Mandela reviews your project details",
                    "You are contacted within 24 hours",
                    "Discovery call scheduled at your convenience",
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue/20 text-blue flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[13px] text-white/75">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#08111F]/95 border border-white/[0.16] rounded-3xl p-7 lg:p-9 space-y-5"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 12px 34px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="name">
                      Your Name <span className="text-[#DC2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Mandela Atud"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="businessName">
                      Business Name <span className="text-[#DC2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      placeholder="Your Business Name"
                      value={form.businessName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="businessType">
                    Business Type <span className="text-[#DC2626]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      value={form.businessType}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="" disabled>Select your industry</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-light pointer-events-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="email">
                      Email Address <span className="text-[#DC2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (000) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-white/75 mb-2" htmlFor="message">
                    Tell us about your project <span className="text-[#DC2626]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your business and what you're looking to build or improve..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="shimmer w-full bg-blue hover:bg-blue-dark text-white text-[15px] font-semibold py-4 rounded-xl transition-colors duration-150 active:scale-[0.99] shadow-[0_4px_24px_rgba(37,99,235,0.35)]"
                >
                  Send My Project Details
                </button>

                <p className="text-center text-[11px] text-white/60 leading-snug">
                  By submitting, you agree that Mandela Atud will contact you
                  directly. No spam. No automated responses.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
