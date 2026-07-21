# COBRYKZ Proof-Led Distinctiveness and Conversion Design

**Date:** July 21, 2026  
**Status:** Approved design direction  
**Scope:** Desktop and mobile homepage restructuring on `feat/premium-text-clarity`

## Objective

Replace the homepage's remaining generated-agency patterns with a more
distinctive, proof-led founder experience. The revised page must demonstrate
Mandela's design judgment instead of repeatedly asserting that the work is
custom, clear, senior-led, and carefully reviewed.

The pass will preserve the site's factual claims, founder-led positioning,
sharp portrait, conviction-blue and deep-ink palette, restrained geometry, and
responsive accessibility. It will materially reduce repetition, simplify the
decision journey, and strengthen the final conversion experience.

## Creative Direction

The page will feel like a capable founder opening the working file and explaining
the decisions that matter. Premium quality comes from visible reasoning,
specificity, restraint, and a confident edit—not decorative luxury signals.

The defining proof element is an annotated examination of the COBRYKZ homepage
itself. This is transparent first-party evidence, not a client case study. It
must never imply external results or present sample material as client work.

## Revised Page Narrative

The desktop page will follow this sequence:

1. **Hero** — Mandela, the intended client, the reputation problem, and one
   primary project action.
2. **Inside this build** — an annotated COBRYKZ interface artifact that proves
   message strategy, responsive craft, and conversion thinking.
3. **Services** — the website offer first, with systems and ongoing care as
   supporting capabilities.
4. **Working method** — accountability, process, checkpoints, and timing in one
   coherent section.
5. **Industries** — concise recognition for relevant local-business audiences.
6. **Founder** — Mandela's motivation, ownership, and working stance.
7. **Fit and FAQ** — remaining buying objections without repeated reassurance.
8. **Contact** — an honest, resilient project-note path and direct email
   fallback.

Mobile will express the same sequence using phone-specific composition. It will
not mirror desktop mechanically. Existing tab and accordion behaviors may be
retained only where they reduce cognitive load; redundant interaction patterns
will be removed.

## Annotated Proof Artifact

The new proof section appears directly after the hero and replaces the current
four-item trust strip. Its title is content-led rather than an uppercase agency
kicker. A concise introduction explains that the visitor is looking at the
studio's own working decisions.

The artifact uses a crisp browser or device crop derived from the actual
COBRYKZ homepage. Three numbered annotations connect a visible design decision
to its business purpose:

1. **Lead with reputation** — the message begins with the gap between the real
   business and its online impression instead of leading with technology.
2. **Compose mobile separately** — the phone experience edits hierarchy and
   interaction rather than shrinking the desktop layout.
3. **Create one conversion path** — navigation, proof, process, and fit content
   lead toward a transparent project note.

Each annotation contains a short decision statement and one concrete
consequence for the visitor. It must not claim measured conversion uplift,
performance scores, or client outcomes.

The visual treatment resembles a precise working document rather than a card
dashboard: one dominant artifact, fine rules, numbered markers, concise margin
notes, and minimal iconography. Desktop may use an asymmetric artifact-and-notes
composition. Mobile stacks the crop and notes in reading order without tiny
callout text or horizontally panning the proof.

## Consolidation and Removal

- Remove `SocialProof` from the rendered desktop flow; its useful commitments
  are either demonstrated in the artifact or absorbed into the working method.
- Merge the substance of `WhyCOBRYKZ`, `OurStandard`, and `Process` into a
  focused working-method section. Preserve all factual process timing and
  accessibility/performance commitments.
- Remove the unused or redundant mobile trust component from the rendered
  narrative. Consolidate `MobileWhy`, `MobileStandard`, and `MobileProcess`
  where their claims overlap.
- Shorten Industries so recognition remains without becoming another large
  reassurance band.
- Keep Founder, Fit, FAQ, and Contact only where each resolves a distinct
  objection.

No valuable factual content may disappear merely because its current component
is removed. Claims that still advance a buying decision must move into the most
relevant surviving section.

## Anti-AI Visual Guardrails

