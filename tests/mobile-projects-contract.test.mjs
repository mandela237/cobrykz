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
const mobileModelModule = await loadTypeScriptModule(
  "components/projects/projectMobileModel.ts",
);

const completePublishedProject = {
  slug: "fixture-complete-project",
  title: "Fixture complete project",
  summary: "A fixture used only to verify the complete renderer.",
  status: "published",
  context: ["Context sentinel"],
  challenge: ["Challenge sentinel"],
  strategy: ["Strategy sentinel"],
  solution: ["Solution sentinel"],
  howItWorks: [
    {
      title: "Workflow sentinel",
      description: "Workflow description sentinel",
    },
  ],
  capabilities: [
    {
      name: "Linked capability sentinel",
      href: "/solutions/ai",
    },
    {
      name: "Unlinked capability sentinel",
    },
  ],
  implementation: ["Implementation sentinel"],
  verifiedOutcomes: [
    {
      result: "Outcome sentinel",
      evidence: "Evidence sentinel",
      verifiedAt: "2026-07-30",
    },
  ],
  authorizedQuote: {
    quote: "Quote sentinel",
    attribution: "Attribution sentinel",
    role: "Role sentinel",
    organization: "Organization sentinel",
    authorizationConfirmed: true,
  },
  nextStage: ["Next-stage sentinel"],
  relatedContent: [
    {
      title: "Related-content sentinel",
      href: "/insights",
    },
  ],
  metadata: {
    title: "Metadata title sentinel",
    description: "Metadata description sentinel",
  },
};

test("keeps Projects empty until approved evidence is actually published", () => {
  assert.deepEqual(projectsModule.exports.projects, []);
  assert.deepEqual(projectsModule.exports.publishedProjects, []);
});

test("derives every optional mobile case-study chapter from one typed fixture", () => {
  assert.equal(
    typeof mobileModelModule.exports.getProjectMobileChapters,
    "function",
  );
  const chapters =
    mobileModelModule.exports.getProjectMobileChapters(
      completePublishedProject,
    );

  assert.deepEqual(
    chapters.map(({ field, id }) => ({ field, id })),
    [
      { field: "context", id: "project-context" },
      { field: "challenge", id: "project-challenge" },
      { field: "strategy", id: "project-strategy" },
      { field: "solution", id: "project-solution" },
      { field: "howItWorks", id: "project-how" },
      { field: "capabilities", id: "project-capabilities" },
      { field: "implementation", id: "project-implementation" },
      { field: "verifiedOutcomes", id: "project-outcomes" },
      { field: "authorizedQuote", id: "project-perspective" },
      { field: "nextStage", id: "project-next-stage" },
      { field: "relatedContent", id: "project-related" },
    ],
  );
  assert.deepEqual(
    mobileModelModule.exports
      .getProjectTransformationStages(completePublishedProject)
      .map(({ label }) => label),
    [
      "Condition",
      "Decision",
      "Response",
      "Implementation",
      "Verified change",
      "Next stage",
    ],
  );
});

test("builds the published mobile index ledger from the complete fixture", () => {
  assert.equal(
    typeof mobileModelModule.exports.getMobileProjectLedger,
    "function",
  );

  assert.deepEqual(
    mobileModelModule.exports.getMobileProjectLedger([
      completePublishedProject,
    ]),
    [
      {
        href: "/projects/fixture-complete-project",
        index: "01",
        summary: "A fixture used only to verify the complete renderer.",
        title: "Fixture complete project",
      },
    ],
  );
});

