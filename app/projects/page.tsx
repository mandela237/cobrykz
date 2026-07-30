import type { Metadata } from "next";
import { publishedProjects } from "@/components/content/projects";
import ProjectsIndex from "@/components/projects/ProjectsIndex";

const description =
  "Cobrykz project case studies will be published here only when business context, delivery decisions, and verified outcomes are approved.";

export const metadata: Metadata = {
  title: "Projects | Cobrykz",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    title: "Projects | Cobrykz",
    description,
    url: "/projects",
  },
  robots: {
    index: publishedProjects.length > 0,
    follow: true,
  },
};

export default function ProjectsRoute() {
  return <ProjectsIndex projects={publishedProjects} />;
}
