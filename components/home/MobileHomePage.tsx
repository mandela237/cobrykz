"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  aiPrinciples,
  challengeRoutes,
  homeMessage,
  homeOutcomes,
  homePageCopy,
  processStages,
  whyCobrykz,
} from "@/components/content/home";
import {
  primaryCta,
  processCta,
  solutionsCta,
} from "@/components/content/site";
import {
  solutionBySlug,
  solutions,
  type SolutionSlug,
} from "@/components/content/solutions";
import { businessSystemCutaway } from "@/components/home/BusinessSystemCutaway";
import MobileAtlasPath from "@/components/mobile/MobileAtlasPath";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import PrimaryLink from "@/components/ui/PrimaryLink";

const itemId = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

type MobileHomePageProps = {
  closing: ReactNode;
};

export default function MobileHomePage({ closing }: MobileHomePageProps) {
  const [selectedAtlasNodeId, setSelectedAtlasNodeId] = useState("challenge");
  const [selectedSlug, setSelectedSlug] =
    useState<SolutionSlug>("business-automation");
  const selectedChallenge = challengeRoutes[selectedSlug];
  const selectedSolution = solutionBySlug[selectedSlug];

  return (
    <div data-mobile-homepage>
      <MobileChapter
        id="home-opening"
        index={1}
        eyebrow="Opening"
        tone="dark"
      >
        <div className="mobile-home-hero">
          <p className="mobile-home-kicker">{homePageCopy.hero.eyebrow}</p>
          <h1 id="home-hero-heading">{homeMessage.headline}</h1>
          <p className="mobile-home-lead">{homeMessage.description}</p>
          <div className="mobile-home-actions">
            <PrimaryLink href={primaryCta.href}>{primaryCta.label}</PrimaryLink>
            <Link
              href={solutionsCta.href}
              className="mobile-home-secondary-action action-transition"
            >
              {solutionsCta.label}
            </Link>
          </div>
        </div>
        <div className="mobile-home-atlas-plane">
          <p className="mobile-home-artifact-label">
            {businessSystemCutaway.eyebrow}
          </p>
          <MobileAtlasPath
            definition={businessSystemCutaway}
            selectedNodeId={selectedAtlasNodeId}
            onSelectNode={setSelectedAtlasNodeId}
            ariaLabel={businessSystemCutaway.title}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="outcomes"
        index={2}
        eyebrow="Business outcomes"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.outcomes.title}</h2>
          <p>{homePageCopy.outcomes.description}</p>
        </div>
        <div className="mobile-home-outcome-plane">
          <MobileDisclosureGroup
            items={homeOutcomes}
            getId={(outcome) => itemId(outcome.title)}
            defaultOpenId="grow-more-effectively"
            ariaLabel="Business outcomes"
            renderSummary={(outcome, index) => (
              <>
                <span className="mobile-home-row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{outcome.title}</strong>
              </>
            )}
            renderPanel={(outcome) => <p>{outcome.description}</p>}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="solutions"
        index={3}
        eyebrow="Solutions"
        tone="muted"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.solutions.title}</h2>
          <p>{homePageCopy.solutions.description}</p>
        </div>
        <div className="mobile-home-ledger">
          <MobileDisclosureGroup
            items={solutions}
            getId={(solution) => solution.slug}
            defaultOpenId="ai"
            ariaLabel="Cobrykz solutions"
            renderSummary={(solution, index) => (
              <>
                <span className="mobile-home-row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{solution.name}</strong>
              </>
            )}
            renderPanel={(solution) => (
              <>
                <p>{solution.outcome}</p>
                <Link href={solution.href} className="mobile-home-text-link action-transition">
                  Explore {solution.name}
                </Link>
              </>
            )}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="why-cobrykz"
        index={4}
        eyebrow="Why Cobrykz"
        tone="dark"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.whyCobrykz.title}</h2>
          <p>{homePageCopy.whyCobrykz.description}</p>
        </div>
        <div className="mobile-home-trust-grid">
          <MobileDisclosureGroup
            items={whyCobrykz}
            getId={(reason) => itemId(reason.title)}
            defaultOpenId="business-first-strategy"
            ariaLabel="Cobrykz accountability principles"
            renderSummary={(reason, index) => (
              <>
                <span className="mobile-home-row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{reason.title}</strong>
              </>
            )}
            renderPanel={(reason) => <p>{reason.description}</p>}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="ai-point-of-view"
        index={5}
        eyebrow="AI point of view"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.ai.title}</h2>
          <p>{homePageCopy.ai.description}</p>
        </div>
        <div className="mobile-home-ai-artifact" data-decision-artifact>
          <p className="mobile-home-artifact-label">Decision model</p>
          <MobileDisclosureGroup
            items={aiPrinciples}
            getId={(principle) => itemId(principle.title)}
            defaultOpenId="ai-should-improve-real-work"
            ariaLabel="AI decision principles"
            renderSummary={(principle, index) => (
              <>
                <span className="mobile-home-row-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{principle.title}</strong>
              </>
            )}
            renderPanel={(principle) => <p>{principle.description}</p>}
          />
        </div>
      </MobileChapter>

      <MobileChapter
        id="challenge-router"
        index={6}
        eyebrow="Challenge router"
        tone="muted"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.challengeRouter.title}</h2>
        </div>
        <div
          role="group"
          aria-label="Business challenges"
          className="mobile-home-challenge-list"
        >
          {Object.values(challengeRoutes).map((challenge) => {
            const isSelected = challenge.solutionSlug === selectedSlug;

            return (
              <button
                key={challenge.solutionSlug}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSlug(challenge.solutionSlug)}
                className="mobile-home-challenge-control action-transition"
              >
                {challenge.label}
              </button>
            );
          })}
        </div>
        <section
          aria-live="polite"
          aria-label="Selected recommendation"
          className="mobile-home-recommendation"
        >
          <p className="mobile-home-artifact-label">Recommended path</p>
          <h3>{selectedChallenge.label}</h3>
          <p>{selectedChallenge.description}</p>
          <ol className="mobile-home-challenge-thread" aria-label="Atlas thread">
            <li>
              <span>01</span>
              <strong>{selectedChallenge.label}</strong>
            </li>
            <li>
              <span>02</span>
              <strong>{homePageCopy.challengeRouter.assessment}</strong>
            </li>
            <li>
              <span>03</span>
              <strong>{selectedSolution.name}</strong>
            </li>
          </ol>
          <p>{selectedSolution.outcome}</p>
          <Link
            href={selectedSolution.href}
            className="mobile-home-text-link action-transition"
          >
            Explore {selectedSolution.name}
          </Link>
        </section>
      </MobileChapter>

      <MobileChapter
        id="process"
        index={7}
        eyebrow="Process"
      >
        <div className="mobile-home-chapter-intro">
          <h2>{homePageCopy.process.title}</h2>
          <p>{homePageCopy.process.description}</p>
        </div>
        <div className="mobile-home-process-rail">
          <MobileDisclosureGroup
            items={processStages}
            getId={(stage) => itemId(stage.title)}
            defaultOpenId="discover"
            ariaLabel="Cobrykz delivery process"
            renderSummary={(stage, index) => (
              <>
                <span className="mobile-home-process-node">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{stage.title}</strong>
              </>
            )}
            renderPanel={(stage) => <p>{stage.description}</p>}
          />
          <Link
            href={processCta.href}
            className="mobile-home-text-link action-transition"
          >
            {processCta.label}
          </Link>
        </div>
      </MobileChapter>

      <div className="mobile-home-closing">{closing}</div>
    </div>
  );
}
