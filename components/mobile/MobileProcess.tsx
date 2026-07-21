"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "30 min",
    detail:
      "We define the business problem, the audience, and the outcome that would make the project worthwhile.",
  },
  {
    number: "02",
    title: "Direction",
    duration: "2-3 days",
    detail:
      "You review the message, structure, and visual direction before the full build moves forward.",
  },
  {
    number: "03",
    title: "Build and review",
    duration: "4-7 days",
    detail:
      "The responsive experience is built, shared, and refined through one focused review cycle.",
  },
  {
    number: "04",
    title: "Launch and care",
    duration: "Ongoing",
    detail:
      "The live site is verified and the right level of ongoing support is agreed together.",
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
          Four steps. No mystery in the middle.
        </h2>
        <p className="m-body mt-4 text-slate">
          Focused business sites often launch in one to two weeks. Scope decides
          the exact timing.
        </p>

        <div className="mt-7 border-t border-border">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={step.number} className="border-b border-border">
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
                    <p className="text-[12px] leading-5 text-slate">
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
