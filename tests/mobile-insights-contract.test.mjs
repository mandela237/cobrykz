import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const loadTypeScriptModule = async (path) => {
  const source = read(path);
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const url = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#${path}`;
  return import(url);
};

const mobileModel = await loadTypeScriptModule(
  "components/insights/insightsMobileModel.ts",
);

const completePublishedInsight = {
  slug: "fixture-insight",
  title: "Fixture decision guidance",
  summary: "Executive answer sentinel",
  topic: "Fixture topic",
  author: { name: "Author sentinel", role: "Role sentinel" },
  publishedAt: "2026-07-30",
  updatedAt: "2026-07-31",
  readingTimeMinutes: 7,
  sections: [
    { heading: "Chapter sentinel", paragraphs: ["Paragraph one sentinel", "Paragraph two sentinel"] },
  ],
  nextSteps: ["Next step sentinel"],
  relatedSolution: { name: "Solution sentinel", href: "/solutions/ai" },
  status: "published",
  visual: {
    id: "fixture-atlas",
    eyebrow: "Atlas sentinel",
    title: "Decision atlas sentinel",
    description: "Atlas description sentinel",
    readingDirection: "Left to right sentinel",
    layers: [{ id: "layer", label: "Layer sentinel", meaning: "Meaning sentinel", depth: 1, bounds: { x: 0, y: 0, width: 1, height: 1 } }],
    nodes: [{ id: "node", label: "Node sentinel", detail: "Detail sentinel", kind: "decision", layerId: "layer", x: 0, y: 0 }],
    connections: [],
  },
};

test("keeps the public Insights registry in its honest draft state", () => {
  const content = read("components/content/insights.ts");
  const registry = content.slice(
    content.indexOf("export const insights"),
    content.indexOf("export const isPublishedInsight"),
  );
  assert.match(registry, /status:\s*"draft"/);
  assert.doesNotMatch(registry, /status:\s*"published"/);
});

test("wraps frozen desktop and purpose-built mobile Insight compositions", () => {
  const index = read("components/insights/InsightsIndex.tsx");
  const article = read("components/insights/InsightArticle.tsx");
  assert.match(index, /<ResponsivePageComposition/);
  assert.match(index, /<MobileInsightsIndex insights=\{insights\}/);
  assert.match(index, /<DesktopInsightsIndex insights=\{insights\}/);
  assert.match(article, /<ResponsivePageComposition/);
  assert.match(article, /<MobileInsightArticle insight=\{insight\}/);
  assert.match(article, /<DesktopInsightArticle insight=\{insight\}/);
  assert.equal((article.match(/application\/ld\+json/g) || []).length, 2);
});

test("models the published ledger and complete future article without publishing it", () => {
  const index = read("components/insights/MobileInsightsIndex.tsx");
  const article = read("components/insights/MobileInsightArticle.tsx");

  for (const sentinel of [
    completePublishedInsight.title,
    completePublishedInsight.summary,
    completePublishedInsight.topic,
    completePublishedInsight.author.name,
    completePublishedInsight.author.role,
    completePublishedInsight.sections[0].heading,
    completePublishedInsight.sections[0].paragraphs[0],
    completePublishedInsight.nextSteps[0],
    completePublishedInsight.relatedSolution.name,
    completePublishedInsight.visual.title,
  ]) {
    assert.ok(sentinel.length > 0);
  }

  assert.match(index, /getMobileInsightLedger\(insights\)/);
  assert.match(index, /ledger\.map/);
  assert.match(index, /entry\.topic/);
  assert.match(index, /entry\.title/);
  assert.match(index, /entry\.summary/);
  assert.match(article, /insight\.summary/);
  assert.match(article, /insight\.visual/);
  assert.match(article, /<MobileAtlasExplorer/);
  assert.match(article, /insight\.sections\.map/);
  assert.match(article, /section\.paragraphs\.map/);
  assert.match(article, /insight\.nextSteps\.map/);
  assert.match(article, /insight\.relatedSolution\.href/);
  assert.match(article, /insight\.relatedSolution\.name/);
  assert.match(article, /insight\.author\.name/);
  assert.match(article, /insight\.author\.role/);
});

