import type { SolutionArtifact } from "@/components/content/solutions";
import MobileDisclosureGroup from "@/components/mobile/MobileDisclosureGroup";

type MobileSolutionArtifactProps = {
  artifact: SolutionArtifact;
};

function WorkflowComparison({
  artifact,
}: {
  artifact: Extract<SolutionArtifact, { kind: "workflow-comparison" }>;
}) {
  return (
    <div className="mobile-solution-workflow">
      <MobileDisclosureGroup
        items={[artifact.before, artifact.after].map((workflow) => ({
          id: `workflow-${workflow.label.toLowerCase()}`,
          summary: <strong>{workflow.label}</strong>,
          panel: (
            <ol className="mobile-solution-workflow__steps">
              {workflow.steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          ),
        }))}
        defaultOpenId={`workflow-${artifact.before.label.toLowerCase()}`}
        ariaLabel={artifact.title}
      />

      <div className="mobile-solution-artifact__secondary">
        <MobileDisclosureGroup
          items={artifact.safeguards.map((safeguard, index) => ({
            id: `safeguard-${index}`,
            summary: <strong>{safeguard.title}</strong>,
            panel: <p>{safeguard.description}</p>,
          }))}
          ariaLabel="Workflow safeguards"
        />
      </div>
    </div>
  );
}

function SystemMap({
  artifact,
}: {
  artifact: Extract<SolutionArtifact, { kind: "system-map" }>;
}) {
  return (
    <div className="mobile-solution-system-map">
      <p className="mobile-solution-system-map__center">
        {artifact.centerLabel}
      </p>

      <MobileDisclosureGroup
        items={artifact.elements.map((element, index) => ({
          id: `element-${index}`,
          summary: <strong>{element.title}</strong>,
          panel: <p>{element.description}</p>,
        }))}
        defaultOpenId="element-0"
        ariaLabel={artifact.title}
      />

      <div className="mobile-solution-artifact__secondary">
        <MobileDisclosureGroup
          items={artifact.distinctions.map((distinction, index) => ({
            id: `distinction-${index}`,
            summary: <strong>{distinction.title}</strong>,
            panel: <p>{distinction.description}</p>,
          }))}
          ariaLabel="System distinctions"
        />
      </div>
    </div>
  );
}

export default function MobileSolutionArtifact({
  artifact,
}: MobileSolutionArtifactProps) {
  return artifact.kind === "workflow-comparison" ? (
    <WorkflowComparison artifact={artifact} />
  ) : (
    <SystemMap artifact={artifact} />
  );
}
