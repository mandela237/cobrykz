import { notFound } from "next/navigation";
import {
  getPublishedInsight,
  publishedInsights,
} from "@/components/content/insights";
import InsightArticle from "@/components/insights/InsightArticle";

type InsightRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedInsights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightRouteProps) {
  const { slug } = await params;
  const insight = getPublishedInsight(slug, publishedInsights);

  if (!insight) {
    notFound();
  }

  const title = insight.metadata?.title ?? `${insight.title} | Cobrykz`;
  const description = insight.metadata?.description ?? insight.summary;
  const url = `/insights/${insight.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
      authors: [insight.author.name],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function InsightRoute({ params }: InsightRouteProps) {
  const { slug } = await params;
  const insight = getPublishedInsight(slug, publishedInsights);

  if (!insight) {
    notFound();
  }

  return <InsightArticle insight={insight} />;
}
