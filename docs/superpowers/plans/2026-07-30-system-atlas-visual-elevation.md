# Cobrykz System Atlas Visual Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the approved Cobrykz website with a selective, semantic System Atlas visual language, varied editorial composition, purposeful depth, and page-specific memorable moments without changing frozen content or architecture.

**Architecture:** Add a small server-rendered SVG atlas system with typed diagram definitions, accessible text equivalents, and CSS-driven state/motion. Page-specific visual components consume that system only where spatial explanation improves understanding; other sections are recomposed with typography, photography, artifacts, and white space. Interactive enhancement is isolated to focused client components and preserves a complete static default state.

**Tech Stack:** Next.js 16.2.9 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, semantic HTML, accessible inline SVG, CSS motion with reduced-motion support, Node test runner

## Global Constraints

- Navigation, information architecture, homepage section order, page hierarchy, messaging, headlines, approved copy, SEO strategy, CTA strategy, and brand positioning are frozen.
- System Atlas is the signature visual language, not the only visual language.
- No page or section has a diagram quota.
- Use Atlas only for a named relationship, workflow, information flow, decision, boundary, ownership model, or transformation.
- Typography, editorial composition, photography, real artifacts, and white space remain primary visual tools.
- Every plane, seam, node, path, frame, signal, and transition must have a named semantic meaning.
- Essential meaning cannot depend on motion, color, depth, JavaScript, hover, or pointer input.
- Use HTML and SVG by default. Do not add Canvas, WebGL, Three.js, an animation library, or a new runtime dependency.
- Keep the approved palette and typography. Do not add service-specific themes, neon, chrome, holograms, generic glassmorphism, or sci-fi effects.
- Preserve honest publication states: no fabricated projects, articles, interfaces, outcomes, screenshots, metrics, or testimonials.
- Preserve one responsive content tree from 320px upward.
- All controls remain keyboard accessible and at least 44px on mobile.
- Reduced-motion mode renders the complete resolved information state.
- Keep `0721.mp4` and unrelated `.superpowers/sdd/task-*-report.md` changes untouched.
- Browser visual QA follows the complete implementation; source-contract tests are not a substitute for rendered review.

---

### Task 1: Shared System Atlas Grammar and Visual Tokens

**Files:**
- Create: `components/atlas/types.ts`
- Create: `components/atlas/SystemAtlas.tsx`
- Create: `components/atlas/AtlasLegend.tsx`
- Create: `components/atlas/AtlasTextEquivalent.tsx`
- Modify: `app/globals.css`
- Create: `tests/system-atlas-contract.test.mjs`

**Interfaces:**
- Produces:
  - `AtlasNodeKind = "context" | "system" | "decision" | "control" | "outcome" | "owner"`
  - `AtlasNode`
  - `AtlasConnection`
  - `AtlasLayer`
  - `AtlasDefinition`
  - `<SystemAtlas definition className? />`
- `SystemAtlas` renders a semantic `<figure>`, an inline SVG, a caption, a legend when required, and a screen-reader text equivalent from the same definition.
- CSS produces four depth levels and named active/inactive states without hiding content.

- [ ] **Step 1: Write the failing shared-atlas contract test**

Add source and content tests that require the exact types and accessible output:

```js
test("defines a semantic System Atlas grammar", () => {
  const types = read("components/atlas/types.ts");
  for (const name of [
    "AtlasNodeKind",
    "AtlasNode",
    "AtlasConnection",
    "AtlasLayer",
    "AtlasDefinition",
  ]) {
    assert.match(types, new RegExp(`export type ${name}`));
  }
  assert.match(types, /meaning:\s*string/);
  assert.match(types, /source:\s*string/);
  assert.match(types, /target:\s*string/);
  assert.match(types, /flowLabel:\s*string/);
});

test("renders one accessible figure and text equivalent", () => {
  const source = read("components/atlas/SystemAtlas.tsx");
  assert.match(source, /<figure\b/);
  assert.match(source, /<svg\b/);
  assert.match(source, /role="img"/);
  assert.match(source, /<title\b/);
  assert.match(source, /<desc\b/);
  assert.match(source, /<figcaption\b/);
  assert.match(source, /<AtlasTextEquivalent/);
  assert.doesNotMatch(source, /["']use client["']/);
});
```

