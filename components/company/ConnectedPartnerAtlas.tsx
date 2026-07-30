import SystemAtlas from "@/components/atlas/SystemAtlas";
import type { AtlasDefinition } from "@/components/atlas/types";

const connectedPartner = {
  id: "connected-partner",
  eyebrow: "One connected partner",
  title: "Cobrykz keeps the decisions and delivery connected.",
  description:
    "Business strategy, experience, technology, deployment, and improvement remain inside one accountable frame.",
  readingDirection:
    "Read from business strategy through experience and delivery into operational improvement, with Cobrykz accountability connecting the model.",
  layers: [
    { id: "business", label: "Business strategy", meaning: "The desired outcome and business context.", depth: 1, bounds: { x: 18, y: 52, width: 150, height: 330 } },
    { id: "experience", label: "Experience design", meaning: "The people, users, and service experience.", depth: 2, bounds: { x: 180, y: 36, width: 150, height: 362 } },
    { id: "delivery", label: "Connected delivery", meaning: "Engineering and appropriate technology capabilities.", depth: 3, bounds: { x: 342, y: 48, width: 230, height: 338 } },
    { id: "operations", label: "Operations", meaning: "Deployment, ownership, and continued improvement.", depth: 4, bounds: { x: 584, y: 38, width: 118, height: 358 } },
  ],
  nodes: [
    { id: "strategy", label: "Business strategy", detail: "Business context and desired outcome.", kind: "context", layerId: "business", x: 93, y: 152 },
    { id: "accountability", label: "Cobrykz accountability", detail: "The integrating frame for decisions and delivery.", kind: "owner", layerId: "business", x: 93, y: 286 },
    { id: "experience-design", label: "Experience design", detail: "People, users, and service.", kind: "decision", layerId: "experience", x: 255, y: 218 },
    { id: "engineering", label: "Engineering", detail: "Responsible technical implementation.", kind: "system", layerId: "delivery", x: 402, y: 128 },
    { id: "ai", label: "AI", detail: "Focused intelligence where justified.", kind: "control", layerId: "delivery", x: 510, y: 128 },
    { id: "automation", label: "Automation", detail: "Reliable workflow movement.", kind: "control", layerId: "delivery", x: 402, y: 296 },
    { id: "integration", label: "Integration", detail: "Connected tools and information.", kind: "system", layerId: "delivery", x: 510, y: 296 },
    { id: "deployment", label: "Deployment", detail: "Responsible introduction into real work.", kind: "outcome", layerId: "operations", x: 643, y: 150 },
    { id: "improvement", label: "Improvement", detail: "Continued operating value.", kind: "outcome", layerId: "operations", x: 643, y: 288 },
  ],
  connections: [
    { id: "strategy-experience", source: "strategy", target: "experience-design", flowLabel: "shape", state: "active" },
    { id: "accountability-engineering", source: "accountability", target: "engineering", flowLabel: "connect", state: "active" },
    { id: "experience-engineering", source: "experience-design", target: "engineering", flowLabel: "design" },
    { id: "experience-automation", source: "experience-design", target: "automation", flowLabel: "inform" },
    { id: "engineering-ai", source: "engineering", target: "ai", flowLabel: "apply" },
    { id: "automation-integration", source: "automation", target: "integration", flowLabel: "integrate" },
    { id: "ai-deployment", source: "ai", target: "deployment", flowLabel: "deploy", state: "active" },
    { id: "integration-improvement", source: "integration", target: "improvement", flowLabel: "improve", state: "active" },
  ],
  legend: [
    { label: "Context", meaning: "The business outcome and people involved." },
    { label: "Delivery", meaning: "The relevant capabilities working together." },
    { label: "Accountability", meaning: "Connected responsibility across the work." },
  ],
} as const satisfies AtlasDefinition;

export default function ConnectedPartnerAtlas() {
  return (
    <SystemAtlas
      definition={connectedPartner}
      tone="dark"
      className="connected-partner-atlas"
    />
  );
}
