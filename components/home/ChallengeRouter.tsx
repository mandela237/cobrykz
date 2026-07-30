"use client";

import Link from "next/link";
import { useState } from "react";
import { challengeRoutes, homePageCopy } from "@/components/content/home";
import { primaryCta } from "@/components/content/site";
import {
  solutionBySlug,
  type SolutionSlug,
} from "@/components/content/solutions";
import HomeSystemThread from "@/components/home/HomeSystemThread";

export default function ChallengeRouter() {
  const [selectedSlug, setSelectedSlug] =
    useState<SolutionSlug>("business-automation");
  const selectedChallenge = challengeRoutes[selectedSlug];
  const selectedSolution = solutionBySlug[selectedSlug];
  const threadItems = [
    {
      id: "challenge",
      label: selectedChallenge.label,
      detail: selectedChallenge.description,
      state: "complete" as const,
    },
    {
      id: "assessment",
      label: homePageCopy.challengeRouter.assessment,
      state: "active" as const,
    },
    {
      id: "solution",
      label: selectedSolution.name,
      detail: selectedSolution.outcome,
      state: "next" as const,
    },
  ];

  return (
    <section
      aria-labelledby="challenge-router-title"
      className="home-challenge-router"
    >
      <h2
        id="challenge-router-title"
        className="max-w-3xl text-[2rem] font-extrabold leading-[1.08] text-navy sm:text-[2.5rem] lg:text-5xl"
      >
        {homePageCopy.challengeRouter.title}
      </h2>
      <div aria-label="Business challenges" className="grid gap-3 sm:grid-cols-2">
        {Object.values(challengeRoutes).map((challenge) => {
          const isSelected = challenge.solutionSlug === selectedSlug;

          return (
            <button
              key={challenge.solutionSlug}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedSlug(challenge.solutionSlug)}
              className={`min-h-11 rounded-lg border px-4 py-3 text-left transition-colors ${
                isSelected
                  ? "border-navy bg-navy text-white ring-2 ring-blue ring-offset-2"
                  : "border-border bg-white text-navy hover:border-blue"
              }`}
            >
              <span className="block font-semibold">{challenge.label}</span>
              <span className="mt-1 block text-sm leading-5 opacity-80">
                {isSelected ? "Selected" : challenge.description}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="home-architectural-frame mt-7 border border-border p-5 sm:p-8"
      >
        <p className="text-slate">{selectedChallenge.description}</p>
        <p className="mt-3 font-medium text-navy">
          {homePageCopy.challengeRouter.assessment}
        </p>
        <div className="mt-7 border-t border-border pt-7">
          <HomeSystemThread
            ariaLabel="Selected challenge path"
            items={threadItems}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href={selectedSolution.href}
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-blue underline decoration-blue/30 underline-offset-4 transition-colors hover:text-navy"
          >
            Explore {selectedSolution.name}
          </Link>
          <Link
            href={primaryCta.href}
            className="inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