- [ ] **Step 2: Run the focused test and verify the red state**

Run:

```bash
node --test tests/system-atlas-contract.test.mjs
```

Expected: failure because the Atlas files do not exist.

- [ ] **Step 3: Define the exact diagram model**

Implement:

```ts
export type AtlasNodeKind =
  | "context"
  | "system"
  | "decision"
  | "control"
  | "outcome"
  | "owner";

export type AtlasNode = {
  id: string;
  label: string;
  detail: string;
  kind: AtlasNodeKind;
  layerId: string;
  x: number;
  y: number;
};

export type AtlasConnection = {
  id: string;
  source: string;
  target: string;
  flowLabel: string;
  state?: "supporting" | "active" | "verified";
};

export type AtlasLayer = {
  id: string;
  label: string;
  meaning: string;
  depth: 1 | 2 | 3 | 4;
};

export type AtlasDefinition = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  readingDirection: string;
  layers: readonly AtlasLayer[];
  nodes: readonly AtlasNode[];
  connections: readonly AtlasConnection[];
  legend?: readonly { label: string; meaning: string }[];
};
```

Reject unnamed graphical elements by making labels and meanings required.

- [ ] **Step 4: Implement the shared server-rendered figure**

`SystemAtlas.tsx` must:

- Generate stable element IDs from `definition.id`.
- Draw one labeled `<g>` per layer.
- Draw connections with visible `flowLabel` text and marker arrows.
- Draw nodes with a visible label and kind-specific shape.
- Use `<title>` and `<desc>` tied through `aria-labelledby`.
- Render `AtlasLegend` only when `definition.legend` exists.
- Render `AtlasTextEquivalent` as a visually hidden ordered description of layers, nodes, and connections.
- Use `data-atlas-kind`, `data-atlas-depth`, and `data-atlas-state` hooks instead of route-specific CSS classes.

- [ ] **Step 5: Add restrained material and motion tokens**

Add shared CSS custom properties and classes:

```css
:root {
  --atlas-plane: rgba(234, 242, 255, 0.72);
  --atlas-plane-dark: rgba(255, 255, 255, 0.055);
  --atlas-frame: rgba(122, 137, 156, 0.42);
  --atlas-path: #1f5eff;
  --atlas-verified: #177b57;
  --atlas-depth-shadow: 0 28px 70px rgba(11, 23, 40, 0.12);
  --atlas-signal-shadow: 0 0 0 5px rgba(31, 94, 255, 0.1);
}

.atlas-path[data-atlas-state="active"] {
  stroke-dasharray: 7 9;
  animation: atlas-flow 8s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .atlas-path {
    animation: none !important;
    stroke-dasharray: none;
  }
}
```

Do not add blur behind text or decorative looping transforms.

- [ ] **Step 6: Run shared grammar verification**

Run:

