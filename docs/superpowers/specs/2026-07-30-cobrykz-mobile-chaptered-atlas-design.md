# Cobrykz Mobile Chaptered Atlas Design

**Date:** 2026-07-30  
**Status:** Approved prototype specification  
**Initial scope:** Homepage and Solutions hub at mobile widths  
**Review viewport:** 390px

## Purpose

Create a mobile experience that feels as though Cobrykz was originally designed
for mobile. It must not feel like the desktop editorial website compressed into
a narrower column.

The mobile experience should feel lighter, faster, and more engaging than the
desktop experience while preserving the exact same content, information
architecture, messaging, SEO, brand positioning, page order, CTA strategy, and
design language.

## Approved direction

The approved direction is **Option A: Chaptered Atlas**.

Chaptered Atlas transforms each page into a sequence of short, clearly anchored
mobile chapters. Each chapter has one dominant idea, a deliberate visual
identity, and an appropriate interaction model. The System Atlas remains the
signature visual language, but it is recomposed vertically for the phone rather
than scaled down from desktop.

The initial prototype covers:

1. The Homepage as the public-facing editorial experience.
2. The Solutions hub as the most information-dense experience.

These two pages establish the mobile design language. No other page receives
the full mobile treatment until the prototypes are reviewed and approved.

## Primary design principle

Every implementation decision must prioritize:

1. Immediate comprehension.
2. Fast scanning.
3. One dominant idea per viewport whenever practical.
4. Progressive disclosure instead of long uninterrupted reading.
5. Clear visual rhythm.
6. Touch-first interaction.
7. Intentional pacing.

Readable type sizes and generous touch targets are preserved. Density is
reduced through composition, hierarchy, and disclosure—not smaller typography
or indiscriminate spacing reductions.

## Frozen elements

This work must not change:

- Approved copy or messaging.
- Information architecture or page order.
- Navigation structure.
- Headlines.
- CTA labels, destinations, or strategy.
- SEO metadata, canonical URLs, sitemap strategy, or structured data.
- Brand positioning.
- Desktop composition or desktop visual treatment.
- The approved Cobrykz palette, typography, and System Atlas meaning.

Mobile and desktop may use genuinely different compositions, but they must
consume the same semantic content definitions.

## Mobile composition system

### Chapter anchors

Major mobile sections use a small functional chapter marker where it improves
orientation. Numbering is used only when it reflects page sequence or process
order. Labels identify the idea currently in view rather than acting as
decoration.

### Visual resets

Long light-page sequences are interrupted by meaningful visual anchors:

- Controlled dark stages.
- Framed System Atlas artifacts.
- Highlighted statements.
- Numbered process stages.
- Material surface changes.
- Deliberate section boundaries and pacing.

Surface changes correspond to a change in meaning. They are not added merely
to create variety.

### Progressive disclosure

Dense comparison rows, capability lists, supporting outcomes, and process
details may use accessible accordions, tabs, or selection-and-reveal patterns.

Rules:

- The section's lead idea remains visible without interaction.
- One item may be expanded by default when context is required.
- Controls use descriptive labels and expose their state semantically.
- Touch targets are at least 44px.
- Keyboard access and visible focus are required.
- Content remains comprehensible without animation.
- Reduced-motion preferences are respected.

### Mobile System Atlas

System diagrams are recomposed for a vertical reading direction:

- Nodes follow a clear top-to-bottom path.
- Labels remain readable without zooming.
- The currently relevant relationship receives controlled emphasis.
- Supporting explanations appear as compact summaries near the relevant node.
- Desktop diagrams remain unchanged.
- Mobile diagrams derive their labels and meaning from the same data definition
  as desktop.

### Typography and spacing

The approved readable type scale remains intact. Mobile improvement comes from:

- Shorter visible passages.
- More decisive hierarchy.
- Controlled line length.
- Separation of lead and supporting ideas.
- Purposeful negative space.
- Clear transitions between chapters.

The implementation must not solve density by shrinking body text or weakening
headings.

## Homepage prototype

The Homepage retains its approved section order.

### Hero

- Preserve the existing headline, supporting copy, CTAs, and dark opening.
- Keep the illuminated outcome plane as the defining visual moment.
- Recompose the System Atlas as a vertical business transformation sequence.
- Keep the primary action immediately reachable.
- Avoid presenting the hero as a block of copy followed by a reduced diagram.

### Business Outcomes

- Present one lead outcome as the dominant module.
- Present supporting outcomes as compact expandable summaries.
- Preserve every approved outcome and description.
- Use a strong chapter transition into the next section.

### Solutions Overview

- Present the six solutions as an indexed capability ledger.
- Keep capability names visible for rapid scanning.
- Reveal supporting descriptions progressively.
- Preserve direct links to each solution.

