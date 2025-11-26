# ADR 004: Performance Optimization Strategy

## Status
Accepted

## Context
Target audience (40-70+) may use older devices or have slower connections. Mobile performance is critical for retention and SEO. Goal: <3s load time on mobile.

## Decision
We will adopt a **Mobile-First Performance Budget** and specific optimization techniques.

1.  **Bundle Size Budget**: Initial JS bundle < 150KB (gzipped). Total page weight < 1MB.
2.  **Image Optimization**:
    -   Format: WebP (with PNG/JPG fallback).
    -   Loading: Native `loading="lazy"` for below-fold images.
    -   Sizing: `srcset` to serve appropriate sizes for mobile/desktop.
3.  **Code Splitting**:
    -   Route-based splitting using `React.lazy` and `Suspense`.
    -   Vendor chunk splitting in Vite config.
4.  **Font Optimization**:
    -   Use `font-display: swap`.
    -   Self-host fonts or use Google Fonts with preconnect.

## Detailed Implementation

### Vite Config
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        analytics: ['react-ga4']
      }
    }
  }
}
```

### Image Component
Create a reusable `<OptimizedImage />` component that handles `srcset` and `type="image/webp"` automatically.

## Consequences
-   **Positive**: Faster load times, better SEO, higher conversion.
-   **Negative**: Development overhead to maintain optimized assets and monitor bundle size.
