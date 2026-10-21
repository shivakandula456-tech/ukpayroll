# QA report

**Test date:** 21–22 October 2026  
**Site:** ActualPay UK static website  
**Environment:** Windows, Node.js v24.19.0, headless Chromium (Google Chrome), local static HTTP server. Lighthouse 12.2.1.  
**Production data used:** none. Form tests used `qa@example.com` and fictional values; no email was sent.

## Result summary

| Area | Result |
| --- | --- |
| Page rendering, 34 pages × 12 widths | 408 checks, 0 issues |
| Responsive layout audit, 34 pages × 12 widths | 408 runs, 0 document-level overflows |
| Mobile/tablet layout, 320–1024 px | 306 runs, 0 sub-12 px text, 0 unintended offscreen elements |
| Horizontal overflow | None at 320, 360, 375, 390, 414, 430, 600, 768, 1024, 1280, 1440 or 1920 px |
| Broken images | 0 |
| Console errors / uncaught exceptions | 0 |
| Link and asset audit | 0 broken links, 0 broken anchors, 0 missing assets |
| Axe WCAG 2.0/2.1/2.2 A/AA | 68 runs, 0 violations, 0 affected nodes |
| Keyboard navigation | Pass — skip link, menus, search, dialog focus return and focus visibility |
| FAQ accordions | Pass — 15 items, open/close behaviour |
| Contact and quote forms | Pass for validation and email fallback |
| No-JavaScript rendering | Pass — content visible, no overflow |
| Responsive video | Pass — desktop loads/plays; mobile and reduced-motion do not download it |
| Desktop regression | Representative static pages pixel-identical at 1440 px (SSIM 1.000) |
| Lighthouse | Performance 97–100; accessibility, best practices and SEO 100 |
| Visual review | Before/after screenshots inspected at mobile, tablet and desktop widths |

## Responsive audit method

All 34 HTML pages were loaded in Chromium at 12 viewport widths: **320, 360, 375, 390, 414, 430, 600, 768, 1024, 1280, 1440 and 1920 px**. For every run the audit checked:

- Document and viewport widths, to detect horizontal overflow.
- Elements extending outside their container or viewport.
- Visible interactive targets smaller than 44 × 44 px.
- Visible text below 12 px.
- Broken or upscaled images.
- Console errors and uncaught exceptions.
- A viewport screenshot; the key pages were also captured as full-page screenshots.

A separate interaction probe checked the 390 px mobile menu, submenus, search, forms, table scrolling and footer.

### Before and after

The 306 mobile/tablet runs (320–1024 px) produced:

| Measurement | Before changes | After changes |
| --- | --- | --- |
| Document-level overflow | 0 runs | 0 runs |
| Unintended clipped/offscreen element flags | 16 runs (2 benefit sections, 14 tables) | 14 runs (tables only, inside a scroll region) |
| Small-target occurrences | 4,358 | 99 |
| Text below 12 px | 5,392 occurrences | 0 |

Counts are automated occurrences across pages and widths, not unique defects. The remaining 99 small-target flags are all native 18 × 18 px consent checkboxes; each has an associated clickable label measuring 277 × 44 px at 390 px, so the effective label target meets the 44 px requirement. The checkbox itself was left at its native size rather than visually enlarged.

The only remaining offscreen flags at 320–600 px are descendants of the 640 px CIS and P11D tables. Each table is inside a labelled, focusable `.page-table-wrap` scroll region, and a visible “Scroll sideways to view all three columns.” hint appears below 672 px. There is no page-level overflow.

### Responsive fixes applied

- Prevented horizontal clipping of the payroll-outsourcing and emergency-payroll benefit copy/buttons at 320 px.
- Fixed the homepage H1 wrapping so it uses deliberate lines at mobile widths instead of leaving “with” alone or producing an awkward four-line block.
- Raised mobile/tablet touch targets to 44 px for header controls, footer links and social links, category filters, article tags, 404 links, catalogue links, link arrows, mobile submenu links, search controls and form controls.
- Kept the native consent checkbox at 18 px but made its label a 44 px target.
- Raised breadcrumbs, eyebrows, metadata, footer titles, chips, table headings and related microtype to at least 12 px at 320–1024 px.
- Raised form input, select and textarea text to 16 px below 1080 px to prevent iOS Safari focus zoom.
- Increased the mobile menu and search dialog to use dynamic viewport height and safe-area insets.
- Added a 46 px back-to-top button with safe-area offsets.
- Scoped all layout and touch changes to below 1080 px so the approved desktop design is unchanged.
- Corrected the guide article cover `sizes`; at 1024 px it now selects the 1200 px source and renders at its natural 984 px width without upscaling.
- Replaced the article cover upscale issue found in the baseline audit; mobile cover widths remain below the source resolution.