### Why Cobrykz

- Use a controlled dark trust stage.
- Present accountability principles as concise modules rather than a continuous
  column of paragraphs.
- Keep the complete approved trust narrative available.

### AI Point of View

- Present the AI decision model as one framed artifact.
- Keep the primary AI principle visible.
- Reveal supporting conditions and controls progressively.

### Challenge Router

- Use a touch-first single-selection list.
- Show one recommendation panel that updates from the shared challenge data.
- Keep all challenge paths accessible.
- Preserve direct solution destinations.
- Avoid a tall sequence of repeated challenge cards.

### Process Overview

- Use a vertical numbered progression.
- Show one stage in expanded detail at a time while keeping all stage names
  visible.
- Preserve the universal six-stage process.

### Projects, Authority, and final CTA

- Treat each as a distinct editorial stage.
- Preserve the honest Projects state.
- Use surface and hierarchy changes to prevent the closing page sequence from
  becoming uninterrupted prose.

## Solutions hub prototype

The Solutions hub retains its approved section order.

### Opening

- Keep the editorial introduction concise and immediately scannable.
- Establish capability exploration as the page's mobile interaction model.

### Business conditions

- Convert the three dense conditions into expandable decision summaries.
- Keep all condition titles visible.
- Preserve every approved explanation.

### Six capabilities

- Use an interactive indexed ledger.
- Keep all six capability names visible.
- Reveal outcome descriptions and links without creating six long stacked
  cards.

### Capability Relationship Atlas

- Recompose the relationship model as a vertical path.
- Allow a selected capability to reveal its relationship context.
- Preserve the approved statement that capabilities are selected according to
  the business challenge, not treated as a required sequence.

### Operating context and models

- Replace continuously stacked comparison columns with compact staged
  summaries.
- Preserve the full operating-model content.
- Use labels and selection states that explain the relationship between
  customer experience, operations, and connected systems.

### Process and comparison content

- Use accessible disclosure rows where the full content would otherwise create
  an uninterrupted reading passage.
- Keep the lead conclusion visible.
- Preserve all approved decision guidance.

### Final action

- Use a decisive final stage that clearly begins the partnership.
- Preserve the approved CTA and supporting copy.

## Architecture

Mobile-specific presentation components may render below `768px`. Desktop and
mobile components must read from the same typed content definitions.

Preferred structure:

- Shared typed content models remain the single source of truth.
- Desktop presentation components remain unchanged.
- Mobile presentation components own mobile sequencing and interaction.
- Shared primitives provide disclosure behavior, chapter labels, touch states,
  focus treatment, and mobile Atlas rendering.
- Page-level components select the appropriate presentation without duplicating
  narrative copy.

No hidden copy fork is permitted. Content parity must be testable.

## Interaction and motion

Motion explains state changes:

- Opening or closing a disclosure.
- Changing a selected challenge or capability.
- Tracing a relationship through a vertical Atlas.
- Progressing between process stages.

Motion must not decorate static content. All interactions remain usable when
motion is disabled.

## Accessibility

- One semantic content sequence per page.
- Correct heading hierarchy.
- Native buttons or equivalent semantic controls.
- `aria-expanded`, `aria-controls`, and current-selection semantics where
  required.
- Minimum 44px touch targets.
- Visible keyboard focus.
- No horizontal overflow from 320px through 767px.
- Text remains readable without zooming.
- Diagrams include equivalent nonvisual explanations.
- Reduced-motion preferences are honored.

## Verification

The prototype is not approved by component screenshots alone.

Required evidence:

1. Complete top-to-bottom Homepage screenshot at exactly 390px.
2. Complete top-to-bottom Solutions hub screenshot at exactly 390px.
3. Desktop regression checks showing the approved desktop composition is
   unchanged.
4. Interaction checks for every disclosure, tab, selection state, and link.
5. Keyboard and focus checks.
6. Reduced-motion checks.
7. Layout containment checks from 320px through 767px.
8. Content-parity tests proving desktop and mobile consume the same approved
   definitions.
9. Tests, lint, typecheck, and production build.

The prototypes remain local and must not be deployed before review and approval.

## Prototype review questions

The review should evaluate:

- Does each viewport have one dominant idea?
- Can visitors understand the page by scanning headings, labels, and visible
  summaries?
- Are long passages interrupted by meaningful interaction or visual anchors?
- Do the pages feel lighter and faster without hiding essential meaning?
- Does the System Atlas feel designed for mobile?
- Do Homepage and Solutions feel like one mobile design system?
- Does the experience remain unmistakably Cobrykz?

## Rollout boundary

The Chaptered Atlas direction is approved as the foundation for the entire
mobile website. Implementation beyond the Homepage and Solutions hub remains
paused until the two-page prototype and its 390px evidence are approved.
