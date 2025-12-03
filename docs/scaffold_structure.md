# Frontend Scaffold Structure

The following directory structure is required for the React application:

```
lionsmax-restart/
├── index.html              # Entry point
├── package.json            # Dependencies
├── vite.config.ts          # Build config
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── src/
│   ├── main.tsx            # App entry
│   ├── App.tsx             # Root component
│   ├── index.css           # Global styles (Tailwind directives)
│   ├── components/
│   │   ├── common/         # Button, Card, etc.
│   │   ├── layout/         # Header, Footer
│   │   ├── seo/            # SEO, MetaTags
│   │   └── product/        # ProductCard, ProductFilter
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   └── ProductFinder.tsx
│   ├── hooks/
│   │   ├── useTrackEvent.ts
│   │   └── useProducts.ts
│   ├── data/
│   │   └── products.ts     # Static product database
│   ├── types/
│   │   └── index.ts        # Shared types
│   └── utils/
│       └── analytics.ts
└── content/                # Markdown blog posts
```
