# SEO report

**Audit date:** 21 October 2026  
**Site:** 34 HTML files — 33 indexable public pages and one `404.html`  
**Production domain assumed:** `https://actualpay.co.uk/`

## Summary

| Check | Result |
| --- | --- |
| Pages crawled locally | 34 |
| Indexable pages | 33 |
| Pages in `sitemap.xml` | 33 |
| Sitemap XML parse | Valid, 33 `<url>` entries |
| Canonical tags | Present on all 34 pages, all `https://actualpay.co.uk` |
| Canonical duplicates | 0 |
| Unique titles | 33 / 33 indexable pages |
| Unique meta descriptions | 33 / 33 indexable pages |
| Title length range | 26–64 characters overall; 31–64 on indexable pages |
| Description length range | 70–163 characters |
| Exactly one `<h1>` per page | 34 / 34 |
| Duplicate element IDs | 0 |
| Unintended `noindex` | 0 |
| JSON-LD blocks that parse | 33 / 33 content pages (404 has no schema) |
| Content images with `alt` | 72 / 72 |
| Lazy-loaded images | 63 |
| Broken internal links | 0 |
| Broken anchors | 0 |
| Lighthouse SEO score (5 templates) | 100 |

No critical or warning-level SEO defects were found by the static audit. The remaining items are deployment decisions and optional enhancements.

## Indexation

- All 33 content pages use `index, follow` or no robots meta (which defaults to indexable). `404.html` uses `noindex, follow`.
- `sitemap.xml` contains exactly the 33 public pages. It excludes `404.html`, as intended.
- `robots.txt` allows all crawlers and declares the absolute sitemap URL.
- No staging `noindex`, password protection, `nofollow` on navigation or accidental `Disallow` rules are present.
- The site is a single English (United Kingdom) site; `lang="en-GB"` is set on every page. No `hreflang` is needed.
- There are no paginated archives, faceted URLs or query-string content variants.
- Three category archives were added for navigation (`/category/payroll/`, `/category/accounting/`, `/category/bookkeeping/`) and are included in the sitemap. They contain unique intro copy and link to existing articles; they do not duplicate article bodies.

## Canonicals and duplicate URL handling

- Every page has a self-referencing canonical using the clean directory URL, e.g. `https://actualpay.co.uk/services/`.
- The canonical origins are consistent; no `http://`, `www.` or trailing-slash variants appear.
- Internal links intentionally use relative `index.html` paths such as `../services/index.html`. GitHub Pages serves both `/services/` and `/services/index.html`. The canonical tag consolidates the pair in search engines, and the filename form allows the site to be opened from a local disk without a server.
- If the site is deployed to a GitHub Pages **project URL** instead of the custom domain, all absolute canonical, Open Graph, Twitter, sitemap and robots URLs must be changed. See `DEPLOYMENT_NOTES.md`.

## Titles and descriptions

- Every indexable page has a unique title and a unique meta description.
- Titles place the specific service/topic first and the brand last. The homepage title is 57 characters; service titles are 46–64; article titles are 35–62.
- Descriptions are 70–163 characters, within typical desktop and mobile snippet limits.
- Meta descriptions are written as page summaries, not keyword lists.
- The FAQ, blog and privacy titles were lengthened during the final pass; the archived payroll page received a clearer title.
- No title is duplicated across pages and no description is reused.

