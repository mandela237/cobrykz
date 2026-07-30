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
  const rail = read("components/company/DeliveryRail.tsx");

  assert.match(rail, /<ol\b[\s\S]*stages\.map\(\(stage,\s*index\)/);
  assert.match(rail, /\{stage\.summary\}/);
  assert.match(rail, /\{stage\.description\}/);
  assert.match(rail, /stage\.decisions\.map\(\(decision\)/);
  assert.match(rail, /stage\.outputs\.map\(\(output\)/);
  assert.match(
    rail,
    /gates\.find\([\s\S]*candidate\.after === stage\.name[\s\S]*candidate\.before === stages\[index \+ 1\]\?\.name/,
  );
  assert.match(rail, /\{gate\.title\}/);
  assert.match(rail, /\{gate\.question\}/);
  assert.match(rail, /gate\.criteria\.map\(\(criterion\)/);
  assert.match(rail, /Decision gate between \$\{gate\.after\} and \$\{gate\.before\}/);

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
  const founder = read("components/company/FounderAccountability.tsx");

  assert.doesNotMatch(
    source,
    /\bfont-serif\b/,
    "About must use the approved sans/editorial typography treatment",
  );
  assert.match(source, /\{content\.foundingTension\}/);
  assert.match(source, /\{content\.purpose\.title\}/);
  assert.match(source, /\{content\.purpose\.description\}/);
  assert.match(source, /content\.principles\.map\(\(principle,\s*index\)/);
  assert.match(source, /\{content\.partnership\.title\}/);
  assert.match(source, /\{content\.partnership\.description\}/);
  assert.match(founder, /import Image from ["']next\/image["']/);
  assert.match(founder, /src=["']\/mandela-portrait-sharp\.jpg["']/);
  assert.match(founder, /\{leadership\.title\}/);
  assert.match(founder, /\{leadership\.name\}/);
  assert.match(founder, /\{leadership\.role\}/);
  assert.match(founder, /\{leadership\.description\}/);
  assert.match(source, /content\.standards\.map\(\(standard\)/);

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

test("renders one continuous, accountable delivery rail", () => {
  const rail = read("components/company/DeliveryRail.tsx");
  const page = read("components/company/ProcessPage.tsx");

  for (const stage of [
    "Discover",
    "Assess",
    "Design",
    "Build",
    "Deploy",
    "Optimize",
  ]) {
    assert.match(rail, new RegExp(stage));
  }

  assert.equal((rail.match(/data-decision-gate/g) || []).length, 1);
  assert.match(rail, /<ol\b/);
  assert.match(rail, /aria-label="Cobrykz delivery process"/);
  assert.match(rail, /stages\.map/);
  assert.match(rail, /gates\.find/);
  assert.match(page, /<DeliveryRail\s+stages=\{content\.stages\}\s+gates=\{content\.decisionGates\}\s*\/>/);
});

test("composes About around one connected partner and accountable leadership", () => {
  const atlas = read("components/company/ConnectedPartnerAtlas.tsx");
  const founder = read("components/company/FounderAccountability.tsx");
  const page = read("components/company/AboutPage.tsx");

  assert.equal((atlas.match(/<SystemAtlas\b/g) || []).length, 1);
  for (const label of [
    "Business strategy",
    "Experience design",
    "Engineering",
    "AI",
    "Automation",
    "Integration",
    "Deployment",
    "Improvement",
    "Cobrykz accountability",
  ]) {
    assert.match(atlas, new RegExp(label));
  }

  assert.match(founder, /src=["']\/mandela-portrait-sharp\.jpg["']/);
  assert.match(founder, /alt=\{`\$\{leadership\.name\}, \$\{leadership\.role\}`\}/);
  assert.doesNotMatch(founder, /SystemAtlas/);
  assert.match(page, /<ConnectedPartnerAtlas\s*\/>/);
  assert.match(page, /<FounderAccountability\s+leadership=\{content\.leadership\}\s*\/>/);
  assert.doesNotMatch(page, /content\.standards\.map\(\(standard,\s*index\)/);
});

test("adds honest visual frameworks for Projects and Insights", () => {
  const projectsIndex = read("components/projects/ProjectsIndex.tsx");
  const desktopProjectsIndex = read(
    "components/projects/DesktopProjectsIndex.tsx",
  );
  const projectCaseStudy = read(
    "components/projects/DesktopProjectCaseStudy.tsx",
  );
  const evidenceStandard = read("components/projects/EvidenceStandard.tsx");
  const insightsIndex = read("components/insights/InsightsIndex.tsx");
  const insightArticle = read("components/insights/InsightArticle.tsx");
  const editorialMethod = read("components/insights/EditorialMethod.tsx");

  assert.match(projectsIndex, /<DesktopProjectsIndex/);
  assert.match(desktopProjectsIndex, /<EvidenceStandard\s*\/>/);
  assert.match(insightsIndex, /<EditorialMethod\s*\/>/);
  assert.doesNotMatch(
    `${evidenceStandard}\n${editorialMethod}`,
    /client logo|verified result|testimonial|published article/i,
  );
  assert.match(projectCaseStudy, /<TransformationRecord\s+project=\{project\}/);
  assert.match(insightArticle, /insight\.visual\s*\?/);
  assert.match(insightArticle, /<DecisionDiagram\s+definition=\{insight\.visual\}/);
});

test("builds an honest noindex Projects index from published projects only", () => {
  const route = read("app/projects/page.tsx");

  assert.ok(route, "app/projects/page.tsx must exist");
  assert.doesNotMatch(route, /["']use client["']/);
  assert.match(
    route,
    /import ProjectsIndex from ["']@\/components\/projects\/ProjectsIndex["']/,
  );
  assert.match(
    route,
    /import \{ publishedProjects \} from ["']@\/components\/content\/projects["']/,
  );
  assert.match(
    route,
    /robots:\s*\{\s*index:\s*publishedProjects\.length\s*>\s*0,\s*follow:\s*true,?\s*\}/s,
  );
  assert.match(route, /alternates:\s*\{\s*canonical:\s*["']\/projects["']/s);
  assert.match(route, /openGraph:\s*\{[\s\S]*url:\s*["']\/projects["']/);
  assert.match(route, /<ProjectsIndex\s+projects=\{publishedProjects\}\s*\/>/);
});

test("renders an intentional Projects empty state without fake inventory or filters", () => {
  const source = read("components/projects/DesktopProjectsIndex.tsx");

  assert.ok(
    source,
    "components/projects/DesktopProjectsIndex.tsx must exist",
  );
  assert.doesNotMatch(source, /["']use client["']/);
  assert.match(
    source,
    /import type \{ PublishedProjectDefinition \} from ["']@\/components\/content\/projects["']/,
  );
  assert.match(source, /projects:\s*readonly PublishedProjectDefinition\[\]/);
  assert.equal(
    (source.match(/<h1\b/g) || []).length,
    1,
    "Projects index must render exactly one H1",
  );
  assert.match(source, /projects\.length\s*===\s*0/);
  assert.match(source, /No project case studies are published yet/i);
  assert.match(source, /href=["']\/solutions["']/);
  assert.match(source, /Explore (?:our )?solutions/i);
  assert.match(
    source,
    /<PrimaryLink\s+href=["']\/contact["'][^>]*>[\s\S]*Discuss a business challenge[\s\S]*<\/PrimaryLink>/,
  );
  assert.doesNotMatch(source, /<select\b|<button\b|filter\(/);
  assert.doesNotMatch(
    textFor(projectsModule.exports.publishedProjects),
    /client|outcome|testimonial|metric/,
  );
});

test("generates Project details only for published slugs and rejects unavailable work", () => {
  const route = read("app/projects/[slug]/page.tsx");

  assert.ok(route, "app/projects/[slug]/page.tsx must exist");
  assert.doesNotMatch(route, /["']use client["']/);
  assert.match(route, /import \{ notFound \} from ["']next\/navigation["']/);
  assert.match(
    route,
    /import \{\s*getPublishedProject,\s*publishedProjects,\s*\} from ["']@\/components\/content\/projects["']/s,
  );
  assert.match(route, /export const dynamicParams\s*=\s*false/);
  assert.match(
    route,
    /export function generateStaticParams\(\)\s*\{[\s\S]*return publishedProjects\.map\(\(project\)\s*=>\s*\(\{\s*slug:\s*project\.slug,\s*\}\)\);?[\s\S]*\}/,
  );
  assert.match(route, /params:\s*Promise<\{\s*slug:\s*string\s*\}>/);
  assert.match(
    route,
    /getPublishedProject\(slug,\s*publishedProjects\)/,
  );
  assert.ok(
    (route.match(/\bnotFound\(\)/g) || []).length >= 2,
    "metadata and page rendering must both reject unavailable slugs",
  );
  assert.match(route, /<ProjectCaseStudy\s+project=\{project\}\s*\/>/);
});

test("keeps Project detail metadata specific, canonical, and evidence-led", () => {
  const route = read("app/projects/[slug]/page.tsx");

  assert.match(route, /export async function generateMetadata\(/);
  assert.match(route, /project\.metadata\?\.title\s*\?\?/);
  assert.match(route, /project\.metadata\?\.description\s*\?\?\s*project\.summary/);
  assert.match(route, /const url\s*=\s*`\/projects\/\$\{project\.slug\}`/);
  assert.match(
    route,
    /alternates:\s*\{\s*canonical:\s*url,?\s*\}/s,
  );
  assert.match(route, /openGraph:\s*\{[\s\S]*url,\s*\}/);
  assert.doesNotMatch(
    route,
    /anonymous|confidential client|industry-leading|transformative results/i,
  );
});

test("defines the approved 13-part business case-study narrative", () => {
  const source = read(
    "components/projects/DesktopProjectCaseStudy.tsx",
  );
  const parts = [
    "Project introduction",
    "Business context",
    "Challenge",
    "Assessment and strategy",
    "Solution",
    "How it works",
    "Capabilities combined",
    "Implementation and partnership",
    "Verified outcomes",
    "Authorized client perspective",
    "Next stage",
    "Related content",
    "Project call to action",
  ];

  assert.ok(
    source,
    "components/projects/DesktopProjectCaseStudy.tsx must exist",
  );
  assert.doesNotMatch(source, /["']use client["']/);
  assert.match(
    source,
    /import type \{ PublishedProjectDefinition \} from ["']@\/components\/content\/projects["']/,
  );
  assert.match(source, /project:\s*PublishedProjectDefinition/);
  assert.equal(
    (source.match(/<h1\b/g) || []).length,
    1,
    "Project detail must render exactly one H1",
  );

  let previousIndex = -1;
  for (const part of parts) {
    const index = source.indexOf(part);
    assert.ok(index > previousIndex, `${part} must appear in approved order`);
    previousIndex = index;
  }

  for (const field of [
    "project.context",
    "project.challenge",
    "project.strategy",
    "project.solution",
    "project.howItWorks",
    "project.capabilities",
    "project.implementation",
    "project.verifiedOutcomes",
    "project.authorizedQuote",
    "project.nextStage",
    "project.relatedContent",
  ]) {
    assert.match(
      source,
      new RegExp(field.replace(".", "\\.")),
      `Project case study must render ${field}`,
    );
  }

  assert.match(source, /\{outcome\.result\}/);
  assert.match(source, /\{outcome\.evidence\}/);
  assert.match(source, /\{project\.authorizedQuote\.attribution\}/);
  assert.match(
    source,
    /<PrimaryLink\s+href=["']\/contact["'][^>]*>[\s\S]*Discuss a business challenge[\s\S]*<\/PrimaryLink>/,
  );
  assert.doesNotMatch(
    source,
    /\b(?:sm|md|lg|xl|2xl):hidden\b|\bhidden\b[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid)\b/,
    "Project detail must use one responsive content tree",
  );
});

test("builds an honest noindex Insights index from published articles only", () => {
  const route = read("app/insights/page.tsx");

  assert.ok(route, "app/insights/page.tsx must exist");
  assert.doesNotMatch(route, /["']use client["']/);
  assert.match(
    route,
    /import \{ publishedInsights \} from ["']@\/components\/content\/insights["']/,
  );
  assert.match(
    route,
    /robots:\s*\{\s*index:\s*publishedInsights\.length\s*>=\s*3,\s*follow:\s*true,?\s*\}/s,
  );
  assert.match(route, /alternates:\s*\{\s*canonical:\s*["']\/insights["']/s);
  assert.match(route, /<InsightsIndex\s+insights=\{publishedInsights\}\s*\/>/);
});

test("renders a transparent Insights empty state without draft article cards", () => {
  const source = read("components/insights/InsightsIndex.tsx");

  assert.ok(source, "components/insights/InsightsIndex.tsx must exist");
  assert.doesNotMatch(source, /["']use client["']/);
  assert.match(
    source,
    /import type \{ PublishedInsightDefinition \} from ["']@\/components\/content\/insights["']/,
  );
  assert.match(source, /insights:\s*readonly PublishedInsightDefinition\[\]/);
  assert.equal((source.match(/<h1\b/g) || []).length, 1);
  assert.match(source, /insights\.length\s*<\s*3/);
  assert.match(source, /Insights are being prepared/i);
  assert.match(source, /href=["']\/solutions["']/);
  assert.match(
    source,
    /<PrimaryLink\s+href=["']\/contact["'][^>]*>[\s\S]*Discuss a business challenge[\s\S]*<\/PrimaryLink>/,
  );
  assert.doesNotMatch(source, /where-should-a-business-start-with-ai|five-signs-a-process|when-custom-software/);
});

test("generates Insight articles only for published slugs and rejects drafts", () => {
  const route = read("app/insights/[slug]/page.tsx");

  assert.ok(route, "app/insights/[slug]/page.tsx must exist");
  assert.match(route, /import \{ notFound \} from ["']next\/navigation["']/);
  assert.match(
    route,
    /import \{\s*getPublishedInsight,\s*publishedInsights,\s*\} from ["']@\/components\/content\/insights["']/s,
  );
  assert.match(route, /export const dynamicParams\s*=\s*false/);
  assert.match(
    route,
    /return publishedInsights\.map\(\(insight\)\s*=>\s*\(\{\s*slug:\s*insight\.slug,\s*\}\)\)/s,
  );
  assert.ok((route.match(/\bnotFound\(\)/g) || []).length >= 2);
  assert.match(route, /<InsightArticle\s+insight=\{insight\}\s*\/>/);
});

test("defines the approved Insight article structure and conversion path", () => {
  const source = read("components/insights/InsightArticle.tsx");

  assert.ok(source, "components/insights/InsightArticle.tsx must exist");
  assert.equal((source.match(/<h1\b/g) || []).length, 1);
  for (const item of [
    "Executive answer",
    "insight.sections",
    "Practical next steps",
    "insight.nextSteps",
    "Related solution",
    "insight.relatedSolution",
    "Author context",
    "insight.author.name",
    "insight.author.role",
  ]) {
    assert.match(source, new RegExp(item.replace(".", "\\.")));
  }
  assert.match(
    source,
    /<PrimaryLink\s+href=["']\/contact["'][^>]*>[\s\S]*Discuss a business challenge[\s\S]*<\/PrimaryLink>/,
  );
});
