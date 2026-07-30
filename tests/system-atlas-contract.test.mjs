import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (relativePath) => {
  const path = join(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

test("defines a semantic System Atlas grammar", () => {
  const source = read("components/atlas/types.ts");

  assert.ok(source, "components/atlas/types.ts must exist");
  for (const name of [
    "AtlasNodeKind",
    "AtlasNode",
    "AtlasConnection",
    "AtlasLayer",
    "AtlasDefinition",
  ]) {
    assert.match(source, new RegExp(`export type ${name}`));
  }
  assert.match(
    source,
    /["']context["']\s*\|\s*["']system["']\s*\|\s*["']decision["']\s*\|\s*["']control["']\s*\|\s*["']outcome["']\s*\|\s*["']owner["']/s,
  );
  assert.match(source, /meaning:\s*string/);
  assert.match(source, /source:\s*string/);
  assert.match(source, /target:\s*string/);
  assert.match(source, /flowLabel:\s*string/);
  assert.match(source, /readingDirection:\s*string/);
});

test("renders one accessible server-side Atlas figure", () => {
  const source = read("components/atlas/SystemAtlas.tsx");

  assert.ok(source, "components/atlas/SystemAtlas.tsx must exist");
  assert.doesNotMatch(source, /["']use client["']/);
  assert.match(source, /<figure\b/);
  assert.match(source, /<svg\b/);
  assert.match(source, /role=["']img["']/);
  assert.match(source, /<title\b/);
  assert.match(source, /<desc\b/);
  assert.match(source, /<figcaption\b/);
  assert.match(source, /<AtlasLegend\b/);
  assert.match(source, /<AtlasTextEquivalent\b/);
  assert.match(source, /data-atlas-kind=/);
  assert.match(source, /data-atlas-depth=/);
  assert.match(source, /data-atlas-state=/);
});

test("derives visible and nonvisual explanations from the same definition", () => {
  const legend = read("components/atlas/AtlasLegend.tsx");
  const equivalent = read("components/atlas/AtlasTextEquivalent.tsx");

  assert.match(legend, /definition\.legend/);
  assert.match(equivalent, /definition\.layers/);
  assert.match(equivalent, /definition\.nodes/);
  assert.match(equivalent, /definition\.connections/);
  assert.match(equivalent, /flowLabel/);
  assert.match(equivalent, /\bsr-only\b/);
});

test("defines restrained Atlas material and reduced-motion tokens", () => {
  const css = read("app/globals.css");

  for (const token of [
    "--atlas-plane",
    "--atlas-plane-dark",
    "--atlas-frame",
    "--atlas-path",
    "--atlas-verified",
    "--atlas-depth-shadow",
    "--atlas-signal-shadow",
  ]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /@keyframes atlas-flow/);
  assert.match(css, /\.atlas-path\[data-atlas-state=["']active["']\]/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.atlas-path[\s\S]*animation:\s*none\s*!important/,
  );
});
