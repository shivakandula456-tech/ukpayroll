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
- Preserved the existing optimised hero video and enabled playback on mobile as well as desktop. Video remains disabled for reduced-motion users and when the browser exposes Save-Data. The mobile/desktop poster switches at the existing 768px breakpoint.
- Added `play()` rejection handling and a video-error fallback that retains the hero/poster instead of hiding the video element. Added viewport and connection-change handling.

## Static checks

- HTML pages in production: **34**.
- `<img>` elements scanned: **72**.
- Missing local `src`/`href`/`poster` targets: **0**.
- Images missing an `alt` attribute: **0**.
- Social metadata issues: **0**.

## Not fully verified / owner actions

- **Hero video:** static code checks confirm the width restriction is removed, reduced-motion and Save-Data checks remain, poster selection updates across the 768px breakpoint, and playback/error fallback handling is present. Actual iOS Safari, Android Chrome and other device autoplay behaviour has not been tested in a live browser; device verification remains pending.
- **Forms:** contact form still uses `mailto:` fallback. No form-provider endpoint or credentials were supplied, and no real email delivery was tested. This is not an end-to-end web form submission.
- **Domain:** source metadata uses `https://actualpay.co.uk/`. DNS, HTTPS, production hosting and domain ownership were not tested live.
- **Licensing:** Pexels source/licence details are recorded in the register. This execution did not independently re-fetch every licence page or obtain explicit owner approval. Owner approval remains pending.
- **Performance:** no fresh Lighthouse run or live network performance measurement was performed. Historical scores in earlier project reports are not treated as newly verified.
- **Accessibility:** static `alt`-attribute presence was checked; no fresh automated axe or full keyboard/contrast audit was run.
- **Social previews:** metadata paths are checked against the local asset set, but external social platform preview crawlers were not tested.
- **Deployment:** the packaged `production/` directory is intended to be published as the GitHub Pages root. No deployment or DNS change was performed.

## Result

The ZIP is **prepared for deployment testing**, not certified as fully production-ready. Complete the owner checklist and browser/live checks before publishing.


## Mobile hero video follow-up

- Removed the viewport-width restriction from the video playback eligibility check.
- Kept `prefers-reduced-motion: reduce` and browser Save-Data checks; these continue to prevent video source loading/playback.
- Added responsive poster selection: portrait poster at widths up to 767px and desktop poster at 768px and above.
- Added rejection handling for the `HTMLMediaElement.play()` promise. Autoplay rejection leaves the poster/background visible.
- Video errors no longer set `display: none`; the hero and poster fallback remain visible.
- Added listeners for reduced-motion changes, viewport breakpoint changes and supported network connection changes.
- `node --check` passed for `production/assets/js/main.js`.
- Browser/device verification on iOS Safari, Android Chrome and real mobile hardware remains pending; this environment did not provide live device testing.
