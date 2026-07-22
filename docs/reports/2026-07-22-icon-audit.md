# Premium icon-system audit

## Decision

Lucide remains the sole interface-icon family. Every audited interface icon is
outlined, subordinate to nearby text, and used with visible action or section
text. `components/CobrykzLogo.tsx` is the sole intentional brand-mark exception:
it is the accessible COBRYKZ brand mark, rendered as a labelled inline SVG.

The audit proposes one semantic replacement for the later refinement task:
replace `Blocks` with `Workflow` in both service variants. This is one shared
concept across two render sites, so it preserves the icon count, layout, and
desktop/mobile equivalence. All other glyphs should be retained.

The visible-text preference has three narrow, pre-existing accessible-name
exceptions that this icon refinement does not introduce or change:
`MobileActionBar` uses icon-only Services and Process links, and `Navbar` uses
an icon-only mobile menu button. The links retain explicit `aria-label` values;
the menu button retains its stateful Open/Close label plus `aria-expanded` and
`aria-controls`. They remain audited navigation controls, not decorative icon
patterns, and no navigation, layout, or product-source change is approved here.

## Audit table

| Component / section | Current glyph | Purpose | Recommendation | Reason | Optical size | Stroke | Container | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `CobrykzLogo` | Custom four-square COBRYKZ SVG | Brand identification | Retain — sole exception | Brand mark, not an interface icon | 28–32px | Filled brand geometry | None | `role="img"` with `aria-label="COBRYKZ mark"`; intentionally not hidden |
| `Navbar` | `ArrowUpRight`, `Menu`, `X` | Project CTA; mobile menu state | Retain | Direct action and universally recognizable menu controls | 15px / 20px | 2.1 / 2 | CTA has no extra container; menu uses its button control | CTA has visible text; the pre-existing icon-only menu exception has a stateful Open/Close `aria-label`, `aria-expanded`, and `aria-controls`; glyphs hidden |
| Desktop hero | `ArrowUpRight`, `ArrowDownRight` | Primary and process CTAs | Retain | Directional arrows clarify the distinct destinations without competing with labels | 17px | 2.1 / 2 | CTA buttons | Visible labels communicate the action; glyphs hidden |
| Mobile hero | `ArrowUpRight` | Primary project CTA | Retain | Matches CTA direction and stays visually subordinate | 15px | 1.9 | CTA button | Visible label; glyph hidden |
| Desktop Services | `MonitorSmartphone`, `Blocks`, `Wrench`, `Check`, `ArrowUpRight` | Website, systems, support, outcomes, CTA | Replace `Blocks` with `Workflow`; retain the rest | `Workflow` is more specific to intake, portals, and automation; the other symbols are clear and balanced | 19px service / 16px check / 17px CTA | 1.9 / 2.1 / 2 | 40px bordered service tile; checks and CTA uncontained | Adjacent text names every item; glyphs hidden |
| Mobile Services | `MonitorSmartphone`, `Blocks`, `Wrench`, `Check`, `ArrowUpRight` | Same service concepts, outcomes, CTA | Replace `Blocks` with `Workflow`; retain the rest | Must mirror the desktop service concept exactly; replacement is the one shared semantic correction | 21px active / 15px check / 16px CTA | 1.8 / 2.2 / 2 | 44px active service tile; checks and CTA uncontained | Adjacent text names every item; glyphs hidden |
| Desktop Industries | `Cross`, `HardHat`, `BriefcaseBusiness`, `Utensils`, `Scissors`, `Building2`, `ArrowUpRight` | Industry labels and CTA | Retain | Specific, calm symbols; the common 21px/1.7 treatment keeps perceived weight restrained | 21px / 17px CTA | 1.7 / 2 | No icon tile; CTA uncontained | Label text names every industry/action; glyphs hidden |
| Mobile Industries | Same six industry glyphs | Industry cards | Retain | Same concepts as desktop, with slightly smaller but balanced scale | 19px | 1.7 | No icon tile | Card heading/detail provides meaning; glyphs hidden |
| `SocialProof` | `MessagesSquare`, `CodeXml`, `Waypoints`, `ShieldCheck` | Trust promises | Retain | Each graphic supports, rather than substitutes for, the two-line promise | 19px | 1.8 | 40px subtle bordered tiles | Adjacent text supplies meaning; glyphs hidden |
| `MobileTrust` | `MessageCircle`, `CodeXml`, `Route`, `ShieldCheck` | Mobile trust promises | Retain | Compact equivalents remain optically light at mobile scale | 18px | 1.8 | No separate tile | Adjacent text supplies meaning; glyphs hidden |
| `OurStandard` | `Check`, `LayoutTemplate`, `Smartphone`, `Gauge`, `Accessibility` | Quality review and standards list | Retain | Clear, consistent outlined set; 22px check is reserved for the review focal point | 22px check / 19px list | 2 / 1.8 | 48px dark review tile; 40px pale list tiles | Adjacent headings/copy supply meaning; glyphs hidden |
| `MobileStandard` | `Check`, `LayoutTemplate`, `Smartphone`, `Gauge`, `Accessibility` | Mobile quality review | Retain | Same concept family, scaled down for dense two-column content | 19px check / 16px list | 2 / 1.8 | 40px dark review tile; list uncontained | Adjacent text supplies meaning; glyphs hidden |
| `WhyCOBRYKZ` / `MobileWhy` | `Handshake`, `MessageCircleMore`, `Eye` | Working-agreement principles | Retain | Semantically direct and visually even across three principles | 20px desktop / 18px mobile | 1.8 | 44px desktop bordered tiles; 40px mobile pale tiles | Adjacent heading/copy supplies meaning; glyphs hidden |
| `GoodFit` / `MobileFit` | `Check`, `Minus` | Positive and negative fit lists | Retain | Paired marks clarify contrast without adding visual weight | 14px desktop / 13px mobile | 2.2 | 24px circular status chips | Adjacent list text supplies meaning; glyphs hidden |
| `Process` | `ArrowUpRight` | Conversation CTA | Retain | Calm directional cue paired with an explicit label | 17px | 2 | Uncontained | Visible label; glyph hidden |
| `MobileProcess` | `Plus`, `Minus` | Accordion open/closed state | Retain | Matches FAQ control logic and fits the compact state control | 15px | 2 | 32px bordered control | Question/step text and `aria-expanded` communicate state; glyphs hidden |
| Desktop FAQ | `Plus`, `Minus` | Accordion open/closed state | Retain | Same restrained glyph logic as mobile at an appropriately larger optical scale | 17px | 2 | 36px bordered control | Question text and `aria-expanded` communicate state; glyphs hidden |
| Mobile FAQ | `Plus`, `Minus` | Accordion open/closed state | Retain | Same semantics and stroke as desktop, scaled to 32px control | 15px | 2 | 32px bordered control | Question text and `aria-expanded` communicate state; glyphs hidden |
| `Founder` / `MobileFounder` | `Check`, `ArrowUpRight` | Founder promises and CTA | Retain | Small proof marks and familiar CTA cue keep the portrait and copy dominant | 16px desktop / 14px mobile / 17px–16px CTA | 2.1–2.2 / 2 | Checks uncontained; CTA uncontained | Adjacent text supplies meaning; glyphs hidden |
| `FinalCTA` | `Check`, `Mail`, `MessageSquareText`, `ArrowUpRight` | Expectations, email link, note context, submit CTA | Retain | Clear contact semantics; the 20px note mark is contained and does not overpower the heading | 16px check / 17px mail+CTA / 20px note | 2.1 / 1.9–2 / 1.8 | Note has a 40px subtle tile; other glyphs uncontained | Adjacent labels and form controls provide meaning; glyphs hidden |
| `MobileContact` | `Check`, `Mail`, `ArrowUpRight` | Expectations, email link, submit CTA | Retain | Mirrors the desktop contact language at mobile scale | 14px check / 15px mail / 16px CTA | 2.2 / 1.8 / 2.1 | Uncontained | Adjacent text and form labels provide meaning; glyphs hidden |
| `CopyProjectNoteButton` | `Copy`, `Check` | Copy action and confirmation | Retain | Correct stateful pair with text that changes alongside the icon | 15px | Lucide default | Button, no icon-only control | Visible button text states the action/result; glyphs hidden |
| `MobileActionBar` | `LayoutGrid`, `Route`, `ArrowUpRight` | Services jump, process jump, project CTA | Retain | Compact anchors use familiar navigation symbols; CTA retains visible text | 18px anchors / 15px CTA | 1.9 / 2.1 | Icon anchors are their accessible link controls; CTA uncontained | The pre-existing icon-only Services and Process exceptions retain explicit `aria-label`s; CTA has visible text; glyphs hidden |
| `Footer` | `Mail`, `ArrowUpRight` | Email and project CTA | Retain | Small, quiet contact affordances fit the footer hierarchy | 15px | 1.8 / 2 | CTA button only | Adjacent email/CTA text supplies meaning; glyphs hidden |

## Minimum replacement set for the next task

| Current | Replacement | Render sites | Why |
| --- | --- | --- | --- |
| `Blocks` | `Workflow` | `components/sections/Services.tsx`, `components/mobile/MobileServices.tsx` | Better describes practical workflows, intake, client portals, and automation while leaving the shared service concept, count, and containers unchanged. |

No icon containers should be removed in the next task: each current container either establishes a service/status hierarchy or houses a compact accordion control. Any hover refinement should remain limited to the existing subtle color/border feedback; do not add scale, bounce, rotation, or other playful motion.