```bash
node --test tests/system-atlas-contract.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the shared grammar**

```bash
git add app/globals.css components/atlas tests/system-atlas-contract.test.mjs
git commit -m "feat: add semantic Cobrykz System Atlas grammar"
```

---

### Task 2: Homepage Business System Cutaway Hero

**Files:**
- Create: `components/home/BusinessSystemCutaway.tsx`
- Modify: `components/home/HomeHero.tsx`
- Modify: `components/content/home.ts`
- Modify: `tests/strategy-contract.test.mjs`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: `AtlasDefinition`, `SystemAtlas`
- Produces: `businessSystemCutaway` and `<BusinessSystemCutaway />`
- The definition contains only approved visible concepts: business challenge, people, information, existing tools, assessment, relevant capabilities, connected delivery, growth, efficiency, clarity, and improvement.

- [ ] **Step 1: Add failing hero composition tests**

Require:

```js
test("turns the homepage hero into a meaningful business-system cutaway", () => {
  const hero = read("components/home/HomeHero.tsx");
  const cutaway = read("components/home/BusinessSystemCutaway.tsx");
  assert.match(hero, /<BusinessSystemCutaway\s*\/>/);
  assert.match(cutaway, /<SystemAtlas/);
  for (const label of [
    "Business challenge",
    "People and information",
    "Assessment",
    "Relevant capabilities",
    "Connected delivery",
    "Growth and efficiency",
    "Continued improvement",
  ]) {
    assert.match(cutaway, new RegExp(label));
  }
  assert.doesNotMatch(cutaway, /orb|particle|random|dashboard|performance score/i);
});
```

Also require the frozen H1, support copy, primary CTA, and contextual action to remain byte-for-byte unchanged in the content registry.

- [ ] **Step 2: Verify the hero test fails**

Run:

```bash
node --test tests/strategy-contract.test.mjs tests/presentation-quality.test.mjs
```

Expected: failure because `BusinessSystemCutaway.tsx` is absent.

- [ ] **Step 3: Define the business transformation model**

Create one `AtlasDefinition` with:

- Context layer: Business challenge; People and information; Existing tools
- Assessment layer: Context and constraints; Priorities and decisions
- Capability layer: Relevant capabilities; Connected delivery
- Outcome layer: Growth and efficiency; Clarity; Continued improvement
- Active path labels: “understand,” “choose,” “deliver,” and “improve”

Do not put all six service names into the first viewport. The hero explains the
business transformation model; the Solutions section names the portfolio.

- [ ] **Step 4: Recompose the hero without changing its content**

Use one responsive tree:

```tsx
<section className="home-hero-atlas">
  <div className="section-shell home-hero-atlas__grid">
    <div className="home-hero-atlas__message">
      {/* existing eyebrow, H1, support, actions, and reassurance */}
    </div>
    <BusinessSystemCutaway />
  </div>
</section>
```

Desktop uses a deep-ink system stage and a crisp message plane. Mobile places
the complete diagram below the actions as an ordered vertical cutaway. No
absolute-positioned text may overlap the figure.

- [ ] **Step 5: Add a single semantic activation**

Use CSS to resolve the active route once on page entry. Connection motion may
move only from named inputs to named outcomes. Do not add pointer parallax or a
continuously drifting scene.

- [ ] **Step 6: Verify hero behavior**

Run:

```bash
node --test tests/strategy-contract.test.mjs tests/presentation-quality.test.mjs tests/system-atlas-contract.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the hero**

```bash
git add components/home/BusinessSystemCutaway.tsx components/home/HomeHero.tsx components/content/home.ts tests/strategy-contract.test.mjs tests/presentation-quality.test.mjs
git commit -m "feat: elevate the Cobrykz homepage hero"
```

---

### Task 3: Homepage Rhythm and Visual Continuity

**Files:**
- Create: `components/home/HomeSystemThread.tsx`
- Modify: `components/home/BusinessOutcomes.tsx`
- Modify: `components/home/SolutionsOverview.tsx`
- Modify: `components/home/WhyCobrykz.tsx`
- Modify: `components/home/AIPointOfView.tsx`
- Modify: `components/home/ChallengeRouter.tsx`
- Modify: `components/home/ProcessOverview.tsx`
- Modify: `components/home/ProjectsEvidence.tsx`
- Modify: `components/home/AuthorityBand.tsx`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: frozen homepage content and `AtlasDefinition`
- Produces: a restrained `HomeSystemThread` visual fragment reused only by the Challenge Router and Process Overview
- No homepage section order or copy changes.

- [ ] **Step 1: Add failing rhythm tests**

Require:

