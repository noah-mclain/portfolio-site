# portfolio-site

Personal portfolio for Nada Mohamed — AI/ML Engineer.

Live at [noah-mclain.github.io/portfolio-site](https://noah-mclain.github.io/portfolio-site/).

## Stack

- **Vite + React 18 + TypeScript** — fast HMR, tiny bundle
- **CSS Modules** — scoped styles, zero runtime
- **Lucide React** — tree-shakable icons
- **IntersectionObserver** — active-section navigation without scroll listeners

Bundle size: ~57 KB gzipped JS, ~3.5 KB gzipped CSS.

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
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/          # Button, Pill, Section, SocialIcon
├── data/            # Typed content (profile, skills, projects, experience, education)
├── hooks/           # useActiveSection, useTheme
├── styles/          # tokens.css, reset.css, globals.css
└── types/           # Shared TypeScript interfaces
```

Content lives in `src/data/*.ts` — edit those to update the site, no component changes needed.

## Design tokens

Theme colors, typography scale, container spacing, and corner radii live in [`src/styles/tokens.css`](src/styles/tokens.css). Fluid heading and section spacing combine with responsive content layouts.

See [DESIGN.md](DESIGN.md) for the palette, information hierarchy, responsive behavior, theme initialization, and motion policy.

- Up to 850px: expandable mobile navigation.
- Up to 700px: stacked hero and selected project rows.
- Up to 650px: single-column skills and archive.
- Up to 550px: single-column About facts and certifications.
- Up to 500px: stacked experience dates.
- Container max-width: 1120px.

## Deployment

Hosted on GitHub Pages at [noah-mclain.github.io/portfolio-site](https://noah-mclain.github.io/portfolio-site/). Every push to `main` builds and deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (Pages source is set to **GitHub Actions** in the repo settings).

### Docker

For hosting anywhere else, the site ships as a container (multi-stage build → nginx):

```bash
docker compose up --build   # serves on http://localhost:8080
```

or `docker build -t portfolio . && docker run -p 8080:80 portfolio`.
