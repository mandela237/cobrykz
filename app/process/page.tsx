import type { Metadata } from "next";
import MobileProcessPage from "@/components/company/MobileProcessPage";
import ProcessPage from "@/components/company/ProcessPage";
import { processPage } from "@/components/content/companyPages";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";

export const metadata: Metadata = processPage.metadata;

export default function ProcessRoute() {
  return (
    <ResponsivePageComposition
      mobile={<MobileProcessPage content={processPage} />}
      desktop={<ProcessPage content={processPage} />}
    />
  );
}
