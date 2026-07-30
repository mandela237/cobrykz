import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const source = readFileSync(
  join(root, "components/content/solutions.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { solutions, solutionBySlug } = await import(moduleUrl);

const expectedSolutions = [
  { slug: "ai", name: "AI Solutions" },
  { slug: "business-automation", name: "Business Automation" },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
  },
  { slug: "digital-business-systems", name: "Digital Business Systems" },
  {
    slug: "websites-web-applications",
    name: "Websites & Web Applications",
  },
  { slug: "technology-consulting", name: "Technology Consulting" },
];
const expectedSlugs = expectedSolutions.map(({ slug }) => slug);
const requiredArrays = [
  "recognition",
  "businessOutcomes",
  "deliverables",
  "applications",
  "approach",
  "relatedSlugs",
  "faqs",
];

const collectSolutionPageRoutes = (directory, segments = []) => {
  const routes = existsSync(join(directory, "page.tsx"))
    ? [segments.join("/")]
    : [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      routes.push(
        ...collectSolutionPageRoutes(join(directory, entry.name), [
          ...segments,
          entry.name,
        ]),
      );
    }
  }

  return routes;
};

const assertExactSolutionPageRoutes = (pageRoutes) => {
  assert.deepEqual(
    pageRoutes.toSorted(),
    ["", ...expectedSlugs].toSorted(),
    "app/solutions must contain exactly the hub and six approved static pages",
  );
  assert.equal(
    pageRoutes.some((route) => /[[\]]/.test(route)),
    false,
    "solution routes must not use dynamic segments",
  );
};

const textFor = (solution) =>
  JSON.stringify(solution)
    .replaceAll("\\u0026", "&")
    .toLocaleLowerCase("en-US");

test("defines six complete solution pages in the approved route order", () => {
  assert.deepEqual(
    solutions.map(({ slug, name }) => ({ slug, name })),
    expectedSolutions,
  );
  assert.equal(
    (source.match(/}\s+as const satisfies SolutionPageDefinition;/g) || [])
      .length,
    expectedSolutions.length,
    "each solution definition must retain readonly literal inference",
  );

  for (const solution of solutions) {
    assert.equal(solution.href, `/solutions/${solution.slug}`);
    assert.ok(
      solution.heroSupport?.trim(),
      `${solution.slug} needs hero support`,
    );

    for (const field of requiredArrays) {
      assert.ok(Array.isArray(solution[field]), `${solution.slug}.${field} is an array`);
      assert.ok(solution[field].length > 0, `${solution.slug}.${field} is not empty`);
    }

    for (const step of solution.approach) {
      assert.ok(step.title.trim(), `${solution.slug} has a titled approach step`);
      assert.ok(
        step.description.trim(),
        `${solution.slug} has a described approach step`,
      );
    }

    for (const faq of solution.faqs) {
      assert.ok(faq.question.trim(), `${solution.slug} has a FAQ question`);
      assert.ok(faq.answer.trim(), `${solution.slug} has a FAQ answer`);
    }

    assert.ok(solution.cta.title.trim(), `${solution.slug} needs a CTA title`);
    assert.equal(solution.cta.label, "Discuss a business challenge");
    assert.ok(solution.metadata.title.trim(), `${solution.slug} needs a metadata title`);
    assert.ok(
      solution.metadata.description.trim(),
      `${solution.slug} needs a metadata description`,
    );
  }
});

test("keeps lookup, relationships, and metadata complete and unambiguous", () => {
  assert.deepEqual(Object.keys(solutionBySlug), expectedSlugs);

  for (const solution of solutions) {
    assert.strictEqual(solutionBySlug[solution.slug], solution);
    assert.ok(
      Array.isArray(solution.relatedSlugs),
      `${solution.slug} needs related solutions`,
    );
    assert.ok(!solution.relatedSlugs.includes(solution.slug));
    assert.equal(new Set(solution.relatedSlugs).size, solution.relatedSlugs.length);

    for (const relatedSlug of solution.relatedSlugs) {
      assert.ok(
        expectedSlugs.includes(relatedSlug),
        `${solution.slug} links to a valid related solution`,
      );
    }
  }

  assert.equal(
    new Set(solutions.map(({ metadata }) => metadata.title)).size,
    solutions.length,
  );
  assert.equal(
    new Set(solutions.map(({ metadata }) => metadata.description)).size,
    solutions.length,
  );
  assert.doesNotMatch(
    source,
    /Object\.fromEntries[\s\S]*\bas\s+Record<SolutionSlug,\s*Solution(?:Page)?Definition>/,
  );
});

