import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("validates the approved inquiry fields without requesting budget", () => {
  const source = read("lib/contact/validation.ts");
  for (const field of ["name", "email", "company", "challenge"]) {
    assert.match(source, new RegExp(`\\b${field}\\b`));
  }
  for (const field of ["solution", "timing", "contactMethod"]) {
    assert.match(source, new RegExp(`\\b${field}\\??:`));
  }
  assert.doesNotMatch(source, /\bbudget\b/i);
  assert.match(source, /MAX_CHALLENGE_LENGTH/);
  assert.match(source, /EMAIL_PATTERN/);
});

test("provides executable normalization and validation", async () => {
  const source = read("lib/contact/validation.ts");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const validationModule = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
  );
  const invalid = validationModule.validateContactInquiry({
    name: "",
    email: "not-an-email",
    company: "",
    challenge: "",
  });
  assert.equal(invalid.success, false);
  assert.deepEqual(Object.keys(invalid.errors).sort(), [
    "challenge",
    "company",
    "email",
    "name",
  ]);

  const valid = validationModule.validateContactInquiry({
    name: "  Ada Lovelace  ",
    email: " ADA@EXAMPLE.COM ",
    company: " Analytical Engines ",
    challenge: " Improve a manual reporting process. ",
  });
  assert.equal(valid.success, true);
  assert.equal(valid.data.name, "Ada Lovelace");
  assert.equal(valid.data.email, "ada@example.com");
});

test("uses a server-handled provider flow with honest success semantics", () => {
  const route = read("app/api/contact/route.ts");
  assert.match(route, /validateContactInquiry/);
  assert.match(route, /RESEND_API_KEY/);
  assert.match(route, /CONTACT_FROM_EMAIL/);
  assert.match(route, /api\.resend\.com\/emails/);
  assert.match(route, /response\.ok/);
  assert.match(route, /status:\s*503/);
  assert.match(route, /status:\s*429/);
  assert.match(route, /website/);
  assert.doesNotMatch(route, /console\.(?:log|error)\([^)]*(?:body|challenge|email)/);
});

test("renders an accessible low-pressure contact form and fallback", () => {
  const page = read("app/contact/page.tsx");
  const form = read("components/contact/ContactForm.tsx");
  const content = read("components/content/contact.ts");
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.match(content, /Tell us what you want the business to do better/);
  assert.match(page, /mailto:info@cobrykz\.com/);
  assert.match(form, /aria-describedby/);
  assert.match(form, /role="alert"/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /required/);
  assert.match(form, /Discuss a business challenge/);
  assert.doesNotMatch(`${page}\n${form}`, /\bbudget\b/i);
});

test("explains the beginning of a partnership without turning the form into a wizard", () => {
  const path = read("components/contact/InquiryPath.tsx");
  const page = read("app/contact/page.tsx");
  const form = read("components/contact/ContactForm.tsx");

  for (const step of [
    "Business challenge received",
    "Context reviewed",
    "Initial fit and questions identified",
    "Conversation arranged",
    "Appropriate next step defined",
  ]) {
    assert.match(path, new RegExp(step));
  }

  assert.match(path, /contactPage\.responseExpectation/);
  assert.match(page, /<InquiryPath\s*\/>/);
  assert.doesNotMatch(form, /SystemAtlas|stepIndex|currentStep|nextStep/);
  assert.doesNotMatch(form, /\bbudget\b/i);
});
