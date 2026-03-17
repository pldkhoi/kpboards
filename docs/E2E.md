# E2E Testing with Playwright

## Setup

```bash
bun install
bunx playwright install chromium  # Install Chromium (run once)
```

## Run E2E Tests

```bash
bun run test:e2e
```

- **With dev server running**: Config uses `reuseExistingServer: true` — E2E runs against `http://localhost:3000`
- **Without dev server**: Playwright starts `bun dev` automatically

## Tests

- `e2e/smoke.spec.ts` — Home page load
- `e2e/app.spec.ts` — Home, login, admin dashboard, admin users, dashboard, documents

## CI

In CI, set `CI=true`. Playwright will:

- Not reuse an existing server
- Retry failed tests up to 2 times
- Run with 1 worker

## Smoke Test

`e2e/smoke.spec.ts` verifies the home page loads. Add more specs under `e2e/` for critical user flows.
