# Deployment notes

**Prepared:** 21 October 2026  
**Target:** GitHub Pages, static hosting  
**Assumed production URL:** `https://actualpay.co.uk/`

## Deployment status

The site is deployable as static files. No build, package install, server runtime, database or environment variables are required.

Two launch dependencies remain outside the repository:

1. **Form delivery provider** — not configured. The contact, quote and article comment forms currently use a client-side `mailto:` fallback and do not send or store anything themselves.
2. **Custom domain decision** — all absolute canonical, Open Graph, sitemap and robots URLs currently assume `https://actualpay.co.uk/`. Deploying to a GitHub Pages project URL without changing them would create incorrect canonical and sitemap URLs.

Do not announce a working enquiry form until the provider is connected and a controlled test submission has been received.

## What to deploy

Deploy the repository root, including:

- All 34 HTML files and their directories.
- `assets/` (CSS, JavaScript, images, video).
- `robots.txt`, `sitemap.xml`, `.nojekyll`.
- `link-audit.csv` and the project documentation if the repository is public.

Do **not** deploy temporary QA artefacts, Lighthouse reports, screenshots, Node packages, backups or the original uncompressed video. They live outside the project folder.

`.nojekyll` is an empty file that prevents GitHub Pages from running Jekyll. Keep it at the repository root.

## GitHub Pages setup

1. Create a repository and push the project contents to the root of the main branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the main branch and the **`/ (root)`** folder, then save.
5. Confirm the site loads from the generated `github.io` address before attaching the domain.
6. For the custom domain, enter `actualpay.co.uk` in **Settings → Pages → Custom domain** and save. GitHub will add a `CNAME` file to the repository; keep it.
7. Configure DNS as documented by GitHub for the chosen host. Current instructions: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>
8. Wait for DNS checks to pass, then enable **Enforce HTTPS**.

The canonical URLs use the apex domain (`actualpay.co.uk`), not `www`. Decide whether the apex or `www` is the preferred public host before launch, and make the DNS/Pages configuration match. Do not publish conflicting canonical variants.

### If using a project URL instead

A URL such as `https://accountname.github.io/repository/` requires changing:

- Every `<link rel="canonical">`.
- Every `og:url`, `og:image` and `twitter:image` absolute URL.
- `sitemap.xml` `<loc>` entries.
- The `Sitemap:` line in `robots.txt`.
- Any JSON-LD `url` values.

Relative navigation and asset links already work under a subpath. Absolute metadata does not update automatically.

## Pre-launch checklist

- [ ] Owner approves the production custom domain and apex/`www` choice.
- [ ] GitHub Pages is serving from the repository root with `.nojekyll`.
- [ ] HTTPS is enforced and the certificate is active.
- [ ] All 33 sitemap URLs return HTTP 200 over HTTPS.
- [ ] A missing URL returns the branded `404.html` with HTTP 404 and `noindex`.
- [ ] Canonical, Open Graph and sitemap URLs resolve to the live domain.
- [ ] `robots.txt` and `sitemap.xml` are reachable and contain the correct domain.
- [ ] Form provider is approved, configured and tested, or the mailto fallback is explicitly accepted for launch.
- [ ] No test submissions or fake customer enquiries are sent.
- [ ] Privacy and cookie policies have legal approval.
- [ ] Contact details, opening hours and social links are confirmed current.
- [ ] Image/video licences are confirmed for production use.
- [ ] No temporary build, QA or backup files are present in the deployment.
- [ ] A tagged release or known-good commit exists for rollback.

## Post-deploy verification

Run these checks against the live HTTPS domain:

- Home, all eight service pages, all six sector links, FAQ, testimonials, blog, four categories, every article, About, Contact, Quote, both archived pages, privacy and 404.
- Navigation dropdowns, mobile menu and search on desktop and mobile.
- The skip link and keyboard focus order.
- Contact/quote form validation and the fallback link. If a provider is connected, submit one controlled test and confirm receipt, including the reply-to address.
- Mobile: no hero MP4 request; poster visible.
- Reduced motion: no hero video playback.
- HTTPS padlock and no mixed-content warnings.
- Canonical and social preview metadata on a sample of pages.
- `sitemap.xml` and `robots.txt` fetch successfully.
- Browser console has no errors.
- Lighthouse mobile and desktop on the live URL. Expect network and hosting variance; compare against `PERFORMANCE_REPORT.md`, not for exact equality.

