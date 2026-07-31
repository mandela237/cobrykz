# Mobile Art Direction Studies and Recognition Frames Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an approval-ready page-level mobile art-direction study set and one recognition frame for every Cobrykz page family before any production implementation changes begin.

**Architecture:** This is a documentation-and-visual-evidence phase isolated from the production application. It converts the approved Mobile Art Direction Specification into static 390px composition studies, page-family direction sheets, and an approval matrix; `app/`, `components/`, shared content registries, stylesheets, and tests remain unchanged. After the complete study set is approved, each page family receives its own implementation plan and test cycle.

**Tech Stack:** Markdown direction sheets, existing 390px PNG baselines, raster composition studies, Git, PowerShell verification commands

## Global Constraints

- Preserve the approved information and improve only its presentation.
- Do not change approved copy, meaning, message hierarchy, information architecture, page hierarchy, calls to action, or strategic intent.
- Treat `docs/superpowers/specs/2026-07-31-cobrykz-mobile-art-direction-design.md` as the visual authority.
- Use **Measured Humanism**: architectural systems are the framework; human trust is the emotional layer.
- Every chapter has one dominant visual idea and no more than three visible hierarchy levels.
- Every major page has one recognition frame that remains legible as a static screenshot and recognizable as Cobrykz without its logo.
- People give the system purpose; photography must show accountability, thoughtful work, real environments, or lived benefit.
- Beauty comes from subtraction; do not add decorative effects, novelty, or visual noise.
- Blue functions as action, connection, illumination, or notation. Dark stages create concentration and remain selective.
- Do not use generic corporate, lifestyle, emotional-marketing, abstract-technology, or decorative stock imagery.
- Do not modify files under `app/`, `components/`, `lib/`, `tests/`, or `public/` during this plan.
- Do not alter or replace the approved baseline screenshots in `docs/reports/assets/`.
- Do not begin page implementation until Task 6 records explicit approval of the complete study set.

## File structure

Create the following isolated study package:

```text
docs/art-direction/mobile/
├── README.md
├── 00-study-matrix.md
├── 01-homepage-solutions.md
├── 02-solution-details.md
├── 03-company-pages.md
├── 04-editorial-evidence.md
├── 05-contact-recovery.md
├── 06-approval-record.md
└── assets/
    ├── homepage-recognition-frame-390.png
    ├── solutions-recognition-frame-390.png
    ├── solution-ai-recognition-frame-390.png
    ├── solution-automation-recognition-frame-390.png
    ├── solution-custom-software-recognition-frame-390.png
    ├── solution-digital-systems-recognition-frame-390.png
    ├── solution-websites-recognition-frame-390.png
    ├── solution-consulting-recognition-frame-390.png
    ├── process-recognition-frame-390.png
    ├── about-recognition-frame-390.png
    ├── projects-recognition-frame-390.png
    ├── insights-index-recognition-frame-390.png
    ├── insight-article-recognition-frame-390.png
    ├── contact-recognition-frame-390.png
    └── recovery-recognition-frame-390.png
```

`README.md` defines how to review the package. `00-study-matrix.md` is the content-lock and coverage authority. Files `01` through `05` explain the recognition-frame concept, composition, pacing, imagery, type, atmosphere, subtraction decisions, and relationship to approved content for each page family. `06-approval-record.md` is the hard gate between studies and production implementation. Files under `assets/` are static composition studies, not production screenshots or implementation references.

---

### Task 1: Lock the study matrix and current visual baseline

**Files:**
- Create: `docs/art-direction/mobile/README.md`
- Create: `docs/art-direction/mobile/00-study-matrix.md`
- Reference: `docs/superpowers/specs/2026-07-31-cobrykz-mobile-art-direction-design.md`
- Reference: `docs/reports/2026-07-30-mobile-chaptered-atlas-sitewide-review.md`
- Reference: `docs/reports/assets/2026-07-30-mobile-*-390.png`

**Interfaces:**
- Consumes: approved art-direction rules and the existing 390px mobile evidence set
- Produces: a frozen route-to-study map and review protocol used by Tasks 2–6

