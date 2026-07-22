# Editorial Section Depth Design

## Objective

Recompose the existing COBRYKZ page sections into one premium editorial experience with deliberate depth, rhythm, hierarchy, and continuity. Preserve the current typography, color palette, content, section order, interactions, and minimalist character. This is a focused presentation refinement, not a website redesign.

The page should feel art directed from top to bottom rather than assembled from independent section templates.

## Guiding Principle

Every viewport should have one dominant visual focal point. As the user scrolls, their eye should naturally move from the primary headline to the supporting content and finally to the call to action. Avoid layouts where every element has equal visual weight.

Depth exists to support that hierarchy. It is not the objective by itself.

## Composition Approach

Open light fields, elevated light surfaces, open dark fields, and dark destination areas form a loose visual vocabulary rather than a rigid four-part system. Each section earns its treatment based on its message, density, and position in the page journey.

The implementation should favor visual balance over numerical uniformity. Overlap, shell width, padding, border strength, and shadow softness may vary modestly by section when that creates a more coherent composition. Repeated values should be used when they help consistency, not when they flatten the art direction.

## Page Rhythm

### Hero

Keep the hero open and visually dominant. Do not add an enclosing card. The mobile video, overlay copy, and separate CTA row retain their current structure. The transition out of the hero should act as the first quiet visual pause before Services gains elevation.

### Services

Place Services on a very light blue-gray field and give its complete working area one elevated white surface. Keep the section heading visually dominant and preserve the existing service controls and content.

Use generous internal spacing, one thin border, the existing restrained corner language, and a broad soft shadow. Let the surface overlap its surrounding field enough to establish the first meaningful depth transition without becoming theatrical.

### Industries

Keep Industries open on navy. Allow the Services surface to enter the upper boundary slightly so the transition feels continuous. Once inside Industries, return to spacious editorial rows and separators rather than cards.

Industries should provide a strong dark pause and a clear change in visual temperature after the elevated Services surface.

### Process

Use a quiet tinted field. Keep the section heading outside the main panel so it remains an open editorial introduction. Group the process steps inside one premium white container with a shared border, restrained elevation, and unified row dividers.

The process panel should read as one composed artifact, not a collection of floating cards.

### Founder

Keep Founder open and dark. Do not wrap the entire section in an elevated container. Preserve the portrait as the dominant focal point, supported by a restrained blue illumination and the existing offset hairline framing.

The glow must remain subtle, localized, and subordinate to the portrait. Founder should feel human and atmospheric without decorative shapes or glass effects.

### Fit / Why COBRYKZ

Use one large elevated light surface to bridge out of Founder. On desktop, apply the treatment to the existing Fit section. On mobile, apply it to the existing MobileFit content without restoring removed sections or changing copy.

Give the panel premium spacing and enough overlap with the dark Founder boundary to create a confident transition. Preserve the current tabs, rows, and interaction behavior. The content should read as one decision-support tool rather than several cards.

### FAQ

Return to an open light field. Keep the heading outside one unified, subtly tinted accordion container. Questions remain editorial rows separated by thin borders; they do not become individual cards.

The FAQ should reduce visual intensity after Fit while still maintaining depth through one quiet backing surface.

### Contact

Treat Contact as the strong dark destination. Use a controlled transition from FAQ, with a shallow overlap or boundary treatment chosen according to the final composition. Preserve the form as the only elevated surface inside Contact.

The final call to action must become the dominant focal point as the user enters this section. Supporting reassurance and form details remain secondary.

### Footer

Continue the dark destination using the existing deeper navy. Separate Footer from Contact with a restrained border or tonal shift, not another floating surface.

## Surface And Transition Language

- Alternate pure white, light blue-gray, subtle tints, and navy according to section role rather than a mechanical pattern.
- Keep selected sections open and spacious; use one large elevated container only where grouping improves comprehension.
- Use gentle overlaps selectively at major light-to-dark or dark-to-light transitions.
- Use thin borders and soft, low-opacity shadows to separate surfaces.
- Use subtle background illumination only where it reinforces a focal point.
- Prefer layered section boundaries over abrupt white-to-white transitions.
- Preserve the existing restrained corner radius language across all raised surfaces.
- Avoid gradients across entire sections unless an existing gradient is already integral to the section.

## Hierarchy And Focal Flow

Each viewport should resolve into one clear focal point:

1. A section headline, portrait, artifact, or primary action leads.
2. Supporting copy and controls establish context.
3. Secondary details recede through lighter color, smaller scale, or simpler framing.
4. The next section transition leads the eye forward without competing with the current focal point.

Elevated containers must not make every child feel equally important. Shadows, borders, icons, and tinted backgrounds remain supporting devices.

## Responsive Behavior

Desktop and mobile share the same editorial sequence and depth intent, but their treatments are composed independently.

On mobile:

- Keep panels inside the existing phone gutters.
- Use shallow overlaps and shorter, lighter shadows.
- Keep open headings outside raised containers.
- Prevent clipped shadows, horizontal overflow, and collisions with the fixed action bar.
- Preserve complete content visibility and touch targets from 320px upward.
- Compress spacing around overlaps only when the visual rhythm benefits.

On desktop:

- Preserve the existing primary content alignment while allowing selected panels to feel more inset or expansive according to their role.
- Use more generous negative space around open sections.
- Let full-width dark sections remain strong visual anchors.
- Use deeper overlaps only where they improve continuity and do not obscure section headings.

No overlap distance, shell inset, or shadow preset is mandatory across every section. Final values should be tuned against rendered layouts.

## Guardrails

- Do not change copy, typography, palette, section order, forms, controls, or interaction behavior.
- Do not add cards to every section.
- Do not use glassmorphism, decorative blobs, heavy gradients, or strong drop shadows.
- Do not introduce new corner-radius styles.
- Do not add decorative motion.
- Do not allow several elements in one viewport to compete at equal visual weight.
- Do not sacrifice mobile readability, focus visibility, touch-target size, or reduced-motion behavior.

## Verification

- Add source-level presentation tests for the intended open-versus-contained section structure and surface rhythm.
- Run the full test suite, lint, and production build.
- Inspect desktop and mobile layouts at representative widths, including 320px, 375px, 430px, 768px, and 1440px.
- Confirm no horizontal overflow, clipped shadows, or overlap collisions.
- Confirm keyboard focus remains visible and interactive behavior is unchanged.
- Review representative viewport screenshots for one dominant focal point and a coherent visual path into the next section.
- Confirm desktop and mobile use related art direction without becoming identical templates.

## Acceptance Criteria

- The page reads as one continuous editorial composition rather than a stack of isolated sections.
- Every major section is visually distinct from the section before it.
- Open layouts alternate selectively with unified elevated surfaces.
- Services, Process, Fit, and FAQ use intentional grouping without turning their children into card grids.
- Industries, Founder, and Contact remain open dark anchors.
- Selected boundaries use subtle overlap or layered transitions without decorative excess.
- Every viewport has one dominant visual focal point.
- Existing content, typography, colors, order, and behavior remain unchanged.
- Mobile layouts remain clean and functional from 320px upward.
