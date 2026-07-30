import type { PublicationStatus } from "./projects";
import type { AtlasDefinition } from "@/components/atlas/types";

export type { PublicationStatus } from "./projects";

export type InsightSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type InsightDefinition = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  sections?: readonly InsightSection[];
  nextSteps?: readonly string[];
  relatedSolution?: {
    name: string;
    href: `/solutions/${string}`;
  };
  status: PublicationStatus;
  metadata?: {
    title: string;
    description: string;
  };
  visual?: AtlasDefinition;
};

export type PublishedInsightDefinition = InsightDefinition & {
  status: "published";
  publishedAt: string;
  readingTimeMinutes: number;
  sections: readonly InsightSection[];
  nextSteps: readonly string[];
};

export const insights = [
  {
    slug: "where-should-a-business-start-with-ai",
    title: "Where should a business actually start with AI?",
    summary:
      "A practical framework for choosing a focused business problem, assessing readiness, and deciding whether AI deserves a controlled pilot.",
    topic: "Practical AI",
    author: {
      name: "Mandela Atud",
      role: "Founder",
    },
    relatedSolution: {
      name: "AI Solutions",
      href: "/solutions/ai",
    },
    status: "draft",
  },
  {
    slug: "five-signs-a-process-is-ready-for-automation",
    title: "Five signs a process is ready for automation",
    summary:
      "Decision guidance for recognizing stable, repeatable work that can move more reliably without removing necessary human judgment.",
    topic: "Business Automation",
    author: {
      name: "Mandela Atud",
      role: "Founder",
    },
    relatedSolution: {
      name: "Business Automation",
      href: "/solutions/business-automation",
    },
    status: "draft",
  },
  {
    slug: "when-custom-software-is-worth-the-investment",
    title: "When custom software is worth the investment",
    summary:
      "A balanced way to compare configuration, integration, modernization, and custom ownership against the advantage each option creates.",
    topic: "Custom Software",
    author: {
      name: "Mandela Atud",
      role: "Founder",
    },
    relatedSolution: {
      name: "Custom Software Development",
      href: "/solutions/custom-software-development",
    },
    status: "draft",
  },
] as const satisfies readonly InsightDefinition[];

export const isPublishedInsight = (
  insight: InsightDefinition,
): insight is PublishedInsightDefinition => insight.status === "published";

export const getPublishedInsights = (
  registry: readonly InsightDefinition[] = insights,
): readonly PublishedInsightDefinition[] =>
  registry.filter(isPublishedInsight);

export const publishedInsights = getPublishedInsights();

export const getPublishedInsight = (
  slug: string,
  registry: readonly InsightDefinition[] = insights,
): PublishedInsightDefinition | undefined =>
  getPublishedInsights(registry).find((insight) => insight.slug === slug);
