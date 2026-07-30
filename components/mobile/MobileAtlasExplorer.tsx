"use client";

import { useState } from "react";
import type { AtlasDefinition } from "@/components/atlas/types";
import MobileAtlasPath from "@/components/mobile/MobileAtlasPath";

type MobileAtlasExplorerProps = {
  definition: AtlasDefinition;
  ariaLabel: string;
  initialSelectedNodeId: string;
  showDefinitionContext?: boolean;
};

export default function MobileAtlasExplorer({
  definition,
  ariaLabel,
  initialSelectedNodeId,
  showDefinitionContext = false,
}: MobileAtlasExplorerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    initialSelectedNodeId,
  );

  return (
    <MobileAtlasPath
      definition={definition}
      selectedNodeId={selectedNodeId}
      onSelectNode={setSelectedNodeId}
      ariaLabel={ariaLabel}
      showDefinitionContext={showDefinitionContext}
    />
  );
}
