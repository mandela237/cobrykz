import type { Metadata } from "next";
import ProcessPage from "@/components/company/ProcessPage";
import { processPage } from "@/components/content/companyPages";

export const metadata: Metadata = processPage.metadata;

export default function ProcessRoute() {
  return <ProcessPage content={processPage} />;
}
