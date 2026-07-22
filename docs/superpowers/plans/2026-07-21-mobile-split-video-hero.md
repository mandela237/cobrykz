# Mobile Split Video Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the mobile hero as a persistent 46/54 text-and-video split while preserving readable copy, a dominant video panel, and the existing desktop hero.

**Architecture:** Keep the change isolated to `MobileHero.tsx`. Use one two-column CSS grid for the full hero, with copy in the left grid cell and the existing video in the right grid cell; enforce the structural contract with source tests and validate actual geometry in the browser at four mobile widths.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner, GStack browser QA.

## Global Constraints

- The mobile hero uses a 46/54 text-to-video split from 320px through 767px.
- The video fills the right column from top to bottom with `object-cover` and an explicit focal position.
- The copy column contains the founder-led label, shortened headline, one supporting sentence, and one primary CTA.
- The secondary circular exploration action is removed.
- The hero remains approximately 520px tall and never stacks on supported mobile widths.
- `/hero-video.mp4`, `/hero-video-poster.jpg`, autoplay, muted, loop, and inline playback remain unchanged.
- The desktop hero is unchanged.

---

### Task 1: Lock the Mobile Split Contract

**Files:**
- Modify: `tests/presentation-quality.test.mjs`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: The source markup exported by `components/mobile/MobileHero.tsx`.
- Produces: A regression test requiring the split grid, right-side video, single CTA, and no secondary arrow.

- [ ] **Step 1: Write the failing source test**

Append this test to `tests/presentation-quality.test.mjs`:

```js
test("composes the mobile hero as a persistent text-video split", () => {
  const mobileHero = read("components/mobile/MobileHero.tsx");

  assert.match(mobileHero, /grid-cols-\[46%_54%\]/);
  assert.match(mobileHero, /min-h-\[520px\]/);
  assert.match(mobileHero, /data-mobile-hero-copy/);
  assert.match(mobileHero, /data-mobile-portrait-stage/);
  assert.match(mobileHero, /object-cover/);
  assert.match(mobileHero, /object-\[52%_center\]/);
  assert.equal((mobileHero.match(/href="#m-contact"/g) || []).length, 1);
  assert.doesNotMatch(mobileHero, /Explore services|ArrowDown/);
});
```

- [ ] **Step 2: Run the test and verify the intended failure**

Run: `npm test`

Expected: seven existing tests pass and `composes the mobile hero as a persistent text-video split` fails because the current hero stacks the video above the copy.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/presentation-quality.test.mjs
git commit -m "test: define mobile split hero contract"
```

### Task 2: Build the Split Mobile Hero

**Files:**
- Modify: `components/mobile/MobileHero.tsx`
- Test: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: `/hero-video.mp4`, `/hero-video-poster.jpg`, `Manrope`, and `ArrowUpRight`.
- Produces: `MobileHero(): JSX.Element`, a 46/54 grid with one project CTA.

- [ ] **Step 1: Replace the stacked layout with the split grid**

Remove `ArrowDown` from the Lucide import. Replace the section contents with this structure while retaining the existing `mobileHeroSans` declaration:

```tsx
<section
  id="m-top"
  className="relative isolate grid min-h-[520px] grid-cols-[46%_54%] overflow-hidden border-b border-border bg-gray-light text-navy"
>
  <div
    data-mobile-hero-copy
    className="relative z-20 flex min-w-0 flex-col justify-center px-3 pb-8 pt-24 min-[350px]:px-4"
  >
    <p className={`${mobileHeroSans.className} flex items-center gap-2 text-[10px] font-semibold leading-4 text-slate`}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-evergreen" aria-hidden="true" />
      Founder-led web design
    </p>

    <h1 className={`${mobileHeroSans.className} mt-5 text-[25px] font-normal leading-[1.04] tracking-[-0.02em] text-navy min-[350px]:text-[28px] min-[400px]:text-[31px]`}>
      A website that
      <span className="mt-1 block font-serif text-[31px] font-normal italic leading-none text-blue min-[350px]:text-[35px] min-[400px]:text-[38px]">
        earns trust.
      </span>
    </h1>

    <p className={`${mobileHeroSans.className} mt-4 text-[12px] font-medium leading-[1.55] text-navy/80 min-[400px]:text-[13px]`}>
      Built for local businesses whose website no longer matches their work.
    </p>

    <a
      href="#m-contact"
      className={`${mobileHeroSans.className} shimmer mt-6 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-2 text-[11px] font-semibold text-white shadow-[0_8px_22px_rgba(31,94,255,0.2)] transition-colors hover:bg-blue-dark min-[350px]:text-[12px]`}
    >
      Start a project
      <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
    </a>
  </div>

  <div
    data-mobile-portrait-stage
    className="relative min-w-0 overflow-hidden border-l border-border bg-[#eef3f7]"
  >
    <video
      data-mobile-hero-backdrop
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-video-poster.jpg"
      className="h-full w-full object-cover object-[52%_center]"
      aria-label="COBRYKZ brand animation"
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  </div>
</section>
```

- [ ] **Step 2: Run source tests**

Run: `npm test`

Expected: all seven existing tests plus the new mobile split test pass.

- [ ] **Step 3: Run focused lint**

Run: `npx eslint components/mobile/MobileHero.tsx tests/presentation-quality.test.mjs`

Expected: exit code 0 with no diagnostics.

- [ ] **Step 4: Commit the component implementation**

```bash
git add components/mobile/MobileHero.tsx
git commit -m "feat: split mobile hero between copy and film"
```

### Task 3: Verify Responsive Geometry and Production Output

**Files:**
- Verify: `components/mobile/MobileHero.tsx`
- Verify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: The completed mobile hero and unchanged desktop hero.
- Produces: Evidence that the split remains readable without overflow and that the production bundle compiles.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: Next.js reports `Compiled successfully`, completes TypeScript checking, and emits the `/` static route.

- [ ] **Step 2: Start the local site**

Run: `npm run dev -- --port 3002`

Expected: Next.js reports ready at `http://localhost:3002`.

- [ ] **Step 3: Inspect the four required mobile widths**

At 320x700, 375x812, 430x900, and 767x900, verify:

- Text remains entirely within the left 46% column.
- Video occupies the full right 54% column and the brand animation remains recognizable.
- The CTA does not wrap or overflow.
- The hero does not stack or create horizontal scrolling.
- Services follows immediately after the hero.

Use:

```powershell
$browser = 'C:\Users\atudm\.agents\skills\gstack\browse\dist\browse.exe'
& $browser viewport 320x700
& $browser goto http://localhost:3002
& $browser screenshot "$env:TEMP\cobrykz-split-320.png"
& $browser viewport 375x812
& $browser screenshot "$env:TEMP\cobrykz-split-375.png"
& $browser viewport 430x900
& $browser screenshot "$env:TEMP\cobrykz-split-430.png"
& $browser viewport 767x900
& $browser screenshot "$env:TEMP\cobrykz-split-767.png"
```

Expected: all four screenshots satisfy the five checks above.

- [ ] **Step 4: Confirm desktop code was not changed**

Run: `git diff HEAD~2 -- components/sections/Hero.tsx`

Expected: no output.

- [ ] **Step 5: Push the verified commits**

```bash
git push origin master
git ls-remote origin refs/heads/master
```

Expected: the remote `master` SHA matches local `HEAD`.
