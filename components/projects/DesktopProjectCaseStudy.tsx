import Link from "next/link";
import type { PublishedProjectDefinition } from "@/components/content/projects";
import PrimaryLink from "@/components/ui/PrimaryLink";
import TransformationRecord from "@/components/projects/TransformationRecord";

type DesktopProjectCaseStudyProps = {
  project: PublishedProjectDefinition;
};

export default function DesktopProjectCaseStudy({
  project,
}: DesktopProjectCaseStudyProps) {
  return (
    <>
      <section
        aria-label="Project introduction"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell py-16 sm:py-20 lg:py-28">
          <Link
            href="/projects"
            className="action-transition inline-flex min-h-11 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
          >
            Back to projects
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-blue">
            Business case study
          </p>
          <h1 className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-slate sm:text-lg sm:leading-8">
            {project.summary}
          </p>
        </div>
      </section>
      <TransformationRecord project={project} />

      {project.context?.length ? (
        <section
          aria-labelledby="project-context-heading"
          className="border-b border-border bg-white"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-context-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Business context
            </h2>
            <div>
              {project.context.map((paragraph) => (
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
      ) : null}

      {project.challenge?.length ? (
        <section
          aria-labelledby="project-challenge-heading"
          className="border-b border-border bg-gray-light"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-challenge-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Challenge
            </h2>
            <ul className="border-t border-border">
              {project.challenge.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-5 text-[15px] leading-7 text-slate"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {project.strategy?.length ? (
        <section
          aria-labelledby="project-strategy-heading"
          className="border-b border-border bg-white"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-strategy-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Assessment and strategy
            </h2>
            <div>
              {project.strategy.map((paragraph) => (
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
      ) : null}

      {project.solution?.length ? (
        <section
          aria-labelledby="project-solution-heading"
          className="border-b border-border bg-navy text-white"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-solution-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
            >
              Solution
            </h2>
            <div>
              {project.solution.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-base leading-7 text-white/75 first:mt-0 sm:text-[17px] sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.howItWorks?.length ? (
        <section
          aria-labelledby="project-how-heading"
          className="border-b border-border bg-gray-light"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="project-how-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              How it works
            </h2>
            <ol className="mt-12 border-t border-border">
              {project.howItWorks.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-start"
                >
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-bold text-blue"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold leading-7 text-navy">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-slate">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {project.capabilities?.length ? (
        <section
          aria-labelledby="project-capabilities-heading"
          className="border-b border-border bg-white"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-capabilities-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Capabilities combined
            </h2>
            <ul className="border-t border-border">
              {project.capabilities.map((capability) => (
                <li
                  key={capability.name}
                  className="border-b border-border py-3"
                >
                  {capability.href ? (
                    <Link
                      href={capability.href}
                      className="action-transition inline-flex min-h-11 items-center text-[15px] font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
                    >
                      {capability.name}
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-11 items-center text-[15px] font-semibold text-navy">
                      {capability.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {project.implementation?.length ? (
        <section
          aria-labelledby="project-implementation-heading"
          className="border-b border-border bg-gray-light"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-implementation-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Implementation and partnership
            </h2>
            <div>
              {project.implementation.map((paragraph) => (
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
      ) : null}

      {project.verifiedOutcomes?.length ? (
        <section
          aria-labelledby="project-outcomes-heading"
          className="border-b border-border bg-white"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="project-outcomes-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Verified outcomes
            </h2>
            <ul className="mt-12 border-t border-border">
              {project.verifiedOutcomes.map((outcome) => (
                <li
                  key={`${outcome.result}-${outcome.evidence}`}
                  className="grid gap-3 border-b border-border py-7 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-12"
                >
                  <p className="text-xl font-bold leading-7 text-navy">
                    {outcome.result}
                  </p>
                  <div>
                    <p className="text-[15px] leading-7 text-slate">
                      {outcome.evidence}
                    </p>
                    {outcome.verifiedAt ? (
                      <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-light">
                        Verified{" "}
                        <time dateTime={outcome.verifiedAt}>
                          {outcome.verifiedAt}
                        </time>
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {project.authorizedQuote ? (
        <section
          aria-labelledby="project-perspective-heading"
          className="border-b border-border bg-charcoal text-white"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-perspective-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
            >
              Authorized client perspective
            </h2>
            <blockquote>
              <p className="text-balance text-2xl leading-[1.35] text-white sm:text-3xl">
                &ldquo;{project.authorizedQuote.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm leading-6 text-white/75">
                <p className="font-semibold text-white">
                  {project.authorizedQuote.attribution}
                </p>
                {project.authorizedQuote.role ? (
                  <p>{project.authorizedQuote.role}</p>
                ) : null}
                {project.authorizedQuote.organization ? (
                  <p>{project.authorizedQuote.organization}</p>
                ) : null}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {project.nextStage?.length ? (
        <section
          aria-labelledby="project-next-stage-heading"
          className="border-b border-border bg-gray-light"
        >
          <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
            <h2
              id="project-next-stage-heading"
              className="text-balance text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Next stage
            </h2>
            <ul className="border-t border-border">
              {project.nextStage.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-5 text-[15px] leading-7 text-slate"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {project.relatedContent?.length ? (
        <section
          aria-labelledby="project-related-heading"
          className="border-b border-border bg-white"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="project-related-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Related content
            </h2>
            <ul className="mt-12 border-t border-border">
              {project.relatedContent.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    className="action-transition inline-flex min-h-11 items-center py-4 text-base font-semibold text-navy underline decoration-blue/25 underline-offset-4 hover:text-blue active:text-blue"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section
        aria-label="Project call to action"
        aria-labelledby="project-cta-heading"
        className="bg-charcoal text-white"
      >
        <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
          <h2
            id="project-cta-heading"
            className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            What could technology improve in your business?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
            Begin with a challenge, bottleneck, or opportunity. You do not need
            a technical brief to start a useful conversation.
          </p>
          <PrimaryLink href="/contact" className="mt-8">
            Discuss a business challenge
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
