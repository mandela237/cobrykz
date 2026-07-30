import Link from "next/link";
import type { PublishedInsightDefinition } from "@/components/content/insights";
import PrimaryLink from "@/components/ui/PrimaryLink";
import EditorialMethod from "@/components/insights/EditorialMethod";

type DesktopInsightsIndexProps = {
  insights: readonly PublishedInsightDefinition[];
};

export default function DesktopInsightsIndex({ insights }: DesktopInsightsIndexProps) {
  return (
    <>
      <section
        aria-labelledby="insights-heading"
        className="border-b border-border bg-gray-light"
      >
        <div className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              Insights
            </p>
            <h1
              id="insights-heading"
              className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl"
            >
              Practical thinking for better technology decisions.
            </h1>
          </div>
          <p className="border-t border-border pt-6 text-base leading-7 text-slate sm:text-[17px] sm:leading-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            Clear guidance for leaders evaluating AI, automation, software,
            and the digital systems behind a stronger business.
          </p>
        </div>
      </section>
      <EditorialMethod />

      {insights.length < 3 ? (
        <section aria-labelledby="insights-empty-heading" className="bg-white">
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl border-y border-border py-10 sm:py-12">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                Editorial standard
              </p>
              <h2
                id="insights-empty-heading"
                className="text-balance mt-4 text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
              >
                Insights are being prepared.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate sm:text-[17px] sm:leading-8">
                Cobrykz will publish substantial, useful guidance rather than
                placeholder articles. In the meantime, explore the solutions
                we use to address real operational and growth challenges.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <PrimaryLink href="/contact">
                  Discuss a business challenge
                </PrimaryLink>
                <Link
                  href="/solutions"
                  className="action-transition inline-flex min-h-11 items-center px-1 text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy active:text-navy"
                >
                  Explore our solutions
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section aria-labelledby="published-insights-heading" className="bg-white">
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <h2
              id="published-insights-heading"
              className="text-balance max-w-4xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
            >
              Published guidance
            </h2>
            <ol className="mt-12 border-t border-border">
              {insights.map((insight) => (
                <li key={insight.slug} className="border-b border-border">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="action-transition grid min-h-11 gap-3 py-7 text-navy hover:text-blue active:text-blue sm:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-8"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue">
                      {insight.topic}
                    </span>
                    <span className="text-xl font-bold leading-7">
                      {insight.title}
                    </span>
                    <span className="text-[15px] leading-7 text-slate">
                      {insight.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
