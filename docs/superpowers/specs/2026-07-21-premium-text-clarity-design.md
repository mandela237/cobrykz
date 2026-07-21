# COBRYKZ Premium Text and Visual Clarity Design

**Date:** July 21, 2026  
**Status:** Approved design direction  
**Scope:** Desktop and mobile presentation refinement

## Objective

Make COBRYKZ feel like a bespoke, founder-led studio whose quality is evident
before a visitor reaches the contact form. The refinement must remove the
generic, AI-written tone and the visually soft or inexpensive appearance while
preserving the site's existing claims, meaning, section order, interactions,
and business positioning.

The intended impression is warm, editorial, confident, personal, and precise.
Premium quality should come from authorship and restraint rather than luxury
cliches, excessive effects, or a wholesale redesign.

## Constraints

- Preserve every factual claim and the meaning of each section.
- Do not introduce new performance figures, testimonials, clients, guarantees,
  prices, or unsupported proof.
- Do not change the desktop or mobile information architecture.
- Do not remove functional content or alter the contact flow.
- Keep Geist as the primary typeface and Playfair Display as a rare editorial
  accent.
- Maintain the existing light-first COBRYKZ palette and founder-led identity.
- Meet WCAG AA contrast and retain visible focus states, reduced-motion support,
  and mobile touch targets of at least 44 pixels.

## Copy Direction

Revise the copy sentence by sentence without changing its promises. The voice
should sound like Mandela explaining the work directly to a thoughtful business
owner: assured, specific, conversational, and free of sales theatre.

The editing pass will:

- Replace abstract agency language with concrete, natural phrasing.
- Remove repeated ideas when the same meaning is already established nearby.
- Vary sentence length and rhythm so sections do not read like generated card
  copy.
- Prefer active constructions and recognizable business language.
- Use first person selectively where direct founder accountability strengthens
  trust.
- Keep headings concise and distinctive while preserving their current intent.
- Preserve practical details such as timelines, process expectations, and the
  email-draft behavior of the contact form.

Copy must not become casual, clever for its own sake, or artificially luxurious.
Words such as “premium,” “bespoke,” and “world-class” should not substitute for
evidence.

## Typography and Rendering

The existing Geist and Playfair pairing remains. The work focuses on making the
current system render with greater authority and clarity.

- Remove global rendering declarations that can make text look unnaturally thin
  or fuzzy on Windows displays.
- Use platform-appropriate font smoothing instead of forcing one rendering
  character everywhere.
- Raise contrast for supporting copy, especially small text on dark sections.
- Avoid low-opacity white text for information a visitor is expected to read.
- Increase weight or size where small utility text currently looks fragile.
- Keep body line-height comfortable while reducing excessively loose passages.
- Constrain paragraph measure so text reads as composed rather than stretched.
- Refine heading wraps at desktop and mobile breakpoints to avoid accidental or
  weak line breaks.
- Use the serif only for deliberate human emphasis, quotations, or a single
  editorial phrase—not as repeated decoration.

## Surface and Sharpness Refinement

The existing visual direction stays intact, but effects that contribute to a
hazy presentation will be reduced.

- Reduce or remove backdrop blur where it softens navigation or action-bar text.
- Increase surface opacity where translucent layers reduce edge definition.
- Keep borders crisp and visible without making the interface heavy.
- Avoid stacked semi-transparent layers around important text.
- Preserve the founder portrait as the human anchor and verify that the sharp
  source is used at an appropriate rendered resolution.
- Keep shadows restrained, directional, and limited to elements that need
  separation.
- Preserve the Three.js field, but ensure it remains quiet and cannot reduce the
  perceived clarity of hero content.

## Responsive Treatment

Desktop and mobile remain separate compositions below the existing 768-pixel
breakpoint, but they must feel like one authored system.

Desktop refinements will prioritize composed headline wraps, consistent text
measure, stronger supporting-copy contrast, and crisp navigation and section
transitions.

Mobile refinements will prioritize a minimum readable body size, sharper hero
overlay text, stronger contrast on dark bands, clear accordion and tab labels,
and an action bar whose translucent surface does not blur its typography.

No section will be added, removed, or reordered on either layout.

## Implementation Boundaries

Likely changes are limited to:

- Copy strings inside existing desktop and mobile section components.
- Global typography and rendering rules in `app/globals.css`.
- Existing Tailwind classes controlling font size, weight, line-height,
  opacity, width, blur, border, and shadow.
- Font configuration only if required to load an already-used weight correctly.
- Image configuration only if inspection identifies avoidable scaling or source
  softness.

Component behavior, state logic, anchors, form semantics, and page structure
remain unchanged unless a small accessibility correction is directly required
by the refinement.

## Verification

The finished pass will be checked at 375, 768, 1024, and 1440 pixels.

Verification includes:

- No horizontal overflow or content hidden by fixed elements.
- Readable text contrast on every light and dark surface.
- Body text at a practical mobile reading size.
- Stable heading wraps and paragraph measures.
- Crisp navigation, mobile action bar, icons, portrait, and form controls.
- No hover-induced layout shift.
- Visible keyboard focus and correct accordion/tab semantics.
- Reduced-motion behavior remains intact.
- Production build, lint, and available automated checks pass.
- Side-by-side visual inspection of desktop and mobile after implementation.

## Success Criteria

The site should feel authored by a capable person rather than assembled from
generic agency phrases. Text should appear sharp and confidently weighted on
both desktop and mobile. Supporting copy must remain easy to read, surfaces must
feel clean rather than hazy, and the full experience must retain COBRYKZ's warm,
founder-led character without changing its claims or underlying structure.
