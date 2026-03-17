/# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the application code. Use `src/components/` for reusable UI, `src/features/` for feature-level sections, `src/pages/` for route screens, `src/layouts/` for shared shells, `src/hooks/` for custom hooks, `src/services/` for API/mock service logic, and `src/routes/` for routing. Shared utilities live in `src/utils/`, types in `src/types/`, translations in `src/locales/`, Storybook stories in `src/stories/`, and test helpers in `src/test/`. Static assets are under `public/` and `src/assets/`.

## Build, Test, and Development Commands
- `bun dev` or `bun start`: run the Vite dev server locally.
- `bun run build`: create a production build.
- `bun run type-check`: run strict TypeScript checks without emitting files.
- `bun run lint` / `bun run lint:fix`: run ESLint, optionally with autofix.
- `bun run prettier` / `bun run format:check`: format or verify formatting.
- `bun run test:run`: run Vitest once.
- `bun run test:e2e`: run Playwright end-to-end tests.
- `bun run storybook`: start Storybook for UI review.
- `bun run verify`: run the main validation pipeline.

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, and the existing Prettier + ESLint setup. File names should be `kebab-case` like `loading-screen.tsx`; React components should be PascalCase like `LoadingScreen`. Prefer `@/` imports over deep relative paths. Keep shared UI in `src/components/ui/`, avoid ad hoc styling patterns, and reuse the theme/token system instead of hardcoding colors where possible.

## Testing Guidelines
Unit and component tests use Vitest with Testing Library; end-to-end tests use Playwright. Name test files `*.test.ts`, `*.test.tsx`, or `*.spec.tsx`. Coverage is configured in Vite with thresholds of 75% lines and 65% branches. Run `bun run test:run` before opening a PR, and add/update tests when changing shared components, hooks, or service behavior.

## Commit & Pull Request Guidelines
The Git history uses Conventional Commit-style messages such as `feat(ui-ux): ...`, `feat(ts): ...`, and `feat(refactor): ...`. Follow the same pattern: `type(scope): summary`. PRs should include a short problem/solution summary, linked issues when applicable, screenshots or screen recordings for UI changes, and the commands you ran (`lint`, `type-check`, tests, build).

## Security & Configuration Tips
Client-exposed environment variables must use the `VITE_` prefix. Do not commit secrets. Prefer the existing Axios/query hooks in `src/services/` and `src/hooks/` instead of creating new fetch patterns. Validate persisted settings and user input with the existing Zod-based flows.
