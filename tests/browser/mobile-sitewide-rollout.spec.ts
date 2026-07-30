import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const approvedPrototypeRoutes = [
  {
    path: "/",
    mobileRoot: "[data-mobile-homepage]",
  },
  {
    path: "/solutions",
    mobileRoot: "[data-mobile-solutions-hub]",
  },
] as const;

async function waitForResponsiveComposition(
  page: Page,
  mobileRoot: string,
) {
  await page.waitForFunction(
    (selector) => {
      const mobile = window.innerWidth <= 767;
      const mobileComposition = document.querySelector(selector);

      return mobile ? Boolean(mobileComposition) : !mobileComposition;
    },
    mobileRoot,
  );
}

async function assertPageContainment(page: Page) {
  await expect.poll(() =>
    page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);

  expect(
    await page.locator("[id]").evaluateAll((nodes) => {
      const ids = nodes.map((node) => node.id);
      return ids.length === new Set(ids).size;
    }),
  ).toBe(true);

  await expect(page.locator("main")).toHaveCount(1);
}

for (const route of approvedPrototypeRoutes) {
  test(`${route.path} selects one contained responsive composition`, async ({
    page,
  }) => {
    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await waitForResponsiveComposition(page, route.mobileRoot);
    await assertPageContainment(page);

    const isMobile = await page.evaluate(() => innerWidth <= 767);
    await expect(page.locator(route.mobileRoot)).toHaveCount(
      isMobile ? 1 : 0,
    );
  });
}

test("Process recomposes into one accessible delivery sequence", async ({
  page,
}) => {
  for (const width of [320, 390, 767, 768, 1440]) {
    await page.setViewportSize({ width, height: width <= 767 ? 844 : 1000 });
    await page.goto("/process", { waitUntil: "domcontentloaded" });
    await waitForResponsiveComposition(page, "[data-mobile-process]");
    await assertPageContainment(page);

    const isMobile = width <= 767;
    await expect(page.locator("[data-mobile-process]")).toHaveCount(
      isMobile ? 1 : 0,
    );
    await expect(page.locator("#process-hero")).toHaveCount(1);
    await expect(page.locator("#process-cta")).toHaveCount(1);

    if (!isMobile) {
      const desktopSequence = await page
        .locator(
          "#process-hero, .delivery-rail, [aria-labelledby='process-scaling-heading'], [aria-label='How the work stays accountable'], [aria-labelledby='process-post-launch-heading'], #process-cta",
        )
        .evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
      expect(desktopSequence).toEqual(
        [...desktopSequence].sort((a, b) => a - b),
      );
      continue;
    }

    const stageTriggers = page.locator(".mobile-process-rail__trigger");
    await expect(stageTriggers).toHaveCount(6);
    await expect(page.locator("[data-process-decision-gate]")).toHaveCount(2);

    const touchTargets = await stageTriggers.evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }),
    );
    for (const target of touchTargets) {
      expect(target.width).toBeGreaterThanOrEqual(44);
      expect(target.height).toBeGreaterThanOrEqual(44);
    }

    for (let index = 0; index < 6; index += 1) {
      const trigger = stageTriggers.nth(index);
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.locator(".mobile-process-rail__trigger[aria-expanded='true']"),
      ).toHaveCount(1);
      const panelId = await trigger.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      await expect(page.locator(`#${panelId}`)).toBeVisible();
    }

    await stageTriggers.first().click();
    await page.keyboard.press("Tab");
    await expect(stageTriggers.nth(1)).toBeFocused();
    expect(
      await stageTriggers.nth(1).evaluate((node) => {
        const style = getComputedStyle(node);
        return style.outlineStyle !== "none" && style.outlineWidth !== "0px";
      }),
    ).toBe(true);

    expect(
      await page.evaluate(() =>
        matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);
  }
});
