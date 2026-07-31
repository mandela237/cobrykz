import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("composes the mobile Homepage recognition frame from system and human proof", () => {
  const mobile = read("components/home/MobileHomePage.tsx");

  assert.match(mobile, /import Image from ["']next\/image["']/);
  assert.match(mobile, /data-mobile-recognition-frame="homepage"/);
  assert.match(mobile, /data-mobile-human-proof/);
  assert.match(mobile, /src="\/mandela-portrait-sharp\.jpg"/);
  assert.match(mobile, /className="mobile-home-human-frame__image"/);
  assert.match(mobile, /className="mobile-home-atlas-plane"/);

  assert.ok(
    mobile.indexOf("data-mobile-human-proof") <
      mobile.indexOf('className="mobile-home-atlas-plane"'),
    "human accountability should soften the opening before the technical cutaway",
  );
});

test("uses material restraint instead of decorative mobile Homepage effects", () => {
  const css = read("app/globals.css");

  assert.match(css, /--mobile-paper:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--mobile-mineral:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--mobile-graphite:\s*#[0-9a-f]{6}/i);
  assert.match(
    css,
    /\.mobile-home-human-frame\s*\{[^}]*width:\s*calc\(100%\s*-\s*3\.5rem\)[^}]*aspect-ratio:\s*4\s*\/\s*5[^}]*overflow:\s*hidden/s,
  );
  assert.match(
    css,
    /\.mobile-home-human-frame__image\s*\{[^}]*object-fit:\s*cover[^}]*filter:\s*saturate\(0\.8/s,
  );
  assert.match(
    css,
    /\.mobile-home-atlas-plane::before\s*\{[^}]*background:\s*var\(--focus-ring-dark\)/s,
  );
  assert.doesNotMatch(
    css,
    /\.mobile-home-atlas-plane::before\s*\{[^}]*filter:\s*blur/s,
  );
});

test("gives the implemented Homepage varied editorial pacing without changing copy", () => {
  const css = read("app/globals.css");
  const mobile = read("components/home/MobileHomePage.tsx");

  assert.match(css, /#outcomes\.mobile-chapter\s*\{/);
  assert.match(css, /#solutions\.mobile-chapter\s*\{/);
  assert.match(css, /#why-cobrykz\.mobile-chapter\s*\{/);
  assert.match(css, /#ai-point-of-view\.mobile-chapter\s*\{/);
  assert.match(css, /#process\.mobile-chapter\s*\{/);
  assert.match(css, /\.mobile-home-closing #authority\s*\{/);
  assert.match(css, /\.mobile-home-closing #contact\s*\{/);

  assert.doesNotMatch(
    mobile,
    /const\s+(?:headline|description|title|label)\s*=\s*["'`]/,
    "the art-direction layer must not fork approved Homepage copy",
  );
});