- [ ] **Step 1: Verify the baseline evidence set is complete**

Run:

```powershell
$required = @(
  '2026-07-30-mobile-homepage-390.png',
  '2026-07-30-mobile-solutions-390.png',
  '2026-07-30-mobile-solution-ai-390.png',
  '2026-07-30-mobile-solution-business-automation-390.png',
  '2026-07-30-mobile-solution-custom-software-development-390.png',
  '2026-07-30-mobile-solution-digital-business-systems-390.png',
  '2026-07-30-mobile-solution-websites-web-applications-390.png',
  '2026-07-30-mobile-solution-technology-consulting-390.png',
  '2026-07-30-mobile-process-390.png',
  '2026-07-30-mobile-about-390.png',
  '2026-07-30-mobile-projects-390.png',
  '2026-07-30-mobile-insights-390.png',
  '2026-07-30-mobile-contact-390.png',
  '2026-07-30-mobile-not-found-390.png'
)
$missing = $required | Where-Object { -not (Test-Path "docs/reports/assets/$_") }
if ($missing) { throw "Missing baseline evidence: $($missing -join ', ')" }
"Baseline evidence complete: $($required.Count) files"
```

Expected: `Baseline evidence complete: 14 files`.

- [ ] **Step 2: Create the review protocol**

Write `README.md` with these exact review rules:

```markdown
# Cobrykz Mobile Art Direction Studies

This package translates the approved Mobile Art Direction Specification into static page-level studies. It does not authorize or contain production implementation changes.

## Review order

1. Compare each study with its linked current 390px baseline.
2. Confirm that all approved information remains represented without changed meaning or strategic emphasis.
3. Judge the recognition frame as a static composition with the Cobrykz logo mentally removed.
4. Review the full page-family direction for composition, pacing, humanity, atmosphere, typography, and subtraction.
5. Record approval or required revision in `06-approval-record.md`.

## Approval rule

No production page, component, stylesheet, content registry, or test may change until every row in `06-approval-record.md` is approved and the complete study set receives final approval.
```

- [ ] **Step 3: Create the route-to-study matrix**

Write `00-study-matrix.md` with one row for each of these targets:

| Study target | Route or page family | Existing baseline | Recognition-frame asset | Content authority |
| --- | --- | --- | --- | --- |
| Homepage | `/` | `2026-07-30-mobile-homepage-390.png` | `homepage-recognition-frame-390.png` | shared homepage content |
| Solutions hub | `/solutions` | `2026-07-30-mobile-solutions-390.png` | `solutions-recognition-frame-390.png` | shared solutions registry |
| AI Solutions | `/solutions/ai` | `2026-07-30-mobile-solution-ai-390.png` | `solution-ai-recognition-frame-390.png` | shared solution registry |
| Business Automation | `/solutions/business-automation` | `2026-07-30-mobile-solution-business-automation-390.png` | `solution-automation-recognition-frame-390.png` | shared solution registry |
| Custom Software | `/solutions/custom-software-development` | `2026-07-30-mobile-solution-custom-software-development-390.png` | `solution-custom-software-recognition-frame-390.png` | shared solution registry |
| Digital Business Systems | `/solutions/digital-business-systems` | `2026-07-30-mobile-solution-digital-business-systems-390.png` | `solution-digital-systems-recognition-frame-390.png` | shared solution registry |
| Websites & Web Applications | `/solutions/websites-web-applications` | `2026-07-30-mobile-solution-websites-web-applications-390.png` | `solution-websites-recognition-frame-390.png` | shared solution registry |
| Technology Consulting | `/solutions/technology-consulting` | `2026-07-30-mobile-solution-technology-consulting-390.png` | `solution-consulting-recognition-frame-390.png` | shared solution registry |
| Process | `/process` | `2026-07-30-mobile-process-390.png` | `process-recognition-frame-390.png` | shared company content |
| About | `/about` | `2026-07-30-mobile-about-390.png` | `about-recognition-frame-390.png` | shared company content |
| Projects | `/projects` | `2026-07-30-mobile-projects-390.png` | `projects-recognition-frame-390.png` | shared projects registry |
| Insights index | `/insights` | `2026-07-30-mobile-insights-390.png` | `insights-index-recognition-frame-390.png` | shared insights registry |
| Insight article | `/insights/[slug]` | no published-article baseline | `insight-article-recognition-frame-390.png` | shared insight article model |
| Contact | `/contact` | `2026-07-30-mobile-contact-390.png` | `contact-recognition-frame-390.png` | shared contact content |
| Recovery | missing route and global error | `2026-07-30-mobile-not-found-390.png` | `recovery-recognition-frame-390.png` | approved recovery copy |

