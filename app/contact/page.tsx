import type { Metadata } from "next";
import { contactPage } from "@/components/content/contact";
import DesktopContactPage from "@/components/contact/DesktopContactPage";
import MobileContactPage from "@/components/contact/MobileContactPage";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";

export const metadata: Metadata = {
  title: contactPage.metadata.title,
  description: contactPage.metadata.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: contactPage.metadata.title,
    description: contactPage.metadata.description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <ResponsivePageComposition
      mobile={<MobileContactPage content={contactPage} />}
      desktop={<DesktopContactPage content={contactPage} />}
    />
  );
}
