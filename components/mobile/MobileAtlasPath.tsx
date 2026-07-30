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
  className?: string;
};

function MobileAtlasNodeControl({
  node,
  selectedNodeId,
  onSelectNode,
  className,
}: MobileAtlasNodeControlProps) {
  return (
    <button
      type="button"
      className={`mobile-atlas__control min-h-11 ${className ?? ""}`}
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
  const connectionGroups = definition.nodes
    .map((source) => ({
      source,
      connections: definition.connections.filter(
        (connection) => connection.source === source.id,
      ),
    }))
    .filter(({ connections }) => connections.length > 0);
  const connectedNodeIds = new Set(
    definition.connections.flatMap((connection) => [
      connection.source,
      connection.target,
    ]),
  );
  const unconnectedNodes = definition.nodes.filter(
    (node) => !connectedNodeIds.has(node.id),
  );
  const selectedNode = selectedNodeId ? nodesById.get(selectedNodeId) : undefined;

  return (
    <figure className="mobile-atlas" aria-label={ariaLabel}>
      <ul className="mobile-atlas__map" aria-label={`${ariaLabel} relationships`}>
        {connectionGroups.map(({ source, connections }) => (
          <li key={source.id} className="mobile-atlas__group">
            <MobileAtlasNodeControl
              node={source}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
              className="mobile-atlas__control--source"
            />
            <ul
              className="mobile-atlas__branches"
              aria-label={`Relationships from ${source.label}`}
            >
              {connections.map((connection) => {
                const target = nodesById.get(connection.target);

                if (!target) {
                  return null;
                }

                return (
                  <li key={connection.id} className="mobile-atlas__branch">
                    <span className="mobile-atlas__flow">
                      {connection.flowLabel}
                    </span>
                    <MobileAtlasNodeControl
                      node={target}
                      selectedNodeId={selectedNodeId}
                      onSelectNode={onSelectNode}
                      className="mobile-atlas__control--target"
                    />
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
        {unconnectedNodes.map((node) => (
          <li key={node.id} className="mobile-atlas__unconnected">
            <MobileAtlasNodeControl
              node={node}
              selectedNodeId={selectedNodeId}
              onSelectNode={onSelectNode}
            />
          </li>
        ))}
      </ul>
      {selectedNode ? (
        <section className="mobile-atlas__detail" aria-live="polite">
          <strong>{selectedNode.label}</strong>
          <p>{selectedNode.detail}</p>
        </section>
      ) : null}
      <figcaption className="mobile-atlas__caption">
        {definition.readingDirection}
      </figcaption>
    </figure>
  );
}
