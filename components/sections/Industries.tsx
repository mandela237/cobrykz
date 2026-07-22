import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Cross,
  HardHat,
  Scissors,
  Utensils,
} from "lucide-react";

const industries = [
  { label: "Health and wellness", icon: Cross },
  { label: "Trades and construction", icon: HardHat },
  { label: "Professional services", icon: BriefcaseBusiness },
  { label: "Food and hospitality", icon: Utensils },
  { label: "Beauty and personal care", icon: Scissors },
  { label: "Community organizations", icon: Building2 },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-navy pb-20 pt-28 text-white md:pb-24 md:pt-36"
    >
      <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,transparent,rgba(31,94,255,0.12))]"
        aria-hidden="true"
      />
      <div className="section-shell relative">
        <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="text-balance max-w-[720px] text-[34px] font-extrabold leading-[1.08] tracking-normal md:text-[48px]">
            For businesses that earn trust face to face—and need to earn it online.
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[1.75] text-white/80 lg:justify-self-end">
            Every field has its own details. The website still has one job:
            explain why your business is the right choice and make it easy to
            act on that decision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.label}
                className={`flex min-h-[116px] items-center gap-4 border-white/12 py-6 ${
                  index > 0 ? "sm:border-l sm:pl-6" : ""
                } ${index >= 2 ? "border-t" : ""} ${
                  index === 2 ? "sm:border-l-0 lg:border-l" : ""
                } ${index === 3 ? "sm:border-l lg:border-l-0" : ""}`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.7}
                  className="flex-none text-[#83B8FF]"
                  aria-hidden="true"
                />
                <span className="text-[14px] font-medium text-white/88">
                  {industry.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-white/12 pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] leading-6 text-white/75">
            Work in another field? The first conversation is about your
            customers and your goals—not a category on a list.
          </p>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-white transition-colors hover:text-[#9CC8FF]"
          >
            Tell me what you do
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
