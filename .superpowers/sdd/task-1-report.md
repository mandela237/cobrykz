# Task 1 implementation report: icon-system guardrails and audit

## Outcome

Added the requested tracked-source contract test and completed the premium icon
audit. Production components were not modified.

## Changed files

- `tests/presentation-quality.test.mjs`
  - Adds `uses one accessible Lucide interface icon family`.
  - Scans `git ls-files -- '*.tsx'` rather than an untracked filesystem set.
  - Positively constrains every PascalCase JSX component imported from a bare
    external package to `lucide-react` or the explicitly documented
    `next/image` framework allowlist; local relative and `@/` imports remain
    valid. It also limits inline SVG to `components/CobrykzLogo.tsx` and
    requires `aria-hidden="true"` on imported Lucide icons and the existing
    `Icon`/`ActiveIcon` render aliases.
- `docs/reports/2026-07-22-icon-audit.md`
  - Records every icon-bearing component/section, optical treatment, container,
    accessibility treatment, and the minimum later replacement set.

## TDD evidence

1. Added the named source-contract test before changing any implementation.
2. The existing tracked source already met all three guardrails, so the contract
   passed on its first execution; no production change is permitted for this
   task. This is baseline-conformance evidence rather than a feature red phase.
3. During test-only refactoring, the focused test and lint correctly failed on a
   JavaScript block-scoping syntax error. The error was corrected before the
   final green run. No production source was changed.
4. Current final focused run: 12/12 passed, including `uses one accessible Lucide
   interface icon family`.
5. Current final full suite: 12/12 passed. Lint passed. Production build passed.

## Verification

Historical note: the two 11-test results below record Task 1 at its original
commit and are superseded by the final Task 4 suite. They are retained as
time-of-task evidence, not presented as the current suite total. Task 4's
14/14 result is the authoritative final count.

- `npm test -- --test-name-pattern='uses one accessible Lucide interface icon family'` — pass (11 tests, 0 failures)
- `npm run lint` — pass
- `npm run build` — pass; Next emitted its pre-existing multi-lockfile workspace-root warning
- `npm test` — pass (11 tests, 0 failures)

## Self-review

- The guardrail is structural: it does not snapshot or constrain unrelated
  layout classes.
- The source set is explicitly tracked TSX, preventing generated/untracked
  files from changing the contract result.
- `CobrykzLogo.tsx` is deliberately the only inline-SVG exception and is
  affirmed as an accessible brand mark rather than hidden decoration.
- The audit preserves scope: it recommends one later semantic replacement
  (`Blocks` to `Workflow`) across both service variants and makes no component,
  layout, copy, color, or interaction change.

## Concerns

- A literal red phase against production was impossible without intentionally
  violating an already conforming source tree, which would contradict the
  task's prohibition on production-component changes. The report preserves that
  fact rather than fabricating a red result.
- The Next build warning identifies the parent repository's additional
  `package-lock.json`; the build itself succeeded and this task did not change
  build configuration.
- Commit hash: `7ddd92df76f8a855f60cc69104bfe134a20a1855` (`test: define premium icon system guardrails`).

## Review-fix follow-up

### Changed file

- `tests/presentation-quality.test.mjs`
  - Replaces the package-name denylist with import-provenance checks. The final
    form has no presentation-prop heuristic: every bare-package PascalCase JSX
    import must come from `lucide-react` or the documented `next/image`
    allowlist.
  - Tracks named, aliased, and `import * as Lucide` imports; `<Lucide.Menu />`
    is now required to carry `aria-hidden="true"` just like a named Lucide
    component.
  - Preserves ordinary dependencies: the fixture proves a normal `next/image`
    component is not treated as an interface icon.
  - Adds source-string fixtures for a third-party icon import and an unhidden
    Lucide namespace member.

### Explicit red/green evidence

1. **Red:** `node --test --test-name-pattern='rejects interface icon bypasses in source strings' tests/presentation-quality.test.mjs` failed as expected with `Missing expected exception` while `assertIconSystem` was a no-op. The fixture established the non-Lucidely sourced icon bypass requirement before implementation.
2. **Green fixture:** the same command passed: 1 test passed, 0 failed. It rejects the third-party icon, rejects `<Lucide.Menu />` without `aria-hidden`, and permits the ordinary image import.
3. **Green focused guardrail:** `npm test -- --test-name-pattern='uses one accessible Lucide interface icon family'` passed: 12 tests passed, 0 failed.
4. **Green full suite:** `npm test` passed: 12 tests passed, 0 failed.
5. **Lint:** `npm run lint` passed with no errors.

### Commit and self-review

- Commit: `7626c8a8ac9d27f7a8dad12ae794fe0aba1a2c97` (`test: harden Lucide icon source guardrail`)
- The structural check has no package-name regex and does not constrain ordinary
  module imports. It evaluates only components that present as decorative
  interface glyphs, while direct Lucide tags (including namespace members) are
  always checked for `aria-hidden`.
- No production components, layout, copy, icon selection, deployment, or remote
  state changed.

## Second review-fix follow-up

### Changed file

- `tests/presentation-quality.test.mjs`
  - Removes the bypassable `size`/`strokeWidth` presentation heuristic.
  - Adds `isBareExternalModule` and a narrow `allowedExternalJsxModules` set.
    `next/image` is the only allowed non-icon bare module because it is the
    only such PascalCase JSX import in the tracked repository source.
  - Leaves relative and `@/` application imports unrestricted, while all bare
    package PascalCase JSX components must be Lucide or the documented
    framework exception.
  - Adds a class-only third-party fixture:
    `<Menu className="h-4 w-4" aria-hidden="true" />`.

### Explicit red/green evidence

1. **Red:** `node --test --test-name-pattern='rejects interface icon bypasses in source strings' tests/presentation-quality.test.mjs` failed as expected with `Missing expected exception` for the new class-only third-party fixture; the prior presentation heuristic did not detect it.
2. **Green fixture:** the same command passed: 1 test passed, 0 failed. It now rejects both third-party forms, rejects an unhidden Lucide namespace member, and permits the `next/image` fixture.
3. **Green focused guardrail:** `npm test -- --test-name-pattern='uses one accessible Lucide interface icon family'` passed: 12 tests passed, 0 failed.
4. **Green full suite:** `npm test` passed: 12 tests passed, 0 failed.
5. **Lint:** `npm run lint` passed with no errors.

### Commit and self-review

- Commit: `52c5abbcd216cad72f20d25713fdb86cb688e863` (`test: constrain external JSX icon imports`)
- The final contract is positive and independent of icon styling props: it
  derives import provenance for every PascalCase JSX component, permits only
  Lucide or the one current framework exception for bare packages, and retains
  the namespace and dynamic-alias `aria-hidden` checks.
- No production components, layout, copy, icon selection, deployment, or remote
  state changed.