test("preserves the approved decision guidance for each solution", () => {
  const ai = solutionBySlug.ai;
  assert.equal(ai.guidance?.title, "Where AI may not be the right answer");
  for (const consideration of [
    "process redesign",
    "automation",
    "information architecture",
    "conventional software",
    "data sensitivity",
    "access",
    "accuracy",
    "human approvals",
    "cost",
    "latency",
    "monitoring",
    "failure handling",
  ]) {
    assert.match(textFor(ai.guidance), new RegExp(consideration));
  }

  const customSoftware = solutionBySlug["custom-software-development"];
  assert.ok(customSoftware.guidance);
  for (const option of [
    "configuration",
    "integration",
    "focused custom development",
    "modernization",
    "business advantage",
  ]) {
    assert.match(textFor(customSoftware.guidance), new RegExp(option));
  }

  const systems = solutionBySlug["digital-business-systems"];
  assert.match(
    systems.heroSupport,
    /Connected platforms for operations, information, and teams/,
  );
  for (const distinction of [
    "custom software creates a tailored application",
    "digital business systems creates a connected operating environment",
    "business automation moves work through that environment",
  ]) {
    assert.match(textFor(systems), new RegExp(distinction));
  }

  const web = solutionBySlug["websites-web-applications"];
  for (const role of ["establish trust", "enable customer action", "deliver digital service"]) {
    assert.match(textFor(web.businessOutcomes), new RegExp(role));
  }

  const consulting = solutionBySlug["technology-consulting"];
  assert.deepEqual(consulting.deliverables, [
    "Current-state assessment",
    "Opportunity map",
    "Prioritized recommendations",
    "Risk register",
    "Target-system view",
    "Sequenced roadmap",
    "Decision brief",
  ]);
});

test("defines visible typed artifacts for workflow maturity and the connected system map", () => {
  assert.match(source, /export type SolutionArtifact\s*=/);
  assert.match(
    source,
    /artifact\?:\s*SolutionArtifact/,
    "solution artifacts must remain optional on the shared page definition",
  );

  const automation = solutionBySlug["business-automation"];
  assert.equal(automation.artifact?.kind, "workflow-comparison");
  assert.equal(automation.artifact.eyebrow, "Illustrative workflow");
  assert.equal(automation.artifact.before.label, "Before");
  assert.equal(automation.artifact.after.label, "After");
  assert.ok(automation.artifact.before.steps.length >= 3);
  assert.ok(automation.artifact.after.steps.length >= 3);
  assert.deepEqual(
    automation.artifact.safeguards.map(({ title }) => title),
    ["Exception handling", "Human review"],
  );
  assert.match(
    textFor(automation.artifact.safeguards),
    /missing data/,
  );
  assert.match(
    textFor(automation.artifact.safeguards),
    /system failure/,
  );
  assert.match(textFor(automation.artifact.safeguards), /recover/);
  assert.match(textFor(automation.artifact.safeguards), /judgment/);

  const systems = solutionBySlug["digital-business-systems"];
  assert.equal(systems.artifact?.kind, "system-map");
  assert.equal(systems.artifact.eyebrow, "System map");
  assert.deepEqual(
    systems.artifact.elements.map(({ title }) => title),
    ["People", "Tools", "Workflows", "Information"],
  );
  assert.deepEqual(
    systems.artifact.distinctions.map(({ title }) => title),
    ["Custom Software", "Digital Business Systems", "Business Automation"],
  );
  assert.match(
    textFor(systems.artifact),
    /tailored application/,
  );
  assert.match(
    textFor(systems.artifact),
    /connected operating environment/,
  );
  assert.match(
    textFor(systems.artifact),
    /less manual effort/,
  );
});

