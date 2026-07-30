import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const solutionRoutes = [
  "/solutions/ai",
  "/solutions/business-automation",
  "/solutions/custom-software-development",
  "/solutions/digital-business-systems",
  "/solutions/websites-web-applications",
  "/solutions/technology-consulting",
] as const;

async function waitForSolutionComposition(page: Page) {
  await page.waitForFunction(() => {
    const mobile = window.innerWidth <= 767;
    const mobileComposition = document.querySelector(
      "[data-mobile-solution-detail]",
    );

    return mobile ? Boolean(mobileComposition) : !mobileComposition;
  });
}

async function assertContainment(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
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
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.locator('script[type="application/ld+json"]'),
  ).toHaveCount(4);
}

for (const path of solutionRoutes) {
  test(`${path} preserves one complete responsive solution composition`, async ({
    page,
  }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await waitForSolutionComposition(page);
    await assertContainment(page);

    const isMobile = await page.evaluate(() => window.innerWidth <= 767);
    await expect(page.locator("[data-mobile-solution-detail]")).toHaveCount(
      isMobile ? 1 : 0,
    );
    await expect(page.locator("#solution-hero-heading")).toHaveCount(1);
    await expect(page.locator("#solution-final-cta-heading")).toHaveCount(1);

    if (!isMobile) {
      await expect(
        page.locator("[aria-label$=' operating model'] .system-atlas"),
      ).toHaveCount(1);
      return;
    }

    const atlasControls = page.locator(
      "#solution-operating-model .mobile-atlas__control",
    );
    await expect(atlasControls).toHaveCount(7);
    await atlasControls.last().click();
    await expect(atlasControls.last()).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(
      page.locator("#solution-operating-model .mobile-atlas__detail"),
    ).toBeVisible();

    const faqTriggers = page.locator(
      "#solution-faq .mobile-disclosure-trigger",
    );
    await expect(faqTriggers).toHaveCount(3);
    await faqTriggers.first().focus();
    await expect(faqTriggers.first()).toBeFocused();
    expect(
      await faqTriggers.first().evaluate((node) => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();

        return {
          focusVisible:
            style.outlineStyle !== "none" &&
            style.outlineWidth !== "0px",
          width: rect.width,
          height: rect.height,
        };
      }),
    ).toMatchObject({
      focusVisible: true,
    });
    const faqTarget = await faqTriggers.first().boundingBox();
    expect(faqTarget?.width).toBeGreaterThanOrEqual(44);
    expect(faqTarget?.height).toBeGreaterThanOrEqual(44);
    await faqTriggers.first().press("Enter");
    await expect(faqTriggers.first()).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    expect(
      await page.evaluate(() =>
        matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);
  });
}

test("solution family remains contained across breakpoint boundaries", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 430, 767, 768, 1440]) {
    await page.setViewportSize({
      width,
      height: width <= 767 ? 844 : 1000,
    });
    await page.goto("/solutions/ai", {
      waitUntil: "domcontentloaded",
    });
    await waitForSolutionComposition(page);
    await assertContainment(page);
    await expect(page.locator("[data-mobile-solution-detail]")).toHaveCount(
      width <= 767 ? 1 : 0,
    );
  }
});

test("workflow comparison exposes Before, After, and safeguards", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solutions/business-automation", {
    waitUntil: "domcontentloaded",
  });
  await waitForSolutionComposition(page);

  const artifact = page.locator("#solution-artifact");
  const workflowTriggers = artifact
    .getByRole("group", {
      name: "Before and after: a request and approval workflow",
    })
    .getByRole("button");
  await expect(workflowTriggers).toHaveText(["Before", "After"]);
  await workflowTriggers.nth(1).click();
  await expect(workflowTriggers.nth(1)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(
    artifact.locator(".mobile-solution-workflow__steps li"),
  ).toHaveCount(4);
  await expect(
    artifact
      .getByRole("group", { name: "Workflow safeguards" })
      .getByRole("button"),
  ).toHaveText(["Exception handling", "Human review"]);
});

test("system map keeps its center visible and reveals every relationship", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/solutions/digital-business-systems", {
    waitUntil: "domcontentloaded",
  });
  await waitForSolutionComposition(page);

  const artifact = page.locator("#solution-artifact");
  await expect(
    artifact.locator(".mobile-solution-system-map__center"),
  ).toHaveText("Connected operating environment");
  await expect(
    artifact
      .getByRole("group", {
        name: "The parts of a connected operating environment",
      })
      .getByRole("button"),
  ).toHaveText(["People", "Tools", "Workflows", "Information"]);
  await expect(
    artifact
      .getByRole("group", { name: "System distinctions" })
      .getByRole("button"),
  ).toHaveText([
    "Custom Software",
    "Digital Business Systems",
    "Business Automation",
  ]);
});

test("optional guidance appears only on the approved routes", async ({
  page,
}) => {
  for (const path of solutionRoutes) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await waitForSolutionComposition(page);

    await expect(page.locator("#solution-guidance")).toHaveCount(
      path === "/solutions/ai" ||
        path === "/solutions/custom-software-development"
        ? 1
        : 0,
    );
  }
});
