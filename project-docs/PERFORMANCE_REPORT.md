# Performance report

**Test date:** 22 October 2026  
**Tool:** Lighthouse 12.2.1, headless Chromium  
**Method:** local static HTTP server, one Lighthouse run per page, Lighthouse mobile emulation with simulated throttling for mobile tests and the desktop preset for desktop. These are lab measurements, not field data.

> **Baseline warning — 26 October 2026:** The scores and transfer figures below were measured on 22 October, before the owner-requested mobile-autoplay change. Treat them as historical baseline data only. The current implementation requests the hero MP4 on mobile and desktop, so the 272 KiB mobile transfer and “no mobile video download” conclusions are no longer current. Rerun Lighthouse and inspect actual network transfers before publishing new performance figures.

## Final scores

| Page | Form factor | Performance | Accessibility | Best practices | SEO | FCP | LCP | CLS | TBT | Transfer |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 97 | 100 | 100 | 100 | 1.7 s | 2.2 s | 0 | 80 ms | 272 KiB |
| Home | Desktop | 100 | 100 | 100 | 100 | 0.5 s | 0.6 s | 0 | 0 ms | 1,970 KiB |
| Payroll Outsourcing | Mobile | 98 | 100 | 100 | 100 | 1.7 s | 2.0 s | 0 | 60 ms | 249 KiB |
| Contact | Mobile | 98 | 100 | 100 | 100 | 1.6 s | 1.8 s | 0 | 80 ms | 142 KiB |
| Payroll guide article | Mobile | 97 | 100 | 100 | 100 | 1.7 s | 2.4 s | 0 | 60 ms | 213 KiB |

All five runs completed with zero runtime errors and zero failed requests. No page loaded third-party resources, web fonts or analytics.

## What changed

### Hero media

The original page downloaded a 3.9 MB, 1920×1080 hero video and a large poster on every visit.

- The video was re-encoded to H.264 MP4 at 1600×900, CRF 28: **3,923,476 → 1,557,837 bytes** (about 60% smaller). It has no audio.
- **Historical test configuration (22 October):** the `<video>` used `preload="none"` and a `data-src` source; JavaScript loaded the video only on desktop when reduced-motion and Save-Data checks allowed it. The zero-mobile-MP4-request result below applies only to that build.
- **Current configuration (26 October):** the source URL is present in the HTML, with `autoplay`, `muted`, `loop`, `playsinline` and `preload="auto"`. JavaScript attempts playback on both mobile and desktop regardless of reduced-motion or Data Saver preferences.
- The responsive poster remains visible while the video loads and is used as the fallback if autoplay is rejected or the video errors. Since the MP4 asset is 1,557,837 bytes (about 1.56 MB), mobile can now download substantially more data; actual transferred bytes depend on browser buffering and network behaviour.
- Desktop posters were resized and recompressed:
  - `actualpay-hero-poster.webp` — 1280×720, 98,244 bytes.
  - `actualpay-hero-poster-mobile.webp` — 800×450, 44,750 bytes.
- Poster preload hints use media queries, so only the relevant poster is preloaded.
- The unused `actualpay-hero-poster-960.webp` and a 6.4 MB duplicate video at the project root were removed.

Historical result for the 22 October build: mobile LCP fell from **3.1 s** before the responsive-poster work to **2.2 s**, and mobile transfer fell from about **4.2 MB** to **272 KiB**. Those figures were measured when mobile did not load the MP4; they must not be used as the current result after mobile autoplay was enabled.

### Article imagery

The payroll guide cover was being loaded at full size on mobile. It now uses WebP sources at 640, 960 and 1200 px. The `sizes` attribute requests 100vw on phones, `calc(100vw - 40px)` below 1080 px and an 860 px slot on desktop; at 1024 px the 1200 px source is selected and displayed at its natural 984 px width.

- 640 px: 35,032 bytes
- 960 px: 65,896 bytes
- 1200 px: original `actualpay-team-left.webp`

The article's mobile LCP fell from **2.7 s to 2.4 s** and the page transfers 213 KiB.

### General

- System font stack only; no font downloads.
- 63 below-the-fold images use native lazy loading; the hero and above-the-fold images do not.
- CSS is split into four files and JavaScript into small page-appropriate files. No framework or polyfill bundle is loaded.
- No third-party scripts or embeds.
- 34 pages use shared markup and local SVG icons rather than an icon font.
- The site has no build step, so CSS/JS are shipped readable rather than minified. Lighthouse estimates 8–13 KiB of CSS minification savings; this was accepted to keep the project directly editable and deployable.
- The responsive pass added touch-target, safe-area, table-hint and mobile typography rules, taking the four stylesheets to 76,746 bytes. Layout remains pixel-identical at 1440 px on representative static pages.

## Resource profile

| Asset group | Size |
| --- | ---: |
| Images in `assets/images` (19 files) | 1,509,100 bytes |
| CSS (4 files) | 76,746 bytes |
| JavaScript (5 files) | 28,552 bytes |
| Hero video (1 file) | 1,557,837 bytes |

In the 22 October baseline run, Home mobile loaded 11 requests without the hero MP4; Contact mobile loaded 11 requests with **no images**, the guide article loaded 12 requests, and desktop home loaded 13 requests including the hero video. The current home mobile request count and transfer size are expected to be higher because the hero MP4 is now requested on mobile. No page loaded a font or third-party request in that baseline run.

## Residual opportunities

These are optimisations Lighthouse suggests but that did not prevent strong scores:

- **CSS minification:** potential 8–13 KiB. A build step would be required; the project deliberately has none.
- **Responsive image sizing:** potential 57 KiB on home mobile and 28 KiB on the article mobile. Remaining candidates are content images below the fold; they are already lazy-loaded and do not affect LCP.
- **Next-generation formats:** 39 KiB potential on home mobile. Most in-page images are already WebP; the remaining JPEGs are Open Graph images, which intentionally stay JPEG for social compatibility, and blog card thumbnails.
- **Unused CSS:** 12–43 KiB depending on template, because the shared stylesheet covers all page types. Splitting CSS per template would add maintenance overhead for a small gain.
- **DOM size:** 840 elements on the home page. The page is content-rich but within Lighthouse's acceptable range.
- **Blog thumbnails:** the blog listing still uses eight JPEG card images. They are lazy-loaded and below the fold; converting them to WebP is a future improvement, not a blocker.

## Measurement notes

- Lighthouse's built-in "Largest Contentful Paint element" audit failed in this environment with a `RootCauses`/`frame_sequence` dependency error. This is a Lighthouse tooling failure, not a site error. A separate Chromium check (`lcp-check.js`) identified the hero image/heading on the home page and the article cover on the guide page, and confirmed the optimisation targets.
- Results vary with CPU, disk cache and network conditions. Re-run Lighthouse against the deployed HTTPS URL and review field data in Search Console after launch.
- The mobile and desktop results should not be compared directly: mobile uses simulated throttling, while desktop uses the desktop preset with a much larger media payload.
- The site was not tested under slow 3G or with CPU throttling beyond Lighthouse's defaults.

## Verdict

These scores describe the 22 October baseline only. The unconditional mobile hero-video request changes the page’s resource profile, so current mobile transfer, LCP and Lighthouse scores are **not yet measured**. Rerun mobile and desktop Lighthouse plus a real network-waterfall check before treating performance as verified. The current design intentionally prioritises hero motion over Data Saver and reduced-motion preferences.

Full machine-readable results: `%TEMP%\opencode\lighthouse-results.json` (test artefact, not deployed).
