"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "30 min",
    detail:
      "We define the business problem, the audience, and what the current website is failing to do.",
  },
  {
    number: "02",
    title: "Direction",
    duration: "2-3 days",
    detail:
      "You review the message, structure, and visual direction before I commit to the full build.",
  },
  {
    number: "03",
    title: "Build and review",
    duration: "4-7 days",
    detail:
      "I build the responsive site, show you the work in progress, and take it through a focused review.",
  },
  {
    number: "04",
    title: "Launch and care",
    duration: "Ongoing",
    detail:
      "We check the live site, launch it, and agree on the support that makes sense afterward.",
  },
];

export default function MobileProcess() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="m-process"
      data-mobile-process
      className="m-section bg-gray-light"
    >
      <div className="m-shell">
        <p className="m-kicker text-blue">The path to launch</p>
        <h2 className="m-title mt-3 text-navy">
          Four steps, with no black box in the middle.
        </h2>
        <p className="m-body mt-4 text-slate">
          A focused business website can often launch in one to two weeks. We
          agree on the exact schedule before work starts.
        </p>

        <div
          data-editorial-surface="process"
          className="mt-7 overflow-hidden rounded-lg border border-border bg-white px-4 shadow-[0_14px_38px_rgba(11,23,40,0.075)]"
        >
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={step.number}
                className="border-b border-border last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-step-${index}`}
                  className="grid min-h-[68px] w-full grid-cols-[34px_1fr_auto] items-center gap-3 text-left"
                >
                  <span className="font-serif text-[18px] italic text-blue">
                    {step.number}
                  </span>
                  <span>
                    <span className="block text-[14px] font-bold text-navy">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[10px] text-slate">
                      {step.duration}
                    </span>
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
                  <div id={`mobile-step-${index}`} className="pb-5 pl-[47px] pr-8">
                    <p className="text-[13px] leading-5 text-slate">
                      {step.detail}
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
