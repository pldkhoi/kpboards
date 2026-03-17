---
description: Sequential multi-role workflow for complex tasks (feature, bugfix, refactor, security).
---

# Orchestrate Workflow

Use this workflow when a task is too large for a single linear pass.

## Workflow Types

- `feature`: planner -> tdd-guide -> code-reviewer -> security-reviewer
- `bugfix`: planner -> implementation -> code-reviewer
- `refactor`: architect -> implementation -> code-reviewer
- `security`: security-reviewer -> code-reviewer -> architect

## Execution Rules

1. Create a concise handoff after each phase:
   - context
   - findings
   - files touched
   - open risks
2. Run verification between phases when behavior changes:
   - `bun run type-check`
   - `bun run lint`
3. Final gate for production-ready output:
   - `bun run type-check`
   - `bun run lint`
   - `bun run build`
   - `bun run test:run`

## Output

Return one orchestration report:

- workflow type
- step summaries
- files changed
- verification status
- remaining blockers
