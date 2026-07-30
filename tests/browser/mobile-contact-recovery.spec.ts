import { expect, test } from "@playwright/test";

test("Contact selects one composition and preserves the complete form", async ({
  page,
}, testInfo) => {
  await page.goto("/contact");

  const mobile = testInfo.project.name === "mobile-chrome";
  await expect(page.locator("[data-mobile-contact]")).toHaveCount(mobile ? 1 : 0);
  await expect(page.locator("[data-contact-form]")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

  for (const name of [
    "name",
    "email",
    "company",
    "solution",
    "timing",
    "contactMethod",
    "challenge",
    "website",
  ]) {
    await expect(page.locator(`[name="${name}"]`)).toHaveCount(1);
  }

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("Contact exposes validation, server, network, and success states", async ({
  page,
}) => {
  await page.goto("/contact");

  await page.route("**/api/contact", async (route) => {
    const body = route.request().postDataJSON() as { name?: string };

    if (body.name === "Network") {
      await route.abort();
      return;
    }

    if (body.name === "Server") {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          delivered: false,
          message: "Your inquiry was not delivered. Please try again.",
        }),
      });
      return;
    }

    if (!body.name) {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          delivered: false,
          message: "Please review the highlighted fields.",
          errors: { name: "Enter your name." },
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ delivered: true }),
    });
  });

  const submit = page.getByRole("button", {
    name: "Discuss a business challenge",
  });
  await submit.click();
  await expect(page.locator("[data-contact-error-summary]")).toBeFocused();

  const fillRequired = async (name: string) => {
    await page.getByLabel("Name").fill(name);
    await page.getByLabel("Work email").fill("hello@example.com");
    await page.getByLabel("Company").fill("Example");
    await page.getByLabel("Business challenge").fill("Improve operations.");
  };

  await fillRequired("Server");
  await submit.click();
  await expect(page.locator("[data-contact-error-summary]")).toBeVisible();

  await fillRequired("Network");
  await submit.click();
  await expect(page.locator("[data-contact-error-summary]")).toContainText(
    "email info@cobrykz.com",
  );

  await fillRequired("Success");
  await submit.click();
  await expect(page.locator("[data-contact-success]")).toBeVisible();
});

test("404 keeps exact recovery routes in the shared shell", async ({ page }) => {
  await page.goto("/missing-mobile-recovery-route");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "This path does not lead to an active Cobrykz page.",
    }),
  ).toBeVisible();
  const main = page.getByRole("main");
  await expect(
    main.getByRole("link", { name: "Discuss a business challenge" }),
  ).toHaveAttribute("href", "/contact");
  await expect(main.getByRole("link", { name: "Explore solutions" })).toHaveAttribute(
    "href",
    "/solutions",
  );
  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
});
