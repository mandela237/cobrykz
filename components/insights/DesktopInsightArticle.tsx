import Link from "next/link";
import type { PublishedInsightDefinition } from "@/components/content/insights";
import PrimaryLink from "@/components/ui/PrimaryLink";
import DecisionDiagram from "@/components/insights/DecisionDiagram";

type DesktopInsightArticleProps = {
  insight: PublishedInsightDefinition;
};

export default function DesktopInsightArticle({ insight }: DesktopInsightArticleProps) {
  return (
    <>
      <header className="border-b border-border bg-gray-light">
        <div className="section-shell py-16 sm:py-20 lg:py-28">
          <Link
            href="/insights"
            className="action-transition inline-flex min-h-11 items-center text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
          >
            Back to insights
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-blue">
            {insight.topic}
          </p>
          <h1 className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl">
            {insight.title}
          </h1>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate">
            <span>{insight.author.name}</span>
            {insight.publishedAt ? (
              <time dateTime={insight.publishedAt}>{insight.publishedAt}</time>
            ) : null}
            {insight.readingTimeMinutes ? (
              <span>{insight.readingTimeMinutes} minute read</span>
            ) : null}
          </div>
        </div>
      </header>

      <section aria-labelledby="executive-answer-heading" className="border-b border-border bg-navy text-white">
        <div className="section-shell grid gap-7 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16 lg:py-24">
          <h2
            id="executive-answer-heading"
            className="text-balance text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            Executive answer
          </h2>
          <p className="text-balance text-xl leading-8 text-white/80 sm:text-2xl sm:leading-9">
            {insight.summary}
          </p>
        </div>
      </section>
      {insight.visual ? (
        <DecisionDiagram definition={insight.visual} />
      ) : null}

      {insight.sections?.map((section) => (
        <section
          key={section.heading}
          className="border-b border-border bg-white"
        >
          <div className="section-shell grid gap-7 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16 lg:py-20">
            <h2 className="text-balance text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
              {section.heading}
            </h2>
            <div>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 text-base leading-8 text-slate first:mt-0 sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {insight.nextSteps?.length ? (
        <section aria-labelledby="next-steps-heading" className="border-b border-border bg-gray-light">
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="next-steps-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Practical next steps
            </h2>
            <ol className="mt-10 border-t border-border">
              {insight.nextSteps.map((step, index) => (
                <li
                  key={step}
                  className="grid gap-3 border-b border-border py-5 sm:grid-cols-[3rem_minmax(0,1fr)]"
                >
                  <span aria-hidden="true" className="text-xs font-bold text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-7 text-slate">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {insight.relatedSolution ? (
        <section aria-labelledby="related-solution-heading" className="border-b border-border bg-white">
          <div className="section-shell grid gap-6 py-14 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] sm:items-center sm:py-16 lg:gap-16">
            <h2 id="related-solution-heading" className="text-2xl font-extrabold text-navy">
              Related solution
            </h2>
            <Link
              href={insight.relatedSolution.href}
              className="action-transition inline-flex min-h-11 items-center text-base font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
            >
              {insight.relatedSolution.name}
            </Link>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="author-context-heading" className="border-b border-border bg-gray-light">
        <div className="section-shell grid gap-6 py-14 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] sm:items-center sm:py-16 lg:gap-16">
          <h2 id="author-context-heading" className="text-2xl font-extrabold text-navy">
            Author context
          </h2>
          <p className="text-base leading-7 text-slate">
            <span className="font-bold text-navy">{insight.author.name}</span>
            {" · "}
            {insight.author.role} at Cobrykz
          </p>
        </div>
      </section>

      <section aria-labelledby="insight-cta-heading" className="bg-charcoal text-white">
        <div className="section-shell py-16 text-center sm:py-20 lg:py-24">
          <h2
            id="insight-cta-heading"
            className="text-balance mx-auto max-w-4xl text-[2rem] font-extrabold leading-[1.08] sm:text-[2.5rem] lg:text-5xl"
          >
            Apply the thinking to a real business challenge.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-[17px]">
            Start with the outcome you need. Cobrykz can help assess the
            challenge, identify the right path, and build what creates value.
          </p>
          <PrimaryLink href="/contact" className="mt-8">
            Discuss a business challenge
          </PrimaryLink>
        </div>
      </section>
    </>
  );
}
