"use client";

import Link from "next/link";
import { useState } from "react";
import { challengeRoutes } from "@/components/content/home";
import {
  solutionBySlug,
  type SolutionSlug,
} from "@/components/content/solutions";

export default function ChallengeRouter() {
  const [selectedSlug, setSelectedSlug] =
    useState<SolutionSlug>("business-automation");
  const selectedChallenge = challengeRoutes[selectedSlug];
  const selectedSolution = solutionBySlug[selectedSlug];

  return (
    <section aria-labelledby="challenge-router-title">
      <h2 id="challenge-router-title">What is holding the work back?</h2>
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

      <div aria-live="polite" className="mt-6 rounded-lg border border-border p-5">
        <p className="text-slate">{selectedChallenge.description}</p>
        <p className="mt-3 font-medium text-navy">
          A focused assessment confirms the right approach.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link href={selectedSolution.href} className="font-semibold text-blue underline">
            Explore {selectedSolution.name}
          </Link>
          <Link href="/contact" className="font-semibold text-navy underline">
            Discuss this challenge
          </Link>
        </div>
      </div>
    </section>
  );
}
