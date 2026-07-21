# SocialProof Compact Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized SocialProof section with a compact ~64px horizontal stats strip showing 4 stats side by side.

**Architecture:** Complete rewrite of `SocialProof.tsx` as a server component (no `"use client"`, no hooks). Static JSX only — 4 stat items in a single flex row with vertical dividers between them.

**Tech Stack:** Next.js 16.2.9, Tailwind CSS v4

## Global Constraints

- Section `id="social-proof"` must be preserved — it is used as a nav scroll anchor
- `aria-label="Trust indicators"` must be preserved
- Stat values locked: 5.0, 10+, 5+, 12+ — do not change
- Brand colors: `#080E1C` (bg), `#2563EB` (star fill), `text-white`, `text-white/35`
- Do NOT modify any other file

---

### Task 1: Rewrite SocialProof.tsx as a compact strip

**Files:**
- Modify: `cobrykz/components/sections/SocialProof.tsx` (complete rewrite)

- [ ] **Step 1: Replace the entire file with the compact strip**

Write this complete file to `cobrykz/components/sections/SocialProof.tsx`:

```tsx
export default function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-label="Trust indicators"
      className="bg-[#080E1C] border-y border-white/[0.06] py-3.5"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Client Rating */}
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span className="text-[18px] font-black text-white leading-none">5.0</span>
          </div>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Client Rating
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Industries Served */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">10+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Industries
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Years Building */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">5+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Years Building
          </p>
        </div>

        <div className="w-px h-7 bg-white/[0.08]" aria-hidden="true" />

        {/* Projects Delivered */}
        <div>
          <p className="text-[18px] font-black text-white leading-none mb-0.5">12+</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/35">
            Projects
          </p>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run from `cobrykz/`:
```
npm run build
```
Expected: Compiles cleanly, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/SocialProof.tsx
git commit -m "redesign: replace SocialProof with compact 64px stats strip"
```
