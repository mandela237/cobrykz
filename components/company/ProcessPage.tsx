import type { ProcessPageDefinition } from "@/components/content/companyPages";
import PrimaryLink from "@/components/ui/PrimaryLink";

type ProcessPageProps = {
  content: ProcessPageDefinition;
};

export default function ProcessPage({ content }: ProcessPageProps) {
  return (
    <>
      <section
        id="process-hero"
        aria-labelledby="process-hero-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              {content.eyebrow}
            </p>
            <h1
              id="process-hero-heading"
              className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl"
            >
              {content.headline}
            </h1>
          </div>
          <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {content.introduction.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-7 text-slate first:mt-0 sm:text-[17px] sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Process stages" className="bg-white">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <ol className="relative border-t border-border before:absolute before:bottom-12 before:left-5 before:top-11 before:w-px before:bg-border before:content-[''] sm:before:left-[1.375rem]">
            {content.stages.map((stage, index) => {
              const gate = content.decisionGates.find(
                (gate) =>
                  gate.after === stage.name &&
                  gate.before === content.stages[index + 1]?.name,
              );

              return (
                <li key={stage.name} className="relative">
                  <article className="grid gap-5 border-b border-border py-9 sm:grid-cols-[4.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-7 lg:py-12">
                    <div className="flex items-center gap-4 sm:block">
                      <span
                        aria-hidden="true"
                        className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-blue/25 bg-blue-tint text-[11px] font-bold text-blue sm:size-11"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue sm:mt-4">
                        {stage.name}
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

                    <div className="grid gap-7 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0 lg:grid-cols-2">
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
                      aria-label={`Decision gate between ${gate.after} and ${gate.before}`}
                      className="border-b border-blue/15 bg-blue-tint px-5 py-7 sm:px-8"
                    >
                      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
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
        </div>
      </section>

      <section
        aria-labelledby="process-scaling-heading"
        className="border-y border-border bg-gray-light"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <h2
              id="process-scaling-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              {content.scaling.title}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate sm:text-[17px] sm:leading-8">
              {content.scaling.description}
            </p>
          </div>

          <ol className="mt-12 border-t border-border">
            {content.scaling.paths.map((path) => (
              <li
                key={path.title}
                className="grid gap-3 border-b border-border py-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-start"
              >
                <h3 className="text-lg font-bold leading-6 text-navy">
                  {path.title}
                </h3>
                <p className="text-sm leading-6 text-slate">
                  {path.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="How the work stays accountable" className="bg-white">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <ul className="grid border-y border-border md:grid-cols-2">
            {content.operatingModel.map((item) => (
              <li
                key={item.title}
                className="border-b border-border py-7 last:border-b-0 md:min-h-56 md:px-8 md:py-9 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <h2 className="text-xl font-bold text-navy sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="process-post-launch-heading"
        className="border-t border-border bg-white"
      >
        <div className="section-shell grid gap-9 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-24">
          <div>
            <h2
              id="process-post-launch-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              {content.postLaunch.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-[17px]">
              {content.postLaunch.description}
            </p>
          </div>
          <ul className="border-t border-border">
            {content.postLaunch.options.map((option) => (
              <li
                key={option}
                className="border-b border-border py-5 text-[15px] font-medium leading-6 text-charcoal"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="process-cta"
        aria-labelledby="process-cta-heading"
        className="bg-charcoal text-white"
      >
        <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
          <h2
            id="process-cta-heading"
            className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            {content.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
            {content.cta.description}
          </p>
          <PrimaryLink href={content.cta.href} className="mt-8">
            {content.cta.label}
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
