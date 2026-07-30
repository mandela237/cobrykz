import type { SolutionPageDefinition } from "@/components/content/solutions";

type SolutionApproachProps = {
  solution: SolutionPageDefinition;
};

export default function SolutionApproach({
  solution,
}: SolutionApproachProps) {
  return (
    <section aria-labelledby="solution-approach-heading">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-approach-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          Engagement approach
        </h2>
        <ol className="mt-12 border-t border-border">
          {solution.approach.map((stage, index) => (
            <li
              key={stage.title}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_minmax(0,0.65fr)_minmax(0,1fr)] sm:gap-6"
            >
              <span
                aria-hidden="true"
                className="text-[11px] font-bold text-blue"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-bold text-navy">{stage.title}</h3>
              <p className="text-[15px] leading-7 text-slate">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
