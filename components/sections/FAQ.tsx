"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const questions = [
  {
    question: "What does a website project cost?",
    answer:
      "Pricing depends on the number of pages, content needs, and any custom functionality. After a short discovery call, you receive a clear proposal with the scope, price, and payment schedule before deciding whether to move forward.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused business website can often move from kickoff to launch in one to two weeks. Larger sites, booking systems, portals, or content-heavy projects take longer. The timeline is agreed before work begins.",
  },
  {
    question: "What do I need before we start?",
    answer:
      "A clear understanding of your services, your customers, and what you want the website to change is enough for the first call. Existing brand assets and content are helpful, but they do not need to be perfect before we speak.",
  },
  {
    question: "Do you use templates?",
    answer:
      "No pre-built themes are reskinned and sold as custom work. Reusable code patterns may support quality and speed behind the scenes, but the strategy, structure, and visual system are developed for your business.",
  },
  {
    question: "How are revisions handled?",
    answer:
      "The direction is reviewed early so large decisions are settled before the full build. Your proposal defines the review stages and included revisions, which keeps feedback focused and prevents surprise costs.",
  },
  {
    question: "Can you support the site after launch?",
    answer:
      "Yes. Support can cover updates, small improvements, performance reviews, and new functionality. The right arrangement depends on how often your business expects the site to change.",
  },
  {
    question: "Do you build web apps, AI tools, or automation?",
    answer:
      "Yes, when the technology solves a clear business problem. These projects begin with the workflow and desired outcome, then use the simplest reliable system that can do the job.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-light py-20 md:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
            Common questions
          </p>
          <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
            Clear answers before you commit.
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] leading-[1.8] text-slate">
            If your question is more specific, include it in your project note.
            You will get a direct answer from Mandela.
          </p>
        </div>

        <div className="border-t border-border">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-border">
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
