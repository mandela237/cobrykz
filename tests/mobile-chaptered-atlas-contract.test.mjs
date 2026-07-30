import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

test("defines a semantic Chaptered Atlas mobile grammar", () => {
  const chapter = read("components/mobile/MobileChapter.tsx");
  const disclosure = read("components/mobile/MobileDisclosureGroup.tsx");
  const css = read("app/globals.css");

  assert.match(chapter, /export default function MobileChapter/);
  assert.match(chapter, /data-mobile-chapter/);
  assert.match(chapter, /aria-labelledby/);
  assert.match(disclosure, /"use client"/);
  assert.match(disclosure, /aria-expanded/);
  assert.match(disclosure, /aria-controls/);
  assert.match(disclosure, /min-h-11/);
  assert.match(disclosure, /<div\s+role="group"\s+aria-label=\{ariaLabel\}/);
  assert.match(
    css,
    /\.mobile-chapter\[data-mobile-tone="dark"\]\s+\.mobile-chapter__marker\s*\{[^}]*color:\s*var\(--focus-ring-dark\)/s,
  );
  assert.match(
    css,
    /\.mobile-chapter\[data-mobile-tone="dark"\]\s+:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-dark\)/s,
  );
});

test("recomposes Atlas definitions vertically without copying labels", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");
  const relationship = read("components/solutions/CapabilityRelationshipAtlas.tsx");

  assert.match(mobileAtlas, /definition: AtlasDefinition/);
  assert.match(mobileAtlas, /definition\.nodes\.map/);
  assert.match(mobileAtlas, /definition\.connections/);
  assert.match(relationship, /export const capabilityRelationship/);
  assert.doesNotMatch(mobileAtlas, /Consulting|Automation|Digital systems/);
});

test("groups Atlas fan-out by its actual source instead of a serial path", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");

  assert.match(mobileAtlas, /definition\.connections\.filter/);
  assert.match(mobileAtlas, /connection\.source === source\.id/);
  assert.match(mobileAtlas, /connections\.map\(\(connection\)/);
  assert.doesNotMatch(mobileAtlas, /padStart\(/);
});

test("represents every Atlas connection without first-match loss", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");

  assert.doesNotMatch(mobileAtlas, /\.find\(/);
  assert.match(mobileAtlas, /new Map\(definition\.nodes\.map/);
});

test("requires a selection callback for interactive mobile Atlas controls", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");

  assert.match(mobileAtlas, /onSelectNode: \(nodeId: string\) => void/);
  assert.doesNotMatch(mobileAtlas, /onSelectNode\?\./);
});
