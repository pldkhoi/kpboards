---
name: testing-patterns
description: Testing patterns and requirements using Vitest and React Testing Library. Use this when writing unit tests or component tests.
---

# Testing Patterns (Vitest + RTL)

## Framework & Tooling
- **Vitest 4** (`bun run test`) is the framework, replacing Jest.
- **React Testing Library 16** (`@testing-library/react`) for component logic.
- Target minimum coverage: **80%**.

## Unit Tests (Utilities & Hooks)
- Group tests with `describe` and use `it` for individual cases.
- Mock external modules using `vi.mock('path/to/module')`.
- Example for formatting utilities: Focus on edge cases (null, empty strings, boundary values).

## Component Tests
- Use `renderWithProviders` from `src/test/test-utils` — it wraps QueryClientProvider and MemoryRouter. No MUI ThemeProvider (project uses shadcn/Tailwind).
- Provide AuthProvider or SettingsProvider in the wrapper if the component depends on them.
- Favor querying by Role (`getByRole('button', { name: /submit/i })`) or Text over test IDs unless necessary.

## Hook Tests (TanStack Query 5)
- Use `renderHook` from `@testing-library/react`.
- When testing hooks that use `useQuery` or `useMutation`, wrap the hook in a `QueryClientProvider` with a fresh `QueryClient` that has `{ retry: false }` configured to prevent test hangs. Clear the cache between tests using `QueryClient.clear()`.

## Edge Cases to Cover
Always brainstorm and test:
1. Null/undefined inputs
2. Empty arrays/strings/objects
3. Error states (network failures, mocked Axios rejections (`vi.mocked(axios.get).mockRejectedValueOnce(...)`))
4. Loading states and transitions
