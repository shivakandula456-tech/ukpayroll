# ActualPay UK — Final QA Report

**Execution date:** 22 October 2026  
**Scope:** Static source and deployment-copy validation performed during packaging. No production deployment was performed.

## Implemented

- Rewrote `ACTUALPAY_IMAGE_AUDIT.md` against the actual current image inventory, dimensions, file sizes and references.
- Corrected the homepage white-label benefits card to use `white-label-benefits-card.webp`.
- Corrected the ultimate-guide image width/height metadata to match the 960×540 default source.
- Updated page-level Open Graph and Twitter image references to use existing relevant images where a mapping was available.
- Separated the public static deployment directory from internal reports, the audit CSV and the original source video.
- Updated licence-register wording so licence status and owner approval are not conflated.
- Updated the hero video to attempt autoplay on mobile and desktop regardless of reduced-motion or Data Saver preferences. It is muted, looping and inline, with an eager source and `preload="auto"`; the responsive poster switches at the existing 768px breakpoint.
- Added `play()` rejection handling and a CSS poster fallback that remains visible if autoplay is rejected or the video errors. Real-device browser verification is still pending.

## Static checks

- HTML pages in production: **34**.
- `<img>` elements scanned: **72**.
- Missing local `src`/`href`/`poster` targets: **0**.
- Images missing an `alt` attribute: **0**.
- Social metadata issues: **0**.

## Not fully verified / owner actions

- **Hero video:** source now attempts autoplay at all viewport sizes and does not gate playback on reduced-motion or Save-Data. Poster selection and autoplay/error fallbacks are present in source. Actual iOS Safari, Android Chrome and other device autoplay behaviour has not been tested in a live browser; device verification remains pending.
- **Forms:** contact form still uses `mailto:` fallback. No form-provider endpoint or credentials were supplied, and no real email delivery was tested. This is not an end-to-end web form submission.
- **Domain:** source metadata uses `https://actualpay.co.uk/`. DNS, HTTPS, production hosting and domain ownership were not tested live.
- **Licensing:** Pexels source/licence details are recorded in the register. This execution did not independently re-fetch every licence page or obtain explicit owner approval. Owner approval remains pending.
- **Performance:** no fresh Lighthouse run or live network performance measurement was performed. Historical scores in earlier project reports are not treated as newly verified.
- **Accessibility:** static `alt`-attribute presence was checked; no fresh automated axe or full keyboard/contrast audit was run.
- **Social previews:** metadata paths are checked against the local asset set, but external social platform preview crawlers were not tested.
- **Deployment:** the packaged `production/` directory is intended to be published as the GitHub Pages root. No deployment or DNS change was performed.

## Result

The ZIP is **prepared for deployment testing**, not certified as fully production-ready. Complete the owner checklist and browser/live checks before publishing.


## Hero video follow-up — 26 October 2026

- The video source is present in `index.html`; the element uses `autoplay`, `muted`, `loop`, `playsinline` and `preload="auto"`.
- JavaScript attempts playback on mobile and desktop and deliberately ignores reduced-motion and Save-Data checks for this video, per owner instruction.
- The mobile poster is selected at widths up to 767px; the desktop poster is selected at 768px and above.
- Rejection of the `HTMLMediaElement.play()` promise and video errors activate a CSS fallback that exposes the hero background poster.
- The previous 22 October Lighthouse results and mobile transfer figures were measured before this change and are historical only. Fresh Lighthouse and network measurements are required.
- Browser/device verification on iOS Safari, Android Chrome and real mobile hardware remains pending; this source update does not establish that every browser will permit autoplay.
