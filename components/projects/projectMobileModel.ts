import type { PublishedProjectDefinition } from "@/components/content/projects";

export type ProjectMobileChapterField =
  | "context"
  | "challenge"
  | "strategy"
  | "solution"
  | "howItWorks"
  | "capabilities"
  | "implementation"
  | "verifiedOutcomes"
  | "authorizedQuote"
  | "nextStage"
  | "relatedContent";

export type ProjectMobileChapter = {
  field: ProjectMobileChapterField;
  id: `project-${string}`;
  label: string;
};

const chapterDefinitions = [
  {
    field: "context",
    id: "project-context",
    label: "Business context",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.context?.length),
  },
  {
    field: "challenge",
    id: "project-challenge",
    label: "Challenge",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.challenge?.length),
  },
  {
    field: "strategy",
    id: "project-strategy",
    label: "Assessment and strategy",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.strategy?.length),
  },
  {
    field: "solution",
    id: "project-solution",
    label: "Solution",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.solution?.length),
  },
  {
    field: "howItWorks",
    id: "project-how",
    label: "How it works",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.howItWorks?.length),
  },
  {
    field: "capabilities",
    id: "project-capabilities",
    label: "Capabilities combined",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.capabilities?.length),
  },
  {
    field: "implementation",
    id: "project-implementation",
    label: "Implementation and partnership",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.implementation?.length),
  },
  {
    field: "verifiedOutcomes",
    id: "project-outcomes",
    label: "Verified outcomes",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.verifiedOutcomes?.length),
  },
  {
    field: "authorizedQuote",
    id: "project-perspective",
    label: "Authorized client perspective",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.authorizedQuote),
  },
  {
    field: "nextStage",
    id: "project-next-stage",
    label: "Next stage",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.nextStage?.length),
  },
  {
    field: "relatedContent",
    id: "project-related",
    label: "Related content",
    present: (project: PublishedProjectDefinition) =>
      Boolean(project.relatedContent?.length),
  },
] as const satisfies readonly (ProjectMobileChapter & {
  present: (project: PublishedProjectDefinition) => boolean;
})[];

export const getProjectMobileChapters = (
  project: PublishedProjectDefinition,
): readonly ProjectMobileChapter[] =>
  chapterDefinitions
    .filter((chapter) => chapter.present(project))
    .map(({ field, id, label }) => ({ field, id, label }));

export const getProjectTransformationStages = (
  project: PublishedProjectDefinition,
) =>
  [
    {
      label: "Condition",
      present: Boolean(project.context?.length || project.challenge?.length),
    },
    {
      label: "Decision",
      present: Boolean(project.strategy?.length),
    },
    {
      label: "Response",
      present: Boolean(project.solution?.length || project.howItWorks?.length),
    },
    {
      label: "Implementation",
      present: Boolean(project.implementation?.length),
    },
    {
      label: "Verified change",
      present: Boolean(project.verifiedOutcomes?.length),
    },
    {
      label: "Next stage",
      present: Boolean(project.nextStage?.length),
    },
  ].filter((stage) => stage.present);
