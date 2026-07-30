"use client";

import Link from "next/link";
import { useState } from "react";
import type { SolutionSlug } from "@/components/content/solutions";
import { solutionBySlug } from "@/components/content/solutions";
import { capabilityRelationship } from "@/components/solutions/CapabilityRelationshipAtlas";
import MobileAtlasPath from "@/components/mobile/MobileAtlasPath";

const solutionSlugByNodeId = {
  consulting: "technology-consulting",
  software: "custom-software-development",
  systems: "digital-business-systems",
  automation: "business-automation",
  ai: "ai",
  web: "websites-web-applications",
} as const satisfies Record<string, SolutionSlug>;

export default function MobileCapabilityAtlas() {
  const [selectedNodeId, setSelectedNodeId] = useState("consulting");
  const selectedSolution =
    solutionBySlug[
      solutionSlugByNodeId[
        selectedNodeId as keyof typeof solutionSlugByNodeId
      ] ?? "technology-consulting"
    ];

  return (
    <div className="mobile-solutions-atlas">
      <MobileAtlasPath
        definition={capabilityRelationship}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
        ariaLabel={capabilityRelationship.title}
      />
      <div
        className="mobile-solutions-atlas__action"
        aria-live="polite"
      >
        <span>Selected capability</span>
        <Link
          href={selectedSolution.href}
          className="action-transition min-h-11"
        >
          Explore {selectedSolution.name}
        </Link>
      </div>
    </div>
  );
}