- No more than two adjacent homepage sections use the same top-level background and list/grid structure.
- Exactly one full Atlas figure appears in the hero.
- At most two smaller Atlas fragments appear below the hero.
- Why Cobrykz uses editorial columns rather than five identical equal cards.
- Projects Evidence remains an honest evidence standard, not a fake visual case study.

Example:

```js
test("uses System Atlas selectively across the homepage", () => {
  const homeComponents = readMany(homeComponentPaths);
  assert.equal(count(homeComponents, /<SystemAtlas\b/g), 1);
  assert.ok(count(homeComponents, /<HomeSystemThread\b/g) <= 2);
  assert.doesNotMatch(
    read("components/home/WhyCobrykz.tsx"),
    /lg:grid-cols-5/,
  );
});
```

- [ ] **Step 2: Verify the rhythm test fails**

Run:

```bash
node --test tests/presentation-quality.test.mjs
```

Expected: failure on repeated composition and missing thread component.

- [ ] **Step 3: Assign one composition role to every homepage section**

Implement without copy changes:

- Business Outcomes: three outcome terminals with asymmetric editorial scale
- Solutions Overview: capability index with one persistent relationship rail
- Why Cobrykz: one dominant principle plus four supporting standards
- AI Point of View: editorial argument paired with one controlled decision artifact
- Challenge Router: interactive path tracing through the small system thread
- Process Overview: six-stage progression on the same thread
- Projects Evidence: framed evidence standard with purposeful white space
- Authority Band: founder/accountability composition without a diagram
- Final CTA: typographic decision stage without an Atlas visual

- [ ] **Step 4: Connect Challenge Router state to one explanatory path**

Extend the existing selected challenge state with an approved
`solutionSlugs` mapping. Render `HomeSystemThread` with the selected path;
preserve all existing buttons, labels, recommendations, and links.

- [ ] **Step 5: Add section-level depth without card repetition**

Use structural frames, one or two overlapping context planes, inset annotations,
and tonal anchors. Do not wrap each text block in a surface. Use shadows only on
working artifacts or genuinely elevated planes.

- [ ] **Step 6: Verify homepage integrity**

Run:

```bash
node --test tests/strategy-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: frozen content/order tests and presentation tests pass.

- [ ] **Step 7: Commit homepage rhythm**

```bash
git add components/home tests/presentation-quality.test.mjs
git commit -m "feat: compose the homepage as one transformation story"
```

---

### Task 4: Solutions Capability Atlas and Dedicated Visual Models

**Files:**
- Create: `components/solutions/CapabilityRelationshipAtlas.tsx`
- Create: `components/solutions/SolutionOperatingModel.tsx`
- Create: `components/content/solutionVisuals.ts`
- Modify: `components/solutions/SolutionsHub.tsx`
- Modify: `components/solutions/SolutionPage.tsx`
- Modify: `components/solutions/SolutionArtifact.tsx`
- Modify: `components/content/solutions.ts`
- Modify: `tests/solutions-contract.test.mjs`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: exact six `SolutionSlug` values and the existing solution models
- Produces:
  - `SolutionVisualKind`
  - `SolutionVisualDefinition`
  - `solutionVisualBySlug: Record<SolutionSlug, SolutionVisualDefinition>`
  - `<CapabilityRelationshipAtlas />`
  - `<SolutionOperatingModel solution visual />`
- Every visual definition names its business input, system boundary, controls, flow, and outcome.

- [ ] **Step 1: Add failing six-model tests**

Require the exact mapping:

```ts
export type SolutionVisualKind =
  | "controlled-ai-loop"
  | "workflow-transformation"
  | "ownership-boundary"
  | "operating-environment"
  | "service-delivery-cutaway"
  | "decision-landscape";
