"use client";

import Link from "next/link";
import { useState } from "react";
import { challengeRoutes, homePageCopy } from "@/components/content/home";
import { primaryCta } from "@/components/content/site";
import {
  solutionBySlug,
  type SolutionSlug,
} from "@/components/content/solutions";

export default function MobileChallengeRouter() {
  const [selectedSlug, setSelectedSlug] =
    useState<SolutionSlug>("business-automation");
  const selectedChallenge = challengeRoutes[selectedSlug];
  const selectedSolution = solutionBySlug[selectedSlug];

  return (
    <>
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
        <div className="mobile-home-recommendation-actions">
          <Link
            href={selectedSolution.href}
            className="mobile-home-text-link action-transition"
          >
            Explore {selectedSolution.name}
          </Link>
          <Link
            href={primaryCta.href}
            className="mobile-home-recommendation-primary action-transition"
          >
            {primaryCta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
