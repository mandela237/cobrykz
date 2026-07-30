import Link from "next/link";
import { solutionBySlug } from "@/components/content/solutions";
import type { SolutionPageDefinition } from "@/components/content/solutions";

type RelatedSolutionsProps = {
  solution: SolutionPageDefinition;
};

export default function RelatedSolutions({
  solution,
}: RelatedSolutionsProps) {
  return (
    <section
      aria-labelledby="solution-related-heading"
      className="border-y border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-related-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          Related solutions
        </h2>
        <ul className="mt-12 border-t border-border">
          {solution.relatedSlugs.map((slug) => {
            const relatedSolution = solutionBySlug[slug];

            return (
              <li key={slug} className="border-b border-border">
                <Link
                  href={relatedSolution.href}
                  className="action-transition grid min-h-11 gap-2 py-5 text-navy hover:text-blue active:text-blue sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] sm:items-center sm:gap-8"
                >
                  <span className="text-lg font-bold">
                    {relatedSolution.name}
                  </span>
                  <span className="text-[15px] leading-6 text-slate">
                    {relatedSolution.outcome}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
