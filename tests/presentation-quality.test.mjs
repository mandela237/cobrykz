import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function collectFiles(directory, extension) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name).replaceAll("\\", "/");
      return entry.isDirectory()
        ? collectFiles(path, extension)
        : path.endsWith(extension)
          ? [path]
          : [];
    },
  );
}

const liveTsxPaths = () => [
  ...collectFiles("app", ".tsx"),
  ...collectFiles("components", ".tsx"),
];

const liveTsxSource = () =>
  liveTsxPaths()
    .map((path) => read(path))
    .join("\n");

function assertLucideOnlyIcons(source, path) {
  const imports = new Map();

  for (const [, importClause, moduleName] of source.matchAll(
    /^\s*import\s+([\s\S]*?)\s+from\s*["']([^"']+)["'];?\s*$/gm,
  )) {
    const defaultImport = importClause.match(/^([A-Z][A-Za-z0-9_]*)\b/);
    if (defaultImport) imports.set(defaultImport[1], moduleName);

    const namespaceImport = importClause.match(
      /\*\s+as\s+([A-Z][A-Za-z0-9_]*)/,
    );
    if (namespaceImport) imports.set(namespaceImport[1], moduleName);

    const namedImport = importClause.match(/\{([\s\S]*?)\}/);
    if (!namedImport) continue;

    for (const specifier of namedImport[1].split(",")) {
      const [, importedName, localName] =
        specifier
          .trim()
          .match(/^(?:type\s+)?(\w+)(?:\s+as\s+(\w+))?$/) || [];
      if (importedName) imports.set(localName || importedName, moduleName);
    }
  }

  const inlineSvgCount = (source.match(/<svg\b/g) || []).length;
  if (path === "components/CobrykzLogo.tsx") {
    assert.equal(inlineSvgCount, 1, "the Cobrykz brand mark must retain its SVG");
  } else {
    assert.equal(inlineSvgCount, 0, `${path} contains a non-brand inline SVG`);
  }

  for (const [, componentName, attributes] of source.matchAll(
    /<([A-Z][A-Za-z0-9_]*(?:\.[A-Z][A-Za-z0-9_]*)?)\b([^>]*)\/?\s*>/g,
  )) {
    const [rootName] = componentName.split(".");
    const importSource = imports.get(rootName);
    if (!importSource) continue;

    const isExternal =
      !importSource.startsWith(".") && !importSource.startsWith("@/");
    const isApprovedFrameworkComponent = [
      "next/image",
      "next/link",
    ].includes(importSource);

    if (isExternal && !isApprovedFrameworkComponent) {
      assert.equal(
        importSource,
        "lucide-react",
        `${path} imports interface component ${componentName} from ${importSource}; interface icons must come from lucide-react`,
      );
    }

    if (importSource === "lucide-react") {
      assert.match(
        attributes,
        /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
        `${path} must hide adjacent-text decorative ${componentName} icons`,
      );
      assert.doesNotMatch(
        attributes,
        /\b(?:[\w-]+:)*(?:-?rotate|scale|animate-(?:bounce|pulse|spin))-/,
        `${path} must not add continuous or attention-seeking icon motion`,
      );
    }
  }
}

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");

  assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
  assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
  assert.doesNotMatch(globals, /-moz-osx-font-smoothing:\s*grayscale/);
});

test("keeps the premium token layer small and intentional", () => {
  const globals = read("app/globals.css");
  const rootBlock = globals.match(/:root\s*{(?<body>[^}]*)}/s);
  const acceptedTokens = [
    "--control-transition",
    "--focus-ring-light",
    "--focus-ring-dark",
    "--section-gutter",
  ];

  assert.ok(rootBlock, "globals.css must retain a :root token scope");

  const componentTokens = [
    ...rootBlock.groups.body.matchAll(
      /(--(?:control|focus|section|radius|shadow|border)-[\w-]+)\s*:/g,
    ),
  ]
    .map(([, token]) => token)
    .sort();

  assert.deepEqual(
    componentTokens,
    acceptedTokens.toSorted(),
    "the responsive presentation must keep one audited token layer",
  );

  for (const token of acceptedTokens) {
    assert.match(
      globals,
      new RegExp(`var\\(${token}\\)`),
      `${token} must be consumed by shared CSS`,
    );
  }
});

