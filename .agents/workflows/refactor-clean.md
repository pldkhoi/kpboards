---
description: Safely remove dead code and unused dependencies with verification gates.
---

# Refactor Clean Workflow

1. Run dead-code discovery:
   - `bun run knip`
   - `bun run type-check`
2. Classify findings:
   - `SAFE`: unused test helpers, clearly orphaned utilities
   - `CAUTION`: shared components, hooks, exported types
   - `DANGER`: entrypoints, config, routing, auth/session code
3. Apply deletions in small batches.
4. After each batch, run:
   - `bun run type-check`
   - `bun run test:run`
5. Stop and roll back the batch if verification fails.
6. Produce a short cleanup summary (files removed, deps removed, risk notes).

Never remove code without verification.
