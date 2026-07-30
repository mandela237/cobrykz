import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, posix } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function collectFiles(directory, extension) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name).replaceAll("\\", "/");
      return entry.isDirectory()
        ? collectFiles(path, extension)
        : path.endsWith(extension)
          ? [path]
          : [];
    },
  );
}

const liveTsxPaths = () => [
  ...collectFiles("app", ".tsx"),
  ...collectFiles("components", ".tsx"),
];

const trackedTsxPaths = () =>
  execFileSync("git", ["ls-files", "--", "*.tsx"], {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((path) => path.replaceAll("\\", "/"));

const liveTsxSource = () =>
  liveTsxPaths()
    .map((path) => read(path))
    .join("\n");

function resolveLocalImport(importerPath, specifier, sourceExists) {
  let basePath;
  if (specifier.startsWith("@/")) {
    basePath = specifier.slice(2);
  } else if (specifier.startsWith(".")) {
    basePath = posix.normalize(
      posix.join(posix.dirname(importerPath), specifier),
    );
  } else {
    return null;
  }

  const candidates = /\.[cm]?[jt]sx?$/.test(basePath)
    ? [basePath]
    : [
        `${basePath}.ts`,
        `${basePath}.tsx`,
        posix.join(basePath, "index.ts"),
        posix.join(basePath, "index.tsx"),
      ];

  return candidates.find(sourceExists) || null;
}

function collectImportClosure(
  entryPath,
  sourceReader = read,
  sourceExists = (path) => existsSync(join(root, path)),
) {
  const queue = [entryPath];
  const closure = new Map();

  while (queue.length > 0) {
    const path = queue.shift();
    if (closure.has(path)) continue;

    const source = sourceReader(path);
    closure.set(path, source);

    const specifiers = [
      ...source.matchAll(/\bfrom\s+["']([^"']+)["']/g),
      ...source.matchAll(/^\s*import\s+["']([^"']+)["'];?\s*$/gm),
    ].map((match) => match[1]);

    for (const specifier of specifiers) {
      const resolved = resolveLocalImport(path, specifier, sourceExists);
      if (resolved && !closure.has(resolved)) queue.push(resolved);
    }
  }

  return closure;
}

function assertSingleResponsiveHomepageTree(
  entryPath,
  sourceReader = read,
  sourceExists = (path) => existsSync(join(root, path)),
) {
  const closure = collectImportClosure(entryPath, sourceReader, sourceExists);
  const paths = [...closure.keys()];
  const sources = [...closure.values()].join("\n");

  assert.doesNotMatch(
    paths.join("\n"),
    /(?:^|\/)components\/mobile(?:\/|$)/,
    "the homepage import closure must not reach a parallel mobile tree",
  );
  assert.doesNotMatch(
    sources,
    /MobileExperience|["']@\/components\/mobile\/|["']\.\.?(?:\/[^"']*)*\/mobile\//,
    "the homepage and its transitive imports must not reference mobile-only modules",
  );
  assert.doesNotMatch(
    sources,
    /(?:^|[\s"'`])(?:sm|md|lg|xl|2xl):hidden(?=$|[\s"'`])|(?:^|[\s"'`])hidden(?=$|[\s"'`])[^"\n]*\b(?:sm|md|lg|xl|2xl):(?:block|flex|grid|inline|inline-block|inline-flex)\b/,
    "the homepage closure must not switch duplicate content trees at breakpoints",
  );

  return closure;
}

function jsxTags(source) {
  const tags = [];
  let cursor = 0;

  while (cursor < source.length) {
    const start = source.indexOf("<", cursor);
    if (start === -1) break;
    if (!/[A-Za-z/]/.test(source[start + 1] || "")) {
      cursor = start + 1;
      continue;
    }

    let quote = "";
    let braces = 0;
    let end = start + 1;
    for (; end < source.length; end += 1) {
      const character = source[end];
      if (quote) {
        if (character === quote && source[end - 1] !== "\\") quote = "";
        continue;
      }
      if (`'"\``.includes(character)) {
        quote = character;
      } else if (character === "{") {
        braces += 1;
      } else if (character === "}") {
        braces -= 1;
      } else if (character === ">" && braces === 0) {
        break;
      }
    }

    const match = source
      .slice(start, end + 1)
      .match(/^<(\/?)([A-Za-z][\w.]*)\b([\s\S]*?)(\/?)>$/);
    if (match) {
      tags.push({
        closing: match[1] === "/",
        name: match[2],
        attributes: match[3],
        selfClosing: match[4] === "/",
      });
    }
    cursor = end + 1;
  }

  return tags;
}

const prohibitedIconMotion =
  /(?:^|[\s"'`{])(?:[\w-]+:)*(?:-?(?:rotate|scale|translate-y)-[^\s"`}]+|animate-(?:bounce|pulse|spin))/;

function assertLucideOnlyIcons(source, path) {
  const imports = new Map();

  for (const [, importClause, moduleName] of source.matchAll(
    /^\s*import\s+([\s\S]*?)\s+from\s*["']([^"']+)["'];?\s*$/gm,
  )) {
    const defaultImport = importClause.match(/^([A-Z][A-Za-z0-9_]*)\b/);
    if (defaultImport) imports.set(defaultImport[1], moduleName);

    const namespaceImport = importClause.match(
      /\*\s+as\s+([A-Z][A-Za-z0-9_]*)/,
    );
    if (namespaceImport) imports.set(namespaceImport[1], moduleName);

    const namedImport = importClause.match(/\{([\s\S]*?)\}/);
    if (!namedImport) continue;

    for (const specifier of namedImport[1].split(",")) {
      const [, importedName, localName] =
        specifier
          .trim()
          .match(/^(?:type\s+)?(\w+)(?:\s+as\s+(\w+))?$/) || [];
      if (importedName) imports.set(localName || importedName, moduleName);
    }
  }

  const iconPropertySources = new Set(
    [...source.matchAll(/\bicon\s*:\s*([A-Z][A-Za-z0-9_]*)\b/g)]
      .map(([, identifier]) => imports.get(identifier))
      .filter(Boolean),
  );
  const dynamicIconAliases = new Map(
    [...source.matchAll(/\bconst\s+(\w+)\s*=\s*\w+\.icon\b/g)].map(
      ([, alias]) => [alias, iconPropertySources],
    ),
  );

  const inlineSvgCount = (source.match(/<svg\b/g) || []).length;
  if (path === "components/CobrykzLogo.tsx") {
    assert.equal(inlineSvgCount, 1, "the Cobrykz brand mark must retain its SVG");
  } else {
    assert.equal(inlineSvgCount, 0, `${path} contains a non-brand inline SVG`);
  }

  const stack = [];
  for (const tag of jsxTags(source)) {
    if (tag.closing) {
      const openIndex = stack.map(({ name }) => name).lastIndexOf(tag.name);
      if (openIndex !== -1) stack.splice(openIndex);
      continue;
    }

    const [rootName] = tag.name.split(".");
    const directSource = imports.get(rootName);
    const aliasSources = dynamicIconAliases.get(tag.name) || new Set();
    const componentSources = new Set(
      [directSource, ...aliasSources].filter(Boolean),
    );

    for (const importSource of componentSources) {
      const isExternal =
        !importSource.startsWith(".") && !importSource.startsWith("@/");
      const isApprovedFrameworkComponent = [
        "next/image",
        "next/link",
      ].includes(importSource);

      if (isExternal && !isApprovedFrameworkComponent) {
        assert.equal(
          importSource,
          "lucide-react",
          `${path} imports interface component ${tag.name} from ${importSource}; interface icons must come from lucide-react`,
        );
      }
    }

    if (componentSources.has("lucide-react")) {
      assert.match(
        tag.attributes,
        /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
        `${path} must hide adjacent-text decorative ${tag.name} icons`,
      );
      assert.doesNotMatch(
        tag.attributes,
        prohibitedIconMotion,
        `${path} must not add continuous or attention-seeking motion to ${tag.name}`,
      );
      for (const ancestor of stack) {
        assert.doesNotMatch(
          ancestor.attributes,
          prohibitedIconMotion,
          `${path} must not add lift, rotate, bounce, or scale motion to an icon ancestor`,
        );
      }
    }

    if (!tag.selfClosing) stack.push(tag);
  }
}

function assertHeroMediaAccessible(source, label) {
  const videoTags = [...source.matchAll(/<video\b([^>]*)>/gs)];
  assert.ok(videoTags.length <= 1, `${label} must not duplicate hero video`);

  for (const [, attributes] of videoTags) {
    assert.match(attributes, /\bmuted\b/, `${label} video must be muted`);
    assert.match(
      attributes,
      /\bplaysInline\b/,
      `${label} video must play inline`,
    );
    assert.match(attributes, /\bposter=/, `${label} video must have a poster`);
    assert.doesNotMatch(
      attributes,
      /\bpreload="auto"/,
      `${label} video must not block on eager preload`,
    );
    assert.match(
      attributes,
      /\baria-hidden=(?:"true"|\{true\})/,
      `${label} decorative video must be hidden from assistive technology`,
    );
  }

  for (const [, attributes] of source.matchAll(/<Image\b([^>]*)\/?>/gs)) {
    assert.match(attributes, /\balt=/, `${label} image must define alt text`);
    if (/\balt=""/.test(attributes)) {
      assert.match(
        attributes,
        /\baria-hidden=(?:"true"|\{true\})/,
        `${label} empty-alt image must be explicitly decorative`,
      );
    }
  }
}

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");
  const trackedMarkup = trackedTsxPaths()
    .map((path) => read(path))
    .join("\n");
  const presentationSource = `${globals}\n${trackedMarkup}`;

  assert.doesNotMatch(presentationSource, /\b(?:subpixel-)?antialiased\b/);
  assert.doesNotMatch(presentationSource, /\btext-rendering\s*:/);
  assert.doesNotMatch(presentationSource, /-webkit-font-smoothing\s*:/);
  assert.doesNotMatch(presentationSource, /-moz-osx-font-smoothing\s*:/);
});

test("keeps the premium token layer small and intentional", () => {
  const globals = read("app/globals.css");
  const rootBlock = globals.match(/:root\s*{(?<body>[^}]*)}/s);
  const acceptedTokens = [
    "--control-transition",
    "--focus-ring-light",
    "--focus-ring-dark",
    "--section-gutter",
  ];

  assert.ok(rootBlock, "globals.css must retain a :root token scope");

  const componentTokens = [
    ...rootBlock.groups.body.matchAll(
      /(--(?:control|focus|section|radius|shadow|border)-[\w-]+)\s*:/g,
    ),
  ]
    .map(([, token]) => token)
    .sort();

  assert.deepEqual(
    componentTokens,
    acceptedTokens.toSorted(),
    "the responsive presentation must keep one audited token layer",
  );

  for (const token of acceptedTokens) {
    assert.match(
      globals,
      new RegExp(`var\\(${token}\\)`),
      `${token} must be consumed by shared CSS`,
    );
  }
});

test("preserves the frozen palette and font tokens", () => {
  const globals = read("app/globals.css");
  const frozenTheme = {
    "--color-navy": "#0b1728",
    "--color-blue": "#1f5eff",
    "--color-blue-dark": "#1748cc",
    "--color-white": "#ffffff",
    "--color-gray-light": "#f7faff",
    "--color-gray-100": "#eef4fb",
    "--color-slate": "#53647a",
    "--color-slate-light": "#7a899c",
    "--color-border": "#dce5f0",
    "--color-charcoal": "#132136",
    "--color-footer-bg": "#081321",
    "--color-blue-tint": "#eaf2ff",
    "--color-navy-subtle": "#17263a",
    "--color-evergreen": "#177b57",
  };

  const declaredColors = new Map(
    [...globals.matchAll(/(--color-[\w-]+):\s*([^;]+);/g)].map(
      ([, token, value]) => [token, value.trim()],
    ),
  );
  assert.deepEqual(
    Object.fromEntries(declaredColors),
    frozenTheme,
    "Task 5 must not drift or extend the frozen light-first palette",
  );
  assert.match(globals, /--font-sans:\s*var\(--font-geist-sans\);/);
  assert.match(globals, /--font-serif:\s*var\(--font-playfair\);/);
});

test("uses one responsive section shell from 320px upward", () => {
  const globals = read("app/globals.css");
  const homepageClosure = assertSingleResponsiveHomepageTree("app/page.tsx");

  assert.match(
    globals,
    /:root\s*{[^}]*--section-gutter:\s*1\.25rem;/s,
    "the 320px presentation must retain a fixed 20px page gutter",
  );
  assert.match(
    globals,
    /\.section-shell\s*{\s*width:\s*min\(calc\(100% - \(var\(--section-gutter\) \* 2\)\),\s*1200px\);\s*margin-inline:\s*auto;\s*}/s,
  );
  assert.match(
    globals,
    /@media \(min-width:\s*768px\)\s*{[\s\S]*?:root\s*{[^}]*--section-gutter:\s*2\.5rem;[^}]*}[\s\S]*?}/,
    "larger viewports must widen the same shared shell rather than switch trees",
  );

  for (const path of collectFiles("components/home", ".tsx")) {
    assert.ok(
      homepageClosure.has(path),
      `${path} must remain inside the audited homepage import closure`,
    );
  }
  assert.equal(
    (read("app/page.tsx").match(/<ChallengeRouter\s*\/>/g) || []).length,
    1,
    "the challenge router must appear in the single homepage tree",
  );

  const transitiveMobileFixture = {
    "app/page.tsx":
      'import HomeSection from "@/components/home/HomeSection"; export default HomeSection;',
    "components/home/HomeSection.tsx":
      'import MobileExperience from "@/components/mobile/MobileExperience"; export default MobileExperience;',
    "components/mobile/MobileExperience.tsx":
      "export default function MobileExperience() { return null; }",
  };
  assert.throws(
    () =>
      assertSingleResponsiveHomepageTree(
        "app/page.tsx",
        (path) => transitiveMobileFixture[path],
        (path) => Object.hasOwn(transitiveMobileFixture, path),
      ),
    /must not (?:reach a parallel mobile tree|reference mobile-only modules)/,
  );

  const breakpointSplitFixture = {
    "app/page.tsx":
      'import Split from "@/components/home/Split"; export default Split;',
    "components/home/Split.tsx":
      'export default function Split() { return <><div className="md:hidden">Mobile copy</div><div className="hidden md:block">Desktop copy</div></>; }',
  };
  assert.throws(
    () =>
      assertSingleResponsiveHomepageTree(
        "app/page.tsx",
        (path) => breakpointSplitFixture[path],
        (path) => Object.hasOwn(breakpointSplitFixture, path),
      ),
    /must not switch duplicate content trees at breakpoints/,
  );
});

test("bounds the shared header within the 320px viewport", () => {
  const globals = read("app/globals.css");
  const header = read("components/layout/SiteHeader.tsx");
  const solutionsMenu = read("components/layout/SolutionsMenu.tsx");
  const shellWidthAt320 = 320 - 2 * 20;

  assert.equal(shellWidthAt320, 280);
  assert.doesNotMatch(
    globals,
    /(?:html|body)\s*{[^}]*overflow-x:\s*hidden/s,
    "the page must not conceal horizontal header overflow",
  );
  assert.match(
    header,
    /className="section-shell min-w-0 flex min-h-16 flex-wrap items-center/,
  );
  assert.match(
    header,
    /<nav\s+className="order-3 min-w-0 w-full border-t border-border/,
  );
  assert.match(
    header,
    /<ul\s+className="flex max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-1 py-1 lg:flex-nowrap lg:gap-0 lg:py-0"/,
  );
  assert.doesNotMatch(header, /<ul className="[^"]*\bjustify-between\b/);
  assert.match(header, /<li key=\{item\.href\} className="max-w-full">/);
  assert.match(
    header,
    /className="nav-underline action-transition flex min-h-11 max-w-full items-center/,
  );
  assert.match(
    header,
    /className="order-2 mb-2 w-full max-w-full basis-full lg:order-none lg:mb-0 lg:w-auto lg:basis-auto"/,
    "the exact primary CTA must occupy its own bounded mobile row",
  );

  assert.match(
    solutionsMenu,
    /<li className="relative max-w-full" onKeyDown=\{handleKeyDown\}>/,
  );
  assert.match(
    solutionsMenu,
    /className="nav-underline action-transition flex min-h-11 max-w-full items-center/,
  );
  assert.match(
    solutionsMenu,
    /w-\[min\(22rem,calc\(100vw-2rem\)\)\]/,
    "the Solutions disclosure must remain bounded by the viewport",
  );
  assert.match(solutionsMenu, /aria-expanded=\{isOpen\}/);
  assert.match(solutionsMenu, /event\.key === "Escape"/);
});

test("keeps mobile typography fixed and readable", () => {
  const globals = read("app/globals.css");
  const homeHero = read("components/home/HomeHero.tsx");
  const sectionIntro = read("components/ui/SectionIntro.tsx");
  const homepageSources = [
    homeHero,
    sectionIntro,
    ...collectFiles("components/home", ".tsx").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(
    `${globals}\n${homepageSources}`,
    /font-size:\s*(?:clamp|min|max)\(|text-\[(?:clamp|min|max)\(/,
    "mobile type must use fixed sizes at explicit breakpoints",
  );
  assert.match(
    homeHero,
    /\btext-\[2\.625rem\][^"]*\bsm:text-\[3\.5rem\][^"]*\blg:text-\[4\.25rem\]/,
  );
  assert.match(
    sectionIntro,
    /\btext-\[2rem\][^"]*\bsm:text-\[2\.5rem\][^"]*\blg:text-5xl/,
  );

  const explanatoryBlocks = [
    ...liveTsxSource().matchAll(
      /<(p|span)\b([^>]*)>([\s\S]*?)<\/\1>/g,
    ),
  ].filter(([, tag, attributes, body]) => {
    if (tag === "p" && !/\buppercase\b/.test(attributes)) return true;
    return (
      /\b(?:leading-[5-9]|opacity-\d+)\b/.test(attributes) ||
      /\b(?:description|navOutcome|outcome|tagline|selectedChallenge)\b/.test(
        body,
      )
    );
  });

  for (const [, , attributes] of explanatoryBlocks) {
    assert.doesNotMatch(
      attributes,
      /\btext-xs\b|\btext-\[(?:10|11|12)px\]\b/,
      "explanatory paragraph and supporting span text must be at least 13px",
    );
  }
});

test("uses responsive grids only for meaningful comparison", () => {
  const comparisonContracts = {
    "components/home/BusinessOutcomes.tsx": /\bmd:grid-cols-3\b/,
    "components/home/WhyCobrykz.tsx":
      /\bsm:grid-cols-2\b[\s\S]*\blg:grid-cols-5\b/,
    "components/home/ChallengeRouter.tsx": /\bsm:grid-cols-2\b/,
    "components/home/ProcessOverview.tsx":
      /\bsm:grid-cols-2\b[\s\S]*\blg:grid-cols-3\b/,
  };

  for (const [path, contract] of Object.entries(comparisonContracts)) {
    assert.match(read(path), contract, `${path} changed its comparison grid`);
  }

  const editorialSources = [
    read("components/home/HomeHero.tsx"),
    read("components/home/ProjectsEvidence.tsx"),
    read("components/home/AuthorityBand.tsx"),
  ].join("\n");
  assert.ok(
    (editorialSources.match(/\bblur-3xl\b/g) || []).length <= 1,
    "editorial depth must remain selective",
  );
  assert.doesNotMatch(editorialSources, /\bshadow-(?:xl|2xl)\b/);
});

test("keeps actions, focus, and reduced motion restrained", () => {
  const globals = read("app/globals.css");
  const sources = liveTsxSource();

  assert.match(
    globals,
    /\.action-transition\s*{\s*transition:\s*color var\(--control-transition\),\s*background-color var\(--control-transition\),\s*border-color var\(--control-transition\);\s*}/s,
  );
  assert.match(
    globals,
    /\.action-transition:disabled\s*{[^}]*cursor:\s*not-allowed/s,
  );
  assert.doesNotMatch(`${globals}\n${sources}`, /\btransition-all\b/);
  assert.doesNotMatch(
    sources,
    /\b(?:hover|active|group-hover):(?:-?(?:scale|translate-y)|shadow|drop-shadow|brightness)-/,
  );
  assert.doesNotMatch(`${globals}\n${sources}`, /\bshimmer\b/);
  assert.doesNotMatch(`${globals}\n${sources}`, /\bscroll-hidden\b/);
  assert.doesNotMatch(
    sources,
    /\b(?:hover|group-hover):opacity-\d+[^"]*\bopacity-0\b|\bopacity-0[^"]*\b(?:hover|group-hover):opacity-\d+/,
    "critical content must not be a hover-only disclosure",
  );

  assert.doesNotMatch(
    globals,
    /:focus-visible\s*{[^}]*border-radius\s*:/s,
    "focus treatment must preserve each control's geometry",
  );
  assert.match(
    globals,
    /:focus-visible\s*{\s*outline:\s*2px solid var\(--focus-ring-light\);\s*outline-offset:\s*3px;\s*}/s,
  );
  assert.match(
    globals,
    /\.bg-navy :focus-visible,\s*\.bg-footer-bg :focus-visible\s*{[^}]*var\(--focus-ring-dark\)/s,
  );
  assert.match(
    globals,
    /@media \(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?animation-duration:\s*0\.01ms !important;[\s\S]*?transition-duration:\s*0\.01ms !important;/,
  );

  const negativeLiftFixture =
    '<button className="action-transition hover:-translate-y-1">Lift</button>';
  assert.throws(
    () =>
      assert.doesNotMatch(
        negativeLiftFixture,
        /\b(?:hover|active|group-hover):(?:-?(?:scale|translate-y)|shadow|drop-shadow|brightness)-/,
      ),
    /expected to not match/i,
  );
});

test("uses one accessible Lucide interface icon family", () => {
  for (const path of liveTsxPaths()) {
    assertLucideOnlyIcons(read(path), path);
  }

  assert.doesNotMatch(
    liveTsxSource(),
    /&(?:larr|rarr|uarr|darr);|[←→↑↓]/,
    "directional interface icons must not bypass Lucide with text glyphs",
  );
});

test("rejects inaccessible or third-party icon fixtures", () => {
  const thirdPartyIcon = `
    import { Menu } from "arbitrary-interface-icons";
    export const Fixture = () => <Menu aria-hidden="true" />;
  `;
  const defaultThirdPartyIcon = `
    import Menu from "arbitrary-interface-icons";
    export const Fixture = () => <Menu aria-hidden="true" />;
  `;
  const lucideWithoutAriaHidden = `
    import { Menu } from "lucide-react";
    export const Fixture = () => <Menu size={16} strokeWidth={2} />;
  `;
  const dynamicLucideAlias = `
    import { Menu } from "lucide-react";
    const actions = [{ icon: Menu }];
    const action = actions[0];
    const Icon = action.icon;
    export const Fixture = () => <Icon size={16} strokeWidth={2} aria-hidden="true" />;
  `;
  const dynamicAliasWithoutAriaHidden = dynamicLucideAlias.replace(
    ' aria-hidden="true"',
    "",
  );
  const dynamicThirdPartyAlias = dynamicLucideAlias.replace(
    '"lucide-react"',
    '"arbitrary-interface-icons"',
  );
  const ancestorLiftFixture = `
    import { Menu } from "lucide-react";
    export const Fixture = () => (
      <button className="hover:-translate-y-1">
        <Menu size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    );
  `;
  const directNegativeLiftFixture = `
    import { Menu } from "lucide-react";
    export const Fixture = () => (
      <Menu className="-translate-y-px" size={16} strokeWidth={2} aria-hidden="true" />
    );
  `;

  assert.throws(
    () => assertLucideOnlyIcons(thirdPartyIcon, "fixture-third-party.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(defaultThirdPartyIcon, "fixture-default-icon.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(lucideWithoutAriaHidden, "fixture-lucide.tsx"),
    /must hide adjacent-text decorative Menu icons/,
  );
  assert.doesNotThrow(() =>
    assertLucideOnlyIcons(dynamicLucideAlias, "fixture-dynamic-lucide.tsx"),
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(
        dynamicAliasWithoutAriaHidden,
        "fixture-dynamic-missing-aria.tsx",
      ),
    /must hide adjacent-text decorative Icon icons/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(
        dynamicThirdPartyAlias,
        "fixture-dynamic-third-party.tsx",
      ),
    /must come from lucide-react/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(ancestorLiftFixture, "fixture-ancestor-lift.tsx"),
    /must not add lift, rotate, bounce, or scale motion to an icon ancestor/,
  );
  assert.throws(
    () =>
      assertLucideOnlyIcons(
        directNegativeLiftFixture,
        "fixture-direct-lift.tsx",
      ),
    /must not add continuous or attention-seeking motion to Menu/,
  );
});

test("keeps navigation text on crisp surfaces", () => {
  const navSurfaces = [
    read("components/layout/SiteHeader.tsx"),
    read("components/layout/SolutionsMenu.tsx"),
    read("components/layout/SiteFooter.tsx"),
  ].join("\n");

  assert.doesNotMatch(navSurfaces, /backdrop-blur/);
});

test("avoids repeated generated-landing-page decoration", () => {
  const globals = read("app/globals.css");
  const renderedSources = [
    read("app/page.tsx"),
    ...collectFiles("components/home", ".tsx").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(globals, /\.page-grid/);
  assert.doesNotMatch(renderedSources, /\bpage-grid\b/);
  assert.doesNotMatch(renderedSources, /Cormorant_Garamond/);
  assert.doesNotMatch(renderedSources, /\b(?:from|via|to)-(?:purple|violet|cyan|fuchsia)-/);
  assert.doesNotMatch(renderedSources, /\b(?:robot|brain|circuit)\b/i);
});

test("keeps retained hero media accessible and non-blocking", () => {
  const hero = read("components/home/HomeHero.tsx");
  assertHeroMediaAccessible(hero, "HomeHero");

  const attributesOutsideMedia = `
    <div muted playsInline poster="/poster.jpg" aria-hidden="true">
      <video src="/brand.mp4" />
    </div>
  `;
  assert.throws(
    () =>
      assertHeroMediaAccessible(
        attributesOutsideMedia,
        "out-of-scope fixture",
      ),
    /video must be muted/,
    "media attributes elsewhere in the hero must not satisfy the video contract",
  );
});

test("retires the duplicated website-agency homepage files", () => {
  const retiredPaths = [
    "components/Navbar.tsx",
    "components/Footer.tsx",
    "components/CopyProjectNoteButton.tsx",
    "components/TrustField.tsx",
    "components/content/buildArtifact.ts",
    "components/mobile/MobileActionBar.tsx",
    "components/mobile/MobileContact.tsx",
    "components/mobile/MobileExperience.tsx",
    "components/mobile/MobileFAQ.tsx",
    "components/mobile/MobileFit.tsx",
    "components/mobile/MobileFooter.tsx",
    "components/mobile/MobileFounder.tsx",
    "components/mobile/MobileHero.tsx",
    "components/mobile/MobileIndustries.tsx",
    "components/mobile/MobileProcess.tsx",
    "components/mobile/MobileServices.tsx",
    "components/mobile/MobileStandard.tsx",
    "components/mobile/MobileTrust.tsx",
    "components/mobile/MobileWhy.tsx",
    "components/sections/BuildArtifact.tsx",
    "components/sections/FAQ.tsx",
    "components/sections/FinalCTA.tsx",
    "components/sections/Founder.tsx",
    "components/sections/GoodFit.tsx",
    "components/sections/Hero.tsx",
    "components/sections/Industries.tsx",
    "components/sections/OurStandard.tsx",
    "components/sections/Process.tsx",
    "components/sections/Services.tsx",
    "components/sections/SocialProof.tsx",
    "components/sections/WhyCOBRYKZ.tsx",
  ];

  for (const path of retiredPaths) {
    assert.equal(
      existsSync(join(root, path)),
      false,
      `${path} must be retired after its replacement is live`,
    );
  }
});
