import type { PublishedInsightDefinition } from "@/components/content/insights";
import DesktopInsightArticle from "@/components/insights/DesktopInsightArticle";
import MobileInsightArticle from "@/components/insights/MobileInsightArticle";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";
import { serializeJsonLd, siteUrl } from "@/lib/seo/site";

type InsightArticleProps = {
  insight: PublishedInsightDefinition;
};

export default function InsightArticle({ insight }: InsightArticleProps) {
  const url = `${siteUrl}/insights/${insight.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.publishedAt,
    ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
    mainEntityOfPage: url,
    author: { "@type": "Person", name: insight.author.name },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: insight.title, item: url },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <ResponsivePageComposition
        mobile={<MobileInsightArticle insight={insight} />}
        desktop={<DesktopInsightArticle insight={insight} />}
      />
    </article>
  );
}
