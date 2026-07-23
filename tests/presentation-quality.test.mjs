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
    /\.action-transition\s*{[^}]*var\(--control-transition\)[^}]*}/s,
    "equivalent action color states must consume --control-transition",
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
    /\.bg-navy :focus-visible,\s*\.bg-footer-bg :focus-visible\s*{[^}]*var\(--focus-ring-dark\)/s,
  );

  const transitionConsumers = {
    navbar: 5,
    hero: 2,
    services: 1,
    industries: 1,
    process: 1,
    founder: 1,
    contact: 2,
    footer: 3,
    copyNote: 1,
    mobileActionBar: 3,
    mobileHero: 1,
    mobileServices: 2,
    mobileFit: 1,
    mobileFounder: 1,
    mobileContact: 2,
    mobileFooter: 1,
  };
  for (const [label, count] of Object.entries(transitionConsumers)) {
    assert.equal(
      (sources[label].match(/\baction-transition\b/g) || []).length,
      count,
      `${label} must apply the shared timing only to audited action roles`,
    );
  }

  const protectedContracts = {
    navbar: [
      /href="#contact"[\s\S]*?min-h-11[\s\S]*?bg-blue[\s\S]*?px-5[\s\S]*?shadow-\[0_8px_22px_rgba\(31,94,255,0\.24\)\][\s\S]*?>\s*Start a project/s,
      /href="#m-contact"\s+onClick=\{closeMenu\}[\s\S]*?min-h-12 w-full[\s\S]*?bg-blue px-5[\s\S]*?>\s*Start a project/s,
      /onClick=\{\(\) => setMobileOpen\(\(open\) => !open\)\}/,
      /href=\{link\.mobileHref\}\s+onClick=\{closeMenu\}/s,
    ],
    hero: [
      /href="#contact"[\s\S]*?min-h-12[\s\S]*?bg-blue px-6[\s\S]*?shadow-\[0_10px_28px_rgba\(31,94,255,0\.26\)\][\s\S]*?>\s*Start a project/s,
      /href="#process"[\s\S]*?min-h-12[\s\S]*?border-border bg-white px-6[\s\S]*?shadow-\[0_8px_24px_rgba\(11,23,40,0\.05\)\][\s\S]*?>\s*See how I work/s,
    ],
    contact: [
      /onSubmit=\{handleSubmit\}/,
      /type="submit"[\s\S]*?min-h-12 w-full[\s\S]*?bg-blue px-6[\s\S]*?shadow-\[0_10px_28px_rgba\(31,94,255,0\.28\)\][\s\S]*?>\s*Open email draft/s,
    ],
    mobileHero: [
      /href="#m-contact"[\s\S]*?min-h-12 w-full max-w-\[390px\][\s\S]*?bg-blue px-4[\s\S]*?shadow-\[0_8px_22px_rgba\(31,94,255,0\.18\)\][\s\S]*?>\s*Start a project/s,
    ],
    mobileActionBar: [
      /href="#m-services"\s+aria-label="Services"[\s\S]*?m-control/s,
      /href="#m-process"\s+aria-label="Process"[\s\S]*?m-control/s,
      /href="#m-contact"[\s\S]*?m-control[\s\S]*?bg-blue px-4[\s\S]*?>\s*Start a project/s,
    ],
    mobileContact: [
      /onSubmit=\{handleSubmit\}/,
      /type="submit"[\s\S]*?m-control[\s\S]*?w-full[\s\S]*?bg-blue px-5[\s\S]*?>\s*Open email draft/s,
    ],
  };
  for (const [label, contracts] of Object.entries(protectedContracts)) {
    for (const contract of contracts) {
      assert.match(sources[label], contract, `${label} changed a protected action contract`);
    }
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
