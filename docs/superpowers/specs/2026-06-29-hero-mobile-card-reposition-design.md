# HeroMobile — Card Reposition & Name Badge Removal

**Date:** 2026-06-29  
**Status:** Approved by user  
**File:** `components/sections/HeroMobile.tsx`

---

## Problem

The floating cards and name badge overlap the text section. The name badge (`top-[68%]`) sits directly on the eyebrow text. The Client Rating card (`top-[45%]`) is too close to the COMPETE headline. The text section begins at ~65% from the top of the viewport.

## Solution

Move both cards into the top 30% of the viewport (portrait territory). Remove the name badge entirely.

## Exact Changes

### Performance 100 card
- **Before:** `top-[35%]`
- **After:** `top-[18%]`
- Position: upper-right, forehead zone of portrait

### Client Rating 5.0 card
- **Before:** `top-[45%]`
- **After:** `top-[26%]`
- Position: upper-left, shoulder zone, staggered 8% below Performance card

### Name badge
- **Remove entirely** — the `motion.div` at `left-4 top-[68%]` containing "Mandela Atud / FOUNDER & CEO · COBRYKZ"

## What Does NOT Change

- Card styling (`glass` const, px-3 py-2.5, all shadow values)
- Card content (numbers, stars, progress bars)
- All entrance animations and float animations
- Text section (eyebrow, headline, body, CTAs, trust row)
- Portrait and all gradient layers
- HeroDesktop.tsx and Hero.tsx

## Result

35% clear gap between lowest card (bottom edge ~34% from top) and first text element (~65% from top). Layout matches the premium reference aesthetic — cards in portrait zone, text zone fully unobstructed.
