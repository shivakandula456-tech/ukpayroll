# ActualPay — Image Replacement Report

Date: 2026-10-22. Scope: replace every unsuitable AI-generated photographic asset across
actualpay.co.uk with licensed real stock photography, optimised for desktop/tablet/mobile,
without changing design, navigation, SEO structure or the hero video.

## Outcome

- 21 licensed Pexels photographs selected, cropped and optimised into `assets/images/`.
- All 9 article pages, 5 blog/category listing pages and 13 service/landing pages updated.
- 15 obsolete AI-still assets deleted; 0 broken image references remain (verified by scripted check over all 34 HTML pages, 75 local image/srcset refs).
- Hero video architecture untouched: `index.html` video element, `main.js` lazy-loader + poster, `components.css` poster fallbacks and preloads all preserved; poster files were overwritten in place (`actualpay-hero-poster.webp`, `actualpay-hero-poster-mobile.webp`, `actualpay-og.jpg`).
- Deliverables: `ACTUALPAY_IMAGE_AUDIT.md`, `ACTUALPAY_IMAGE_LICENCE_REGISTER.md`, this report.

## What replaced what

| Old asset (AI video still) | New asset(s) | Where used now |
|---|---|---|
| actualpay-hero-poster.webp (AI still, overwritten) | Pexels 7433829 → actualpay-hero-poster.webp 1280×720 | Homepage hero poster (desktop), CSS fallback, preload |
| actualpay-hero-poster-mobile.webp (overwritten) | Pexels 7964562 → actualpay-hero-poster-mobile.webp 900×1200 portrait | Homepage hero poster (mobile), CSS fallback, preload |
| actualpay-og.jpg (overwritten) | Pexels 7433829 → actualpay-og.jpg 1200×630 | Site-wide OG image |
| actualpay-team-planning.webp / -og.jpg | Pexels 7693692 → team-planning.webp / -card / -og | Homepage, services, get-a-quote |
| actualpay-team-review.webp / -og.jpg | Pexels 7698800 → team-review.webp / -card / -og | Homepage, services; OG on contact, service-sector, services |
| actualpay-consultation.webp / -og.jpg | Pexels 8292884 → consultation.webp / -card / -og | Payroll for accountants; OG on testimonials |
| actualpay-payroll-detail.webp / -og.jpg | Pexels 8297351 → payroll-detail.webp / -card / -og | Bookkeeping services, why-bookkeeping article; OG on payroll-services, faq, privacy |
| actualpay-team-left.webp / -cover-640 / -cover-960 / -og.jpg | Pexels 7691721 → ultimate-guide-640 / -960 / ultimate-guide.webp / -card / -og | Ultimate-guide article hero (srcset) + blog/category listing OGs |
| insight-statutory.webp | Pexels 8297126 → statutory.webp / -card / -og | Statutory article hero + related cards |
| insight-outsourcing.webp | Pexels 7698802 → outsourcing.webp / -card / -og | Affordable-outsourcing article hero + related cards |
| insight-white-label.webp | Pexels 5325104 → white-label.* ; Pexels 8353820 → white-label-benefits.* | What-are-white-label / Benefits-of-white-label articles + cards |

New article-specific images (replacing generic AI stills previously shared across articles):
black-friday (11773871), budget/HMRC (7887852), accountants (7821518), statutory (8297126),
outsourcing (7698802), white-label-benefits (8353820), ultimate-guide (7691721),
payroll-detail (8297351), white-label (5325104).

## Reference updates

- `<img>` src/srcset and JSON-LD `"image"` URLs updated per page; `<meta og:image>` /
  `<meta twitter:image>` on all pages now point at the matching licensed OG JPEG.
- `width`/`height` attributes set to real intrinsic dimensions (1200×675 heroes, 800×500
  cards, 1200×630 OGs), fixing the old mismatched 1200×675-on-800×500 attributes.
- Blog/category post-card images are now matched to the article each card links to
  (href-scoped replacement), so every card shows its own article's photograph.

## Optimisation

- Heroes: WebP q72–74, 1200×675 (desktop), attention-crop; mobile poster 900×1200 portrait q74.
- Cards: WebP q70, 800×500. OG images: mozjpeg q82, 1200×630, attention crop.
- Typical shipped sizes: hero poster 47KB, mobile poster 60KB, card 15–43KB, OG 42–92KB.
- All `<img>` use `loading="lazy"` + `decoding="async"` (hero uses fetchpriority=high).

## Deleted assets (15)

actualpay-team-planning.webp, actualpay-team-review.webp, actualpay-consultation.webp,
actualpay-payroll-detail.webp, actualpay-team-left.webp, actualpay-team-left-cover-640.webp,
actualpay-team-left-cover-960.webp, actualpay-team-planning-og.jpg, actualpay-team-review-og.jpg,
actualpay-team-left-og.jpg, actualpay-consultation-og.jpg, actualpay-payroll-detail-og.jpg,
insight-statutory.webp, insight-outsourcing.webp, insight-white-label.webp.

Not deleted: `assets/videos/actualpay-hero.mp4` and `assets/videos/source/actualpay-hero-original.mp4` (hero video, unchanged).

## Verification

- Scripted crawl of all 34 HTML pages: 75 local image/srcset references, 0 missing targets.
- Grep across html/css/js: zero remaining references to old asset filenames.
- Visual crop review of every new asset before deployment (contact sheets + full previews).
- Browser QA (headless Chrome via local HTTP server): 6 representative pages (home, blog,
  category/accounting, ultimate-guide article, CIS, about) × 9 viewports
  (320/375/390/430/768/1024/1280/1440/1920) = 54 full-page screenshots.
  Result: **0 issues** — no horizontal overflow, no broken images, no console/page errors,
  no failed requests. Additional check: every `<img>` on the homepage reported
  naturalWidth > 0 after load. Screenshots archived in the QA tooling folder.
- Hero video still lazy-loads and plays; poster fallbacks resolve on all viewports.


## Final follow-up pass — 22 October 2026

- Corrected the homepage white-label benefits card to `white-label-benefits-card.webp`.
- Reconciled the image audit with the actual current asset inventory.
- Corrected the ultimate-guide default image dimensions to match the 960×540 source.
- Updated page-level Open Graph and Twitter mappings to appropriate existing assets where available.
- Social metadata and local references are checked in `ACTUALPAY_FINAL_QA_REPORT.md`; no external social crawler validation is claimed.
