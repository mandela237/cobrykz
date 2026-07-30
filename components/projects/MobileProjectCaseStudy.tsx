import Link from "next/link";
import type { PublishedProjectDefinition } from "@/components/content/projects";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import {
  getMobileProjectCaseStudy,
  type ProjectMobileChapterField,
} from "@/components/projects/projectMobileModel";
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileProjectCaseStudyProps = {
  project: PublishedProjectDefinition;
};

export default function MobileProjectCaseStudy({
  project,
}: MobileProjectCaseStudyProps) {
  const view = getMobileProjectCaseStudy(project);
  const chapters = view.chapters;
  const transformationStages = view.transformationStages;
  const chapterIndex = (field: ProjectMobileChapterField) =>
    chapters.findIndex((chapter) => chapter.field === field) + 3;

  return (
    <div data-mobile-project-case-study>
      <MobileChapter
        id="project-introduction"
        index={1}
        eyebrow="Project introduction"
      >
        <div className="mobile-project-detail-opening">
          <Link
            href="/projects"
            className="mobile-project-detail-back action-transition"
          >
            Back to projects
          </Link>
          <p className="mobile-project-detail-kicker">
            Business case study
          </p>
          <h1 id="project-title">{project.title}</h1>
          <p className="mobile-project-detail-summary">
            {project.summary}
          </p>
        </div>
      </MobileChapter>

      <MobileChapter
        id="project-transformation"
        index={2}
        eyebrow="Transformation record"
        tone="muted"
      >
        <ol
          aria-label="Transformation record"
          className="mobile-project-transformation"
        >
          {transformationStages.map((stage, index) => (
            <li key={stage.label}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{stage.label}</strong>
            </li>
          ))}
        </ol>
      </MobileChapter>

      {project.context?.length ? (
        <MobileChapter
          id="project-context"
          index={chapterIndex("context")}
          eyebrow="Condition"
        >
          <div className="mobile-project-detail-prose">
            <h2 id="project-context-heading">Business context</h2>
            {project.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </MobileChapter>
      ) : null}

      {project.challenge?.length ? (
        <MobileChapter
          id="project-challenge"
          index={chapterIndex("challenge")}
          eyebrow="Condition"
          tone="muted"
        >
          <div className="mobile-project-detail-ledger">
            <h2 id="project-challenge-heading">Challenge</h2>
            <ul>
              {project.challenge.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </MobileChapter>
      ) : null}

      {project.strategy?.length ? (
        <MobileChapter
          id="project-strategy"
          index={chapterIndex("strategy")}
          eyebrow="Decision"
        >
          <div className="mobile-project-detail-prose">
            <h2 id="project-strategy-heading">
              Assessment and strategy
            </h2>
            {project.strategy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </MobileChapter>
      ) : null}

      {project.solution?.length ? (
        <MobileChapter
          id="project-solution"
          index={chapterIndex("solution")}
          eyebrow="Designed response"
          tone="dark"
        >
          <div className="mobile-project-detail-prose mobile-project-detail-prose--dark">
            <h2 id="project-solution-heading">Solution</h2>
            {project.solution.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </MobileChapter>
      ) : null}

      {project.howItWorks?.length ? (
        <MobileChapter
          id="project-how"
          index={chapterIndex("howItWorks")}
          eyebrow="Designed response"
          tone="muted"
        >
          <div className="mobile-project-detail-disclosures">
            <h2 id="project-how-heading">How it works</h2>
            <MobileDisclosureGroup
              items={project.howItWorks.map((step, index) => ({
                id: `step-${index + 1}`,
                summary: (
                  <>
                    <span className="mobile-projects-row-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{step.title}</strong>
                  </>
                ),
                panel: <p>{step.description}</p>,
              }))}
              defaultOpenId="step-1"
              ariaLabel="How it works"
            />
          </div>
        </MobileChapter>
      ) : null}

      {project.capabilities?.length ? (
        <MobileChapter
          id="project-capabilities"
          index={chapterIndex("capabilities")}
          eyebrow="Implementation"
        >
          <div className="mobile-project-detail-links">
            <h2 id="project-capabilities-heading">
              Capabilities combined
            </h2>
            <ul>
              {project.capabilities.map((capability) => (
                <li key={capability.name}>
                  {capability.href ? (
                    <Link href={capability.href}>
                      {capability.name}
                    </Link>
                  ) : (
                    <span>{capability.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </MobileChapter>
      ) : null}

      {project.implementation?.length ? (
        <MobileChapter
          id="project-implementation"
          index={chapterIndex("implementation")}
          eyebrow="Implementation"
          tone="muted"
        >
          <div className="mobile-project-detail-prose">
            <h2 id="project-implementation-heading">
              Implementation and partnership
            </h2>
            {project.implementation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </MobileChapter>
      ) : null}

      {project.verifiedOutcomes?.length ? (
        <MobileChapter
          id="project-outcomes"
          index={chapterIndex("verifiedOutcomes")}
          eyebrow="Verified change"
        >
          <div className="mobile-project-detail-disclosures mobile-project-outcomes">
            <h2 id="project-outcomes-heading">Verified outcomes</h2>
            <MobileDisclosureGroup
              items={project.verifiedOutcomes.map((outcome, index) => ({
                id: `outcome-${index + 1}`,
                summary: (
                  <>
                    <span className="mobile-projects-row-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{outcome.result}</strong>
                  </>
                ),
                panel: (
                  <>
                    <p>{outcome.evidence}</p>
                    {outcome.verifiedAt ? (
                      <p className="mobile-project-verified-at">
                        Verified{" "}
                        <time dateTime={outcome.verifiedAt}>
                          {outcome.verifiedAt}
                        </time>
                      </p>
                    ) : null}
                  </>
                ),
              }))}
              defaultOpenId="outcome-1"
              ariaLabel="Verified outcomes"
            />
          </div>
        </MobileChapter>
      ) : null}

      {project.authorizedQuote ? (
        <MobileChapter
          id="project-perspective"
          index={chapterIndex("authorizedQuote")}
          eyebrow="Authorized perspective"
          tone="dark"
        >
          <div className="mobile-project-perspective">
            <h2 id="project-perspective-heading">
              Authorized client perspective
            </h2>
            <blockquote>
              <p>&ldquo;{project.authorizedQuote.quote}&rdquo;</p>
              <footer>
                <strong>{project.authorizedQuote.attribution}</strong>
                {project.authorizedQuote.role ? (
                  <span>{project.authorizedQuote.role}</span>
                ) : null}
                {project.authorizedQuote.organization ? (
                  <span>{project.authorizedQuote.organization}</span>
                ) : null}
              </footer>
            </blockquote>
          </div>
        </MobileChapter>
      ) : null}

      {project.nextStage?.length ? (
        <MobileChapter
          id="project-next-stage"
          index={chapterIndex("nextStage")}
          eyebrow="Next stage"
          tone="muted"
        >
          <div className="mobile-project-detail-ledger">
            <h2 id="project-next-stage-heading">Next stage</h2>
            <ul>
              {project.nextStage.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </MobileChapter>
      ) : null}

      {project.relatedContent?.length ? (
        <MobileChapter
          id="project-related"
          index={chapterIndex("relatedContent")}
          eyebrow="Related content"
        >
          <div className="mobile-project-detail-links">
            <h2 id="project-related-heading">Related content</h2>
            <ul>
              {project.relatedContent.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </MobileChapter>
      ) : null}

      <MobileChapter
        id="project-cta"
        index={chapters.length + 3}
        eyebrow="Project call to action"
        tone="dark"
      >
        <div className="mobile-project-detail-cta">
          <h2 id="project-cta-heading">
            What could technology improve in your business?
          </h2>
          <p>
            Begin with a challenge, bottleneck, or opportunity. You do not
            need a technical brief to start a useful conversation.
          </p>
          <PrimaryLink href="/contact">
            Discuss a business challenge
          </PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
