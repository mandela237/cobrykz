# Mobile Homepage Visual Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pass the 390px Homepage visual gate with a compact accessible mobile shell, first-viewport Atlas entry, architectural Atlas planes, differentiated chapters, and compact footer while preserving desktop and frozen content.

**Architecture:** Keep server-authored content and desktop components intact. Add one focused client mobile-navigation island to `SiteHeader`, derive Atlas plane groups from the existing definition in `MobileAtlasPath`, and use max-767px CSS to recompose existing wrappers without changing IA.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind utilities, authored CSS, Node test runner.

## Global Constraints

- Preserve all frozen copy, destinations, information architecture, and Homepage chapter order.
- Preserve desktop presentation at 768px and above.
- Do not modify the Solutions hub.
- Keep all interactive targets at least 44px.
- Add no dependencies and no new business information.

---

### Task 1: Accessible mobile header

**Files:**
- Create: `components/layout/MobileNavigation.tsx`
- Modify: `components/layout/SiteHeader.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-chaptered-atlas-contract.test.mjs`

**Interfaces:**
- Consumes: `primaryNavigation`, `primaryCta`, and `solutions`.
- Produces: `MobileNavigation`, a client component with no props and an anchored menu panel.

- [ ] **Step 1: Write the failing header contract**

Require `SiteHeader` to render a max-767 mobile shell and min-768 unchanged
desktop shell. Require `MobileNavigation` to include `aria-expanded`,
`aria-controls`, focus transfer, Escape handling, outside-pointer handling,
link-close behavior, and maps over all three shared navigation sources.

- [ ] **Step 2: Run the focused test to verify RED**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: FAIL because `MobileNavigation.tsx` and the mobile shell do not exist.

- [ ] **Step 3: Implement the focused island**

Use `useEffect`, `useRef`, and `useState`. On open, focus the first panel link.
Register `keydown` and `pointerdown` listeners only while open. Escape closes
and restores trigger focus; outside pointer closes; link clicks close. Render
the exact shared navigation, solution, and CTA destinations.

- [ ] **Step 4: Add max-767 shell styles**

Add `.site-header-mobile`, `.mobile-navigation__trigger`, and
`.mobile-navigation__panel` rules under `@media (max-width: 767px)`. Keep the
existing header subtree visible only from 768px without changing its internal
markup or classes.

- [ ] **Step 5: Run focused tests**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: PASS.

### Task 2: First-viewport opening and architectural Atlas planes

**Files:**
- Modify: `components/mobile/MobileAtlasPath.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-chaptered-atlas-contract.test.mjs`

**Interfaces:**
- Consumes: `AtlasDefinition.layers`, `AtlasDefinition.nodes`,
  `AtlasDefinition.connections`, node `kind`, and connection `state`.
- Produces: grouped `<li data-atlas-layer>` planes and connector state hooks
  without changing the selection callback.

- [ ] **Step 1: Write failing Atlas/opening contracts**

Require definition layers to drive grouping, require every node to remain
rendered once, require `data-atlas-layer`, `data-atlas-kind`, and
`data-atlas-connection-state` hooks, and require compact-opening CSS while
retaining the current 42px H1 and 17px lead sizes.

- [ ] **Step 2: Run focused test to verify RED**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: FAIL because nodes are still one uniform list and no compact opening
contract exists.

- [ ] **Step 3: Group existing nodes by definition layer**

Build layer groups by matching node bounds to layer bounds and retain
definition order. Render each node once inside its plane. Derive each plane's
connection state from connections touching its nodes; do not create labels not
already present in `definition.layers`.

- [ ] **Step 4: Recompose the first viewport**

Reduce only mobile opening paddings/gaps/action layout. Keep the artifact label
and first Atlas plane visible within the 390x844 composition. Style planes with
controlled inset depth, staggered geometry, and connector rails; keep readable
type values unchanged.

- [ ] **Step 5: Run focused tests**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: PASS.

### Task 3: Differentiate disclosure chapters and compact footer

**Files:**
- Modify: `components/layout/SiteFooter.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-chaptered-atlas-contract.test.mjs`

**Interfaces:**
- Consumes: existing Homepage wrapper classes, `companyLinks`, `solutions`,
  `primaryCta`, and `siteIdentity`.
- Produces: mobile-specific footer wrappers and chapter-specific CSS without
  changing disclosure behavior.

- [ ] **Step 1: Write failing composition/footer contracts**

Require distinct outcome lead-result, ruled-ledger, offset-trust, framed-AI,
and process-rail selectors. Require a max-767 two-column footer sitemap and
verify that the footer still maps all solution/company links and renders the
CTA/email.

- [ ] **Step 2: Run focused test to verify RED**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: FAIL because the footer lacks mobile composition hooks and chapter
selectors do not express the required distinctions.

- [ ] **Step 3: Add footer composition hooks**

Add semantic class names to existing footer regions only. Use CSS at max 767px
for a compact brand block and two-column sitemap. Preserve desktop classes,
content, destinations, and 44px links.

- [ ] **Step 4: Strengthen chapter-specific composition**

Use wrapper-scoped CSS only: emphasize the first open outcome, ruled solution
rows, offset trust rows, inset AI frame, and connected process rail. Do not
change content arrays or disclosure state.

- [ ] **Step 5: Run focused tests**

Run: `node --test tests/mobile-chaptered-atlas-contract.test.mjs`
Expected: PASS.

### Task 4: Verification and report

**Files:**
- Modify: `.superpowers/sdd/mobile-task-3-report.md`

- [ ] **Step 1: Run verification**

Run:

```text
node --test tests/mobile-chaptered-atlas-contract.test.mjs tests/presentation-quality.test.mjs tests/visual-direction-contract.test.mjs
npm test
npx tsc --noEmit
npm run lint
npm run build
git diff --check
```

Expected: all tests and commands pass; build may emit only the existing
multiple-lockfile warning.

- [ ] **Step 2: Audit scope**

Verify `git diff -- app/solutions components/solutions` is empty and confirm
desktop-specific header/footer markup and min-768 presentation are unchanged.

- [ ] **Step 3: Append report and commit**

Record RED/GREEN evidence, responsive checks, desktop preservation, and any
remaining concern in `.superpowers/sdd/mobile-task-3-report.md`. Commit only
the intended tracked implementation/tests/docs.
