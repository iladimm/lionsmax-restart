# N8N Automation Setup - LionsMax Git Push Automation

## Overview
Fully automate Git commits and pushes from any trigger (webhook, schedule, form submission, etc.)

---

## STEP 1: Generate GitHub Personal Access Token

### 1.1 Create PAT (Personal Access Token)
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token"
3. Select scope: **repo** (full control of private repositories)
4. Expiration: 90 days or Lifetime
5. Copy the token (save it safely!)

**Token Format**: `ghp_xxxxxxxxxxxxxxxxxxxx...`

---

## STEP 2: Create GitHub API Credentials in N8N

### 2.1 Add GitHub Credentials in N8N
1. Log in to https://n8n.io (Cloud or Self-hosted)
2. Go to **Credentials** (left sidebar)
3. Click **+ New Credential**
4. Select **GitHub**
5. Fill in:
   - **Credential Name**: `GitHub-LionsMax`
   - **Authentication**: Personal Access Token
   - **Access Token**: Paste your PAT from Step 1.5
6. Click **Create**

---

## STEP 3: Create N8N Workflow for Auto-Push

### 3.1 Workflow Structure
```
Trigger (Webhook/Schedule) 
  ↓
Commit Changes (GitHub API)
  ↓
Push to Main (GitHub API)
  ↓
Notify (Optional - Email/Slack)
```

### 3.2 Step-by-Step Setup

