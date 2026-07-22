"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  MonitorSmartphone,
  Workflow,
  Wrench,
} from "lucide-react";

const services = [
  {
    tab: "Website",
    title: "A website worthy of your business",
    description:
      "Clear positioning, confident design, and an obvious next step for the people you want to reach.",
    outcomes: ["Custom page strategy", "Responsive design and build", "Clear inquiry flow"],
    icon: MonitorSmartphone,
  },
  {
    tab: "Systems",
    title: "Useful systems behind the scenes",
    description:
      "Booking, intake, client, or automation tools shaped around how your business actually works.",
    outcomes: ["Booking and intake", "Client portals", "Useful automation"],
    icon: Workflow,
  },
  {
    tab: "Care",
    title: "Direct help after launch",
    description:
      "Updates and improvements without the layers or distance of a traditional agency.",
    outcomes: ["Content updates", "Quality reviews", "Clear growth advice"],
    icon: Wrench,
  },
];

export default function MobileServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="m-services" className="relative bg-gray-light pb-0 pt-14">
      <div
        data-editorial-surface="services"
        className="m-shell relative z-10 translate-y-5 rounded-lg border border-border bg-white px-5 py-8 shadow-[0_16px_42px_rgba(11,23,40,0.08)]"
      >
        <p className="m-kicker text-blue">What COBRYKZ builds</p>
        <h2 className="m-title mt-3 text-navy">
          Start with the website. Add more only when it earns its place.
        </h2>
        <p className="m-body mt-4 text-slate">
          Each piece should make the business easier to choose or easier to run.
        </p>

        <div
          role="tablist"
          aria-label="COBRYKZ services"
          className="mt-6 grid grid-cols-3 rounded-lg border border-border bg-gray-light p-1"
        >
          {services.map((service, index) => (
            <button
              key={service.tab}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="mobile-service-panel"
              onClick={() => setActiveIndex(index)}
              className={`m-control px-2 text-[12px] font-semibold transition-colors ${
                activeIndex === index
                  ? "bg-white text-navy shadow-[0_5px_16px_rgba(11,23,40,0.08)]"
                  : "text-slate"
              }`}
            >
              {service.tab}
            </button>
          ))}
        </div>

        <div
          id="mobile-service-panel"
          role="tabpanel"
          className="mt-7 border-y border-border py-7"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-tint text-blue">
            <ActiveIcon size={21} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-[22px] font-bold leading-[1.2] text-navy">
            {active.title}
          </h3>
          <p className="m-body mt-3 text-slate">{active.description}</p>
          <ul className="mt-5 space-y-3">
            {active.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-center gap-3 text-[13px] text-charcoal"
              >
                <Check
                  size={15}
                  strokeWidth={2.2}
                  className="text-evergreen"
                  aria-hidden="true"
                />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#m-contact"
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-blue"
        >
          Talk through your project
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
