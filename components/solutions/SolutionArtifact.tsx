import type { SolutionArtifact as SolutionArtifactDefinition } from "@/components/content/solutions";

type SolutionArtifactProps = {
  artifact: SolutionArtifactDefinition;
};

function WorkflowComparison({
  artifact,
}: {
  artifact: Extract<
    SolutionArtifactDefinition,
    { kind: "workflow-comparison" }
  >;
}) {
  return (
    <>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {[artifact.before, artifact.after].map((workflow, workflowIndex) => (
          <article
            key={workflow.label}
            className={
              workflowIndex === 0
                ? "border border-border bg-gray-light p-6 sm:p-8"
                : "border border-blue-border bg-blue-tint p-6 sm:p-8"
            }
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              {workflow.label}
            </p>
            <ol className="mt-6 border-t border-border">
              {workflow.steps.map((step, stepIndex) => (
                <li
                  key={step}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-border py-4 text-[15px] leading-6 text-navy"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-bold text-blue"
                  >
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <div className="mt-5 grid border border-border sm:grid-cols-2">
        {artifact.safeguards.map((safeguard) => (
          <article
            key={safeguard.title}
            className="border-b border-border p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:p-8 sm:last:border-r-0"
          >
            <h3 className="text-lg font-bold text-navy">{safeguard.title}</h3>
            <p className="mt-3 text-[15px] leading-7 text-slate">
              {safeguard.description}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function SystemMap({
  artifact,
}: {
  artifact: Extract<SolutionArtifactDefinition, { kind: "system-map" }>;
}) {
  return (
    <>
      <div className="mt-12 grid border border-border lg:grid-cols-[minmax(0,1fr)_minmax(13rem,0.7fr)_minmax(0,1fr)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-1">
          {artifact.elements.slice(0, 2).map((element) => (
            <article
              key={element.title}
              className="border-b border-border p-6 sm:border-r sm:p-8 sm:even:border-r-0 lg:border-r-0 lg:last:border-b-0"
            >
              <h3 className="text-lg font-bold text-navy">{element.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                {element.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex min-h-44 items-center justify-center border-y border-blue-border bg-blue-tint p-8 text-center lg:border-x lg:border-y-0">
          <p className="max-w-48 text-balance text-xl font-extrabold leading-tight text-navy">
            {artifact.centerLabel}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1">
          {artifact.elements.slice(2).map((element) => (
            <article
              key={element.title}
              className="border-b border-border p-6 last:border-b-0 sm:border-r sm:p-8 sm:even:border-r-0 lg:border-r-0"
            >
              <h3 className="text-lg font-bold text-navy">{element.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-slate">
                {element.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 grid border border-border lg:grid-cols-3">
        {artifact.distinctions.map((distinction) => (
          <article
            key={distinction.title}
            className="border-b border-border p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0"
          >
            <h3 className="text-base font-bold text-navy">
              {distinction.title}
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-slate">
              {distinction.description}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

export default function SolutionArtifact({
  artifact,
}: SolutionArtifactProps) {
  return (
    <section
      aria-labelledby="solution-artifact-heading"
      className="border-y border-border bg-white"
    >
      <div className="section-shell py-16 sm:py-20 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
          {artifact.eyebrow}
        </p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2
            id="solution-artifact-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
          >
            {artifact.title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate sm:text-[17px]">
            {artifact.description}
          </p>
        </div>

        {artifact.kind === "workflow-comparison" ? (
          <WorkflowComparison artifact={artifact} />
        ) : (
          <SystemMap artifact={artifact} />
        )}
      </div>
    </section>
  );
}
