import { expect, test } from "@playwright/test";

test("Insights preserves its honest preparation state across responsive compositions", async ({ page }) => {
  for (const width of [320, 390, 767, 768, 1440]) {
    await page.setViewportSize({ width, height: width <= 767 ? 844 : 1000 });
    await page.goto("/insights", { waitUntil: "domcontentloaded" });
    const isMobile = width <= 767;
    await expect(page.locator("[data-mobile-insights-index]")).toHaveCount(isMobile ? 1 : 0);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByText("Insights are being prepared.")).toBeVisible();
    await expect(page.locator("main").getByRole("link", { name: "Discuss a business challenge" })).toBeVisible();
    await expect(page.locator("main").getByRole("link", { name: "Explore our solutions" })).toBeVisible();
    await expect(page.locator('main a[href^="/insights/"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator("[id]").evaluateAll((nodes) => {
      const ids = nodes.map((node) => node.id);
      return ids.length === new Set(ids).size;
    })).toBe(true);
    if (isMobile) {
      await expect(page.locator(".mobile-insights-method li")).toHaveCount(4);
      for (const link of await page.locator("main a").all()) {
        const box = await link.boundingBox();
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      }
    }
  }
});
