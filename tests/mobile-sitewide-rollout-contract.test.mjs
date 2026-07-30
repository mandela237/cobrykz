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
