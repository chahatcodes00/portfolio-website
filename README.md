# Portfolio Website

**Live site:** [chahatrsrathour.com.np](https://chahatrsrathour.com.np/)

## Features

- **Hero** — animated terminal intro with a rotating tech stack (AWS, Terraform, Docker, CI/CD, Linux)
- **About** — background and focus areas
- **Projects** — cards pulled from a central data file, each with status, description, stack, and links to the source repo / live demo
- **Contact** — ways to get in touch
- **Responsive, single-page layout** with a sticky navbar and footer

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [ESLint](https://eslint.org/) for linting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/chahatcodes00/portfolio-website.git
cd portfolio-website
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement. Open the printed local URL in your browser.

### Build

```bash
npm run build
```

Produces an optimized production build in `dist/`.

### Preview

```bash
npm run preview
```

Serves the production build locally so you can sanity-check it before deploying.

### Lint

```bash
npm run lint
```

## Project Structure

```
├── public/              # Static assets (favicon, icons, logo)
├── src/
│   ├── components/      # Navbar, Hero, About, Projects, ProjectCard, Contact, Footer, Terminal, icons
│   ├── data/             # Project content (projects.js)
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Page composition
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles / Tailwind entry
├── index.html
├── vite.config.js
└── package.json
```

## Updating Projects

Project cards are data-driven. To add or edit one, update the `projects` array in `src/data/projects.js` — each entry supports a title, description, status, tech stack, repo URL, and optional live URL.

## License

No license has been specified for this project.

## Contact

Chahat R.S. Rathour — [GitHub](https://github.com/chahatcodes00) · [chahatrsrathour.com.np](https://chahatrsrathour.com.np/)