Add a content-lock column to every row with the value `Locked: presentation only`.

- [ ] **Step 4: Check the matrix for missing targets and forbidden source changes**

Run:

```powershell
$matrix = Get-Content -Raw 'docs/art-direction/mobile/00-study-matrix.md'
$assets = @(
  'homepage','solutions','solution-ai','solution-automation',
  'solution-custom-software','solution-digital-systems','solution-websites',
  'solution-consulting','process','about','projects','insights-index',
  'insight-article','contact','recovery'
)
$missing = $assets | Where-Object { $matrix -notmatch [regex]::Escape("$_-recognition-frame-390.png") }
if ($missing) { throw "Study matrix missing: $($missing -join ', ')" }
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed during study phase:`n$forbidden" }
'Study matrix complete; production source unchanged'
```

Expected: `Study matrix complete; production source unchanged`.

- [ ] **Step 5: Commit the study foundation**

```powershell
git add docs/art-direction/mobile/README.md docs/art-direction/mobile/00-study-matrix.md
git commit -m "docs: establish mobile art direction study matrix"
```

Expected: one documentation-only commit with the two study foundation files.

---

### Task 2: Study the Homepage and Solutions hub recognition frames

**Files:**
- Create: `docs/art-direction/mobile/01-homepage-solutions.md`
- Create: `docs/art-direction/mobile/assets/homepage-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/solutions-recognition-frame-390.png`
- Reference: `components/content/home.ts`
- Reference: `components/content/solutions.ts`
- Reference: `docs/reports/assets/2026-07-30-mobile-homepage-390.png`
- Reference: `docs/reports/assets/2026-07-30-mobile-solutions-390.png`

**Interfaces:**
- Consumes: Task 1 study matrix and the approved art-direction specification
- Produces: approved opening-tableau and connected-capability-field studies that later Homepage and Solutions implementation plans must reproduce

- [ ] **Step 1: Transcribe the immutable content inventory**

In `01-homepage-solutions.md`, create separate Homepage and Solutions sections. Under each section, list the approved visible headings, labels, calls to action, and chapter sequence exactly as sourced from `components/content/home.ts` or `components/content/solutions.ts`. Prefix the inventory with:

```markdown
> Content lock: Every listed item remains unchanged. The study may alter composition, crop, scale, spacing, atmosphere, and visual grouping only.
```

- [ ] **Step 2: Define the Homepage recognition frame before rendering it**

Record this direction in the Homepage section:

```markdown
### Recognition frame: The business consequence and the connected system

