import type { SolutionPageDefinition } from "@/components/content/solutions";

type CapabilityListProps = {
  solution: SolutionPageDefinition;
};

export default function CapabilityList({ solution }: CapabilityListProps) {
  return (
    <section aria-labelledby="solution-capabilities-heading">
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <h2
          id="solution-capabilities-heading"
          className="text-balance max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
        >
          What Cobrykz can deliver
        </h2>
        <ul className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {solution.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              className="flex min-h-24 items-center border-b border-r border-border px-5 py-6 text-base font-semibold leading-6 text-navy"
            >
              {deliverable}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
