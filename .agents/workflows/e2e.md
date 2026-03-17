---
description: Generate and run end-to-end tests for critical user journeys with Playwright.
---

# E2E Workflow

Use this workflow for route and user-flow validation.

## Steps

1. Identify critical journey:
   - entry route
   - user actions
   - expected state transitions
2. Add/update Playwright tests under `tests/` or existing e2e path.
3. Prefer resilient selectors (`role`, `label`, `data-testid`), not brittle CSS.
4. Run tests:
   - `bun run test:e2e`
5. On failure, capture and summarize:
   - failing step
   - expected vs actual behavior
   - actionable fix

## Minimum Coverage for UI Changes

- navigation works
- key form interaction works
- success/empty/error state can be reached

## Report

- test files added/updated
- pass/fail result
- flaky or blocked scenarios
