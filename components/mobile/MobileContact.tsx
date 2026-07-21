"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";

const CONTACT_EMAIL = "hello@cobrykz.com";

export default function MobileContact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`COBRYKZ project note from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, "", "Project note:", message].join(
        "\n",
      ),
    );

    setStatus("Opening your email app with the note ready.");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="m-contact" className="m-section bg-navy text-white">
      <div className="m-shell">
        <p className="m-kicker text-[#83B8FF]">Start with a short note</p>
        <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08]">
          What does the website need to do better for the business?
        </h2>
        <p className="mt-4 text-[14px] leading-6 text-white/82">
          No polished brief required. Tell me what is not working and I will
          reply with the next useful question.
        </p>

        <div className="mt-6 flex items-center gap-5 border-y border-white/10 py-4">
          <p className="flex items-center gap-2 text-[13px] text-white/80">
            <Check
              size={14}
              strokeWidth={2.2}
              className="text-[#78D7B2]"
              aria-hidden="true"
            />
            Direct reply
          </p>
          <p className="flex items-center gap-2 text-[13px] text-white/80">
            <Check
              size={14}
              strokeWidth={2.2}
              className="text-[#78D7B2]"
              aria-hidden="true"
            />
            Clear next step
          </p>
        </div>

        <form
          data-mobile-contact
          action={`mailto:${CONTACT_EMAIL}`}
          method="post"
          encType="text/plain"
          onSubmit={handleSubmit}
          className="mt-7"
        >
          <label className="block">
            <span className="mb-2 block text-[11px] font-semibold text-white/72">
              Your name
            </span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              className="m-control w-full border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none placeholder:text-white/28 focus:border-[#83B8FF]/70"
              placeholder="Your name"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[11px] font-semibold text-white/72">
              Email
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="m-control w-full border border-white/14 bg-[#071321] px-4 text-[14px] text-white outline-none placeholder:text-white/28 focus:border-[#83B8FF]/70"
              placeholder="you@business.com"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[11px] font-semibold text-white/72">
              Project note
            </span>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full resize-y rounded-lg border border-white/14 bg-[#071321] px-4 py-3 text-[14px] leading-6 text-white outline-none placeholder:text-white/28 focus:border-[#83B8FF]/70"
              placeholder="What is not working today, and what would better look like?"
            />
          </label>

          <button
            type="submit"
            className="shimmer m-control mt-5 inline-flex w-full items-center justify-center gap-2 bg-blue px-5 text-[14px] font-semibold text-white"
          >
            Open project email
            <ArrowUpRight size={16} strokeWidth={2.1} aria-hidden="true" />
          </button>

          <p className="mt-3 text-[13px] leading-5 text-white/70">
            This opens a draft to {CONTACT_EMAIL}. Nothing sends until you
            review it.
          </p>
          {status && (
            <p className="mt-3 text-[13px] font-medium text-[#9AE4C6]" role="status">
              {status}
            </p>
          )}
        </form>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-white"
        >
          <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
