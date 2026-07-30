import { expect, test } from "@playwright/test";
import type { ConsoleMessage, Page } from "@playwright/test";

const breakpoints = [320, 375, 390, 430, 767, 768, 1440] as const;

const publicRoutes = [
  { path: "/", mobileRoot: "[data-mobile-homepage]" },
  { path: "/solutions", mobileRoot: "[data-mobile-solutions-hub]" },
  { path: "/process", mobileRoot: "[data-mobile-process]" },
  { path: "/about", mobileRoot: "[data-mobile-about-page]" },
  {
    path: "/solutions/ai",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/business-automation",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/custom-software-development",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/digital-business-systems",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/websites-web-applications",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/technology-consulting",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  { path: "/projects", mobileRoot: "[data-mobile-projects-index]" },
  { path: "/insights", mobileRoot: "[data-mobile-insights-index]" },
  { path: "/contact", mobileRoot: "[data-mobile-contact]" },
  {
    path: "/chaptered-atlas-missing-page",
    mobileRoot: "[data-mobile-recovery='not-found']",
    recovery: true,
  },
] as const;

const liveInternalRoutes = publicRoutes
  .filter((route) => !("recovery" in route))
  .map((route) => route.path);

type LayoutShiftWindow = Window & {
  __cobrykzLayoutShift?: number;
};

function consoleErrorText(message: ConsoleMessage) {
  return `${message.type()}: ${message.text()}`;
}

async function installLayoutShiftObserver(page: Page) {
  await page.addInitScript(() => {
    const target = window as LayoutShiftWindow;
    target.__cobrykzLayoutShift = 0;

    if (!("PerformanceObserver" in window)) {
      return;
    }

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };

        if (!shift.hadRecentInput) {
          target.__cobrykzLayoutShift =
            (target.__cobrykzLayoutShift ?? 0) + (shift.value ?? 0);
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
}

async function waitForActiveComposition(
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
  await page.evaluate(() => document.fonts.ready);
}

async function assertUniqueIds(page: Page) {
  expect(
    await page.locator("[id]").evaluateAll((nodes) => {
      const ids = nodes.map((node) => node.id);
      return ids.length === new Set(ids).size;
    }),
  ).toBe(true);
}

async function assertNoOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
}

async function assertTouchControls(page: Page) {
  const undersized = await page
    .locator(
      "main button, main summary, main input:not([type='hidden']), main select, main textarea, [data-mobile-navigation] button",
    )
    .evaluateAll((nodes) =>
      nodes.flatMap((node) => {
        const element = node as HTMLElement;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const visible =
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0;

        if (!visible || (rect.width >= 44 && rect.height >= 44)) {
          return [];
        }

        if (element.closest("[aria-hidden='true']")) {
          return [];
        }

        return [
          {
            label:
              element.getAttribute("aria-label") ??
              element.textContent?.trim().slice(0, 80) ??
              element.tagName,
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
          },
        ];
      }),
    );

  expect(undersized).toEqual([]);
}

async function assertKeyboardFocus(page: Page) {
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  await page.keyboard.press("Tab");

  const focused = page.locator(":focus");
  await expect(focused).not.toHaveCount(0);
  expect(
    await focused.evaluate((node) => {
      const style = getComputedStyle(node);
      return (
        style.outlineStyle !== "none" &&
        style.outlineWidth !== "0px" &&
        style.outlineColor !== "rgba(0, 0, 0, 0)"
      );
    }),
  ).toBe(true);
}

async function assertInternalLinkContracts(page: Page) {
  const invalidLinks = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links.flatMap((link) => {
        const href = link.getAttribute("href") ?? "";

        if (
          href.startsWith("/") ||
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("https://")
        ) {
          return [];
        }

        return [href];
      }),
    );

  expect(invalidLinks).toEqual([]);
}

for (const route of publicRoutes) {
  test(`${route.path} passes the complete sitewide responsive contract`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "One exhaustive breakpoint pass is sufficient.",
    );

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(consoleErrorText(message));
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await installLayoutShiftObserver(page);

    for (const width of breakpoints) {
      await page.setViewportSize({
        width,
        height: width <= 767 ? 844 : 1000,
      });

      const response = await page.goto(route.path, {
        waitUntil: "domcontentloaded",
      });
      expect(response).not.toBeNull();
      expect(response?.status()).toBe("recovery" in route ? 404 : 200);

      await waitForActiveComposition(page, route.mobileRoot);

      await expect(page.locator("header.sticky")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("footer.site-footer")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1, h2, h3, h4").first()).toHaveJSProperty(
        "tagName",
        "H1",
      );
      await assertUniqueIds(page);
      await assertNoOverflow(page);
      await assertInternalLinkContracts(page);

      expect(
        await page.evaluate(() =>
          matchMedia("(prefers-reduced-motion: reduce)").matches,
        ),
      ).toBe(true);

      const isMobile = width <= 767;
      await expect(page.locator(route.mobileRoot)).toHaveCount(
        isMobile ? 1 : 0,
      );

      if (isMobile) {
        await assertTouchControls(page);
      }

      if (width === 390) {
        await assertKeyboardFocus(page);
      }

      const layoutShift = await page.evaluate(
        () => (window as LayoutShiftWindow).__cobrykzLayoutShift ?? 0,
      );
      expect(layoutShift).toBeLessThanOrEqual(0.25);
    }

    const actionableConsoleErrors =
      "recovery" in route
        ? consoleErrors.filter(
            (message) =>
              !message.includes(
                "Failed to load resource: the server responded with a status of 404",
              ),
          )
        : consoleErrors;

    expect(actionableConsoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

test("all linked public destinations return a successful document", async ({
  request,
}) => {
  for (const path of liveInternalRoutes) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});