const solutionComponentIds = {
  "components/solutions/SolutionHero.tsx": "solution-hero-heading",
  "components/solutions/ProblemRecognition.tsx":
    "solution-recognition-heading",
  "components/solutions/OutcomeList.tsx": "solution-outcomes-heading",
  "components/solutions/CapabilityList.tsx":
    "solution-capabilities-heading",
  "components/solutions/ApplicationExamples.tsx":
    "solution-applications-heading",
  "components/solutions/SolutionGuidance.tsx":
    "solution-guidance-heading",
  "components/solutions/SolutionApproach.tsx": "solution-approach-heading",
  "components/solutions/RelatedSolutions.tsx": "solution-related-heading",
  "components/solutions/SolutionFaqs.tsx": "solution-faq-heading",
  "components/solutions/SolutionFinalCta.tsx":
    "solution-final-cta-heading",
};

test("composes every solution from shared server-rendered sections", () => {
  const page = read("components/solutions/SolutionPage.tsx");
  const componentSources = Object.fromEntries(
    Object.keys(solutionComponentIds).map((path) => [path, read(path)]),
  );
  const leafSources = Object.values(componentSources).join("\n");
  const allSources = `${page}\n${leafSources}`;

  assert.doesNotMatch(allSources, /["']use client["']/);
  assert.match(
    page,
    /<SolutionHero solution=\{solution\}\s*\/>[\s\S]*<ProblemRecognition solution=\{solution\}\s*\/>[\s\S]*<OutcomeList solution=\{solution\}\s*\/>[\s\S]*<CapabilityList solution=\{solution\}\s*\/>[\s\S]*<ApplicationExamples solution=\{solution\}\s*\/>[\s\S]*\{solution\.artifact &&\s*<SolutionArtifact artifact=\{solution\.artifact\}\s*\/>\}[\s\S]*\{solution\.guidance &&\s*<SolutionGuidance guidance=\{solution\.guidance\}\s*\/>\}[\s\S]*<SolutionApproach solution=\{solution\}\s*\/>[\s\S]*<RelatedSolutions solution=\{solution\}\s*\/>[\s\S]*<SolutionFaqs solution=\{solution\}\s*\/>[\s\S]*<SolutionFinalCta solution=\{solution\}\s*\/>/,
  );
  assert.equal(
    (leafSources.match(/<h1\b/g) || []).length,
    1,
    "the shared solution page system must render exactly one H1",
  );

  for (const [path, headingId] of Object.entries(solutionComponentIds)) {
    const component = componentSources[path];
    assert.match(
      component,
      new RegExp(`<section\\b[^>]*aria-labelledby="${headingId}"`, "s"),
      `${path} must expose a labelled semantic section`,
    );
    assert.match(
      component,
      new RegExp(`\\bid="${headingId}"`),
      `${path} must render the referenced heading id`,
    );
  }

  assert.doesNotMatch(
    allSources,
    /(?:^|[\s"'`])(?:sm|md|lg|xl|2xl):hidden(?=$|[\s"'`])|(?:^|[\s"'`])hidden(?=$|[\s"'`])[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid|inline|inline-block|inline-flex)\b/,
    "solution pages must use one responsive content tree",
  );
  assert.doesNotMatch(
    allSources,
    /\btransition-all\b|\banimate-(?!none\b)|(?:hover|active|group-hover):(?:-?(?:scale|translate)|shadow|drop-shadow|brightness)-/,
    "solution pages must retain the reviewed motion contract",
  );
  assert.doesNotMatch(
    allSources,
    /(?:bg|text|border|ring|outline|decoration|fill|stroke|from|via|to)-\[(?:#|rgba?\(|hsla?\(|oklch\(|color:|var\()/,
    "solution pages must use the reviewed palette tokens",
  );
  assert.equal(
    (leafSources.match(/\bbg-(?:navy|charcoal|footer-bg)\b/g) || []).length,
    1,
    "the final CTA must be the only shared dark solution-page band",
  );
});

test("labels examples honestly and renders optional decision guidance only when present", () => {
  const applications = read(
    "components/solutions/ApplicationExamples.tsx",
  );
  const guidance = read("components/solutions/SolutionGuidance.tsx");
  const page = read("components/solutions/SolutionPage.tsx");

  assert.match(applications, />\s*Representative applications\s*</);
  assert.match(applications, /solution\.applications\.map\(\(application\)/);
  assert.match(page, /\{solution\.guidance &&\s*<SolutionGuidance/);
  assert.match(guidance, /\{guidance\.title\}/);
  assert.match(guidance, /\{guidance\.description\}/);
});

test("renders optional explanatory artifacts through one shared labelled component", () => {
  const artifactPath = "components/solutions/SolutionArtifact.tsx";
  assert.ok(
    existsSync(join(root, artifactPath)),
    "the shared solution artifact renderer must exist",
  );

  const artifact = read(artifactPath);
  const page = read("components/solutions/SolutionPage.tsx");

  assert.doesNotMatch(artifact, /["']use client["']/);
  assert.match(
    page,
    /solution\.artifact &&\s*<SolutionArtifact artifact=\{solution\.artifact\}\s*\/>/,
  );
  assert.match(
    artifact,
    /<section\b[^>]*aria-labelledby="solution-artifact-heading"/s,
  );
  assert.match(artifact, /\bid="solution-artifact-heading"/);
  assert.match(artifact, /\{artifact\.eyebrow\}/);
  assert.match(artifact, /artifact\.kind === "workflow-comparison"/);
  assert.match(artifact, /\[artifact\.before,\s*artifact\.after\]\.map/);
  assert.match(artifact, /\{workflow\.label\}/);
  assert.match(artifact, /workflow\.steps\.map/);
  assert.match(artifact, /artifact\.safeguards\.map/);
  assert.equal(
    (artifact.match(/artifact\.elements\.slice\([^)]*\)\.map/g) || []).length,
    2,
  );
  assert.match(artifact, /artifact\.distinctions\.map/);
});

test("uses shared calls to action, related solution links, and accessible FAQ disclosures", () => {
  const hero = read("components/solutions/SolutionHero.tsx");
  const finalCta = read("components/solutions/SolutionFinalCta.tsx");
  const related = read("components/solutions/RelatedSolutions.tsx");
  const faqs = read("components/solutions/SolutionFaqs.tsx");

  assert.match(
    hero,
    /import \{ primaryCta \} from ["']@\/components\/content\/site["']/,
  );
  assert.match(
    hero,
    /<PrimaryLink\s+href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
  );
  assert.match(
    finalCta,
    /import \{ primaryCta \} from ["']@\/components\/content\/site["']/,
  );
  assert.match(finalCta, /\{solution\.cta\.title\}/);
  assert.match(
    finalCta,
    /<PrimaryLink\s+href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
  );

  assert.match(
    related,
    /import \{ solutionBySlug \} from ["']@\/components\/content\/solutions["']/,
  );
  assert.match(related, /solution\.relatedSlugs\.map\(\(slug\) =>/);
  assert.match(related, /href=\{relatedSolution\.href\}/);
  assert.match(related, /\{relatedSolution\.name\}/);
  assert.match(
    related,
    /<Link\b[^>]*className="[^"]*\bmin-h-11\b[^"]*"/s,
  );

  assert.match(faqs, /solution\.faqs\.map\(\(faq\)/);
  assert.match(faqs, /<details\b/);
  assert.match(faqs, /<summary\b[^>]*className="[^"]*\bmin-h-11\b[^"]*"/s);
  assert.match(faqs, /\{faq\.question\}/);
  assert.match(faqs, /\{faq\.answer\}/);
});

test("defines the Solutions hub route with unique static metadata", () => {
  const page = read("app/solutions/page.tsx");
  const expectedTitle = "Business Technology Solutions | Cobrykz";
  const expectedDescription =
    "Explore AI, automation, custom software, websites, digital business systems, and technology consulting shaped around real business challenges.";

  assert.match(
    page,
    /import \{ buildPageMetadata \} from ["']@\/lib\/seo\/site["']/,
  );
  assert.match(
    page,
    /import SolutionsHub from ["']@\/components\/solutions\/SolutionsHub["']/,
  );
  assert.match(page, /export const metadata = buildPageMetadata\(\{/);
  assert.match(page, /path:\s*["']\/solutions["']/);
  assert.ok(page.includes(`title: "${expectedTitle}"`));
  assert.ok(
    page.includes(`description:\n    "${expectedDescription}"`),
    "the hub must expose the exact approved static description",
  );
  assert.ok(
    !solutions.some(({ metadata }) => metadata.title === expectedTitle),
    "the hub title must be unique among solution routes",
  );
  assert.ok(
    !solutions.some(
      ({ metadata }) => metadata.description === expectedDescription,
    ),
    "the hub description must be unique among solution routes",
  );
  assert.match(
    page,
    /export default function SolutionsPage\(\) \{\s*return <SolutionsHub\s*\/>;\s*\}/,
  );
});

test("defines six thin static solution routes from the shared model", () => {
  const expectedRoutes = [
    { slug: "ai", lookup: "solutionBySlug.ai" },
    {
      slug: "business-automation",
      lookup: 'solutionBySlug["business-automation"]',
    },
    {
      slug: "custom-software-development",
      lookup: 'solutionBySlug["custom-software-development"]',
    },
    {
      slug: "digital-business-systems",
      lookup: 'solutionBySlug["digital-business-systems"]',
    },
    {
      slug: "websites-web-applications",
      lookup: 'solutionBySlug["websites-web-applications"]',
    },
    {
      slug: "technology-consulting",
      lookup: 'solutionBySlug["technology-consulting"]',
    },
  ];

  assert.deepEqual(
    expectedRoutes.map(({ slug }) => slug),
    expectedSlugs,
    "each modeled solution must receive one dedicated static route",
  );

  const actualPageRoutes = collectSolutionPageRoutes(join(root, "app/solutions"));
  assertExactSolutionPageRoutes(actualPageRoutes);

  for (const { slug, lookup } of expectedRoutes) {
    const page = read(`app/solutions/${slug}/page.tsx`);

    assert.match(
      page,
      /import \{ buildPageMetadata \} from ["']@\/lib\/seo\/site["']/,
    );
    assert.match(
      page,
      /import \{ solutionBySlug \} from ["']@\/components\/content\/solutions["']/,
    );
    assert.match(
      page,
      /import SolutionPage from ["']@\/components\/solutions\/SolutionPage["']/,
    );
    assert.ok(
      page.includes(`const solution = ${lookup};`),
      `${slug} must look up its explicit model key`,
    );
    assert.match(
      page,
      /export const metadata = buildPageMetadata\(\{\s*\.\.\.solution\.metadata,\s*path:\s*solution\.href\s*\}\);/,
    );
    assert.match(
      page,
      /export default function Page\(\) \{\s*return <SolutionPage solution=\{solution\}\s*\/>;\s*\}/,
    );
    assert.doesNotMatch(page, /["']use client["']/);
  }

  assert.equal(
    new Set(solutions.map(({ metadata }) => metadata.title)).size,
    expectedRoutes.length,
    "the route metadata titles must remain unique in the shared model",
  );
  assert.equal(
    new Set(solutions.map(({ metadata }) => metadata.description)).size,
    expectedRoutes.length,
    "the route metadata descriptions must remain unique in the shared model",
  );
});

test("rejects unexpected seventh and dynamic solution route inventories", () => {
  assert.throws(
    () =>
      assertExactSolutionPageRoutes([
        "",
        ...expectedSlugs,
        "experimental",
      ]),
    /exactly the hub and six approved static pages/,
  );
  assert.throws(
    () =>
      assertExactSolutionPageRoutes([
        "",
        ...expectedSlugs,
        "ai/[slug]",
      ]),
    /exactly the hub and six approved static pages/,
  );
});

test("renders the frozen Solutions hub narrative from shared content", () => {
  const hub = read("components/solutions/SolutionsHub.tsx");
  const matrix = read("components/solutions/SolutionSelectionMatrix.tsx");
  const allSources = `${hub}\n${matrix}`;
  const sectionIds = [
    "solutions-hub-hero",
    "solutions-hub-outcomes",
    "solutions-hub-portfolio",
    "solutions-hub-selection",
    "solutions-hub-connected",
    "solutions-hub-method",
    "solutions-hub-why",
    "solutions-hub-cta",
  ];

  assert.match(
    hub,
    /import \{ solutions \} from ["']@\/components\/content\/solutions["']/,
  );
  assert.match(
    hub,
    /import \{\s*homeOutcomes,\s*processStages,\s*whyCobrykz,\s*\} from ["']@\/components\/content\/home["']/s,
  );
  assert.match(
    hub,
    /import \{ primaryCta \} from ["']@\/components\/content\/site["']/,
  );
  assert.doesNotMatch(hub, /@\/components\/home\//);
  assert.doesNotMatch(allSources, /["']use client["']/);
  assert.equal(
    (allSources.match(/<h1\b/g) || []).length,
    1,
    "the Solutions hub must render exactly one H1",
  );

  let previousSectionIndex = -1;
  for (const sectionId of sectionIds) {
    const sectionIndex = hub.indexOf(`id="${sectionId}"`);
    assert.ok(sectionIndex > previousSectionIndex, `${sectionId} is in order`);
    previousSectionIndex = sectionIndex;
  }

  assert.match(hub, /homeOutcomes\.map\(\(outcome/);
  assert.match(hub, /solutions\.map\(\(solution,\s*index\)/);
  assert.match(hub, /href=\{solution\.href\}/);
  assert.match(hub, /\{solution\.name\}/);
  assert.match(hub, /<SolutionSelectionMatrix\s*\/>/);
  assert.match(
    hub,
    /title="Connected outcomes may combine multiple capabilities\."/,
  );
  assert.match(hub, /processStages\.slice\(0,\s*3\)\.map\(\(stage,\s*index\)/);
  assert.match(hub, /whyCobrykz\.map\(\(reason/);
  assert.match(
    hub,
    />\s*What could technology improve in your business\?\s*</,
  );
  assert.match(
    hub,
    /<PrimaryLink\s+href=\{primaryCta\.href\}[^>]*>\s*\{primaryCta\.label\}\s*<\/PrimaryLink>/s,
  );

  for (const sectionId of sectionIds) {
    assert.match(
      hub,
      new RegExp(
        `<section\\b[^>]*id="${sectionId}"[^>]*aria-labelledby="${sectionId}-heading"`,
        "s",
      ),
      `${sectionId} must expose a labelled semantic section`,
    );
    assert.match(
      hub,
      new RegExp(`\\bid="${sectionId}-heading"`),
      `${sectionId} must render the referenced heading id`,
    );
  }

  assert.doesNotMatch(
    allSources,
    /(?:^|[\s"'`])(?:sm|md|lg|xl|2xl):hidden(?=$|[\s"'`])|(?:^|[\s"'`])hidden(?=$|[\s"'`])[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid|inline|inline-block|inline-flex)\b/,
    "the hub must use one responsive content tree",
  );
  assert.doesNotMatch(
    allSources,
    /\btransition-all\b|\banimate-(?!none\b)|(?:hover|active|group-hover):(?:-?(?:scale|translate)|shadow|drop-shadow|brightness)-/,
    "the hub must retain the reviewed motion contract",
  );
  assert.doesNotMatch(
    allSources,
    /(?:bg|text|border|ring|outline|decoration|fill|stroke|from|via|to)-\[(?:#|rgba?\(|hsla?\(|oklch\(|color:|var\()/,
    "the hub must use the reviewed palette tokens",
  );
  assert.equal(
    (allSources.match(/\bbg-(?:navy|charcoal|footer-bg)\b/g) || []).length,
    1,
    "the final CTA must be the hub's only dark band",
  );
});

test("maps business conditions to direct solution links in a semantic matrix", () => {
  const matrix = read("components/solutions/SolutionSelectionMatrix.tsx");
  const expectedRows = [
    ["Unclear AI opportunity", '"ai", "technology-consulting"'],
    ["Repetitive work", '"business-automation"'],
    ["Unsuitable generic tools", '"custom-software-development"'],
    ["Disconnected operations", '"digital-business-systems"'],
    ["Weak customer experience", '"websites-web-applications"'],
    ["Unclear investment priorities", '"technology-consulting"'],
  ];

  assert.match(
    matrix,
    /import \{ solutionBySlug \} from ["']@\/components\/content\/solutions["']/,
  );
  assert.match(matrix, /<table\b/);
  assert.match(matrix, /<caption\b/);
  assert.match(matrix, /<thead\b/);
  assert.match(matrix, /<tbody\b/);
  assert.match(matrix, /<th\b[^>]*\bscope="row"/s);
  assert.match(matrix, /selectionRows\.map\(\(row\)/);
  assert.match(matrix, /row\.solutionSlugs\.map\(\(slug\)/);
  assert.match(matrix, /const solution = solutionBySlug\[slug\]/);
  assert.match(matrix, /<Link\s+href=\{solution\.href\}/);
  assert.match(matrix, /\{solution\.name\}/);
  assert.match(matrix, /\bmin-h-11\b/);

  for (const [condition, solutionSlugs] of expectedRows) {
    assert.match(
      matrix,
      new RegExp(
        `condition: "${condition}",[\\s\\S]*?solutionSlugs: \\[${solutionSlugs}\\]`,
      ),
      `${condition} must map to the approved starting solution`,
    );
  }
});
