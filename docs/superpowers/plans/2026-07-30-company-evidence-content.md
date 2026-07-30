# Cobrykz Company, Evidence, and Insights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Projects, Process, About, and Insights as cohesive company pages with honest publication states and scalable typed content.

**Architecture:** Use typed local content registries for projects and insights with explicit draft/published status, reusable editorial page components, and static App Router routes. Keep unpublished detail pages out of route generation and preserve the approved honest empty states until real work and articles exist.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TypeScript 5, Tailwind CSS 4, Node test runner

## Global Constraints

- Every page reinforces Cobrykz as a long-term technology partner.
- Projects are business case studies, never a screenshot gallery.
- No fabricated clients, outcomes, testimonials, metrics, or project cards.
- Projects index is `noindex` until a substantial published case study exists.
- Insights index is not linked or indexed as live editorial inventory until at least three substantial published articles exist.
- Process uses Discover, Assess, Design, Build, Deploy, Optimize with decision gates.
- About presents Mandela as accountability anchor while Cobrykz remains the primary brand.
- Shared visual system, one responsive content tree, semantic headings, 44px controls, approved palette/motion/icons.
- Primary CTA remains **Discuss a business challenge**.
- Do not modify `0721.mp4` or reopen strategy.

---

### Task 1: Typed Publication Models

**Files:**
- Create: `components/content/projects.ts`
- Create: `components/content/insights.ts`
- Create: `components/content/companyPages.ts`
- Create: `tests/company-content-contract.test.mjs`

- [ ] Add failing tests for typed `draft | published` status, zero fabricated published projects, exactly three approved draft insight topics, publication-filter helpers, complete six-stage process, About principles, and unique metadata.
- [ ] Implement `ProjectDefinition`, `InsightDefinition`, `publishedProjects`, `publishedInsights`, `processPage`, and `aboutPage`.
- [ ] Project fields support context, challenge, strategy, solution, capabilities, implementation, verified outcomes, authorized quote, and next stage without requiring invented values.
- [ ] Insight fields support title, summary, topic, author, published/updated dates, reading time, sections, next steps, related solution, and status.
- [ ] Run focused/full tests and typecheck; commit `feat: add company publication content models`.

### Task 2: Process and About Pages

**Files:**
- Create: `app/process/page.tsx`
- Create: `app/about/page.tsx`
- Create: `components/company/ProcessPage.tsx`
- Create: `components/company/AboutPage.tsx`
- Modify: `tests/company-content-contract.test.mjs`

- [ ] Add failing tests for unique metadata, one H1 per page, exact process sequence, two explicit decision gates, scale/adaptation, governance, after-deployment partnership, founding tension, founder leadership, company standards, and shared CTA.
- [ ] Implement server-rendered pages from `companyPages.ts`; no route-local copy.
- [ ] Keep visual variety through editorial rows, progressive process line, leadership portrait, and standards list without separate themes.
- [ ] Run focused/full tests, lint, typecheck, build; commit `feat: add Cobrykz process and about pages`.

### Task 3: Projects Index and Detail Architecture

**Files:**
- Create: `app/projects/page.tsx`
- Create: `app/projects/[slug]/page.tsx`
- Create: `components/projects/ProjectsIndex.tsx`
- Create: `components/projects/ProjectCaseStudy.tsx`
- Modify: `tests/company-content-contract.test.mjs`

- [ ] Add failing tests for honest empty state, index `robots: { index: false, follow: true }` while no published projects exist, no empty cards/filters, `generateStaticParams` from published projects only, `notFound()` for unavailable slugs, and the approved 13-part case-study structure.
- [ ] Implement the index with intentional empty-state actions to Solutions and Contact.
- [ ] Implement scalable detail architecture without adding a published project.
- [ ] Run focused/full tests, lint, typecheck, build; verify `/projects` 200 and no detail routes generated; commit `feat: add honest Cobrykz projects architecture`.

### Task 4: Insights Index and Article Architecture

**Files:**
- Create: `app/insights/page.tsx`
- Create: `app/insights/[slug]/page.tsx`
- Create: `components/insights/InsightsIndex.tsx`
- Create: `components/insights/InsightArticle.tsx`
- Modify: `tests/company-content-contract.test.mjs`

- [ ] Add failing tests for three approved drafts, honest not-yet-live state, index `noindex` until three published articles, no fake cards, published-only static params, unavailable slug `notFound()`, and article structure with executive answer, sections, next steps, related solution, author context, and CTA.
- [ ] Implement index and detail architecture without publishing placeholder articles.
- [ ] Ensure header/footer do not imply live articles; navigation may reach the transparent index.
- [ ] Run focused/full tests, lint, typecheck, build; verify `/insights` 200 and no article routes generated; commit `feat: add Cobrykz insights architecture`.

### Task 5: Company Pages Gate

- [ ] Run `npm test`, lint, typecheck, build.
- [ ] Production-smoke `/process`, `/about`, `/projects`, `/insights`.
- [ ] Confirm each has one H1, unique metadata, shared CTA, no legacy positioning, and no published proof/content claims.
- [ ] Verify generated routes exclude project/article details while registries contain no published entries.
- [ ] Defer browser visual review to whole-site review if unavailable.
- [ ] Commit only gate fixes: `fix: complete company pages gate`.
