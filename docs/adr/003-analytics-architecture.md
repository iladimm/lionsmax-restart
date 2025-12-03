# ADR 003: Analytics & Tracking Architecture

## Status
Accepted

## Context
To optimize revenue ($3,000/mo goal), we need granular tracking of user behavior, specifically affiliate link clicks and content engagement. We need to know which blog posts drive the most sales.

## Decision
We will use **Google Analytics 4 (GA4)** as the primary analytics platform, augmented with custom event tracking for affiliate interactions.

1.  **Platform**: Google Analytics 4 (via `react-ga4`).
2.  **Event Taxonomy**:
    -   `page_view`: Standard.
    -   `affiliate_click`: Triggered when user clicks "Buy on Amazon".
        -   Params: `product_id`, `product_name`, `category`, `position` (e.g., "hero", "list", "blog_sidebar").
    -   `view_item`: When user views a product detail.
    -   `select_content`: When user filters by age/concern.
3.  **User Properties**:
    -   `age_group_selected`: Track which age groups are most active.
    -   `health_concern_selected`: Track top health concerns.

## Detailed Implementation

### Tracking Hook
```typescript
export const useTrackEvent = () => {
  const trackAffiliateClick = (product: Product, source: string) => {
    ReactGA.event({
      category: 'Affiliate',
      action: 'Click',
      label: product.name,
      value: product.price, // approximate
      nonInteraction: false
    });
  };
  return { trackAffiliateClick };
};
```

### Dashboard
We will create a Looker Studio dashboard connected to GA4 to visualize:
-   Top performing products (by clicks).
-   Top performing blog posts.
-   Conversion rate (Clicks / Page Views).

## Consequences
-   **Positive**: Free, industry standard, easy integration.
-   **Negative**: Ad blockers may block GA4. We accept this limitation for the MVP.