#### A. Create Webhook Trigger
1. In N8N, click **+ Node**
2. Select **Webhook**
3. Set Method: **POST**
4. URL will be auto-generated
5. Save this URL (you'll need it)

#### B. Add GitHub Commit Node
1. Click **+ Node**
2. Search for **GitHub**
3. Select **GitHub > Create Commit**
4. Authentication: Select `GitHub-LionsMax`
5. Configure:
   - **Repository**: iladimm/lionsmax-restart
   - **Branch**: main
   - **Commit Message**: {{ $node.Webhook.json.message }} (uses webhook data)
   - **Files**: 
     ```json
     [
       {
         "file": "src/App.tsx",
         "content": "{{ $node.Webhook.json.appTsxContent }}"
       }
     ]
     ```
6. Connect Webhook → Create Commit

#### C. Add GitHub Push Node
1. Click **+ Node**
2. Select **GitHub > Push**
3. Authentication: Select `GitHub-LionsMax`
4. Configure:
   - **Repository**: iladimm/lionsmax-restart
   - **Branch**: main
5. Connect Create Commit → Push

#### D. (Optional) Add Notification
1. Click **+ Node**
2. Select **Gmail** or **Slack**
3. Configure to notify when push completes
4. Connect Push → Notification

---

## STEP 4: Webhook Configuration

### 4.1 Webhook URL Format
Your N8N webhook URL looks like:
```
https://n8n.yourinstance.com/webhook/abc123def456...
```

### 4.2 Webhook Payload Format
Send a POST request with JSON:
```json
{
  "message": "feat: Add new feature via n8n automation",
  "appTsxContent": "import UnderConstruction from './pages/UnderConstruction';\n\nfunction App() {\n  return <UnderConstruction />;\n}\n\nexport default App;"
}
```

### 4.3 Trigger Webhook from External Source

#### Using cURL
```bash
curl -X POST https://n8n.yourinstance.com/webhook/your-webhook-id \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Update from external trigger",
    "appTsxContent": "...file content..."
  }'
```

#### Using Google Forms → N8N
1. Create Google Form with fields:
   - Commit message
   - File content to update
2. Connect to Zapier/Make
3. Send to N8N webhook

#### Using GitHub Issues → N8N
1. Set up GitHub webhook
2. Trigger N8N when issue created
3. Auto-commit and push changes

---

## STEP 5: Schedule-Based Automation

### 5.1 Daily Auto-Commit
1. In N8N, instead of Webhook, use **Cron** trigger
2. Set schedule: Daily at 9 AM
3. Automatically commits and pushes daily

### 5.2 Cron Configuration
```
Every day: 0 9 * * *
Every Monday: 0 9 * * 1
Every hour: 0 * * * *
```

---

## STEP 6: Advanced - Auto-Commit from Google AI Studio

### 6.1 Setup GitHub Actions to Trigger N8N
1. In `.github/workflows/n8n-trigger.yml`:
```yaml
name: Trigger N8N on Commit
on:
  workflow_run:
    workflows: ["Build and Deploy"]
    types: [completed]
jobs:
  trigger-n8n:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger N8N Webhook
        run: |
          curl -X POST ${{ secrets.N8N_WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{
              "message": "Auto-triggered from GitHub Actions",
              "status": "${{ job.status }}"
            }'
```

2. Add secret: `N8N_WEBHOOK_URL` in GitHub Settings

---

## STEP 7: Secure Your Webhooks

### 7.1 Add Authentication
1. In N8N Webhook node:
   - Set **Authentication**: Basic Auth
   - **User**: your-username
   - **Password**: your-secure-password

2. When calling webhook, add header:
```bash
-H "Authorization: Basic base64(username:password)"
```

### 7.2 Webhook Secret
1. Generate secret key
2. Store in N8N and external system
3. Validate signature on each request

---

## STEP 8: Complete N8N Workflow JSON

### Export/Import This Workflow
```json
{
  "nodes": [
    {
      "parameters": {
        "path": "lionsmax-webhook",
        "responseMode": "responseNode",
        "responseData": "allEntries",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "commit",
        "repository": "iladimm/lionsmax-restart",
        "branch": "main",
        "message": "{{ $node.Webhook.json.message || 'Auto-commit via n8n' }}",
        "files": "{{ $node.Webhook.json.files }}",
        "authentication": "oAuth2"
      },
      "name": "GitHub Create Commit",
      "type": "n8n-nodes-base.github",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "resource": "push",
        "repository": "iladimm/lionsmax-restart",
        "branch": "main",
        "authentication": "oAuth2"
      },
      "name": "GitHub Push",
      "type": "n8n-nodes-base.github",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "GitHub Create Commit", "type": "main", "index": 0}]]
    },
    "GitHub Create Commit": {
      "main": [[{"node": "GitHub Push", "type": "main", "index": 0}]]
    }
  }
}
```

---

## STEP 9: Testing

### 9.1 Test Webhook
1. Copy N8N webhook URL
2. In Codespaces terminal, run:
```bash
curl -X POST "YOUR_N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test commit from n8n",
    "files": [
      {
        "path": "test.txt",
        "content": "Test file created at $(date)"
      }
    ]
  }'
```

3. Check GitHub repository - should see new commit!

### 9.2 Monitor N8N Execution
1. Go to N8N dashboard
2. Click on workflow
3. See execution logs
4. Check for errors

---

## STEP 10: Real-World Usage Examples

### Example 1: Auto-Deploy Content Changes
```bash
curl -X POST $N8N_WEBHOOK \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Content: Update Joint Health article",
    "files": [{"path": "src/data/articles/joint-health.ts", "content": "..."}]
  }'
```

### Example 2: Schedule Daily Update
- N8N Cron: 9 AM every day
- Auto-commit with message: "Daily update - $(date)"
- Pushes automatically

### Example 3: Form Submission → Deploy
1. Google Form for blog updates
2. Form → Google Sheets
3. Google Sheets → Zapier
4. Zapier → N8N Webhook
5. N8N commits and pushes
6. GitHub Actions builds and deploys

---

## TROUBLESHOOTING

### N8N Webhook Not Triggering
- Check URL is correct
- Verify webhook is active (toggle on/off)
- Check N8N execution logs
- Ensure POST method selected

### GitHub Commit Fails
- Verify PAT token is valid
- Check repository name spelling
- Ensure token has `repo` scope
- Check branch name (usually `main` not `master`)

### Files Not Updating
- Verify file paths start with repository root
- File content must be valid (proper escaping)
- Check file encoding (UTF-8)

---

## FINAL RESULT

You now have:
✅ **Fully automated Git push** - No manual commands needed
✅ **Webhook-triggered deployments** - Push from anywhere
✅ **Schedule-based commits** - Daily auto-commits
✅ **Multiple trigger sources** - Forms, schedules, external systems
✅ **Secure authentication** - PAT tokens + optional webhok auth
✅ **Complete automation chain** - Edit → Commit → Push → Build → Deploy

---

**Next**: Set up your first n8n workflow and test with a webhook call!
