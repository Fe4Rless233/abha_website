# ABHA Website - GitHub Pages Deployment

## 🚀 Deploy to GitHub Pages

### Step 1: Repository Setup

✅ **Repository:** https://github.com/Fe4Rless233/abha_website.git

**Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Fe4Rless233/abha_website.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. **Go to your repository settings:** https://github.com/Fe4Rless233/abha_website/settings/pages
2. **Set source to "GitHub Actions"**

### Step 3: Deploy

**Option A: Automatic Deployment (Recommended)**
```bash
# Just push to main branch
git push origin main
```
The GitHub Action will automatically deploy your site.

**Option B: Manual Deployment**
```bash
npm run deploy
```

### Step 4: Access Your Site

Your website will be available at: **https://fe4rless233.github.io/abha_website**

## 📋 Deployment Checklist

- [x] Repository created at https://github.com/Fe4Rless233/abha_website
- [x] Code pushed to GitHub
- [x] GitHub Pages enabled
- [x] Site deployed and accessible at https://fe4rless233.github.io/abha_website

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚨 Troubleshooting

**Site not working?**
- Check that your repository is public
- Verify GitHub Pages is enabled in repository settings
- Check the Actions tab for deployment errors: https://github.com/Fe4Rless233/abha_website/actions

**Build failing?**
- Check the Actions tab for error details: https://github.com/Fe4Rless233/abha_website/actions
- Ensure all dependencies are properly installed
- Verify TypeScript compilation passes locally

**404 Error?**
- Make sure the base URL in vite.config.ts matches your repository name
- Check that the homepage field in package.json is correct

## 🌟 Benefits of GitHub Pages

- **Free hosting** - No cost for public repositories
- **Easy deployment** - Automatic builds and deployments
- **SSL/HTTPS** - Automatic SSL certificate
- **Custom domain support** - Add your own domain later if needed
- **Version control** - All changes tracked in git