- Dominant idea: the approved hero consequence occupies an architectural field with one deliberately composed line silhouette.
- System layer: a restrained fragment of the existing System Atlas enters the lower composition as connected evidence, not futuristic scenery.
- Human layer: one natural founder or working-detail image appears as a quiet material plate, subordinate to the business consequence but essential to the emotional reading.
- Atmosphere: daylight architecture, cool surface, deep ink type, one conviction-blue connection signal, and a restrained mineral transition.
- Subtraction: remove repeated framing, equal-weight labels, and any decorative system marks that do not explain a relationship.
- Recognition test: without the logo, the frame still combines Cobrykz's consequence-first language, precise Atlas geometry, and accountable human presence.
```

- [ ] **Step 3: Render the Homepage 390px static study**

Create `homepage-recognition-frame-390.png` at exactly `390px` wide. Use only approved hero copy and existing approved visual source material. The study must show a complete screen-sized composition, contain no invented metric or claim, and remain intelligible without motion.

Verify dimensions:

```powershell
Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Image]::FromFile((Resolve-Path 'docs/art-direction/mobile/assets/homepage-recognition-frame-390.png'))
try {
  if ($image.Width -ne 390) { throw "Homepage study width is $($image.Width), expected 390" }
  "Homepage study: $($image.Width)x$($image.Height)"
} finally { $image.Dispose() }
```

Expected: output begins `Homepage study: 390x`.

- [ ] **Step 4: Define the Solutions hub recognition frame before rendering it**

Record this direction in the Solutions section:

```markdown
### Recognition frame: One connected field of capability

- Dominant idea: the six approved solutions read as one architectural editorial index rather than six service cards.
- System layer: relationships and shared business purpose are visible through restrained rails, coordinates, or planes derived from the System Atlas.
- Human layer: warmth comes through material surface, pacing, and one contextual working detail; no generic team image is introduced.
- Atmosphere: predominantly light, with deep ink structure and blue used only for connection and active notation.
- Subtraction: eliminate repeated card shells, redundant labels, decorative badges, and uniform visual emphasis.
- Recognition test: without the logo, the field remains identifiable through Cobrykz's exact editorial hierarchy and Atlas relationship language.
```

- [ ] **Step 5: Render the Solutions 390px static study**

Create `solutions-recognition-frame-390.png` at exactly `390px` wide. Preserve all six solution names and their approved ordering or strategic grouping; do not promote or demote a capability through rewritten messaging.

Run the same `System.Drawing.Image` dimension check against the Solutions asset and expect width `390`.

- [ ] **Step 6: Perform the paired study review**

Append a table with rows `Content parity`, `One dominant idea`, `Measured Humanism`, `Atlas restraint`, `Static memorability`, `Logo-free recognition`, and `Subtraction`. Each row must contain a concrete observation for both studies and a result of `Pass` or `Revise`; no row may be left blank.

- [ ] **Step 7: Verify isolation and commit**

Run:

```powershell
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed:`n$forbidden" }
git add docs/art-direction/mobile/01-homepage-solutions.md docs/art-direction/mobile/assets/homepage-recognition-frame-390.png docs/art-direction/mobile/assets/solutions-recognition-frame-390.png
git commit -m "docs: study mobile homepage and solutions art direction"
```

Expected: one documentation/assets commit; no production source changes.

---

### Task 3: Study all six Solution detail recognition frames

**Files:**
- Create: `docs/art-direction/mobile/02-solution-details.md`
- Create: the six `solution-*-recognition-frame-390.png` assets listed in the file structure
- Reference: `components/content/solutions.ts`
- Reference: `components/content/solutionVisuals.ts`
- Reference: the six existing `docs/reports/assets/2026-07-30-mobile-solution-*-390.png` baselines

**Interfaces:**
- Consumes: the Task 1 matrix, shared solution content registry, and approved page-specific artifact concepts
- Produces: six related but materially distinct capability artifacts for later Solution implementation plans

- [ ] **Step 1: Create a locked content and differentiation table**

In `02-solution-details.md`, create one row per solution with these exact visual propositions:

| Solution | Page-specific artifact | Human purpose | Prohibited shortcut |
| --- | --- | --- | --- |
| AI Solutions | Controlled intelligence loop with visible human judgment | Help people use intelligence responsibly in meaningful work | Generic neural-network or glowing-orb imagery |
| Business Automation | Friction transformed into dependable flow | Return attention to higher-value human work | Recolored pipeline diagram |
| Custom Software Development | Tailored architecture shaped around business constraints | Give a team a system fitted to its actual operation | Generic code or device montage |
| Digital Business Systems | Connected information, tools, ownership, and operating context | Help people see and manage the whole operation | Dense documentation schematic |
| Websites & Web Applications | Customer experience meeting business operations | Connect a human-facing experience to the system supporting it | Decorative browser mockup as the primary idea |
| Technology Consulting | Ambiguity becoming an accountable sequence of decisions | Help leaders make clear choices with confidence | Generic roadmap timeline |

