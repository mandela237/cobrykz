import type { Metadata } from "next";
import AboutPage from "@/components/company/AboutPage";
import { aboutPage } from "@/components/content/companyPages";

export const metadata: Metadata = aboutPage.metadata;

export default function AboutRoute() {
  return <AboutPage content={aboutPage} />;
}