Example PowerShell check for a page:

```powershell
$response = Invoke-WebRequest -Uri "https://actualpay.co.uk/" -Method Head
$response.StatusCode
$response.Headers["Content-Type"]
```

Because GitHub Pages can take a short time to publish and cache, allow for propagation before treating a 404 as a defect.

## Search-engine setup

1. Add the domain property in Google Search Console and Bing Webmaster Tools.
2. Verify ownership using the method each service provides (DNS is usually cleanest for GitHub Pages; do not upload verification files that conflict with the site).
3. Submit `https://actualpay.co.uk/sitemap.xml`.
4. Confirm the sitemap reports 33 discovered URLs and no errors.
5. Inspect the homepage and one service/article page with URL Inspection.
6. Validate structured data with Google's Rich Results Test after the live URL is available.
7. Recheck coverage and Core Web Vitals after 28 days. Lab scores are not field data.

## Forms

Current state: native validation plus a prepared `mailto:info@actualpay.co.uk` message. The site displays an honest message that nothing is sent until the visitor sends from their email app. It does not store data or claim delivery.

To connect a provider:

1. Obtain owner approval and the provider's static-site form endpoint.
2. Update the form markup and `assets/js/forms.js` according to the provider's documented method.
3. Handle pending, accepted and failed states; only show success on confirmed acceptance.
4. Keep a visible email/phone fallback if the provider fails.
5. Test with a controlled address and confirm spam protection, consent handling and privacy disclosures.
6. Never place API secrets in front-end files. Use a provider designed for static-site forms or an approved serverless endpoint.
7. Update the privacy policy if the provider processes personal data or sets cookies.

## Security and privacy

- The site sets no first-party cookies and loads no analytics, advertising pixels, chat widgets, social embeds or third-party fonts.
- External links use `rel="noopener"` where they open a new tab.
- No credentials, API keys or environment secrets are present in the deployed files.
- GitHub Pages provides HTTPS but does not support custom security headers such as CSP or HSTS configuration. If the organisation requires those headers, use an approved proxy/host and retest the site; do not add a proxy that breaks relative paths or caching.
- The cookie policy is hosted by WebsitePolicies on an external domain. Legal review remains with ActualPay.
- Form data is not stored by this website. If a provider is added, its retention and privacy terms must be reflected in the privacy policy.

## Caching and updates

- Asset filenames are not content-hashed. GitHub Pages/CDN caching can briefly serve an older CSS, JS or image after an update.
- If an update must appear immediately, rename the asset (for example `styles-2026-10.css`) and update references, or append a version query string.
- Update `sitemap.xml` when adding or removing pages; add accurate `<lastmod>` values only if maintained.
- Update `assets/js/search-data.js` when adding or renaming content.
- Rerun the static audit and Lighthouse after significant content, CSS or media changes.

## Rollback

- Keep each release as a git commit or tag; redeploy the previous commit if a regression is found.
- GitHub Pages keeps deployment history; use the repository's deployment history to identify the last good build.
- Because there is no server-side app, rollback is a file/commit revert. No database migration is involved.
- If a domain/DNS change causes the issue, revert the Pages custom-domain setting and DNS record together.

## Operational ownership

| Item | Owner / status |
| --- | --- |
| GitHub repository and Pages settings | To be assigned |
| Custom domain and DNS | ActualPay / hosting owner — pending |
| HTTPS certificate | GitHub Pages — automatic after DNS |
| Form provider and enquiry handling | ActualPay — pending approval |
| Privacy/cookie policy and legal review | ActualPay — pending |
| Content updates | ActualPay or nominated editor |
| Periodic link/performance checks | Nominated maintainer — recommended quarterly |

## Known deployment limitations

- GitHub Pages cannot provide server-side redirects. Preserve existing URLs or use static redirect pages/an approved redirect host.
- GitHub Pages serves static files only; there is no server-side form handling, authentication or database.
- There is no CMS; content is edited in HTML.
- No uptime monitoring or analytics is configured.
- The repository includes documentation and CSV audit files; decide whether these should be public in a public repository.
