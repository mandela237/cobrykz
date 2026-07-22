import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "30 minutes",
    description:
      "We talk through the business, the people you need to reach, and what the current website is failing to do.",
  },
  {
    number: "02",
    title: "Direction",
    duration: "2-3 days",
    description:
      "You review the message, page structure, and visual direction before I commit to the full build.",
  },
  {
    number: "03",
    title: "Build and review",
    duration: "4-7 days",
    description:
      "I build the responsive site, show you the work in progress, and take it through a focused review with you.",
  },
  {
    number: "04",
    title: "Launch and care",
    duration: "Ongoing",
    description:
      "We check the live site carefully, launch it, and agree on the level of support that makes sense afterward.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-gray-light py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
              A visible process
            </p>
            <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
              No black box. You know what is happening and why.
            </h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-[1.8] text-slate">
              A focused business website can often move from kickoff to launch
              in one to two weeks. We agree on the exact scope and schedule
              before the work begins.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-blue transition-colors hover:text-blue-dark"
            >
              Start with a conversation
              <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <ol
            data-editorial-surface="process"
            className="overflow-hidden rounded-lg border border-border bg-white px-6 shadow-[0_24px_70px_rgba(11,23,40,0.08)] md:px-8"
          >
            {steps.map((step) => (
              <li
                key={step.number}
                className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[62px_1fr_auto] sm:gap-6 md:py-8"
              >
                <span className="font-serif text-[25px] italic text-blue" aria-hidden="true">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[19px] font-bold tracking-normal text-navy md:text-[21px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[540px] text-[14px] leading-7 text-slate">
                    {step.description}
                  </p>
                </div>
                <span className="h-fit rounded-full border border-blue/15 bg-white px-3 py-2 text-[11px] font-semibold text-blue">
                  {step.duration}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
