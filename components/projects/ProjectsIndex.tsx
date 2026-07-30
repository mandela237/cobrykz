import type { PublishedProjectDefinition } from "@/components/content/projects";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";
import DesktopProjectsIndex from "@/components/projects/DesktopProjectsIndex";
import MobileProjectsIndex from "@/components/projects/MobileProjectsIndex";

type ProjectsIndexProps = {
  projects: readonly PublishedProjectDefinition[];
};

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  return (
    <ResponsivePageComposition
      mobile={<MobileProjectsIndex projects={projects} />}
      desktop={<DesktopProjectsIndex projects={projects} />}
    />
  );
}