Under the table, transcribe each page's approved hero heading and chapter order from the shared solution registry. Mark every entry `Locked: presentation only`.

- [ ] **Step 2: Define the shared family resemblance**

Add this rule block:

```markdown
### Family resemblance

All six studies use the same typographic roles, daylight architectural palette, deep-ink concentration stage, conviction-blue notation, precise rules, restrained material texture, and three-level hierarchy. They differ through geometry, spatial logic, evidence, and emotional cadence. None may be produced by changing only title, icon, and color inside a shared composition.
```

- [ ] **Step 3: Render the six recognition frames**

Create each listed solution asset at exactly `390px` wide. Each frame must include its approved page heading, one page-specific artifact, one clear human-purpose signal, and no invented copy, evidence, metric, or imagery claim.

- [ ] **Step 4: Verify asset dimensions and naming**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem 'docs/art-direction/mobile/assets/solution-*-recognition-frame-390.png'
if ($files.Count -ne 6) { throw "Expected 6 solution studies, found $($files.Count)" }
foreach ($file in $files) {
  $image = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    if ($image.Width -ne 390) { throw "$($file.Name) width is $($image.Width)" }
  } finally { $image.Dispose() }
}
'Six solution studies present at 390px width'
```

Expected: `Six solution studies present at 390px width`.

- [ ] **Step 5: Run the distinctiveness review**

For each study, document its dominant idea, human purpose, unique geometry, quiet moment, and subtraction decision. Add a pairwise check confirming that no two studies share the same composition with only cosmetic changes. Any failed pair must be revised before committing.

- [ ] **Step 6: Verify isolation and commit**

```powershell
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed:`n$forbidden" }
git add docs/art-direction/mobile/02-solution-details.md docs/art-direction/mobile/assets/solution-*-recognition-frame-390.png
git commit -m "docs: study mobile solution detail art direction"
```

Expected: one documentation/assets commit containing six distinct studies.

---

### Task 4: Study Process, About, Projects, and editorial recognition frames

**Files:**
- Create: `docs/art-direction/mobile/03-company-pages.md`
- Create: `docs/art-direction/mobile/04-editorial-evidence.md`
- Create: `docs/art-direction/mobile/assets/process-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/about-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/projects-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/insights-index-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/insight-article-recognition-frame-390.png`
- Reference: `components/content/companyPages.ts`
- Reference: `components/content/projects.ts`
- Reference: `components/content/insights.ts`

**Interfaces:**
- Consumes: approved company, evidence, and editorial content plus Task 1 review protocol
- Produces: recognition frames for accountable delivery, founder responsibility, honest evidence, and thought leadership

- [ ] **Step 1: Define the Process and About studies**

Write `03-company-pages.md` with these locked concepts:

```markdown
## Process — continuous accountable passage

The delivery model reads as one connected architectural passage with visible decisions, handoffs, and stewardship. The memorable idea is continuity rather than six isolated steps. Human presence appears through annotation, review, and decision-making. No approved stage name or explanation changes.

## About — a capable person stands behind the system

A natural founder portrait or working-environment composition holds substantial space with the approved accountability statement. Biography remains secondary to judgment, standards, and responsibility. If approved founder photography is unavailable, the study must use a clearly labeled non-production image reference and may not imply it is final photography.
```

- [ ] **Step 2: Render and verify the Process and About assets**

Create both assets at exactly `390px` wide. The Process study must remain intelligible without motion. The About study must preserve natural skin tone and avoid a staged corporate pose. Verify widths with `System.Drawing.Image`.

- [ ] **Step 3: Define the Projects and Insights studies**

Write `04-editorial-evidence.md` with these locked concepts:

