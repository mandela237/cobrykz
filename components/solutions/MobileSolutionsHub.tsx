import Link from "next/link";
import {
  homeOutcomes,
  processStages,
  whyCobrykz,
} from "@/components/content/home";
import { primaryCta } from "@/components/content/site";
import {
  solutionBySlug,
  solutions,
} from "@/components/content/solutions";
import type {
  SolutionDefinition,
} from "@/components/content/solutions";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import MobileCapabilityAtlas from "@/components/solutions/MobileCapabilityAtlas";
import type { SelectionRow } from "@/components/solutions/SolutionSelectionMatrix";
import { capabilityRelationship } from "@/components/solutions/CapabilityRelationshipAtlas";
import PrimaryLink from "@/components/ui/PrimaryLink";

type SectionCopy = {
  title: string;
  description: string;
};

export type SolutionsHubCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  outcomes: SectionCopy;
  portfolio: SectionCopy;
  selection: SectionCopy;
  connected: SectionCopy;
  method: SectionCopy;
  why: SectionCopy;
  cta: SectionCopy;
};

export type OperatingContext = {
  title: string;
  description: string;
};

type MobileSolutionsHubProps = {
  copy: SolutionsHubCopy;
  outcomeStartingPoints: readonly SolutionDefinition[];
  selectionRows: readonly SelectionRow[];
  operatingContexts: readonly OperatingContext[];
};

const itemId = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("&", "and")
    .replaceAll(",", "");

