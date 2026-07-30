import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { primaryCta } from "../../components/content/site";
import {
  solutions,
  solutionBySlug,
  type SolutionPageDefinition,
} from "../../components/content/solutions";

async function waitForSolutionComposition(page: Page) {
  await page.waitForFunction(() => {
    const mobile = window.innerWidth <= 767;
    const mobileComposition = document.querySelector(
      "[data-mobile-solution-detail]",
    );

    return mobile ? Boolean(mobileComposition) : !mobileComposition;
  });
}

async function expectExactTextVisible(scope: Locator, text: string) {
  const matches = scope.getByText(text, { exact: true });

  await expect
    .poll(async () => {
      const count = await matches.count();

      for (let index = 0; index < count; index += 1) {
        if (await matches.nth(index).isVisible()) {
          return true;
        }
      }

      return false;
    })
    .toBe(true);
}

async function expectAllExactTextVisible(
  scope: Locator,
  values: readonly string[],
) {
  for (const value of values) {
    await expectExactTextVisible(scope, value);
  }
}

async function openControlledPanel(
  trigger: Locator,
  page: Page,
) {
  if ((await trigger.getAttribute("aria-expanded")) !== "true") {
    await trigger.click();
  }

  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const panelId = await trigger.getAttribute("aria-controls");
  expect(panelId).toBeTruthy();
  const panel = page.locator(`[id="${panelId}"]`);
  await expect(panel).toBeVisible();

  return panel;
}

