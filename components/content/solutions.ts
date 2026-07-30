export type SolutionSlug =
  | "ai"
  | "business-automation"
  | "custom-software-development"
  | "digital-business-systems"
  | "websites-web-applications"
  | "technology-consulting";

export type SolutionDefinition = {
  slug: SolutionSlug;
  name: string;
  navOutcome: string;
  problem: string;
  outcome: string;
  href: `/solutions/${SolutionSlug}`;
};

export const solutions: readonly SolutionDefinition[] = [
  {
    slug: "ai",
    name: "AI Solutions",
    navOutcome: "Apply AI where it improves real work.",
    problem: "A meaningful business problem may benefit from practical AI.",
    outcome: "Put AI to work on meaningful business problems.",
    href: "/solutions/ai",
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    navOutcome: "Reduce repetitive work with reliable workflows.",
    problem: "Routine work depends on constant manual effort.",
    outcome: "Make routine work move without constant manual effort.",
    href: "/solutions/business-automation",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    navOutcome: "Build software around a unique operation.",
    problem: "Generic software does not fit how the business works.",
    outcome: "Software designed around how your business actually works.",
    href: "/solutions/custom-software-development",
  },
  {
    slug: "digital-business-systems",
    name: "Digital Business Systems",
    navOutcome: "Connect the systems that support operations.",
    problem: "Tools and information are disconnected across the business.",
    outcome:
      "Connect the information, workflows, and tools that keep your business moving.",
    href: "/solutions/digital-business-systems",
  },
  {
    slug: "websites-web-applications",
    name: "Websites & Web Applications",
    navOutcome: "Create digital experiences that support business goals.",
    problem: "Customer-facing digital experiences are not helping the business move forward.",
    outcome: "Digital experiences that strengthen the business behind them.",
    href: "/solutions/websites-web-applications",
  },
  {
    slug: "technology-consulting",
    name: "Technology Consulting",
    navOutcome: "Make technology decisions with greater clarity.",
    problem: "Technology priorities and the right next step are unclear.",
    outcome: "Make technology decisions with greater clarity.",
    href: "/solutions/technology-consulting",
  },
];

export const solutionBySlug: Record<SolutionSlug, SolutionDefinition> =
  Object.fromEntries(solutions.map((solution) => [solution.slug, solution])) as Record<
    SolutionSlug,
    SolutionDefinition
  >;
