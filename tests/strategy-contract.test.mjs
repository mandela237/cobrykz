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

test("provides an accessible business-challenge router", () => {
  const source = read("components/home/ChallengeRouter.tsx");

  assert.match(source, /["']use client["']/);
  assert.match(source, /challengeRoutes/);
  assert.match(source, /solutionBySlug/);
  assert.match(source, /Object\.values\(challengeRoutes\)\.map\(/);
  assert.match(source, /<button\b[\s\S]*?className=\{`min-h-11/);
  assert.match(source, /aria-pressed=/);
  assert.match(source, /isSelected \? "Selected"/);
  assert.match(source, /aria-live="polite"/);
  assert.match(
    source,
    /A focused assessment confirms the right approach\./,
  );
  assert.match(
    source,
    /<Link\s+href=\{selectedSolution\.href\}\s+className="[^"]*\bmin-h-11\b[^"]*"/,
  );
  assert.match(
    source,
    /import \{ primaryCta \} from ["']@\/components\/content\/site["']/,
  );
  assert.match(
    source,
    /<Link\s+href=\{primaryCta\.href\}\s+className="[^"]*\bmin-h-11\b[^"]*"[^>]*>\s*\{primaryCta\.label\}\s*<\/Link>/s,
  );
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

test("keeps the shared primary CTA available on touch and mobile", () => {
  const site = read("components/content/site.ts");
  const header = read("components/layout/SiteHeader.tsx");

  assert.match(site, /label: "Discuss a business challenge"/);
  assert.match(
    header,
    /<PrimaryLink\s+[^>]*href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
  );
  assert.doesNotMatch(
    header,
    /<PrimaryLink\b[^>]*className="[^"]*\bhidden\b[^"]*"/,
  );
});

test("uses Next Link for every internal shared-shell route", () => {
  const primaryLink = read("components/ui/PrimaryLink.tsx");
  const header = read("components/layout/SiteHeader.tsx");
  const solutionsMenu = read("components/layout/SolutionsMenu.tsx");
  const footer = read("components/layout/SiteFooter.tsx");

  for (const [source, label] of [
    [primaryLink, "PrimaryLink"],
    [header, "SiteHeader"],
    [solutionsMenu, "SolutionsMenu"],
    [footer, "SiteFooter"],
  ]) {
    assert.match(
      source,
      /import Link from ["']next\/link["']/,
      `${label} must use the Next.js internal navigation primitive`,
    );
  }

  assert.match(primaryLink, /<Link\s+href=\{href\}/);
  assert.match(header, /<Link\s+href="\/"/);
  assert.match(header, /<Link\s+href=\{item\.href\}/);
  assert.match(solutionsMenu, /<Link\s+href=\{solution\.href\}/);
  assert.match(footer, /<Link\s+href="\/"/);
  assert.match(footer, /<Link\s+href=\{solution\.href\}/);
  assert.match(footer, /<Link\s+href=\{item\.href\}/);

  for (const [source, label] of [
    [primaryLink, "PrimaryLink"],
    [header, "SiteHeader"],
    [solutionsMenu, "SolutionsMenu"],
  ]) {
    assert.doesNotMatch(source, /<a\b/, `${label} must not use raw anchors`);
  }
  assert.equal((footer.match(/<a\b/g) || []).length, 1);
  assert.match(footer, /<a\s+href="mailto:info@cobrykz\.com"/);
});