```markdown
## Projects — evidence examined, not advertised

The current honest publication state becomes a quiet evidence-standard composition. Do not invent a project, client, screenshot, testimonial, outcome, or metric. The recognition frame presents the approved evidence standard with documentary restraint.

## Insights index — an edited publication

The index uses the approved editorial introduction and publication state as a considered cover and contents composition. Do not imply that unavailable articles are published.

## Insight article — clarity of thought

The article study uses the approved article model and a conceptual diagram or typographic opening strong enough to function as an editorial cover. It demonstrates the visual system only and may not be presented as a live published article.
```

- [ ] **Step 4: Render and verify the Projects and Insights assets**

Create the three assets at exactly `390px` wide. Projects and Insights index studies must represent their honest current publication states. Label the article study `Template study — not published` within its direction sheet, not inside the recognition-frame composition.

- [ ] **Step 5: Review humanity, evidence, and restraint**

For all five studies, record `Pass` or `Revise` for content integrity, one dominant idea, appropriate human presence, evidence honesty, static memorability, logo-free recognition, and subtraction. Revise every failed study before committing.

- [ ] **Step 6: Verify isolation and commit**

```powershell
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed:`n$forbidden" }
git add docs/art-direction/mobile/03-company-pages.md docs/art-direction/mobile/04-editorial-evidence.md docs/art-direction/mobile/assets/process-recognition-frame-390.png docs/art-direction/mobile/assets/about-recognition-frame-390.png docs/art-direction/mobile/assets/projects-recognition-frame-390.png docs/art-direction/mobile/assets/insights-index-recognition-frame-390.png docs/art-direction/mobile/assets/insight-article-recognition-frame-390.png
git commit -m "docs: study mobile company and editorial art direction"
```

Expected: one documentation/assets commit with five recognition-frame studies.

---

### Task 5: Study Contact and recovery recognition frames

**Files:**
- Create: `docs/art-direction/mobile/05-contact-recovery.md`
- Create: `docs/art-direction/mobile/assets/contact-recognition-frame-390.png`
- Create: `docs/art-direction/mobile/assets/recovery-recognition-frame-390.png`
- Reference: `components/content/contact.ts`
- Reference: `app/not-found.tsx`
- Reference: `app/global-error.tsx`

**Interfaces:**
- Consumes: approved contact and recovery copy plus the shared study criteria
- Produces: final page-family studies completing the sitewide recognition-frame set

- [ ] **Step 1: Define the Contact study**

Record:

```markdown
## Contact — a calm threshold into conversation

The approved opening question or final invitation occupies a generous stage. The form is visually understood as a project note within that environment, not the page identity. Warmth comes from intimate measure, tactile material, and the sense that an accountable person will receive the message. The study does not alter fields, expectations, reassurance, validation meaning, or calls to action.
```

- [ ] **Step 2: Define the recovery study**

Record:

```markdown
## Recovery — interruption becomes orientation

A concise architectural composition makes the error state calm, specific, and useful. It preserves the approved routes back into the site and remains recognizably Cobrykz without imitating a major landing page. It adds no humor, technical jargon, or novelty that changes the brand voice.
```

- [ ] **Step 3: Render and verify both assets**

Create both assets at exactly `390px` wide using only approved copy. Contact must feel quieter and more personal than a Solution page. Recovery must remain visually complete without becoming theatrical. Verify widths with `System.Drawing.Image`.

- [ ] **Step 4: Review closure and brand continuity**

Document `Pass` or `Revise` for content parity, emotional resolution, one dominant idea, static memorability, logo-free recognition, appropriate restraint, and differentiation from the Homepage. Revise failed studies.

- [ ] **Step 5: Verify isolation and commit**

```powershell
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed:`n$forbidden" }
git add docs/art-direction/mobile/05-contact-recovery.md docs/art-direction/mobile/assets/contact-recognition-frame-390.png docs/art-direction/mobile/assets/recovery-recognition-frame-390.png
git commit -m "docs: study mobile contact and recovery art direction"
```

Expected: one documentation/assets commit with the final two studies.

---

### Task 6: Assemble the approval gate and authorize page-family planning

