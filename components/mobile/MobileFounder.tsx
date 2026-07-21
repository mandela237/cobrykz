import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

const promises = [
  "Senior attention from first call to launch",
  "Plain-language recommendations",
  "No handoff to a junior team",
];

export default function MobileFounder() {
  return (
    <section id="m-founder" className="m-section bg-navy text-white">
      <div className="m-shell">
        <p className="m-kicker text-[#83B8FF]">The person responsible</p>

        <div className="mt-5 grid grid-cols-[108px_1fr] items-end gap-5">
          <div className="relative aspect-[0.78] overflow-hidden rounded-lg border border-white/12">
            <Image
              src="/mandela-portrait-sharp.jpg"
              alt="Mandela Atud, founder of COBRYKZ"
              fill
              quality={86}
              className="object-cover object-[52%_8%]"
              sizes="108px"
            />
          </div>
          <div className="pb-1">
            <p className="text-[18px] font-bold">Mandela Atud</p>
            <p className="mt-1 text-[11px] text-white/50">
              Founder, designer, and developer
            </p>
            <blockquote className="mt-4 font-serif text-[17px] leading-[1.4] text-white/90">
              “Make the real value easier to recognize.”
            </blockquote>
          </div>
        </div>

        <h2 className="mt-7 text-[28px] font-extrabold leading-[1.08]">
          Your project stays close to the person doing the work.
        </h2>
        <p className="mt-4 text-[13px] leading-6 text-white/62">
          COBRYKZ is intentionally small. That keeps the thinking, communication,
          and execution connected.
        </p>

        <ul className="mt-6 space-y-3">
          {promises.map((promise) => (
            <li
              key={promise}
              className="flex items-start gap-3 text-[12px] leading-5 text-white/72"
            >
              <Check
                size={14}
                strokeWidth={2.2}
                className="mt-0.5 flex-none text-[#78D7B2]"
                aria-hidden="true"
              />
              {promise}
            </li>
          ))}
        </ul>

        <a
          href="#m-contact"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-white"
        >
          Tell Mandela what you need
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
