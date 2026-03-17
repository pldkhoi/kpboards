# Library Usage Guide

Template-specific usage guidance for the installed stack.

## React 19 + Vite 7 + TypeScript

- Use route-level lazy loading for pages.
- Keep strict types for page/service/hook contracts.
- Prefer function components and explicit props interfaces.

## shadcn/ui + Tailwind

- Keep `src/components/ui` primitive-only.
- Build app behavior in wrappers (`src/components/*`).
- Reuse `PageHeader`, `PageBreadcrumbs`, and table/form wrappers for consistency.

## React Router

- Define path constants in `src/routes/paths.tsx`.
- Define lazy route entries in `src/routes/index.tsx`.
- Keep auth/admin intent explicit through `AuthGuard` and admin layout wrapper.

## TanStack Query

- Keep query keys centralized and stable.
- Use list/detail hooks for read flows and mutation hooks for create/update/delete.
- Invalidate by resource key after successful mutations.

## React Hook Form + Zod

- Use Zod for runtime-safe validation and typed form values.
- Compose forms around RHF context and reusable field wrappers.
- Keep server errors mapped to field-level or form-level messages.

## Axios Service Layer

- Use `src/services/api-client.ts` exports (`sendGet`, `sendPost`, etc.).
- Keep endpoint paths in `endpoints.ts` files.
- Keep service functions thin and type-safe.

## i18next

- Store translation keys in `src/locales/*.ts`.
- Avoid hardcoded UI copy in reusable components.
- Keep fallback language deterministic.

## Framer Motion

- Use for targeted UX enhancement, not decorative overuse.
- Wrap heavy animation entry points with existing motion helpers.

## Zustand

- Use only for client-global UI/session state that does not fit context/query.
- Avoid duplicating server state that belongs in TanStack Query.

## Vitest + Playwright

- Unit/integration: `vitest` under `src/**/*.{test,spec}.{ts,tsx}`
- E2E: Playwright under `e2e/**`
- Keep commands separated in CI and local verify pipelines.

## Storybook

- Use for UI primitive and pattern documentation.
- Keep stories focused, deterministic, and token-consistent.

## Common Anti-Patterns

- Business logic in `ui` primitives
- Unstable query keys
- Relative import sprawl (`../../..`)
- Route constants duplicated as inline strings
- Forms without schema validation