### Final change scope

A SHA-256 comparison against the pre-mobile backup found seven changed files: `assets/css/responsive.css`, `assets/css/pages.css`, the CIS and P11D pages, the payroll guide article, `QA_REPORT.md` and `PERFORMANCE_REPORT.md`. No JavaScript, image asset, sitemap, canonical URL or unrelated page content changed.

### Known image-source limitation

Four legacy article covers use 800 × 500 px source files. At 1024 px they are displayed at 984 px wide (23% upscale), and at 1280–1920 px at 858 px (7% upscale). At 320–768 px they render at or below source width. This is a source-asset limitation, not a layout defect; replacing those images with approved 1200 × 675 px originals would remove it.

## Functional and responsive testing

Each page was loaded in Chromium at all 12 widths at 900 px (desktop) or 844 px (mobile/tablet) viewport height. The checks covered:

- HTTP load success and correct page title.
- Exactly one visible `<h1>`, header, footer and skip link.
- No document-level horizontal overflow (`scrollWidth` equals viewport width).
- No broken images.
- Presence of required navigation and content regions.
- Runtime console errors and uncaught exceptions.

Results: **408 page checks, 0 issues**.

Interaction checks passed:

- Desktop Services dropdown opens, exposes visible links, and closes correctly.
- Desktop search opens, returns 5 results for “CIS”, and keeps the results region visible.
- Mobile menu opens, focuses the close button, and closes with `aria-expanded="false"`.
- Mobile menu sections expand and their submenu links are 44 px high.
- Mobile search opens with a 44 px close button and 44 px input, and returns 8 results for “payroll”.
- All 15 FAQ items are present; answers open and close.
- Empty contact form is invalid; a filled form is valid.
- Mobile form inputs are 16 px and 48 px high; the consent label is 44 px high.
- With JavaScript disabled, the page still shows its heading, header, text and footer, hides JavaScript-only controls, and does not overflow.

## Accessibility

Axe was run on all 34 pages at 1440 px and 390 px with WCAG 2.0 A/AA, WCAG 2.1 A/AA and WCAG 2.2 AA rules enabled.

**Final result: 68 runs, 0 violations, 0 nodes.** This includes the navigation, search dialog, forms and article pages.

Manual keyboard checks passed:

- The first Tab focuses the skip link, which becomes visible with a 3 px solid outline.
- Enter on the skip link moves focus to `<main id="main-content">`; the main element has `tabindex="-1"` so focus is not lost.
- The focus sequence continues through top-bar contact links, social links, brand, navigation, search and page content.
- ArrowDown on a desktop menu trigger opens the dropdown and focuses its first link.
- Escape closes the dropdown and returns focus to the trigger.
- Search opens with the input focused; Escape closes it and restores focus to the search button.
- The mobile menu moves focus to its close button on open; Escape closes it, restores focus to the toggle and resets `aria-expanded`.
- All tested focus indicators remain visible; no focus outline is removed without a replacement.

Additional accessibility details:

- All 72 content images have an `alt` attribute; decorative images use `alt=""`.
- Form fields have associated labels; required fields are marked in text and with `required`.
- The status message and email fallback are exposed after submit.
- `aria-controls`/`aria-expanded` relationships are present for navigation.
- The search trigger no longer uses `aria-haspopup="dialog"` with a closed dialog, which removed axe's inconclusive ARIA check.
- The services link group on the homepage is a labelled `<nav>` rather than a `div` with an unsupported `aria-label`.
- The CIS and P11D tables retain a labelled, keyboard-scrollable region and now have a visible scrolling cue.
- Interactive targets meet 44 px except the native consent checkbox; its 44 px label provides the effective pointer target.

Axe's `color-contrast` rule reports 1,601 **incomplete** nodes across the 68 runs because it cannot calculate contrast over gradients or images. These are not violations. The affected text uses the tested colour tokens; key combinations meet WCAG AA:

