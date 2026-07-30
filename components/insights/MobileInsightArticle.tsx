import Link from "next/link";
import type { PublishedInsightDefinition } from "@/components/content/insights";
import MobileAtlasExplorer from "@/components/mobile/MobileAtlasExplorer";
import MobileChapter from "@/components/mobile/MobileChapter";
import PrimaryLink from "@/components/ui/PrimaryLink";

export default function MobileInsightArticle({
  insight,
}: {
  insight: PublishedInsightDefinition;
}) {
  let chapter = 3;
  return (
    <div data-mobile-insight-article>
      <MobileChapter id="insight-opening" index={1} eyebrow={insight.topic}>
        <div className="mobile-insight-opening">
          <Link href="/insights" className="mobile-insight-back action-transition">
            Back to insights
          </Link>
          <h1>{insight.title}</h1>
          <div className="mobile-insight-meta">
            <span>{insight.author.name}</span>
            <time dateTime={insight.publishedAt}>{insight.publishedAt}</time>
            <span>{insight.readingTimeMinutes} minute read</span>
          </div>
        </div>
      </MobileChapter>
      <MobileChapter id="executive-answer" index={2} eyebrow="Executive answer" tone="dark">
        <div className="mobile-insight-answer">
          <h2 id="executive-answer-heading">Executive answer</h2>
          <p>{insight.summary}</p>
        </div>
      </MobileChapter>
      {insight.visual ? (
        <MobileChapter id="insight-decision-model" index={chapter++} eyebrow="Decision model" tone="muted">
          <MobileAtlasExplorer
            definition={insight.visual}
            ariaLabel="Decision model"
            initialSelectedNodeId={insight.visual.nodes[0].id}
            showDefinitionContext
          />
        </MobileChapter>
      ) : null}
      {insight.sections.map((section, index) => (
        <MobileChapter
          key={section.heading}
          id={`insight-section-${index + 1}`}
          index={chapter++}
          eyebrow={`Chapter ${String(index + 1).padStart(2, "0")}`}
          tone={index % 2 ? "muted" : "light"}
        >
          <div className="mobile-insight-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </MobileChapter>
      ))}
      <MobileChapter id="next-steps" index={chapter++} eyebrow="Practical next steps" tone="muted">
        <div className="mobile-insight-steps">
          <h2 id="next-steps-heading">Practical next steps</h2>
          <ol>
            {insight.nextSteps.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
            ))}
          </ol>
        </div>
      </MobileChapter>
      {insight.relatedSolution ? (
        <MobileChapter id="related-solution" index={chapter++} eyebrow="Related solution">
          <div className="mobile-insight-related">
            <h2 id="related-solution-heading">Related solution</h2>
            <Link href={insight.relatedSolution.href}>{insight.relatedSolution.name}</Link>
          </div>
        </MobileChapter>
      ) : null}
      <MobileChapter id="author-context" index={chapter++} eyebrow="Author context" tone="muted">
        <div className="mobile-insight-author">
          <h2 id="author-context-heading">Author context</h2>
          <p><strong>{insight.author.name}</strong> · {insight.author.role} at Cobrykz</p>
        </div>
      </MobileChapter>
      <MobileChapter id="insight-cta" index={chapter} eyebrow="Apply the thinking" tone="dark">
        <div className="mobile-insight-cta">
          <h2 id="insight-cta-heading">Apply the thinking to a real business challenge.</h2>
          <p>Start with the outcome you need. Cobrykz can help assess the challenge, identify the right path, and build what creates value.</p>
          <PrimaryLink href="/contact">Discuss a business challenge</PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
