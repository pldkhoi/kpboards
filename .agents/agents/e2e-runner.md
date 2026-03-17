# E2E Runner Agent (Mirror)

Source: `.cursor/agents/e2e-runner.md`

Use when:
- creating or stabilizing Playwright journeys
- reproducing route-level regressions and flaky flows

Codex adaptation:
- prefer repository command `bun run test:e2e`
- keep selectors resilient (`role`, `label`, `data-testid`)