```

Require:

- AI: input, knowledge, AI capability, human review, system action, monitoring, fallback
- Automation: intake, handoffs, approvals, exceptions, human oversight, completion
- Custom Software: interface, workflow, business rules, integrations, ownership
- Digital Systems: people, tools, workflows, information, connected environment
- Websites: customer/user experience, content, transaction, operations, integration, measurement
- Consulting: current state, opportunities, constraints, risks, priorities, roadmap

- [ ] **Step 2: Verify the solution visual test fails**

Run:

```bash
node --test tests/solutions-contract.test.mjs
```

Expected: failure because `solutionVisuals.ts` and the two visual components are absent.

- [ ] **Step 3: Implement the capability relationship atlas**

The hub model must make these distinctions visible:

- Consulting clarifies the path.
- Software creates a tailored application.
- Digital Business Systems create the connected environment.
- Automation moves work through the environment.
- AI adds focused intelligence where justified.
- Websites and Web Applications create customer and user experiences.

Use explicit solution links as controls. The default view shows the complete
relationship and does not imply every solution is required.

- [ ] **Step 4: Define six dedicated operating models**

Populate `solutionVisualBySlug` from the approved content. Use one primary model
per solution page. Do not add secondary decorative diagrams.

- [ ] **Step 5: Upgrade the existing workflow and system-map artifacts**

Refactor `SolutionArtifact.tsx` to consume the shared Atlas grammar while
preserving its explicit “illustrative workflow” and “system map” labels. Keep
current before/after and distinction content; do not invent process metrics.

- [ ] **Step 6: Recompose solution-page rhythm**

Keep shared page architecture but assign different composition emphasis:

- Problem recognition: editorial
- Outcomes: directional or terminal states
- Capabilities: structured index
- Primary operating model: signature Atlas moment
- Applications: annotated examples
- Guidance: decision brief
- Approach: progression
- Related solutions and FAQs: quiet editorial close

All six pages remain one brand and one component system.

- [ ] **Step 7: Verify all seven solution routes**

Run:

```bash
node --test tests/solutions-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all commands exit 0 and the build lists `/solutions` plus all six
dedicated static routes.

- [ ] **Step 8: Commit solution visuals**

```bash
git add components/content/solutionVisuals.ts components/content/solutions.ts components/solutions tests/solutions-contract.test.mjs tests/presentation-quality.test.mjs
git commit -m "feat: add Cobrykz capability and solution operating models"
```

---

### Task 5: Process Delivery Rail

**Files:**
- Create: `components/company/DeliveryRail.tsx`
- Modify: `components/company/ProcessPage.tsx`
- Modify: `components/content/companyPages.ts`
- Modify: `tests/company-content-contract.test.mjs`

**Interfaces:**
- Consumes: existing six process stages and two decision gates
- Produces: `<DeliveryRail stages gates />`
- Each stage exposes the existing input, working activity, output, accountability, and gate content without new claims.

- [ ] **Step 1: Add the failing Delivery Rail test**

Require one continuous ordered model containing the exact sequence:

```js
for (const stage of ["Discover", "Assess", "Design", "Build", "Deploy", "Optimize"]) {
  assert.match(rail, new RegExp(stage));
}
assert.equal((rail.match(/data-decision-gate/g) || []).length, 2);
assert.match(rail, /<ol\b/);
assert.match(rail, /aria-label="Cobrykz delivery process"/);
```

- [ ] **Step 2: Verify the focused test fails**

Run:

```bash
node --test tests/company-content-contract.test.mjs
```

Expected: failure because `DeliveryRail.tsx` is absent.

- [ ] **Step 3: Build the complete static rail**

Render all six stages and two gates without JavaScript. Use a continuous SVG
path behind semantic HTML stages. Every stage must show its existing outcome,
activities, and ownership details. Optimize connects visually back to Discover
with a quiet “continued improvement” path, not an infinite animation.

- [ ] **Step 4: Add progressive enhancement**

Use CSS `:target`, `:focus-within`, and supported scroll-driven styling only as
enhancement. Do not hide inactive stages. Reduced-motion mode keeps the full
rail static.

- [ ] **Step 5: Recompose surrounding Process sections**

Let the rail own the main visual memory. Use open editorial composition for
scaling/adaptation, a structured governance artifact for accountability, and a
typographic after-deployment section. Do not add more Atlas diagrams.

