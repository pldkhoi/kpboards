# Testing Guide

## Overview

The project uses **Vitest 4** and **React Testing Library** for unit and component tests.

## Running Tests

```bash
yarn test           # Watch mode
yarn test --run     # Single run (CI)
yarn test:coverage  # With coverage report
```

## Test Structure

- **Unit tests**: `src/**/*.test.ts` — utilities, hooks, pure functions
- **Component tests**: `src/**/*.test.tsx` — React components

## Test Utilities

Use `renderWithProviders` and `createWrapperForRenderHook` from `src/test/test-utils`:

```typescript
import { renderWithProviders, screen } from '@/test/test-utils';

// Component test
renderWithProviders(<MyComponent />);
expect(screen.getByRole('button')).toBeInTheDocument();

// Hook test
import { renderHook } from '@testing-library/react';
import { createWrapperForRenderHook } from '@/test/test-utils';

const { result } = renderHook(() => useMyHook(), {
  wrapper: createWrapperForRenderHook(),
});
```

`renderWithProviders` wraps components with `QueryClientProvider` and `MemoryRouter`.

## Mocking

```typescript
import { vi } from 'vitest';

vi.mock('utils/axios', () => ({
  sendGet: vi.fn().mockResolvedValue({ data: [] }),
}));

vi.spyOn(console, 'error').mockImplementation(() => {});
```

## Coverage

Target: 80% lines, 70% branches. Run `yarn test:coverage` to verify.
