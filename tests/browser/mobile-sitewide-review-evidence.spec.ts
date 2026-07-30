import { expect, test } from "@playwright/test";
import path from "node:path";

const screenshotRoutes = [
  { path: "/process", name: "process", mobileRoot: "[data-mobile-process]" },
  { path: "/about", name: "about", mobileRoot: "[data-mobile-about-page]" },
  {
    path: "/solutions/ai",
    name: "solution-ai",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/business-automation",
    name: "solution-business-automation",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/custom-software-development",
    name: "solution-custom-software-development",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/digital-business-systems",
    name: "solution-digital-business-systems",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/websites-web-applications",
    name: "solution-websites-web-applications",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/solutions/technology-consulting",
    name: "solution-technology-consulting",
    mobileRoot: "[data-mobile-solution-detail]",
  },
  {
    path: "/projects",
    name: "projects",
    mobileRoot: "[data-mobile-projects-index]",
  },
  {
    path: "/insights",
    name: "insights",
    mobileRoot: "[data-mobile-insights-index]",
  },
  {
    path: "/contact",
    name: "contact",
    mobileRoot: "[data-mobile-contact]",
  },
  {
    path: "/chaptered-atlas-missing-page",
    name: "not-found",
    mobileRoot: "[data-mobile-recovery='not-found']",
    recovery: true,
  },
] as const;

test("capture complete sitewide review evidence", async ({
  page,
}, testInfo) => {
  test.skip(
    process.env.CAPTURE_REVIEW !== "1",
    "Set CAPTURE_REVIEW=1 to refresh committed review evidence.",
  );

  const mobile = testInfo.project.name === "mobile-chrome";
  const mode = mobile ? "mobile" : "desktop";
  const suffix = mobile ? "390" : "1440";

  for (const route of screenshotRoutes) {
    const response = await page.goto(route.path, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe("recovery" in route ? 404 : 200);

    await page.waitForFunction(
      ({ selector, isMobile }) => {
        const composition = document.querySelector(selector);

        return isMobile ? Boolean(composition) : !composition;
      },
      {
        selector: route.mobileRoot,
        isMobile: mobile,
      },
    );
    await page.evaluate(() => document.fonts.ready);

    await page.screenshot({
      path: path.join(
        "docs",
        "reports",
        "assets",
        `2026-07-30-${mode}-${route.name}-${suffix}.png`,
      ),
      fullPage: true,
      animations: "disabled",
    });
  }
});
