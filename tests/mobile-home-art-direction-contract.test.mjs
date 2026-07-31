import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("builds the Homepage as Measured Humanism editorial scenes", () => {
  const mobile = read("components/home/MobileHomePage.tsx");

  assert.match(mobile, /import Image from ["']next\/image["']/);
  for (const scene of [
    "threshold",
    "system",
    "outcomes",
    "capabilities",
    "trust",
    "decision",
    "challenge",
    "process",
  ]) {
    assert.match(mobile, new RegExp(`data-mobile-scene="${scene}"`));
  }
  assert.match(mobile, /src="\/mandela-portrait-sharp\.jpg"/);
  assert.doesNotMatch(mobile, /<MobileChapter\b/);
  assert.doesNotMatch(mobile, /<MobileDisclosureGroup\b/);
});

test("uses material restraint instead of decorative mobile Homepage effects", () => {
  const css = read("app/globals.css");

  assert.match(css, /--mobile-paper:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--mobile-mineral:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--mobile-graphite:\s*#[0-9a-f]{6}/i);
  assert.match(
    css,
    /\.measured-threshold\s*\{[^}]*background:\s*var\(--color-gray-light\)/s,
  );
  assert.match(
    css,
    /\.measured-threshold__portrait\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5[^}]*overflow:\s*hidden/s,
  );
  assert.match(
    css,
    /\.measured-system\s*\{[^}]*background:\s*var\(--color-footer-bg\)/s,
  );
  assert.doesNotMatch(
    css,
    /\.measured-(?:threshold|system|outcomes|capabilities|trust|decision|process)[^{]*\{[^}]*filter:\s*blur/s,
  );
});

test("gives the implemented Homepage varied editorial pacing without changing copy", () => {
  const css = read("app/globals.css");
  const mobile = read("components/home/MobileHomePage.tsx");

  assert.match(css, /\.measured-outcomes\s*\{/);
  assert.match(css, /\.measured-capabilities\s*\{/);
  assert.match(css, /\.measured-trust\s*\{/);
  assert.match(css, /\.measured-decision\s*\{/);
  assert.match(css, /\.measured-process\s*\{/);
  assert.match(css, /\.mobile-home-closing #authority\s*\{/);
  assert.match(css, /\.mobile-home-closing #contact\s*\{/);

  assert.doesNotMatch(
    mobile,
    /const\s+(?:headline|description|title|label)\s*=\s*["'`]/,
    "the art-direction layer must not fork approved Homepage copy",
  );
});

test("sizes the Measured Humanism composition for a compact 390px experience", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /\.measured-threshold__title\s*\{[^}]*font-size:\s*2\.75rem[^}]*line-height:\s*0\.96/s,
  );
  assert.match(
    css,
    /\.measured-threshold__portrait\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s,
  );
  assert.match(
    css,
    /\.measured-scene-shell\s*\{[^}]*padding-block:\s*4\.5rem/s,
  );
  assert.match(
    css,
    /\.measured-scene-heading h2\s*\{[^}]*font-size:\s*2rem[^}]*line-height:\s*1\.02/s,
  );
  assert.match(
    css,
    /\.measured-capabilities__index\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s,
  );
  assert.match(
    css,
    /\.measured-trust__principles\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s,
  );
  assert.match(
    css,
    /\.measured-process__sequence\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s,
  );
});