test("uses one responsive section shell from 320px upward", () => {
  const globals = read("app/globals.css");
  const page = read("app/page.tsx");
  const homeSources = collectFiles("components/home", ".tsx")
    .map((path) => read(path))
    .join("\n");

  assert.match(
    globals,
    /:root\s*{[^}]*--section-gutter:\s*1\.25rem;/s,
    "the 320px presentation must retain a fixed 20px page gutter",
  );
  assert.match(
    globals,
    /\.section-shell\s*{\s*width:\s*min\(calc\(100% - \(var\(--section-gutter\) \* 2\)\),\s*1200px\);\s*margin-inline:\s*auto;\s*}/s,
  );
  assert.match(
    globals,
    /@media \(min-width:\s*768px\)\s*{[\s\S]*?:root\s*{[^}]*--section-gutter:\s*2\.5rem;[^}]*}[\s\S]*?}/,
    "larger viewports must widen the same shared shell rather than switch trees",
  );

  assert.doesNotMatch(page, /MobileExperience|components\/mobile/);
  assert.doesNotMatch(page, /\bhidden\s+md:block\b|\bmd:hidden\b/);
  assert.doesNotMatch(homeSources, /\bm-shell\b|\bm-section\b/);
  assert.equal(
    (page.match(/<ChallengeRouter\s*\/>/g) || []).length,
    1,
    "the challenge router must appear in the single homepage tree",
  );
});

