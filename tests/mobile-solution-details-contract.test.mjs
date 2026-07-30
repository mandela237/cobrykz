import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

test("preserves the frozen desktop solution composition verbatim", () => {
  const desktop = read("components/solutions/DesktopSolutionPage.tsx");
  const order = [
    "<SolutionHero",
    "<ProblemRecognition",
    "<OutcomeList",
    "<CapabilityList",
    "<SolutionOperatingModel",
    "<ApplicationExamples",
    "<SolutionArtifact",
    "<SolutionGuidance",
    "<SolutionApproach",
    "<RelatedSolutions",
    "<SolutionFaqs",
    "<SolutionFinalCta",
  ];

  assert.match(desktop, /solution: SolutionPageDefinition/);
  assert.doesNotMatch(desktop, /["']use client["']/);

  let previousIndex = -1;
  for (const component of order) {
    const componentIndex = desktop.indexOf(component);
    assert.ok(
      componentIndex > previousIndex,
      `${component} must remain in frozen desktop order`,
    );
    previousIndex = componentIndex;
  }

  assert.match(
    desktop,
    /\{solution\.artifact &&\s*<SolutionArtifact artifact=\{solution\.artifact\}\s*\/>\}/,
  );
  assert.match(
    desktop,
    /\{solution\.guidance &&\s*<SolutionGuidance guidance=\{solution\.guidance\}\s*\/>\}/,
  );
});

test("selects one shared mobile solution template after both JSON-LD scripts", () => {
  const page = read("components/solutions/SolutionPage.tsx");

  assert.match(
    page,
    /import DesktopSolutionPage from ["']@\/components\/solutions\/DesktopSolutionPage["']/,
  );
  assert.match(
    page,
    /import MobileSolutionPage from ["']@\/components\/solutions\/MobileSolutionPage["']/,
  );
  assert.match(
    page,
    /import ResponsivePageComposition from ["']@\/components\/mobile\/ResponsivePageComposition["']/,
  );
  assert.equal(
    (page.match(/type="application\/ld\+json"/g) || []).length,
    2,
    "Breadcrumb and Service JSON-LD must each render once",
  );
  assert.match(
    page,
    /type="application\/ld\+json"[\s\S]*type="application\/ld\+json"[\s\S]*<ResponsivePageComposition[\s\S]*mobile=\{<MobileSolutionPage solution=\{solution\} \/>\}[\s\S]*desktop=\{<DesktopSolutionPage solution=\{solution\} \/>\}/,
  );
  assert.doesNotMatch(page, /["']use client["']/);
});

test("builds every mobile solution from the frozen shared definition", () => {
  const mobile = read("components/solutions/MobileSolutionPage.tsx");

  for (const field of [
    "solution.name",
    "solution.outcome",
    "solution.heroSupport",
    "solution.problem",
    "solution.recognition",
    "solution.businessOutcomes",
    "solution.deliverables",
    "solution.applications",
    "solution.artifact",
    "solution.guidance",
    "solution.approach",
    "solution.relatedSlugs",
    "solution.faqs",
    "solution.cta.title",
  ]) {
    assert.match(
      mobile,
      new RegExp(field.replaceAll(".", "\\.")),
      `${field} must feed the shared mobile composition`,
    );
  }

  assert.match(mobile, /solution: SolutionPageDefinition/);
  assert.match(mobile, /data-mobile-solution-detail/);
  assert.match(mobile, /solutionVisualBySlug\[solution\.slug\]\.atlas/);
  assert.match(mobile, /<MobileAtlasExplorer/);
  assert.match(mobile, /initialSelectedNodeId=\{operatingAtlas\.nodes\[0\]\.id\}/);
  assert.match(mobile, /showDefinitionContext/);
  assert.match(mobile, /<MobileSolutionArtifact artifact=\{solution\.artifact\} \/>/);
  assert.match(mobile, /solutionBySlug\[slug\]/);
  assert.doesNotMatch(mobile, /["']use client["']|useState|useEffect/);
});

test("keeps mobile solution chapters and canonical heading IDs in order", () => {
  const mobile = read("components/solutions/MobileSolutionPage.tsx");
  const order = [
    'id="solution-hero"',
    'id="solution-recognition"',
    'id="solution-outcomes"',
    'id="solution-capabilities"',
    'id="solution-operating-model"',
    'id="solution-applications"',
    "solution.artifact &&",
    "solution.guidance &&",
    'id="solution-approach"',
    'id="solution-related"',
    'id="solution-faq"',
    'id="solution-final-cta"',
  ];

  let previousIndex = -1;
  for (const token of order) {
    const tokenIndex = mobile.indexOf(token);
    assert.ok(tokenIndex > previousIndex, `${token} must remain in page order`);
    previousIndex = tokenIndex;
  }

  for (const headingId of [
    "solution-hero-heading",
    "solution-recognition-heading",
    "solution-outcomes-heading",
    "solution-capabilities-heading",
    "solution-applications-heading",
    "solution-artifact-heading",
    "solution-guidance-heading",
    "solution-approach-heading",
    "solution-related-heading",
    "solution-faq-heading",
    "solution-final-cta-heading",
  ]) {
    assert.match(mobile, new RegExp(`id="${headingId}"`));
  }

  assert.equal(
    (mobile.match(/<h1\b/g) || []).length,
    1,
    "the mobile template must render one H1",
  );
  assert.doesNotMatch(mobile, /<main\b/);
});

test("recomposes both artifact variants without inventing copy", () => {
  const artifact = read("components/solutions/MobileSolutionArtifact.tsx");

  assert.match(artifact, /artifact: SolutionArtifact/);
  assert.match(artifact, /artifact\.kind === "workflow-comparison"/);
  assert.match(artifact, /\[artifact\.before,\s*artifact\.after\]\.map/);
  assert.match(artifact, /workflow\.label/);
  assert.match(artifact, /workflow\.steps\.map/);
  assert.match(artifact, /artifact\.safeguards\.map/);
  assert.match(artifact, /artifact\.centerLabel/);
  assert.match(artifact, /artifact\.elements\.map/);
  assert.match(artifact, /artifact\.distinctions\.map/);
  assert.ok(
    (artifact.match(/<MobileDisclosureGroup/g) || []).length >= 3,
    "workflow, system elements, and distinctions need compact disclosures",
  );
  assert.doesNotMatch(artifact, /["']use client["']|useState|useEffect/);
});

test("adds contained touch-first styling for the mobile solution family", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\[data-mobile-solution-detail\]\s*\{/,
  );
  assert.match(
    css,
    /\[data-mobile-solution-detail\]\s+\.mobile-disclosure-trigger\s*\{[^}]*min-height:\s*4[^;]*rem/s,
  );
  assert.match(css, /\.mobile-solution-atlas-stage\s*\{/);
  assert.match(
    css,
    /\[data-mobile-solution-detail\]\s+\.mobile-atlas__control strong\s*\{[^}]*overflow-wrap:\s*normal[^}]*word-break:\s*normal[^}]*hyphens:\s*none/s,
  );
  assert.match(css, /\.mobile-solution-deliverable-ledger\s*\{/);
  assert.match(
    css,
    /\.mobile-solution-deliverable-ledger\s+li:last-child:nth-child\(odd\)\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/s,
    "an odd final deliverable must span the ledger instead of leaving an empty cell",
  );
  assert.match(css, /\.mobile-solution-final\s*\{/);
  assert.doesNotMatch(
    css,
    /\[data-mobile-solution-detail\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
    "the mobile family must contain rather than conceal overflow",
  );
});
