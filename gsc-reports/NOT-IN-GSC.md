# ⚠️ Site Not in Google Search Console

This website is **NOT** currently tracked in Google Search Console.

## Expected Site URL
`https://templatenextjs.pensanta.com`

## Full Automated Workflow to Add Site to GSC

### Step 1: Get Verification Token
```python
mcp__gsc__get_verification_token(site_url="https://templatenextjs.pensanta.com")
```
This returns a meta tag like: `<meta name="google-site-verification" content="TOKEN" />`

### Step 2: Add Meta Tag to Site
Add the returned meta tag to your site's `<head>` section:
- **Next.js:** `src/app/layout.tsx` inside `<head>`
- **Vite/React:** `index.html` inside `<head>`
- **Static HTML:** `index.html` inside `<head>`

### Step 3: Deploy
```bash
gitpush.sh
```
Wait 2-3 minutes for deployment to complete.

### Step 4: Verify Ownership
```python
mcp__gsc__verify_site(site_url="https://templatenextjs.pensanta.com")
```

### Step 5: Add to Search Console
```python
mcp__gsc__add_site(site_url="sc-domain:templatenextjs.pensanta.com")
```

### Step 6: Submit Sitemap
```python
mcp__gsc__submit_sitemap(
    site_url="sc-domain:templatenextjs.pensanta.com",
    sitemap_url="https://templatenextjs.pensanta.com/sitemap.xml"
)
```

### Step 7: Optimize SEO
Follow the complete SEO guide: `gsc-fix-guide.md` in this folder.

## Quick Reference (Copy-Paste)
```python
# Run these in order after adding meta tag and deploying:
mcp__gsc__get_verification_token(site_url="https://templatenextjs.pensanta.com")
# Add meta tag to <head>, deploy with gitpush.sh, then:
mcp__gsc__verify_site(site_url="https://templatenextjs.pensanta.com")
mcp__gsc__add_site(site_url="sc-domain:templatenextjs.pensanta.com")
mcp__gsc__submit_sitemap(site_url="sc-domain:templatenextjs.pensanta.com", sitemap_url="https://templatenextjs.pensanta.com/sitemap.xml")
```

## After Adding to GSC

Run the GSC report generator to get analytics:
```bash
cd ~/Documents/work/pensanta/websites
source gsc-venv/bin/activate
python3 gsc_report_generator.py
```
