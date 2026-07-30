import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

test("composes About from one runtime-selected mobile or frozen desktop tree", () => {
  const route = read("app/about/page.tsx");

  assert.match(
    route,
    /from ["']@\/components\/company\/MobileAboutPage["']/,
  );
  assert.match(
    route,
    /from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
  );
  assert.match(route, /mobile=\{<MobileAboutPage content=\{aboutPage\} \/>\}/);
  assert.match(route, /desktop=\{<AboutPage content=\{aboutPage\} \/>\}/);
  assert.doesNotMatch(route, /"use client"|useState|useEffect/);
});

test("keeps the mobile About composition server-only and consumes every approved field", () => {
  const mobile = read("components/company/MobileAboutPage.tsx");

  assert.match(mobile, /data-mobile-about-page/);
  assert.doesNotMatch(mobile, /"use client"|useState|useEffect/);

  for (const field of [
    "content.eyebrow",
    "content.headline",
    "content.introduction",
    "content.foundingTension",
    "content.purpose",
    "content.principles",
    "content.partnership",
    "content.leadership",
    "content.standards",
    "content.cta",
  ]) {
    assert.match(
      mobile,
      new RegExp(field.replace(".", "\\.")),
      `mobile About must consume ${field}`,
    );
  }

  const chapterOrder = [
    'id="about-hero"',
    'id="about-founding-tension"',
    'id="about-purpose"',
    'id="about-principles"',
    'id="about-partnership"',
    'id="about-leadership"',
    'id="about-standards"',
    'id="about-cta"',
  ];

  let previousIndex = -1;
  for (const marker of chapterOrder) {
    const currentIndex = mobile.indexOf(marker);
    assert.ok(currentIndex > previousIndex, `${marker} must remain in order`);
    previousIndex = currentIndex;
  }

  assert.match(mobile, /<MobileDisclosureGroup/);
  assert.match(mobile, /<MobileAtlasExplorer/);
  assert.match(mobile, /showDefinitionContext/);
  assert.match(mobile, /initialSelectedNodeId="accountability"/);
});

test("reuses one exported connected-partner Atlas definition without changing its desktop renderer", () => {
  const atlas = read("components/company/ConnectedPartnerAtlas.tsx");
  const mobile = read("components/company/MobileAboutPage.tsx");

  assert.match(
    atlas,
    /export const connectedPartner\s*=\s*\{/,
  );
  assert.match(atlas, /satisfies AtlasDefinition/);
  assert.match(atlas, /<SystemAtlas[\s\S]*definition=\{connectedPartner\}/);
  assert.match(
    mobile,
    /import \{ connectedPartner \} from ["']@\/components\/company\/ConnectedPartnerAtlas["']/,
  );
  assert.match(mobile, /definition=\{connectedPartner\}/);
});

test("keeps founder identity and accountability visible without disclosure", () => {
  const mobile = read("components/company/MobileAboutPage.tsx");

  assert.match(mobile, /\{content\.leadership\.role\}/);
  assert.match(mobile, /\{content\.leadership\.title\}/);
  assert.match(mobile, /\{content\.leadership\.name\}/);
  assert.match(mobile, /\{content\.leadership\.description\}/);

  const leadershipStart = mobile.indexOf('id="about-leadership"');
  const standardsStart = mobile.indexOf('id="about-standards"');
  const leadershipChapter = mobile.slice(leadershipStart, standardsStart);
  assert.doesNotMatch(leadershipChapter, /<MobileDisclosureGroup/);
});

test("uses concise structural chapter markers without repeating approved headings or the CTA", () => {
  const mobile = read("components/company/MobileAboutPage.tsx");
  const markers = [
    "Company",
    "Origin",
    "Purpose",
    "Principles",
    "Partnership",
    "Leadership",
    "Standards",
    "Next step",
  ];

  for (const marker of markers) {
    assert.match(mobile, new RegExp(`eyebrow="${marker}"`));
  }

  for (const repeatedField of [
    "content.eyebrow",
    "content.purpose.title",
    "content.partnership.title",
    "content.leadership.role",
    "content.cta.label",
  ]) {
    assert.doesNotMatch(
      mobile,
      new RegExp(`eyebrow=\\{${repeatedField.replace(".", "\\.")}\\}`),
    );
  }
});

test("preserves the frozen desktop About section order and renderer", () => {
  const desktop = read("components/company/AboutPage.tsx");
  const route = read("app/about/page.tsx");
  const markers = [
    'id="about-hero"',
    'aria-label="Why Cobrykz exists"',
    'id="about-purpose-heading"',
    'aria-label="Company principles"',
    'id="about-partnership-heading"',
    "<FounderAccountability",
    'aria-label="Company standards"',
    'id="about-cta"',
  ];

  let previousIndex = -1;
  for (const marker of markers) {
    const currentIndex = desktop.indexOf(marker);
    assert.ok(
      currentIndex > previousIndex,
      `desktop marker ${marker} must remain in order`,
    );
    previousIndex = currentIndex;
  }

  assert.match(route, /desktop=\{<AboutPage content=\{aboutPage\} \/>\}/);
});

test("gives About a restrained mobile-only architectural composition", () => {
  const css = read("app/globals.css");
  const mobileMedia = css.slice(css.indexOf("@media (max-width: 767px)"));

  for (const selector of [
    ".mobile-about-opening",
    ".mobile-about-founding-statement",
    ".mobile-about-disclosures",
    ".mobile-about-atlas-stage",
    ".mobile-about-leadership",
    ".mobile-about-final",
  ]) {
    assert.match(mobileMedia, new RegExp(selector.replace(".", "\\.")));
  }

  assert.match(
    mobileMedia,
    /\[data-mobile-about-page\][\s\S]*?\.mobile-disclosure-trigger/,
  );
  assert.match(
    mobileMedia,
    /\.mobile-about-atlas-stage[\s\S]*?\.mobile-atlas/,
  );
});
