import { Eye, Handshake, MessageCircleMore } from "lucide-react";

const principles = [
  {
    title: "One person stays accountable",
    description:
      "The person on the discovery call is the same person making the strategy, design, and build decisions.",
    icon: Handshake,
  },
  {
    title: "Decisions come with reasons",
    description:
      "You see what is changing, why it matters, and what needs your input. No vague agency language.",
    icon: MessageCircleMore,
  },
  {
    title: "The work is made for real use",
    description:
      "Every screen is reviewed for clarity, mobile behavior, accessibility, and the next action a visitor should take.",
    icon: Eye,
  },
];

export default function WhyCOBRYKZ() {
  return (
    <section id="why-cobrykz" className="bg-gray-light py-20 md:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-normal text-blue">
            A clearer working relationship
          </p>
          <h2 className="text-balance text-[34px] font-extrabold leading-[1.08] tracking-normal text-navy md:text-[48px]">
            The work is premium. The relationship stays simple.
          </h2>
          <blockquote className="mt-8 border-l border-blue/30 pl-5 font-serif text-[24px] leading-[1.45] text-charcoal md:text-[28px]">
            “You should never have to wonder who owns the next step.”
          </blockquote>
        </div>

        <div className="border-t border-border">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <article
                key={principle.title}
                className="grid gap-4 border-b border-border py-7 sm:grid-cols-[52px_1fr] sm:gap-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue/15 bg-white text-blue">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold tracking-normal text-navy md:text-[20px]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 max-w-[590px] text-[14px] leading-7 text-slate md:text-[15px]">
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
