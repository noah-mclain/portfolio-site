# Portfolio design and interaction system

This is Nada Mohamed’s engineering portfolio. The work, project responsibilities, and competition results carry the page. Preserve factual content under `src/data`; do not substitute marketing claims.

## Visual system

- IBM Plex Sans: body, navigation, and headings (400/500/600). IBM Plex Mono: project periods and experience years (400).
- Near-black `#111316` dark ground; neutral `#f7f8fa` light ground. Solid violet `#b69af8` / `#6840ad` for links, active navigation, and focus.
- Solid surfaces and 1px rules. Small 3–4px corner radii for controls and portrait. No decorative shadows, blur, gradients, or glass.
- 1120px outer container with fluid horizontal padding. Section spacing scales from 3.5rem to 6rem. Readable text measures, moderate heading scale, no giant display slogans.
- The circuit motif is a faint, static SVG confined to the hero. It has no JavaScript or scrolling behavior.

## Information hierarchy

The hero introduces Nada’s name, role, current work, portrait, and work/CV links. About combines readable biography, structured facts, prominent award results, and compact certifications. Skills use grouped text rather than chips or filters. Experience is chronological. Selected projects use case-study rows, with Payramid larger and its competition announcements linked. The archive retains all projects and lazy preview images. Contact exposes email, CV, GitHub, and LinkedIn directly.

## Behavior and accessibility

The header is sticky with text links and an underline for the active section. At 850px and below, a button reveals a conventional navigation grid in document flow. Escape closes it and returns focus to its trigger. All controls have visible focus rings and at least 44px interaction height. A skip link leads to main content.

Content is always visible. No scroll reveals, scroll progress, floating social rail, canvas, or decorative requestAnimationFrame loop remains. One IntersectionObserver watches section crossings; when sections share the reading band, the later section wins, allowing the short Contact section to become active. The observer rebinds on archive transitions.

Theme is established in a parser-blocking head script before styles load: valid stored theme, otherwise system preference, otherwise dark. React reads the root attribute and persists only explicit toggles; storage access is guarded. System changes and cross-tab storage changes are supported.

GitHub Pages uses the existing relative Vite base and `#/projects` hash route. The hash router owns scroll restoration explicitly, avoiding a WebKit race that can reset fragment navigation to the top on reload. Section fragments are resolved after route commit so links from the archive find remounted sections. Fragment navigation is immediate, including reloads and archive returns; reduced motion is respected globally.

The 1120×1400 source portrait is retained; production uses 640×800 AVIF with WebP fallback and explicit intrinsic dimensions. Project previews remain remote, lazy-loaded, and constrained to a reserved 16:9 region; failures leave the textual project usable.
