import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

test("provides one shared runtime-selected composition", () => {
  const boundary = read(
    "components/mobile/ResponsivePageComposition.tsx",
  );

  assert.match(boundary, /"use client"/);
  assert.match(boundary, /useSyncExternalStore/);
  assert.match(boundary, /matchMedia\("\(max-width: 767px\)"\)/);
  assert.match(boundary, /mobile: ReactNode/);
  assert.match(boundary, /desktop: ReactNode/);
  assert.match(boundary, /getServerSnapshot/);
  assert.match(boundary, /return isMobile \? mobile : desktop/);
  assert.doesNotMatch(
    boundary,
    /\{mobile\}\s*\{desktop\}|\{desktop\}\s*\{mobile\}/,
  );
});

test("reuses the shared boundary without changing prototype entry points", () => {
  const homepageBoundary = read(
    "components/home/ResponsiveHomePage.tsx",
  );
  const solutionsBoundary = read(
    "components/solutions/ResponsiveSolutionsHub.tsx",
  );

  for (const boundary of [homepageBoundary, solutionsBoundary]) {
    assert.match(
      boundary,
      /from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
    );
    assert.doesNotMatch(boundary, /useSyncExternalStore|matchMedia/);
  }
});

test("provides a server-only mobile chapter introduction", () => {
  const intro = read("components/mobile/MobileChapterIntro.tsx");

  assert.match(intro, /id: string/);
  assert.match(intro, /title: string/);
  assert.match(intro, /description\?: string/);
  assert.match(intro, /id=\{id\}/);
  assert.match(intro, /\{title\}/);
  assert.match(intro, /description \?/);
  assert.match(intro, /mobile-chapter-intro/);
  assert.doesNotMatch(intro, /"use client"|useState|useEffect/);
});

test("provides a focused stateful Atlas explorer", () => {
  const atlas = read("components/mobile/MobileAtlasExplorer.tsx");

  assert.match(atlas, /"use client"/);
  assert.match(atlas, /definition: AtlasDefinition/);
  assert.match(atlas, /initialSelectedNodeId: string/);
  assert.match(atlas, /showDefinitionContext\?: boolean/);
  assert.match(atlas, /useState/);
  assert.match(atlas, /<MobileAtlasPath/);
  assert.match(atlas, /onSelectNode=\{setSelectedNodeId\}/);
  assert.match(atlas, /showDefinitionContext=\{showDefinitionContext\}/);
});

test("defines repeatable local-Chrome mobile and desktop browser projects", () => {
  const packageJson = JSON.parse(read("package.json"));
  const config = read("playwright.config.ts");
  const browser = read("tests/browser/mobile-sitewide-rollout.spec.ts");

  assert.equal(packageJson.devDependencies["@playwright/test"], "1.54.2");
  assert.match(config, /port:\s*3100/);
  assert.match(config, /channel:\s*"chrome"/);
  assert.match(config, /width:\s*390,\s*height:\s*844/);
  assert.match(config, /width:\s*1440,\s*height:\s*1000/);
  assert.match(config, /reducedMotion:\s*"reduce"/);
  assert.match(config, /trace:\s*"on-first-retry"/);
  assert.match(config, /screenshot:\s*"only-on-failure"/);
  assert.match(config, /npm run build && npm run start -- -p 3100/);
  assert.match(config, /reuseExistingServer:\s*false/);
  assert.doesNotMatch(
    config,
    /reuseExistingServer:\s*!process\.env\.CI/,
    "the browser gate must never silently test an already-running stale server",
  );

  assert.match(
    browser,
    /document\.documentElement\.scrollWidth <= innerWidth/,
  );
  assert.match(browser, /ids\.length === new Set\(ids\)\.size/);
  assert.match(browser, /expect\.poll/);
});

