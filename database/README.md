# LionsMax Database

This directory contains all database schemas, migrations, and related SQL files for the LionsMax project.

## Files

### `schema.sql`
Main database schema including:
- `users` - User accounts and profiles
- `affiliate_clicks` - Affiliate click tracking
- `affiliate_conversions` - Conversion and commission tracking
- Indexes for performance optimization
- `affiliate_stats` view for analytics

### `rls-policies.sql`
Row Level Security (RLS) policies for Supabase:
- Public insert permissions for click tracking
- Authenticated read permissions for analytics
- Secure access control for conversions

### `schema-backup.sql`
Backup of previous schema version (for reference)

## Setup Instructions

### 1. Initial Setup

Execute the main schema file in your Supabase SQL Editor:

```bash
# Copy the contents of schema.sql
# Paste into Supabase SQL Editor
# Click "Run"
```

### 2. Apply RLS Policies

After creating tables, apply security policies:

```bash
# Copy the contents of rls-policies.sql
# Paste into Supabase SQL Editor
# Click "Run"
```

### 3. Verify Installation

Check that tables are created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Expected tables:
- `users`
- `affiliate_clicks`
- `affiliate_conversions`

### 4. Test Permissions

```sql
-- This should work (public insert)
INSERT INTO affiliate_clicks (product_name, external_link)
VALUES ('Test Product', 'https://example.com');

-- This requires authentication (authenticated select)
SELECT * FROM affiliate_clicks LIMIT 1;
```

## Migrations

Future schema changes should be added to a `migrations/` subdirectory with versioned filenames:

```
migrations/
├── 001_initial_schema.sql
├── 002_add_user_preferences.sql
└── 003_add_commission_tracking.sql
```

## Maintenance

### Backup Current Schema

```sql
-- Generate schema backup
pg_dump -s database_name > schema-backup-YYYY-MM-DD.sql
```

### View Active Policies

```sql
SELECT tablename, policyname, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public';
```

## Documentation

For detailed setup instructions, see:
- [RLS Setup Guide](../docs/guides/rls-setup.md)
- [Testing Guide](../docs/guides/testing.md)
