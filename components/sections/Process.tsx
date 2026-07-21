import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "30 minutes",
    description:
      "We talk through your business, the people you need to reach, and what is getting in the way today.",
  },
  {
    number: "02",
    title: "Direction",
    duration: "2-3 days",
    description:
      "You see the message, page structure, and visual direction before the full build moves forward.",
  },
  {
    number: "03",
    title: "Build and review",
    duration: "4-7 days",
    description:
      "I build the responsive experience, share progress, and work through a focused review with you.",
  },
  {
    number: "04",
    title: "Launch and care",
    duration: "Ongoing",
    description:
      "We launch deliberately, verify the live site, and agree on the support that makes sense next.",
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
              Know what happens next, from the first call onward.
            </h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-[1.8] text-slate">
              Most focused business websites can move from kickoff to launch in
              one to two weeks. The exact scope and timeline are agreed before
              work begins.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-blue transition-colors hover:text-blue-dark"
            >
              Start with a conversation
              <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <ol className="relative border-t border-border">
            {steps.map((step, index) => (
              <li
                key={step.number}
                className="grid gap-4 border-b border-border py-7 sm:grid-cols-[62px_1fr_auto] sm:gap-6"
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
                {index < steps.length - 1 && (
                  <span
                    className="absolute left-[30px] hidden h-7 w-px translate-y-[93px] bg-blue/20 sm:block"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