test("keeps mobile typography fixed and readable", () => {
  const globals = read("app/globals.css");
  const homeHero = read("components/home/HomeHero.tsx");
  const sectionIntro = read("components/ui/SectionIntro.tsx");
  const homepageSources = [
    homeHero,
    sectionIntro,
    ...collectFiles("components/home", ".tsx").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(
    `${globals}\n${homepageSources}`,
    /font-size:\s*(?:clamp|min|max)\(|text-\[(?:clamp|min|max)\(/,
    "mobile type must use fixed sizes at explicit breakpoints",
  );
  assert.match(
    homeHero,
    /\btext-\[2\.625rem\][^"]*\bsm:text-\[3\.5rem\][^"]*\blg:text-\[4\.25rem\]/,
  );
  assert.match(
    sectionIntro,
    /\btext-\[2rem\][^"]*\bsm:text-\[2\.5rem\][^"]*\blg:text-5xl/,
  );

  const undersizedParagraph =
    /<p\b[^>]*className="(?![^"]*uppercase)[^"]*(?:text-xs|text-\[(?:10|11|12)px\])[^"]*"[^>]*>/gs;
  assert.doesNotMatch(liveTsxSource(), undersizedParagraph);
});

test("uses responsive grids only for meaningful comparison", () => {
  const comparisonContracts = {
    "components/home/BusinessOutcomes.tsx": /\bmd:grid-cols-3\b/,
    "components/home/WhyCobrykz.tsx":
      /\bsm:grid-cols-2\b[\s\S]*\blg:grid-cols-5\b/,
    "components/home/ChallengeRouter.tsx": /\bsm:grid-cols-2\b/,
    "components/home/ProcessOverview.tsx":
      /\bsm:grid-cols-2\b[\s\S]*\blg:grid-cols-3\b/,
  };

  for (const [path, contract] of Object.entries(comparisonContracts)) {
    assert.match(read(path), contract, `${path} changed its comparison grid`);
  }

  const editorialSources = [
    read("components/home/HomeHero.tsx"),
    read("components/home/ProjectsEvidence.tsx"),
    read("components/home/AuthorityBand.tsx"),
  ].join("\n");
  assert.ok(
    (editorialSources.match(/\bblur-3xl\b/g) || []).length <= 1,
    "editorial depth must remain selective",
  );
  assert.doesNotMatch(editorialSources, /\bshadow-(?:xl|2xl)\b/);
});

test("keeps actions, focus, and reduced motion restrained", () => {
  const globals = read("app/globals.css");
  const sources = liveTsxSource();

  assert.match(
    globals,
    /\.action-transition\s*{\s*transition:\s*color var\(--control-transition\),\s*background-color var\(--control-transition\),\s*border-color var\(--control-transition\);\s*}/s,
  );
  assert.match(
    globals,
    /\.action-transition:disabled\s*{[^}]*cursor:\s*not-allowed/s,
  );
  assert.doesNotMatch(`${globals}\n${sources}`, /\btransition-all\b/);
  assert.doesNotMatch(
    sources,
    /\b(?:hover|active|group-hover):(?:scale|translate-y|shadow|drop-shadow|brightness)-/,
  );
  assert.doesNotMatch(`${globals}\n${sources}`, /\bshimmer\b/);
  assert.doesNotMatch(`${globals}\n${sources}`, /\bscroll-hidden\b/);
  assert.doesNotMatch(
    sources,
    /\b(?:hover|group-hover):opacity-\d+[^"]*\bopacity-0\b|\bopacity-0[^"]*\b(?:hover|group-hover):opacity-\d+/,
    "critical content must not be a hover-only disclosure",
  );

  assert.doesNotMatch(
    globals,
    /:focus-visible\s*{[^}]*border-radius\s*:/s,
    "focus treatment must preserve each control's geometry",
  );
  assert.match(
    globals,
    /:focus-visible\s*{\s*outline:\s*2px solid var\(--focus-ring-light\);\s*outline-offset:\s*3px;\s*}/s,
  );
  assert.match(
    globals,
    /\.bg-navy :focus-visible,\s*\.bg-footer-bg :focus-visible\s*{[^}]*var\(--focus-ring-dark\)/s,
  );
  assert.match(
    globals,
    /@media \(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?animation-duration:\s*0\.01ms !important;[\s\S]*?transition-duration:\s*0\.01ms !important;/,
  );
});

test("uses one accessible Lucide interface icon family", () => {
  for (const path of liveTsxPaths()) {
    assertLucideOnlyIcons(read(path), path);
  }

  assert.doesNotMatch(
    liveTsxSource(),
    /&(?:larr|rarr|uarr|darr);|[←→↑↓]/,
    "directional interface icons must not bypass Lucide with text glyphs",
  );
});

test("rejects inaccessible or third-party icon fixtures", () => {
  const thirdPartyIcon = `
    import { Menu } from "arbitrary-interface-icons";
    export const Fixture = () => <Menu aria-hidden="true" />;
  `;
  const defaultThirdPartyIcon = `
    import Menu from "arbitrary-interface-icons";
    export const Fixture = () => <Menu aria-hidden="true" />;
  `;
  const lucideWithoutAriaHidden = `
    import { Menu } from "lucide-react";
    export const Fixture = () => <Menu size={16} strokeWidth={2} />;
  `;

  assert.throws(
    () => assertLucideOnlyIcons(thirdPartyIcon, "fixture-third-party.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(defaultThirdPartyIcon, "fixture-default-icon.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(lucideWithoutAriaHidden, "fixture-lucide.tsx"),
    /must hide adjacent-text decorative Menu icons/,
  );
});

test("keeps navigation text on crisp surfaces", () => {
  const navSurfaces = [
    read("components/layout/SiteHeader.tsx"),
    read("components/layout/SolutionsMenu.tsx"),
    read("components/layout/SiteFooter.tsx"),
  ].join("\n");

  assert.doesNotMatch(navSurfaces, /backdrop-blur/);
});

test("avoids repeated generated-landing-page decoration", () => {
  const globals = read("app/globals.css");
  const renderedSources = [
    read("app/page.tsx"),
    ...collectFiles("components/home", ".tsx").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(globals, /\.page-grid/);
  assert.doesNotMatch(renderedSources, /\bpage-grid\b/);
  assert.doesNotMatch(renderedSources, /Cormorant_Garamond/);
  assert.doesNotMatch(renderedSources, /\b(?:from|via|to)-(?:purple|violet|cyan|fuchsia)-/);
  assert.doesNotMatch(renderedSources, /\b(?:robot|brain|circuit)\b/i);
});

test("keeps retained hero media accessible and non-blocking", () => {
  const hero = read("components/home/HomeHero.tsx");
  const videoCount = (hero.match(/<video\b/g) || []).length;

  if (videoCount === 0) {
    assert.doesNotMatch(
      hero,
      /<Image\b[^>]*(?:alt=""|aria-hidden)/,
      "retained hero imagery must not be unlabeled unless it is purely decorative",
    );
    return;
  }

  assert.equal(videoCount, 1, "the shared hero must not duplicate brand media");
  for (const attribute of ["muted", "playsInline", "poster="]) {
    assert.match(hero, new RegExp(attribute));
  }
  assert.doesNotMatch(hero, /\bpreload="auto"/);
  assert.match(hero, /\baria-hidden=(?:"true"|\{true\})/);
});

test("retires the duplicated website-agency homepage files", () => {
  const retiredPaths = [
    "components/Navbar.tsx",
    "components/Footer.tsx",
    "components/CopyProjectNoteButton.tsx",
    "components/TrustField.tsx",
    "components/content/buildArtifact.ts",
    "components/mobile/MobileActionBar.tsx",
    "components/mobile/MobileContact.tsx",
    "components/mobile/MobileExperience.tsx",
    "components/mobile/MobileFAQ.tsx",
    "components/mobile/MobileFit.tsx",
    "components/mobile/MobileFooter.tsx",
    "components/mobile/MobileFounder.tsx",
    "components/mobile/MobileHero.tsx",
    "components/mobile/MobileIndustries.tsx",
    "components/mobile/MobileProcess.tsx",
    "components/mobile/MobileServices.tsx",
    "components/mobile/MobileStandard.tsx",
    "components/mobile/MobileTrust.tsx",
    "components/mobile/MobileWhy.tsx",
    "components/sections/BuildArtifact.tsx",
    "components/sections/FAQ.tsx",
    "components/sections/FinalCTA.tsx",
    "components/sections/Founder.tsx",
    "components/sections/GoodFit.tsx",
    "components/sections/Hero.tsx",
    "components/sections/Industries.tsx",
    "components/sections/OurStandard.tsx",
    "components/sections/Process.tsx",
    "components/sections/Services.tsx",
    "components/sections/SocialProof.tsx",
    "components/sections/WhyCOBRYKZ.tsx",
  ];

  for (const path of retiredPaths) {
    assert.equal(
      existsSync(join(root, path)),
      false,
      `${path} must be retired after its replacement is live`,
    );
  }
});
