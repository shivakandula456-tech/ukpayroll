# Link audit

**Audit date:** 21 October 2026  
**Scope:** all 34 HTML files, including `404.html`  
**Machine-readable inventory:** [`link-audit.csv`](link-audit.csv)

## Summary

| Check | Result |
| --- | ---: |
| HTML pages audited | 34 |
| Hyperlinks found | 3,594 |
| Internal links | 2,965 |
| Same-page anchor links | 444 |
| External link occurrences | 343 |
| `mailto:` links | 117 |
| `tel:` links | 133 |
| Placeholder links (`#`, empty, `javascript:`) | 0 |
| Asset references checked | 389 |
| Broken internal links | 0 |
| Broken same-page anchors | 0 |
| Missing local assets | 0 |
| External URLs reachable (HTTP 200) | 343 / 343 occurrences |
| Unique external destinations | 7 |
| Sitemap URLs | 33 |
| Search-index entries resolving to a page | 36 / 36 |

The CSV contains one row per link occurrence plus asset and search-index checks. Columns are `source_page`, `source_url`, `element`, `link_text`, `href`, `type`, `destination`, `status`, `detail`.

## Internal route mapping

All public routes are preserved at the same path as the source site. Directories are served through `index.html`; internal links use relative filenames so they work locally and under a GitHub Pages project subpath.

| Source URL | Deployed file | Status |
| --- | --- | --- |
| `https://actualpay.co.uk/` | `index.html` | OK |
| `https://actualpay.co.uk/about-actualpay/` | `about-actualpay/index.html` | OK |
| `https://actualpay.co.uk/services/` | `services/index.html` | OK |
| `https://actualpay.co.uk/service-sector/` | `service-sector/index.html` | OK |
| `https://actualpay.co.uk/faq/` | `faq/index.html` | OK |
| `https://actualpay.co.uk/testimonials/` | `testimonials/index.html` | OK |
| `https://actualpay.co.uk/blog/` | `blog/index.html` | OK |
| `https://actualpay.co.uk/category/white-label-payroll/` | `category/white-label-payroll/index.html` | OK |
| `https://actualpay.co.uk/payroll-outsourcing-service/` | `payroll-outsourcing-service/index.html` | OK |
| `https://actualpay.co.uk/white-label-payroll-processing-services/` | `white-label-payroll-processing-services/index.html` | OK |
| `https://actualpay.co.uk/payroll-for-accountants/` | `payroll-for-accountants/index.html` | OK |
| `https://actualpay.co.uk/payroll-bureau-services/` | `payroll-bureau-services/index.html` | OK |
| `https://actualpay.co.uk/cis-payroll-services/` | `cis-payroll-services/index.html` | OK |
| `https://actualpay.co.uk/p11d-and-psa-services/` | `p11d-and-psa-services/index.html` | OK |
| `https://actualpay.co.uk/pension-and-auto-enrolment-support/` | `pension-and-auto-enrolment-support/index.html` | OK |
| `https://actualpay.co.uk/emergency-payroll-processing-services/` | `emergency-payroll-processing-services/index.html` | OK |
| `https://actualpay.co.uk/contact/` | `contact/index.html` | OK |
| `https://actualpay.co.uk/get-a-quote/` | `get-a-quote/index.html` | OK |
| `https://actualpay.co.uk/privacy-policy/` | `privacy-policy/index.html` | OK |
| `https://actualpay.co.uk/bookkeeping-services-2/` | `bookkeeping-services-2/index.html` | OK — archived source page retained |
| `https://actualpay.co.uk/payroll-services/` | `payroll-services/index.html` | OK — archived source page retained |
| `https://actualpay.co.uk/understanding-uk-payroll-statutory-payments/` | `understanding-uk-payroll-statutory-payments/index.html` | OK |
| `https://actualpay.co.uk/affordable-payroll-outsourcing-services-uk/` | `affordable-payroll-outsourcing-services-uk/index.html` | OK |
| `https://actualpay.co.uk/unlock-exclusive-discounts-on-uk-payroll-services-this-black-friday-and-cyber-monday/` | `unlock-exclusive-discounts-on-uk-payroll-services-this-black-friday-and-cyber-monday/index.html` | OK |
| `https://actualpay.co.uk/hmrc-autumn-budget-2024/` | `hmrc-autumn-budget-2024/index.html` | OK |
| `https://actualpay.co.uk/benefits-of-white-label-payroll-processing/` | `benefits-of-white-label-payroll-processing/index.html` | OK |
| `https://actualpay.co.uk/what-are-white-label-payroll-services/` | `what-are-white-label-payroll-services/index.html` | OK |
| `https://actualpay.co.uk/why-bookkeeping-services-are-essential-for-your-business/` | `why-bookkeeping-services-are-essential-for-your-business/index.html` | OK |
| `https://actualpay.co.uk/the-importance-of-professional-accounting-services/` | `the-importance-of-professional-accounting-services/index.html` | OK |
| `https://actualpay.co.uk/the-ultimate-guide-to-payroll-services/` | `the-ultimate-guide-to-payroll-services/index.html` | OK |

The three additional category archives are navigation additions, not rewritten source pages:

- `category/payroll/index.html` — links the payroll articles already present.
- `category/accounting/index.html` — links the accounting articles already present.
- `category/bookkeeping/index.html` — links the bookkeeping articles already present.

## External destinations

All external links were checked once on the audit date. These are third-party sites; their status can change without notice.

| Destination | Purpose | HTTP status |
| --- | --- | ---: |
| `https://app.websitepolicies.com/policies/view/0snewr70` | Cookie policy | 200 |
| `https://www.gov.uk/what-is-the-construction-industry-scheme` | GOV.UK CIS guidance | 200 |
| `https://www.thepensionsregulator.gov.uk/en/employers` | Pensions Regulator employer guidance | 200 |
| `https://www.facebook.com/people/ActualPay/61566949170757/` | ActualPay Facebook | 200 |
| `https://www.linkedin.com/company/actualpay/` | ActualPay LinkedIn | 200 |
| `https://www.pinterest.com/actualpay/` | ActualPay Pinterest | 200 |
| `https://x.com/actualpay2024` | ActualPay X account | 200 |

External links open in a new tab where marked and use `rel="noopener"`.

## Redirects and preserved URLs

- No source-to-destination redirects are required for the known public routes; all are served at their original paths.
- There are no redirect rules in the repository. GitHub Pages does not support general server-side redirects, so any future URL change needs a static redirect page or an approved redirect-capable host.
- The 404 page is served by GitHub Pages for missing paths and is excluded from the sitemap. It uses `noindex, follow`.
- `sitemap.xml` contains all 33 public pages and excludes `404.html`.

## Notes

- Internal links to `index.html` and canonical clean URLs both resolve on GitHub Pages. Canonical tags point to the clean trailing-slash URL, so search engines consolidate the pair. See `SEO_REPORT.md`.
- No local filesystem paths, root-relative asset URLs or secrets are present in deployed HTML, CSS or JavaScript.
- The audit found no broken links or missing assets after the final content and image changes. Re-run the audit if pages, navigation, images or external destinations change.
