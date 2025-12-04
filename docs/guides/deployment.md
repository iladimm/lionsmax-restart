# LionsMax Automated Deployment Pipeline

## Overview
Fully automated CI/CD pipeline: **Code → Build → Deploy** in 30-60 seconds

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ GitHub Codespaces / Local Machine                           │
│ └─ User commits code: git push origin main                  │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ GitHub Repository (Main Branch)                             │
│ └─ Trigger: detect push to main                             │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ GitHub Actions Workflow (.github/workflows/deploy.yml)      │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ Job: Build and Deploy                               │    │
│ │ ├─ Step 1: Checkout code                            │    │
│ │ ├─ Step 2: Setup Node.js                            │    │
│ │ ├─ Step 3: npm install                              │    │
│ │ ├─ Step 4: npm run build (Vite)                     │    │
│ │ │  Output: dist/ (minified, optimized)              │    │
│ │ └─ Step 5: FTP Deploy to Hostinger                  │    │
│ │    Credentials: GitHub Secrets (encrypted)          │    │
│ └──────────────────────────────────────────────────────┘    │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Hostinger FTP Server                                        │
│ └─ Files deployed to: /public_html/                         │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LionsMax.com (LIVE)                                         │
│ └─ Status: Updated and accessible to users                  │
└─────────────────────────────────────────────────────────────┘
```

## Configuration Files

### GitHub Secrets (Required)
```
FTP_SERVER       = ftp.lionsmax.com
FTP_USERNAME     = [hostinger username]
FTP_PASSWORD     = [hostinger password]
VITE_GOOGLE_API_KEY = [Google AI API key]
GEMINI_API_KEY   = [Gemini API key]
```

### Workflow File: .github/workflows/deploy.yml
- **Trigger**: Push to main branch
- **Build**: `npm run build`
- **Deploy**: FTP upload to Hostinger
- **Duration**: 30-60 seconds
- **Success Rate**: 100% (when no build errors)

## How to Deploy

### Option 1: Local Machine
```bash
cd lionsmax-restart
git add .
git commit -m "Your commit message"
git push origin main
```

### Option 2: GitHub Codespaces (Recommended)
```bash
# Open GitHub Codespaces
# Make changes
# In terminal:
git add .
git commit -m "Your commit message"
git push origin main
```

### Automatic Actions After Push
1. ✅ GitHub Actions workflow triggers automatically
2. ✅ Vite builds React app (dist/ folder created)
3. ✅ FTP deployment starts (all files uploaded)
4. ✅ lionsmax.com updates (30-60 seconds)
5. ✅ Users see new version

## Monitoring Deployment

### Check Build Status
1. Go to: https://github.com/iladimm/lionsmax-restart
2. Click "Actions" tab
3. Latest workflow run shows:
   - ✅ if successful
   - ❌ if failed
   - ⏳ if in progress

### Debug Failed Deployment
1. Click on failed workflow run
2. Scroll down to see error logs
3. Common issues:
   - Build errors: Check src/ files for syntax errors
   - FTP errors: Verify FTP_SERVER, FTP_USERNAME, FTP_PASSWORD secrets
   - Timeout: Reduce file size or check Hostinger server

## Zero Manual Actions

✅ **All Manual Terminal Actions Eliminated**
- No SSH access needed
- No manual FTP uploads
- No npm commands on server
- Everything automated

**Result**: User just commits code → Website updates automatically

## Files in Pipeline

### Deployed Files
- `dist/index.html` - Main app entry point
- `dist/assets/` - React components (compiled)
- `dist/style.css` - Global styles
- Plus all other assets in dist/

### Source Files (Not deployed)
- `src/` - React source code
- `node_modules/` - Dependencies
- `.env.local` - Local environment variables

## Performance

- **Build Time**: 20-30 seconds
- **FTP Upload**: 10-30 seconds
- **Total**: 30-60 seconds
- **Cache Invalidation**: Automatic

## Troubleshooting

### Website Still Shows Old Version
- **Cause**: Browser cache or CDN cache
- **Fix**: Hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

### Workflow Failed to Run
- **Cause**: GitHub Actions might be disabled
- **Fix**: Check Settings → Actions → General → Workflow permissions

### FTP Upload Failed
- **Cause**: Credentials incorrect or FTP limits exceeded
- **Fix**: Verify secrets in GitHub Settings → Secrets and variables

## Next Steps (Optional Enhancements)

1. **n8n Webhook Integration**: Auto-trigger commits from external sources
2. **Email Notifications**: Get alerts when deployment completes
3. **Staging Environment**: Deploy to test site before production
4. **Database Backups**: Automated backups before each deployment

