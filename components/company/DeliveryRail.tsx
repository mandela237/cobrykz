import type {
  ProcessDecisionGate,
  ProcessStageDefinition,
} from "@/components/content/companyPages";

const deliverySequence = [
  "Discover",
  "Assess",
  "Design",
  "Build",
  "Deploy",
  "Optimize",
] as const;

export default function DeliveryRail({
  stages,
  gates,
}: {
  stages: readonly ProcessStageDefinition[];
  gates: readonly ProcessDecisionGate[];
}) {
  return (
    <ol
      aria-label="Cobrykz delivery process"
      className="delivery-rail relative border-y border-border"
    >
      {stages.map((stage, index) => {
        const gate = gates.find(
          (candidate) =>
            candidate.after === stage.name &&
            candidate.before === stages[index + 1]?.name,
        );

        return (
          <li
            key={stage.name}
            id={`process-${stage.name.toLowerCase()}`}
            className="delivery-rail__stage relative"
          >
            <article className="grid gap-6 border-b border-border py-10 sm:grid-cols-[5rem_minmax(0,0.82fr)_minmax(0,1.18fr)] sm:gap-8 lg:py-14">
              <div>
                <span
                  aria-hidden="true"
                  className="delivery-rail__node relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-blue/30 bg-white text-[11px] font-bold text-blue"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-blue">
                  {deliverySequence[index]}
                </p>
              </div>

              <div>
                <h2 className="text-balance text-2xl font-bold leading-tight text-navy sm:text-3xl">
                  {stage.summary}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-slate sm:text-base">
                  {stage.description}
                </p>
              </div>

              <div className="grid gap-7 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 lg:grid-cols-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-navy">
                    Decisions
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {stage.decisions.map((decision) => (
                      <li
                        key={decision}
                        className="border-l-2 border-blue/25 pl-3 text-sm leading-6 text-slate"
                      >
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-navy">
                    Outputs
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {stage.outputs.map((output) => (
                      <li
                        key={output}
                        className="border-l-2 border-evergreen/30 pl-3 text-sm leading-6 text-slate"
                      >
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {gate ? (
              <aside
                data-decision-gate
                aria-label={`Decision gate between ${gate.after} and ${gate.before}`}
                className="delivery-rail__gate border-b border-blue/20 bg-blue-tint px-6 py-8 sm:ml-20 sm:px-9"
              >
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                      Decision gate
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-navy sm:text-2xl">
                      {gate.title}
                    </h2>
                    <p className="mt-3 text-[15px] font-medium leading-7 text-charcoal">
                      {gate.question}
                    </p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {gate.criteria.map((criterion) => (
                      <li
                        key={criterion}
                        className="border-t border-blue/20 pt-3 text-sm leading-6 text-slate"
                      >
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
