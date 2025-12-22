# ⚠️ Site Not in Google Search Console

This website is **NOT** currently tracked in Google Search Console.

## Expected Site URL
`https://templatenextjs.pensanta.com`

## Steps to Add Site to GSC

### 1. Add Site to Google Search Console

Use Claude Code's MCP GSC tool to add this site:

```python
mcp__gsc__add_site(site_url="https://templatenextjs.pensanta.com")
```

### 2. Verify Ownership

After adding, Google may require verification. Check if your site already has a Google verification meta tag in the HTML `<head>` section.

If not present, Google will provide a verification code. Add it to your site's layout/HTML.

### 3. Submit Sitemap

Once verified, submit your sitemap:

```python
mcp__gsc__submit_sitemap(
    site_url="https://templatenextjs.pensanta.com",
    sitemap_url="https://templatenextjs.pensanta.com/sitemap.xml"
)
```

### 4. Optimize SEO

Follow the complete SEO guide: `gsc-fix-guide.md` in this folder.

## After Adding to GSC

Once the site is added and verified, run the GSC report generator again:

```bash
cd ~/Documents/work/pensanta/websites
source gsc-venv/bin/activate
python3 gsc_report_generator.py
```

This will generate proper GSC analytics reports for this site.
