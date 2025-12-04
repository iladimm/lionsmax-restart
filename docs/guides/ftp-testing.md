# FileZilla FTP Testing Guide

## Objective
Manually test the FTP connection to verify credentials and identify the correct deployment path for lionsmax.com.

## Step 1: Download FileZilla (if not installed)
- Download from: https://filezilla-project.org/download.php?type=client
- Install the FileZilla Client (not Server)

## Step 2: Get FTP Credentials from GitHub Secrets
You'll need the values you set in GitHub Secrets:
- **Server**: `FTP_SERVER` (e.g., `72.60.93.185` or `ftp.lionsmax.com`)
- **Username**: `FTP_USERNAME` (e.g., `u110153561`)
- **Password**: `FTP_PASSWORD`
- **Protocol**: FTPS (FTP over TLS)

## Step 3: Connect with FileZilla

1. **Open FileZilla**

2. **Enter Connection Details** (at the top):
   - **Host**: `ftps://[YOUR_FTP_SERVER]` (e.g., `ftps://72.60.93.185`)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21` (default FTP port)

3. **Click "Quickconnect"**

4. **Certificate Warning** (if prompted):
   - You may see a certificate warning for FTPS
   - Check "Always trust this certificate" and click OK

## Step 4: Explore the Directory Structure

Once connected, you'll see:
- **Left panel**: Your local computer
- **Right panel**: The remote server (Hostinger)

**Look for these common paths on the remote server:**
- `public_html/` - Most common web root
- `domains/lionsmax.com/public_html/` - Domain-specific root
- `htdocs/` - Alternative web root
- `www/` - Another alternative

**What to check:**
1. Navigate through the directories
2. Look for where `lionsmax.com` files should go
3. Note the **exact path** from the root

## Step 5: Test File Upload

1. **Build the project locally** (if not already done):
   ```bash
   cd C:\Users\FIKRI\lionsmax-restart\lionsmax-restart
   npm run build
   ```

2. **In FileZilla**:
   - Navigate to the correct directory on the remote server (right panel)
   - Navigate to `C:\Users\FIKRI\lionsmax-restart\lionsmax-restart\dist\` on your local computer (left panel)
   - **Drag and drop** the `index.html` file from left to right to upload it

3. **Verify the upload**:
   - Check that `index.html` appears in the remote directory
   - Note the **full path** where you uploaded it

## Step 6: Test in Browser

1. Visit `https://lionsmax.com` in your browser
2. **If it works**: Great! Note the path you uploaded to
3. **If it doesn't work**: Try uploading to a different directory

## Step 7: Document the Correct Path

Once you find the path that works, write it down in this format:

**Correct deployment path**: `./[YOUR_PATH_HERE]/`

Examples:
- `./public_html/`
- `./domains/lionsmax.com/public_html/`
- `./htdocs/`

## Step 8: Update the Workflow

Once you know the correct path, I'll update `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to Hostinger via FTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.5
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./dist/
    server-dir: ./[CORRECT_PATH_HERE]/  # <-- Update this
    protocol: ftps
    dangerous-clean-slate: true
```

## Common Issues & Solutions

### Issue: Connection Refused
**Solution**: 
- Verify the FTP server address
- Try without `ftps://` prefix (FileZilla auto-detects)
- Check if port 21 is correct (some hosts use 22 for SFTP)

### Issue: Authentication Failed
**Solution**:
- Double-check username and password
- Ensure you're using the FTP credentials, not cPanel/Hostinger panel credentials

### Issue: Can't Find the Right Directory
**Solution**:
- Look for a directory with your domain name
- Check inside `public_html/` for subdirectories
- Ask Hostinger support for the document root path

### Issue: Files Upload but Site Still Shows 403/404
**Solution**:
- You're uploading to the wrong directory
- Try uploading to parent or child directories
- Check Hostinger domain settings for document root

## Next Steps

After testing, report back with:
1. ✅ Connection successful? (Yes/No)
2. 📁 What directories do you see in the root?
3. 🎯 Which path made the site work?
4. 🔧 Any errors encountered?

Then I'll update the deployment workflow with the correct path!
