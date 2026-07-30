import Link from "next/link";
import SystemAtlas from "@/components/atlas/SystemAtlas";
import type { AtlasDefinition } from "@/components/atlas/types";
import { solutions } from "@/components/content/solutions";

const capabilityRelationship = {
  id: "capability-relationship",
  eyebrow: "Capability relationship",
  title: "Different capabilities play different roles.",
  description:
    "The complete view shows how Cobrykz can clarify, create, connect, move, enhance, and present the systems behind a business outcome.",
  readingDirection:
    "Read from left to right as a relationship model, not a required sequence. Only the capabilities justified by the business challenge are used.",
  layers: [
    {
      id: "clarify",
      label: "Clarify",
      meaning: "Consulting establishes priorities and direction.",
      depth: 1,
      bounds: { x: 18, y: 64, width: 150, height: 310 },
    },
    {
      id: "build",
      label: "Create and connect",
      meaning: "Software and digital systems establish the operating environment.",
      depth: 2,
      bounds: { x: 180, y: 42, width: 270, height: 354 },
    },
    {
      id: "improve",
      label: "Move and enhance",
      meaning: "Automation and AI improve focused work within that environment.",
      depth: 3,
      bounds: { x: 462, y: 64, width: 150, height: 310 },
    },
    {
      id: "experience",
      label: "Experience",
      meaning: "Websites and applications support customer and user action.",
      depth: 4,
      bounds: { x: 624, y: 50, width: 78, height: 338 },
    },
  ],
  nodes: [
    { id: "consulting", label: "Consulting", detail: "Clarifies the path.", kind: "decision", layerId: "clarify", x: 93, y: 220 },
    { id: "software", label: "Software", detail: "Creates a tailored application.", kind: "system", layerId: "build", x: 252, y: 150 },
    { id: "systems", label: "Digital systems", detail: "Create the connected environment.", kind: "system", layerId: "build", x: 376, y: 286 },
    { id: "automation", label: "Automation", detail: "Moves work through the environment.", kind: "control", layerId: "improve", x: 536, y: 150 },
    { id: "ai", label: "AI", detail: "Adds focused intelligence where justified.", kind: "control", layerId: "improve", x: 536, y: 288 },
    { id: "web", label: "Web", detail: "Creates customer and user experiences.", kind: "outcome", layerId: "experience", x: 663, y: 220 },
  ],
  connections: [
    { id: "clarify-software", source: "consulting", target: "software", flowLabel: "prioritize", state: "active" },
    { id: "software-systems", source: "software", target: "systems", flowLabel: "connect", state: "active" },
    { id: "systems-automation", source: "systems", target: "automation", flowLabel: "move" },
    { id: "systems-ai", source: "systems", target: "ai", flowLabel: "enhance" },
    { id: "systems-web", source: "systems", target: "web", flowLabel: "serve", state: "active" },
  ],
  legend: [
    { label: "Decision", meaning: "Clarifies the appropriate path." },
    { label: "System", meaning: "Creates or connects the operating environment." },
    { label: "Experience", meaning: "Supports customer or user action." },
  ],
} as const satisfies AtlasDefinition;

export default function CapabilityRelationshipAtlas() {
  return (
    <div className="mt-12">
      <SystemAtlas
        definition={capabilityRelationship}
        className="capability-relationship-atlas"
      />
      <nav aria-label="Explore capabilities" className="border-x border-b border-border bg-white">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <li key={solution.slug} className="border-b border-border sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
              <Link
                href={solution.href}
                className="action-transition flex min-h-14 items-center px-5 text-sm font-semibold text-navy hover:bg-blue-tint hover:text-blue"
              >
                {solution.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
