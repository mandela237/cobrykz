import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homePageCopy } from "@/components/content/home";
import { solutions } from "@/components/content/solutions";
import SectionIntro from "@/components/ui/SectionIntro";

export default function SolutionsOverview() {
  return (
    <section aria-labelledby="solutions-heading" id="solutions">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <div
          data-home-composition="capability-index"
          className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24"
        >
          <div>
            <SectionIntro
              id="solutions-heading"
              title={homePageCopy.solutions.title}
              description={homePageCopy.solutions.description}
            />
            <div
              data-capability-rail
              aria-hidden="true"
              className="mt-8 border-l border-blue pl-5 text-[11px] font-bold uppercase text-blue lg:mt-10"
            >
              Business challenge
              <span className="mt-3 block text-slate">Working solution</span>
              <span className="mt-3 block text-navy">Business outcome</span>
            </div>
          </div>
          <ol className="capability-index border-t border-border lg:mt-1">
            {solutions.map((solution, index) => {
              const isWebExperience =
                solution.slug === "websites-web-applications";

              return (
                <li
                  key={solution.slug}
                  className={`border-b border-border ${
                    isWebExperience ? "bg-blue-tint/60" : ""
                  }`}
                >
                  <Link
                    href={solution.href}
                    className="group grid min-h-24 items-center gap-3 px-2 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_auto] sm:px-4"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[11px] font-bold text-blue"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-navy sm:text-2xl">
                      {solution.name}
                    </h3>
                    <p className="text-[15px] leading-6 text-slate">
                      {solution.outcome}
                    </p>
                    <ArrowRight
                      size={20}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="action-transition text-xl text-blue group-hover:text-navy"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