async function assertSharedVisibleContent(
  page: Page,
  solution: SolutionPageDefinition,
) {
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: solution.outcome,
      exact: true,
    }),
  ).toBeVisible();
  await expectExactTextVisible(page.locator("#solution-hero, main"), solution.name);
  await expectExactTextVisible(
    page.locator("#solution-hero, main"),
    solution.heroSupport,
  );

  await expectAllExactTextVisible(
    page.locator("#solution-recognition, [aria-labelledby='solution-recognition-heading']"),
    [solution.problem, ...solution.recognition],
  );
  await expectAllExactTextVisible(
    page.locator("#solution-outcomes, [aria-labelledby='solution-outcomes-heading']"),
    solution.businessOutcomes,
  );
  await expectAllExactTextVisible(
    page.locator(
      "#solution-capabilities, [aria-labelledby='solution-capabilities-heading']",
    ),
    solution.deliverables,
  );
  await expectAllExactTextVisible(
    page.locator(
      "#solution-applications, [aria-labelledby='solution-applications-heading']",
    ),
    solution.applications,
  );

  const primaryLinks = page.locator("main").getByRole("link", {
    name: primaryCta.label,
    exact: true,
  });
  await expect(primaryLinks).toHaveCount(2);
  for (let index = 0; index < 2; index += 1) {
    await expect(primaryLinks.nth(index)).toBeVisible();
    await expect(primaryLinks.nth(index)).toHaveAttribute(
      "href",
      primaryCta.href,
    );
  }
  await expectExactTextVisible(
    page.locator("#solution-final-cta, [aria-labelledby='solution-final-cta-heading']"),
    solution.cta.title,
  );

  const relatedScope = page.locator(
    "#solution-related, [aria-labelledby='solution-related-heading']",
  );
  for (const slug of solution.relatedSlugs) {
    const related = solutionBySlug[slug];
    const link = relatedScope.getByRole("link", {
      name: new RegExp(related.name, "i"),
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", related.href);
    await expectExactTextVisible(link, related.name);
    await expectExactTextVisible(link, related.outcome);
  }
}

async function assertMobileProgressiveContent(
  page: Page,
  solution: SolutionPageDefinition,
) {
  const atlas = page.locator("#solution-operating-model");
  const operatingDefinition = page.locator(
    "#solution-operating-model .mobile-atlas",
  );
  await expect(operatingDefinition).toBeVisible();
  await expect(
    atlas.getByRole("button"),
  ).toHaveCount(7);

  const approach = page.locator("#solution-approach");
  const approachTriggers = approach.locator(".mobile-disclosure-trigger");
  await expect(approachTriggers).toHaveCount(solution.approach.length);
  for (let index = 0; index < solution.approach.length; index += 1) {
    const stage = solution.approach[index];
    await expectExactTextVisible(approachTriggers.nth(index), stage.title);
    const panel = await openControlledPanel(
      approachTriggers.nth(index),
      page,
    );
    await expectExactTextVisible(panel, stage.description);
  }

  const faqs = page.locator("#solution-faq");
  const faqTriggers = faqs.locator(".mobile-disclosure-trigger");
  await expect(faqTriggers).toHaveCount(solution.faqs.length);
  for (let index = 0; index < solution.faqs.length; index += 1) {
    const faq = solution.faqs[index];
    await expectExactTextVisible(faqTriggers.nth(index), faq.question);
    const panel = await openControlledPanel(faqTriggers.nth(index), page);
    await expectExactTextVisible(panel, faq.answer);
  }

  await expect(page.locator("#solution-guidance")).toHaveCount(
    solution.guidance ? 1 : 0,
  );
  if (solution.guidance) {
    await expectAllExactTextVisible(page.locator("#solution-guidance"), [
      solution.guidance.title,
      solution.guidance.description,
    ]);
  }

  await expect(page.locator("#solution-artifact")).toHaveCount(
    solution.artifact ? 1 : 0,
  );
  if (!solution.artifact) {
    return;
  }

  const artifactScope = page.locator("#solution-artifact");
  await expectAllExactTextVisible(artifactScope, [
    solution.artifact.eyebrow,
    solution.artifact.title,
    solution.artifact.description,
  ]);

  if (solution.artifact.kind === "workflow-comparison") {
    const workflowGroup = artifactScope.getByRole("group", {
      name: solution.artifact.title,
    });
    const workflowTriggers = workflowGroup.getByRole("button");
    const workflows = [solution.artifact.before, solution.artifact.after];

    for (let index = 0; index < workflows.length; index += 1) {
      const workflow = workflows[index];
      await expectExactTextVisible(workflowTriggers.nth(index), workflow.label);
      const panel = await openControlledPanel(
        workflowTriggers.nth(index),
        page,
      );
      await expectAllExactTextVisible(panel, workflow.steps);
    }

    const safeguardTriggers = artifactScope
      .getByRole("group", { name: "Workflow safeguards" })
      .getByRole("button");
    for (
      let index = 0;
      index < solution.artifact.safeguards.length;
      index += 1
    ) {
      const safeguard = solution.artifact.safeguards[index];
      await expectExactTextVisible(
        safeguardTriggers.nth(index),
        safeguard.title,
      );
      const panel = await openControlledPanel(
        safeguardTriggers.nth(index),
        page,
      );
      await expectExactTextVisible(panel, safeguard.description);
    }
  } else {
    await expectExactTextVisible(
      artifactScope,
      solution.artifact.centerLabel,
    );
    const elementTriggers = artifactScope
      .getByRole("group", { name: solution.artifact.title })
      .getByRole("button");
    for (
      let index = 0;
      index < solution.artifact.elements.length;
      index += 1
    ) {
      const element = solution.artifact.elements[index];
      await expectExactTextVisible(elementTriggers.nth(index), element.title);
      const panel = await openControlledPanel(
        elementTriggers.nth(index),
        page,
      );
      await expectExactTextVisible(panel, element.description);
    }

    const distinctionTriggers = artifactScope
      .getByRole("group", { name: "System distinctions" })
      .getByRole("button");
    for (
      let index = 0;
      index < solution.artifact.distinctions.length;
      index += 1
    ) {
      const distinction = solution.artifact.distinctions[index];
      await expectExactTextVisible(
        distinctionTriggers.nth(index),
        distinction.title,
      );
      const panel = await openControlledPanel(
        distinctionTriggers.nth(index),
        page,
      );
      await expectExactTextVisible(panel, distinction.description);
    }
  }
}

async function assertDesktopProgressiveContent(
  page: Page,
  solution: SolutionPageDefinition,
) {
  const operatingModel = page.locator(
    `[aria-label="${solution.name} operating model"]`,
  );
  await expect(operatingModel).toBeVisible();

  await expect(page.locator("#solution-guidance-heading")).toHaveCount(
    solution.guidance ? 1 : 0,
  );
  if (solution.guidance) {
    await expectAllExactTextVisible(
      page.locator("[aria-labelledby='solution-guidance-heading']"),
      [solution.guidance.title, solution.guidance.description],
    );
  }

  await expect(page.locator("#solution-artifact-heading")).toHaveCount(
    solution.artifact ? 1 : 0,
  );
  if (solution.artifact) {
    const artifactScope = page.locator(
      "[aria-labelledby='solution-artifact-heading']",
    );
    const artifactText =
      solution.artifact.kind === "workflow-comparison"
        ? [
            solution.artifact.eyebrow,
            solution.artifact.title,
            solution.artifact.description,
            solution.artifact.before.label,
            ...solution.artifact.before.steps,
            solution.artifact.after.label,
            ...solution.artifact.after.steps,
            ...solution.artifact.safeguards.flatMap((item) => [
              item.title,
              item.description,
            ]),
          ]
        : [
            solution.artifact.eyebrow,
            solution.artifact.title,
            solution.artifact.description,
            solution.artifact.centerLabel,
            ...solution.artifact.elements.flatMap((item) => [
              item.title,
              item.description,
            ]),
            ...solution.artifact.distinctions.flatMap((item) => [
              item.title,
              item.description,
            ]),
          ];
    await expectAllExactTextVisible(artifactScope, artifactText);
  }

  const approachScope = page.locator(
    "[aria-labelledby='solution-approach-heading']",
  );
  for (const stage of solution.approach) {
    await expectAllExactTextVisible(approachScope, [
      stage.title,
      stage.description,
    ]);
  }

  const faqScope = page.locator(
    "[aria-labelledby='solution-faq-heading']",
  );
  const details = faqScope.locator("details");
  await expect(details).toHaveCount(solution.faqs.length);
  for (let index = 0; index < solution.faqs.length; index += 1) {
    const faq = solution.faqs[index];
    const item = details.nth(index);
    await expectExactTextVisible(item.locator("summary"), faq.question);
    await item.locator("summary").click();
    await expectExactTextVisible(item, faq.answer);
  }
}

for (const solution of solutions) {
  test(`${solution.slug} renders every approved registry field in the active composition`, async ({
    page,
  }) => {
    await page.goto(solution.href, { waitUntil: "domcontentloaded" });
    await waitForSolutionComposition(page);
    await assertSharedVisibleContent(page, solution);

    if (await page.locator("[data-mobile-solution-detail]").count()) {
      await assertMobileProgressiveContent(page, solution);
    } else {
      await assertDesktopProgressiveContent(page, solution);
    }
  });
}
