import {
  BriefcaseBusiness,
  Building2,
  Cross,
  HardHat,
  Scissors,
  Utensils,
} from "lucide-react";

const industries = [
  { title: "Health", detail: "Practices and wellness", icon: Cross },
  { title: "Trades", detail: "Construction and services", icon: HardHat },
  { title: "Professional", detail: "Law, finance, consulting", icon: BriefcaseBusiness },
  { title: "Hospitality", detail: "Food and experiences", icon: Utensils },
  { title: "Personal care", detail: "Beauty and grooming", icon: Scissors },
  { title: "Community", detail: "Churches and nonprofits", icon: Building2 },
];

export default function MobileIndustries() {
  return (
    <section className="m-section overflow-hidden bg-navy text-white">
      <div className="m-shell">
        <p className="m-kicker text-[#83B8FF]">Built for local trust</p>
        <h2 className="m-title mt-3">
          Earn the same trust online that you earn face to face.
        </h2>
        <p className="m-body mt-4 text-white/80">
          The details change by industry. The website still needs to make your
          value clear and the next step easy.
        </p>
      </div>

      <div
        className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Industries COBRYKZ serves"
      >
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <article
              key={industry.title}
              className="w-[158px] flex-none snap-start rounded-lg border border-white/12 bg-white/[0.055] p-4"
            >
              <Icon
                size={19}
                strokeWidth={1.7}
                className="text-[#83B8FF]"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-[14px] font-semibold">{industry.title}</h3>
              <p className="mt-1 text-[13px] leading-5 text-white/72">
                {industry.detail}
              </p>
            </article>
          );
        })}
      </div>

      <p className="m-shell mt-4 text-[13px] leading-5 text-white/70">
        Swipe to explore. Your field does not need to appear here for us to talk.
      </p>
    </section>
  );
}
