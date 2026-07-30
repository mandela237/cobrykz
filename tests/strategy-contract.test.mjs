import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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

test("renders the semantic homepage narrative in order", () => {
  const source = read("app/page.tsx");
  const expected = [
    "HomeHero",
    "BusinessOutcomes",
    "SolutionsOverview",
    "WhyCobrykz",
    "AIPointOfView",
    "ChallengeRouter",
    "ProcessOverview",
    "ProjectsEvidence",
    "AuthorityBand",
    "HomeFinalCTA",
  ];

  for (const component of expected) {
    assert.match(
      source,
      new RegExp(`import ${component} from ["']@/components/home/${component}["']`),
      `${component} must be imported from components/home`,
    );
  }

  const compactSource = source.replace(/\s/g, "");
  const instances = expected.map((component) => {
    const instance = `<${component}/>`;
    assert.equal(
      compactSource.split(instance).length - 1,
      1,
      `${component} must render exactly once`,
    );
    return compactSource.indexOf(instance);
  });
  assert.deepEqual(
    instances,
    [...instances].sort((left, right) => left - right),
    "homepage sections must render in the frozen narrative order",
  );
  assert.doesNotMatch(source, /MobileExperience/);
  assert.doesNotMatch(source, /Founder-led websites/i);
  assert.doesNotMatch(source, /Start with the website/i);
});

test("frames the reviewed challenge router within the responsive homepage shell", () => {
  const source = read("app/page.tsx");

  assert.match(
    source,
    /<div className="border-y border-border bg-white">\s*<div className="section-shell py-16 sm:py-20 lg:py-24">\s*<ChallengeRouter\s*\/>\s*<\/div>\s*<\/div>/s,
  );
});

test("provides a semantic shared section introduction", () => {
  const path = "components/ui/SectionIntro.tsx";
  assert.equal(
    existsSync(join(root, path)),
    true,
    "SectionIntro must exist as a shared homepage primitive",
  );

  const source = read(path);
  assert.match(source, /id: string/);
  assert.match(source, /title: string/);
  assert.match(source, /description: string/);
  assert.match(source, /<h2\s+id=\{id\}/);
  assert.match(source, /\{title\}/);
  assert.match(source, /\{description\}/);
});

test("builds semantic homepage sections from frozen shared content", () => {
  const page = read("app/page.tsx");
  const sections = {
    hero: read("components/home/HomeHero.tsx"),
    outcomes: read("components/home/BusinessOutcomes.tsx"),
    solutions: read("components/home/SolutionsOverview.tsx"),
    why: read("components/home/WhyCobrykz.tsx"),
    ai: read("components/home/AIPointOfView.tsx"),
    process: read("components/home/ProcessOverview.tsx"),
    projects: read("components/home/ProjectsEvidence.tsx"),
    authority: read("components/home/AuthorityBand.tsx"),
    finalCta: read("components/home/HomeFinalCTA.tsx"),
  };

  assert.equal((page.match(/<main\b/g) || []).length, 1);
  assert.doesNotMatch(page, /["']use client["']/);
  assert.equal(
    Object.values(sections).reduce(
      (count, source) => count + (source.match(/<h1\b/g) || []).length,
      0,
    ),
    1,
    "the homepage narrative must contain exactly one H1",
  );

  for (const [name, source] of Object.entries(sections)) {
    assert.match(source, /<section\b/, `${name} must use a semantic section`);
    assert.doesNotMatch(
      source,
      /["']use client["']/,
      `${name} must remain a Server Component`,
    );
  }

  assert.match(
    sections.hero,
    /import \{ homeMessage \} from ["']@\/components\/content\/home["']/,
  );
  assert.match(sections.hero, /\{homeMessage\.headline\}/);
  assert.match(sections.hero, /\{homeMessage\.description\}/);

  for (const [source, content, item] of [
    [sections.outcomes, "homeOutcomes", "outcome"],
    [sections.why, "whyCobrykz", "reason"],
    [sections.ai, "aiPrinciples", "principle"],
    [sections.process, "processStages", "stage"],
  ]) {
    assert.match(
      source,
      new RegExp(
        `import \\{ ${content} \\} from ["']@/components/content/home["']`,
      ),
    );
    assert.match(source, new RegExp(`${content}\\.map\\(\\(${item}`));
    assert.match(source, /<(?:ul|ol)\b/);
  }

  assert.match(
    sections.solutions,
    /import \{ solutions \} from ["']@\/components\/content\/solutions["']/,
  );
  assert.match(sections.solutions, /solutions\.map\(\(solution/);
  assert.match(sections.solutions, /href=\{solution\.href\}/);
  assert.match(sections.solutions, /\{solution\.name\}/);
  assert.match(sections.solutions, /<ol\b/);

  const newSectionSource = Object.values(sections).join("\n");
  for (const solutionName of [
    "AI Solutions",
    "Business Automation",
    "Custom Software Development",
    "Digital Business Systems",
    "Websites & Web Applications",
    "Technology Consulting",
  ]) {
    assert.doesNotMatch(
      newSectionSource,
      new RegExp(solutionName.replace(/[&]/g, "\\&")),
      `${solutionName} must come from shared solution content`,
    );
  }
});

test("keeps the frozen Solutions section identity", () => {
  const source = read("components/home/SolutionsOverview.tsx");

  assert.match(
    source,
    /<section\s+aria-labelledby="solutions-heading"\s+id="solutions">/,
  );
  assert.match(
    source,
    /<SectionIntro\s+id="solutions-heading"\s+title="Modern solutions for real business challenges\."\s+description="Cobrykz combines strategy and execution to move organizations from problem to working solution\."\s*\/>/s,
  );
});

test("presents future evidence and planned insight content honestly", () => {
  const projects = read("components/home/ProjectsEvidence.tsx");
  const authority = read("components/home/AuthorityBand.tsx");

  assert.match(projects, /case studies will be published/i);
  assert.match(projects, /verified outcomes/i);
  assert.doesNotMatch(projects, /<article\b|\.map\(/);

  assert.match(authority, /Mandela Atud/);
  assert.match(authority, /accountab/i);
  assert.match(authority, /Planned insight/);
  assert.match(authority, /Where should a business actually start with AI\?/);
  assert.doesNotMatch(authority, /href=["']\/insights(?:\/|["'])/);
});

test("uses the shared primary CTA at both homepage decision points", () => {
  const hero = read("components/home/HomeHero.tsx");
  const finalCta = read("components/home/HomeFinalCTA.tsx");

  for (const [source, name] of [
    [hero, "HomeHero"],
    [finalCta, "HomeFinalCTA"],
  ]) {
    assert.match(
      source,
      /import \{ primaryCta \} from ["']@\/components\/content\/site["']/,
      `${name} must consume the shared CTA`,
    );
    assert.match(
      source,
      /import PrimaryLink from ["']@\/components\/ui\/PrimaryLink["']/,
      `${name} must use PrimaryLink`,
    );
    assert.match(
      source,
      /<PrimaryLink\s+href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
    );
  }
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
