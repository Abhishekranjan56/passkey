# Passkey Landing Page - Deployment Guide

This guide will help you deploy the passkey landing page to Render and configure it for use in medibunny.

## Step 1: Push Repository to GitHub

1. **Initialize git repository** (if not already done):
   ```bash
   cd /Users/abhishekranjan/passkey
   git init
   git add .
   git commit -m "Initial commit: Passkey landing page"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/Abhishekranjan56/passkey.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up or log in

2. **Create New Static Site**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Repository**
   - Choose "Public Git repository"
   - Enter: `https://github.com/Abhishekranjan56/passkey.git`
   - Or connect your GitHub account and select the repository

4. **Configure Settings**
   - **Name**: `passkey-landing` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty or use `.`)
   - **Build Command**: Leave empty
   - **Publish Directory**: `.` (leave empty or use `.`)

5. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Your site will be available at: `https://passkey-landing.onrender.com` (or your site name)

### Option B: Using Blueprint (render.yaml)

1. **Push render.yaml** (already in the repo)
2. **In Render Dashboard**
   - Go to "Blueprints"
   - Click "New Blueprint"
   - Connect the repository
   - Render will auto-detect `render.yaml`

## Step 3: Verify Deployment

Test that your site is accessible:

```bash
# Test main page
curl https://passkey-landing.onrender.com

# Test assetlinks.json (critical for Android passkeys)
curl https://passkey-landing.onrender.com/.well-known/assetlinks.json
```

You should see the JSON content with your Android app configuration.

## Step 4: Update Medibunny Configuration

Once deployed, update medibunny to use the new Render URL. Replace `passkey-landing.onrender.com` with your actual Render URL.

### 4.1 Update RP ID in doctorStartup.ts

**File**: `apps/medibunny/src/startup/doctorStartup.ts`

```typescript
setEncryptionConfig({
  rpId: 'passkey-landing.onrender.com', // Replace with your Render URL
  rpName: 'Medibunny'
});
```

### 4.2 Update iOS Associated Domains in app.config.ts

**File**: `apps/medibunny/app.config.ts`

Find the `associatedDomains` array and update:

```typescript
associatedDomains: ["webcredentials:passkey-landing.onrender.com"],
```

### 4.3 Update iOS Entitlements

**File**: `apps/medibunny/ios/medibunny/medibunny.entitlements`

Find the `com.apple.developer.associated-domains` array and update:

```xml
<string>webcredentials:passkey-landing.onrender.com</string>
```

## Step 5: Custom Domain (Optional)

If you want to use a custom domain:

1. **In Render Dashboard**
   - Go to your static site settings
   - Click "Custom Domains"
   - Add your domain (e.g., `passkey.medibunny.com`)
   - Follow DNS configuration instructions

2. **Update medibunny configuration** with your custom domain instead of the Render URL

## Important Notes

- ⚠️ **Domain must match exactly**: The `rpId` in your app must match the domain where the landing page is hosted
- 🔒 **HTTPS required**: Render provides SSL automatically
- 🔄 **Auto-deploy**: Render will redeploy on every push to the main branch
- 📱 **Android**: The `assetlinks.json` file must be accessible for Android passkeys to work
- 🍎 **iOS**: The `associatedDomains` must match the domain for iOS passkeys

## Troubleshooting

### assetlinks.json not accessible
- Check that the `.well-known/assetlinks.json` file exists in your repo
- Verify the file is in the root directory (not in a subdirectory)
- Check Render logs for any deployment errors

### Passkey not working after deployment
- Verify the domain in `rpId` matches your Render URL exactly (no `https://`, no trailing slash)
- Check that `assetlinks.json` is accessible via curl
- For iOS, verify `associatedDomains` matches the domain
- Rebuild your app after configuration changes

