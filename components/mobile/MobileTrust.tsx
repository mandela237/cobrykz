import { CodeXml, MessageCircle, Route, ShieldCheck } from "lucide-react";

const items = [
  { title: "Direct contact", detail: "Work with Mandela", icon: MessageCircle },
  { title: "Custom build", detail: "No recycled theme", icon: CodeXml },
  { title: "Clear route", detail: "Know the next step", icon: Route },
  { title: "Launch review", detail: "Checked on every screen", icon: ShieldCheck },
];

export default function MobileTrust() {
  return (
    <section
      aria-label="What to expect from COBRYKZ"
      className="bg-navy text-white"
    >
      <div className="m-shell grid grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`min-h-[112px] py-5 ${
                index % 2 === 1 ? "border-l border-white/10 pl-5" : "pr-4"
              } ${index > 1 ? "border-t border-white/10" : ""}`}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="text-[#83B8FF]"
                aria-hidden="true"
              />
              <p className="mt-3 text-[13px] font-semibold">{item.title}</p>
              <p className="mt-1 text-[13px] leading-5 text-white/72">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
