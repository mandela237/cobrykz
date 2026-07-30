import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();

const loadTypeScriptModule = async (relativePath) => {
  const path = join(root, relativePath);
  if (!existsSync(path)) {
    return { exports: {}, source: "" };
  }

  const source = readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#${relativePath}`;

  return { exports: await import(moduleUrl), source };
};

const projectsModule = await loadTypeScriptModule(
  "components/content/projects.ts",
);
const insightsModule = await loadTypeScriptModule(
  "components/content/insights.ts",
);
const companyPagesModule = await loadTypeScriptModule(
  "components/content/companyPages.ts",
);

const textFor = (value) => JSON.stringify(value).toLocaleLowerCase("en-US");

test("models explicit draft and published states for project content", () => {
  assert.match(
    projectsModule.source,
    /export type PublicationStatus\s*=\s*["']draft["']\s*\|\s*["']published["']/,
  );
  assert.match(projectsModule.source, /\bstatus:\s*PublicationStatus\b/);
  assert.equal(typeof projectsModule.exports.isPublishedProject, "function");
});

test("supports the complete evidence-led project narrative without invented values", () => {
  for (const field of [
    "context",
    "challenge",
    "strategy",
    "solution",
    "capabilities",
    "implementation",
    "verifiedOutcomes",
    "authorizedQuote",
    "nextStage",
  ]) {
    assert.match(
      projectsModule.source,
      new RegExp(`\\b${field}\\?:`),
      `ProjectDefinition must support optional ${field}`,
    );
  }

  assert.ok(Array.isArray(projectsModule.exports.projects));
  assert.deepEqual(projectsModule.exports.projects, []);
  assert.ok(Array.isArray(projectsModule.exports.publishedProjects));
  assert.deepEqual(
    projectsModule.exports.publishedProjects,
    [],
    "no project may be published until real evidence is approved",
  );
});

test("defines exactly the three approved insight topics as drafts", () => {
  assert.ok(Array.isArray(insightsModule.exports.insights));
  assert.deepEqual(
    insightsModule.exports.insights.map(({ title, status }) => ({
      title,
      status,
    })),
    [
      {
        title: "Where should a business actually start with AI?",
        status: "draft",
      },
      {
        title: "Five signs a process is ready for automation",
        status: "draft",
      },
      {
        title: "When custom software is worth the investment",
        status: "draft",
      },
    ],
  );
  assert.deepEqual(
    insightsModule.exports.publishedInsights,
    [],
    "draft topics must not appear as published articles",
  );
});

test("supports every approved insight article field without pretending drafts are articles", () => {
  for (const field of [
    "title",
    "summary",
    "topic",
    "author",
    "publishedAt",
    "updatedAt",
    "readingTimeMinutes",
    "sections",
    "nextSteps",
    "relatedSolution",
    "status",
  ]) {
    assert.match(
      insightsModule.source,
      new RegExp(`\\b${field}\\??:`),
      `InsightDefinition must support ${field}`,
    );
  }
  assert.match(insightsModule.source, /\bstatus:\s*PublicationStatus\b/);
});

test("publication helpers expose only published projects and insights", () => {
  const projectDraft = { slug: "project-draft", status: "draft" };
  const projectPublished = { slug: "project-published", status: "published" };
  assert.deepEqual(
    projectsModule.exports.getPublishedProjects([
      projectDraft,
      projectPublished,
    ]),
    [projectPublished],
  );
  assert.strictEqual(
    projectsModule.exports.getPublishedProject("project-published", [
      projectDraft,
      projectPublished,
    ]),
    projectPublished,
  );
  assert.equal(
    projectsModule.exports.getPublishedProject("project-draft", [
      projectDraft,
      projectPublished,
    ]),
    undefined,
  );

  const insightDraft = { slug: "insight-draft", status: "draft" };
  const insightPublished = { slug: "insight-published", status: "published" };
  assert.deepEqual(
    insightsModule.exports.getPublishedInsights([
      insightDraft,
      insightPublished,
    ]),
    [insightPublished],
  );
  assert.strictEqual(
    insightsModule.exports.getPublishedInsight("insight-published", [
      insightDraft,
      insightPublished,
    ]),
    insightPublished,
  );
  assert.equal(
    insightsModule.exports.getPublishedInsight("insight-draft", [
      insightDraft,
      insightPublished,
    ]),
    undefined,
  );
});

test("defines the complete six-stage process and both decision gates", () => {
  const { processPage } = companyPagesModule.exports;
  assert.deepEqual(
    processPage.stages.map(({ name, summary }) => ({ name, summary })),
    [
      { name: "Discover", summary: "Understand the situation." },
      { name: "Assess", summary: "Identify the best opportunity." },
      { name: "Design", summary: "Make the important decisions." },
      { name: "Build", summary: "Turn decisions into a working system." },
      { name: "Deploy", summary: "Integrate it into real operations." },
      { name: "Optimize", summary: "Improve value over time." },
    ],
  );
  assert.deepEqual(
    processPage.decisionGates.map(({ after, before }) => ({ after, before })),
    [
      { after: "Assess", before: "Design" },
      { after: "Build", before: "Deploy" },
    ],
  );

  const processText = textFor(processPage);
  for (const requirement of [
    "consulting",
    "roadmap",
    "governance",
    "communication",
    "change",
    "adoption",
    "post-launch",
    "optimization",
  ]) {
    assert.match(processText, new RegExp(requirement));
  }
});

test("defines the approved About purpose, principles, partnership, and leadership", () => {
  const { aboutPage } = companyPagesModule.exports;
  assert.equal(
    aboutPage.headline,
    "Technology should make businesses stronger—not more complicated.",
  );
  assert.equal(
    aboutPage.foundingTension,
    "Businesses should not need to choose between strategic advice that never becomes real and technical delivery that ignores the business.",
  );
  assert.deepEqual(
    aboutPage.principles.map(({ title }) => title),
    [
      "Start with the business",
      "Explain the decisions",
      "Build responsibly",
      "Create value that lasts",
    ],
  );
  assert.equal(aboutPage.leadership.name, "Mandela Atud");
  assert.equal(aboutPage.leadership.role, "Founder");
  assert.ok(aboutPage.standards.length >= 4);

  const aboutText = textFor(aboutPage);
  for (const requirement of [
    "technology company",
    "one accountable partnership",
    "accountability",
    "cobrykz",
    "mandela",
  ]) {
    assert.match(aboutText, new RegExp(requirement));
  }
});

test("gives Process and About complete, unique route metadata and a shared CTA", () => {
  const { aboutPage, processPage } = companyPagesModule.exports;
  assert.notEqual(processPage.metadata.title, aboutPage.metadata.title);
  assert.notEqual(
    processPage.metadata.description,
    aboutPage.metadata.description,
  );
  assert.equal(processPage.metadata.alternates.canonical, "/process");
  assert.equal(aboutPage.metadata.alternates.canonical, "/about");
  assert.equal(processPage.metadata.openGraph.url, "/process");
  assert.equal(aboutPage.metadata.openGraph.url, "/about");
  assert.equal(processPage.cta.label, "Discuss a business challenge");
  assert.equal(aboutPage.cta.label, "Discuss a business challenge");
  assert.equal(processPage.cta.href, "/contact");
  assert.equal(aboutPage.cta.href, "/contact");
});
