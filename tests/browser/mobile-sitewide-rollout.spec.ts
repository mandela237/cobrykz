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
    const gatePlacement = await page
      .locator(".mobile-process-rail")
      .evaluate((rail) =>
        Array.from(rail.children).map((stage) => ({
          stageId: stage.id,
          gateId:
            stage.querySelector("[data-process-decision-gate]")?.id ?? null,
        })),
      );
    expect(gatePlacement).toEqual([
      { stageId: "process-discover", gateId: null },
      {
        stageId: "process-assess",
        gateId: "process-gate-assess-design",
      },
      { stageId: "process-design", gateId: null },
      {
        stageId: "process-build",
        gateId: "process-gate-build-deploy",
      },
      { stageId: "process-deploy", gateId: null },
      { stageId: "process-optimize", gateId: null },
    ]);

    const gates = page.locator("[data-process-decision-gate]");
    await expect(gates).toHaveCount(2);
    await expect(gates.nth(0)).toContainText("Choose the responsible direction");
    await expect(gates.nth(0)).toContainText(
      "Is the recommended opportunity valuable, achievable, and responsible enough to design?",
    );
    await expect(gates.nth(0).locator("li")).toHaveText([
      "Expected business value",
      "Readiness and feasibility",
      "Material risks and safeguards",
      "Clear scope, ownership, and next decision",
    ]);
    await expect(gates.nth(1)).toContainText("Confirm operational readiness");
    await expect(gates.nth(1)).toContainText(
      "Is the working solution ready to become part of real operations?",
    );
    await expect(gates.nth(1).locator("li")).toHaveText([
      "Validated behavior and quality",
      "Security, access, integration, and recovery readiness",
      "Named operational ownership",
      "Adoption, support, and change readiness",
    ]);

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
      if ((await trigger.getAttribute("aria-expanded")) !== "true") {
        await trigger.click();
      }
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(
        page.locator(".mobile-process-rail__trigger[aria-expanded='true']"),
      ).toHaveCount(1);
      const panelId = await trigger.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      await expect(page.locator(`#${panelId}`)).toBeVisible();
    }

    await stageTriggers.first().click();
    await expect(stageTriggers.first()).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await stageTriggers.first().click();
    await expect(stageTriggers.first()).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await expect(
      page.locator(".mobile-process-rail__trigger[aria-expanded='true']"),
    ).toHaveCount(0);
    const firstPanelId = await stageTriggers.first().getAttribute("aria-controls");
    expect(firstPanelId).toBeTruthy();
    await expect(page.locator(`#${firstPanelId}`)).toBeHidden();

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
