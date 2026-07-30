import type { SolutionSlug } from "./solutions";

export const homeOutcomes = [
  {
    title: "Grow more effectively",
    description:
      "Improve positioning, customer experiences, service capacity, and access to opportunity.",
  },
  {
    title: "Operate more efficiently",
    description:
      "Reduce repetitive work, improve information flow, and create reliable processes.",
  },
  {
    title: "Modernize with confidence",
    description:
      "Evaluate AI, replace limiting systems, and create an achievable technology roadmap.",
  },
] as const;

export const whyCobrykz = [
  {
    title: "Business-first strategy",
    description:
      "Every engagement begins with the business challenge and the improvement that matters.",
  },
  {
    title: "One connected partner",
    description:
      "Strategy, design, technology, and implementation stay connected from decision to delivery.",
  },
  {
    title: "Direct founder accountability",
    description:
      "Mandela Atud provides direct accountability for the thinking, decisions, and work.",
  },
  {
    title: "Clear decisions and communication",
    description:
      "Recommendations, tradeoffs, and progress remain clear throughout the work.",
  },
  {
    title: "Long-term value and maintainability",
    description:
      "Technology is designed to remain useful, understood, and adaptable after launch.",
  },
] as const;

export const aiPrinciples = [
  {
    title: "AI should improve real work",
    description:
      "Useful AI begins with a meaningful workflow, practical integration, and a clear business purpose.",
  },
  {
    title: "Human oversight remains essential",
    description:
      "Access controls, validation, monitoring, and failure handling keep AI use responsible and reliable.",
  },
  {
    title: "Where AI may not be the right answer",
    description:
      "Process redesign, automation, better information architecture, or conventional software may be more reliable.",
  },
] as const;

export type ChallengeRoute = {
  label: string;
  description: string;
  solutionSlug: SolutionSlug;
};

export const challengeRoutes: Record<SolutionSlug, ChallengeRoute> = {
  "business-automation": {
    label: "Repetitive work",
    description: "Reduce manual effort in recurring processes and workflows.",
    solutionSlug: "business-automation",
  },
  ai: {
    label: "Practical AI starting point",
    description: "Assess where AI can improve a focused business workflow.",
    solutionSlug: "ai",
  },
  "custom-software-development": {
    label: "Unsuitable generic software",
    description: "Build a tailored solution around a specific business operation.",
    solutionSlug: "custom-software-development",
  },
  "digital-business-systems": {
    label: "Disconnected tools and information",
    description: "Connect the people, tools, workflows, and information behind the work.",
    solutionSlug: "digital-business-systems",
  },
  "websites-web-applications": {
    label: "Weak customer-facing experience",
    description: "Strengthen the digital experience that supports customer action and service.",
    solutionSlug: "websites-web-applications",
  },
  "technology-consulting": {
    label: "Unclear technology priorities",
    description: "Clarify the opportunities, risks, and next technology decisions.",
    solutionSlug: "technology-consulting",
  },
};

export const processStages = [
  {
    title: "Discover",
    description: "Understand the business challenge, context, and desired outcome.",
  },
  {
    title: "Assess",
    description: "Identify the practical opportunities, constraints, and right approach.",
  },
  {
    title: "Design",
    description: "Shape a solution that fits the people, work, and systems involved.",
  },
  {
    title: "Build",
    description: "Develop the solution with clear decisions and responsible technical standards.",
  },
  {
    title: "Deploy",
    description: "Bring the solution into real use with adoption and operational readiness in mind.",
  },
  {
    title: "Optimize",
    description: "Improve the system as the business learns, changes, and grows.",
  },
] as const;

export const homeMessage = {
  headline: "Turn business challenges into better systems.",
  description:
    "Cobrykz helps businesses use AI, automation, custom software, websites, and connected digital systems to grow, work more efficiently, and create better experiences.",
} as const;
