import Link from "next/link";
import { primaryCta } from "@/components/content/site";
import {
  solutionBySlug,
  type SolutionPageDefinition,
} from "@/components/content/solutions";
import { solutionVisualBySlug } from "@/components/content/solutionVisuals";
import MobileAtlasExplorer from "@/components/mobile/MobileAtlasExplorer";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileChapterIntro from "@/components/mobile/MobileChapterIntro";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import MobileSolutionArtifact from "@/components/solutions/MobileSolutionArtifact";
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileSolutionPageProps = {
  solution: SolutionPageDefinition;
};

export default function MobileSolutionPage({
  solution,
}: MobileSolutionPageProps) {
  const operatingAtlas = solutionVisualBySlug[solution.slug].atlas;
  const optionalChapterCount =
    Number(Boolean(solution.artifact)) + Number(Boolean(solution.guidance));
  const approachIndex = 7 + optionalChapterCount;
  const relatedIndex = approachIndex + 1;
  const faqIndex = relatedIndex + 1;
  const finalIndex = faqIndex + 1;

  return (
    <div data-mobile-solution-detail data-solution-slug={solution.slug}>
      <MobileChapter
        id="solution-hero"
        index={1}
        eyebrow={solution.name}
        tone="muted"
      >
        <div className="mobile-solution-opening">
          <p className="mobile-solution-opening__eyebrow">{solution.name}</p>
          <h1 id="solution-hero-heading">{solution.outcome}</h1>
          <p className="mobile-solution-opening__support">
            {solution.heroSupport}
          </p>
          <PrimaryLink href={primaryCta.href}>{primaryCta.label}</PrimaryLink>
        </div>
      </MobileChapter>

      <MobileChapter
        id="solution-recognition"
        index={2}
        eyebrow="Where the challenge shows up"
      >
        <MobileChapterIntro
          id="solution-recognition-heading"
          title="Where the challenge shows up"
          description={solution.problem}
        />
        <ol className="mobile-solution-recognition">
          {solution.recognition.map((item, index) => (
            <li key={item}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </MobileChapter>

      <MobileChapter
        id="solution-outcomes"
        index={3}
        eyebrow="Business outcomes"
        tone="muted"
      >
        <MobileChapterIntro
          id="solution-outcomes-heading"
          title="Business outcomes"
        />
        <ol className="mobile-solution-outcomes">
          {solution.businessOutcomes.map((outcome, index) => (
            <li key={outcome}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{outcome}</p>
            </li>
          ))}
        </ol>
      </MobileChapter>

      <MobileChapter
        id="solution-capabilities"
        index={4}
        eyebrow="What Cobrykz can deliver"
      >
        <MobileChapterIntro
          id="solution-capabilities-heading"
          title="What Cobrykz can deliver"
        />
        <ul className="mobile-solution-deliverable-ledger">
          {solution.deliverables.map((deliverable, index) => (
            <li key={deliverable}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{deliverable}</strong>
            </li>
          ))}
        </ul>
      </MobileChapter>

      <MobileChapter
        id="solution-operating-model"
        index={5}
        eyebrow={operatingAtlas.eyebrow}
        tone="dark"
      >
        <div className="mobile-solution-atlas-stage">
          <MobileAtlasExplorer
            definition={operatingAtlas}
            ariaLabel={`${solution.name} operating model`}
            initialSelectedNodeId={operatingAtlas.nodes[0].id}
            showDefinitionContext
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solution-applications"
        index={6}
        eyebrow="Representative applications"
        tone="muted"
      >
        <MobileChapterIntro
          id="solution-applications-heading"
          title="Representative applications"
        />
        <ul className="mobile-solution-applications">
          {solution.applications.map((application, index) => (
            <li key={application}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{application}</p>
            </li>
          ))}
        </ul>
      </MobileChapter>

      {solution.artifact && (
        <MobileChapter
          id="solution-artifact"
          index={7}
          eyebrow={solution.artifact.eyebrow}
        >
          <MobileChapterIntro
            id="solution-artifact-heading"
            title={solution.artifact.title}
            description={solution.artifact.description}
          />
          <div className="mobile-solution-artifact">
            <MobileSolutionArtifact artifact={solution.artifact} />
          </div>
        </MobileChapter>
      )}

      {solution.guidance && (
        <MobileChapter
          id="solution-guidance"
          index={solution.artifact ? 8 : 7}
          eyebrow="Guidance"
          tone="muted"
        >
          <div className="mobile-solution-guidance">
            <h2 id="solution-guidance-heading">{solution.guidance.title}</h2>
            <p>{solution.guidance.description}</p>
          </div>
        </MobileChapter>
      )}

      <MobileChapter
        id="solution-approach"
        index={approachIndex}
        eyebrow="Engagement approach"
      >
        <MobileChapterIntro
          id="solution-approach-heading"
          title="Engagement approach"
        />
        <div className="mobile-solution-disclosures">
          <MobileDisclosureGroup
            items={solution.approach.map((stage, index) => ({
              id: `approach-${index}`,
              summary: (
                <>
                  <span className="mobile-solution-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{stage.title}</strong>
                </>
              ),
              panel: <p>{stage.description}</p>,
            }))}
            defaultOpenId="approach-0"
            ariaLabel="Engagement approach"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solution-related"
        index={relatedIndex}
        eyebrow="Related solutions"
        tone="muted"
      >
        <MobileChapterIntro
          id="solution-related-heading"
          title="Related solutions"
        />
        <ul className="mobile-solution-related">
          {solution.relatedSlugs.map((slug) => {
            const relatedSolution = solutionBySlug[slug];

            return (
              <li key={slug}>
                <Link
                  href={relatedSolution.href}
                  className="action-transition min-h-11"
                >
                  <strong>{relatedSolution.name}</strong>
                  <span>{relatedSolution.outcome}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </MobileChapter>

      <MobileChapter
        id="solution-faq"
        index={faqIndex}
        eyebrow="Frequently asked questions"
      >
        <MobileChapterIntro
          id="solution-faq-heading"
          title="Frequently asked questions"
        />
        <div className="mobile-solution-disclosures">
          <MobileDisclosureGroup
            items={solution.faqs.map((faq, index) => ({
              id: `faq-${index}`,
              summary: <strong>{faq.question}</strong>,
              panel: <p>{faq.answer}</p>,
            }))}
            ariaLabel="Frequently asked questions"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solution-final-cta"
        index={finalIndex}
        eyebrow={solution.name}
        tone="dark"
      >
        <div className="mobile-solution-final">
          <h2 id="solution-final-cta-heading">{solution.cta.title}</h2>
          <PrimaryLink href={primaryCta.href}>
            {solution.cta.label}
          </PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
