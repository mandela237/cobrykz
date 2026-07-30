import type { Metadata as NextMetadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedProject,
  publishedProjects,
} from "@/components/content/projects";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";

type ProjectRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectRouteProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug, publishedProjects);

  if (!project) {
    notFound();
  }

  const title =
    project.metadata?.title ?? `${project.title} | Cobrykz Project`;
  const description = project.metadata?.description ?? project.summary;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
    },
    robots: {
      index: true,
      follow: true,
    },
  } satisfies NextMetadata;
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug, publishedProjects);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
