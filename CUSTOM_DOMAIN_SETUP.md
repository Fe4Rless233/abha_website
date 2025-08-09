# GitHub Pages Custom Domain Setup - www.abhaweb.org

## ✅ Changes Made

### 1. Updated Configuration Files
- **package.json**: Changed homepage from GitHub Pages URL to `https://www.abhaweb.org`
- **vite.config.ts**: Set base URL to `/` for custom domain (removed `/abha_website/` path)
- **index.html**: Updated schema.org metadata URLs to use custom domain
- **README.md**: Updated deployment URL reference

### 2. Created Domain Configuration
- **public/CNAME**: Created file with `www.abhaweb.org` for GitHub Pages custom domain
- **.github/workflows/deploy.yml**: Added `cname: www.abhaweb.org` to deployment action

### 3. Updated Documentation
- **DEPLOY.md**: Updated all references to use the new custom domain

## 🔧 Required Manual Steps

### Step 1: DNS Configuration
You need to configure your domain's DNS settings with your domain registrar:

**Add the following DNS records:**
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153

Type: A  
Name: @ (or leave blank)
Value: 185.199.109.153

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153

Type: CNAME
Name: www
Value: fe4rless233.github.io
```

### Step 2: GitHub Repository Settings
1. Go to your repository settings: `https://github.com/Fe4Rless233/abha_website/settings/pages`
2. **IMPORTANT**: Set "Source" to "GitHub Actions" (not "Deploy from a branch")
3. Under "Custom domain", enter: `www.abhaweb.org`
4. Check "Enforce HTTPS" (after DNS propagation)

### Step 3: Verify Workflow Permissions
The updated GitHub Actions workflow now includes proper permissions:
- `contents: read` - to read repository contents
- `pages: write` - to deploy to GitHub Pages  
- `id-token: write` - for authentication

### Step 4: Deploy
Push your changes to trigger the deployment:
```bash
git add .
git commit -m "Configure custom domain www.abhaweb.org"
git push origin main
```

## 🕐 Timeline
- **DNS Propagation**: 24-48 hours for full global propagation
- **SSL Certificate**: GitHub will automatically provision SSL after DNS is verified
- **Site Availability**: Should be accessible at https://www.abhaweb.org within 24-48 hours

## 🔍 Verification Steps
1. Check DNS propagation: `nslookup www.abhaweb.org`
2. Verify GitHub Pages settings show the custom domain
3. Confirm site loads at https://www.abhaweb.org
4. Test SSL certificate is active (should show secure lock icon)

## 📞 Support
If you encounter issues:
1. Check GitHub Pages settings in repository
2. Verify DNS records with your domain registrar
3. Check GitHub Actions deployment logs for errors
4. Allow 24-48 hours for DNS propagation before troubleshooting
