import SystemAtlas from "@/components/atlas/SystemAtlas";
import type { AtlasDefinition } from "@/components/atlas/types";

export const businessSystemCutaway = {
  id: "business-system-cutaway",
  eyebrow: "Business system cutaway",
  title: "How a challenge becomes an operating improvement",
  description:
    "A business challenge moves through assessment, an appropriate technology decision, connected delivery, and continued improvement.",
  readingDirection:
    "Read from left to right: understand the operating context, choose the appropriate capabilities, deliver the connected system, and improve the resulting operation.",
  layers: [
    {
      id: "context",
      label: "Operating context",
      meaning:
        "The challenge, people, information, and tools that define the current situation.",
      depth: 1,
      bounds: { x: 18, y: 44, width: 168, height: 348 },
    },
    {
      id: "assessment",
      label: "Assessment",
      meaning:
        "The context, constraints, priorities, and decisions that shape the right response.",
      depth: 2,
      bounds: { x: 194, y: 74, width: 162, height: 288 },
    },
    {
      id: "delivery",
      label: "Connected delivery",
      meaning:
        "Relevant capabilities stay connected through design, build, integration, deployment, and adoption.",
      depth: 3,
      bounds: { x: 364, y: 58, width: 164, height: 320 },
    },
    {
      id: "outcomes",
      label: "Business outcomes",
      meaning:
        "Growth, efficiency, clarity, and continued improvement become part of the operating system.",
      depth: 4,
      bounds: { x: 536, y: 42, width: 166, height: 350 },
    },
  ],
  nodes: [
    {
      id: "challenge",
      label: "Business challenge",
      detail: "The constraint or opportunity the business needs to address.",
      kind: "context",
      layerId: "context",
      x: 74,
      y: 120,
    },
    {
      id: "people-info",
      label: "People and information",
      detail: "The people and knowledge involved in the work.",
      kind: "context",
      layerId: "context",
      x: 116,
      y: 220,
    },
    {
      id: "tools",
      label: "Existing tools",
      detail: "The technology already supporting or limiting the operation.",
      kind: "system",
      layerId: "context",
      x: 76,
      y: 318,
    },
    {
      id: "assessment-node",
      label: "Assessment",
      detail:
        "Context, constraints, priorities, and decisions are made explicit.",
      kind: "decision",
      layerId: "assessment",
      x: 274,
      y: 178,
    },
    {
      id: "capabilities",
      label: "Relevant capabilities",
      detail:
        "The appropriate combination is chosen without forcing a particular technology.",
      kind: "control",
      layerId: "assessment",
      x: 274,
      y: 284,
    },
    {
      id: "connected-delivery",
      label: "Connected delivery",
      detail:
        "Strategy, design, engineering, integration, deployment, and adoption remain aligned.",
      kind: "system",
      layerId: "delivery",
      x: 446,
      y: 218,
    },
    {
      id: "growth-efficiency",
      label: "Growth and efficiency",
      detail: "The business gains capacity or removes operational friction.",
      kind: "outcome",
      layerId: "outcomes",
      x: 620,
      y: 124,
    },
    {
      id: "clarity",
      label: "Clarity",
      detail: "Ownership, information, decisions, and next steps become clearer.",
      kind: "outcome",
      layerId: "outcomes",
      x: 620,
      y: 220,
    },
    {
      id: "improvement",
      label: "Continued improvement",
      detail:
        "The system remains useful as the operation changes and new needs emerge.",
      kind: "outcome",
      layerId: "outcomes",
      x: 620,
      y: 318,
    },
  ],
  connections: [
    {
      id: "challenge-assessment",
      source: "challenge",
      target: "assessment-node",
      flowLabel: "understand",
      state: "active",
    },
    {
      id: "people-assessment",
      source: "people-info",
      target: "assessment-node",
      flowLabel: "context",
    },
    {
      id: "tools-capabilities",
      source: "tools",
      target: "capabilities",
      flowLabel: "constraints",
    },
    {
      id: "assessment-capabilities",
      source: "assessment-node",
      target: "capabilities",
      flowLabel: "choose",
      state: "active",
    },
    {
      id: "capabilities-delivery",
      source: "capabilities",
      target: "connected-delivery",
      flowLabel: "deliver",
      state: "active",
    },
    {
      id: "delivery-growth",
      source: "connected-delivery",
      target: "growth-efficiency",
      flowLabel: "enable",
    },
    {
      id: "delivery-clarity",
      source: "connected-delivery",
      target: "clarity",
      flowLabel: "align",
    },
    {
      id: "delivery-improvement",
      source: "connected-delivery",
      target: "improvement",
      flowLabel: "improve",
      state: "active",
    },
  ],
  legend: [
    {
      label: "Context plane",
      meaning: "The operating conditions that define the challenge.",
    },
    {
      label: "Decision node",
      meaning: "A point where context determines the appropriate path.",
    },
    {
      label: "Signal path",
      meaning: "The movement from understanding into useful improvement.",
    },
  ],
} as const satisfies AtlasDefinition;

export default function BusinessSystemCutaway() {
  return (
    <SystemAtlas
      definition={businessSystemCutaway}
      tone="dark"
      className="business-system-cutaway"
    />
  );
}
