# Sprint Plan: LionsMax Restart

## Sprint 1: Foundation & Content (Weeks 1-2)
**Goal**: Establish a solid technical foundation, ensure SEO readiness, and automate high-quality content generation.

### Issues / Tasks

#### 1. [Critical] Scaffold Frontend Application
**Description**: The current repository is missing the core React source files. We need to initialize the Vite + React + TypeScript project structure.
**Acceptance Criteria**:
-   `package.json` with dependencies (React, Vite, TypeScript, TailwindCSS).
-   `vite.config.ts` configured.
-   `src/` directory with `App.tsx`, `main.tsx`, `index.css`.
-   Basic routing setup (`react-router-dom`).

#### 2. Implement SEO Infrastructure (ADR 001)
**Description**: Set up the SEO meta tag management system.
**Acceptance Criteria**:
-   Install `react-helmet-async`.
-   Create `SEO` component accepting `title`, `description`, `type`.
-   Implement `sitemap.xml` generation script.
-   Add `robots.txt`.

#### 3. Enhance AI Content Workflow (ADR 005)
**Description**: Improve the GitHub Action to generate valid, frontmatter-rich Markdown and use PRs.
**Acceptance Criteria**:
-   Update `.github/workflows/ai-content-generator.yml`.
-   Add validation script `scripts/validate-content.js`.
-   Configure PR creation instead of direct push.

#### 4. Setup Analytics (ADR 003)
**Description**: Integrate GA4 and custom event tracking.
**Acceptance Criteria**:
-   Install `react-ga4`.
-   Initialize GA4 in `App.tsx`.
-   Create `useTrackEvent` hook.

---

## Sprint 2: Product Engine & Optimization (Weeks 3-4)
**Goal**: Launch the product recommendation engine and optimize for mobile performance.

### Issues / Tasks

#### 5. Build Product Recommendation Engine (ADR 002)
**Description**: Implement the logic to filter products by age and health concern.
**Acceptance Criteria**:
-   Create `src/data/products.ts` with initial 20 products.
-   Create `ProductFilter` component (UI for Age/Concern selection).
-   Create `ProductList` component to display results.

#### 6. Performance Optimization (ADR 004)
**Description**: Ensure the site loads in <3s on mobile.
**Acceptance Criteria**:
-   Implement code splitting for routes.
-   Optimize images (WebP).
-   Run Lighthouse audit and achieve >90 score.

#### 7. Affiliate Integration
**Description**: Ensure all "Buy" buttons are properly tracked and link to Amazon.
**Acceptance Criteria**:
-   Add `tag=lionsmax-20` to all Amazon URLs.
-   Add FTC disclosure footer.