- [ ] **Step 6: Verify Process**

Run:

```bash
node --test tests/company-content-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit Process elevation**

```bash
git add components/company/DeliveryRail.tsx components/company/ProcessPage.tsx components/content/companyPages.ts tests/company-content-contract.test.mjs
git commit -m "feat: visualize the Cobrykz delivery process"
```

---

### Task 6: About Accountability Composition

**Files:**
- Create: `components/company/ConnectedPartnerAtlas.tsx`
- Create: `components/company/FounderAccountability.tsx`
- Modify: `components/company/AboutPage.tsx`
- Modify: `tests/company-content-contract.test.mjs`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Consumes: approved About purpose, principles, partnership, leadership, standards, and existing founder portrait
- Produces:
  - `<ConnectedPartnerAtlas />` as the page’s only system diagram
  - `<FounderAccountability />` as a photography-led editorial composition

- [ ] **Step 1: Add failing composition tests**

Require:

- Exactly one `<SystemAtlas>` use on About.
- Named layers for business strategy, experience design, engineering, AI,
  automation, integration, deployment, and improvement.
- Cobrykz as the integrating frame.
- Founder photography uses the existing sharp portrait with accurate alt text.
- Founder section does not use an Atlas figure.
- No repeated numbered-row composition for both principles and standards.

- [ ] **Step 2: Verify the About test fails**

Run:

```bash
node --test tests/company-content-contract.test.mjs tests/presentation-quality.test.mjs
```

Expected: failure on missing components and repeated composition.

- [ ] **Step 3: Implement One Connected Partner**

Build one layered accountability model:

- Outer frame: Cobrykz accountability
- Business layer: strategy and desired outcome
- Experience layer: users and service
- Delivery layer: engineering, AI, automation, and integration as relevant
- Operational layer: deployment, adoption, ownership, improvement
- Founder node: accountability anchor

Do not depict the founder as the owner of every technical node.

- [ ] **Step 4: Recompose the founder section**

Use the portrait as a large editorial crop with leadership copy, a narrow
accountability annotation, and purposeful white space. Preserve all approved
copy. No floating badges or agency-style performance cards.

- [ ] **Step 5: Vary principles and standards**

Present principles as an asymmetric editorial sequence. Present standards as a
compact inspection framework. Keep both complete and in approved order.

- [ ] **Step 6: Verify About**

Run:

```bash
node --test tests/company-content-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit About elevation**

```bash
git add components/company/ConnectedPartnerAtlas.tsx components/company/FounderAccountability.tsx components/company/AboutPage.tsx tests/company-content-contract.test.mjs tests/presentation-quality.test.mjs
git commit -m "feat: compose the Cobrykz accountability story"
```

---

### Task 7: Projects Evidence and Insights Editorial Expertise

**Files:**
- Create: `components/projects/EvidenceStandard.tsx`
- Create: `components/projects/TransformationRecord.tsx`
- Modify: `components/projects/ProjectsIndex.tsx`
- Modify: `components/projects/ProjectCaseStudy.tsx`
- Create: `components/insights/EditorialMethod.tsx`
- Create: `components/insights/DecisionDiagram.tsx`
- Modify: `components/insights/InsightsIndex.tsx`
- Modify: `components/insights/InsightArticle.tsx`
- Modify: `components/content/projects.ts`
- Modify: `components/content/insights.ts`
- Modify: `tests/company-content-contract.test.mjs`

**Interfaces:**
- `EvidenceStandard` renders the approved case-study anatomy without a client or outcome claim.
- `TransformationRecord` consumes only `PublishedProjectDefinition`.
- `EditorialMethod` explains the publishing method without exposing draft titles as live content.
- `DecisionDiagram` is optional and consumes a new published-only `visual?: AtlasDefinition` field.

- [ ] **Step 1: Add failing honesty and visual-state tests**

Require:

