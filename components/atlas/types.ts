export type AtlasNodeKind =
  | "context"
  | "system"
  | "decision"
  | "control"
  | "outcome"
  | "owner";

export type AtlasBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AtlasNode = {
  id: string;
  label: string;
  detail: string;
  kind: AtlasNodeKind;
  layerId: string;
  x: number;
  y: number;
};

export type AtlasConnection = {
  id: string;
  source: string;
  target: string;
  flowLabel: string;
  state?: "supporting" | "active" | "verified";
};

export type AtlasLayer = {
  id: string;
  label: string;
  meaning: string;
  depth: 1 | 2 | 3 | 4;
  bounds: AtlasBounds;
};

export type AtlasDefinition = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  readingDirection: string;
  layers: readonly AtlasLayer[];
  nodes: readonly AtlasNode[];
  connections: readonly AtlasConnection[];
  legend?: readonly { label: string; meaning: string }[];
};
