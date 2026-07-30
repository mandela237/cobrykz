# Cobrykz Homepage Architectural Editorial Refinement

**Status:** Approved direction, implementation specification  
**Scope:** Final Milestone 1 homepage refinement only  
**Date:** July 30, 2026

## Purpose

Elevate the approved homepage from a strong interface into a premium, intentionally art-directed experience. The refinement must increase craftsmanship without adding information, changing strategy, or increasing conceptual complexity.

## Frozen Decisions

The following remain unchanged:

- Information architecture
- Navigation
- Homepage section order and hierarchy
- Messaging, headlines, and approved copy
- CTA strategy
- SEO strategy
- Brand positioning
- System Atlas concept and semantic content

## Direction

The homepage will use **Architectural Editorial** as its visual standard. Editorial clarity and negative space provide the foundation. Architectural composition, controlled depth, precise framing, and selective asymmetry create distinction. The System Atlas remains Cobrykz's signature explanatory language, not a decorative motif or a quota applied to every section.

The result should feel:

- Premium and timeless
- Composed rather than templated
- Dimensional without becoming cinematic
- Distinctive without becoming decorative
- Technically credible without resembling documentation

## Homepage Hero

### Existing structure

The current two-column hero, approved headline, supporting copy, actions, system cutaway, and semantic Atlas definition remain intact.

### Refinement

The Atlas should read as a premium architectural model rather than a flat SVG:

- Establish clearer separation between its four planes through restrained tonal variation, edge highlights, and depth cues.
- Improve the internal proportion and visual balance without adding nodes, paths, labels, or explanatory content.
- Make connections feel embedded in the model instead of drawn over it.
- Refine node geometry, line weights, label placement, and material contrast.
- Use the surrounding frame as an architectural enclosure, not a generic card.
- Preserve legibility and semantic equivalence at every responsive size.

### Defining visual moment

The **Business outcomes** plane will be subtly illuminated from within. The illumination represents the operating value produced by the connected system. It must remain localized, restrained, and meaningful:

- No ambient particle field
- No theatrical glow
- No pulsing spotlight
- No added messaging
- No new animation sequence

The active signal path may lead the eye toward the illuminated plane, but the outcome plane—not motion—remains the focal moment.

## Composition System

The section sequence remains fixed, but each section receives a distinct compositional role:

1. **Hero — architectural object:** dark spatial enclosure and illuminated outcome plane.
2. **Business outcomes — terminal states:** asymmetric editorial proportions that give the primary outcome more visual authority.
3. **Solutions — capability index:** a persistent relationship rail and disciplined indexed rows.
4. **Why Cobrykz — accountability composition:** one dominant principle anchors four supporting standards.
5. **AI point of view — decision artifact:** an editorial argument paired with a controlled decision surface.
6. **Challenge router — operational path:** the selected business challenge visibly connects to assessment and the relevant solution.
7. **Process — delivery progression:** a horizontal system thread on larger screens and a clear vertical progression on smaller screens.
8. **Projects evidence — evidence frame:** an intentionally reserved proof standard rather than a vacant card.
9. **Authority — editorial confidence:** typography and contrast carry the section without an Atlas.
10. **Final CTA — decisive close:** reduced composition and strong negative space conclude the story.

## Rhythm and Transitions

- Vary section density, alignment, and internal proportion while retaining one spacing system.
- Use borders as structural joints, not repetitive containers.
- Reduce repeated rounded rectangles and equal-card grids.
- Alternate concentrated and open passages to create editorial pacing.
- Use dark surfaces selectively at the hero, authority band, and final close.
- Let section transitions arise from proportion, tone, and framing rather than decorative separators.

## Materiality and Depth

- Use thin edge highlights, low-opacity plane fills, restrained shadows, and selective translucency.
- Depth must clarify hierarchy or spatial relationships.
- Avoid blur-heavy glass effects, excessive gradients, oversized shadows, and ornamental lighting.
- Maintain crisp typography above all visual materials.
- Use the approved palette only.

## Motion

Motion remains explanatory and optional:

- The existing active path may communicate directional flow.
- No additional continuous animation is required.
- Hover and focus states clarify interaction without lifting or scaling objects.
- Reduced-motion preferences remove nonessential movement.
- The illuminated outcome plane remains effective as a static composition.

## Responsive Behavior

- Use one semantic responsive tree.
- Preserve the architectural hierarchy on mobile rather than producing a separate simplified experience.
- Keep labels readable without shrinking explanatory text below approved thresholds.
- Allow the Atlas to occupy more vertical space on narrow screens when needed.
- Convert horizontal relationships into clear vertical progressions where appropriate.
- Avoid horizontal overflow and hidden critical content.

## Accessibility and Performance

- Preserve the Atlas title, description, legend, text equivalent, node semantics, and reading direction.
- Maintain focus visibility and approved contrast requirements.
- Do not use canvas, WebGL, video, or raster imagery for the Atlas.
- Keep the hero server-rendered.
- Prefer SVG and CSS refinements that do not introduce client-side runtime cost.

## Acceptance Criteria

- No frozen content or strategic decision changes.
- No new homepage sections, labels, nodes, paths, cards, or claims.
- The Atlas has clearer material depth and plane hierarchy.
- The Business outcomes plane is the hero's unmistakable focal moment.
- Major homepage sections have differentiated compositions without losing cohesion.
- Repeated-card and repeated-rectangle patterns are reduced.
- The page remains restrained, readable, responsive, accessible, and performant.
- Tests, TypeScript, lint, and the production build pass.
- Desktop and mobile visual review is completed when the preview browser is available.

## Explicit Non-Goals

- Milestone 2 implementation
- New information, illustrations, photography, or interactions
- Messaging or SEO revisions
- A cinematic redesign
- Decorative motion
- Rebuilding the shared System Atlas data model
