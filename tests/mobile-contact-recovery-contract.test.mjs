import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => {
  const filePath = join(root, path);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
};

test("preserves the frozen desktop Contact composition verbatim", () => {
  const desktop = read("components/contact/DesktopContactPage.tsx");
  const order = [
    "contactPage.headline",
    "contactPage.support",
    'id="contact-form-heading"',
    "contactPage.responseExpectation",
    "mailto:info@cobrykz.com",
    "<InquiryPath",
    "<ContactForm",
  ];

  assert.doesNotMatch(desktop, /["']use client["']/);
  assert.equal((desktop.match(/<h1\b/g) || []).length, 1);

  let previousIndex = -1;
  for (const token of order) {
    const tokenIndex = desktop.indexOf(token);
    assert.ok(
      tokenIndex > previousIndex,
      `${token} must remain in frozen desktop order`,
    );
    previousIndex = tokenIndex;
  }
});

test("selects one Contact composition without changing metadata", () => {
  const page = read("app/contact/page.tsx");

  assert.match(page, /title:\s*contactPage\.metadata\.title/);
  assert.match(page, /description:\s*contactPage\.metadata\.description/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/contact"\s*\}/);
  assert.match(
    page,
    /<ResponsivePageComposition[\s\S]*mobile=\{<MobileContactPage content=\{contactPage\} \/>\}[\s\S]*desktop=\{<DesktopContactPage content=\{contactPage\} \/>\}/,
  );
  assert.doesNotMatch(page, /["']use client["']/);
});

test("builds the mobile Contact page from the frozen definition", () => {
  const mobile = read("components/contact/MobileContactPage.tsx");

  for (const field of [
    "content.headline",
    "content.support",
    "content.responseExpectation",
    "content.email",
  ]) {
    assert.match(mobile, new RegExp(field.replaceAll(".", "\\.")));
  }

  assert.match(mobile, /content: typeof contactPage/);
  assert.match(mobile, /data-mobile-contact/);
  assert.match(mobile, /inquirySteps\.map/);
  assert.match(mobile, /<ContactForm\s*\/>/);
  assert.equal(
    (mobile.match(/<ContactForm\s*\/>/g) || []).length,
    1,
    "the mobile composition must retain exactly one form",
  );
  assert.match(mobile, /id="contact-form-heading"/);
  assert.match(mobile, /href=\{`mailto:\$\{content\.email\}`\}/);
  assert.doesNotMatch(mobile, /["']use client["']|useState|currentStep|nextStep/);
});

test("keeps the Contact form payload, fields, and options unchanged", () => {
  const form = read("components/contact/ContactForm.tsx");

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
    assert.match(form, new RegExp(`name=["']${name}["']|name=\\{["']${name}["']\\}`));
  }

  assert.match(form, /Object\.fromEntries\(new FormData\(form\)\.entries\(\)\)/);
  assert.match(form, /startedAt:\s*startedAt\.current/);
  assert.match(form, /contactPage\.solutionOptions\.map/);
  assert.match(form, /contactPage\.timingOptions\.map/);
  assert.match(form, /contactPage\.contactMethodOptions\.map/);
  assert.match(form, /data-contact-form/);
  assert.match(form, /data-contact-error-summary/);
  assert.match(form, /data-contact-success/);
  assert.match(form, /contact-form-control/);
  assert.match(form, /contact-form-fields/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /role="alert"/);
  assert.doesNotMatch(form, /currentStep|stepIndex|nextStep|previousStep/);
});

test("keeps the inquiry sequence shared across desktop and mobile", () => {
  const path = read("components/contact/InquiryPath.tsx");

  assert.match(path, /export const inquirySteps = \[/);
  for (const step of [
    "Business challenge received",
    "Context reviewed",
    "Initial fit and questions identified",
    "Conversation arranged",
    "Appropriate next step defined",
  ]) {
    assert.match(path, new RegExp(step));
  }
  assert.match(path, /inquirySteps\.map/);
});

test("gives 404 one runtime-selected recovery composition with exact actions", () => {
  const notFound = read("app/not-found.tsx");

  assert.match(notFound, /<ResponsivePageComposition/);
  assert.match(notFound, /data-mobile-recovery="not-found"/);
  assert.equal((notFound.match(/<h1\b/g) || []).length, 2);
  assert.equal(
    (notFound.match(/This path does not lead to an active Cobrykz page\./g) || [])
      .length,
    2,
  );
  assert.equal(
    (notFound.match(/Discuss a business challenge/g) || []).length,
    2,
  );
  assert.equal((notFound.match(/Explore solutions/g) || []).length, 2);
  assert.equal((notFound.match(/href="\/contact"/g) || []).length, 2);
  assert.equal((notFound.match(/href="\/solutions"/g) || []).length, 2);
});

test("keeps global-error recoverable with an intentional mobile frame", () => {
  const error = read("app/global-error.tsx");

  assert.match(error, /["']use client["']/);
  assert.match(error, /<ResponsivePageComposition/);
  assert.match(error, /data-mobile-recovery="global-error"/);
  assert.match(error, /<html lang="en">/);
  assert.match(error, /<body>/);
  assert.equal((error.match(/<h1\b/g) || []).length, 2);
  assert.equal(
    (error.match(/The page could not be completed\./g) || []).length,
    2,
  );
  assert.equal((error.match(/onClick=\{\(\) => reset\(\)\}/g) || []).length, 2);
  assert.equal((error.match(/Try again/g) || []).length, 2);
  assert.equal((error.match(/Return home/g) || []).length, 2);
  assert.equal((error.match(/href="\/"/g) || []).length, 2);
});

test("adds mobile-only Contact and recovery craft without concealing overflow", () => {
  const css = read("app/globals.css");

  assert.match(
    css,
    /@media \(max-width:\s*767px\)[\s\S]*?\[data-mobile-contact\]\s*\{/,
  );
  assert.match(css, /\.mobile-contact-inquiry-rail\s*\{/);
  assert.match(css, /\.mobile-contact-form-frame\s*\{/);
  assert.match(
    css,
    /\[data-mobile-contact\]\s+\.contact-form-control:focus-visible\s*\{/,
  );
  assert.match(css, /\[data-mobile-recovery\]\s*\{/);
  assert.doesNotMatch(
    css,
    /\[data-mobile-contact\]\s*\{[^}]*overflow-x:\s*(?:hidden|clip)/s,
  );
});
