export type PublicationStatus = "draft" | "published";

export type VerifiedProjectOutcome = {
  result: string;
  evidence: string;
  verifiedAt?: string;
};

export type AuthorizedProjectQuote = {
  quote: string;
  attribution: string;
  role?: string;
  organization?: string;
  authorizationConfirmed: true;
};

export type ProjectDefinition = {
  slug: string;
  title: string;
  summary: string;
  status: PublicationStatus;
  context?: readonly string[];
  challenge?: readonly string[];
  strategy?: readonly string[];
  solution?: readonly string[];
  howItWorks?: readonly {
    title: string;
    description: string;
  }[];
  capabilities?: readonly {
    name: string;
    href?: `/solutions/${string}`;
  }[];
  implementation?: readonly string[];
  verifiedOutcomes?: readonly VerifiedProjectOutcome[];
  authorizedQuote?: AuthorizedProjectQuote;
  nextStage?: readonly string[];
  relatedContent?: readonly {
    title: string;
    href: `/${string}`;
  }[];
  metadata?: {
    title: string;
    description: string;
  };
};

export type PublishedProjectDefinition = ProjectDefinition & {
  status: "published";
};

export const projects = [] as const satisfies readonly ProjectDefinition[];

export const isPublishedProject = (
  project: ProjectDefinition,
): project is PublishedProjectDefinition => project.status === "published";

export const getPublishedProjects = (
  registry: readonly ProjectDefinition[] = projects,
): readonly PublishedProjectDefinition[] =>
  registry.filter(isPublishedProject);

export const publishedProjects = getPublishedProjects();

export const getPublishedProject = (
  slug: string,
  registry: readonly ProjectDefinition[] = projects,
): PublishedProjectDefinition | undefined =>
  getPublishedProjects(registry).find((project) => project.slug === slug);
