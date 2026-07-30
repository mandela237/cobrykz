import Link from "next/link";
import type { PublishedInsightDefinition } from "@/components/content/insights";
import { editorialMethod } from "@/components/insights/EditorialMethod";
import { getMobileInsightLedger } from "@/components/insights/insightsMobileModel";
import MobileChapter from "@/components/mobile/MobileChapter";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function MobileInsightsIndex({
  insights,
}: {
  insights: readonly PublishedInsightDefinition[];
}) {
  const ledger = getMobileInsightLedger(insights);

  return (
    <div data-mobile-insights-index>
      <MobileChapter id="insights-opening" index={1} eyebrow="Insights">
        <div className="mobile-insights-opening">
          <h1 id="insights-heading">
            Practical thinking for better technology decisions.
          </h1>
          <p>
            Clear guidance for leaders evaluating AI, automation, software,
            and the digital systems behind a stronger business.
          </p>
        </div>
      </MobileChapter>
      <MobileChapter id="insights-method" index={2} eyebrow="Editorial method" tone="dark">
        <div className="mobile-insights-method">
          <h2 id="editorial-method-heading">
            Practical thinking begins with a decision.
          </h2>
          <ol>
            {editorialMethod.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </MobileChapter>
      {insights.length < 3 ? (
        <MobileChapter id="insights-empty" index={3} eyebrow="Editorial standard">
          <div className="mobile-insights-state">
            <h2 id="insights-empty-heading">Insights are being prepared.</h2>
            <p>
              Cobrykz will publish substantial, useful guidance rather than
              placeholder articles. In the meantime, explore the solutions
              we use to address real operational and growth challenges.
            </p>
            <div className="mobile-insights-actions">
              <PrimaryLink href="/contact">Discuss a business challenge</PrimaryLink>
              <Link href="/solutions" className="mobile-insights-secondary action-transition">
                Explore our solutions
              </Link>
            </div>
          </div>
        </MobileChapter>
      ) : (
        <MobileChapter id="insights-published" index={3} eyebrow="Published guidance">
          <div className="mobile-insights-ledger">
            <h2 id="published-insights-heading">Published guidance</h2>
            <ol>
              {ledger.map((entry) => (
                <li key={entry.href}>
                  <Link href={entry.href}>
                    <span>{entry.index} · {entry.topic}</span>
                    <strong>{entry.title}</strong>
                    <p>{entry.summary}</p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </MobileChapter>
      )}
    </div>
  );
}
