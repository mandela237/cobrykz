import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
// `next/image` is the only non-icon, bare-package PascalCase JSX component in tracked TSX.
const allowedExternalJsxModules = new Set(["next/image"]);
const isBareExternalModule = (moduleName) =>
  !moduleName.startsWith(".") && !moduleName.startsWith("@/");

function collectTsx(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectTsx(path) : path.endsWith(".tsx") ? [path] : [];
    },
  );
}

function collectTrackedTsx() {
  return execFileSync("git", ["ls-files", "--", "*.tsx"], {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);
}

function actionBlocks(source) {
  return [...source.matchAll(/<(a|button)\b[\s\S]*?<\/\1>/g)].map(
    ([block]) => block,
  );
}

function assertRestrainedActionStates(source, label) {
  const actions = actionBlocks(source);
  assert.ok(actions.length > 0, `${label} must contain an action fixture`);

  for (const action of actions) {
    assert.doesNotMatch(
      action,
      /\btransition-all\b/,
      `${label} must transition only intentional state properties`,
    );
    assert.doesNotMatch(
      action,
      /\b(?:hover|active):(?:scale|translate-y|shadow|drop-shadow|brightness)-/,
      `${label} must reject scale, lift, glow, and heavy shadow states`,
    );
    assert.doesNotMatch(
      action,
      /\bshimmer\b/,
      `${label} must keep action feedback quiet without shimmer`,
    );
  }
}

function testPattern(pattern, value) {
  pattern.lastIndex = 0;
  return pattern.test(value);
}

function assertActionContract(source, sourceLabel, contract) {
  const matches = actionBlocks(source).filter((action) =>
    testPattern(contract.identity, action),
  );
  const contractLabel = `${sourceLabel} ${contract.name}`;

  assert.equal(
    matches.length,
    1,
    `${contractLabel} must resolve to exactly one action instance`,
  );

  const [action] = matches;
  assert.match(
    action,
    /\baction-transition\b/,
    `${contractLabel} must apply action-transition to that action instance`,
  );

  for (const [detail, pattern] of Object.entries(contract.required)) {
    assert.match(action, pattern, `${contractLabel} changed its ${detail}`);
  }
  for (const [detail, pattern] of Object.entries(contract.forbidden || {})) {
    assert.doesNotMatch(action, pattern, `${contractLabel} gained ${detail}`);
  }

  return action;
}

function assertSourceActionContracts(source, sourceLabel, contracts) {
  const contractedActions = contracts.map((contract) =>
    assertActionContract(source, sourceLabel, contract),
  );
  const transitionedActions = actionBlocks(source).filter((action) =>
    /\baction-transition\b/.test(action),
  );

  assert.equal(
    transitionedActions.length,
    contracts.length,
    `${sourceLabel} must transition exactly its audited action instances`,
  );
  assert.deepEqual(
    transitionedActions.toSorted(),
    contractedActions.toSorted(),
    `${sourceLabel} must not move action-transition to a different action`,
  );
}

function assertSourceFacts(source, sourceLabel, facts) {
  for (const [detail, pattern] of Object.entries(facts)) {
    assert.match(source, pattern, `${sourceLabel} changed its ${detail}`);
  }
}

function assertIconSystem(source, path) {
  const namedImportSources = new Map();
  const namespaceImportSources = new Map();

  for (const [, importClause, moduleName] of source.matchAll(
    /^\s*import\s+([\s\S]*?)\s+from\s*["']([^"']+)["'];?\s*$/gm,
  )) {
    const defaultImport = importClause.match(/^([A-Z][A-Za-z0-9_]*)\b/);
    if (defaultImport) {
      namedImportSources.set(defaultImport[1], moduleName);
    }

    const namespaceImport = importClause.match(/\*\s+as\s+([A-Z][A-Za-z0-9_]*)/);
    if (namespaceImport) {
      namespaceImportSources.set(namespaceImport[1], moduleName);
    }

    const namedImport = importClause.match(/\{([\s\S]*?)\}/);
    if (!namedImport) continue;

    for (const specifier of namedImport[1].split(",")) {
      const [, importedName, localName] = specifier
        .trim()
        .match(/^(?:type\s+)?(\w+)(?:\s+as\s+(\w+))?$/) || [];
      if (importedName) {
        namedImportSources.set(localName || importedName, moduleName);
      }
    }
  }

  const inlineSvgCount = (source.match(/<svg\b/g) || []).length;
  if (path === "components/CobrykzLogo.tsx") {
    assert.equal(inlineSvgCount, 1, "the COBRYKZ brand mark must retain its SVG");
  } else {
    assert.equal(inlineSvgCount, 0, `${path} contains a non-brand inline SVG`);
  }

  const iconPropertySources = new Set(
    [...source.matchAll(/\bicon\s*:\s*([A-Z][A-Za-z0-9_]*)\b/g)]
      .map(([, identifier]) => namedImportSources.get(identifier))
      .filter(Boolean),
  );
  const dynamicIconAliases = new Map(
    [...source.matchAll(/\bconst\s+(\w+)\s*=\s*\w+\.icon\b/g)].map(
      ([, alias]) => [alias, iconPropertySources],
    ),
  );

  for (const [, componentName, attributes] of source.matchAll(
    /<([A-Z][A-Za-z0-9_]*(?:\.[A-Z][A-Za-z0-9_]*)?)\b([^>]*)\/?\s*>/g,
  )) {
    const [rootName] = componentName.split(".");
    const directImportSource = componentName.includes(".")
      ? namespaceImportSources.get(rootName)
      : namedImportSources.get(componentName);
    const aliasSources = dynamicIconAliases.get(componentName);

    if (directImportSource && isBareExternalModule(directImportSource)) {
      assert.ok(
        directImportSource === "lucide-react" ||
          allowedExternalJsxModules.has(directImportSource),
        `${path} imports PascalCase JSX component ${componentName} from ${directImportSource}; it must come from lucide-react or an approved framework module`,
      );
    }

    for (const aliasSource of aliasSources || []) {
      assert.equal(
        aliasSource,
        "lucide-react",
        `${path} renders interface icon ${componentName} from ${aliasSource}; it must come from lucide-react`,
      );
    }

    if (
      directImportSource === "lucide-react" ||
      [...(aliasSources || [])].includes("lucide-react")
    ) {
      assert.match(
        attributes,
        /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
        `${path} must hide adjacent-text decorative ${componentName} icons from assistive technology`,
      );
    }
  }
}

test("uses platform-native font rasterization", () => {
  const globals = read("app/globals.css");

  assert.doesNotMatch(globals, /text-rendering:\s*geometricPrecision/);
  assert.doesNotMatch(globals, /-webkit-font-smoothing:\s*antialiased/);
  assert.doesNotMatch(globals, /-moz-osx-font-smoothing:\s*grayscale/);
});

test("keeps the premium component token layer small and intentional", () => {
  const globals = read("app/globals.css");
  const candidateTokens = [
    "--control-transition",
    "--focus-ring-light",
    "--focus-ring-dark",
    "--control-height-compact",
    "--control-height-standard",
    "--radius-control",
    "--shadow-quiet",
    "--shadow-elevated",
    "--border-control-light",
    "--border-control-dark",
  ];
  const acceptedTokens = [
    "--control-transition",
    "--focus-ring-light",
    "--focus-ring-dark",
    "--control-height-compact",
  ];
  const rootBlock = globals.match(/:root\s*{(?<body>[^}]*)}/s);

  assert.ok(rootBlock, "globals.css must retain a :root token scope");

  const declaredCandidates = [
    ...globals.matchAll(/(--[\w-]+)\s*:/g),
  ]
    .map(([, token]) => token)
    .filter((token) => candidateTokens.includes(token))
    .sort();
  const rootCandidates = [
    ...rootBlock.groups.body.matchAll(/(--[\w-]+)\s*:/g),
  ]
    .map(([, token]) => token)
    .filter((token) => candidateTokens.includes(token))
    .sort();

  assert.deepEqual(
    declaredCandidates,
    acceptedTokens.toSorted(),
    "only the audited component-token allowlist may be declared",
  );
  assert.deepEqual(
    rootCandidates,
    acceptedTokens.toSorted(),
    "accepted component tokens must be declared once in :root",
  );

  for (const token of acceptedTokens) {
    const uses = globals.match(new RegExp(`var\\(${token}\\)`, "g")) || [];
    assert.ok(uses.length > 0, `${token} must be consumed by shared CSS`);
  }
});

