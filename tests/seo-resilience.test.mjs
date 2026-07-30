import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

test("publishes controlled robots and sitemap inventories", () => {
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(robots, /sitemap:\s*`\$\{siteUrl\}\/sitemap\.xml`/);
  assert.match(sitemap, /publishedProjects/);
  assert.match(sitemap, /publishedInsights/);
  assert.match(sitemap, /publishedInsights\.length\s*>=\s*3/);
  assert.match(sitemap, /solutions\.map/);
  assert.doesNotMatch(sitemap, /\bindustr(?:y|ies)\b|\blocation(?:s)?\b/i);
});

test("defines only supported global and solution structured data", () => {
  const seo = read("lib/seo/site.ts");
  const layout = read("app/layout.tsx");
  const solution = read("components/solutions/SolutionPage.tsx");
  assert.match(seo, /["']Organization["']/);
  assert.match(seo, /["']WebSite["']/);
  assert.match(layout, /organizationSchema/);
  assert.match(layout, /websiteSchema/);
  assert.match(solution, /["']Service["']/);
  assert.match(solution, /["']BreadcrumbList["']/);
  assert.doesNotMatch(`${seo}\n${solution}`, /aggregateRating|review|price|address/);
});

test("gives major route families canonical and social metadata", () => {
  const home = read("app/page.tsx");
  const hub = read("app/solutions/page.tsx");
  const helper = read("lib/seo/site.ts");
  const solutionRoutes = [
    "ai",
    "business-automation",
    "custom-software-development",
    "digital-business-systems",
    "websites-web-applications",
    "technology-consulting",
  ].map((slug) => read(`app/solutions/${slug}/page.tsx`));
  assert.match(home, /buildPageMetadata/);
  assert.match(hub, /buildPageMetadata/);
  assert.match(helper, /alternates/);
  assert.match(helper, /openGraph/);
  assert.match(helper, /twitter/);
  for (const route of solutionRoutes) assert.match(route, /buildPageMetadata/);
});

test("provides useful accessible recovery routes", () => {
  const notFound = read("app/not-found.tsx");
  const error = read("app/global-error.tsx");
  assert.equal((notFound.match(/<h1\b/g) || []).length, 2);
  assert.match(notFound, /ResponsivePageComposition/);
  assert.match(notFound, /href=["']\/solutions["']/);
  assert.match(notFound, /href=["']\/contact["']/);
  assert.match(error, /["']use client["']/);
  assert.match(error, /reset\(\)/);
  assert.match(error, /Try again/);
  assert.match(error, /href=["']\/["']/);
});