function ChapterIntro({
  headingId,
  title,
  description,
}: {
  headingId: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mobile-solutions-intro">
      <h2 id={headingId}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function MobileSolutionsHub({
  copy,
  outcomeStartingPoints,
  selectionRows,
  operatingContexts,
}: MobileSolutionsHubProps) {
  return (
    <div data-mobile-solutions-hub>
      <MobileChapter
        id="solutions-hub-hero"
        index={1}
        eyebrow="Capability exploration"
        tone="muted"
      >
        <div className="mobile-solutions-opening">
          <p className="mobile-solutions-kicker">{copy.hero.eyebrow}</p>
          <h1 id="solutions-hub-hero-heading">{copy.hero.title}</h1>
          <p className="mobile-solutions-lead">{copy.hero.description}</p>
          <PrimaryLink href="#solutions-hub-outcomes">
            {copy.hero.action}
          </PrimaryLink>
        </div>
        <div className="mobile-solutions-opening__index" aria-hidden="true">
          <span>Challenge</span>
          <span>Capability</span>
          <span>Connected outcome</span>
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-outcomes"
        index={2}
        eyebrow="Business outcomes"
      >
        <ChapterIntro
          headingId="solutions-hub-outcomes-heading"
          {...copy.outcomes}
        />
        <div className="mobile-solutions-outcomes">
          <MobileDisclosureGroup
            items={homeOutcomes.map((outcome, index) => {
              const startingPoint = outcomeStartingPoints[index];

              return {
                id: itemId(outcome.title),
                summary: (
                  <>
                    <span className="mobile-solutions-row-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{outcome.title}</strong>
                  </>
                ),
                panel: (
                  <>
                    <p>{outcome.description}</p>
                    <Link
                      href={startingPoint.href}
                      className="mobile-solutions-text-link action-transition"
                    >
                      Consider {startingPoint.name}
                    </Link>
                  </>
                ),
              };
            })}
            defaultOpenId="grow-more-effectively"
            ariaLabel="Business outcomes"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-portfolio"
        index={3}
        eyebrow="Capability ledger"
        tone="muted"
      >
        <ChapterIntro
          headingId="solutions-hub-portfolio-heading"
          {...copy.portfolio}
        />
        <div className="mobile-solutions-capability-ledger">
          <MobileDisclosureGroup
            items={solutions.map((solution, index) => ({
              id: solution.slug,
              summary: (
                <>
                  <span className="mobile-solutions-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{solution.name}</strong>
                </>
              ),
              panel: (
                <>
                  <p className="mobile-solutions-capability-problem">
                    {solution.problem}
                  </p>
                  <p className="mobile-solutions-capability-outcome">
                    {solution.outcome}
                  </p>
                  <Link
                    href={solution.href}
                    className="mobile-solutions-text-link action-transition"
                  >
                    Explore {solution.name}
                  </Link>
                </>
              ),
            }))}
            defaultOpenId="ai"
            ariaLabel="Cobrykz capabilities"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-selection"
        index={4}
        eyebrow="Starting point"
      >
        <ChapterIntro
          headingId="solutions-hub-selection-heading"
          {...copy.selection}
        />
        <div className="mobile-solutions-condition-list">
          <MobileDisclosureGroup
            items={selectionRows.map((row, index) => ({
              id: itemId(row.condition),
              summary: (
                <>
                  <span className="mobile-solutions-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{row.condition}</strong>
                </>
              ),
              panel: (
                <>
                  <p>{row.signal}</p>
                  <ul className="mobile-solutions-condition-links">
                    {row.solutionSlugs.map((slug) => {
                      const solution = solutionBySlug[slug];

                      return (
                        <li key={slug}>
                          <Link
                            href={solution.href}
                            className="mobile-solutions-text-link action-transition"
                          >
                            {solution.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ),
            }))}
            defaultOpenId="unclear-ai-opportunity"
            ariaLabel="Business conditions and likely starting solutions"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-connected"
        index={5}
        eyebrow="Relationship atlas"
        tone="dark"
      >
        <ChapterIntro
          headingId="solutions-hub-connected-heading"
          {...copy.connected}
        />
        <div className="mobile-solutions-atlas-stage">
          <p className="mobile-solutions-artifact-label">
            {capabilityRelationship.eyebrow}
          </p>
          <MobileCapabilityAtlas />
        </div>
        <div className="mobile-solutions-context">
          <p className="mobile-solutions-context__label">Operating context</p>
          <MobileDisclosureGroup
            items={operatingContexts.map((context, index) => ({
              id: itemId(context.title),
              summary: (
                <>
                  <span className="mobile-solutions-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{context.title}</strong>
                </>
              ),
              panel: <p>{context.description}</p>,
            }))}
            defaultOpenId="customer-experience"
            ariaLabel="Connected operating context"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-method"
        index={6}
        eyebrow="First decisions"
        tone="muted"
      >
        <ChapterIntro
          headingId="solutions-hub-method-heading"
          {...copy.method}
        />
        <div className="mobile-solutions-process-rail">
          <MobileDisclosureGroup
            items={processStages.slice(0, 3).map((stage, index) => ({
              id: itemId(stage.title),
              summary: (
                <>
                  <span className="mobile-solutions-process-node">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{stage.title}</strong>
                </>
              ),
              panel: <p>{stage.description}</p>,
            }))}
            defaultOpenId="discover"
            ariaLabel="Discover, Assess, and Design progression"
          />
          <Link
            href="/process"
            className="mobile-solutions-text-link action-transition"
          >
            See how the full process works
          </Link>
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-why"
        index={7}
        eyebrow="Why Cobrykz"
      >
        <ChapterIntro
          headingId="solutions-hub-why-heading"
          {...copy.why}
        />
        <div className="mobile-solutions-trust-ledger">
          <MobileDisclosureGroup
            items={whyCobrykz.map((reason, index) => ({
              id: itemId(reason.title),
              summary: (
                <>
                  <span className="mobile-solutions-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{reason.title}</strong>
                </>
              ),
              panel: <p>{reason.description}</p>,
            }))}
            defaultOpenId="business-first-strategy"
            ariaLabel="Why Cobrykz"
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions-hub-cta"
        index={8}
        eyebrow="Begin the partnership"
        tone="dark"
      >
        <div className="mobile-solutions-final">
          <h2 id="solutions-hub-cta-heading">{copy.cta.title}</h2>
          <p>{copy.cta.description}</p>
          <PrimaryLink href={primaryCta.href}>
            {primaryCta.label}
          </PrimaryLink>
        </div>
      </MobileChapter>
    </div>
  );
}
