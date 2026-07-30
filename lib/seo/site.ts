import type { Metadata } from "next";

export const siteUrl = "https://cobrykz.com";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}` | "/";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Cobrykz",
      title,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Cobrykz — Better systems. Stronger business." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Cobrykz",
  url: siteUrl,
  email: "info@cobrykz.com",
  slogan: "Better systems. Stronger business.",
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Cobrykz",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
} as const;

export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