- Remove the decorative two-axis `page-grid` treatment from brand surfaces.
- Do not repeat a tiny uppercase kicker above every section heading. Keep at
  most one deliberate label where it aids orientation.
- Avoid repeated rows of rounded icon boxes plus heading plus description.
- Avoid consecutive sections built from identical cards, checklists, or ruled
  three-column reassurance layouts.
- Reserve Playfair Display for one editorial quotation or emphasis. Remove
  Cormorant as a parallel premium shorthand so the brand does not rely on two
  familiar italic-serifs.
- Keep borders functional. Do not pair a decorative one-pixel border with a
  wide soft shadow on the same element.
- Use spacing, scale, alignment, real imagery, and the proof artifact to carry
  hierarchy.
- Motion remains subtle and functional. Content must render visibly without
  animation or JavaScript.

## Hero

The founder portrait remains the primary human anchor on desktop and mobile.
The reputation-led headline and meaning remain. The opening decision field will
be simplified so the visitor sees one dominant project action, one quieter
process link, and no dense cluster of assurances followed immediately by a
second trust strip.

The desktop Three.js architectural field may remain only if it reads as a quiet
signature and not as another decorative grid. The static CSS grid behind it is
removed. Mobile retains the sharp portrait and veil, but the proposition must
remain visible within the first viewport at 375 pixels.

## Working Method

The consolidated method section must answer four questions:

- Who owns the work? Mandela remains directly responsible.
- What happens? Discovery, direction, build/review, and launch/care.
- How long does it take? Preserve 30 minutes, 2–3 days, 4–7 days, ongoing care,
  and the one-to-two-week focused website range.
- What quality is built in? Responsive composition, accessible interactions,
  intentional performance, and pre-launch review.

The process remains genuinely numbered because order carries information. It is
the only numbered sequence on the page.

## Conversion Experience

The preferred final experience is an on-site project submission with clear
loading, success, failure, and recovery states, plus a copyable email fallback.
Implementation must not invent a server capability. Before changing form
behavior, inspect the deployed architecture and available environment. If no
safe endpoint exists within the current project, retain the mail draft behavior
but harden it:

- State clearly that the button opens an email draft.
- Keep entered content visible if the handoff fails.
- Provide a copy-to-clipboard alternative for the project note.
- Provide a visible, copyable `hello@cobrykz.com` fallback.
- Never display a sent or success state for a message that was not delivered.

Placeholder text on dark fields must meet WCAG AA contrast when it communicates
meaningful guidance.

## Responsive and Accessibility Requirements

- Verify at 375, 768, 1024, and 1440 pixels and from 320 pixels upward for
  overflow.
- Normal explanatory text remains at least 13 pixels, with 15–16 pixels
  preferred for mobile body copy.
- All mobile targets remain at least 44 by 44 pixels.
- Artifact annotations must remain readable without zooming.
- Keyboard order follows the revised visual sequence.
- Focus rings remain visible and use the documented 8-pixel control radius.
- Accordions and tabs retained after consolidation preserve correct roles,
  `aria-expanded`, `aria-controls`, and selected states.
- Reduced motion remains honored.
- Dark-surface body and placeholder text must meet WCAG AA contrast.

## Verification

The implementation will be validated with:

- Source regression tests for banned decorative grid usage, explanatory text
  size, crisp navigation surfaces, focus-radius token consistency, and the
  presence of the annotated artifact.
- Existing lint and TypeScript checks.
- An optimized Next.js production build.
- Browser inspection at 375, 768, 1024, and 1440 pixels.
- Keyboard navigation through the hero, proof artifact links, disclosure
  controls, and contact flow.
- Contact-flow tests covering the configured submission path and fallback.
- A final narrative review confirming each surviving section resolves a distinct
  objection and no unsupported proof was introduced.

## Success Criteria

The finished page should no longer rely on repeated agency assurances to feel
credible. Within the first two sections, a visitor should understand the offer,
see Mandela, and inspect a real example of his decision-making. The remaining
page should progress through offer, method, relevance, accountability,
objections, and contact without restating the same promise in different visual
formats.
