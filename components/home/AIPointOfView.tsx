import { aiPrinciples, homePageCopy } from "@/components/content/home";
import SectionIntro from "@/components/ui/SectionIntro";

export default function AIPointOfView() {
  return (
    <section aria-labelledby="ai-heading" id="ai-point-of-view">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionIntro
            id="ai-heading"
            title={homePageCopy.ai.title}
            description={homePageCopy.ai.description}
          />
          <ul
            data-decision-artifact
            data-home-composition="decision-artifact"
            className="home-decision-artifact grid overflow-hidden border border-border bg-border sm:grid-cols-2"
          >
            {aiPrinciples.map((principle, index) => (
              <li
                key={principle.title}
                className={`bg-white p-6 sm:p-7 ${
                  index === 0
                    ? "sm:col-span-2"
                    : "border-t border-border sm:border-r sm:last:border-r-0"
                }`}
              >
                <h3 className="text-lg font-bold text-navy">
                  {principle.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
