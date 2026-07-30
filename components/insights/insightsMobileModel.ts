import type { PublishedInsightDefinition } from "@/components/content/insights";

export const getMobileInsightLedger = (
  insights: readonly PublishedInsightDefinition[],
) =>
  insights.map((insight, index) => ({
    href: `/insights/${insight.slug}` as const,
    index: String(index + 1).padStart(2, "0"),
    topic: insight.topic,
    title: insight.title,
    summary: insight.summary,
  }));

export const getMobileInsightArticle = (
  insight: PublishedInsightDefinition,
) => ({
  title: insight.title,
  summary: insight.summary,
  topic: insight.topic,
  author: insight.author,
  publishedAt: insight.publishedAt,
  readingTimeMinutes: insight.readingTimeMinutes,
  visual: insight.visual,
  sections: insight.sections,
  nextSteps: insight.nextSteps,
  relatedSolution: insight.relatedSolution,
  cta: {
    heading: "Apply the thinking to a real business challenge.",
    body:
      "Start with the outcome you need. Cobrykz can help assess the challenge, identify the right path, and build what creates value.",
    href: "/contact" as const,
    label: "Discuss a business challenge",
  },
});