test("keeps equivalent actions and links behaviorally consistent", () => {
  const globals = read("app/globals.css");
  const sources = {
    navbar: read("components/Navbar.tsx"),
    hero: read("components/sections/Hero.tsx"),
    services: read("components/sections/Services.tsx"),
    industries: read("components/sections/Industries.tsx"),
    process: read("components/sections/Process.tsx"),
    founder: read("components/sections/Founder.tsx"),
    contact: read("components/sections/FinalCTA.tsx"),
    footer: read("components/Footer.tsx"),
    copyNote: read("components/CopyProjectNoteButton.tsx"),
    mobileActionBar: read("components/mobile/MobileActionBar.tsx"),
    mobileHero: read("components/mobile/MobileHero.tsx"),
    mobileServices: read("components/mobile/MobileServices.tsx"),
    mobileFit: read("components/mobile/MobileFit.tsx"),
    mobileFounder: read("components/mobile/MobileFounder.tsx"),
    mobileContact: read("components/mobile/MobileContact.tsx"),
    mobileFooter: read("components/mobile/MobileFooter.tsx"),
  };
  const renderedActionSources = Object.entries(sources)
    .map(([label, source]) => {
      assertRestrainedActionStates(source, label);
      return source;
    })
    .join("\n");

  assert.match(
    globals,
    /\.action-transition\s*{\s*transition:\s*color var\(--control-transition\),\s*background-color var\(--control-transition\),\s*border-color var\(--control-transition\);\s*}/s,
    "equivalent actions must transition only color, background-color, and border-color with --control-transition",
  );
  assert.match(
    globals,
    /\.action-transition:disabled\s*{[^}]*cursor:\s*not-allowed/s,
    "native disabled actions must override the global pointer cursor",
  );
  assert.doesNotMatch(globals, /@keyframes\s+btn-shimmer|\.shimmer\b/);
  assert.doesNotMatch(
    globals,
    /:focus-visible\s*{[^}]*border-radius\s*:/s,
    "shared focus must preserve each action or link's own geometry",
  );
  assert.match(
    globals,
    /:focus-visible\s*{\s*outline:\s*2px solid var\(--focus-ring-light\);\s*outline-offset:\s*3px;\s*}/s,
    "shared focus must retain the exact light outline width and offset",
  );
  assert.match(
    globals,
    /\.bg-navy :focus-visible,\s*\.bg-footer-bg :focus-visible\s*{[^}]*var\(--focus-ring-dark\)/s,
  );

  const actionContracts = {
    navbar: [
      {
        name: "desktop navigation template",
        identity: /href=\{link\.desktopHref\}/,
        required: {
          "dynamic href": /href=\{link\.desktopHref\}/,
          label: /\{link\.label\}/,
          "dimensions and spacing": /\bblock px-4 py-2 text-\[13px\] font-medium\b/,
          "navigation fill and active behavior":
            /active \? "text-navy" : "text-slate hover:text-navy"/,
          "underline behavior": /\bnav-underline action-transition\b/,
        },
        forbidden: {
          "button border, fill, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
      {
        name: "desktop Start a project",
        identity: /href="#contact"[\s\S]*?Start a project/,
        required: {
          href: /href="#contact"/,
          label: />\s*Start a project\s*</,
          "dimensions and spacing": /\bhidden min-h-11 items-center gap-2\b[\s\S]*\bpx-5\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          shadow: /\bshadow-\[0_8px_22px_rgba\(31,94,255,0\.24\)\]/,
          states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
          border: /\brounded-lg\b/,
        },
      },
      {
        name: "mobile menu toggle",
        identity: /aria-controls="mobile-menu"/,
        required: {
          behavior: /onClick=\{\(\) => setMobileOpen\(\(open\) => !open\)\}/,
          label: /aria-label=\{mobileOpen \? "Close menu" : "Open menu"\}/,
          "expanded state": /aria-expanded=\{mobileOpen\}/,
          "dimensions and spacing": /\bmin-h-11 min-w-11 items-center justify-center\b/,
          "border and fill": /\brounded-lg border border-border bg-white text-navy\b/,
          states: /\bhover:bg-gray-light active:bg-gray-100\b/,
        },
      },
      {
        name: "mobile navigation template",
        identity: /href=\{link\.mobileHref\}/,
        required: {
          "dynamic href": /href=\{link\.mobileHref\}/,
          label: /\{link\.label\}/,
          behavior: /onClick=\{closeMenu\}/,
          "dimensions and spacing": /\bflex min-h-14 items-center justify-between\b/,
          fill: /\btext-navy hover:text-blue-dark\b/,
        },
        forbidden: {
          "button border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
      {
        name: "mobile menu Start a project",
        identity: /href="#m-contact"[\s\S]*?onClick=\{closeMenu\}[\s\S]*?Start a project/,
        required: {
          href: /href="#m-contact"/,
          label: />\s*Start a project\s*</,
          behavior: /onClick=\{closeMenu\}/,
          "dimensions and spacing":
            /\bflex min-h-12 w-full items-center justify-center gap-2\b[\s\S]*\bpx-5\b/,
          "border and fill": /\brounded-lg bg-blue\b[\s\S]*\btext-white\b/,
          states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
        },
        forbidden: {
          shadow: /\bshadow-\S+/,
        },
      },
    ],
    hero: [
      {
        name: "Start a project",
        identity: /href="#contact"[\s\S]*?Start a project/,
        required: {
          href: /href="#contact"/,
          label: />\s*Start a project\s*</,
          "dimensions and spacing":
            /\binline-flex min-h-12 items-center justify-center gap-2 rounded-lg\b[\s\S]*\bpx-6\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          shadow: /\bshadow-\[0_10px_28px_rgba\(31,94,255,0\.26\)\]/,
          states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
        },
      },
      {
        name: "See how I work",
        identity: /href="#process"[\s\S]*?See how I work/,
        required: {
          href: /href="#process"/,
          label: />\s*See how I work\s*</,
          "dimensions and spacing":
            /\binline-flex min-h-12 items-center justify-center gap-2 rounded-lg\b[\s\S]*\bpx-6\b/,
          "border and fill": /\bborder border-border bg-white\b[\s\S]*\btext-navy\b/,
          shadow: /\bshadow-\[0_8px_24px_rgba\(11,23,40,0\.05\)\]/,
          states:
            /\bhover:border-blue\/30 hover:bg-blue-tint active:border-blue\/30 active:bg-blue-tint\b/,
        },
      },
    ],
    services: [
      {
        name: "Talk through your project",
        identity: /Talk through your project/,
        required: {
          href: /href="#contact"/,
          label: />\s*Talk through your project\s*</,
          "dimensions and spacing": /\binline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[14px\] font-semibold text-blue\b/,
          states: /\bhover:text-blue-dark\b/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    industries: [
      {
        name: "Tell me what you do",
        identity: /Tell me what you do/,
        required: {
          href: /href="#contact"/,
          label: />\s*Tell me what you do\s*</,
          "dimensions and spacing": /\binline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[14px\] font-semibold text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    process: [
      {
        name: "Start with a conversation",
        identity: /Start with a conversation/,
        required: {
          href: /href="#contact"/,
          label: />\s*Start with a conversation\s*</,
          "dimensions and spacing": /\bmt-7 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[14px\] font-semibold text-blue\b/,
          states: /\bhover:text-blue-dark\b/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    founder: [
      {
        name: "Tell me about your business",
        identity: /Tell me about your business/,
        required: {
          href: /href="#contact"/,
          label: />\s*Tell me about your business\s*</,
          "dimensions and spacing": /\bmt-8 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[14px\] font-semibold text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    contact: [
      {
        name: "email link",
        identity: /href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/,
        required: {
          href: /href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/,
          label: /\{CONTACT_EMAIL\}/,
          "dimensions and spacing": /\bmt-9 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[14px\] font-semibold text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
      {
        name: "Open email draft submit",
        identity: /type="submit"[\s\S]*?Open email draft/,
        required: {
          behavior: /type="submit"/,
          label: />\s*Open email draft\s*</,
          "dimensions and spacing":
            /\bmt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg\b[\s\S]*\bpx-6\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          shadow: /\bshadow-\[0_10px_28px_rgba\(31,94,255,0\.28\)\]/,
          states:
            /\bhover:bg-blue-dark active:bg-blue-dark disabled:cursor-not-allowed disabled:bg-blue\/60 disabled:text-white\/75\b/,
        },
      },
    ],
    footer: [
      {
        name: "Explore link template",
        identity: /href=\{link\.href\}/,
        required: {
          "dynamic href": /href=\{link\.href\}/,
          label: /\{link\.label\}/,
          "dimensions and spacing": /\btext-\[13px\]/,
          fill: /\btext-white\/78\b/,
          states: /\bhover:text-white\b/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
      {
        name: "info email link",
        identity: /href="mailto:info@cobrykz\.com"/,
        required: {
          href: /href="mailto:info@cobrykz\.com"/,
          label: /info@cobrykz\.com/,
          "dimensions and spacing": /\bmt-4 inline-flex items-center gap-2\b/,
          fill: /\btext-\[13px\] font-medium text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
      {
        name: "Start a project",
        identity: /href="#contact"[\s\S]*?Start a project/,
        required: {
          href: /href="#contact"/,
          label: />\s*Start a project\s*</,
          "dimensions and spacing": /\bmt-5 inline-flex min-h-11 items-center gap-2\b[\s\S]*\bpx-4\b/,
          "border and fill":
            /\brounded-lg border border-white\/14 bg-white\/\[0\.06\][\s\S]*\btext-white\b/,
          states: /\bhover:bg-white\/\[0\.1\] active:bg-white\/\[0\.1\]/,
        },
        forbidden: {
          shadow: /\bshadow-\S+/,
        },
      },
    ],
    copyNote: [
      {
        name: "Copy project note",
        identity: /onClick=\{copyNote\}/,
        required: {
          behavior: /type="button" onClick=\{copyNote\}/,
          labels: /"Project note copied" : "Copy project note"/,
          "dimensions and spacing":
            /\binline-flex min-h-11 items-center justify-center gap-2 rounded-lg\b[\s\S]*\bpx-4\b/,
          border: /\bborder border-current\/20\b/,
          fill: /\btext-\[13px\] font-semibold\b/,
          states: /\bhover:bg-white\/10 active:bg-white\/10\b/,
        },
        forbidden: {
          shadow: /\bshadow-\S+/,
        },
      },
    ],
    mobileActionBar: [
      {
        name: "Services",
        identity: /aria-label="Services"/,
        required: {
          href: /href="#m-services"/,
          label: /aria-label="Services"/,
          "dimensions and spacing": /\bm-control flex items-center justify-center\b/,
          fill: /\btext-slate\b/,
          states: /\bhover:bg-gray-light hover:text-navy active:bg-gray-100\b/,
          icon: /<LayoutGrid size=\{18\} strokeWidth=\{1\.9\}/,
        },
        forbidden: {
          "border or shadow": /\b(?:border(?:-\w+)?|shadow-\S+)/,
        },
      },
      {
        name: "Process",
        identity: /aria-label="Process"/,
        required: {
          href: /href="#m-process"/,
          label: /aria-label="Process"/,
          "dimensions and spacing": /\bm-control flex items-center justify-center\b/,
          fill: /\btext-slate\b/,
          states: /\bhover:bg-gray-light hover:text-navy active:bg-gray-100\b/,
          icon: /<Route size=\{18\} strokeWidth=\{1\.9\}/,
        },
        forbidden: {
          "border or shadow": /\b(?:border(?:-\w+)?|shadow-\S+)/,
        },
      },
      {
        name: "Start a project",
        identity: /href="#m-contact"[\s\S]*?Start a project/,
        required: {
          href: /href="#m-contact"/,
          label: />\s*Start a project\s*</,
          "dimensions and spacing":
            /\bm-control flex items-center justify-center gap-2\b[\s\S]*\bpx-4\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
        },
        forbidden: {
          "border or shadow": /\b(?:border(?:-\w+)?|shadow-\S+)/,
        },
      },
    ],
    mobileHero: [
      {
        name: "Start a project",
        identity: /href="#m-contact"[\s\S]*?Start a project/,
        required: {
          href: /href="#m-contact"/,
          label: />\s*Start a project\s*</,
          "dimensions and spacing":
            /\bmx-auto inline-flex min-h-12 w-full max-w-\[390px\] items-center justify-center gap-1\.5 rounded-lg\b[\s\S]*\bpx-4\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          shadow: /\bshadow-\[0_8px_22px_rgba\(31,94,255,0\.18\)\]/,
          states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
        },
      },
    ],
    mobileServices: [
      {
        name: "service tab template",
        identity: /aria-controls="mobile-service-panel"/,
        required: {
          labels: /\{service\.tab\}/,
          behavior:
            /role="tab"[\s\S]*?aria-selected=\{activeIndex === index\}[\s\S]*?onClick=\{\(\) => setActiveIndex\(index\)\}/,
          "dimensions and spacing": /\bm-control px-2 text-\[12px\] font-semibold\b/,
          "border and fill behavior":
            /activeIndex === index[\s\S]*?"bg-white text-navy shadow-\[0_5px_16px_rgba\(11,23,40,0\.08\)\]"[\s\S]*?: "text-slate"/,
        },
      },
      {
        name: "Talk through your project",
        identity: /Talk through your project/,
        required: {
          href: /href="#m-contact"/,
          label: />\s*Talk through your project\s*</,
          "dimensions and spacing": /\bmt-5 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[13px\] font-semibold text-blue\b/,
          states: /\bhover:text-blue-dark\b/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    mobileFit: [
      {
        name: "project-fit tab template",
        identity: /aria-controls="mobile-fit-panel"/,
        required: {
          labels: /\{list\.tab\}/,
          behavior:
            /role="tab"[\s\S]*?aria-selected=\{activeIndex === index\}[\s\S]*?onClick=\{\(\) => setActiveIndex\(index\)\}/,
          "dimensions and spacing": /\bm-control text-\[12px\] font-semibold\b/,
          "border and fill behavior":
            /activeIndex === index[\s\S]*?"bg-white text-navy shadow-\[0_5px_16px_rgba\(11,23,40,0\.08\)\]"[\s\S]*?: "text-slate"/,
        },
      },
    ],
    mobileFounder: [
      {
        name: "Tell Mandela what you need",
        identity: /Tell Mandela what you need/,
        required: {
          href: /href="#m-contact"/,
          label: />\s*Tell Mandela what you need\s*</,
          "dimensions and spacing": /\bmt-6 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[13px\] font-semibold text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    mobileContact: [
      {
        name: "Open email draft submit",
        identity: /type="submit"[\s\S]*?Open email draft/,
        required: {
          behavior: /type="submit"/,
          label: />\s*Open email draft\s*</,
          "dimensions and spacing":
            /\bm-control mt-5 inline-flex w-full items-center justify-center gap-2\b[\s\S]*\bpx-5\b/,
          fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
          states:
            /\bhover:bg-blue-dark active:bg-blue-dark disabled:cursor-not-allowed disabled:bg-blue\/60 disabled:text-white\/75\b/,
        },
        forbidden: {
          shadow: /\bshadow-\S+/,
        },
      },
      {
        name: "email link",
        identity: /href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/,
        required: {
          href: /href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/,
          label: /\{CONTACT_EMAIL\}/,
          "dimensions and spacing": /\bmt-6 inline-flex min-h-11 items-center gap-2\b/,
          fill: /\btext-\[13px\] font-semibold text-white\b/,
          states: /\bhover:text-\[#9CC8FF\]/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
    mobileFooter: [
      {
        name: "footer link template",
        identity: /href=\{link\.href\}/,
        required: {
          "dynamic href": /href=\{link\.href\}/,
          label: /\{link\.label\}/,
          "dimensions and spacing": /\binline-flex min-h-11 min-w-11 items-center\b/,
          fill: /\btext-\[11px\] font-medium text-white\/65\b/,
          states: /\bhover:text-white\b/,
        },
        forbidden: {
          "border, background, or shadow": /\b(?:border(?:-\w+)?|bg-\w+|shadow-\S+)/,
        },
      },
    ],
  };

  assert.deepEqual(
    Object.keys(actionContracts).toSorted(),
    Object.keys(sources).toSorted(),
    "all 16 audited source groups must have explicit action contracts",
  );
  for (const [label, contracts] of Object.entries(actionContracts)) {
    assertSourceActionContracts(sources[label], label, contracts);
  }

  const protectedSourceFacts = {
    navbar: {
      "Services navigation mapping":
        /label: "Services",\s*desktopHref: "#services",\s*mobileHref: "#m-services",\s*id: "services"/,
      "Inside the build navigation mapping":
        /label: "Inside the build",\s*desktopHref: "#inside-build",\s*mobileHref: "#m-inside-build",\s*id: "inside-build"/,
      "Process navigation mapping":
        /label: "Process",\s*desktopHref: "#process",\s*mobileHref: "#m-process",\s*id: "process"/,
      "About navigation mapping":
        /label: "About",\s*desktopHref: "#founder",\s*mobileHref: "#m-founder",\s*id: "founder"/,
      "mobile navigation filter":
        /navLinks\.filter\(\(link\) => link\.id !== "inside-build"\)/,
      "mobile logo link": /href="#m-top"[\s\S]*?aria-label="COBRYKZ, back to top"/,
      "desktop logo link": /href="#top"[\s\S]*?aria-label="COBRYKZ, back to top"/,
    },
    hero: {},
    services: {},
    industries: {},
    process: {},
    founder: {},
    contact: {
      "exact contact label": /const CONTACT_EMAIL = "info@cobrykz\.com"/,
      "mailto form behavior":
        /action=\{`mailto:\$\{CONTACT_EMAIL\}`\}[\s\S]*?method="post"[\s\S]*?encType="text\/plain"[\s\S]*?onSubmit=\{handleSubmit\}/,
      "draft-navigation behavior":
        /window\.location\.href = `mailto:\$\{CONTACT_EMAIL\}\?subject=\$\{subject\}&body=\$\{body\}`/,
    },
    footer: {
      "Services link mapping": /\{ label: "Services", href: "#services" \}/,
      "Inside the build link mapping":
        /\{ label: "Inside the build", href: "#inside-build" \}/,
      "Process link mapping": /\{ label: "Process", href: "#process" \}/,
      "About link mapping": /\{ label: "About", href: "#founder" \}/,
      "Questions link mapping": /\{ label: "Questions", href: "#faq" \}/,
    },
    copyNote: {
      "clipboard behavior": /await navigator\.clipboard\.writeText\(text\)/,
      "copied-state behavior":
        /setCopied\(true\)[\s\S]*?window\.setTimeout\(\(\) => setCopied\(false\), 2200\)/,
    },
    mobileActionBar: {
      "bar dimensions, border, fill, and shadow":
        /grid-cols-\[56px_56px_1fr\] gap-1 rounded-lg border border-border bg-white p-1\.5 shadow-\[0_14px_36px_rgba\(11,23,40,0\.16\)\]/,
      "reveal behavior":
        /show \? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"/,
    },
    mobileHero: {},
    mobileServices: {
      "Website tab label": /tab: "Website"/,
      "Systems tab label": /tab: "Systems"/,
      "Care tab label": /tab: "Care"/,
      "tablist border, fill, and spacing":
        /className="mt-6 grid grid-cols-3 rounded-lg border border-border bg-gray-light p-1"/,
    },
    mobileFit: {
      "Good fit tab label": /tab: "Good fit"/,
      "Not a fit tab label": /tab: "Not a fit"/,
      "tablist border, fill, and spacing":
        /className="mt-6 grid grid-cols-2 rounded-lg border border-border bg-gray-light p-1"/,
    },
    mobileFounder: {},
    mobileContact: {
      "exact contact label": /const CONTACT_EMAIL = "info@cobrykz\.com"/,
      "mailto form behavior":
        /action=\{`mailto:\$\{CONTACT_EMAIL\}`\}[\s\S]*?method="post"[\s\S]*?encType="text\/plain"[\s\S]*?onSubmit=\{handleSubmit\}/,
      "draft-navigation behavior":
        /window\.location\.href = `mailto:\$\{CONTACT_EMAIL\}\?subject=\$\{subject\}&body=\$\{body\}`/,
    },
    mobileFooter: {
      "Services link mapping": /\{ label: "Services", href: "#m-services" \}/,
      "Process link mapping": /\{ label: "Process", href: "#m-process" \}/,
      "About link mapping": /\{ label: "About", href: "#m-founder" \}/,
    },
  };
  assert.deepEqual(
    Object.keys(protectedSourceFacts).toSorted(),
    Object.keys(sources).toSorted(),
    "all 16 audited source groups must protect their source-level mappings and behaviors",
  );
  for (const [label, facts] of Object.entries(protectedSourceFacts)) {
    assertSourceFacts(sources[label], label, facts);
  }

  for (const fixture of [
    '<a className="transition-all hover:bg-blue-dark">Start</a>',
    '<button className="transition-colors active:translate-y-px">Start</button>',
    '<a className="transition-transform hover:scale-105">Start</a>',
    '<button className="transition-shadow hover:shadow-[0_0_28px_blue]">Start</button>',
    '<a className="shimmer transition-colors">Start</a>',
  ]) {
    assert.throws(
      () => assertRestrainedActionStates(fixture, "negative action fixture"),
      /must transition only intentional state properties|must reject scale, lift, glow, and heavy shadow states|must keep action feedback quiet without shimmer/,
    );
  }

  const fixtureContract = {
    name: "fixture Start a project",
    identity: /data-audited="primary"/,
    required: {
      href: /href="#contact"/,
      label: />Start a project</,
      "dimensions and spacing": /\bmin-h-11\b[\s\S]*\bgap-2\b[\s\S]*\bpx-5\b/,
      fill: /\bbg-blue\b[\s\S]*\btext-white\b/,
      shadow: /\bshadow-\[0_8px_22px_rgba\(31,94,255,0\.24\)\]/,
      states: /\bhover:bg-blue-dark active:bg-blue-dark\b/,
    },
  };
  const fixtureClass =
    "action-transition min-h-11 gap-2 bg-blue px-5 text-white shadow-[0_8px_22px_rgba(31,94,255,0.24)] hover:bg-blue-dark active:bg-blue-dark";

  assert.throws(
    () =>
      assertSourceActionContracts(
        `<a data-audited="primary" href="#contact" className="min-h-11 gap-2 bg-blue px-5 text-white shadow-[0_8px_22px_rgba(31,94,255,0.24)] hover:bg-blue-dark active:bg-blue-dark">Start a project</a>
         <a href="#other" className="${fixtureClass}">Other</a>`,
        "moved-transition fixture",
        [fixtureContract],
      ),
    /must apply action-transition to that action instance/,
    "moving action-transition to a neighboring action must fail",
  );
  assert.throws(
    () =>
      assertSourceActionContracts(
        '<a data-audited="primary" href="#contact" className="min-h-11 gap-2 bg-blue px-5 text-white shadow-[0_8px_22px_rgba(31,94,255,0.24)] hover:bg-blue-dark active:bg-blue-dark">Start a project</a>',
        "missing-transition fixture",
        [fixtureContract],
      ),
    /must apply action-transition to that action instance/,
    "removing action-transition from an audited action must fail",
  );
  assert.throws(
    () =>
      assertSourceActionContracts(
        `<a data-audited="primary" href="#wrong" className="${fixtureClass.replace("min-h-11", "min-h-10")}">Start a project</a>`,
        "contract-drift fixture",
        [fixtureContract],
      ),
    /changed its href|changed its dimensions and spacing/,
    "href or geometry drift inside the correct transitioned action must fail",
  );

  assert.doesNotMatch(renderedActionSources, /hover:(?:scale|translate-y|shadow|drop-shadow)-/);
});

test("uses one accessible Lucide interface icon family", () => {
  for (const path of collectTrackedTsx()) {
    assertIconSystem(read(path), path);
  }
});

test("keeps service and industry icons semantically paired", () => {
  const serviceSources = [
    read("components/sections/Services.tsx"),
    read("components/mobile/MobileServices.tsx"),
  ];
  const industrySources = [
    read("components/sections/Industries.tsx"),
    read("components/mobile/MobileIndustries.tsx"),
  ];
  const iconMappings = (source) =>
    [...source.matchAll(/\bicon:\s*([A-Z][A-Za-z0-9_]*)/g)].map(
      ([, icon]) => icon,
    );
  const assertAuditedIconTreatment = (source, label, component, size, strokeWidth) => {
    const renderedTags = [...source.matchAll(new RegExp(`<${component}\\b([^>]*)\\/?>`, "g"))];
    const message = `${label} must render ${component} at ${size}px with stroke ${strokeWidth}`;
    assert.equal(renderedTags.length, 1, message);

    const sizePattern = new RegExp(`\\bsize\\s*=\\s*\\{${size}\\}`);
    const strokePattern = new RegExp(
      `\\bstrokeWidth\\s*=\\s*\\{${String(strokeWidth).replace(".", "\\.")}\\}`,
    );
    assert.ok(
      renderedTags.every(([, attributes]) =>
        sizePattern.test(attributes) && strokePattern.test(attributes)),
      message,
    );
  };
  const auditedTreatments = [
    [
      "desktop Services",
      serviceSources[0],
      [["Icon", 19, 1.9], ["Check", 16, 2.1], ["ArrowUpRight", 17, 2]],
    ],
    [
      "mobile Services",
      serviceSources[1],
      [["ActiveIcon", 21, 1.8], ["Check", 15, 2.2], ["ArrowUpRight", 16, 2]],
    ],
    [
      "desktop Industries",
      industrySources[0],
      [["Icon", 21, 1.7], ["ArrowUpRight", 17, 2]],
    ],
    ["mobile Industries", industrySources[1], [["Icon", 19, 1.7]]],
  ];

  for (const source of serviceSources) {
    assert.deepEqual(iconMappings(source), [
      "MonitorSmartphone",
      "Workflow",
      "Wrench",
    ]);
    assert.doesNotMatch(source, /\bBlocks\b/);
  }

  for (const source of industrySources) {
    assert.deepEqual(iconMappings(source), [
      "Cross",
      "HardHat",
      "BriefcaseBusiness",
      "Utensils",
      "Scissors",
      "Building2",
    ]);
  }

  for (const [label, source, treatments] of auditedTreatments) {
    for (const [component, size, strokeWidth] of treatments) {
      assertAuditedIconTreatment(source, label, component, size, strokeWidth);

      for (const [property, fixtureSize, fixtureStroke] of [
        ["size", size + 1, strokeWidth],
        ["stroke", size, strokeWidth + 0.1],
      ]) {
        const fixture = `<${component} size={${fixtureSize}} strokeWidth={${fixtureStroke}} aria-hidden="true" />`;
        assert.throws(
          () =>
            assertAuditedIconTreatment(
              fixture,
              `${label} ${property} fixture`,
              component,
              size,
              strokeWidth,
            ),
          new RegExp(`must render ${component} at ${size}px with stroke ${strokeWidth}`),
        );
      }
    }
  }
});

test("keeps supporting interface icons restrained and consistent", () => {
  const retainedGlyphs = {
    "components/Navbar.tsx": ["ArrowUpRight", "Menu", "X"],
    "components/sections/Hero.tsx": ["ArrowDownRight", "ArrowUpRight"],
    "components/mobile/MobileHero.tsx": ["ArrowUpRight"],
    "components/sections/Services.tsx": ["ArrowUpRight", "Check", "MonitorSmartphone", "Workflow", "Wrench"],
    "components/mobile/MobileServices.tsx": ["ArrowUpRight", "Check", "MonitorSmartphone", "Workflow", "Wrench"],
    "components/sections/Industries.tsx": ["ArrowUpRight", "BriefcaseBusiness", "Building2", "Cross", "HardHat", "Scissors", "Utensils"],
    "components/mobile/MobileIndustries.tsx": ["BriefcaseBusiness", "Building2", "Cross", "HardHat", "Scissors", "Utensils"],
    "components/sections/SocialProof.tsx": ["CodeXml", "MessagesSquare", "ShieldCheck", "Waypoints"],
    "components/mobile/MobileTrust.tsx": ["CodeXml", "MessageCircle", "Route", "ShieldCheck"],
    "components/sections/OurStandard.tsx": ["Accessibility", "Check", "Gauge", "LayoutTemplate", "Smartphone"],
    "components/mobile/MobileStandard.tsx": ["Accessibility", "Check", "Gauge", "LayoutTemplate", "Smartphone"],
    "components/sections/WhyCOBRYKZ.tsx": ["Eye", "Handshake", "MessageCircleMore"],
    "components/mobile/MobileWhy.tsx": ["Eye", "Handshake", "MessageCircleMore"],
    "components/sections/GoodFit.tsx": ["Check", "Minus"],
    "components/mobile/MobileFit.tsx": ["Check", "Minus"],
    "components/sections/Process.tsx": ["ArrowUpRight"],
    "components/mobile/MobileProcess.tsx": ["Minus", "Plus"],
    "components/sections/FAQ.tsx": ["Minus", "Plus"],
    "components/mobile/MobileFAQ.tsx": ["Minus", "Plus"],
    "components/sections/Founder.tsx": ["ArrowUpRight", "Check"],
    "components/mobile/MobileFounder.tsx": ["ArrowUpRight", "Check"],
    "components/sections/FinalCTA.tsx": ["ArrowUpRight", "Check", "Mail", "MessageSquareText"],
    "components/mobile/MobileContact.tsx": ["ArrowUpRight", "Check", "Mail"],
    "components/CopyProjectNoteButton.tsx": ["Check", "Copy"],
    "components/mobile/MobileActionBar.tsx": ["ArrowUpRight", "LayoutGrid", "Route"],
    "components/Footer.tsx": ["ArrowUpRight", "Mail"],
  };
  const iconImports = (source) =>
    [...source.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']lucide-react["']/g)]
      .flatMap(([, names]) => names.split(","))
      .map((name) => name.trim().split(/\s+as\s+/)[0])
      .filter(Boolean)
      .sort();
  const noIconMotion = /(?:^|[\s"'`{])(?:[\w-]+:)*(?:-?rotate|scale|animate-(?:bounce|pulse|spin))[^\s"`}]*/;
  const jsxTags = (source) => {
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
  };
  const assertIconPresentation = (source, path, glyphs) => {
    const renderedIconNames = new Set([...glyphs, "Icon", "ActiveIcon"]);
    const stack = [];

    for (const tag of jsxTags(source)) {
      if (tag.closing) {
        const openIndex = stack.map(({ name }) => name).lastIndexOf(tag.name);
        if (openIndex !== -1) stack.splice(openIndex);
        continue;
      }

      if (renderedIconNames.has(tag.name)) {
        assert.doesNotMatch(
          tag.attributes,
          noIconMotion,
          `${path} must not add rotate, bounce, or scale motion to ${tag.name}`,
        );
        assert.match(
          tag.attributes,
          /\baria-hidden\s*=\s*(?:"true"|\{true\})/,
          `${path} must hide its adjacent-text ${tag.name} icon`,
        );
        for (const ancestor of stack) {
          if (!/^(?:a|article|button|div|span)$/.test(ancestor.name)) continue;
          assert.doesNotMatch(
            ancestor.attributes,
            noIconMotion,
            `${path} must not add rotate, bounce, or scale motion to an icon ancestor`,
          );
        }
      }

      if (!tag.selfClosing) stack.push(tag);
    }
  };
  const assertFaqControls = (source, label, size, control) => {
    const controlSizeTokens = control.split(" ");
    const controlClasses = [...source.matchAll(/<span\b[^>]*className="([^"]*)"[^>]*>/g)]
      .map(([, className]) => className.split(/\s+/))
      .find((classes) => controlSizeTokens.every((token) => classes.includes(token)));
    assert.ok(controlClasses, `${label} must retain its ${control} state control`);
    for (const className of ["rounded-lg", "border", "border-border"]) {
      assert.ok(
        controlClasses.includes(className),
        `${label} must retain its restrained bordered state control`,
      );
    }
    for (const className of ["flex", "items-center", "justify-center"]) {
      assert.ok(
        controlClasses.includes(className),
        `${label} must optically center its state glyph with flex, items-center, and justify-center`,
      );
    }
    assert.match(
      source,
      new RegExp(`\\{\\s*isOpen\\s*\\?\\s*\\(\\s*<Minus size=\\{${size}\\} strokeWidth=\\{2\\} aria-hidden="true"\\s*\\/>\\s*\\)\\s*:\\s*\\(\\s*<Plus size=\\{${size}\\} strokeWidth=\\{2\\} aria-hidden="true"`),
      `${label} must render Minus while open and Plus while closed`,
    );
  };

  for (const [path, glyphs] of Object.entries(retainedGlyphs)) {
    const source = read(path);
    assert.deepEqual(iconImports(source), glyphs, `${path} must retain its audited Lucide glyphs`);
    for (const glyph of glyphs) {
      assert.match(
        source,
        new RegExp(`(?:<${glyph}\\b|\\bicon:\\s*${glyph}\\b)`),
        `${path} must continue rendering ${glyph}`,
      );
    }

    assertIconPresentation(source, path, glyphs);
  }

  const desktopFaq = read("components/sections/FAQ.tsx");
  const mobileFaq = read("components/mobile/MobileFAQ.tsx");
  for (const [source, label, size, control] of [
    [desktopFaq, "desktop FAQ", 17, "h-9 w-9"],
    [mobileFaq, "mobile FAQ", 15, "h-8 w-8"],
  ]) {
    assertFaqControls(source, label, size, control);
  }

  const retainedContainers = {
    "components/sections/Services.tsx": "flex h-10 w-10 items-center justify-center rounded-lg border",
    "components/mobile/MobileServices.tsx": "flex h-11 w-11 items-center justify-center rounded-lg",
    "components/sections/SocialProof.tsx": "flex h-10 w-10 flex-none items-center justify-center rounded-lg border",
    "components/sections/OurStandard.tsx": [
      "hidden h-12 w-12 items-center justify-center rounded-lg bg-navy",
      "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-tint text-blue",
    ],
    "components/mobile/MobileStandard.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-navy",
    "components/sections/WhyCOBRYKZ.tsx": "flex h-11 w-11 items-center justify-center rounded-lg border",
    "components/mobile/MobileWhy.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-white",
    "components/sections/GoodFit.tsx": "flex h-6 w-6 flex-none items-center justify-center rounded-full",
    "components/mobile/MobileFit.tsx": "flex h-6 w-6 flex-none items-center justify-center rounded-full",
    "components/sections/FinalCTA.tsx": "flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.08]",
    "components/mobile/MobileProcess.tsx": "flex h-8 w-8 items-center justify-center rounded-lg border",
  };
  const assertRetainedContainers = (containers, readSource = read) => {
    for (const [path, required] of Object.entries(containers)) {
      for (const container of Array.isArray(required) ? required : [required]) {
        assert.ok(readSource(path).includes(container), `${path} must retain its audited icon container`);
      }
    }
  };
  assertRetainedContainers(retainedContainers);

  const invertedFaqFixture = `
    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border">
      {isOpen ? (
        <Plus size={17} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Minus size={17} strokeWidth={2} aria-hidden="true" />
      )}
    </span>
  `;
  assert.throws(
    () => assertFaqControls(invertedFaqFixture, "fixture FAQ", 17, "h-9 w-9"),
    /must render Minus while open and Plus while closed/,
  );
  for (const [offCenterClass, size, control] of [
    ["flex h-9 w-9 justify-center rounded-lg border border-border", 17, "h-9 w-9"],
    ["flex h-8 w-8 items-center rounded-lg border border-border", 15, "h-8 w-8"],
  ]) {
    const offCenterFaqFixture = `
      <span className="${offCenterClass}">
        {isOpen ? (
          <Minus size={${size}} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Plus size={${size}} strokeWidth={2} aria-hidden="true" />
        )}
      </span>
    `;
    assert.throws(
      () => assertFaqControls(offCenterFaqFixture, "off-center FAQ fixture", size, control),
      /must optically center its state glyph/,
    );
  }
  assert.throws(
    () => assertRetainedContainers(
      { "fixture-standard.tsx": retainedContainers["components/sections/OurStandard.tsx"] },
      () => "hidden h-12 w-12 items-center justify-center rounded-lg bg-navy",
    ),
    /must retain its audited icon container/,
  );
  const buttonMotionFixture = `
    <button className="transition-transform hover:scale-105">
      <Plus size={15} strokeWidth={2} aria-hidden="true" />
    </button>
  `;
  const wrapperMotionFixture = `
    <article className="group-hover:rotate-3">
      <div><span><Plus size={15} strokeWidth={2} aria-hidden="true" /></span></div>
    </article>
  `;
  assert.throws(
    () => assertIconPresentation(buttonMotionFixture, "fixture-button.tsx", ["Plus"]),
    /must not add rotate, bounce, or scale motion to an icon ancestor/,
  );
  assert.throws(
    () => assertIconPresentation(wrapperMotionFixture, "fixture-wrapper.tsx", ["Plus"]),
    /must not add rotate, bounce, or scale motion to an icon ancestor/,
  );

  const mobileActionBar = read("components/mobile/MobileActionBar.tsx");
  assert.match(mobileActionBar, /href="#m-services"\s+aria-label="Services"/s);
  assert.match(mobileActionBar, /href="#m-process"\s+aria-label="Process"/s);
  assert.match(mobileActionBar, /<LayoutGrid size=\{18\} strokeWidth=\{1\.9\} aria-hidden="true"/);
  assert.match(mobileActionBar, /<Route size=\{18\} strokeWidth=\{1\.9\} aria-hidden="true"/);
});

test("rejects interface icon bypasses in source strings", () => {
  const thirdPartyIcon = `
    import { Menu } from "@fixture/interface-icons";
    export const Fixture = () => <Menu size={16} strokeWidth={2} aria-hidden="true" />;
  `;
  const classOnlyThirdPartyIcon = `
    import { Menu } from "arbitrary-third-party-package";
    export const Fixture = () => <Menu className="h-4 w-4" aria-hidden="true" />;
  `;
  const lucideNamespaceWithoutAriaHidden = `
    import * as Lucide from "lucide-react";
    export const Fixture = () => <Lucide.Menu size={16} strokeWidth={2} />;
  `;
  const normalDependency = `
    import Image from "next/image";
    export const Fixture = () => <Image alt="" fill src="/brand.jpg" />;
  `;

  assert.throws(
    () => assertIconSystem(thirdPartyIcon, "fixture-third-party.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () => assertIconSystem(classOnlyThirdPartyIcon, "fixture-class-only.tsx"),
    /must come from lucide-react/,
  );
  assert.throws(
    () => assertIconSystem(lucideNamespaceWithoutAriaHidden, "fixture-namespace.tsx"),
    /must hide adjacent-text decorative Lucide\.Menu icons/,
  );
  assert.doesNotThrow(() => assertIconSystem(normalDependency, "fixture-image.tsx"));
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

test("renders first-party proof instead of repeated reassurance sections", () => {
  const desktopArtifactPath = join(root, "components/sections/BuildArtifact.tsx");
  assert.equal(existsSync(desktopArtifactPath), true, "desktop artifact is missing");

  const pageSource = read("app/page.tsx");
  const mobileExperience = read("components/mobile/MobileExperience.tsx");
  const pageAndExperiences = `${pageSource}\n${mobileExperience}`;

  assert.match(pageAndExperiences, /BuildArtifact/);
  assert.doesNotMatch(mobileExperience, /MobileBuildArtifact/);
  assert.doesNotMatch(pageSource, /<SocialProof \/>/);
  assert.doesNotMatch(
    pageAndExperiences,
    /<OurStandard \/>|<MobileStandard \/>|<WhyCOBRYKZ \/>|<MobileWhy \/>/,
  );

  const proofSources = `${read("components/sections/BuildArtifact.tsx")}\n${read("components/content/buildArtifact.ts")}`;
  assert.match(proofSources, /Lead with reputation/);
  assert.match(proofSources, /Compose mobile separately/);
  assert.match(proofSources, /Create one conversion path/);
});

test("avoids repeated generated-landing-page decoration", () => {
  const globals = read("app/globals.css");
  const renderedSources = [
    read("app/page.tsx"),
    read("components/mobile/MobileExperience.tsx"),
    ...collectTsx("components/sections").map((path) => read(path)),
    ...collectTsx("components/mobile").map((path) => read(path)),
  ].join("\n");

  assert.doesNotMatch(globals, /\.page-grid/);
  assert.doesNotMatch(renderedSources, /\bpage-grid\b/);
  assert.doesNotMatch(renderedSources, /Cormorant_Garamond/);
});

test("provides an honest project-note fallback", () => {
  const contactSources = [
    read("components/sections/FinalCTA.tsx"),
    read("components/mobile/MobileContact.tsx"),
  ].join("\n");

  assert.match(contactSources, /CopyProjectNoteButton/g);
  assert.match(contactSources, /info@cobrykz\.com/);
  assert.doesNotMatch(contactSources, /hello@cobrykz\.com/);
  assert.match(contactSources, /mailto:/);
  assert.doesNotMatch(contactSources, /message (?:was|has been) sent/i);
  assert.doesNotMatch(
    contactSources,
    /placeholder:text-white\/(?:[0-5]?\d)(?!\d)/,
  );
});

test("uses the brand film as accessible, non-blocking hero media", () => {
  const heroSources = [
    read("components/sections/Hero.tsx"),
    read("components/mobile/MobileHero.tsx"),
  ].join("\n");

  assert.equal((heroSources.match(/<video/g) || []).length, 2);
  assert.equal((heroSources.match(/autoPlay/g) || []).length, 2);
  assert.equal((heroSources.match(/muted/g) || []).length, 2);
  assert.equal((heroSources.match(/playsInline/g) || []).length, 2);
  assert.equal((heroSources.match(/poster="\/hero-video-poster\.jpg"/g) || []).length, 2);
  assert.equal((heroSources.match(/src="\/hero-video\.mp4"/g) || []).length, 2);
});

test("composes the mobile hero as a full-bleed video overlay", () => {
  const mobileHero = read("components/mobile/MobileHero.tsx");

  assert.match(mobileHero, /pt-16/);
  assert.match(mobileHero, /data-mobile-hero-backdrop/);
  assert.match(mobileHero, /data-mobile-video-stage/);
  assert.match(mobileHero, /data-mobile-text-overlay/);
  assert.match(mobileHero, /data-mobile-hero-copy/);
  assert.match(mobileHero, /data-mobile-hero-cta/);
  assert.match(mobileHero, /absolute inset-0/);
  assert.match(mobileHero, /object-contain object-\[center_top\]/);
  assert.match(mobileHero, /aspect-video/);
  assert.match(mobileHero, /bg-white/);
  assert.match(mobileHero, /rgba\(11,23,40,.78\)/);
  assert.doesNotMatch(mobileHero, /scale-\[|object-cover|data-mobile-hero-ambient/);
  assert.doesNotMatch(mobileHero, /blur-|brightness-|contrast-|saturate-/);
  assert.doesNotMatch(mobileHero, /bg-gradient-to-r from-navy\/70/);
  assert.equal((mobileHero.match(/href="#m-contact"/g) || []).length, 1);
  assert.doesNotMatch(mobileHero, /grid-cols-\[46%_54%\]|data-mobile-portrait-stage/);

  const copyEnd = mobileHero.indexOf("data-mobile-hero-cta");
  const ctaLink = mobileHero.indexOf('href="#m-contact"');
  assert.ok(copyEnd > -1 && ctaLink > copyEnd, "CTA must render outside the copy overlay");
});

test("uses selective editorial depth on desktop", () => {
  const desktopSections = {
    services: read("components/sections/Services.tsx"),
    industries: read("components/sections/Industries.tsx"),
    process: read("components/sections/Process.tsx"),
    founder: read("components/sections/Founder.tsx"),
    fit: read("components/sections/GoodFit.tsx"),
    faq: read("components/sections/FAQ.tsx"),
    contact: read("components/sections/FinalCTA.tsx"),
  };
  const desktopSource = Object.values(desktopSections).join("\n");
  const surfaceValues = [
    ...desktopSource.matchAll(/data-editorial-surface="([^"]+)"/g),
  ].map((match) => match[1]);

  assert.equal(surfaceValues.length, 4);
  assert.deepEqual(surfaceValues.sort(), ["faq", "fit", "process", "services"]);

  for (const anchor of ["industries", "founder", "contact"]) {
    assert.doesNotMatch(desktopSections[anchor], /data-editorial-surface/);
    assert.match(desktopSections[anchor], /\bbg-navy\b/);
  }

  assert.match(desktopSections.founder, /data-founder-glow/);
});

test("composes selective editorial depth independently on mobile", () => {
  const mobileSections = {
    services: read("components/mobile/MobileServices.tsx"),
    industries: read("components/mobile/MobileIndustries.tsx"),
    process: read("components/mobile/MobileProcess.tsx"),
    founder: read("components/mobile/MobileFounder.tsx"),
    fit: read("components/mobile/MobileFit.tsx"),
    faq: read("components/mobile/MobileFAQ.tsx"),
    contact: read("components/mobile/MobileContact.tsx"),
  };
  const mobileSource = Object.values(mobileSections).join("\n");
  const surfaceValues = [
    ...mobileSource.matchAll(/data-editorial-surface="([^"]+)"/g),
  ].map((match) => match[1]);

  assert.equal(surfaceValues.length, 4);
  assert.deepEqual(surfaceValues.sort(), ["faq", "fit", "process", "services"]);

  for (const anchor of ["industries", "founder", "contact"]) {
    assert.doesNotMatch(mobileSections[anchor], /data-editorial-surface/);
    assert.match(mobileSections[anchor], /\bbg-navy\b/);
  }

  assert.match(mobileSections.founder, /data-founder-glow/);
});
