import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

test("applies one compact opening scale across the remaining mobile page families", () => {
  assert.match(css, /Mobile art direction completion pass/);
  assert.match(
    css,
    /\.mobile-solutions-opening h1,[\s\S]*\.mobile-contact-headline\s*\{[^}]*font-size:\s*clamp\(2\.1rem,\s*9\.5vw,\s*2\.375rem\)[^}]*line-height:\s*0\.98/s,
  );
  assert.match(
    css,
    /\[data-mobile-solutions-hub\] \.mobile-chapter__inner,[\s\S]*\[data-mobile-contact\] \.mobile-chapter__inner\s*\{[^}]*padding-block:\s*2\.75rem/s,
  );
});

test("removes oversized card staging from systemic and utility compositions", () => {
  assert.match(
    css,
    /\.mobile-solutions-opening__index,[\s\S]*\.mobile-contact-form-frame\s*\{[^}]*border-radius:\s*0[^}]*box-shadow:\s*none/s,
  );
  assert.match(
    css,
    /\[data-mobile-recovery\] \.mobile-recovery-frame\s*\{[^}]*margin-top:\s*0[^}]*box-shadow:\s*none/s,
  );
});

test("keeps page-family recognition moments materially distinct", () => {
  assert.match(css, /\.mobile-process-opening\s*\{[^}]*background:\s*var\(--color-footer-bg\)/s);
  assert.match(css, /\.mobile-about-leadership__portrait\s*\{[^}]*min-height:\s*22rem/s);
  assert.match(css, /\.mobile-insights-opening h1\s*\{[^}]*font-weight:\s*520/s);
  assert.match(css, /\.mobile-contact-headline\s*\{[^}]*max-width:\s*12ch/s);
});
