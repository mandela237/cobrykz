# COBRYKZ Premium Icon System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize COBRYKZ interface icons around a restrained Lucide system without changing the approved editorial composition.

**Architecture:** Keep icon ownership local to each existing section and avoid introducing a global abstraction unless the audit proves genuine repetition. Add source-level guardrails first, then refine the high-priority Services and Industries icons, normalize supporting controls, and finish with full-page visual verification and a replacement report.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React, Node test runner, ESLint, Playwright-compatible browser QA.

## Global Constraints

- Lucide is the only interface icon family; `CobrykzLogo.tsx` is the sole brand-mark exception.
- Favor refinement over replacement; replace an icon only for better semantics, optical balance, or consistency.
- Do not increase icon count.
- Preserve layout, section composition, typography, copy, color palette, surfaces, forms, navigation behavior, and the approved hero.
- Permit only minor icon alignment, sizing, stroke, container, and icon-hover adjustments.
- Use outlined icons consistently and keep icons subordinate to typography.
- Decorative icons must use `aria-hidden="true"`; visible text must continue communicating every action.
- Do not add gradients, illustrations, decorative shapes, or playful motion.

---

### Task 1: Establish Icon-System Guardrails and Audit

**Files:**
- Modify: `tests/presentation-quality.test.mjs`
- Create: `docs/reports/2026-07-22-icon-audit.md`

**Interfaces:**
- Consumes: existing component source and `lucide-react` imports.
- Produces: source-contract tests and an audit table used by Tasks 2–4.

- [ ] **Step 1: Write the failing source-contract test**

Add a test that scans tracked `.tsx` files and asserts that interface icon imports come only from `lucide-react`, that inline `<svg>` appears only in `components/CobrykzLogo.tsx`, and that rendered Lucide icons include `aria-hidden="true"` when adjacent text carries the meaning.

```js
test("uses one accessible Lucide interface icon family", () => {
  const sourceFiles = trackedTsxFiles();
  const inlineSvgFiles = sourceFiles.filter((file) => read(file).includes("<svg"));

  assert.deepEqual(inlineSvgFiles, ["components/CobrykzLogo.tsx"]);
  assert.equal(
    sourceFiles.some((file) => /from ["'](?:react-icons|@heroicons)/.test(read(file))),
    false,
  );
});
```

- [ ] **Step 2: Run the focused test and record the initial result**

Run: `node --test --test-name-pattern="one accessible Lucide" tests/presentation-quality.test.mjs`

Expected: FAIL until the helper/audit expectations are fully implemented.

- [ ] **Step 3: Complete the audit report**

Document every current icon by section with columns for component, current glyph, purpose, retain/replace, reason, optical size, stroke, container, and accessibility. Explicitly mark the logo exception and identify the minimum replacement set.

- [ ] **Step 4: Complete the source guardrail**

Implement the test using the repository’s existing source-reading helpers. Keep the assertion structural and avoid snapshotting layout classes unrelated to icons.

- [ ] **Step 5: Run the focused test**

