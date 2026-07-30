"use client";

import type { AtlasDefinition } from "@/components/atlas/types";

type MobileAtlasNode = AtlasDefinition["nodes"][number];
type MobileAtlasPathProps = {
  definition: AtlasDefinition;
  selectedNodeId?: string;
  onSelectNode: (nodeId: string) => void;
  ariaLabel: string;
};

type MobileAtlasNodeControlProps = {
  node: MobileAtlasNode;
  selectedNodeId?: string;
  onSelectNode: (nodeId: string) => void;
};

function MobileAtlasNodeControl({
  node,
  selectedNodeId,
  onSelectNode,
}: MobileAtlasNodeControlProps) {
  return (
    <button
      type="button"
      className="mobile-atlas__control min-h-11"
      aria-pressed={selectedNodeId === node.id}
      onClick={() => onSelectNode(node.id)}
    >
      <strong>{node.label}</strong>
    </button>
  );
}

export default function MobileAtlasPath({
  definition,
  selectedNodeId,
  onSelectNode,
  ariaLabel,
}: MobileAtlasPathProps) {
  const nodesById = new Map(definition.nodes.map((node) => [node.id, node]));
  const selectedNode = selectedNodeId
    ? nodesById.get(selectedNodeId)
    : undefined;
  const incomingConnections = definition.connections.filter(
    (connection) => connection.target === selectedNodeId,
  );
  const outgoingConnections = definition.connections.filter(
    (connection) => connection.source === selectedNodeId,
  );
  const verticalReadingDirection = definition.readingDirection.replace(
    /left to right/i,
    "top to bottom",
  );

  return (
    <figure className="mobile-atlas" aria-label={ariaLabel}>
      <ol className="mobile-atlas__map" aria-label={`${ariaLabel} nodes`}>
        {definition.nodes.map((node) => (
          <li key={node.id} data-atlas-kind={node.kind}>
            <MobileAtlasNodeControl
              node={node}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
            />
          </li>
        ))}
      </ol>
      {selectedNode ? (
        <section className="mobile-atlas__detail" aria-live="polite">
          <strong>{selectedNode.label}</strong>
          <p>{selectedNode.detail}</p>
          <div className="mobile-atlas__relationship-grid">
            {incomingConnections.length > 0 ? (
              <section className="mobile-atlas__relationships">
                <h3>Incoming</h3>
                <ul>
                  {incomingConnections.map((connection) => {
                    const relatedNode = nodesById.get(connection.source);

                    return relatedNode ? (
                      <li
                        key={connection.id}
                        data-atlas-state={connection.state ?? "default"}
                      >
                        <span>{connection.flowLabel}</span>
                        <strong>{relatedNode.label}</strong>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            ) : null}
            {outgoingConnections.length > 0 ? (
              <section className="mobile-atlas__relationships">
                <h3>Outgoing</h3>
                <ul>
                  {outgoingConnections.map((connection) => {
                    const relatedNode = nodesById.get(connection.target);

                    return relatedNode ? (
                      <li
                        key={connection.id}
                        data-atlas-state={connection.state ?? "default"}
                      >
                        <span>{connection.flowLabel}</span>
                        <strong>{relatedNode.label}</strong>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            ) : null}
          </div>
        </section>
      ) : null}
      <figcaption className="mobile-atlas__caption">
        {verticalReadingDirection}
      </figcaption>
    </figure>
  );
}
