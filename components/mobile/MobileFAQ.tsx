"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const questions = [
  {
    question: "What will my website cost?",
    answer:
      "After a short call, I send a proposal that states the scope, price, and payment timing before you make a decision.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "A focused business website can often launch in one to two weeks. Larger sites and custom tools receive a schedule before work begins.",
  },
  {
    question: "What do I need to start?",
    answer:
      "An understanding of your services, customers, and goals is enough for the first call. Existing content can be refined as part of the work.",
  },
  {
    question: "Do you use templates?",
    answer:
      "I do not reskin a pre-built theme and sell it as custom work. The message, structure, and visual direction are shaped for your business.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Support can cover updates, performance reviews, improvements, and new functionality based on how often the site needs to change.",
  },
];

export default function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="m-faq" className="m-section bg-white">
      <div className="m-shell">
        <p className="m-kicker text-blue">Quick answers</p>
        <h2 className="m-title mt-3 text-navy">
          Straight answers, without the sales script.
        </h2>

        <div
          data-editorial-surface="faq"
          className="mt-7 overflow-hidden rounded-lg border border-border bg-gray-light/75 px-4 shadow-[0_12px_34px_rgba(11,23,40,0.055)]"
        >
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-faq-${index}`}
                  className="grid min-h-[64px] w-full grid-cols-[1fr_32px] items-center gap-4 text-left"
                >
                  <span className="text-[13px] font-semibold leading-5 text-navy">
                    {item.question}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-blue">
                    {isOpen ? (
                      <Minus size={15} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Plus size={15} strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div id={`mobile-faq-${index}`} className="pb-5 pr-9">
                    <p className="text-[13px] leading-5 text-slate">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
