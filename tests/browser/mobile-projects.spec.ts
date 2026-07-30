import { expect, test } from "@playwright/test";

test("Projects preserves its honest publication state across responsive compositions", async ({
  page,
}) => {
  for (const width of [320, 390, 767, 768, 1440]) {
    await page.setViewportSize({
      width,
      height: width <= 767 ? 844 : 1000,
    });
    await page.goto("/projects", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => {
      const mobile = innerWidth <= 767;
      return mobile
        ? Boolean(document.querySelector("[data-mobile-projects-index]"))
        : !document.querySelector("[data-mobile-projects-index]");
    });

    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      )
      .toBe(true);
    expect(
      await page.locator("[id]").evaluateAll((nodes) => {
        const ids = nodes.map((node) => node.id);
        return ids.length === new Set(ids).size;
      }),
    ).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByText("No project case studies are published yet.")).toBeVisible();
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: "Discuss a business challenge" }),
    ).toBeVisible();
    await expect(
      page
        .locator("main")
        .getByRole("link", { name: "Explore our solutions" }),
    ).toBeVisible();
    await expect(page.locator('a[href^="/projects/"]')).toHaveCount(0);

    const isMobile = width <= 767;
    await expect(page.locator("[data-mobile-projects-index]")).toHaveCount(
      isMobile ? 1 : 0,
    );

    if (isMobile) {
      const evidenceControls = page.locator(
        "[data-mobile-projects-index] .mobile-disclosure-trigger",
      );
      await expect(evidenceControls).toHaveCount(6);
      for (let index = 0; index < 6; index += 1) {
        const control = evidenceControls.nth(index);
        if ((await control.getAttribute("aria-expanded")) !== "true") {
          await control.click();
        }
        await expect(control).toHaveAttribute("aria-expanded", "true");
        await expect(
          page.locator(
            "[data-mobile-projects-index] .mobile-disclosure-trigger[aria-expanded='true']",
          ),
        ).toHaveCount(1);
        const rect = await control.boundingBox();
        expect(rect?.height ?? 0).toBeGreaterThanOrEqual(44);
      }

      await evidenceControls.last().press("Tab");
      const focused = page.locator(":focus");
      await expect(focused).toBeVisible();
      expect(
        await focused.evaluate((node) => {
          const style = getComputedStyle(node);
          return (
            style.outlineStyle !== "none" &&
            style.outlineWidth !== "0px"
          );
        }),
      ).toBe(true);
    }

    expect(
      await page.evaluate(() =>
        matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);
  }
});