test("adds a restrained shared chapter-intro hierarchy", () => {
  const css = read("app/globals.css");

  assert.match(css, /\.mobile-chapter-intro\s*\{/);
  assert.match(css, /\.mobile-chapter-intro__title\s*\{/);
  assert.match(css, /\.mobile-chapter-intro__description\s*\{/);
  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\.mobile-chapter-intro\s*\{/,
  );
});

test("builds the mobile Process page from the frozen process definition", () => {
  const mobile = read("components/company/MobileProcessPage.tsx");
  const route = read("app/process/page.tsx");

  for (const field of [
    "content.eyebrow",
    "content.headline",
    "content.introduction",
    "content.stages",
    "content.decisionGates",
    "content.scaling",
    "content.operatingModel",
    "content.postLaunch",
    "content.cta",
  ]) {
    assert.match(mobile, new RegExp(field.replace(".", "\\.")));
  }

  assert.match(mobile, /content: ProcessPageDefinition/);
  assert.match(mobile, /data-mobile-process/);
  assert.doesNotMatch(mobile, /"use client"|useState|onClick/);
  assert.match(route, /<ResponsivePageComposition/);
  assert.match(route, /mobile=\{<MobileProcessPage content=\{processPage\} \/>\}/);
  assert.match(route, /desktop=\{<ProcessPage content=\{processPage\} \/>\}/);
  assert.doesNotMatch(
    mobile,
    /Six connected stages\. Two visible decisions\./,
    "mobile composition must not introduce a new public-facing message",
  );
});

test("keeps the approved Process chapter order and canonical anchors", () => {
  const mobile = read("components/company/MobileProcessPage.tsx");
  const sequence = [
    'id="process-hero"',
    'id="process-stages"',
    'id="process-scaling"',
    'id="process-accountability"',
    'id="process-post-launch"',
    'id="process-cta"',
  ];

  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      mobile.indexOf(sequence[index - 1]) < mobile.indexOf(sequence[index]),
      `${sequence[index - 1]} must precede ${sequence[index]}`,
    );
  }

  assert.match(mobile, /<MobileDeliveryRail/);
  assert.ok(
    (mobile.match(/<MobileDisclosureGroup/g) || []).length >= 2,
    "scaling and accountability require compact disclosure",
  );
  assert.doesNotMatch(
    mobile,
    /<main\b/,
    "the root layout already provides the page main landmark",
  );
});

test("keeps Process stage and gate sequencing inside one focused client island", () => {
  const rail = read("components/company/MobileDeliveryRail.tsx");

  assert.match(rail, /"use client"/);
  assert.match(rail, /stages: readonly ProcessStageDefinition\[\]/);
  assert.match(rail, /gates: readonly ProcessDecisionGate\[\]/);
  assert.match(rail, /stages\.map\(\(stage, index\)/);
  assert.match(rail, /candidate\.after === stage\.name/);
  assert.match(rail, /candidate\.before === stages\[index \+ 1\]\?\.name/);
  assert.match(rail, /id=\{`process-\$\{stage\.name\.toLowerCase\(\)\}`\}/);
  assert.match(rail, /aria-expanded=\{isOpen\}/);
  assert.match(rail, /aria-controls=\{panelId\}/);
  assert.match(rail, /aria-live="polite"/);
  assert.match(rail, /stage\.decisions\.map/);
  assert.match(rail, /stage\.outputs\.map/);
  assert.match(rail, /gate\.criteria\.map/);
  assert.doesNotMatch(
    rail,
    /Discover|Assess|Design|Build|Deploy|Optimize/,
    "stage labels must come from the frozen content registry",
  );
});

test("preserves the frozen desktop Process section sequence", () => {
  const desktop = read("components/company/ProcessPage.tsx");
  const sequence = [
    'id="process-hero"',
    "<DeliveryRail",
    'aria-labelledby="process-scaling-heading"',
    'aria-label="How the work stays accountable"',
    'aria-labelledby="process-post-launch-heading"',
    'id="process-cta"',
  ];

  for (let index = 1; index < sequence.length; index += 1) {
    assert.ok(
      desktop.indexOf(sequence[index - 1]) <
        desktop.indexOf(sequence[index]),
      `${sequence[index - 1]} must precede ${sequence[index]}`,
    );
  }
});

test("gives the mobile Process rail touch-safe architectural progression", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\[data-mobile-process\]\s*\{/,
  );
  assert.match(css, /\.mobile-process-rail\s*\{[^}]*position:\s*relative/s);
  assert.match(css, /\.mobile-process-rail::before\s*\{/);
  assert.match(
    css,
    /\.mobile-process-rail__trigger\s*\{[^}]*min-height:\s*4[^;]*rem/s,
  );
  assert.match(
    css,
    /\.mobile-process-gate\s*\{[^}]*border-left:\s*3px solid var\(--color-blue\)/s,
  );
  assert.match(
    css,
    /\.mobile-process-disclosure--dark[\s\S]*?\.mobile-disclosure-trigger:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-dark\)/s,
  );
  assert.doesNotMatch(
    css,
    /\[data-mobile-process\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
    "the Process composition must contain rather than conceal overflow",
  );
});
