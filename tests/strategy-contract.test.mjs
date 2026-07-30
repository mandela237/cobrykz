import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("defines the frozen six-solution portfolio once", () => {
  const source = read("components/content/solutions.ts");
  for (const name of [
    "AI Solutions",
    "Business Automation",
    "Custom Software Development",
    "Digital Business Systems",
    "Websites & Web Applications",
    "Technology Consulting",
  ]) {
    assert.equal(source.split(`name: "${name}"`).length - 1, 1);
  }
  assert.doesNotMatch(source, /name: "Artificial Intelligence"/);
});

test("retains the frozen homepage message hierarchy", () => {
  const source = read("components/content/home.ts");
  assert.match(source, /Turn business challenges into better systems\./);
  assert.match(source, /Grow more effectively/);
  assert.match(source, /Operate more efficiently/);
  assert.match(source, /Modernize with confidence/);
  assert.match(source, /Where AI may not be the right answer/);
});
