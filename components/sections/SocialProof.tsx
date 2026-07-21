import {
  CodeXml,
  MessagesSquare,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

const promises = [
  {
    title: "One point of contact",
    detail: "Work directly with Mandela",
    icon: MessagesSquare,
  },
  {
    title: "Built for your business",
    detail: "No recycled templates",
    icon: CodeXml,
  },
  {
    title: "A visible process",
    detail: "Clear decisions and checkpoints",
    icon: Waypoints,
  },
  {
    title: "Quality before launch",
    detail: "Responsive, accessible, reviewed",
    icon: ShieldCheck,
  },
];

export default function SocialProof() {
  return (
    <section
      id="trust"
      className="border-b border-white/10 bg-navy text-white"
      aria-labelledby="trust-heading"
    >
      <h2 id="trust-heading" className="sr-only">
        What clients can expect from COBRYKZ
      </h2>
      <div className="section-shell grid sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((promise, index) => {
          const Icon = promise.icon;
          return (
            <div
              key={promise.title}
              className={`flex min-h-[118px] items-center gap-4 py-6 ${
                index > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
              } ${index > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/12 bg-white/[0.06] text-[#83B8FF]">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">
                  {promise.title}
                </p>
                <p className="mt-1 text-[12px] leading-5 text-white/58">
                  {promise.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
