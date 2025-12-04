# Changelog

All notable changes to LionsMax will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Repository cleanup and optimization
- Comprehensive documentation structure
- Enhanced security with improved .gitignore
- Database folder with organized SQL schemas
- Contributing guidelines
- Code of Conduct
- This CHANGELOG file

### Changed
- Reorganized documentation into `/docs` structure
- Moved database files to `/database` folder
- Enhanced README with complete setup instructions

## [0.1.0] - 2025-12-04

### Added
- Complete affiliate tracking system with Supabase
  - `affiliate_clicks` table for click tracking
  - `affiliate_conversions` table for conversion tracking
  - `affiliate_stats` view for analytics
- Row Level Security (RLS) policies for data protection
- `AffiliateButton` component with multi-platform support
- `useAffiliate` hook for tracking and link generation
- Automatic platform detection (iHerb, Amazon, custom)
- UTM parameter support for campaign tracking
- Integration with ProductCard component
- Comprehensive testing guide
- RLS setup guide
- Deployment automation via GitHub Actions

### Features
- AI-powered wellness assistant using Google Gemini
- Curated product catalog for 40+ demographic
- Product recommendations with ratings and reviews
- Responsive design optimized for all devices
- SEO optimization with React Helmet
- Google Analytics 4 integration
- Automated FTP deployment to Hostinger

### Documentation
- Installation and setup guides
- Affiliate system documentation
- Testing procedures
- Deployment workflows
- N8N automation setup guide

### Infrastructure
- Vite build system for fast development
- TypeScript for type safety
- Tailwind CSS for styling
- Supabase for database and authentication
- GitHub Actions for CI/CD

## [0.0.1] - Initial Development

### Added
- Initial project setup
- Basic React application structure
- Component architecture
- Homepage layout
- Product catalog structure

---

## Legend

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for removed features
- `Fixed` for bug fixes
- `Security` for vulnerability fixes

---

For more details on any release, see the [GitHub Releases](https://github.com/iladimm/lionsmax-restart/releases) page.