Run: `node --test --test-name-pattern="one accessible Lucide" tests/presentation-quality.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the audit and guardrail**

```bash
git add tests/presentation-quality.test.mjs docs/reports/2026-07-22-icon-audit.md
git commit -m "test: define premium icon system guardrails"
```

### Task 2: Refine Services and Industries

**Files:**
- Modify: `components/sections/Services.tsx`
- Modify: `components/mobile/MobileServices.tsx`
- Modify: `components/sections/Industries.tsx`
- Modify: `components/mobile/MobileIndustries.tsx`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: the replacement decisions and optical targets from `docs/reports/2026-07-22-icon-audit.md`.
- Produces: matching desktop/mobile semantic icon sets for Services and Industries.

- [ ] **Step 1: Add failing section-specific assertions**

Assert that desktop and mobile service arrays use the same three selected Lucide glyphs, desktop and mobile industry arrays use the same six selected Lucide glyphs, and all rendered service/industry icons remain decorative and within the audited optical size/stroke ranges.

- [ ] **Step 2: Verify the section test fails**

Run: `node --test --test-name-pattern="service and industry icons" tests/presentation-quality.test.mjs`

Expected: FAIL against the pre-normalization source.

- [ ] **Step 3: Apply the minimum semantic replacements**

Update only the icon imports, icon mappings, icon-specific dimensions/strokes, and icon-container classes justified by the audit. Keep all text, structural elements, responsive grids, padding, section classes, and interactions unchanged.

- [ ] **Step 4: Perform an optical comparison**

Capture focused desktop and mobile views of Services and Industries. Check baseline alignment, perceived size, negative space, and whether any glyph attracts more attention than its neighbors. Adjust individual icon size by at most the minimum required to equalize perceived weight.

- [ ] **Step 5: Run focused and complete tests**

Run:

```bash
node --test --test-name-pattern="service and industry icons" tests/presentation-quality.test.mjs
npm test
```

Expected: all tests PASS.

- [ ] **Step 6: Commit the primary icon refinement**

```bash
git add components/sections/Services.tsx components/mobile/MobileServices.tsx components/sections/Industries.tsx components/mobile/MobileIndustries.tsx tests/presentation-quality.test.mjs
git commit -m "refactor: normalize service and industry icons"
```

### Task 3: Normalize Supporting Interface Icons

**Files:**
- Modify only where the audit requires changes: `components/Navbar.tsx`
- Modify only where the audit requires changes: `components/sections/Hero.tsx`
- Modify only where the audit requires changes: `components/sections/Process.tsx`
- Modify only where the audit requires changes: `components/sections/Founder.tsx`
- Modify only where the audit requires changes: `components/sections/WhyCOBRYKZ.tsx`
- Modify only where the audit requires changes: `components/sections/OurStandard.tsx`
- Modify only where the audit requires changes: `components/sections/SocialProof.tsx`
- Modify: `components/sections/FAQ.tsx`
- Modify: `components/mobile/MobileFAQ.tsx`
- Modify only where the audit requires changes: `components/sections/FinalCTA.tsx`
- Modify only where the audit requires changes: `components/mobile/MobileContact.tsx`
- Modify only where the audit requires changes: `components/CopyProjectNoteButton.tsx`
- Modify only where the audit requires changes: `components/Footer.tsx`
- Modify only where the audit requires changes: matching `components/mobile/*` files
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: the audited retain/replace decisions.
- Produces: a consistent supporting icon treatment without layout or behavioral changes.

- [ ] **Step 1: Add failing FAQ and supporting-icon assertions**

Assert identical Plus/Minus glyph logic, stroke, optical control size, and alignment between desktop and mobile FAQ. Assert prohibited transform utilities such as icon rotation, bounce, and scale are absent from icon render sites.

- [ ] **Step 2: Verify the focused test fails where normalization is needed**

Run: `node --test --test-name-pattern="supporting interface icons" tests/presentation-quality.test.mjs`

Expected: FAIL until audited differences are normalized.

- [ ] **Step 3: Apply audited supporting changes only**

Retain already-correct navigation, hero, process, founder, checklist, contact, copy, and footer glyphs. Change only inconsistent icon sizes/strokes, FAQ control treatment, unnecessary icon-only containers, or icon-specific hover classes documented in the audit. Do not modify surrounding layout classes or interaction logic.

- [ ] **Step 4: Verify accessibility and interaction behavior**

Check navigation labels, FAQ `aria-expanded`/`aria-controls`, form labels, copy status, mail links, and submit actions. Confirm every icon-only visual is hidden from assistive technology and every action retains text.

- [ ] **Step 5: Run focused and complete tests**

Run:

```bash
node --test --test-name-pattern="supporting interface icons" tests/presentation-quality.test.mjs
npm test
```

Expected: all tests PASS.

- [ ] **Step 6: Commit supporting normalization**

Stage only files actually changed, then commit:

```bash
git commit -m "refactor: align supporting interface icons"
```

### Task 4: Final Visual Review and Delivery Evidence

**Files:**
- Create: `docs/reports/2026-07-22-premium-icon-system.md`
- Create: `docs/reports/assets/2026-07-22-icons-desktop.png`
- Create: `docs/reports/assets/2026-07-22-icons-mobile.png`

**Interfaces:**
- Consumes: the final implementation and audit report.
- Produces: the user-facing replacement/retention report and visual evidence.

- [ ] **Step 1: Run complete static verification**

Run:

```powershell
npm test
$iconFiles = git ls-files '*.js' '*.mjs' '*.ts' '*.tsx'
npx eslint $iconFiles
npm run build
git diff --check
```

Expected: tests, tracked-source lint, build, and diff hygiene all PASS.

- [ ] **Step 2: Run responsive browser QA**

Inspect at 375px and 1440px, plus spot checks at 320px, 430px, 768px, and 1280px. Verify no overflow, no clipped controls, no icon-dominant focal points, consistent optical balance, keyboard-visible focus, FAQ behavior, form actions, and reduced-motion behavior.

- [ ] **Step 3: Capture final evidence**

Save full-page desktop and mobile screenshots to the exact asset paths above. Capture the production-style local build rather than a development error overlay or stale deployment.

- [ ] **Step 4: Write the final replacement report**

Include:

- Chosen family: Lucide.
- Every `old → new` replacement and its reason.
- Every removed or simplified icon container.
- Major retained icons grouped by section with rationale.
- Verification commands and results.
- Links to both screenshots.
- An explicit statement that layout, typography, copy, colors, section composition, and interaction behavior were preserved.

- [ ] **Step 5: Commit delivery evidence**

```bash
git add docs/reports/2026-07-22-premium-icon-system.md docs/reports/assets/2026-07-22-icons-desktop.png docs/reports/assets/2026-07-22-icons-mobile.png
git commit -m "docs: report premium icon system review"
```
