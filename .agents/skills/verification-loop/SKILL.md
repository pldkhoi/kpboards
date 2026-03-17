---
name: verification-loop
description: Multi-phase verification process for build, type-check, lint, and tests before finalizing code changes.
---

# Verification Loop (Mirror)

Source of truth: `.cursor/skills/verification-loop/SKILL.md`

## How to apply

1. Run verification in order: build, type-check, lint, tests.
2. Stop on first critical failure and fix before continuing.
3. Use repo commands:
   - `bun run build`
   - `bun run type-check`
   - `bun run lint`
   - `bun run test:run`
