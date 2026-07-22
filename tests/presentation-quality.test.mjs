import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
// `next/image` is the only non-icon, bare-package PascalCase JSX component in tracked TSX.
const allowedExternalJsxModules = new Set(["next/image"]);
const isBareExternalModule = (moduleName) =>
  !moduleName.startsWith(".") && !moduleName.startsWith("@/");

function collectTsx(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectTsx(path) : path.endsWith(".tsx") ? [path] : [];
    },
  );
}

function collectTrackedTsx() {
  return execFileSync("git", ["ls-files", "--", "*.tsx"], {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);
}

function assertIconSystem(source, path) {
  const namedImportSources = new Map();
  const namespaceImportSources = new Map();

  for (const [, importClause, moduleName] of source.matchAll(
    /^\s*import\s+([\s\S]*?)\s+from\s*["']([^"']+)["'];?\s*$/gm,
  )) {
    const defaultImport = importClause.match(/^([A-Z][A-Za-z0-9_]*)\b/);
    if (defaultImport) {
      namedImportSources.set(defaultImport[1], moduleName);
    }

    const namespaceImport = importClause.match(/\*\s+as\s+([A-Z][A-Za-z0-9_]*)/);
    if (namespaceImport) {
      namespaceImportSources.set(namespaceImport[1], moduleName);
    }

    const namedImport = importClause.match(/\{([\s\S]*?)\}/);
    if (!namedImport) continue;

    for (const specifier of namedImport[1].split(",")) {
      const [, importedName, localName] = specifier
        .trim()
        .match(/^(?:type\s+)?(\w+)(?:\s+as\s+(\w+))?$/) || [];
      if (importedName) {
        namedImportSources.set(localName || importedName, moduleName);
      }
    }
  }

  const inlineSvgCount = (source.match(/<svg\b/g) || []).length;
  if (path === "components/CobrykzLogo.tsx") {
    assert.equal(inlineSvgCount, 1, "the COBRYKZ brand mark must retain its SVG");
  } else {
    assert.equal(inlineSvgCount, 0, `${path} contains a non-brand inline SVG`);
  }

  const iconPropertySources = new Set(
    [...source.matchAll(/\bicon\s*:\s*([A-Z][A-Za-z0-9_]*)\b/g)]
      .map(([, identifier]) => namedImportSources.get(identifier))
      .filter(Boolean),
  );
  const dynamicIconAliases = new Map(
    [...source.matchAll(/\bconst\s+(\w+)\s*=\s*\w+\.icon\b/g)].map(
      ([, alias]) => [alias, iconPropertySources],
    ),
  );

  for (const [, componentName, attributes] of source.matchAll(
    /<([A-Z][A-Za-z0-9_]*(?:\.[A-Z][A-Za-z0-9_]*)?)\b([^>]*)\/?\s*>/g,
  )) {
    const [rootName] = componentName.split(".");
    const directImportSource = componentName.includes(".")
      ? namespaceImportSources.get(rootName)
      : namedImportSources.get(componentName);
    const aliasSources = dynamicIconAliases.get(componentName);

    if (directImportSource && isBareExternalModule(directImportSource)) {
      assert.ok(
        directImportSource === "lucide-react" ||
          allowedExternalJsxModules.has(directImportSource),
        `${path} imports PascalCase JSX component ${componentName} from ${directImportSource}; it must come from lucide-react or an approved framework module`,
      );
    }

    for (const aliasSource of aliasSources || []) {
      assert.equal(
        aliasSource,
        "lucide-react",
        `${path} renders interface icon ${componentName} from ${aliasSource}; it must come from lucide-react`,
      );
    }

    if (
      directImportSource === "lucide-react" ||
      [...(aliasSources || [])].includes("lucide-react")
    ) {
      assert.match(
        attributes,
        /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
        `${path} must hide adjacent-text decorative ${componentName} icons from assistive technology`,
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

test("uses one accessible Lucide interface icon family", () => {
  for (const path of collectTrackedTsx()) {
    assertIconSystem(read(path), path);
  }
});

test("keeps service and industry icons semantically paired", () => {
  const serviceSources = [
    read("components/sections/Services.tsx"),
    read("components/mobile/MobileServices.tsx"),
  ];
  const industrySources = [
    read("components/sections/Industries.tsx"),
    read("components/mobile/MobileIndustries.tsx"),
  ];
  const iconMappings = (source) =>
    [...source.matchAll(/\bicon:\s*([A-Z][A-Za-z0-9_]*)/g)].map(
      ([, icon]) => icon,
    );

  for (const source of serviceSources) {
    assert.deepEqual(iconMappings(source), [
      "MonitorSmartphone",
      "Workflow",
      "Wrench",
    ]);
    assert.doesNotMatch(source, /\bBlocks\b/);
  }

  for (const source of industrySources) {
    assert.deepEqual(iconMappings(source), [
      "Cross",
      "HardHat",
      "BriefcaseBusiness",
      "Utensils",
      "Scissors",
      "Building2",
    ]);
  }
});

test("keeps supporting interface icons restrained and consistent", () => {
  const retainedGlyphs = {
    "components/Navbar.tsx": ["ArrowUpRight", "Menu", "X"],
    "components/sections/Hero.tsx": ["ArrowDownRight", "ArrowUpRight"],
    "components/mobile/MobileHero.tsx": ["ArrowUpRight"],
    "components/sections/Services.tsx": ["ArrowUpRight", "Check", "MonitorSmartphone", "Workflow", "Wrench"],
    "components/mobile/MobileServices.tsx": ["ArrowUpRight", "Check", "MonitorSmartphone", "Workflow", "Wrench"],
    "components/sections/Industries.tsx": ["ArrowUpRight", "BriefcaseBusiness", "Building2", "Cross", "HardHat", "Scissors", "Utensils"],
    "components/mobile/MobileIndustries.tsx": ["BriefcaseBusiness", "Building2", "Cross", "HardHat", "Scissors", "Utensils"],
    "components/sections/SocialProof.tsx": ["CodeXml", "MessagesSquare", "ShieldCheck", "Waypoints"],
    "components/mobile/MobileTrust.tsx": ["CodeXml", "MessageCircle", "Route", "ShieldCheck"],
    "components/sections/OurStandard.tsx": ["Accessibility", "Check", "Gauge", "LayoutTemplate", "Smartphone"],
    "components/mobile/MobileStandard.tsx": ["Accessibility", "Check", "Gauge", "LayoutTemplate", "Smartphone"],
    "components/sections/WhyCOBRYKZ.tsx": ["Eye", "Handshake", "MessageCircleMore"],
    "components/mobile/MobileWhy.tsx": ["Eye", "Handshake", "MessageCircleMore"],
    "components/sections/GoodFit.tsx": ["Check", "Minus"],
    "components/mobile/MobileFit.tsx": ["Check", "Minus"],
    "components/sections/Process.tsx": ["ArrowUpRight"],
    "components/mobile/MobileProcess.tsx": ["Minus", "Plus"],
    "components/sections/FAQ.tsx": ["Minus", "Plus"],
    "components/mobile/MobileFAQ.tsx": ["Minus", "Plus"],
    "components/sections/Founder.tsx": ["ArrowUpRight", "Check"],
    "components/mobile/MobileFounder.tsx": ["ArrowUpRight", "Check"],
    "components/sections/FinalCTA.tsx": ["ArrowUpRight", "Check", "Mail", "MessageSquareText"],
    "components/mobile/MobileContact.tsx": ["ArrowUpRight", "Check", "Mail"],
    "components/CopyProjectNoteButton.tsx": ["Check", "Copy"],
    "components/mobile/MobileActionBar.tsx": ["ArrowUpRight", "LayoutGrid", "Route"],
    "components/Footer.tsx": ["ArrowUpRight", "Mail"],
  };
  const iconImports = (source) =>
    [...source.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']lucide-react["']/g)]
      .flatMap(([, names]) => names.split(","))
      .map((name) => name.trim().split(/\s+as\s+/)[0])
      .filter(Boolean)
      .sort();
  const noIconMotion = /(?:^|\s)(?:[\w-]+:)?(?:-?rotate|scale|animate-(?:bounce|pulse|spin))[^\s"`}]*/;

  for (const [path, glyphs] of Object.entries(retainedGlyphs)) {
    const source = read(path);
    assert.deepEqual(iconImports(source), glyphs, `${path} must retain its audited Lucide glyphs`);
    for (const glyph of glyphs) {
      assert.match(
        source,
        new RegExp(`(?:<${glyph}\\b|\\bicon:\\s*${glyph}\\b)`),
        `${path} must continue rendering ${glyph}`,
      );
    }

    const renderedIconNames = new Set([...glyphs, "Icon", "ActiveIcon"]);
    for (const iconName of renderedIconNames) {
      for (const [, attributes] of source.matchAll(
        new RegExp(`<${iconName}\\b([^>]*)`, "g"),
      )) {
        assert.doesNotMatch(
          attributes,
          noIconMotion,
          `${path} must not add rotate, bounce, or scale motion to ${iconName}`,
        );
        assert.match(
          attributes,
          /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
          `${path} must hide its adjacent-text ${iconName} icon`,
        );
      }
    }

    for (const [, attributes] of source.matchAll(
      /<(?:div|span)\b([^>]*)>\s*<(?:Icon|ActiveIcon)\b/g,
    )) {
      assert.doesNotMatch(
        attributes,
        noIconMotion,
        `${path} must not add rotate, bounce, or scale motion to an icon container`,
      );
    }
  }

  const desktopFaq = read("components/sections/FAQ.tsx");
  const mobileFaq = read("components/mobile/MobileFAQ.tsx");
  for (const [source, size, control] of [
    [desktopFaq, 17, "h-9 w-9"],
    [mobileFaq, 15, "h-8 w-8"],
  ]) {
    assert.match(source, new RegExp(`className="[^"]*${control}[^"]*rounded-lg border border-border`));
    assert.match(source, new RegExp(`<Minus size=\\{${size}\\} strokeWidth=\\{2\\} aria-hidden="true"`));
    assert.match(source, new RegExp(`<Plus size=\\{${size}\\} strokeWidth=\\{2\\} aria-hidden="true"`));
  }

  const retainedContainers = {
    "components/sections/Services.tsx": "flex h-10 w-10 items-center justify-center rounded-lg border",
    "components/mobile/MobileServices.tsx": "flex h-11 w-11 items-center justify-center rounded-lg",
    "components/sections/SocialProof.tsx": "flex h-10 w-10 flex-none items-center justify-center rounded-lg border",
    "components/sections/OurStandard.tsx": "hidden h-12 w-12 items-center justify-center rounded-lg bg-navy",
    "components/mobile/MobileStandard.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-navy",
    "components/sections/WhyCOBRYKZ.tsx": "flex h-11 w-11 items-center justify-center rounded-lg border",
    "components/mobile/MobileWhy.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-white",
    "components/sections/GoodFit.tsx": "flex h-6 w-6 flex-none items-center justify-center rounded-full",
    "components/mobile/MobileFit.tsx": "flex h-6 w-6 flex-none items-center justify-center rounded-full",
    "components/sections/FinalCTA.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.08]",
    "components/mobile/MobileProcess.tsx": "flex h-8 w-8 items-center justify-center rounded-lg border",
  };
  for (const [path, container] of Object.entries(retainedContainers)) {
    assert.ok(read(path).includes(container), `${path} must retain its audited icon container`);
  }

  const mobileActionBar = read("components/mobile/MobileActionBar.tsx");
  assert.match(mobileActionBar, /href="#m-services"\s+aria-label="Services"/s);
  assert.match(mobileActionBar, /href="#m-process"\s+aria-label="Process"/s);
  assert.match(mobileActionBar, /<LayoutGrid size=\{18\} strokeWidth=\{1\.9\} aria-hidden="true"/);
  assert.match(mobileActionBar, /<Route size=\{18\} strokeWidth=\{1\.9\} aria-hidden="true"/);
});

test("rejects interface icon bypasses in source strings", () => {
  const thirdPartyIcon = `
    import { Menu } from "@fixture/interface-icons";
    export const Fixture = () => <Menu size={16} strokeWidth={2} aria-hidden="true" />;
  `;
  const classOnlyThirdPartyIcon = `
    import { Menu } from "arbitrary-third-party-package";
    export const Fixture = () => <Menu className="h-4 w-4" aria-hidden="true" />;
  `;
  const lucideNamespaceWithoutAriaHidden = `
    import * as Lucide from "lucide-react";
    export const Fixture = () => <Lucide.Menu size={16} strokeWidth={2} />;
  `;
  const normalDependency = `
    import Image from "next/image";
    export const Fixture = () => <Image alt="" fill src="/brand.jpg" />;
  `;

  assert.throws(
    () => assertIconSystem(thirdPartyIcon, "fixture-third-party.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () => assertIconSystem(classOnlyThirdPartyIcon, "fixture-class-only.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () => assertIconSystem(lucideNamespaceWithoutAriaHidden, "fixture-namespace.tsx"),
    /must hide adjacent-text decorative Lucide\.Menu icons/,
  );
  assert.doesNotThrow(() => assertIconSystem(normalDependency, "fixture-image.tsx"));
});

test("keeps navigation text on crisp surfaces", () => {
  const navSurfaces = [
    read("components/Navbar.tsx"),
    read("components/mobile/MobileActionBar.tsx"),
  ].join("\n");

  assert.doesNotMatch(navSurfaces, /backdrop-blur/);
});

test("keeps explanatory paragraphs at 13px or larger", () => {
  const readableMarkup = collectTsx("components")
    .map((path) => read(path))
    .join("\n");
  const undersizedParagraph =
    /<p\b[^>]*className="(?![^"]*uppercase)[^"]*text-\[(?:10|11|12)px\][^"]*"[^>]*>/gs;

  assert.doesNotMatch(readableMarkup, undersizedParagraph);
});

test("renders first-party proof instead of repeated reassurance sections", () => {
  const desktopArtifactPath = join(root, "components/sections/BuildArtifact.tsx");
  assert.equal(existsSync(desktopArtifactPath), true, "desktop artifact is missing");

  const pageSource = read("app/page.tsx");
  const mobileExperience = read("components/mobile/MobileExperience.tsx");
  const pageAndExperiences = `${pageSource}\n${mobileExperience}`;

  assert.match(pageAndExperiences, /BuildArtifact/);
  assert.doesNotMatch(mobileExperience, /MobileBuildArtifact/);
  assert.doesNotMatch(pageSource, /<SocialProof \/>/);
  assert.doesNotMatch(
    pageAndExperiences,
    /<OurStandard \/>|<MobileStandard \/>|<WhyCOBRYKZ \/>|<MobileWhy \/>/,
  );

  const proofSources = `${read("components/sections/BuildArtifact.tsx")}\n${read("components/content/buildArtifact.ts")}`;
  assert.match(proofSources, /Lead with reputation/);
  assert.match(proofSources, /Compose mobile separately/);
  assert.match(proofSources, /Create one conversion path/);
});

test("avoids repeated generated-landing-page decoration", () => {
  const globals = read("app/globals.css");
  const renderedSources = [
    read("app/page.tsx"),
    read("components/mobile/MobileExperience.tsx"),
    ...collectTsx("components/sections").map((path) => read(path)),
    ...collectTsx("components/mobile").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(globals, /\.page-grid/);
  assert.doesNotMatch(renderedSources, /\bpage-grid\b/);
  assert.doesNotMatch(renderedSources, /Cormorant_Garamond/);
  assert.match(globals, /:focus-visible\s*{[^}]*border-radius:\s*8px/s);
});

test("provides an honest project-note fallback", () => {
  const contactSources = [
    read("components/sections/FinalCTA.tsx"),
    read("components/mobile/MobileContact.tsx"),
  ].join("\n");

  assert.match(contactSources, /CopyProjectNoteButton/g);
  assert.match(contactSources, /info@cobrykz\.com/);
  assert.doesNotMatch(contactSources, /hello@cobrykz\.com/);
  assert.match(contactSources, /mailto:/);
  assert.doesNotMatch(contactSources, /message (?:was|has been) sent/i);
  assert.doesNotMatch(
    contactSources,
    /placeholder:text-white\/(?:[0-5]?\d)(?!\d)/,
  );
});

test("uses the brand film as accessible, non-blocking hero media", () => {
  const heroSources = [
    read("components/sections/Hero.tsx"),
    read("components/mobile/MobileHero.tsx"),
  ].join("\n");

  assert.equal((heroSources.match(/<video/g) || []).length, 2);
  assert.equal((heroSources.match(/autoPlay/g) || []).length, 2);
  assert.equal((heroSources.match(/muted/g) || []).length, 2);
  assert.equal((heroSources.match(/playsInline/g) || []).length, 2);
  assert.equal((heroSources.match(/poster="\/hero-video-poster\.jpg"/g) || []).length, 2);
  assert.equal((heroSources.match(/src="\/hero-video\.mp4"/g) || []).length, 2);
});

test("composes the mobile hero as a full-bleed video overlay", () => {
  const mobileHero = read("components/mobile/MobileHero.tsx");

  assert.match(mobileHero, /pt-16/);
  assert.match(mobileHero, /data-mobile-hero-backdrop/);
  assert.match(mobileHero, /data-mobile-video-stage/);
  assert.match(mobileHero, /data-mobile-text-overlay/);
  assert.match(mobileHero, /data-mobile-hero-copy/);
  assert.match(mobileHero, /data-mobile-hero-cta/);
  assert.match(mobileHero, /absolute inset-0/);
  assert.match(mobileHero, /object-contain object-\[center_top\]/);
  assert.match(mobileHero, /aspect-video/);
  assert.match(mobileHero, /bg-white/);
  assert.match(mobileHero, /rgba\(11,23,40,.78\)/);
  assert.doesNotMatch(mobileHero, /scale-\[|object-cover|data-mobile-hero-ambient/);
  assert.doesNotMatch(mobileHero, /blur-|brightness-|contrast-|saturate-/);
  assert.doesNotMatch(mobileHero, /bg-gradient-to-r from-navy\/70/);
  assert.equal((mobileHero.match(/href="#m-contact"/g) || []).length, 1);
  assert.doesNotMatch(mobileHero, /grid-cols-\[46%_54%\]|data-mobile-portrait-stage/);

  const copyEnd = mobileHero.indexOf("data-mobile-hero-cta");
  const ctaLink = mobileHero.indexOf('href="#m-contact"');
  assert.ok(copyEnd > -1 && ctaLink > copyEnd, "CTA must render outside the copy overlay");
});

test("uses selective editorial depth on desktop", () => {
  const desktopSections = {
    services: read("components/sections/Services.tsx"),
    industries: read("components/sections/Industries.tsx"),
    process: read("components/sections/Process.tsx"),
    founder: read("components/sections/Founder.tsx"),
    fit: read("components/sections/GoodFit.tsx"),
    faq: read("components/sections/FAQ.tsx"),
    contact: read("components/sections/FinalCTA.tsx"),
  };
  const desktopSource = Object.values(desktopSections).join("\n");
  const surfaceValues = [
    ...desktopSource.matchAll(/data-editorial-surface="([^"]+)"/g),
  ].map((match) => match[1]);

  assert.equal(surfaceValues.length, 4);
  assert.deepEqual(surfaceValues.sort(), ["faq", "fit", "process", "services"]);

  for (const anchor of ["industries", "founder", "contact"]) {
    assert.doesNotMatch(desktopSections[anchor], /data-editorial-surface/);
    assert.match(desktopSections[anchor], /\bbg-navy\b/);
  }

  assert.match(desktopSections.founder, /data-founder-glow/);
});

test("composes selective editorial depth independently on mobile", () => {
  const mobileSections = {
    services: read("components/mobile/MobileServices.tsx"),
    industries: read("components/mobile/MobileIndustries.tsx"),
    process: read("components/mobile/MobileProcess.tsx"),
    founder: read("components/mobile/MobileFounder.tsx"),
    fit: read("components/mobile/MobileFit.tsx"),
    faq: read("components/mobile/MobileFAQ.tsx"),
    contact: read("components/mobile/MobileContact.tsx"),
  };
  const mobileSource = Object.values(mobileSections).join("\n");
  const surfaceValues = [
    ...mobileSource.matchAll(/data-editorial-surface="([^"]+)"/g),
  ].map((match) => match[1]);

  assert.equal(surfaceValues.length, 4);
  assert.deepEqual(surfaceValues.sort(), ["faq", "fit", "process", "services"]);

  for (const anchor of ["industries", "founder", "contact"]) {
    assert.doesNotMatch(mobileSections[anchor], /data-editorial-surface/);
    assert.match(mobileSections[anchor], /\bbg-navy\b/);
  }

  assert.match(mobileSections.founder, /data-founder-glow/);
});