test("builds a complete render model with every published-project sentinel", () => {
  assert.equal(
    typeof mobileModelModule.exports.getMobileProjectCaseStudy,
    "function",
  );

  const view =
    mobileModelModule.exports.getMobileProjectCaseStudy(
      completePublishedProject,
    );

  assert.equal(view.title, "Fixture complete project");
  assert.equal(
    view.summary,
    "A fixture used only to verify the complete renderer.",
  );
  assert.deepEqual(view.context, ["Context sentinel"]);
  assert.deepEqual(view.challenge, ["Challenge sentinel"]);
  assert.deepEqual(view.strategy, ["Strategy sentinel"]);
  assert.deepEqual(view.solution, ["Solution sentinel"]);
  assert.deepEqual(view.howItWorks, [
    {
      title: "Workflow sentinel",
      description: "Workflow description sentinel",
    },
  ]);
  assert.deepEqual(view.capabilities, [
    {
      name: "Linked capability sentinel",
      href: "/solutions/ai",
    },
    {
      name: "Unlinked capability sentinel",
    },
  ]);
  assert.deepEqual(view.implementation, ["Implementation sentinel"]);
  assert.deepEqual(view.verifiedOutcomes, [
    {
      result: "Outcome sentinel",
      evidence: "Evidence sentinel",
      verifiedAt: "2026-07-30",
    },
  ]);
  assert.deepEqual(view.authorizedQuote, {
    quote: "Quote sentinel",
    attribution: "Attribution sentinel",
    role: "Role sentinel",
    organization: "Organization sentinel",
    authorizationConfirmed: true,
  });
  assert.deepEqual(view.nextStage, ["Next-stage sentinel"]);
  assert.deepEqual(view.relatedContent, [
    {
      title: "Related-content sentinel",
      href: "/insights",
    },
  ]);
  assert.deepEqual(
    view.chapters.map(({ field, id }) => ({ field, id })),
    [
      { field: "context", id: "project-context" },
      { field: "challenge", id: "project-challenge" },
      { field: "strategy", id: "project-strategy" },
      { field: "solution", id: "project-solution" },
      { field: "howItWorks", id: "project-how" },
      { field: "capabilities", id: "project-capabilities" },
      { field: "implementation", id: "project-implementation" },
      { field: "verifiedOutcomes", id: "project-outcomes" },
      { field: "authorizedQuote", id: "project-perspective" },
      { field: "nextStage", id: "project-next-stage" },
      { field: "relatedContent", id: "project-related" },
    ],
  );
});

