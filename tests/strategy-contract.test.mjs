import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("defines the frozen six-solution portfolio once", () => {
  const source = read("components/content/solutions.ts");
  for (const name of [
    "AI Solutions",
    "Business Automation",
    "Custom Software Development",
    "Digital Business Systems",
    "Websites & Web Applications",
    "Technology Consulting",
  ]) {
    assert.equal(source.split(`name: "${name}"`).length - 1, 1);
  }
  assert.doesNotMatch(source, /name: "Artificial Intelligence"/);
});

test("retains the frozen homepage message hierarchy", () => {
  const source = read("components/content/home.ts");
  assert.match(source, /Turn business challenges into better systems\./);
  assert.match(source, /Grow more effectively/);
  assert.match(source, /Operate more efficiently/);
  assert.match(source, /Modernize with confidence/);
  assert.match(source, /Where AI may not be the right answer/);
});

test("uses Cobrykz voice for direct accountability", () => {
  const source = read("components/content/home.ts");
  assert.match(source, /Direct accountability/);
  assert.match(source, /Cobrykz provides direct accountability/);
  assert.doesNotMatch(source, /Direct founder accountability/);
  assert.doesNotMatch(source, /Mandela Atud provides direct accountability/);
});

test("wraps every page in the shared Cobrykz site shell", () => {
  const source = read("app/layout.tsx");

  assert.match(
    source,
    /Cobrykz \| AI, Automation, Software & Digital Systems/,
  );
  assert.match(
    source,
    /import SiteHeader from ["']@\/components\/layout\/SiteHeader["']/,
  );
  assert.match(
    source,
    /import SiteFooter from ["']@\/components\/layout\/SiteFooter["']/,
  );
  assert.match(source, /<SiteHeader\s*\/>/);
  assert.match(source, /<SiteFooter\s*\/>/);
  assert.doesNotMatch(source, /Founder-Led Websites/);
});

test("provides a keyboard-operable Solutions disclosure from shared content", () => {
  const source = read("components/layout/SolutionsMenu.tsx");

  assert.match(
    source,
    /import \{ solutions \} from ["']@\/components\/content\/solutions["']/,
  );
  assert.match(source, /solutions\.map\(\(solution\) =>/);
  assert.match(source, /href=\{solution\.href\}/);
  assert.match(source, /\{solution\.name\}/);
  assert.match(source, /aria-expanded=\{isOpen\}/);
  assert.match(source, /aria-controls=\{menuId\}/);
  assert.match(source, /event\.key === ["']Escape["']/);
  assert.match(source, /onClick=\{closeMenu\}/);
});
