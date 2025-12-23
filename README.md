# Passkey Landing Page

This repository contains the landing page for passkey authentication, copied from the medibunny project.

## Structure

- `index.html` - Main landing page
- `styles.css` - Styling for the landing page
- `img/` - Image assets
- `.well-known/assetlinks.json` - Android App Links configuration for passkey authentication

## Deployment to Render.com

### Option 1: Using Render Dashboard

1. **Sign up/Login to Render**
   - Go to https://render.com
   - Sign up or log in to your account

2. **Create New Static Site**
   - Click "New +" button in the dashboard
   - Select "Static Site"

3. **Connect Repository**
   - Connect this GitHub repository: `https://github.com/Abhishekranjan56/passkey.git`

4. **Configure the Static Site**
   - **Name**: `passkey-landing` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: `.` (root of the repository)
   - **Build Command**: Leave empty (no build needed)
   - **Publish Directory**: `.` (current directory)

5. **Deploy**
   - Click "Create Static Site"
   - Render will automatically deploy your site
   - Your site will be available at: `https://passkey-landing.onrender.com` (or your custom domain)

### Option 2: Using render.yaml (Infrastructure as Code)

1. **Push render.yaml to your repository** (already included)
2. **In Render Dashboard**
   - Go to "Blueprints"
   - Click "New Blueprint"
   - Connect this repository
   - Render will detect the `render.yaml` file automatically

## Verify Deployment

After deployment, verify that the assetlinks.json file is accessible:

```bash
curl https://passkey-landing.onrender.com/.well-known/assetlinks.json
```

You should see the JSON content with your Android app configuration.

## Usage in Medibunny

Once deployed, you can use the Render URL in your medibunny app:

1. **Update `apps/medibunny/src/startup/doctorStartup.ts`**:
   ```typescript
   setEncryptionConfig({
     rpId: 'passkey-landing.onrender.com', // or your custom domain
     rpName: 'Medibunny'
   });
   ```

2. **Update `apps/medibunny/app.config.ts`** (if using iOS):
   ```typescript
   associatedDomains: ["webcredentials:passkey-landing.onrender.com"],
   ```

3. **Update `apps/medibunny/ios/medibunny/medibunny.entitlements`** (if using iOS):
   ```xml
   <string>webcredentials:passkey-landing.onrender.com</string>
   ```

## Custom Domain

You can add a custom domain in the Render dashboard:
- Go to your static site settings
- Add your custom domain (e.g., `passkey.medibunny.com`)
- Update the RP ID in your app to match this domain

## Important Notes

- Render provides a free tier with automatic SSL certificates
- The default URL will be: `passkey-landing.onrender.com` (or your site name)
- The site will automatically redeploy on every push to your repository
- Make sure the domain matches your RP ID configuration in the medibunny app

