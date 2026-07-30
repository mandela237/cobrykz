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
