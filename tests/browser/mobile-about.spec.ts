import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function waitForAboutComposition(page: Page, mobile: boolean) {
  await page.waitForFunction(
    ({ expectedMobile }) =>
      Boolean(document.querySelector("[data-mobile-about-page]")) ===
      expectedMobile,
    { expectedMobile: mobile },
  );
}

async function assertContainedAndUnique(page: Page) {
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
}

for (const width of [320, 390, 767]) {
  test(`About uses one contained Chaptered Atlas composition at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await waitForAboutComposition(page, true);
    await assertContainedAndUnique(page);

    const mobile = page.locator("[data-mobile-about-page]");
    await expect(mobile).toHaveCount(1);
    await expect(mobile.locator("[data-mobile-chapter]")).toHaveCount(8);
    await expect(page.locator(".system-atlas")).toHaveCount(0);
    await expect(page.locator("main")).toHaveCount(1);
  });
}

for (const width of [768, 1440]) {
  test(`About preserves its frozen desktop composition at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await waitForAboutComposition(page, false);
    await assertContainedAndUnique(page);

    await expect(page.locator("[data-mobile-about-page]")).toHaveCount(0);
    await expect(
      page.locator('.system-atlas[data-atlas-id="connected-partner"]'),
    ).toHaveCount(1);

    const yPositions = await page
      .locator(
        "#about-hero, [aria-label='Why Cobrykz exists'], #about-purpose-heading, [aria-label='Company principles'], #about-partnership-heading, #about-leadership-heading, [aria-label='Company standards'], #about-cta",
      )
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getBoundingClientRect().top + scrollY),
      );
    expect(yPositions).toEqual([...yPositions].sort((a, b) => a - b));
  });
}

test("About disclosures are touch-first, exclusive, and keyboard visible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  await waitForAboutComposition(page, true);

  const principle = page.getByRole("button", {
    name: "Explain the decisions",
  });
  await principle.click();
  await expect(principle).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(
      "Make priorities, tradeoffs, ownership, risks, and next steps clear enough for responsible decisions.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start with the business" }),
  ).toHaveAttribute("aria-expanded", "false");

  const standard = page.getByRole("button", {
    name: "Connected execution",
  });
  await standard.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(standard).toBeFocused();
  expect(
    await standard.evaluate((node) => {
      const style = getComputedStyle(node);
      return (
        style.outlineStyle !== "none" &&
        Number.parseFloat(style.outlineWidth) > 0
      );
    }),
  ).toBe(true);

  for (const button of await page
    .locator(
      "[data-mobile-about-page] .mobile-disclosure-trigger, [data-mobile-about-page] .mobile-atlas__control",
    )
    .all()) {
    const box = await button.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("About partnership Atlas selects every operating node accessibly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  await waitForAboutComposition(page, true);

  const atlas = page.locator("#about-partnership .mobile-atlas");
  await expect(atlas.locator(".mobile-atlas__control")).toHaveCount(9);
  await expect(
    atlas.getByRole("button", {
      name: "Cobrykz accountability",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");

  const improvement = atlas.getByRole("button", {
    name: "Improvement",
    exact: true,
  });
  await improvement.click();
  await expect(improvement).toHaveAttribute("aria-pressed", "true");
  await expect(
    atlas.getByText("Continued operating value.", { exact: true }),
  ).toBeVisible();
  await expect(
    atlas.locator(".mobile-atlas__caption"),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
});

test("About founder identity remains immediately visible on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  await waitForAboutComposition(page, true);

  const leadership = page.locator("#about-leadership");
  await expect(leadership.getByText("Founder-led accountability")).toBeVisible();
  await expect(
    leadership.getByText("Mandela Atud", { exact: true }),
  ).toBeVisible();
  await expect(
    leadership.locator(".mobile-about-leadership__portrait figcaption"),
  ).toHaveText("Founder");
  const portrait = leadership.getByRole("img", {
    name: "Mandela Atud, Founder",
  });
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
});
