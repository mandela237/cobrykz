import type { PublishedInsightDefinition } from "@/components/content/insights";
import DesktopInsightsIndex from "@/components/insights/DesktopInsightsIndex";
import MobileInsightsIndex from "@/components/insights/MobileInsightsIndex";
import ResponsivePageComposition from "@/components/mobile/ResponsivePageComposition";

type InsightsIndexProps = {
  insights: readonly PublishedInsightDefinition[];
};

export default function InsightsIndex({ insights }: InsightsIndexProps) {
  return (
    <ResponsivePageComposition
      mobile={<MobileInsightsIndex insights={insights} />}
      desktop={<DesktopInsightsIndex insights={insights} />}
    />
  );
}
