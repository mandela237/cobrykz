import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function collectTsx(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectTsx(path) : path.endsWith(".tsx") ? [path] : [];
    },
  );
}

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");

  assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
  assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
  assert.doesNotMatch(globals, /-moz-osx-font-smoothing:\s*grayscale/);
});

test("keeps navigation text on crisp surfaces", () => {
  const navSurfaces = [
    read("components/Navbar.tsx"),
    read("components/mobile/MobileActionBar.tsx"),
  ].join("\n");

  assert.doesNotMatch(navSurfaces, /backdrop-blur/);
});

test("keeps explanatory paragraphs at 13px or larger", () => {
  const readableMarkup = collectTsx("components")
    .map((path) => read(path))
    .join("\n");
  const undersizedParagraph =
    /<p\b[^>]*className="(?![^"]*uppercase)[^"]*text-\[(?:10|11|12)px\][^"]*"[^>]*>/gs;

  assert.doesNotMatch(readableMarkup, undersizedParagraph);
});
