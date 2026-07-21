# HeroMobile Card Reposition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the two floating glass cards into the top 30% of the viewport and remove the name badge so floating elements never overlap the text section.

**Architecture:** Single targeted edit to `components/sections/HeroMobile.tsx` — two `top-[]` value changes and deletion of the name badge `motion.div` block. No structural changes.

**Tech Stack:** Next.js 16.2.9, Tailwind CSS v4, Framer Motion 12.42.0

## Global Constraints

- Do NOT change card styling, animations, content, or entrance delays
- Do NOT change the text section or any gradient layers
- Do NOT modify `HeroDesktop.tsx` or `Hero.tsx`
- Build must pass with `npm run build` from `cobrykz/`

---

### Task 1: Reposition Cards and Remove Name Badge

**Files:**
- Modify: `cobrykz/components/sections/HeroMobile.tsx`

- [ ] **Step 1: Change Performance card position**

Find this line in `HeroMobile.tsx`:
```tsx
        className="absolute z-20 right-4 top-[35%]"
```
Replace with:
```tsx
        className="absolute z-20 right-4 top-[18%]"
```

- [ ] **Step 2: Change Client Rating card position**

Find this line:
```tsx
        className="absolute z-20 left-4 top-[45%]"
```
Replace with:
```tsx
        className="absolute z-20 left-4 top-[26%]"
```

- [ ] **Step 3: Remove the name badge block entirely**

Delete the entire `motion.div` for the name badge — from the opening tag to its closing `</motion.div>`. It looks like this (delete everything between and including these lines):

```tsx
      {/* ── Name badge — lower-left, identifies Mandela ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 1.2 }}
        className="absolute z-20 left-4 top-[68%]"
      >
        <div
          className="bg-black/55 backdrop-blur-md rounded-xl px-3 py-2 border border-white/[0.08]"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}
        >
          <p className="text-[11px] font-bold text-white leading-tight">Mandela Atud</p>
          <p className="text-[8px] text-white/40 tracking-[0.07em] uppercase mt-0.5">
            Founder & CEO · COBRYKZ
          </p>
        </div>
      </motion.div>
```

- [ ] **Step 4: Verify build passes**

Run from `cobrykz/`:
```
npm run build
```
Expected: Build completes with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/HeroMobile.tsx
git commit -m "fix: move cards to top 30%, remove name badge — eliminates text overlap"
```
