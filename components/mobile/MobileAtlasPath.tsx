"use client";

import type { AtlasDefinition } from "@/components/atlas/types";

type MobileAtlasPathProps = {
  definition: AtlasDefinition;
  selectedNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
  ariaLabel: string;
};

export default function MobileAtlasPath({
  definition,
  selectedNodeId,
  onSelectNode,
  ariaLabel,
}: MobileAtlasPathProps) {
  return (
    <figure className="mobile-atlas" aria-label={ariaLabel}>
      <ol className="mobile-atlas__path">
        {definition.nodes.map((node, index) => {
          const incoming = definition.connections.find(
            (connection) => connection.target === node.id,
          );
          const selected = selectedNodeId === node.id;

          return (
            <li key={node.id} className="mobile-atlas__node">
              {incoming ? (
                <span className="mobile-atlas__flow">{incoming.flowLabel}</span>
              ) : null}
              <button
                type="button"
                className="mobile-atlas__control min-h-11"
                aria-pressed={selected}
                onClick={() => onSelectNode?.(node.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node.label}</strong>
              </button>
              {selected ? (
                <p className="mobile-atlas__detail">{node.detail}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <figcaption className="mobile-atlas__caption">
        {definition.readingDirection}
      </figcaption>
    </figure>
  );
}
