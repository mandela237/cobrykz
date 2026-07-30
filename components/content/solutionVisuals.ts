import type { AtlasDefinition } from "@/components/atlas/types";
import type { SolutionSlug } from "@/components/content/solutions";

export type SolutionVisualKind =
  | "controlled-ai-loop"
  | "workflow-transformation"
  | "ownership-boundary"
  | "operating-environment"
  | "service-delivery-cutaway"
  | "decision-landscape";

export type SolutionVisualDefinition = {
  kind: SolutionVisualKind;
  atlas: AtlasDefinition;
};

function createOperatingModel(
  slug: SolutionSlug,
  kind: SolutionVisualKind,
  title: string,
  labels: readonly [string, string, string, string, string, string, string],
): SolutionVisualDefinition {
  return {
    kind,
    atlas: {
      id: `${slug}-operating-model`,
      eyebrow: "Operating model",
      title,
      description:
        "A focused view of the business input, operating boundary, controls, connected flow, and intended outcome.",
      readingDirection:
        "Read from left to right: business context enters a controlled operating model and moves toward a useful outcome.",
      layers: [
        {
          id: "input",
          label: "Business input",
          meaning: "The context or work entering the system.",
          depth: 1,
          bounds: { x: 18, y: 54, width: 156, height: 330 },
        },
        {
          id: "system",
          label: "System boundary",
          meaning: "The capability and operating logic supporting the work.",
          depth: 2,
          bounds: { x: 184, y: 36, width: 250, height: 366 },
        },
        {
          id: "control",
          label: "Control",
          meaning: "The oversight, ownership, or safeguards governing the flow.",
          depth: 3,
          bounds: { x: 444, y: 64, width: 128, height: 310 },
        },
        {
          id: "outcome",
          label: "Outcome",
          meaning: "The useful operating result produced by the system.",
          depth: 4,
          bounds: { x: 582, y: 48, width: 120, height: 342 },
        },
      ],
      nodes: [
        {
          id: "input-a",
          label: labels[0],
          detail: labels[0],
          kind: "context",
          layerId: "input",
          x: 94,
          y: 150,
        },
        {
          id: "input-b",
          label: labels[1],
          detail: labels[1],
          kind: "context",
          layerId: "input",
          x: 94,
          y: 286,
        },
        {
          id: "system-a",
          label: labels[2],
          detail: labels[2],
          kind: "system",
          layerId: "system",
          x: 264,
          y: 152,
        },
        {
          id: "system-b",
          label: labels[3],
          detail: labels[3],
          kind: "decision",
          layerId: "system",
          x: 354,
          y: 286,
        },
        {
          id: "control",
          label: labels[4],
          detail: labels[4],
          kind: "control",
          layerId: "control",
          x: 508,
          y: 218,
        },
        {
          id: "outcome-a",
          label: labels[5],
          detail: labels[5],
          kind: "outcome",
          layerId: "outcome",
          x: 642,
          y: 150,
        },
        {
          id: "outcome-b",
          label: labels[6],
          detail: labels[6],
          kind: "outcome",
          layerId: "outcome",
          x: 642,
          y: 288,
        },
      ],
      connections: [
        {
          id: "input-system",
          source: "input-a",
          target: "system-a",
          flowLabel: "enter",
          state: "active",
        },
        {
          id: "context-system",
          source: "input-b",
          target: "system-b",
          flowLabel: "inform",
        },
        {
          id: "system-decision",
          source: "system-a",
          target: "system-b",
          flowLabel: "process",
          state: "active",
        },
        {
          id: "decision-control",
          source: "system-b",
          target: "control",
          flowLabel: "govern",
          state: "active",
        },
        {
          id: "control-outcome",
          source: "control",
          target: "outcome-a",
          flowLabel: "enable",
          state: "active",
        },
        {
          id: "control-improvement",
          source: "control",
          target: "outcome-b",
          flowLabel: "improve",
        },
      ],
      legend: [
        { label: "Input", meaning: "The work or context entering the model." },
        { label: "Control", meaning: "The governing decision or oversight." },
        { label: "Outcome", meaning: "The intended operating result." },
      ],
    },
  };
}

export const solutionVisualBySlug = {
  ai: createOperatingModel("ai", "controlled-ai-loop", "A controlled AI loop", [
    "Business input",
    "Knowledge",
    "AI capability",
    "System action",
    "Human review",
    "Monitoring",
    "Fallback",
  ]),
  "business-automation": createOperatingModel(
    "business-automation",
    "workflow-transformation",
    "A reliable workflow transformation",
    [
      "Intake",
      "Handoffs",
      "Approvals",
      "Completion",
      "Human oversight",
      "Exceptions",
      "Reliable flow",
    ],
  ),
  "custom-software-development": createOperatingModel(
    "custom-software-development",
    "ownership-boundary",
    "A tailored software ownership boundary",
    [
      "Interface",
      "Workflow",
      "Business rules",
      "Integrations",
      "Ownership",
      "Working application",
      "Maintainability",
    ],
  ),
  "digital-business-systems": createOperatingModel(
    "digital-business-systems",
    "operating-environment",
    "A connected operating environment",
    [
      "People",
      "Tools",
      "Workflows",
      "Information",
      "Connected environment",
      "Shared visibility",
      "Operational clarity",
    ],
  ),
  "websites-web-applications": createOperatingModel(
    "websites-web-applications",
    "service-delivery-cutaway",
    "A connected service delivery experience",
    [
      "Customer and user experience",
      "Content",
      "Transaction",
      "Operations",
      "Integration",
      "Measurement",
      "Better service",
    ],
  ),
  "technology-consulting": createOperatingModel(
    "technology-consulting",
    "decision-landscape",
    "A practical technology decision landscape",
    [
      "Current state",
      "Opportunities",
      "Constraints",
      "Risks",
      "Priorities",
      "Roadmap",
      "Clear next step",
    ],
  ),
} satisfies Record<SolutionSlug, SolutionVisualDefinition>;
