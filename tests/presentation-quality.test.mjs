import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

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

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");

  assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
  assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
  assert.doesNotMatch(globals, /-moz-osx-font-smoothing:\s*grayscale/);
});

test("uses one accessible Lucide interface icon family", () => {
  const trackedTsx = collectTrackedTsx();
  const iconLibraryPattern =
    /(?:^|[/@-])(?:lucide|heroicons|react-icons|fontawesome|material-icons|phosphor|tabler|radix-icons)(?:$|[/@-])/i;

  for (const path of trackedTsx) {
    const source = read(path);
    const lucideIconNames = new Set();
    const iconImports = [...source.matchAll(
      /^\s*import[\s\S]*?from\s*["']([^"']+)["'];?\s*$/gm,
    )];

    for (const [, moduleName] of iconImports) {
      if (iconLibraryPattern.test(moduleName)) {
        assert.equal(
          moduleName,
          "lucide-react",
          `${path} imports interface icons from ${moduleName}`,
        );
      }
    }

    for (const [, importedNames] of source.matchAll(
      /import\s*\{([\s\S]*?)\}\s*from\s*["']lucide-react["'];/g,
    )) {
      for (const importedName of importedNames.split(",")) {
        const [, importedNameValue, localName] = importedName
          .trim()
          .match(/^(?:type\s+)?(\w+)(?:\s+as\s+(\w+))?$/) || [];
        if (importedNameValue) {
          lucideIconNames.add(localName || importedNameValue);
        }
      }
    }

    const inlineSvgCount = (source.match(/<svg\b/g) || []).length;
    if (path === "components/CobrykzLogo.tsx") {
      assert.equal(inlineSvgCount, 1, "the COBRYKZ brand mark must retain its SVG");
    } else {
      assert.equal(inlineSvgCount, 0, `${path} contains a non-brand inline SVG`);
    }

    if (lucideIconNames.size === 0) continue;

    for (const match of source.matchAll(/<([A-Z][A-Za-z0-9_]*)\b([^>]*)\/?\s*>/g)) {
      const [, componentName, attributes] = match;
      const isDecorativeLucideIcon =
        lucideIconNames.has(componentName) ||
        (componentName === "Icon" && /(?:const|let)\s+Icon\s*=/.test(source)) ||
        (componentName === "ActiveIcon" && /(?:const|let)\s+ActiveIcon\s*=/.test(source));

      if (isDecorativeLucideIcon) {
        assert.match(
          attributes,
          /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
          `${path} must hide adjacent-text decorative ${componentName} icons from assistive technology`,
        );
      }
    }
  }
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
