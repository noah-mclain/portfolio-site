# nnaddaa.me

Personal portfolio for Nada Mohamed — AI/ML Engineer.

## Stack

- **Vite + React 18 + TypeScript** — fast HMR, tiny bundle
- **CSS Modules** — scoped styles, zero runtime
- **Lucide React** — tree-shakable icons
- **IntersectionObserver** — DIY scroll reveals (no animation lib)

Bundle size: ~57 KB gzipped JS, ~5 KB gzipped CSS.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle into dist/
npm run preview  # preview the production build
npm run lint     # type-check only
```

## Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, ScrollProgress
│   ├── sections/    # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/          # Button, Card, Pill, Section, SocialIcon
├── data/            # Typed content (profile, skills, projects, experience, education)
├── hooks/           # useScrollReveal, useActiveSection
├── styles/          # tokens.css, reset.css, globals.css
└── types/           # Shared TypeScript interfaces
```

Content lives in `src/data/*.ts` — edit those to update the site, no component changes needed.

## Design tokens

All colors, typography scale, spacing, and motion live in [`src/styles/tokens.css`](src/styles/tokens.css). Type and spacing use `clamp()` so the layout fluidly scales from 320px phones to 4K monitors without breakpoint cliffs.

Breakpoints (mobile-first):

- `< 480px` — single column, condensed contact rows
- `≥ 480px` — full social labels
- `≥ 640px` — 2-col skills grid
- `≥ 700px` — 2-col projects grid
- `≥ 768px` — desktop nav, 2-col about
- `≥ 900px` — 2-col contact
- `≥ 1024px` — 3-col skills
- `≥ 1100px` — 3-col projects
- `1280px` container max-width on ultrawide

## Deployment

Pushes to `main` build and deploy to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

In your repo settings, set **Pages → Source → GitHub Actions**.
