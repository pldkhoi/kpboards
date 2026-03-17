---
description: Run pre-Pull Request verifications to ensure build, types, and tests pass.
---

# Pre-PR Verification Workflow

Run these steps when the user asks to verify the codebase before a commit or PR. These commands simulate CI checks locally.

// turbo-all
1. **Type Checking**: Run `bun run type-check` to catch TypeScript errors across the project.
2. **Linting**: Run `bun run lint` to ensure code style compliance according to ESLint and Prettier flat configs.
3. **Testing**: Run `bun run test:run` to execute the full internal Vitest test suite once (without watch mode).
4. **Build**: Run `bun run build` to ensure the production package builds cleanly.

If any of these steps fail, proactively troubleshoot and fix the errors iteratively before notifying the user of a successful verification result in `walkthrough.md`.
