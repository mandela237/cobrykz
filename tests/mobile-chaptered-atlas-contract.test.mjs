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
  assert.match(
    disclosure,
    /summary: ReactNode/,
    "server-rendered disclosure summaries must cross the client boundary as nodes",
  );
  assert.match(disclosure, /panel: ReactNode/);
  assert.doesNotMatch(disclosure, /renderSummary|renderPanel|getId/);
  assert.match(disclosure, /<div\s+role="group"\s+aria-label=\{ariaLabel\}/);
  assert.match(
    css,
    /\.mobile-chapter\[data-mobile-tone="dark"\]\s+\.mobile-chapter__marker\s*\{[^}]*color:\s*var\(--focus-ring-dark\)/s,
  );
  assert.match(
    css,
    /\.mobile-chapter\[data-mobile-tone="dark"\]\s+:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-dark\)/s,
  );
  assert.match(css, /--focus-ring-on-light:\s*#[0-9a-f]{6}/i);
  assert.match(
    css,
    /\.mobile-chapter\[data-mobile-tone="dark"\]\s+\.mobile-atlas__control:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-on-light\)/s,
  );
});

test("recomposes Atlas definitions vertically without copying business labels", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");
  const relationship = read("components/solutions/CapabilityRelationshipAtlas.tsx");

  assert.match(mobileAtlas, /definition: AtlasDefinition/);
  assert.match(mobileAtlas, /definition\.nodes\.map/);
  assert.match(mobileAtlas, /definition\.connections/);
  assert.match(
    mobileAtlas,
    /definition\.readingDirection\.replace\([^)]*left to right[^)]*top to bottom/is,
  );
  assert.doesNotMatch(mobileAtlas, /\{definition\.readingDirection\}/);
  assert.match(relationship, /export const capabilityRelationship/);
  assert.doesNotMatch(mobileAtlas, /Consulting|Automation|Digital systems/);
});

test("renders each Atlas node control once and preserves selected fan-in and fan-out", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");

  assert.match(mobileAtlas, /definition\.connections\.filter/);
  assert.match(mobileAtlas, /connection\.target === selectedNodeId/);
  assert.match(mobileAtlas, /connection\.source === selectedNodeId/);
  assert.match(mobileAtlas, /incomingConnections\.map\(\(connection\)/);
  assert.match(mobileAtlas, /outgoingConnections\.map\(\(connection\)/);
  assert.match(mobileAtlas, /data-atlas-state=\{connection\.state \?\? "default"\}/);
  assert.equal(
    (mobileAtlas.match(/<MobileAtlasNodeControl/g) || []).length,
    1,
    "the node list must create exactly one control per logical node",
  );
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

test("builds the mobile Homepage from the frozen content source", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const challenge = read("components/home/MobileChallengeRouter.tsx");
  const page = read("app/page.tsx");
  const home = read("components/content/home.ts");
  const site = read("components/content/site.ts");

  for (const model of [
    "homeMessage",
    "homeOutcomes",
    "whyCobrykz",
    "aiPrinciples",
    "processStages",
    "solutions",
  ]) {
    assert.match(mobile, new RegExp(model));
  }
  assert.match(challenge, /challengeRoutes/);

  assert.match(mobile, /primaryCta/);
  assert.match(mobile, /solutionsCta/);
  assert.match(mobile, /processCta/);
  assert.match(mobile, /homePageCopy/);
  assert.match(home, /export const homePageCopy/);
  assert.match(site, /export const solutionsCta/);
  assert.match(site, /export const processCta/);
  assert.match(page, /MobileHomePage/);
  assert.match(page, /HomeHero/);
  assert.match(mobile, /data-mobile-homepage/);
  assert.doesNotMatch(
    mobile,
    /<main\b/,
    "the root layout already provides the page main landmark",
  );
  assert.doesNotMatch(
    mobile,
    /Turn business challenges into better systems\./,
  );
  for (const literal of [
    "Business technology, connected",
    "Technology should make the business stronger.",
    "Modern solutions for real business challenges.",
    "One accountable partner from decision to delivery.",
    "A practical point of view on AI.",
    "What is holding the work back?",
    "A focused assessment confirms the right approach.",
    "A clear path from question to working system.",
    "Explore our solutions",
    "Explore the full process",
  ]) {
    assert.doesNotMatch(mobile, new RegExp(literal.replace(/[.?]/g, "\\$&")));
  }
});

test("keeps the approved Homepage chapter order", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const sequence = [
    'eyebrow="Opening"',
    'eyebrow="Business outcomes"',
    'eyebrow="Solutions"',
    'eyebrow="Why Cobrykz"',
    'eyebrow="AI point of view"',
    'eyebrow="Challenge router"',
    'eyebrow="Process"',
    "{closing}",
  ];

  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      mobile.indexOf(sequence[index - 1]) < mobile.indexOf(sequence[index]),
      `${sequence[index - 1]} must precede ${sequence[index]}`,
    );
  }
});

