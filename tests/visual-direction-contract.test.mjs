import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function collect(directory, extension) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = `${directory}/${entry.name}`;
      return entry.isDirectory()
        ? collect(path, extension)
        : path.endsWith(extension)
          ? [path]
          : [];
    },
  );
}

test("keeps the approved visual direction semantic, selective, and restrained", () => {
  const visualPaths = [
    ...collect("components/atlas", ".tsx"),
    ...collect("components/home", ".tsx"),
    ...collect("components/solutions", ".tsx"),
    ...collect("components/company", ".tsx"),
    ...collect("components/projects", ".tsx"),
    ...collect("components/insights", ".tsx"),
    ...collect("components/contact", ".tsx"),
  ];
  const visualSource = visualPaths.map(read).join("\n");

  assert.doesNotMatch(
    visualSource,
    /<canvas\b|from ["']three["']|from ["']framer-motion["']|pointermove|mousemove|particle|parallax/i,
  );
  assert.doesNotMatch(
    visualSource,
    /(?:from|via|to)-(?:purple|violet|cyan|fuchsia)-/,
  );
  assert.doesNotMatch(
    visualSource,
    /(?:^|[\s"'`])(?:sm|md|lg|xl|2xl):hidden(?=$|[\s"'`])|(?:^|[\s"'`])hidden(?=$|[\s"'`])[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid)\b/,
  );
});

test("uses one primary Atlas moment per major page context", () => {
  const contexts = {
    home: collect("components/home", ".tsx").map(read).join("\n"),
    solutionsHub: read("components/solutions/CapabilityRelationshipAtlas.tsx"),
    process: `${read("components/company/ProcessPage.tsx")}\n${read("components/company/DeliveryRail.tsx")}`,
    about: `${read("components/company/AboutPage.tsx")}\n${read("components/company/ConnectedPartnerAtlas.tsx")}\n${read("components/company/FounderAccountability.tsx")}`,
    contact: `${read("app/contact/page.tsx")}\n${read("components/contact/InquiryPath.tsx")}`,
  };

  assert.equal((contexts.home.match(/<SystemAtlas\b/g) || []).length, 1);
  assert.equal((contexts.solutionsHub.match(/<SystemAtlas\b/g) || []).length, 1);
  assert.equal((contexts.process.match(/<SystemAtlas\b/g) || []).length, 0);
  assert.equal((contexts.about.match(/<SystemAtlas\b/g) || []).length, 1);
  assert.equal((contexts.contact.match(/<SystemAtlas\b/g) || []).length, 0);
});

test("keeps every Atlas accessible through one shared semantic renderer", () => {
  const atlas = read("components/atlas/SystemAtlas.tsx");
  const equivalent = read("components/atlas/AtlasTextEquivalent.tsx");
  const css = read("app/globals.css");

  assert.match(atlas, /role=["']img["']/);
  assert.match(atlas, /<title\b/);
  assert.match(atlas, /<desc\b/);
  assert.match(atlas, /<AtlasTextEquivalent\b/);
  assert.match(equivalent, /definition\.layers/);
  assert.match(equivalent, /definition\.nodes/);
  assert.match(equivalent, /definition\.connections/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.atlas-path[\s\S]*animation:\s*none\s*!important/,
  );
});

test("keeps empty evidence states honest and Contact a single-page form", () => {
  const projects = read("components/projects/ProjectsIndex.tsx");
  const insights = read("components/insights/InsightsIndex.tsx");
  const contact = read("components/contact/ContactForm.tsx");

  assert.doesNotMatch(projects, /client logo|testimonial|invented metric/i);
  assert.doesNotMatch(insights, /placeholder article card|fake article/i);
  assert.equal((contact.match(/<form\b/g) || []).length, 1);
  assert.doesNotMatch(contact, /currentStep|nextStep|previousStep|stepIndex/);
  assert.doesNotMatch(contact, /\bbudget\b/i);
});
