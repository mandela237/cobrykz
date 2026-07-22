import assert from "node:assert/strict";
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

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");

  assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
  assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
  assert.doesNotMatch(globals, /-moz-osx-font-smoothing:\s*grayscale/);
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

test("composes the mobile hero as a persistent text-video split", () => {
  const mobileHero = read("components/mobile/MobileHero.tsx");

  assert.match(mobileHero, /grid-cols-\[46%_54%\]/);
  assert.match(mobileHero, /min-h-\[520px\]/);
  assert.match(mobileHero, /data-mobile-hero-copy/);
  assert.match(mobileHero, /data-mobile-portrait-stage/);
  assert.match(mobileHero, /object-cover/);
  assert.match(mobileHero, /object-\[52%_center\]/);
  assert.equal((mobileHero.match(/href="#m-contact"/g) || []).length, 1);
  assert.doesNotMatch(mobileHero, /Explore services|ArrowDown/);
});
