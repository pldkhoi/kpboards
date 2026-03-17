---
name: Project Rules & Architecture
description: Comprehensive rules for the React 19 + Vite 7 + shadcn/Tailwind project setup. Always follow these guidelines when writing or modifying code.
---

# Project Stack & Architecture

- **React 19** with **React Compiler** (Babel)
- **Vite 7** dev server (port 3000) and bundler
- **TypeScript 5.9** (strict mode, baseUrl: `./src`)
- **shadcn/ui** + **Tailwind CSS 4** for styling
- **React Router 7** (useRoutes)
- **Zustand 5** for client state
- **TanStack React Query 5** for server state
- **React Hook Form 7** + Zod for forms
- **Axios 1** for HTTP (`src/utils/axios.ts`)
- **Vitest 4** for testing
- **Framer Motion 12** for animations
- **i18next 25** for internationalization
- **ESLint 9** Flat Config (`eslint.config.js`) + Prettier

## Conventions

1. **File Naming**: Always use **kebab-case** (`use-auth.ts`, `loading-screen.tsx`, `format-number.ts`).
2. **Component Naming**: PascalCase in code (`function LoadingScreen()`). No `React.FC`. Prefer interfaces over types for props.
3. **Imports**: Use `@/` alias for absolute paths (e.g., `@/components/logo`). Avoid `../../...` where possible.
4. **Styling**: Use Tailwind classes via `className` and `cn()`. Colors from CSS variables (e.g. `--primary`, `--background`). Environment variables prefix is `VITE_`.

## Common Patterns

### React 19 Compiler
- You must **rely on the React 19 Compiler** for rendering optimizations.
- Do NOT use `useMemo` or `useCallback` manually unless interacting with a third-party library that explicitly requires stable references, or escaping the compiler boundaries.

### API & Fetching (TanStack Query + Axios)
- Query hooks live in `src/hooks/` with `use-query-` prefix.
- Use configured Axios from `src/utils/axios.ts` (`sendGet`, `sendPost`, etc.). Do not use raw fetch or create new axios instances.
- The Axios interceptor automatically attaches the `Authorization: Bearer <token>` from `localStorage.getItem('accessToken')`.

### State Management (Zustand)
- Stores live in `src/store/`. Each store is a single file with explicit types for state and actions.

### Forms (React Hook Form + Zod)
- Use pre-built wrappers from `components/form/` (`FormProvider`, `RHFTextField`, etc.).
- Always define a Zod schema for validation.

### Testing (Vitest + RTL)
- **TDD Workflow**: Write failing test -> implement -> refactor.
- Target is 80% coverage.
- Component tests use `renderWithProviders` if theme/context is required. Use Vitest `describe`, `it`, `expect`. Mocking uses `vi.mock` and `vi.spyOn`.