test("wraps the honest Projects index in one responsive presentation", () => {
  const wrapper = read("components/projects/ProjectsIndex.tsx");
  const desktop = read("components/projects/DesktopProjectsIndex.tsx");
  const mobile = read("components/projects/MobileProjectsIndex.tsx");

  assert.match(wrapper, /<ResponsivePageComposition/);
  assert.match(wrapper, /mobile=\{<MobileProjectsIndex projects=\{projects\} \/>\}/);
  assert.match(wrapper, /desktop=\{<DesktopProjectsIndex projects=\{projects\} \/>\}/);
  assert.doesNotMatch(wrapper, /"use client"|useState|onClick/);

  for (const source of [desktop, mobile]) {
    assert.match(source, /projects:\s*readonly PublishedProjectDefinition\[\]/);
    assert.match(source, /projects\.length\s*===\s*0/);
    assert.match(source, /No project case studies are published yet\./);
    assert.match(source, /href=["']\/solutions["']/);
    assert.match(source, /href=["']\/contact["']/);
  }

  assert.match(mobile, /data-mobile-projects-index/);
  assert.match(mobile, /getMobileProjectLedger\(projects\)/);
  assert.match(mobile, /ledger\.map/);
  assert.match(mobile, /evidenceGroups\.map/);
  assert.match(mobile, /<MobileDisclosureGroup/);
  assert.doesNotMatch(mobile, /"use client"|useState|onClick/);

  const desktopOrder = [
    'id="projects-hero"',
    "<EvidenceStandard",
    "projects.length === 0",
    'id="projects-empty-heading"',
    'id="projects-published-heading"',
  ];
  for (let index = 1; index < desktopOrder.length; index += 1) {
    assert.ok(
      desktop.indexOf(desktopOrder[index - 1]) <
        desktop.indexOf(desktopOrder[index]),
      `${desktopOrder[index - 1]} must precede ${desktopOrder[index]}`,
    );
  }
});

test("keeps the complete desktop case study verbatim behind a responsive wrapper", () => {
  const wrapper = read("components/projects/ProjectCaseStudy.tsx");
  const desktop = read(
    "components/projects/DesktopProjectCaseStudy.tsx",
  );

  assert.match(wrapper, /<ResponsivePageComposition/);
  assert.match(
    wrapper,
    /mobile=\{<MobileProjectCaseStudy project=\{project\} \/>\}/,
  );
  assert.match(
    wrapper,
    /desktop=\{<DesktopProjectCaseStudy project=\{project\} \/>\}/,
  );

  const order = [
    "Project introduction",
    "<TransformationRecord",
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
  for (let index = 1; index < order.length; index += 1) {
    assert.ok(
      desktop.indexOf(order[index - 1]) < desktop.indexOf(order[index]),
      `${order[index - 1]} must precede ${order[index]}`,
    );
  }
});

test("renders every optional fixture field in the conditional mobile case study", () => {
  const mobile = read("components/projects/MobileProjectCaseStudy.tsx");
  const route = read("app/projects/[slug]/page.tsx");

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
    assert.match(mobile, new RegExp(field.replace(".", "\\.")));
  }

  assert.match(mobile, /outcome\.verifiedAt/);
  assert.match(mobile, /capability\.href/);
  assert.match(mobile, /project\.authorizedQuote\.role/);
  assert.match(mobile, /project\.authorizedQuote\.organization/);
  assert.match(mobile, /relatedContent\.map|project\.relatedContent\.map/);
  assert.match(mobile, /getMobileProjectCaseStudy\(project\)/);
  assert.match(mobile, /view\.chapters/);
  assert.match(mobile, /view\.transformationStages/);
  assert.ok(
    (mobile.match(/<MobileDisclosureGroup/g) || []).length >= 2,
    "How it works and verified outcomes require focused disclosure",
  );
  assert.match(mobile, /data-mobile-project-case-study/);
  assert.doesNotMatch(mobile, /"use client"|useState|onClick/);

  const mobileConditionalOrder = [
    'id="project-context"',
    'id="project-challenge"',
    'id="project-strategy"',
    'id="project-solution"',
    'id="project-how"',
    'id="project-capabilities"',
    'id="project-implementation"',
    'id="project-outcomes"',
    'id="project-perspective"',
    'id="project-next-stage"',
    'id="project-related"',
  ];
  for (let index = 1; index < mobileConditionalOrder.length; index += 1) {
    assert.ok(
      mobile.indexOf(mobileConditionalOrder[index - 1]) <
        mobile.indexOf(mobileConditionalOrder[index]),
      `${mobileConditionalOrder[index - 1]} must precede ${mobileConditionalOrder[index]}`,
    );
  }

  assert.match(route, /project\.metadata\?\.title/);
  assert.match(route, /project\.metadata\?\.description/);
  assert.match(route, /<ProjectCaseStudy project=\{project\} \/>/);
});

test("gives Projects a contained touch-first mobile evidence composition", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\[data-mobile-projects-index\]\s*\{/,
  );
  assert.match(
    css,
    /\[data-mobile-projects-index\]\s+\.mobile-disclosure-trigger\s*\{[^}]*min-height:\s*4[^;]*rem/s,
  );
  assert.match(
    css,
    /\.mobile-projects-evidence\s+\.mobile-disclosure-trigger:focus-visible\s*\{[^}]*outline-color:\s*var\(--focus-ring-dark\)/s,
  );
  assert.match(
    css,
    /\.mobile-project-transformation::before\s*\{/,
  );
  assert.match(
    css,
    /\.mobile-projects-secondary-action\s*\{[^}]*min-height:\s*2\.75rem/s,
  );
  assert.doesNotMatch(
    css,
    /\[data-mobile-projects-index\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
  );
  assert.doesNotMatch(
    css,
    /\[data-mobile-project-case-study\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
  );
});