- Muted body text `#57534a` on cream `#f6f3ec`: 6.91:1.
- Gold `#7a5e22` on cream: 5.49:1; on white: 6.08:1.
- White on ink `#122521`: 16.00:1.
- Footer text `rgba(255,255,255,0.66)` on `#071c19`: 8.19:1.
- Lighthouse accessibility scored **100** on all five measured templates.

### Accessibility limitations

- No real screen-reader session (NVDA, JAWS, VoiceOver or TalkBack) was available.
- No Safari or Firefox testing; only Chromium was exercised.
- No real iOS or Android device was available; mobile testing used Chromium device emulation.
- Automated tools cannot prove full WCAG conformance. Gradient/image backgrounds and dynamic states still need human review.
- No user testing with people with disabilities was performed.

## Forms

Two production forms were tested: contact and quote.

| Check | Contact | Quote |
| --- | --- | --- |
| Form discovered | Yes | Yes |
| Empty submit blocked by native validation | Yes | Yes |
| Filled form valid | Yes | Yes |
| Configured provider endpoint | No | No |
| Mailto fallback generated | Yes | Yes |
| Correct subject/body fields | Yes | Yes |
| Status message visible | Yes | Yes |
| Fallback email link visible | Yes | Yes |
| Data stored by the site | No | No |
| Test email actually sent | No | No |

Article comment forms use the same email-preparation pattern. They are not a comment system and publish nothing.

**Blocked:** the production form provider is not configured because no approved provider, endpoint or credentials were supplied. The fallback is honest but depends on the visitor having an email app. It is not equivalent to server-side delivery. See `README.md` and `DEPLOYMENT_NOTES.md`.

## JavaScript and media

- No uncaught exceptions or `console.error` output were recorded during the 408-page run.
- Desktop hero: video source present, not paused, `readyState=4`, playback advanced past 1.6 s, visible, one MP4 request.
- Mobile hero: no video source, paused, hidden, **zero** MP4 requests.
- Reduced motion: video paused and hidden, `autoplay` absent, no source, **zero** MP4 requests; poster remains.
- Offscreen images use `loading="lazy"` (63 images); the hero poster and above-the-fold imagery are not unnecessarily lazy-loaded.
- Search works with keyboard and returns results from the local index.
- No third-party scripts, trackers, chat widgets or embedded social feeds load.

## Performance

Lighthouse was rerun after the responsive changes:

| Template | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home, mobile | 97 | 100 | 100 | 100 | 2.2 s | 0 | 80 ms |
| Home, desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| Payroll outsourcing, mobile | 98 | 100 | 100 | 100 | 2.0 s | 0 | 60 ms |
| Contact, mobile | 98 | 100 | 100 | 100 | 1.8 s | 0 | 80 ms |
| Article, mobile | 97 | 100 | 100 | 100 | 2.4 s | 0 | 60 ms |

## Link and asset testing

- 34 HTML files, 3,594 hyperlinks.
- 2,965 internal links, 444 same-page anchors, 343 external link occurrences, 117 email links, 133 phone links.
- 0 placeholders, 0 broken links, 0 broken anchors, 0 missing local assets.
- 389 asset references checked.
- All 7 unique external destinations returned HTTP 200 on the test date.
- 33 sitemap URLs; 36 search-index entries, all resolving.
- Internal paths are relative; no root-relative or local filesystem paths appear in deployed files.
- Every referenced file matches the on-disk filename and letter case exactly. This matters because GitHub Pages serves from a case-sensitive Linux filesystem while the Windows test machine is not case-sensitive.
- Canonical URLs use the production domain and clean directory URLs.

## SEO and metadata checks

- 34 pages: one `<h1>` each, no duplicate IDs, canonical present on every page; all 33 content pages have valid parseable JSON-LD (the 404 has none by design).
- 33 indexable public pages in the sitemap; `404.html` excluded and marked `noindex, follow`.
- Titles 26–64 characters (31–64 on indexable pages); meta descriptions 70–163 characters.
- All content pages have unique titles and descriptions.
- Open Graph and Twitter Card metadata present on every page.
- No noindex directive on public content pages.
- See `SEO_REPORT.md` for the full findings.

## Visual review

