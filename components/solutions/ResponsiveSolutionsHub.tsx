"use client";

import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type ResponsiveSolutionsHubProps = {
  mobile: ReactNode;
  desktop: ReactNode;
};

const getMobileQuery = () => window.matchMedia("(max-width: 767px)");

function subscribe(onStoreChange: () => void) {
  const query = getMobileQuery();
  query.addEventListener("change", onStoreChange);

  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return getMobileQuery().matches;
}

function getServerSnapshot() {
  return false;
}

export default function ResponsiveSolutionsHub({
  mobile,
  desktop,
}: ResponsiveSolutionsHubProps) {
  const isMobile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return isMobile ? mobile : desktop;
}
