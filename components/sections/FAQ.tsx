"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const questions = [
  {
    question: "What does a website project cost?",
    answer:
      "The price depends on the number of pages, the content work, and any custom functionality. After a short discovery call, I send a proposal that states the scope, price, and payment schedule before you decide whether to move forward.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused business website can often move from kickoff to launch in one to two weeks. Larger sites, booking systems, portals, and content-heavy projects take longer. We agree on the schedule before work begins.",
  },
  {
    question: "What do I need before we start?",
    answer:
      "An understanding of your services, your customers, and what the website needs to improve is enough for the first call. Existing brand assets and content help, but they do not need to be polished before we speak.",
  },
  {
    question: "Do you use templates?",
    answer:
      "I do not reskin a pre-built theme and sell it as custom work. Proven code patterns may help with quality and speed behind the scenes, but the strategy, structure, and visual system are developed for your business.",
  },
  {
    question: "How are revisions handled?",
    answer:
      "We review the direction early, while the important decisions are still easy to change. Your proposal states the review stages and included revisions, keeping feedback focused and costs predictable.",
  },
  {
    question: "Can you support the site after launch?",
    answer:
      "Yes. Support can cover updates, small improvements, performance reviews, and new functionality. The right arrangement depends on how often the site is likely to change.",
  },
  {
    question: "Do you build web apps, AI tools, or automation?",
    answer:
      "Yes, when the technology solves a clear business problem. We begin with the workflow and the result you need, then choose the simplest reliable system that can do the job.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white pb-24 pt-20 md:pb-32 md:pt-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
            Common questions
          </p>
          <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
            Straight answers before you commit to anything.
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] leading-[1.8] text-slate">
            Have a more specific question? Add it to your project note and I
            will answer it directly.
          </p>
        </div>

        <div
          data-editorial-surface="faq"
          className="overflow-hidden rounded-lg border border-border bg-gray-light px-6 shadow-[0_16px_48px_rgba(11,23,40,0.045)] md:px-8"
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
                  className="flex min-h-[72px] w-full items-center justify-between gap-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[16px] font-semibold leading-6 text-navy md:text-[18px]">
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border bg-white text-blue transition-colors hover:border-blue/25">
                    {isOpen ? (
                      <Minus size={17} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Plus size={17} strokeWidth={2} aria-hidden="true" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-answer-${index}`} className="pb-6 pr-12">
                    <p className="max-w-[720px] text-[14px] leading-7 text-slate md:text-[15px]">
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
