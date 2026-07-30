"use client";

import { useState } from "react";
import type {
  ProcessDecisionGate,
  ProcessStageDefinition,
  ProcessStageName,
} from "@/components/content/companyPages";

type MobileDeliveryRailProps = {
  stages: readonly ProcessStageDefinition[];
  gates: readonly ProcessDecisionGate[];
};

export default function MobileDeliveryRail({
  stages,
  gates,
}: MobileDeliveryRailProps) {
  const [openStageName, setOpenStageName] = useState<ProcessStageName | null>(
    stages[0]?.name ?? null,
  );

  return (
    <ol
      aria-label="Cobrykz delivery process"
      className="mobile-process-rail"
    >
      {stages.map((stage, index) => {
        const stageSlug = stage.name.toLowerCase();
        const panelId = `process-${stageSlug}-details`;
        const isOpen = openStageName === stage.name;
        const gate = gates.find(
          (candidate) =>
            candidate.after === stage.name &&
            candidate.before === stages[index + 1]?.name,
        );

        return (
          <li
            key={stage.name}
            id={`process-${stage.name.toLowerCase()}`}
            className="mobile-process-rail__stage"
            data-process-stage-open={isOpen}
          >
            <button
              type="button"
              className="mobile-process-rail__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenStageName(isOpen ? null : stage.name)}
            >
              <span
                aria-hidden="true"
                className="mobile-process-rail__node"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mobile-process-rail__label">
                <strong>{stage.name}</strong>
                <span>{stage.summary}</span>
              </span>
              <span
                aria-hidden="true"
                className="mobile-process-rail__indicator"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div
              id={panelId}
              hidden={!isOpen}
              aria-live="polite"
              className="mobile-process-rail__detail"
            >
              <p>{stage.description}</p>
              <div className="mobile-process-rail__records">
                <section aria-labelledby={`${panelId}-decisions`}>
                  <h3 id={`${panelId}-decisions`}>Decisions</h3>
                  <ul>
                    {stage.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </section>
                <section aria-labelledby={`${panelId}-outputs`}>
                  <h3 id={`${panelId}-outputs`}>Outputs</h3>
                  <ul>
                    {stage.outputs.map((output) => (
                      <li key={output}>{output}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {gate ? (
              <aside
                id={`process-gate-${gate.after.toLowerCase()}-${gate.before.toLowerCase()}`}
                data-process-decision-gate
                aria-label={`Decision gate between ${gate.after} and ${gate.before}`}
                className="mobile-process-gate"
              >
                <p className="mobile-process-gate__label">Decision gate</p>
                <h3>{gate.title}</h3>
                <p className="mobile-process-gate__question">
                  {gate.question}
                </p>
                <ul>
                  {gate.criteria.map((criterion) => (
                    <li key={criterion}>{criterion}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
