# Refactor validation — 2026-10-29

## Commands

- `npm install` — passed; no package/lockfile changes.
- `npm run lint` — passed (the repository’s lint command is TypeScript checking).
- `npm run build` — passed; Vite 5.4.21 production output inspected.
- `npm run preview -- --host 127.0.0.1` — served the tested production build.
- `node /private/tmp/portfolio-validation/check.cjs` — passed across Playwright Chromium, Firefox, and WebKit.
- `node /private/tmp/portfolio-validation/reload.cjs` — reproduced the WebKit restoration race before the fix; confirmed target alignment after the fix.
- `node /private/tmp/portfolio-validation/hard-reload.cjs` — Chromium cache-bypassing reload, rapid wheel scrolling, and single AVIF portrait request passed.
- `git diff --check` — passed.
- Impeccable design detector — no findings. Independent screenshot review: ship at desktop/mobile/dark/archive scope.

The browser scripts and raw results are session validation artifacts, kept outside the application dependency tree. Browser automation used temporary Playwright and axe installations, adding no runtime or development dependency to the repository.

## Coverage and results

All three browser engines checked home and archive at 320, 375, 430, 768, 1024, and 1440px: no horizontal overflow. All eight archive projects remain present.

Theme checks covered both explicit themes, toggling, reload, invalid stored values, denied storage, system preference, and root theme with application JavaScript blocked. Active navigation checked direct fragments, reload, archive-to-section navigation, Back, and rapid section scrolling. Mobile checks covered menu open/close, Escape focus return, and the archive skip link retaining the archive route. Reduced motion and normal-motion fragment reloads were exercised. Forced remote image failures retained preview space and project text/links.

Axe reported zero home-page violations in both themes in all three engines. No application runtime errors were observed. Idle probes recorded zero application requestAnimationFrame callbacks. Observed Chromium layout shift score was 0 in this run; this is a lab result, not a field-performance guarantee.

Final bundle: approximately 57.8 KB gzipped JavaScript and 3.5 KB gzipped CSS. Portrait: 41,814-byte AVIF or 53,944-byte WebP, compared with the retained 1,697,403-byte source PNG. Only AVIF was requested in the Chromium network probe; no PNG is emitted into dist.

## Limits and existing risks

WebKit automation does not certify the actual Safari application, iOS, or physical devices. Real production Clarity ingestion was not tested because analytics intentionally skips localhost. System preference and storage events remain supported in source; live cross-tab synchronization was not separately exercised.

Some external raw GitHub image requests were cancelled on navigation. Firefox also reported a remote Trivia preview decode error. These are recorded separately from application errors; the forced-failure test confirms the fallback remains usable. Remote images and Google Fonts still depend on third-party availability.

`npm audit` reports eight existing dependency findings: five high, two moderate, one low. A major Vite/toolchain migration is outside this task. No dependency versions were changed.

Hash routing now owns scroll restoration: Back resolves section fragments to their section positions rather than restoring arbitrary historical pixel offsets. This avoids competing browser/React scroll writes, including the reproduced WebKit reload reset.

## Deployment and rollback

The existing GitHub Pages workflow still deploys main only. The branch/PR does not deploy or merge. Revert the refactor commits to roll back; source content, source portrait, storage key, analytics IDs/events, and deployment configuration remain compatible.
