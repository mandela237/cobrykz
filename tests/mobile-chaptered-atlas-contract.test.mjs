import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

const approvedHomepageLiterals = [
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
];

const assertNoMobileCopyForks = (mobile, challenge) => {
  const mobileCopySources = `${mobile}\n${challenge}`;

  for (const literal of approvedHomepageLiterals) {
    assert.doesNotMatch(
      mobileCopySources,
      new RegExp(literal.replace(/[.?]/g, "\\$&")),
    );
  }
};

test("copy-fork audit covers the focused challenge island", () => {
  assert.throws(
    () =>
      assertNoMobileCopyForks(
        "const title = homePageCopy.hero.eyebrow;",
        'const assessment = "A focused assessment confirms the right approach.";',
      ),
    /A focused assessment confirms the right approach/,
  );
});

test("provides a compact accessible mobile header with complete navigation", () => {
  const header = read("components/layout/SiteHeader.tsx");
  const mobileNavigation = read("components/layout/MobileNavigation.tsx");
  const css = read("app/globals.css");

  assert.match(header, /<MobileNavigation\s*\/>/);
  assert.match(header, /site-header-mobile/);
  assert.match(header, /site-header-desktop/);
  assert.match(header, /\bmd:hidden\b/);
  assert.match(header, /\bhidden md:flex\b/);

  assert.match(mobileNavigation, /"use client"/);
  assert.match(mobileNavigation, /aria-expanded=\{isOpen\}/);
  assert.match(mobileNavigation, /aria-controls=\{menuId\}/);
  assert.match(mobileNavigation, /primaryNavigation\.map/);
  assert.match(mobileNavigation, /solutions\.map/);
  assert.match(mobileNavigation, /href=\{primaryCta\.href\}/);
  assert.match(mobileNavigation, /\{primaryCta\.label\}/);
  assert.match(mobileNavigation, /event\.key === "Escape"/);
  assert.match(mobileNavigation, /firstLinkRef\.current\?\.focus\(\)/);
  assert.match(mobileNavigation, /triggerRef\.current\?\.focus\(\)/);
  assert.match(
    mobileNavigation,
    /document\.addEventListener\("pointerdown", handlePointerDown\)/,
  );
  assert.match(mobileNavigation, /onClick=\{closeMenu\}/);

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\.site-header-mobile\s*\{[^}]*min-height:\s*3\.75rem/s,
  );
  assert.match(
    css,
    /\.mobile-navigation__trigger\s*\{[^}]*min-width:\s*2\.75rem;[^}]*min-height:\s*2\.75rem/s,
  );
});

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

