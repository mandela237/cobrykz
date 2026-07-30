import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
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

const expectedSlugs = [
  "ai",
  "business-automation",
  "custom-software-development",
  "digital-business-systems",
  "websites-web-applications",
  "technology-consulting",
];
const requiredArrays = [
  "recognition",
  "businessOutcomes",
  "deliverables",
  "applications",
  "approach",
  "relatedSlugs",
  "faqs",
];

const textFor = (solution) =>
  JSON.stringify(solution)
    .replaceAll("\\u0026", "&")
    .toLocaleLowerCase("en-US");

test("defines six complete solution pages in the approved route order", () => {
  assert.deepEqual(
    solutions.map(({ slug }) => slug),
    expectedSlugs,
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
