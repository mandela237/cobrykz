import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

const founderPromises = [
  "I stay focused on the business problem, not only the visual brief.",
  "I explain tradeoffs plainly and document the decisions that matter.",
  "Your project is not handed to a junior team after the first call.",
];

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-navy py-20 text-white md:py-28"
    >
      <div className="dot-grid absolute inset-0 opacity-65" aria-hidden="true" />
      <div
        className="absolute inset-y-0 left-0 w-2/5 bg-[linear-gradient(135deg,rgba(31,94,255,0.12),transparent)]"
        aria-hidden="true"
      />
      <div className="section-shell relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
          <div
            className="absolute -bottom-5 -right-5 h-[80%] w-[86%] border border-white/12"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-lg border border-white/14 bg-white/5">
            <div className="relative aspect-[4/5]">
              <Image
                src="/mandela-portrait-sharp.jpg"
                alt="Mandela Atud, founder of COBRYKZ"
                fill
                quality={90}
                className="object-cover object-[52%_8%]"
                sizes="(max-width: 1023px) calc(100vw - 40px), 36vw"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(7,19,33,0.48)_100%)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-[#83B8FF]">
            Mandela Atud, founder and builder
          </p>
          <h2 className="text-balance max-w-[760px] text-[34px] font-extrabold leading-[1.08] tracking-normal md:text-[48px]">
            The name on the studio is the person doing the work.
          </h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.75] text-white/82 md:text-[17px]">
            I started COBRYKZ because too many excellent local businesses were
            being judged by websites that undersold them. I keep the studio
            intentionally small, so I can stay involved from the first question
            through the final review.
          </p>

          <blockquote className="mt-7 max-w-[720px] border-l border-[#83B8FF]/45 pl-5 font-serif text-[24px] leading-[1.45] text-white md:text-[29px]">
            &ldquo;The goal is not to make your business look bigger. It is to
            make its real value easier to recognize.&rdquo;
          </blockquote>

          <ul className="mt-8 grid gap-3 text-[13px] text-white/82">
            {founderPromises.map((promise) => (
              <li key={promise} className="flex items-start gap-3">
                <Check
                  size={16}
                  strokeWidth={2.1}
                  className="mt-0.5 flex-none text-[#78D7B2]"
                  aria-hidden="true"
                />
                {promise}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-white transition-colors hover:text-[#9CC8FF]"
          >
            Tell me about your business
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
