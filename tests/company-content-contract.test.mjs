import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const read = (relativePath) => {
  const path = join(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

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

test("builds thin server-rendered Process and About routes from company page content", () => {
  const routes = [
    {
      path: "app/process/page.tsx",
      component: "ProcessPage",
      content: "processPage",
      canonical: "/process",
    },
    {
      path: "app/about/page.tsx",
      component: "AboutPage",
      content: "aboutPage",
      canonical: "/about",
    },
  ];

  for (const route of routes) {
    const source = read(route.path);
    assert.ok(source, `${route.path} must exist`);
    assert.doesNotMatch(source, /["']use client["']/);
    assert.match(
      source,
      new RegExp(
        `import \\{ ${route.content} \\} from ["']@/components/content/companyPages["']`,
      ),
    );
    assert.match(
      source,
      new RegExp(
        `import ${route.component} from ["']@/components/company/${route.component}["']`,
      ),
    );
    assert.match(
      source,
      new RegExp(
        `export const metadata:\\s*Metadata\\s*=\\s*${route.content}\\.metadata`,
      ),
    );
    assert.match(
      source,
      new RegExp(
        `<${route.component}\\s+content=\\{${route.content}\\}\\s*/>`,
      ),
    );
    assert.doesNotMatch(
      source,
      /A clear path from business challenge|Technology should make businesses stronger/,
      `${route.path} must not duplicate page copy`,
    );
    assert.equal(
      companyPagesModule.exports[route.content].metadata.alternates.canonical,
      route.canonical,
    );
  }
});

test("renders one H1 per company page through one responsive server component tree", () => {
  const pages = [
    {
      path: "components/company/ProcessPage.tsx",
      contentType: "ProcessPageDefinition",
    },
    {
      path: "components/company/AboutPage.tsx",
      contentType: "AboutPageDefinition",
    },
  ];

  for (const page of pages) {
    const source = read(page.path);
    assert.ok(source, `${page.path} must exist`);
    assert.doesNotMatch(source, /["']use client["']/);
    assert.match(
      source,
      new RegExp(
        `import type \\{ ${page.contentType} \\} from ["']@/components/content/companyPages["']`,
      ),
    );
    assert.match(source, new RegExp(`content:\\s*${page.contentType}`));
    assert.equal(
      (source.match(/<h1\b/g) || []).length,
      1,
      `${page.path} must render exactly one H1`,
    );
    assert.doesNotMatch(
      source,
      /\b(?:sm|md|lg|xl|2xl):hidden\b|\bhidden\b[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid)\b/,
      `${page.path} must not swap duplicate content trees by breakpoint`,
    );
  }
});

test("renders the exact progressive process, both decision gates, and the complete operating model", () => {
  const source = read("components/company/ProcessPage.tsx");

  assert.match(source, /<ol\b[\s\S]*content\.stages\.map\(\(stage,\s*index\)/);
  assert.match(source, /\{stage\.name\}/);
  assert.match(source, /\{stage\.summary\}/);
  assert.match(source, /\{stage\.description\}/);
  assert.match(source, /stage\.decisions\.map\(\(decision\)/);
  assert.match(source, /stage\.outputs\.map\(\(output\)/);
  assert.match(
    source,
    /content\.decisionGates\.find\([\s\S]*gate\.after === stage\.name[\s\S]*gate\.before === content\.stages\[index \+ 1\]\?\.name/,
  );
  assert.match(source, /\{gate\.title\}/);
  assert.match(source, /\{gate\.question\}/);
  assert.match(source, /gate\.criteria\.map\(\(criterion\)/);
  assert.match(source, /Decision gate between \$\{gate\.after\} and \$\{gate\.before\}/);

  assert.match(source, /\{content\.scaling\.title\}/);
  assert.match(source, /\{content\.scaling\.description\}/);
  assert.match(source, /content\.scaling\.paths\.map\(\(path\)/);
  assert.match(source, /content\.operatingModel\.map\(\(item\)/);
  assert.match(source, /\{content\.postLaunch\.title\}/);
  assert.match(source, /\{content\.postLaunch\.description\}/);
  assert.match(source, /content\.postLaunch\.options\.map\(\(option\)/);
});

test("renders the approved About narrative, founder portrait, standards, and shared CTA", () => {
  const source = read("components/company/AboutPage.tsx");

  assert.match(source, /\{content\.foundingTension\}/);
  assert.match(source, /\{content\.purpose\.title\}/);
  assert.match(source, /\{content\.purpose\.description\}/);
  assert.match(source, /content\.principles\.map\(\(principle,\s*index\)/);
  assert.match(source, /\{content\.partnership\.title\}/);
  assert.match(source, /\{content\.partnership\.description\}/);
  assert.match(source, /import Image from ["']next\/image["']/);
  assert.match(source, /src=["']\/mandela-portrait-sharp\.jpg["']/);
  assert.match(source, /\{content\.leadership\.title\}/);
  assert.match(source, /\{content\.leadership\.name\}/);
  assert.match(source, /\{content\.leadership\.role\}/);
  assert.match(source, /\{content\.leadership\.description\}/);
  assert.match(source, /content\.standards\.map\(\(standard,\s*index\)/);

  for (const path of [
    "components/company/ProcessPage.tsx",
    "components/company/AboutPage.tsx",
  ]) {
    const page = read(path);
    assert.match(
      page,
      /<PrimaryLink\s+href=\{content\.cta\.href\}[^>]*>\s*\{content\.cta\.label\}\s*<\/PrimaryLink>/s,
    );
    assert.match(page, /\{content\.cta\.title\}/);
    assert.match(page, /\{content\.cta\.description\}/);
  }
});
