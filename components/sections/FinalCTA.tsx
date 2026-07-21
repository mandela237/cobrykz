"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Mail,
  MessageSquareText,
} from "lucide-react";

const CONTACT_EMAIL = "hello@cobrykz.com";

const expectations = [
  "A direct reply from Mandela",
  "A practical first recommendation",
  "Clear scope and pricing before work starts",
];

export default function FinalCTA() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const business = String(data.get("business") || "");
    const email = String(data.get("email") || "");
    const projectType = String(data.get("projectType") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      `COBRYKZ project inquiry from ${business || name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        "",
        "What I need help with:",
        message,
      ].join("\n"),
    );

    setStatus("Opening your email app with the project details ready.");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy py-20 text-white md:py-28"
    >
      <div className="dot-grid absolute inset-0 opacity-65" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(145deg,transparent,rgba(31,94,255,0.14))]"
        aria-hidden="true"
      />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-[#83B8FF]">
            Start with the business problem
          </p>
          <h2 className="text-balance text-[36px] font-extrabold leading-[1.06] tracking-normal md:text-[52px]">
            Let’s make your online presence match the quality of your work.
          </h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.85] text-white/66 md:text-[17px]">
            Share what your business does, what is not working today, and what
            you want to improve. The first response comes from the person who
            would be doing the work.
          </p>

          <ul className="mt-8 space-y-4">
            {expectations.map((expectation) => (
              <li
                key={expectation}
                className="flex items-center gap-3 text-[13px] text-white/74"
              >
                <Check
                  size={16}
                  strokeWidth={2.1}
                  className="text-[#78D7B2]"
                  aria-hidden="true"
                />
                {expectation}
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-9 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-white transition-colors hover:text-[#9CC8FF]"
          >
            <Mail size={17} strokeWidth={1.9} aria-hidden="true" />
            {CONTACT_EMAIL}
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <form
          action={`mailto:${CONTACT_EMAIL}`}
          method="post"
          encType="text/plain"
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/12 bg-white/[0.055] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.22)] md:p-7"
        >
          <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.08] text-[#83B8FF]">
              <MessageSquareText
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-[18px] font-bold">Project note</h3>
              <p className="mt-1 text-[12px] text-white/55">
                A few useful details are enough to begin.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-white/75">
                Your name
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                className="min-h-12 w-full rounded-lg border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/32 focus:border-[#83B8FF]/70"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-white/75">
                Business name
              </span>
              <input
                type="text"
                name="business"
                autoComplete="organization"
                required
                className="min-h-12 w-full rounded-lg border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/32 focus:border-[#83B8FF]/70"
                placeholder="Your business"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-white/75">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="min-h-12 w-full rounded-lg border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none transition-colors placeholder:text-white/32 focus:border-[#83B8FF]/70"
                placeholder="you@business.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-white/75">
                Project type
              </span>
              <select
                name="projectType"
                required
                defaultValue=""
                className="min-h-12 w-full rounded-lg border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none transition-colors focus:border-[#83B8FF]/70"
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option>New business website</option>
                <option>Website redesign</option>
                <option>Web app or client portal</option>
                <option>Automation or AI tool</option>
                <option>Not sure yet</option>
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-[12px] font-semibold text-white/75">
              What needs to change?
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-y rounded-lg border border-white/14 bg-[#071321] px-4 py-3 text-[14px] leading-6 text-white outline-none transition-colors placeholder:text-white/32 focus:border-[#83B8FF]/70"
              placeholder="A short description of the problem, goal, or opportunity."
            />
          </label>

          <button
            type="submit"
            className="shimmer mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue px-6 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(31,94,255,0.28)] transition-colors hover:bg-blue-dark"
          >
            Open project email
            <ArrowUpRight size={17} strokeWidth={2.1} aria-hidden="true" />
          </button>

          <p className="mt-4 text-[11px] leading-5 text-white/48">
            This opens a drafted email to {CONTACT_EMAIL}. Nothing is sent
            until you review and send it.
          </p>
          {status && (
            <p className="mt-3 text-[12px] font-medium text-[#9AE4C6]" role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
