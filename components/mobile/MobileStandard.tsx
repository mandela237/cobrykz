import {
  Accessibility,
  Check,
  Gauge,
  LayoutTemplate,
  Smartphone,
} from "lucide-react";

const checks = [
  { title: "Custom structure", icon: LayoutTemplate },
  { title: "Phone-first review", icon: Smartphone },
  { title: "Lean performance", icon: Gauge },
  { title: "Accessible controls", icon: Accessibility },
];

export default function MobileStandard() {
  return (
    <section id="m-standard" className="m-section bg-white">
      <div className="m-shell">
        <p className="m-kicker text-blue">Proof in the product</p>
        <h2 className="m-title mt-3 text-navy">
          You can inspect the standard on the screen in your hand.
        </h2>
        <p className="m-body mt-4 text-slate">
          No invented scores or anonymous praise. This site is a working example
          of the care and judgment I bring to a project.
        </p>

        <div className="mt-7 rounded-lg border border-border bg-gray-light p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase text-blue">
                Mobile quality review
              </p>
              <p className="mt-2 text-[18px] font-bold text-navy">
                Useful first. Impressive because it works.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white">
              <Check size={19} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 border-t border-border">
            {checks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex min-h-[80px] items-center gap-2.5 py-4 ${
                    index % 2 === 1 ? "border-l border-border pl-4" : "pr-3"
                  } ${index > 1 ? "border-t border-border" : ""}`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="flex-none text-blue"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold leading-4 text-charcoal">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
