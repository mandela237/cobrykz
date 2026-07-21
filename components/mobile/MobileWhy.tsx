import { Eye, Handshake, MessageCircleMore } from "lucide-react";

const agreements = [
  {
    title: "The person you meet does the work",
    detail: "I make the strategy, design, and build decisions.",
    icon: Handshake,
  },
  {
    title: "Recommendations come with reasons",
    detail: "Important choices are explained in language you can use.",
    icon: MessageCircleMore,
  },
  {
    title: "The work holds up in real use",
    detail: "Every screen is checked for clarity and usability.",
    icon: Eye,
  },
];

export default function MobileWhy() {
  return (
    <section className="m-section bg-gray-light">
      <div className="m-shell">
        <p className="m-kicker text-blue">The working agreement</p>
        <h2 className="m-title mt-3 text-navy">
          Senior work, without the agency distance.
        </h2>

        <div className="mt-7 border-t border-border">
          {agreements.map((agreement) => {
            const Icon = agreement.icon;
            return (
              <article
                key={agreement.title}
                className="grid grid-cols-[42px_1fr] gap-4 border-b border-border py-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-navy">
                    {agreement.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-5 text-slate">
                    {agreement.detail}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <blockquote className="mt-6 border-l border-blue/35 pl-4 font-serif text-[20px] leading-[1.45] text-charcoal">
          &ldquo;You should always know who owns the next step.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