```js
assert.match(projectsIndex, /<EvidenceStandard\s*\/>/);
assert.match(insightsIndex, /<EditorialMethod\s*\/>/);
assert.doesNotMatch(
  `${evidenceStandard}\n${editorialMethod}`,
  /client logo|verified result|testimonial|published article/i,
);
assert.match(projectCaseStudy, /<TransformationRecord/);
assert.match(insightArticle, /insight\.visual\s*\?/);
```

Retain existing assertions that `publishedProjects` and `publishedInsights` are
empty and draft slugs are unavailable.

- [ ] **Step 2: Verify focused tests fail**

Run:

```bash
node --test tests/company-content-contract.test.mjs
```

Expected: failure because the four visual components are absent.

- [ ] **Step 3: Build the honest Evidence Standard**

Show the 13 approved case-study parts as a publishing framework grouped into:

- Business condition
- Decision and designed response
- Implementation
- Verified change
- Authorized perspective
- Next stage

Label the composition “How Cobrykz documents evidence.” Do not render fake
project cards, screenshots, metrics, or results.

- [ ] **Step 4: Build the published Transformation Record**

When a real project exists, derive the transformation model only from fields
already present in `PublishedProjectDefinition`. Omit absent nodes rather than
inventing connective content.

- [ ] **Step 5: Build the honest Editorial Method**

Show the editorial sequence:

1. Define the decision
2. Examine the operating system
3. Compare practical options
4. Identify next steps

Do not show the three draft titles on the public index.

- [ ] **Step 6: Add optional article diagrams**

Extend `PublishedInsightDefinition` with:

```ts
visual?: AtlasDefinition;
```

Render `DecisionDiagram` only when a published article includes a meaningful
visual definition. Articles without one remain editorial.

- [ ] **Step 7: Verify publication integrity**

Run:

```bash
node --test tests/company-content-contract.test.mjs
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all commands exit 0; no project or insight detail path is generated
while registries contain no published entries.

- [ ] **Step 8: Commit evidence and editorial visuals**

```bash
git add components/projects components/insights components/content/projects.ts components/content/insights.ts tests/company-content-contract.test.mjs
git commit -m "feat: add visual evidence and editorial frameworks"
```

---

### Task 8: Contact Partnership Beginning

**Files:**
- Create: `components/contact/InquiryPath.tsx`
- Modify: `components/contact/ContactForm.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/content/contact.ts`
- Modify: `tests/contact-contract.test.mjs`
- Modify: `tests/presentation-quality.test.mjs`

**Interfaces:**
- Produces: `<InquiryPath />`, a static editorial process artifact
- Consumes: approved response expectation and these exact steps:
  - Business challenge received
  - Context reviewed
  - Initial fit and questions identified
  - Conversation arranged
  - Appropriate next step defined

- [ ] **Step 1: Add failing Contact visual tests**

Require:

- One H1 and unchanged approved form fields.
- No budget field.
- `InquiryPath` includes all five steps.
- Form remains one page, not a wizard.
- No SystemAtlas import in `ContactForm.tsx`.
- Existing validation, abuse protection, success, failure, and fallback tests remain.

- [ ] **Step 2: Verify focused tests fail**

Run:

```bash
node --test tests/contact-contract.test.mjs
```

Expected: failure because `InquiryPath.tsx` is absent.

- [ ] **Step 3: Build the Inquiry-to-Assessment Path**

Use an editorial rail with structural frames and one cobalt path. This is not a
full Atlas figure. It explains what happens after submission and uses the
approved two-business-day response expectation.

- [ ] **Step 4: Recompose Contact**

Desktop pairs the stable form plane with the inquiry path. Mobile places the
response path after the form introduction and before the fields. Keep the form
primary, readable, and free of visual overlap.

- [ ] **Step 5: Verify Contact**

Run:

```bash
node --test tests/contact-contract.test.mjs tests/presentation-quality.test.mjs
npx tsc --noEmit
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit Contact elevation**

