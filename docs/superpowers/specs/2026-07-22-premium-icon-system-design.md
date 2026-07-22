# COBRYKZ Premium Icon System Design

## Objective

Refine the existing interface icon system without redesigning the website. The work must improve semantic clarity, optical balance, and consistency while preserving the approved editorial composition.

## Chosen Direction

Use targeted Lucide normalization. Lucide remains the single interface icon family. Existing icons stay when they already support the design language; replacements are permitted only when they materially improve meaning, optical balance, or consistency.

The custom COBRYKZ logo is a brand mark, not an interface icon, and remains unchanged.

## Scope Boundary

This phase may change:

- Lucide icon selections where a stronger semantic equivalent exists.
- Icon size and stroke weight where optical normalization requires it.
- Minor icon-to-label alignment.
- Icon-container styling when a container is unnecessary or inconsistent.
- Icon-specific hover treatment when existing motion or emphasis is excessive.
- Icon accessibility attributes.

This phase must not change:

- Layout or section composition.
- Typography, copy, or content hierarchy.
- General spacing, except minor icon alignment.
- Color palette or surface hierarchy.
- Forms, navigation behavior, or other interactions.
- The hero composition or introduce decorative hero icons.
- Gradients, illustrations, decorative shapes, or broader visual styling.

## System Rules

- Use Lucide exclusively for interface icons.
- Use outlined icons only; do not mix filled and outlined treatments.
- Normalize icons by perceived visual weight rather than forcing every shape to the same numerical dimensions.
- Keep icon strokes within a restrained shared range, deviating only when a specific glyph needs optical correction.
- Icons must remain subordinate to typography.
- Do not add icons or increase the total icon count.
- Decorative icons use `aria-hidden="true"`.
- Meaningful actions retain visible text so no icon communicates essential meaning alone.
- Hover feedback may adjust color or border subtly; it must not bounce, rotate, scale, or otherwise become playful.

## Section Treatment

### Navigation and Hero

Retain existing Lucide navigation icons when their semantics, stroke, and alignment are already correct. Keep the hero free of new decorative icons.

### Services

Give Services the most detailed review. Replace generic symbols only when a clearer Lucide equivalent exists. Desktop and mobile must use the same service concepts, with equivalent optical size, stroke weight, and container treatment. Normalize icon-to-heading spacing without altering the section layout.

### Industries

Review every industry glyph for perceived weight. Adjust individual optical size or replace a symbol only when its current shape appears materially heavier, lighter, or less semantic than its peers. No industry may gain prominence through its icon.

### Process and Founder

Retain process icons that already support a calm editorial appearance. Do not add decorative founder icons; the portrait remains dominant.

### Why COBRYKZ and Supporting Lists

Keep checklist and principle icons within the Lucide family. Reduce emphasis only where an icon competes with its heading or supporting copy.

### FAQ

Unify desktop and mobile accordion controls around identical glyph logic, restrained stroke, optical centering, and consistent open/closed behavior. Preserve current accordion functionality and accessibility relationships.

### Contact and Footer

Review form, email, submit, copy, and footer icons for consistent size and spacing. Remove icon containers only when they add decoration without hierarchy. Keep the footer calm and preserve all visible labels.

## Implementation Approach

Audit all icon imports and render sites, then create a small shared token or component only if it reduces genuine repetition without expanding scope. Apply replacements and optical corrections section by section. Favor local, explicit adjustments when individual glyphs require different optical treatment.

## Verification

- Add or update source-level tests to prevent mixed icon libraries and accidental non-brand SVG interface icons.
- Run the complete test suite, tracked-source lint, and production build.
- Inspect desktop and mobile at representative viewport sizes.
- Verify keyboard focus, accordion behavior, form actions, reduced motion, and absence of horizontal overflow.
- Capture final desktop and mobile screenshots.
- Compare the full page to confirm that icons recede into the editorial system rather than becoming focal points.

## Deliverables

1. The selected family: Lucide.
2. An exact list of replaced icons and the reason for each replacement.
3. Sections where icon containers were removed or simplified.
4. Icons intentionally retained and why.
5. Desktop and mobile screenshots showing the final system.

## Acceptance Criteria

- Every interface icon belongs to Lucide; the custom logo is the sole brand-mark exception.
- No filled/outlined mixture or inconsistent decorative style is introduced.
- Service and industry icons have balanced perceived weight.
- FAQ controls match across desktop and mobile.
- Contact and footer remain clean and understated.
- No icon dominates nearby typography.
- No broader layout, typography, content, color, section, or behavioral change occurs.
- Accessibility, tests, lint, build, and responsive checks pass.
