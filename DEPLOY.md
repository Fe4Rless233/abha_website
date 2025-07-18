# ABHA Website - Custom Domain Deployment

## 🌐 Deploy with Custom Domain

### Step 1: Update Configuration

✅ **Already configured for abhaweb.org**
   - `package.json`: Homepage set to `https://abhaweb.org`
   - `public/CNAME`: Contains `abhaweb.org`

### Step 2: DNS Configuration

Configure your DNS provider with these records:

**For apex domain (abhaweb.org):**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain (www.abhaweb.org):**
```
Type: CNAME
Name: www
Value: fe4rless233.github.io
```

### Step 3: GitHub Repository Setup

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

### Step 4: Enable GitHub Pages

1. **Go to your repository settings:** https://github.com/Fe4Rless233/abha_website/settings/pages
2. **Set source to "GitHub Actions"**
3. **Add your custom domain:**
   - In the "Custom domain" field, enter: `abhaweb.org`
   - Check "Enforce HTTPS" once DNS propagates

### Step 5: Deploy

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

### Step 6: Verify

1. **Check DNS propagation** (may take 24-48 hours)
2. **Visit https://abhaweb.org** - it should show your ABHA website
3. **Check HTTPS** - GitHub Pages will automatically provision SSL

## 📋 Deployment Checklist

- [x] Updated `package.json` homepage field (abhaweb.org)
- [x] Updated `public/CNAME` file (abhaweb.org)
- [ ] Configured DNS records at your domain provider
- [ ] Pushed code to GitHub (https://github.com/Fe4Rless233/abha_website)
- [ ] Enabled GitHub Pages in repository settings
- [ ] Added custom domain (abhaweb.org) in GitHub settings
- [ ] Verified DNS propagation
- [ ] Tested HTTPS at https://abhaweb.org

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

**Domain not working?**
- Check DNS records are correctly configured at your domain provider
- Wait for DNS propagation (24-48 hours)
- Verify CNAME file contains only `abhaweb.org`

**HTTPS not working?**
- Ensure "Enforce HTTPS" is checked in GitHub Pages settings
- Wait for SSL certificate provisioning (can take a few minutes)

**Build failing?**
- Check the Actions tab for error details: https://github.com/Fe4Rless233/abha_website/actions
- Ensure all dependencies are properly installed
- Verify TypeScript compilation passes locally

## 🌟 Benefits of Custom Domain

- **Professional appearance** - abhaweb.org vs fe4rless233.github.io
- **Better SEO** - Search engines prefer custom domains
- **Branding** - Consistent with your organization's identity
- **Trust** - Users trust custom domains more
- **Control** - You own the domain and can move hosting if needed
