import type { PublishedProjectDefinition } from "@/components/content/projects";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";
import DesktopProjectCaseStudy from "@/components/projects/DesktopProjectCaseStudy";
import MobileProjectCaseStudy from "@/components/projects/MobileProjectCaseStudy";

type ProjectCaseStudyProps = {
  project: PublishedProjectDefinition;
};

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  return (
    <ResponsivePageComposition
      mobile={<MobileProjectCaseStudy project={project} />}
      desktop={<DesktopProjectCaseStudy project={project} />}
    />
  );
}