Before/after screenshots were captured for every page at all 12 widths, with full-page captures for the key templates. Representative pages were manually inspected at 320, 390, 600, 768, 1024 and 1440 px.

Confirmed visually:

- The mobile H1 resolves into deliberate two-line heading at 320–600 px.
- The 320 px payroll-benefits button wraps cleanly and is no longer clipped.
- Footer columns, services catalogue, article tags and 404 links have comfortable 44 px targets.
- The mobile menu scrolls correctly, with all submenu links reachable.
- The search dialog fits the viewport, scrolls internally and keeps its close control visible.
- The contact form fields are legible and touch-friendly; consent text flow remains natural with a clear Privacy Policy link.
- The CIS table scroll cue is visible and the table remains usable by touch and keyboard.
- The guide article cover now uses the correct source at 1024 px.
- No overlapping text, cut-off controls or unexpected document-level whitespace was observed at the tested widths.

Offscreen lazy images appear blank in full-page screenshots until scrolled into view; this is expected native lazy-loading behaviour, not a rendering failure.

## Desktop regression

Representative static pages were compared before and after at 1440 px: contact, services, payroll outsourcing and CIS payroll. All four produced **SSIM 1.000**, i.e. pixel-identical viewport screenshots. Responsive changes are scoped below 1080 px; the only desktop-affecting changes are the corrected article image source and hidden table-scroll hint.

## Resolved issues during QA

| Issue | Resolution |
| --- | --- |
| Skip link moved focus but `<main>` was not focusable | Added `tabindex="-1"` to `<main>` on all 34 pages; added `main:focus { outline: none; }` |
| ArrowDown did not focus the first dropdown link in headless Chrome | Deferred focus with `setTimeout(..., 30)` instead of `requestAnimationFrame` |
| Gold text on cream was below 4.5:1 in card indexes/step numbers | Added `--gold-dark` (`#7a5e22`), measured 5.49:1 on cream |
| Dark form sidebar inherited cream text | Scoped the override with `:not(.article-side-card--dark)` |
| Search ARIA check was inconclusive | Removed redundant `aria-haspopup="dialog"` from the search trigger |
| Homepage services group used `aria-label` on a plain `div` | Changed it to a labelled `<nav>` |
| Mobile downloaded the hero video unnecessarily | Conditional video loading; poster-only mobile/reduced-motion path |
| Article cover was oversized on mobile | Responsive WebP `srcset` at 640/960/1200 px |
| Homepage H1 wrapped poorly at 320–600 px | Removed the narrow H1 max-width below 768 px |
| Benefit-page copy/button was clipped at 320 px | Allowed benefit content to shrink and the long button label to wrap |
| Touch targets were below 44 px | Enlarged header, footer, form, menu, search, filter, tag, catalogue, 404 and link-arrow targets |
| Microtype was below 12 px | Raised breadcrumbs, eyebrows, metadata, titles, chips and table headings to at least 12 px up to 1024 px |
| Form focus caused iOS zoom | Set form control text to 16 px below 1080 px |
| Mobile menu/search could be cut off by browser chrome | Used dynamic viewport height and safe-area padding |
| Narrow tables had no visible scroll cue | Added a visible hint below 672 px while retaining the labelled scroll region |
| Guide article cover upscaled at 1024 px | Corrected `sizes`, verified the 1200 px source is selected |

## Open items

1. **Form provider:** approve and configure an external endpoint, then retest a real submission.
2. **Cross-browser/device testing:** run Safari, Firefox and at least one real iOS/Android device pass.
3. **Screen-reader testing:** test the full journey with NVDA or VoiceOver.
4. **Legal review:** privacy/cookie policies and compliance statements require owner approval.
5. **Asset licensing:** confirm the supplied video and photographs are licensed for production use.
6. **Legacy article images:** replace the four 800 × 500 cover sources with approved 1200 × 675 originals to remove the 7–23% upscale at 1024 px and above.
7. **Domain:** confirm `actualpay.co.uk` is connected at the site root, or update canonical/sitemap URLs.
8. **Post-deployment recheck:** rerun Lighthouse and link checks against the live HTTPS URL.

No unresolved functional, layout or automated accessibility failures remain in the tested Chromium environment. Remaining items are external, device-specific, asset-quality or content-approval dependencies.
