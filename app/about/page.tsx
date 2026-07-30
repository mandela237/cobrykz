import type { Metadata } from "next";
import AboutPage from "@/components/company/AboutPage";
import MobileAboutPage from "@/components/company/MobileAboutPage";
import { aboutPage } from "@/components/content/companyPages";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";

export const metadata: Metadata = aboutPage.metadata;

export default function AboutRoute() {
  return (
    <ResponsivePageComposition
      mobile={<MobileAboutPage content={aboutPage} />}
      desktop={<AboutPage content={aboutPage} />}
    />
  );
}
