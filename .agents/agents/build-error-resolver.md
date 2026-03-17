# Build Error Resolver Agent (Mirror)

Source: `.cursor/agents/build-error-resolver.md`

Use when:
- `type-check`, lint, or build is failing
- minimal-diff fixes are required to restore green CI

Codex adaptation:
- replace legacy commands with Bun:
  - `bun run type-check`
  - `bun run lint`
  - `bun run build`
