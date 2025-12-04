# Hostinger Deployment Issue - Action Required

## Problem
The site at https://lionsmax.com is serving the **source** `index.html` instead of the **built** version from `dist/`.

**Evidence:**
- Live site shows: `<script type="module" src="/src/main.tsx"></script>`
- Should show: `<script type="module" crossorigin src="/assets/index-XXXXX.js"></script>`

## Root Cause
The FTP deployment is uploading to `./public_html/` but either:
1. Old files exist in that directory from a previous deployment method
2. The domain is configured to serve from a different directory

## Solution Options

### Option 1: Clear Hostinger Files (Recommended)
1. Log into Hostinger File Manager
2. Navigate to `public_html/` (or your domain's document root)
3. **Delete ALL files** in that directory
4. Wait for the next GitHub Actions deployment to complete
5. The site should work correctly

### Option 2: Verify Deployment Directory
1. Check Hostinger control panel for `lionsmax.com` domain settings
2. Find the "Document Root" or "Public Folder" setting
3. If it's NOT `public_html/`, update `.github/workflows/deploy.yml`:
   - Change `server-dir: ./public_html/` to match your actual path
   - Common alternatives:
     - `./domains/lionsmax.com/public_html/`
     - `./lionsmax.com/public_html/`
     - `./htdocs/`

### Option 3: Manual FTP Upload (Temporary)
1. Build locally: `npm run build`
2. Use an FTP client (FileZilla) to connect to Hostinger
3. Upload ONLY the contents of the `dist/` folder to your document root
4. Delete any old `index.html` or `src/` folder on the server

## Verification
After deploying, check:
- https://lionsmax.com should load the React app
- View source should show `<script type="module" crossorigin src="/assets/index-XXXXX.js">`
- No MIME type errors in the console

## Current Workflow Status
✅ Build: Working correctly
✅ FTP Upload: Succeeding
❌ File Serving: Wrong files being served

The GitHub Actions workflow is functioning correctly. The issue is purely on the Hostinger side.
