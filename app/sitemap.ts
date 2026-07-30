import type { MetadataRoute } from "next";
import { publishedInsights } from "@/components/content/insights";
import { publishedProjects } from "@/components/content/projects";
import { solutions } from "@/components/content/solutions";
import { siteUrl } from "@/lib/seo/site";

const stablePaths = ["/", "/solutions", "/process", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...stablePaths,
    ...solutions.map((solution) => solution.href),
    ...(publishedProjects.length > 0
      ? ["/projects", ...publishedProjects.map((project) => `/projects/${project.slug}`)]
      : []),
    ...(publishedInsights.length >= 3
      ? ["/insights", ...publishedInsights.map((insight) => `/insights/${insight.slug}`)]
      : []),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/solutions" ? 0.9 : 0.7,
  }));
}
