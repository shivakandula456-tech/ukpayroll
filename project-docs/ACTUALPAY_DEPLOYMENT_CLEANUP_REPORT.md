# ActualPay UK — Deployment Cleanup Report

- Production directory: `production/`.
- Internal audit/report files and `link-audit.csv` are excluded from the production root and retained under `project-docs/`.
- Original video archive is preserved as `source-archive/actualpay-hero-original.mp4` and is not present under `production/assets/videos/`.
- Optimised production video remains at `production/assets/videos/actualpay-hero.mp4`.
- Static HTML/CSS/Vanilla JavaScript structure retained; no framework, Node.js or backend introduced.
- Local reference scan found 0 missing references in production.
- This report does not claim a live GitHub Pages deployment was performed.
