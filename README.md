# kpboards — React Template

[![Build](https://github.com/your-username/kpboards/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/kpboards/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Production-ready template for building modern web applications with React 19, Vite 7, TypeScript, shadcn/ui, and Tailwind CSS 4.

## Features

- **React 19** with React Compiler (Babel)
- **Vite 7** — lightning-fast dev server and optimized builds
- **TypeScript 5.9** — strict mode enabled
- **shadcn/ui + Tailwind CSS 4** — utility-first styling, CSS variables, dark mode
- **TanStack React Query** — server state management with devtools
- **Zustand** — lightweight client state management
- **React Hook Form + Zod** — form handling with validation
- **React Router 7** — route definitions
- **Axios** — HTTP client with interceptors (auth, error handling)
- **i18next** — internationalization with language detection
- **Framer Motion** — animations and transitions
- **PWA** — Progressive Web App with offline support
- **ESLint 9** — flat config with React Compiler, TypeScript rules
- **Prettier** — consistent code formatting
- **Husky + lint-staged** — pre-commit hooks
- **Vitest 4** — unit and component testing
- **Docker** — multi-stage build with nginx
- **GitHub Actions CI** — lint, type-check, build, test

## Template Highlights

- **TanStack ecosystem** — Table (headless tables), Virtual (virtualization)
- **TipTap** — Rich text editor
- **dnd-kit** — Drag-and-drop (sortable lists)
- **cmdk** — Command palette (Cmd+K)
- **Recharts** — Charts (line, bar, pie)
- **Storybook** — Component documentation
- **knip** — Dead code and unused dependency detection

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/kpboards.git
cd kpboards

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Boilerplate Specification

See **[docs/BOILERPLATE.md](docs/BOILERPLATE.md)** for:

- **24/7 autonomous development** instructions and Cursor settings
- **Component inventory** with usage examples (UI, forms, tables, charts, etc.)
- **Page templates** — admin dashboard, component showcase, auth
- **UI/UX design system** — colors, fonts, spacing (2026 best practices)
- **Programming conventions** and performance guidelines

## Template Usage

To use this as a starting point for a new project:

1. Clone or fork the repo
2. Update `package.json` name and description
3. Copy `.env.example` to `.env` and set your API endpoints
4. Customize `src/config.ts`, routes, and pages
5. Replace placeholder content in features and pages

## Available Scripts

| Script                    | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `bun dev`                 | Start dev server on port 3000                            |
| `bun run build`           | Production build                                         |
| `bun run preview`         | Preview production build                                 |
| `bun run lint`            | Run ESLint                                               |
| `bun run lint:fix`        | Auto-fix ESLint issues                                   |
| `bun run prettier`        | Format code with Prettier                                |
| `bun run type-check`      | TypeScript type checking                                 |
| `bun test`                | Run tests with Vitest                                    |
| `bun run test:coverage`   | Run tests with coverage report                           |
| `bun run test:e2e`        | Run Playwright E2E tests                                 |
| `bun run build:analyze`   | Build with bundle analyzer (generates `dist/stats.html`) |
| `bun run knip`            | Find dead code and unused dependencies                   |
| `bun run storybook`       | Start Storybook on port 6006                             |
| `bun run build-storybook` | Build static Storybook                                   |

## Project Structure

```
src/
├── assets/         # Static assets (icons, images, animations)
├── components/     # Reusable UI components
│   ├── animate/    # Framer Motion wrappers
│   ├── form/       # React Hook Form + shadcn wrappers
│   ├── nav-section/# Navigation components
│   ├── settings/   # Theme settings drawer
│   ├── table/      # Table components
│   ├── ui/         # shadcn UI primitives
│   └── upload/     # File upload components
├── config.ts       # App configuration and env vars
├── contexts/       # React contexts (Auth, Settings)
├── guards/         # Route guards (Auth, Guest, Role-based)
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts (Main, Dashboard, LogoOnly)
├── locales/        # i18n translations
├── pages/          # Route pages
├── routes/         # Route definitions and paths
├── features/       # Page-specific feature sections
├── services/       # API service layer
├── store/          # Zustand store
├── test/           # Test setup and utilities
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Customization

### Theme

Tailwind and shadcn theming is configured in `src/index.css`:

- **CSS variables** — `--primary`, `--background`, etc. for colors
- **Dark mode** — `.dark` class on `<html>`
- **Settings** — Dark/light mode, RTL, color presets via Settings drawer

See [docs/THEMING.md](docs/THEMING.md) for details.

### Authentication

JWT authentication is built-in with:

- Login/logout flow with token refresh
- Auth guards for protected routes
- Guest guards for public-only routes
- Role-based access control

See [docs/AUTH.md](docs/AUTH.md) for details.

### Forms

Pre-built React Hook Form + shadcn wrapper components:

- `RHFTextField`, `RHFSelect`, `RHFCheckbox`, `RHFRadioGroup`
- `RHFDatePicker`, `RHFTimePicker`, `RHFAutocomplete`
- `RHFUpload`, `RHFSwitch`, `RHFNumberField`
- Zod validation schemas

See [docs/FORMS.md](docs/FORMS.md) for usage patterns.

### Testing

- **Vitest 4** + **React Testing Library**
- Use `renderWithProviders` from `src/test/test-utils`
- Run `bun test` or `bun run test:coverage`

See [docs/TESTING.md](docs/TESTING.md) for details. E2E tests use Playwright — run `bun run test:e2e` (see [docs/E2E.md](docs/E2E.md)).

### Accessibility

Accessible by default via shadcn components (semantic HTML, ARIA, keyboard nav). ESLint `jsx-a11y` rules help catch issues.

## Documentation

| Doc                                          | Description                        |
| -------------------------------------------- | ---------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture overview              |
| [docs/AUTH.md](docs/AUTH.md)                 | Authentication guide               |
| [docs/FORMS.md](docs/FORMS.md)               | Form components and patterns       |
| [docs/THEMING.md](docs/THEMING.md)           | Theming and RTL                    |
| [docs/API.md](docs/API.md)                   | API client and error handling      |
| [docs/TESTING.md](docs/TESTING.md)           | Testing guide                      |
| [docs/E2E.md](docs/E2E.md)                   | E2E testing with Playwright        |
| [docs/COMPONENTS.md](docs/COMPONENTS.md)     | Component catalog                  |
| [docs/HOOKS.md](docs/HOOKS.md)               | Hooks catalog                      |
| [docs/TABLES.md](docs/TABLES.md)             | Tables (TanStack Table, use-table) |
| [docs/CHARTS.md](docs/CHARTS.md)             | Charts (Recharts)                  |
| [docs/EDITOR.md](docs/EDITOR.md)             | Rich text editor (TipTap)          |
| [docs/DRAG_DROP.md](docs/DRAG_DROP.md)       | Drag-and-drop (dnd-kit)            |
| [docs/STORYBOOK.md](docs/STORYBOOK.md)       | Storybook guide                    |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)     | Deployment guides                  |

## Environment Variables

All environment variables must be prefixed with `VITE_`. See `.env.example` for available variables.

> **Important**: `VITE_` variables are embedded in the client bundle and visible to users. Never put secrets here.

## Deployment

### Vercel / Netlify

```bash
bun run build
# Deploy the `dist/` folder
```

### Docker

```bash
docker build -t my-app .
docker run -p 80:80 my-app
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed guides.

## Tech Stack

| Category        | Technology                 |
| --------------- | -------------------------- |
| Framework       | React 19                   |
| Build Tool      | Vite 7                     |
| Language        | TypeScript 5.9             |
| UI              | shadcn/ui + Tailwind CSS 4 |
| Server State    | TanStack React Query       |
| Client State    | Zustand                    |
| Forms           | React Hook Form + Zod      |
| Routing         | React Router 7             |
| HTTP Client     | Axios                      |
| i18n            | i18next                    |
| Animations      | Framer Motion              |
| Icons           | Lucide + Iconify           |
| Toasts          | Sonner                     |
| Dates           | Day.js                     |
| Testing         | Vitest 4 + Testing Library |
| Linting         | ESLint 9 + Prettier        |
| Git Hooks       | Husky + lint-staged        |
| PWA             | vite-plugin-pwa            |
| Tables          | TanStack Table + Virtual   |
| Rich Text       | TipTap                     |
| Drag-Drop       | dnd-kit                    |
| Command Palette | cmdk                       |
| Charts          | Recharts                   |
| Component Docs  | Storybook                  |
| Dead Code       | knip                       |

## License

MIT
