import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (relativePath) => {
  const path = join(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

test("defines a semantic System Atlas grammar", () => {
  const source = read("components/atlas/types.ts");

  assert.ok(source, "components/atlas/types.ts must exist");
  for (const name of [
    "AtlasNodeKind",
    "AtlasNode",
    "AtlasConnection",
    "AtlasLayer",
    "AtlasDefinition",
  ]) {
    assert.match(source, new RegExp(`export type ${name}`));
  }
  assert.match(
    source,
    /["']context["']\s*\|\s*["']system["']\s*\|\s*["']decision["']\s*\|\s*["']control["']\s*\|\s*["']outcome["']\s*\|\s*["']owner["']/s,
  );
  assert.match(source, /meaning:\s*string/);
  assert.match(source, /source:\s*string/);
  assert.match(source, /target:\s*string/);
  assert.match(source, /flowLabel:\s*string/);
  assert.match(source, /readingDirection:\s*string/);
});

test("renders one accessible server-side Atlas figure", () => {
  const source = read("components/atlas/SystemAtlas.tsx");

  assert.ok(source, "components/atlas/SystemAtlas.tsx must exist");
  assert.doesNotMatch(source, /["']use client["']/);
  assert.match(source, /<figure\b/);
  assert.match(source, /<svg\b/);
  assert.match(source, /role=["']img["']/);
  assert.match(source, /<title\b/);
  assert.match(source, /<desc\b/);
  assert.match(source, /<figcaption\b/);
  assert.match(source, /<AtlasLegend\b/);
  assert.match(source, /<AtlasTextEquivalent\b/);
  assert.match(source, /data-atlas-kind=/);
  assert.match(source, /data-atlas-depth=/);
  assert.match(source, /data-atlas-state=/);
});

test("derives visible and nonvisual explanations from the same definition", () => {
  const legend = read("components/atlas/AtlasLegend.tsx");
  const equivalent = read("components/atlas/AtlasTextEquivalent.tsx");

  assert.match(legend, /definition\.legend/);
  assert.match(equivalent, /definition\.layers/);
  assert.match(equivalent, /definition\.nodes/);
  assert.match(equivalent, /definition\.connections/);
  assert.match(equivalent, /flowLabel/);
  assert.match(equivalent, /\bsr-only\b/);
});

test("defines restrained Atlas material and reduced-motion tokens", () => {
  const css = read("app/globals.css");

  for (const token of [
    "--atlas-plane",
    "--atlas-plane-dark",
    "--atlas-frame",
    "--atlas-path",
    "--atlas-verified",
    "--atlas-depth-shadow",
    "--atlas-signal-shadow",
  ]) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /@keyframes atlas-flow/);
  assert.match(css, /\.atlas-path\[data-atlas-state=["']active["']\]/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.atlas-path[\s\S]*animation:\s*none\s*!important/,
  );
});

test("turns the homepage hero into a meaningful business-system cutaway", () => {
  const hero = read("components/home/HomeHero.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");

  assert.match(
    hero,
    /import BusinessSystemCutaway from ["']@\/components\/home\/BusinessSystemCutaway["']/,
  );
  assert.match(hero, /<BusinessSystemCutaway\s*\/>/);
  assert.match(cutaway, /<SystemAtlas\b/);
  assert.match(cutaway, /tone=["']dark["']/);

  for (const label of [
    "Business challenge",
    "People and information",
    "Existing tools",
    "Assessment",
    "Relevant capabilities",
    "Connected delivery",
    "Growth and efficiency",
    "Clarity",
    "Continued improvement",
  ]) {
    assert.match(cutaway, new RegExp(label));
  }

  for (const flow of ["understand", "choose", "deliver", "improve"]) {
    assert.match(cutaway, new RegExp(`flowLabel:\\s*["']${flow}["']`));
  }

  assert.doesNotMatch(
    cutaway,
    /orb|particle|random|dashboard|performance score|pointermove|mousemove/i,
  );
});

test("keeps the approved homepage message and actions stable inside the new hero", () => {
  const hero = read("components/home/HomeHero.tsx");

  assert.equal((hero.match(/<h1\b/g) || []).length, 1);
  assert.match(hero, /\{homeMessage\.headline\}/);
  assert.match(hero, /\{homeMessage\.description\}/);
  assert.match(
    hero,
    /<PrimaryLink\s+href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
  );
  assert.match(hero, /href=\{solutionsCta\.href\}/);
  assert.match(hero, /\{solutionsCta\.label\}/);
  assert.doesNotMatch(hero, /Explore our solutions/);
  assert.doesNotMatch(hero, /["']use client["']/);
});

test("extends the homepage with one restrained explanatory system thread", () => {
  const thread = read("components/home/HomeSystemThread.tsx");
  const challenge = read("components/home/ChallengeRouter.tsx");
  const process = read("components/home/ProcessOverview.tsx");
  const homeSources = [
    read("components/home/BusinessSystemCutaway.tsx"),
    thread,
    challenge,
    process,
  ].join("\n");

  assert.ok(thread, "components/home/HomeSystemThread.tsx must exist");
  assert.match(thread, /<ol\b/);
  assert.match(thread, /data-thread-stage=/);
  assert.match(thread, /data-thread-state=/);
  assert.doesNotMatch(thread, /<svg\b|<SystemAtlas\b|components\/atlas/);

  assert.match(challenge, /<HomeSystemThread\b/);
  assert.match(challenge, /selectedSlug/);
  assert.match(process, /<HomeSystemThread\b/);
  assert.match(process, /processStages\.map/);
  assert.equal(
    (homeSources.match(/<SystemAtlas\b/g) || []).length,
    1,
    "the homepage must reserve the full System Atlas for the hero",
  );
});

test("varies homepage composition without changing its approved content sources", () => {
  const outcomes = read("components/home/BusinessOutcomes.tsx");
  const solutions = read("components/home/SolutionsOverview.tsx");
  const why = read("components/home/WhyCobrykz.tsx");
  const ai = read("components/home/AIPointOfView.tsx");

  assert.match(outcomes, /md:grid-cols-12/);
  assert.match(solutions, /data-capability-rail/);
  assert.doesNotMatch(solutions, /group-hover:translate-x/);
  assert.match(why, /whyCobrykz\.map/);
  assert.match(why, /lg:grid-cols-12/);
  assert.doesNotMatch(why, /lg:grid-cols-5/);
  assert.match(ai, /data-decision-artifact/);
});

test("gives the existing Atlas semantics precise material hooks", () => {
  const atlas = read("components/atlas/SystemAtlas.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");
  const css = read("app/globals.css");

  assert.match(atlas, /data-atlas-layer=\{layer\.id\}/);
  assert.match(atlas, /data-atlas-node=\{node\.id\}/);
  assert.match(atlas, /data-atlas-connection=\{connection\.id\}/);
  assert.match(atlas, /id=\{`\$\{id\}-plane-material`\}/);
  assert.match(atlas, /id=\{`\$\{id\}-outcome-light`\}/);
  assert.match(cutaway, /id:\s*["']outcomes["']/);
  assert.match(
    css,
    /\.business-system-cutaway \[data-atlas-layer=["']outcomes["']\]/,
  );
});

test("refines the hero Atlas without adding information or runtime", () => {
  const atlas = read("components/atlas/SystemAtlas.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");

  assert.doesNotMatch(atlas, /["']use client["']/);
  assert.doesNotMatch(cutaway, /["']use client["']/);
  assert.equal((cutaway.match(/id:\s*["'][^"']+["']/g) || []).length, 22);
  assert.doesNotMatch(cutaway, /particle|canvas|webgl|three|video/i);
});