test("groups the mobile Atlas into definition-driven architectural planes", () => {
  const mobileAtlas = read("components/mobile/MobileAtlasPath.tsx");
  const css = read("app/globals.css");

  assert.match(mobileAtlas, /definition\.layers\.map/);
  assert.match(mobileAtlas, /node\.layerId === layer\.id/);
  assert.match(mobileAtlas, /data-atlas-layer=\{layer\.id\}/);
  assert.match(mobileAtlas, /data-atlas-depth=\{layer\.depth\}/);
  assert.match(
    mobileAtlas,
    /data-atlas-connection-state=\{connectionState\}/,
  );
  assert.match(mobileAtlas, /\{layer\.label\}/);

  assert.match(css, /\.mobile-atlas__layer\s*\{/);
  assert.match(css, /\.mobile-atlas__layer-header\s*\{/);
  assert.match(css, /\.mobile-atlas__nodes\s*\{/);
  assert.match(
    css,
    /\.mobile-atlas__layer\[data-atlas-connection-state="active"\]/,
  );
});

test("separates the daylight threshold from the concentrated Atlas artifact", () => {
  const css = read("app/globals.css");

  assert.match(css, /\.measured-threshold\s*\{/);
  assert.match(css, /\.measured-system\s*\{/);
  assert.match(css, /\.measured-threshold__title\s*\{/);
  assert.match(css, /\.measured-system__artifact\s*\{/);
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
  assert.match(challenge, /homePageCopy\.challengeRouter\.assessment/);

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
  assertNoMobileCopyForks(mobile, challenge);
});

test("keeps the approved Homepage chapter order", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const sequence = [
    'data-mobile-scene="threshold"',
    'data-mobile-scene="system"',
    'data-mobile-scene="outcomes"',
    'data-mobile-scene="capabilities"',
    'data-mobile-scene="trust"',
    'data-mobile-scene="decision"',
    'data-mobile-scene="challenge"',
    'data-mobile-scene="process"',
    "{closing}",
  ];

  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      mobile.indexOf(sequence[index - 1]) < mobile.indexOf(sequence[index]),
      `${sequence[index - 1]} must precede ${sequence[index]}`,
    );
  }
});

test("uses visible editorial scenes and limits interaction to purposeful islands", () => {
  const mobile = read("components/home/MobileHomePage.tsx");
  const atlas = read("components/home/MobileHomeAtlas.tsx");
  const challenge = read("components/home/MobileChallengeRouter.tsx");
  const desktopAtlas = read("components/home/BusinessSystemCutaway.tsx");

  assert.doesNotMatch(mobile, /<MobileDisclosureGroup/);
  assert.match(mobile, /homeOutcomes\.map/);
  assert.match(mobile, /solutions\.map/);
  assert.match(mobile, /whyCobrykz\.map/);
  assert.match(mobile, /aiPrinciples\.map/);
  assert.match(mobile, /processStages\.map/);
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
  const sharedBoundary = read(
    "components/mobile/ResponsivePageComposition.tsx",
  );
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
  assert.match(
    boundary,
    /from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
  );
  assert.match(sharedBoundary, /mobile: ReactNode/);
  assert.match(sharedBoundary, /desktop: ReactNode/);
  assert.match(sharedBoundary, /return isMobile \? mobile : desktop/);
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
  const sharedBoundary = read(
    "components/mobile/ResponsivePageComposition.tsx",
  );
  const mobile = read("components/home/MobileHomePage.tsx");
  const css = read("app/globals.css");

  assert.match(page, /<ResponsiveHomePage/);
  assert.doesNotMatch(page, /\bmd:hidden\b|\bhidden md:block\b/);
  assert.match(
    boundary,
    /from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
  );
  assert.match(sharedBoundary, /"use client"/);
  assert.match(sharedBoundary, /useSyncExternalStore/);
  assert.match(sharedBoundary, /matchMedia\("\(max-width: 767px\)"\)/);
  assert.match(sharedBoundary, /getServerSnapshot/);
  assert.match(sharedBoundary, /return isMobile \? mobile : desktop/);
  assert.doesNotMatch(
    sharedBoundary,
    /\{mobile\}\s*\{desktop\}|\{desktop\}\s*\{mobile\}/,
  );
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

test("differentiates the Homepage editorial scene compositions", () => {
  const css = read("app/globals.css");

  assert.match(css, /\.measured-outcomes__list\s*\{/);
  assert.match(css, /\.measured-capabilities__index\s*\{/);
  assert.match(css, /\.measured-trust__principles\s*\{/);
  assert.match(css, /\.measured-decision__sheet\s*\{/);
  assert.match(css, /\.measured-process__sequence::before\s*\{/);
});

test("compacts the mobile footer into a complete two-column sitemap", () => {
  const footer = read("components/layout/SiteFooter.tsx");
  const css = read("app/globals.css");

  assert.match(footer, /site-footer__inner/);
  assert.match(footer, /site-footer__grid/);
  assert.match(footer, /site-footer__brand/);
  assert.match(footer, /site-footer__solutions/);
  assert.match(footer, /site-footer__company/);
  assert.match(footer, /solutions\.map/);
  assert.match(footer, /companyLinks\.map/);
  assert.match(footer, /href=\{primaryCta\.href\}/);
  assert.match(footer, /href="mailto:info@cobrykz\.com"/);
  assert.match(footer, /min-h-11/g);

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\.site-footer__grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s,
  );
  assert.match(
    css,
    /\.site-footer__brand\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/s,
  );
});

test("builds the dense Solutions hub as a shared-content mobile capability explorer", () => {
  const mobile = read("components/solutions/MobileSolutionsHub.tsx");
  const hub = read("components/solutions/SolutionsHub.tsx");
  const matrix = read("components/solutions/SolutionSelectionMatrix.tsx");

  for (const model of [
    "solutions",
    "homeOutcomes",
    "processStages",
    "whyCobrykz",
    "primaryCta",
    "capabilityRelationship",
  ]) {
    assert.match(mobile, new RegExp(model));
  }

  assert.match(matrix, /export const selectionRows/);
  assert.match(hub, /solutionsHubCopy/);
  assert.match(hub, /copy=\{solutionsHubCopy\}/);
  assert.match(hub, /selectionRows=\{selectionRows\}/);
  assert.match(hub, /operatingContexts=\{operatingContexts\}/);
  assert.match(hub, /outcomeStartingPoints=\{outcomeStartingPoints\}/);
  assert.doesNotMatch(
    mobile,
    /Find the right way to improve your business\.|Clarity comes before a build decision\.|What could technology improve in your business\?/,
    "approved hub copy must not be forked into the mobile presentation",
  );
});

test("keeps the approved Solutions hub chapter order and canonical anchors", () => {
  const mobile = read("components/solutions/MobileSolutionsHub.tsx");
  const sequence = [
    'id="solutions-hub-hero"',
    'id="solutions-hub-outcomes"',
    'id="solutions-hub-portfolio"',
    'id="solutions-hub-selection"',
    'id="solutions-hub-connected"',
    'id="solutions-hub-method"',
    'id="solutions-hub-why"',
    'id="solutions-hub-cta"',
  ];

  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      mobile.indexOf(sequence[index - 1]) < mobile.indexOf(sequence[index]),
      `${sequence[index - 1]} must precede ${sequence[index]}`,
    );
  }

  assert.doesNotMatch(
    mobile,
    /<main\b/,
    "the root layout already provides the page main landmark",
  );
  assert.match(mobile, /data-mobile-solutions-hub/);
});

test("uses compact disclosures and a focused relationship Atlas island on Solutions", () => {
  const mobile = read("components/solutions/MobileSolutionsHub.tsx");
  const atlas = read("components/solutions/MobileCapabilityAtlas.tsx");

  assert.ok(
    (mobile.match(/<MobileDisclosureGroup/g) || []).length >= 5,
    "outcomes, capabilities, starting points, context, method, and trust need compact disclosure",
  );
  assert.match(mobile, /homeOutcomes\.map/);
  assert.match(mobile, /solutions\.map/);
  assert.match(mobile, /selectionRows\.map/);
  assert.match(mobile, /processStages\.slice\(0,\s*3\)\.map/);
  assert.match(mobile, /whyCobrykz\.map/);
  assert.match(mobile, /<MobileCapabilityAtlas/);
  assert.doesNotMatch(mobile, /"use client"|useState|onClick/);

  assert.match(atlas, /"use client"/);
  assert.match(atlas, /useState/);
  assert.match(atlas, /<MobileAtlasPath/);
  assert.match(atlas, /capabilityRelationship/);
  assert.match(atlas, /solutionBySlug/);
  assert.match(atlas, /aria-live="polite"/);
});

test("preserves every shared Atlas field in the mobile relationship explanation", () => {
  const path = read("components/mobile/MobileAtlasPath.tsx");
  const atlas = read("components/solutions/MobileCapabilityAtlas.tsx");

  assert.match(atlas, /showDefinitionContext/);
  assert.match(path, /\{definition\.title\}/);
  assert.match(path, /\{definition\.description\}/);
  assert.match(path, /\{layer\.meaning\}/);
  assert.match(path, /definition\.legend\?\.map\(\(item\)/);
  assert.match(path, /\{item\.label\}/);
  assert.match(path, /\{item\.meaning\}/);
  assert.match(path, /<AtlasTextEquivalent/);
  assert.match(path, /definition=\{mobileDefinition\}/);
  assert.match(
    path,
    /readingDirection:\s*verticalReadingDirection/,
    "the nonvisual equivalent must describe the recomposed reading direction",
  );
});

test("keeps the mobile Atlas legend focus ring visible inside its clipped frame", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /\.mobile-atlas__legend\s+summary:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-on-light\);[^}]*outline-offset:\s*-\d+(?:\.\d+)?(?:px|rem);/s,
  );
});

test("shares starting-point decision labels across desktop and mobile", () => {
  const matrix = read("components/solutions/SolutionSelectionMatrix.tsx");
  const mobile = read("components/solutions/MobileSolutionsHub.tsx");

  assert.match(matrix, /export const selectionLabels/);
  assert.match(
    matrix,
    /signal:\s*"What it may signal"/,
  );
  assert.match(
    matrix,
    /solution:\s*"Likely starting solution"/,
  );
  assert.match(matrix, /\{selectionLabels\.signal\}/);
  assert.match(matrix, /\{selectionLabels\.solution\}/);
  assert.match(mobile, /selectionLabels/);
  assert.match(mobile, /\{selectionLabels\.signal\}/);
  assert.match(mobile, /\{selectionLabels\.solution\}/);
});

test("mounts exactly one responsive Solutions presentation and preserves desktop source", () => {
  const hub = read("components/solutions/SolutionsHub.tsx");
  const boundary = read("components/solutions/ResponsiveSolutionsHub.tsx");
  const sharedBoundary = read(
    "components/mobile/ResponsivePageComposition.tsx",
  );
  const css = read("app/globals.css");

  assert.match(hub, /<ResponsiveSolutionsHub/);
  assert.match(hub, /mobile=\{/);
  assert.match(hub, /desktop=\{/);
  assert.doesNotMatch(hub, /\bmd:hidden\b|\bhidden md:block\b/);
  assert.match(
    boundary,
    /from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
  );
  assert.match(sharedBoundary, /"use client"/);
  assert.match(sharedBoundary, /useSyncExternalStore/);
  assert.match(sharedBoundary, /matchMedia\("\(max-width: 767px\)"\)/);
  assert.match(sharedBoundary, /mobile: ReactNode/);
  assert.match(sharedBoundary, /desktop: ReactNode/);
  assert.match(sharedBoundary, /return isMobile \? mobile : desktop/);

  assert.doesNotMatch(
    css,
    /\[data-mobile-solutions-hub\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
    "the mobile Solutions hub must contain rather than conceal horizontal overflow",
  );
  assert.match(
    css,
    /\.mobile-solutions-capability-ledger\s+\.mobile-disclosure-trigger\s*\{[^}]*min-height:\s*(?:4|5|6)[^;]*rem/s,
  );
  assert.match(
    css,
    /\.mobile-solutions-atlas-stage\s*\{[^}]*background:/s,
  );
  assert.match(
    css,
    /\.mobile-solutions-process-rail::before\s*\{/,
  );
});
