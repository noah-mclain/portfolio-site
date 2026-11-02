# Nada Ahmed's portfolio

My corner of the web for the things I build, the work I've done, and what I'm learning along the way. I'm an AI/ML engineer based in Cairo, mostly working with agents and LLM systems.

The site brings together my projects, experience, and a few ways to get in touch.

**Address:** [nadaa.dev](https://nadaa.dev/)

The address is connected to GitHub Pages through Namecheap.

## Run it locally

You'll need Node.js 20 and npm.

```bash
npm ci
npm run dev
```

Vite prints the local address, usually `http://localhost:5173`.

To check or preview the production build:

```bash
npm run lint     # TypeScript checks
npm run build    # writes the site to dist/
npm run preview  # serves the built site locally
```

## Finding your way around

Built with React 18, TypeScript, and Vite, with CSS Modules for styling and Lucide for icons.

- [`src/data/`](src/data/) holds the profile, projects, skills, education, and experience. Most content updates happen here.
- [`src/components/`](src/components/) contains the page sections, navigation, and shared UI.
- [`src/hooks/`](src/hooks/) handles theme preferences and active navigation.
- [`src/styles/tokens.css`](src/styles/tokens.css) is the starting point for changing colors, fonts, and spacing.
- [`public/`](public/) holds files served directly, including the downloadable CV.

## Publishing

GitHub Pages hosts the site. Each push to `main` builds and deploys it through [the deployment workflow](.github/workflows/deploy.yml). In the repository's Pages settings, the source is **GitHub Actions** and the custom domain is `nadaa.dev`.

Namecheap manages the DNS records. GitHub handles the TLS certificate once DNS validation and certificate issuance complete; HTTPS enforcement can then be enabled in Pages settings. Because deployment uses GitHub Actions, a `CNAME` file isn't required.

## Running it with Docker

There's also a Docker setup that builds the site and serves it with nginx:

```bash
docker compose up --build
```

Open `http://localhost:8080` once the container is running.
