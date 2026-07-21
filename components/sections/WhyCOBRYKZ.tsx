import { Eye, Handshake, MessageCircleMore } from "lucide-react";

const principles = [
  {
    title: "The person you meet does the work",
    description:
      "I lead the discovery, shape the strategy, make the design decisions, and build the finished site.",
    icon: Handshake,
  },
  {
    title: "Every recommendation has a reason",
    description:
      "You see what is changing, why it matters, and where your input is needed—without a layer of agency language.",
    icon: MessageCircleMore,
  },
  {
    title: "The work holds up outside the presentation",
    description:
      "Every screen is checked for clarity, mobile use, accessibility, and the next action a visitor needs to take.",
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
            Senior work, without the layers that usually come with it.
          </h2>
          <blockquote className="mt-8 border-l border-blue/30 pl-5 font-serif text-[24px] leading-[1.45] text-charcoal md:text-[28px]">
            &ldquo;You should never have to wonder who owns the next step.&rdquo;
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
