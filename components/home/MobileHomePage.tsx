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
import PrimaryLink from "@/components/ui/PrimaryLink";

type MobileHomePageProps = {
  closing: ReactNode;
};

export default function MobileHomePage({ closing }: MobileHomePageProps) {
  return (
    <div data-mobile-homepage data-mobile-art-direction="measured-humanism">
      <section
        id="home-opening"
        aria-labelledby="home-hero-heading"
        className="measured-threshold"
        data-mobile-scene="threshold"
      >
        <div className="section-shell measured-threshold__inner">
          <p className="measured-kicker">{homePageCopy.hero.eyebrow}</p>
          <h1 id="home-hero-heading" className="measured-threshold__title">
            {homeMessage.headline}
          </h1>
          <p className="measured-threshold__lead">{homeMessage.description}</p>
          <div className="measured-threshold__actions">
            <PrimaryLink href={primaryCta.href}>{primaryCta.label}</PrimaryLink>
            <Link
              href={solutionsCta.href}
              className="measured-text-link action-transition"
            >
              {solutionsCta.label}
            </Link>
          </div>
          <figure className="measured-threshold__portrait">
            <Image
              src="/mandela-portrait-sharp.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 80px), 1px"
              className="measured-threshold__portrait-image"
            />
          </figure>
        </div>
      </section>

      <section
        aria-label={businessSystemCutaway.title}
        className="measured-system"
        data-mobile-scene="system"
      >
        <div className="section-shell measured-system__inner">
          <div className="measured-system__heading">
            <p className="measured-scene-label">
              {businessSystemCutaway.eyebrow}
            </p>
            <p>{businessSystemCutaway.description}</p>
          </div>
          <div className="measured-system__artifact">
            <MobileHomeAtlas
              definition={businessSystemCutaway}
              ariaLabel={businessSystemCutaway.title}
              initialSelectedNodeId="challenge"
            />
          </div>
        </div>
      </section>

      <section
        id="outcomes"
        aria-labelledby="measured-outcomes-heading"
        className="measured-outcomes"
        data-mobile-scene="outcomes"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading measured-scene-heading--offset">
            <p className="measured-scene-label">Business outcomes</p>
            <h2 id="measured-outcomes-heading">
              {homePageCopy.outcomes.title}
            </h2>
            <p>{homePageCopy.outcomes.description}</p>
          </div>
          <ol className="measured-outcomes__list">
            {homeOutcomes.map((outcome, index) => (
              <li key={outcome.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="solutions"
        aria-labelledby="measured-capabilities-heading"
        className="measured-capabilities"
        data-mobile-scene="capabilities"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading">
            <p className="measured-scene-label">Solutions</p>
            <h2 id="measured-capabilities-heading">
              {homePageCopy.solutions.title}
            </h2>
            <p>{homePageCopy.solutions.description}</p>
          </div>
          <ol className="measured-capabilities__index">
            {solutions.map((solution, index) => (
              <li key={solution.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{solution.name}</h3>
                  <p>{solution.outcome}</p>
                  <Link href={solution.href} className="measured-text-link">
                    Explore {solution.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="why-cobrykz"
        aria-labelledby="measured-trust-heading"
        className="measured-trust"
        data-mobile-scene="trust"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading measured-scene-heading--dark">
            <p className="measured-scene-label">Why Cobrykz</p>
            <h2 id="measured-trust-heading">
              {homePageCopy.whyCobrykz.title}
            </h2>
            <p>{homePageCopy.whyCobrykz.description}</p>
          </div>
          <ol className="measured-trust__principles">
            {whyCobrykz.map((reason, index) => (
              <li key={reason.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="ai-point-of-view"
        aria-labelledby="measured-decision-heading"
        className="measured-decision"
        data-mobile-scene="decision"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading measured-scene-heading--offset">
            <p className="measured-scene-label">AI point of view</p>
            <h2 id="measured-decision-heading">{homePageCopy.ai.title}</h2>
            <p>{homePageCopy.ai.description}</p>
          </div>
          <div className="measured-decision__sheet" data-decision-artifact>
            <p className="measured-scene-label">Decision model</p>
            <ol>
              {aiPrinciples.map((principle, index) => (
                <li key={principle.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="challenge-router"
        aria-labelledby="measured-challenge-heading"
        className="measured-challenge"
        data-mobile-scene="challenge"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading">
            <p className="measured-scene-label">Challenge router</p>
            <h2 id="measured-challenge-heading">
              {homePageCopy.challengeRouter.title}
            </h2>
          </div>
          <MobileChallengeRouter />
        </div>
      </section>

      <section
        id="process"
        aria-labelledby="measured-process-heading"
        className="measured-process"
        data-mobile-scene="process"
      >
        <div className="section-shell measured-scene-shell">
          <div className="measured-scene-heading measured-scene-heading--offset">
            <p className="measured-scene-label">Process</p>
            <h2 id="measured-process-heading">{homePageCopy.process.title}</h2>
            <p>{homePageCopy.process.description}</p>
          </div>
          <ol className="measured-process__sequence">
            {processStages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href={processCta.href} className="measured-text-link">
            {processCta.label}
          </Link>
        </div>
      </section>

      <div className="mobile-home-closing">{closing}</div>
    </div>
  );
}