**Files:**
- Create: `docs/art-direction/mobile/06-approval-record.md`
- Modify: `docs/art-direction/mobile/README.md`
- Verify: all files under `docs/art-direction/mobile/`

**Interfaces:**
- Consumes: every direction sheet and all 15 recognition-frame assets from Tasks 1–5
- Produces: an explicit approval record; only a fully approved record authorizes separate production implementation plans

- [ ] **Step 1: Verify the complete asset set**

Run:

```powershell
$expected = @(
  'homepage','solutions','solution-ai','solution-automation',
  'solution-custom-software','solution-digital-systems','solution-websites',
  'solution-consulting','process','about','projects','insights-index',
  'insight-article','contact','recovery'
) | ForEach-Object { "docs/art-direction/mobile/assets/$_-recognition-frame-390.png" }
$missing = $expected | Where-Object { -not (Test-Path $_) }
if ($missing) { throw "Missing studies: $($missing -join ', ')" }
"Complete recognition-frame set: $($expected.Count) assets"
```

Expected: `Complete recognition-frame set: 15 assets`.

- [ ] **Step 2: Create the page-family approval matrix**

Write `06-approval-record.md` with one row for each target in `00-study-matrix.md` and these columns:

```markdown
| Target | Content exact | Composition | Measured Humanism | Recognition frame | Subtraction | Status | Reviewer note |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

Allowed status values are `Pending`, `Revise`, and `Approved`. Begin every row as `Pending`; do not infer approval from this plan or from the art-direction specification.

- [ ] **Step 3: Add the final sitewide review**

Below the matrix, add these questions with an unanswered checkbox:

```markdown
- [ ] Each screen feels individually composed.
- [ ] Every page is warmer and more human without becoming sentimental.
- [ ] Every recognition frame is memorable without relying on novelty.
- [ ] The studies remain identifiable as Cobrykz without the logo.
- [ ] Removing another element would weaken meaning or composition.
- [ ] Visitors receive the exact approved strategy and content more clearly.
- [ ] The complete set feels like one visual language without becoming one template.
```

- [ ] **Step 4: Link the approval record from the package README**

Add:

```markdown
## Current gate

Production implementation remains paused until every target and every sitewide criterion in [`06-approval-record.md`](./06-approval-record.md) is explicitly approved.
```

- [ ] **Step 5: Run the final isolation and quality checks**

Run:

```powershell
$forbidden = git status --short -- app components lib tests public
if ($forbidden) { throw "Production source changed during studies:`n$forbidden" }
git diff --check -- docs/art-direction/mobile
'Study package complete; production implementation remains paused'
```

Expected: `Study package complete; production implementation remains paused`.

- [ ] **Step 6: Commit the approval gate**

```powershell
git add docs/art-direction/mobile/README.md docs/art-direction/mobile/06-approval-record.md
git commit -m "docs: add mobile art direction approval gate"
```

Expected: one documentation-only commit.

- [ ] **Step 7: Obtain explicit visual approval**

Present the complete study package and all 15 recognition frames for review. Update rows from `Pending` to `Revise` or `Approved` only from explicit reviewer feedback. Revise rejected direction sheets or assets without touching production source.

The phase is complete only when all 15 rows and all seven sitewide criteria are marked `Approved`. Commit the signed record:

```powershell
git add docs/art-direction/mobile/06-approval-record.md docs/art-direction/mobile
git commit -m "docs: approve mobile recognition frame studies"
```

- [ ] **Step 8: Create separate implementation plans after approval**

After approval, use the writing-plans skill to create plans in this order:

1. Homepage and shared mobile art-direction primitives.
2. Solutions hub and six Solution detail pages.
3. Process and About.
4. Projects, Insights index, and Insight article.
5. Contact, recovery, and sitewide visual verification.

Each plan must preserve shared typed content sources, start with failing content-parity and visual-contract tests, implement only its approved recognition frames and page-family direction, capture 390px evidence, and include desktop regression verification. Do not combine these families into one production sweep.