test("uses disclosure and selection patterns for dense Homepage chapters", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const atlas = read("components/home/MobileHomeAtlas.tsx");
  const challenge = read("components/home/MobileChallengeRouter.tsx");
  const desktopAtlas = read("components/home/BusinessSystemCutaway.tsx");

  assert.ok(
    (mobile.match(/<MobileDisclosureGroup/g) || []).length >= 5,
    "outcomes, capabilities, accountability, AI, and process require disclosure",
  );
  assert.match(mobile, /defaultOpenId="grow-more-effectively"/);
  assert.match(mobile, /ariaLabel="Business outcomes"/);
  assert.match(challenge, /Object\.values\(challengeRoutes\)\.map/);
  assert.match(challenge, /aria-pressed=\{isSelected\}/);
  assert.match(challenge, /aria-live="polite"/);
  assert.match(atlas, /<MobileAtlasPath/);
  assert.match(mobile, /businessSystemCutaway/);
  assert.match(desktopAtlas, /export const businessSystemCutaway/);
});

test("keeps only interactive mobile regions inside focused client islands", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const atlas = read("components/home/MobileHomeAtlas.tsx");
  const challenge = read("components/home/MobileChallengeRouter.tsx");
  const boundary = read("components/home/ResponsiveHomePage.tsx");
  const page = read("app/page.tsx");

  assert.doesNotMatch(mobile, /"use client"|useState|onClick/);
  assert.match(mobile, /<MobileHomeAtlas/);
  assert.match(mobile, /<MobileChallengeRouter/);
  assert.doesNotMatch(mobile, /<MobileAtlasPath|challengeRoutes|solutionBySlug/);

  assert.match(atlas, /"use client"/);
  assert.match(atlas, /useState/);
  assert.match(atlas, /<MobileAtlasPath/);
  assert.match(challenge, /"use client"/);
  assert.match(challenge, /useState/);

  assert.doesNotMatch(
    boundary,
    /from ["'][^"']*(?:MobileHomePage|HomeHero|ProjectsEvidence)["']/,
  );
  assert.match(boundary, /mobile: ReactNode/);
  assert.match(boundary, /desktop: ReactNode/);
  assert.match(boundary, /return isMobile \? mobile : desktop/);
  assert.match(page, /mobile=\{<MobileHomePage closing=\{closing\} \/>\}/);
  assert.match(page, /desktop=\{desktop\}/);
});

test("keeps both desktop-parity actions inside the mobile recommendation panel", () => {
  const challenge = read("components/home/MobileChallengeRouter.tsx");
  const panel = challenge.match(
    /<section[\s\S]*?className="mobile-home-recommendation"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(panel, "the mobile recommendation panel must exist");
  assert.match(panel, /href=\{selectedSolution\.href\}/);
  assert.match(panel, /href=\{primaryCta\.href\}/);
  assert.match(panel, /\{primaryCta\.label\}/);
});

test("renders exactly one runtime-selected Homepage composition with canonical anchors", () => {
  const page = read("app/page.tsx");
  const boundary = read("components/home/ResponsiveHomePage.tsx");
  const mobile = read("components/home/MobileHomePage.tsx");
  const css = read("app/globals.css");

  assert.match(page, /<ResponsiveHomePage/);
  assert.doesNotMatch(page, /\bmd:hidden\b|\bhidden md:block\b/);
  assert.match(boundary, /"use client"/);
  assert.match(boundary, /useSyncExternalStore/);
  assert.match(boundary, /matchMedia\("\(max-width: 767px\)"\)/);
  assert.match(boundary, /getServerSnapshot/);
  assert.match(boundary, /return isMobile \? mobile : desktop/);
  assert.doesNotMatch(boundary, /\{mobile\}\s*\{desktop\}|\{desktop\}\s*\{mobile\}/);
  assert.doesNotMatch(mobile, /ProjectsEvidence|AuthorityBand|HomeFinalCTA/);
  assert.match(mobile, /closing: ReactNode/);

  for (const anchor of [
    "outcomes",
    "solutions",
    "why-cobrykz",
    "ai-point-of-view",
    "process",
  ]) {
    assert.match(mobile, new RegExp(`id=["']${anchor}["']`));
  }
  assert.doesNotMatch(
    css,
    /\[data-mobile-homepage\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
    "the mobile Homepage must contain rather than conceal horizontal overflow",
  );
  assert.match(
    css,
    /\.mobile-home-atlas-plane\s*\{[^}]*overflow:\s*hidden/s,
    "the bounded hero artifact must contain its decorative light field",
  );

  const desktopSequence = [
    "<HomeHero />",
    "<BusinessOutcomes />",
    "<SolutionsOverview />",
    "<WhyCobrykz />",
    "<AIPointOfView />",
    "<ChallengeRouter />",
    "<ProcessOverview />",
    "<ProjectsEvidence />",
    "<AuthorityBand />",
    "<HomeFinalCTA />",
  ];

  for (let index = 1; index < desktopSequence.length; index += 1) {
    assert.ok(
      page.indexOf(desktopSequence[index - 1]) <
        page.indexOf(desktopSequence[index]),
      `${desktopSequence[index - 1]} must precede ${desktopSequence[index]}`,
    );
  }
});

test("keeps selected Atlas explanations readable on mobile", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /\.mobile-atlas__detail\s*\{[^}]*font-size:\s*0\.9375rem/s,
  );
});
