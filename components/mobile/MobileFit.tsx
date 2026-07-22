"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";

const fitLists = [
  {
    tab: "Good fit",
    items: [
      "Your business is established, but the website undersells it.",
      "You value direct access and understandable recommendations.",
      "You want a focused launch rather than a long agency process.",
    ],
  },
  {
    tab: "Not a fit",
    items: [
      "Your only priority is the cheapest available template.",
      "You want a large account team and several approval layers.",
      "You want spectacle to matter more than clarity.",
    ],
  },
];

export default function MobileFit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPositive = activeIndex === 0;

  return (
    <section className="relative flow-root bg-gray-light pb-12">
      <div
        data-editorial-surface="fit"
        className="m-shell relative z-10 -mt-5 rounded-lg border border-border bg-white px-5 py-8 shadow-[0_16px_42px_rgba(11,23,40,0.08)]"
      >
        <p className="m-kicker text-blue">Before we talk</p>
        <h2 className="m-title mt-3 text-navy">
          The right working relationship is clear from the start.
        </h2>

        <div
          role="tablist"
          aria-label="Project fit"
          className="mt-6 grid grid-cols-2 rounded-lg border border-border bg-gray-light p-1"
        >
          {fitLists.map((list, index) => (
            <button
              key={list.tab}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="mobile-fit-panel"
              onClick={() => setActiveIndex(index)}
              className={`m-control text-[12px] font-semibold ${
                activeIndex === index
                  ? "bg-white text-navy shadow-[0_5px_16px_rgba(11,23,40,0.08)]"
                  : "text-slate"
              }`}
            >
              {list.tab}
            </button>
          ))}
        </div>

        <div
          id="mobile-fit-panel"
          role="tabpanel"
          className="mt-6 border-y border-border py-2"
        >
          {fitLists[activeIndex].items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 border-b border-border py-4 last:border-b-0"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                  isPositive
                    ? "bg-[#E8F6F0] text-evergreen"
                    : "bg-gray-100 text-slate"
                }`}
              >
                {isPositive ? (
                  <Check size={13} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <Minus size={13} strokeWidth={2.2} aria-hidden="true" />
                )}
              </span>
              <p className="text-[13px] leading-5 text-slate">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
