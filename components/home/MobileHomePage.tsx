import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  aiPrinciples,
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
import { solutions } from "@/components/content/solutions";
import { businessSystemCutaway } from "@/components/home/BusinessSystemCutaway";
import MobileChallengeRouter from "@/components/home/MobileChallengeRouter";
import MobileHomeAtlas from "@/components/home/MobileHomeAtlas";
import MobileChapter from "@/components/mobile/MobileChapter";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";
import PrimaryLink from "@/components/ui/PrimaryLink";

const itemId = (value: string) =>
  value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

type MobileHomePageProps = {
  closing: ReactNode;
};

export default function MobileHomePage({ closing }: MobileHomePageProps) {
  return (
    <div data-mobile-homepage>
      <MobileChapter
        id="home-opening"
        index={1}
        eyebrow="Opening"
        tone="dark"
      >
        <div data-mobile-recognition-frame="homepage">
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

          <figure className="mobile-home-human-frame" data-mobile-human-proof>
            <Image
              src="/mandela-portrait-sharp.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 40px), 1px"
              className="mobile-home-human-frame__image"
            />
          </figure>

          <div className="mobile-home-atlas-plane">
            <p className="mobile-home-artifact-label">
              {businessSystemCutaway.eyebrow}
            </p>
            <MobileHomeAtlas
              definition={businessSystemCutaway}
              ariaLabel={businessSystemCutaway.title}
              initialSelectedNodeId="challenge"
            />
          </div>
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
            items={homeOutcomes.map((outcome, index) => ({
              id: itemId(outcome.title),
              summary: (
                <>
                  <span className="mobile-home-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{outcome.title}</strong>
                </>
              ),
              panel: <p>{outcome.description}</p>,
            }))}
            defaultOpenId="grow-more-effectively"
            ariaLabel="Business outcomes"
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
            items={solutions.map((solution, index) => ({
              id: solution.slug,
              summary: (
                <>
                  <span className="mobile-home-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{solution.name}</strong>
                </>
              ),
              panel: (
                <>
                  <p>{solution.outcome}</p>
                  <Link
                    href={solution.href}
                    className="mobile-home-text-link action-transition"
                  >
                    Explore {solution.name}
                  </Link>
                </>
              ),
            }))}
            defaultOpenId="ai"
            ariaLabel="Cobrykz solutions"
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
            items={whyCobrykz.map((reason, index) => ({
              id: itemId(reason.title),
              summary: (
                <>
                  <span className="mobile-home-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{reason.title}</strong>
                </>
              ),
              panel: <p>{reason.description}</p>,
            }))}
            defaultOpenId="business-first-strategy"
            ariaLabel="Cobrykz accountability principles"
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
            items={aiPrinciples.map((principle, index) => ({
              id: itemId(principle.title),
              summary: (
                <>
                  <span className="mobile-home-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{principle.title}</strong>
                </>
              ),
              panel: <p>{principle.description}</p>,
            }))}
            defaultOpenId="ai-should-improve-real-work"
            ariaLabel="AI decision principles"
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
        <MobileChallengeRouter />
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
            items={processStages.map((stage, index) => ({
              id: itemId(stage.title),
              summary: (
                <>
                  <span className="mobile-home-process-node">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{stage.title}</strong>
                </>
              ),
              panel: <p>{stage.description}</p>,
            }))}
            defaultOpenId="discover"
            ariaLabel="Cobrykz delivery process"
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
