---
description: Eval-driven workflow for defining, running, and reporting feature-level checks.
---

# Eval Workflow

Use command shape: `/eval [define|check|report|list|clean] [feature-name]`.

## Storage

- Definitions: `.agents/evals/<feature-name>.md`
- Run logs: `.agents/evals/<feature-name>.log`

## Actions

1. `define`: create an eval template with capability and regression checks.
2. `check`: execute checks, mark PASS/FAIL, append run notes.
3. `report`: generate a concise status report with pass rates and blockers.
4. `list`: show all definitions with current state.
5. `clean`: keep latest logs and remove stale run artifacts.

## Verification Commands

- `bun run test:run`
- `bun run build`
- `bun run type-check`

Use only commands relevant to the target feature.