```bash
git add app/contact/page.tsx components/contact components/content/contact.ts tests/contact-contract.test.mjs tests/presentation-quality.test.mjs
git commit -m "feat: visualize the beginning of a Cobrykz partnership"
```

---

### Task 9: Cross-Site Composition, Responsive, Motion, and Performance Gate

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/presentation-quality.test.mjs`
- Create: `tests/visual-direction-contract.test.mjs`
- Modify only if defects are found: files changed in Tasks 1–8

**Interfaces:**
- Consumes: all page-level visual components
- Produces: a verified System Atlas implementation ready for rendered visual review

- [ ] **Step 1: Add the cross-site visual-direction contract**

Require:

- Frozen homepage section order and navigation remain intact.
- Every Atlas definition has named layers, nodes, and connections.
- Home, Solutions, Process, and About each have no more than one primary
  `<SystemAtlas>` instance.
- Projects and Insights index empty states contain no unsupported evidence.
- Contact remains a single-page form.
- No new `canvas`, `three`, `framer-motion`, service theme, neon gradient,
  decorative particle, or pointer-parallax implementation.
- Every SVG has title/description semantics and a text equivalent.
- Every animated Atlas class has a reduced-motion override.
- No separate hidden mobile/desktop content trees.

- [ ] **Step 2: Run the contract and fix only evidenced failures**

Run:

```bash
node --test tests/visual-direction-contract.test.mjs
```

Expected: pass after fixing exact reported violations.

- [ ] **Step 3: Run the complete automated gate**

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

Expected:

- All tests pass with 0 failures.
- ESLint exits 0.
- TypeScript exits 0.
- Production build exits 0 and lists every approved route.
- `git diff --check` emits no errors.

- [ ] **Step 4: Production-smoke every public route**

Start:

```bash
npm run start
```

Verify HTTP 200 for:

```text
/
/solutions
/solutions/ai
/solutions/business-automation
/solutions/custom-software-development
/solutions/digital-business-systems
/solutions/websites-web-applications
/solutions/technology-consulting
/projects
/process
/about
/insights
/contact
/robots.txt
/sitemap.xml
/opengraph-image
```

Verify an unknown route returns 404 and draft project/insight slugs remain
unavailable.

- [ ] **Step 5: Rendered responsive and accessibility review**

Review at 320×568, 390×844, 768×1024, 1280×800, and 1440×900:

- Hero message is readable before interacting with the cutaway.
- No Atlas label becomes ornamental microtype.
- Mobile diagrams recompose rather than scale down.
- No horizontal overflow.
- Keyboard order follows the semantic reading order.
- Focus is visible on every diagram control.
- Reduced-motion mode shows resolved paths.
- Dark stages meet WCAG AA.
- Page rhythms differ without feeling like separate brands.
- Each major page has one memorable visual moment.
- Pages without a useful diagram retain confident typography, photography, or
  white space.

Use browser screenshots for the review and record defects by route, viewport,
severity, and exact visual rule.

- [ ] **Step 6: Fix review defects and rerun affected checks**

For each defect:

1. Add or update the smallest source/rendered regression check that can prevent
   recurrence.
2. Fix the exact component.
3. Re-run its focused test.
4. Recheck the affected viewport.

- [ ] **Step 7: Run the final exact-state gate**

Run again:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

Expected: all commands exit 0 after the final visual fixes.

- [ ] **Step 8: Commit the complete visual gate**

```bash
git add app components tests
git commit -m "fix: complete the Cobrykz System Atlas visual gate"
```

---

## Completion Standard

The visual elevation is complete only when:

- The approved content and architecture remain unchanged.
- System Atlas is recognizable across the site without appearing in every
  section.
- Every Atlas visual explains named operational information.
- Editorial typography, photography, artifacts, and white space remain visible
  and intentional.
- Homepage, Solutions, Process, About, Projects, Insights, and Contact have
  distinct visual memories within one coherent brand.
- Motion explains flow or change and degrades completely under reduced motion.
- All automated and rendered gates pass.
