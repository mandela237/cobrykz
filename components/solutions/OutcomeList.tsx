import type { SolutionPageDefinition } from "@/components/content/solutions";

type OutcomeListProps = {
  solution: SolutionPageDefinition;
};

export default function OutcomeList({ solution }: OutcomeListProps) {
  return (
    <section
      aria-labelledby="solution-outcomes-heading"
      className="border-y border-border bg-gray-light"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-outcomes-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          Business outcomes
        </h2>
        <ul className="mt-12 border-t border-border">
          {solution.businessOutcomes.map((outcome) => (
            <li
              key={outcome}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] sm:gap-8"
            >
              <span
                aria-hidden="true"
                className="text-[11px] font-bold uppercase text-blue"
              >
                Outcome
              </span>
              <p className="max-w-3xl text-lg font-semibold leading-8 text-navy">
                {outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
