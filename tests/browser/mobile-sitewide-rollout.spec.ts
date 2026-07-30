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