Complete title map (descriptions remain in each page's source):

| File | Title | Title chars | Description chars | In sitemap |
| --- | --- | ---: | ---: | --- |
| `404.html` | Page Not Found \| ActualPay | 26 | 106 | No |
| `about-actualpay/index.html` | About ActualPay \| UK Payroll Specialists | 40 | 129 | Yes |
| `affordable-payroll-outsourcing-services-uk/index.html` | Affordable Payroll Outsourcing Services UK \| ActualPay | 54 | 120 | Yes |
| `benefits-of-white-label-payroll-processing/index.html` | Benefits of White Label Payroll Processing \| ActualPay | 54 | 136 | Yes |
| `blog/index.html` | Payroll, Accounting & Bookkeeping Insights \| ActualPay | 54 | 92 | Yes |
| `bookkeeping-services-2/index.html` | Bookkeeping Services \| ActualPay | 32 | 151 | Yes |
| `category/accounting/index.html` | Accounting Insights \| ActualPay | 31 | 79 | Yes |
| `category/bookkeeping/index.html` | Bookkeeping Insights \| ActualPay | 32 | 101 | Yes |
| `category/payroll/index.html` | Payroll Articles & Guides \| ActualPay | 37 | 70 | Yes |
| `category/white-label-payroll/index.html` | White Label Payroll Insights \| ActualPay | 40 | 82 | Yes |
| `cis-payroll-services/index.html` | CIS Payroll Services for Construction \| ActualPay | 49 | 145 | Yes |
| `contact/index.html` | Contact ActualPay \| UK Payroll Support | 38 | 113 | Yes |
| `emergency-payroll-processing-services/index.html` | Emergency Payroll Processing Services \| ActualPay | 49 | 159 | Yes |
| `faq/index.html` | UK Payroll FAQs \| Outsourcing & Compliance \| ActualPay | 54 | 111 | Yes |
| `get-a-quote/index.html` | Get a Payroll Quote \| ActualPay | 31 | 120 | Yes |
| `hmrc-autumn-budget-2024/index.html` | HMRC Autumn Budget 2024 \| ActualPay | 35 | 138 | Yes |
| `index.html` | ActualPay \| UK Payroll Outsourcing & White-Label Services | 57 | 163 | Yes |
| `p11d-and-psa-services/index.html` | P11D and PSA Services \| Benefits Reporting \| ActualPay | 54 | 146 | Yes |
| `payroll-bureau-services/index.html` | Payroll Bureau Services for UK Employers \| ActualPay | 52 | 148 | Yes |
| `payroll-for-accountants/index.html` | Payroll for Accountants \| Outsourced Payroll Support \| ActualPay | 64 | 154 | Yes |
| `payroll-outsourcing-service/index.html` | Payroll Outsourcing Services in the UK \| ActualPay | 50 | 148 | Yes |
| `payroll-services/index.html` | Payroll Services Overview \| ActualPay | 37 | 140 | Yes |
| `pension-and-auto-enrolment-support/index.html` | Pension and Auto Enrolment Support \| ActualPay | 46 | 153 | Yes |
| `privacy-policy/index.html` | Privacy Policy \| How ActualPay Protects Your Data | 49 | 122 | Yes |
| `service-sector/index.html` | Who We Help by Sector \| ActualPay | 33 | 138 | Yes |
| `services/index.html` | Payroll Services for UK Businesses \| ActualPay | 46 | 140 | Yes |
| `testimonials/index.html` | Client Testimonials \| ActualPay | 31 | 83 | Yes |
| `the-importance-of-professional-accounting-services/index.html` | The Importance of Professional Accounting Services \| ActualPay | 62 | 118 | Yes |
| `the-ultimate-guide-to-payroll-services/index.html` | The Ultimate Guide to Payroll Services \| ActualPay | 50 | 114 | Yes |
| `understanding-uk-payroll-statutory-payments/index.html` | Understanding UK Payroll Statutory Payments \| ActualPay | 55 | 141 | Yes |
| `unlock-exclusive-discounts-on-uk-payroll-services-this-black-friday-and-cyber-monday/index.html` | Black Friday & Cyber Monday Payroll Offers \| ActualPay | 54 | 125 | Yes |
| `what-are-white-label-payroll-services/index.html` | What Are White Label Payroll Services \| ActualPay | 49 | 137 | Yes |
| `white-label-payroll-processing-services/index.html` | White Label Payroll Processing Services \| ActualPay | 51 | 159 | Yes |
| `why-bookkeeping-services-are-essential-for-your-business/index.html` | Why Bookkeeping Services Are Essential \| ActualPay | 50 | 121 | Yes |

Open Graph and Twitter Card metadata:

- Every page has `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:image:width` (1200), `og:image:height` (630), `og:site_name` and a Twitter card.
- Images are local, absolute HTTPS JPEGs sized 1200×630 for social previews.
- `twitter:card` is `summary_large_image`.
- Social URLs use the same canonical page URL.

## Keyword and intent targeting

These are editorial targets based on the supplied service names and obvious UK employer intent, not claims about search volume or rankings. No keyword-research subscription or ranking tool was used. Keywords are expressed naturally in headings and body copy; there is no keyword meta tag, hidden text or location spam.

| Page group | Primary intent | Supporting themes |
| --- | --- | --- |
| Homepage | Commercial: UK payroll outsourcing / payroll services | White label payroll, payroll bureau, accountants, CIS, P11D, pensions |
| Payroll Outsourcing | Commercial: outsource payroll | Managed payroll, payslips, RTI, year-end, cost and scope |
| White Label Payroll | Commercial: white label payroll processing | Accountants, professional firms, own-brand delivery, confidentiality |
| Payroll for Accountants | Commercial: payroll support for accountancy practices | White label vs managed, capacity, client retention |
| Payroll Bureau | Commercial: payroll bureau services | Pay runs, payroll calendar, RTI, pensions, year-end |
| CIS Payroll | Commercial/specialist: CIS payroll | Subcontractor verification, deductions, monthly returns, construction |
| P11D and PSA | Commercial/specialist: P11D and PSA support | Class 1A, benefits reporting, PAYE Settlement Agreements |
| Pension and Auto Enrolment | Commercial/specialist: auto-enrolment support | Assessment, contributions, re-enrolment, declaration of compliance |
| Emergency Payroll | Urgent commercial: emergency payroll processing | Deadlines, system failure, staffing gaps, rapid assessment |
| Who We Help | Informational/commercial: payroll by sector | Healthcare, hospitality, dentistry, charity, real estate, media |
| FAQ | Informational: payroll questions | Compliance, onboarding, pricing process, data, pensions |
| Blog and categories | Informational: payroll/accounting guidance | Statutory payments, outsourcing, white label, bookkeeping, HMRC changes |
| Individual articles | Informational: long-tail payroll topics | Statutory payments, outsourcing benefits, white label, budget updates |
| Contact / Get a Quote | Transactional: contact or request a quote | Payroll enquiry, quote, phone, email, hours |
| About / Testimonials | Trust: who ActualPay is and client experience | Experience, service model, client feedback |
| Privacy / archived pages | Reference/legal | Privacy, cookies, preserved historical service content |

The three new category pages target browse intent (“payroll articles”, “accounting insights”, “bookkeeping insights”) and should be reviewed after launch if they attract little organic traffic.

## Headings and content structure

- All 34 pages have exactly one `<h1>`.
- Section headings follow a logical hierarchy; no page skips from `<h1>` to `<h3>` as its first subsection.
- Service pages use a consistent structure: service hero, deliverables, audience, benefits, process, FAQs and CTA.
- Article pages keep the source publication date and category.
- Archived or expired content carries a visible archive notice rather than presenting an old offer as current.
- No hidden keyword blocks, doorway pages or auto-generated filler content were added.
- Testimonials are the supplied statements; no review markup or `AggregateRating` was invented.

## Structured data

All 33 content pages have at least one JSON-LD block, and every block parses as valid JSON. `404.html` intentionally has no structured data. The types in use are:

- `ProfessionalService` — homepage business/service entity.
- `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage` / `PrivacyPolicy` — page-level entities.
- `Service` — service pages.
- `FAQPage` — FAQ content.
- `Article` — blog articles.
- `Blog` — blog index.
- `BreadcrumbList` — breadcrumb navigation.

No `Review`, `AggregateRating`, `Offer`, price or availability markup is present. This is intentional: no verified review scores or published prices were supplied. Adding unverified rating markup would be inappropriate and could breach search-engine guidelines.

The JSON-LD was validated by parsing, not by Google's Rich Results Test. Run the deployed URLs through the Rich Results Test after launch; FAQ rich results are restricted by Google to authoritative government/health sites, so the FAQ markup may not produce rich results even when valid.

## Images and media

- 72 content `<img>` elements, all with an `alt` attribute; decorative images use `alt=""`.
- 63 images use native `loading="lazy"`; above-the-fold hero images and the article cover are intentionally not lazy-loaded.
- Filenames are descriptive (`payroll-outsourcing-...`, `insight-statutory.webp`), not generic camera names.
- In-page images are predominantly WebP. Open Graph images remain 1200×630 JPEG for broad social compatibility.
- The hero video has no captions because it is decorative and muted; the page's meaning does not depend on it. Mobile and reduced-motion visitors receive a poster instead.
- No image-based text is used for headings or navigation.

## Internal linking and search

- 2,965 internal links and 444 same-page anchors; 0 broken destinations.
- Navigation exposes all eight services, six sectors, four categories, FAQs, testimonials, About and Contact.
- Every service page links to related services, the quote page and contact options.
- Articles link to relevant service pages and categories; category archives link back to articles and the blog.
- The site search index contains 36 entries and resolves all of them to live pages. It is a convenience feature, not a substitute for crawlable links; all indexed destinations are also reachable through ordinary HTML links.
- Breadcrumbs are present on inner pages and use `BreadcrumbList` markup.
- The 404 page links back to the main sections and contact page.

## Crawl files and domain configuration

`robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://actualpay.co.uk/sitemap.xml
```

`sitemap.xml`:

- Valid XML with 33 `<loc>` entries.
- Absolute HTTPS URLs on the assumed production domain.
- No `<lastmod>` values. This is valid but optional; adding accurate last-modified dates would help crawlers prioritise changes. Do not add fake dates.
- Excludes `404.html`.
- No `priority` or `changefreq`; both are ignored by major search engines, so their omission is not a defect.

## Residual recommendations

1. **Connect the production domain at the root** (`actualpay.co.uk`) or update every absolute URL before launch. This is the highest-priority SEO dependency.
2. **Submit `sitemap.xml`** in Google Search Console and Bing Webmaster Tools after deployment, and verify the domain property.
3. **Validate rich results** on the live pages with Google's Rich Results Test; parsing success does not guarantee eligibility.
4. **Monitor the archived pages.** `/payroll-services/` and `/bookkeeping-services-2/` are retained for existing links and are currently indexable. If they compete with newer service pages in search, consider a future consolidation or `noindex` decision. Do not remove them without preserving inbound URLs; GitHub Pages cannot issue server-side redirects.
5. **Add `<lastmod>`** to the sitemap only when reliable content-change dates are available.
6. **Review category archives** after launch. If they receive no impressions or are judged thin, consider merging them into `/blog/`; do not delete them without preserving links.
7. **Recheck metadata after content edits.** There is no CMS validation layer, so title/description duplication can reappear if pages are copied.
8. **Do not add review or price schema** unless ActualPay can substantiate the values and approves their publication.

## Verdict

The technical SEO foundation is sound: indexable pages, self-referencing canonicals, a valid sitemap, consistent metadata, one H1 per page, descriptive alt text, clean internal linking and structured data without unsupported claims. SEO outcomes still depend on the custom-domain decision, content quality, competition and post-launch monitoring.