test("renders the complete fixture through executable mobile view models", () => {
  assert.deepEqual(mobileModel.getMobileInsightLedger([completePublishedInsight]), [
    {
      href: "/insights/fixture-insight",
      index: "01",
      topic: "Fixture topic",
      title: "Fixture decision guidance",
      summary: "Executive answer sentinel",
    },
  ]);

  const view = mobileModel.getMobileInsightArticle(completePublishedInsight);
  assert.equal(view.title, "Fixture decision guidance");
  assert.equal(view.summary, "Executive answer sentinel");
  assert.equal(view.topic, "Fixture topic");
  assert.deepEqual(view.author, { name: "Author sentinel", role: "Role sentinel" });
  assert.equal(view.publishedAt, "2026-07-30");
  assert.equal(view.readingTimeMinutes, 7);
  assert.equal(view.visual.title, "Decision atlas sentinel");
  assert.equal(view.visual.nodes[0].label, "Node sentinel");
  assert.deepEqual(view.sections, completePublishedInsight.sections);
  assert.deepEqual(view.nextSteps, ["Next step sentinel"]);
  assert.deepEqual(view.relatedSolution, {
    name: "Solution sentinel",
    href: "/solutions/ai",
  });
  assert.deepEqual(view.cta, {
    heading: "Apply the thinking to a real business challenge.",
    body:
      "Start with the outcome you need. Cobrykz can help assess the challenge, identify the right path, and build what creates value.",
    href: "/contact",
    label: "Discuss a business challenge",
  });
});

test("keeps optional Atlas and related solution absent without changing article order", () => {
  const fixture = {
    ...completePublishedInsight,
    visual: undefined,
    relatedSolution: undefined,
  };
  const view = mobileModel.getMobileInsightArticle(fixture);
  assert.equal(view.visual, undefined);
  assert.equal(view.relatedSolution, undefined);
  assert.deepEqual(
    view.sections.map((section) => section.heading),
    ["Chapter sentinel"],
  );
});

test("keeps the canonical mobile article sequence and readable paragraphs", () => {
  const article = read("components/insights/MobileInsightArticle.tsx");
  const order = [
    'id="insight-opening"',
    'id="executive-answer"',
    'id="insight-decision-model"',
    "insight.sections.map",
    'id="next-steps"',
    'id="related-solution"',
    'id="author-context"',
    'id="insight-cta"',
  ];
  for (let index = 1; index < order.length; index += 1) {
    assert.ok(article.indexOf(order[index - 1]) < article.indexOf(order[index]));
  }
  assert.match(article, /section\.paragraphs\.map/);
  assert.doesNotMatch(article, /MobileDisclosureGroup/);
});

test("uses only defined premium tokens and restores Chaptered Atlas marker rhythm", () => {
  const css = read("app/globals.css");
  const start = css.indexOf("[data-mobile-insights-index]");
  const end = css.indexOf("[data-mobile-contact]", start);
  const insightsCss = css.slice(start, end > start ? end : undefined);

  assert.doesNotMatch(
    insightsCss,
    /var\(--(?:navy|slate|blue|border|blue-tint)\)/,
  );
  for (const token of [
    "--color-navy",
    "--color-slate",
    "--color-blue",
    "--color-border",
    "--color-blue-tint",
  ]) {
    assert.match(insightsCss, new RegExp(`var\\(${token}\\)`));
  }
  assert.match(
    insightsCss,
    /\.mobile-chapter__marker \+ \*\s*\{[^}]*margin-top:\s*1\.75rem/s,
  );
  assert.match(
    insightsCss,
    /\.mobile-insight-cta p\s*\{[^}]*color:\s*rgb\(255 255 255/s,
  );
});
