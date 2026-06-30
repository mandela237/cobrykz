"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What does a premium website cost?",
    a: "Pricing depends on the scope and complexity of the project. Projects generally start from $500, and most business websites fall between $1,500 and $5,000. Custom web applications are priced separately. We do not believe in one-size-fits-all pricing — your quote is built around what your business actually needs. Book a discovery call and we will give you a clear, honest number within 24 hours.",
  },
  {
    q: "How long does a project take?",
    a: "Most business websites are live within 1–2 weeks from kickoff. This includes design, development, revisions, and final quality checks. More complex projects — booking systems, custom applications — may take a little longer. We will always give you a timeline before we start, and we honor it.",
  },
  {
    q: "What do I need to get started?",
    a: "Not much. You need a clear idea of your business, a logo (or we can discuss branding), and a willingness to give us direction during the design phase. We handle everything technical — domain setup, hosting guidance, analytics, performance optimization. You just need to show up and give feedback.",
  },
  {
    q: "Do you use templates?",
    a: "Never. Every COBRYKZ website is built from scratch, in code, for your business specifically. We do not use Wix, Squarespace, WordPress themes, or any pre-built templates. This is a non-negotiable part of our standard.",
  },
  {
    q: "How many revisions are included?",
    a: "We include two full revision rounds in every project — one after the design phase and one after development. Most projects are approved before we reach the second round. We do not charge for small adjustments after launch if they are within reasonable scope.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. After launch, we offer a monthly support retainer for businesses that want ongoing updates, content changes, and performance monitoring. We also provide a 30-day free support window after every launch to address any issues.",
  },
  {
    q: "What technology do you use?",
    a: "We build with Next.js, React, TypeScript, and Tailwind CSS — the same technology stack used by major technology companies. Your website will be fast, accessible, easy to maintain, and built to scale. We do not use outdated or bloated technology.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the contact form below or reach out directly. We will set up a 30-minute discovery call at no charge. No pitch, no pressure — just a conversation about your business and whether we are the right fit for each other.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-navy group-hover:text-blue transition-colors duration-150 leading-snug">
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 group-hover:bg-blue-tint flex items-center justify-center transition-colors duration-150">
          {open ? (
            <Minus size={14} className="text-blue" strokeWidth={2} />
          ) : (
            <Plus size={14} className="text-slate" strokeWidth={2} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1.0] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[14px] text-slate leading-[1.75] max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-14 sm:py-20 lg:py-32 bg-white"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
            className="lg:sticky lg:top-28"
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.035em] text-navy leading-[1.12] mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Questions we
              <br />
              <span className="font-serif italic font-normal tracking-normal">get asked.</span>
            </h2>
            <p className="text-[13px] sm:text-[15px] text-slate leading-[1.7] mb-8">
              Honest answers to the questions businesses ask before hiring a
              web development company.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-blue hover:text-blue-dark transition-colors"
            >
              Have a different question? &rarr;
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] }}
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
