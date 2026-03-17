---
name: autonomous-builder-pro
description: Execute frontend work autonomously with a phased workflow for function builds, page refactors, and larger tasks. Use when the user asks for autonomous implementation, frontend refactor, page redesign, component work, or "do everything and I will review at the end."
---

# Autonomous Builder Pro

Use this skill to convert a request into a complete implementation loop:

Think -> Plan -> Do -> Review -> Test -> Report

Always align with:

- `.cursor/rules/autonomous-workflow.mdc`
- `.cursor/rules/frontend-autonomous-loop.mdc`
- `.cursor/rules/frontend-definition-of-done.mdc`
- `.cursor/rules/ui-ux-pro-max.mdc`

## Quick Start

1. Classify task size: **Function**, **Page**, or **Large Task**
2. Apply matching playbook below
3. Run required checks before delivery
4. Report what changed, why, and any remaining blockers

## Playbook: Function Work

Use for utility functions, hooks, handlers, service functions, or focused component logic.

Checklist:

- Clarify input/output contract and edge cases
- Keep diff minimal and typed (no implicit `any`)
- Prefer pure functions; isolate side effects
- Add/update tests near changed behavior when practical
- Run checks:
  - `bun run type-check`
  - `bun run lint`
  - `bun run test:run` (targeted if possible)
  - `bun run build` for risky/shared paths

Done criteria:

- Behavior is correct and typed
- No lint/type regressions
- Tests cover the changed behavior

## Playbook: Page Work

Use for landing pages, dashboards, CRUD screens, or section-heavy page refactors.

Checklist:

- Improve structure first: hierarchy, spacing rhythm, content order
- Use reusable primitives/wrappers before adding new abstractions
- Implement states: loading, empty, error, success (if relevant)
- Ensure accessibility:
  - keyboard flow
  - visible focus states
  - proper labels/roles
  - WCAG AA-conscious contrast
- Ensure responsive behavior at:
  - 320px
  - 768px
  - 1024px
- Replace hardcoded user-facing text with i18n keys where needed
- Run checks:
  - `bun run type-check`
  - `bun run lint`
  - `bun run build`
  - `bun run test:run`
  - `bun run test:e2e` (UI/route changes)

Done criteria:

- Professional UI/UX quality and interaction polish
- Accessibility and responsive checks pass
- Validation gates pass (or blocker documented with evidence)

## Playbook: Large Task (Multi-Phase)

Use for module-level refactors, template upgrades, or roadmap items.

Phase loop:

1. Define phases with acceptance criteria
2. Mark one todo as `in_progress`
3. Implement phase without waiting for repeated approval
4. Validate phase results
5. Mark phase `completed`, move next todo to `in_progress`
6. Continue until all todos are completed

Verification loop per phase:

1. Run relevant checks (type/lint/tests/build as needed)
2. Review for regressions and duplication
3. Fix findings before next phase

Final gate:

- `bun run type-check`
- `bun run lint`
- `bun run build`
- `bun run test:run`
- `bun run test:e2e` when UI/routes changed (or document environment blocker)

## Prompt Templates

Use these directly in Cursor.

### 1) Function template

```text
Autonomous, implement/refactor function [TARGET].

Requirements:
- Keep strict typing and pure-function behavior where possible
- Add/update tests for changed behavior
- Run: bun run type-check, bun run lint, bun run test:run
- Run bun run build if shared/core path is touched

Deliver:
- what changed
- edge cases handled
- verification results
```

### 2) Page template

```text
Autonomous, refactor page [TARGET] to PRO quality.

Requirements:
- Improve hierarchy, spacing, typography, CTA clarity
- Add polished hover/focus/transition states
- Ensure WCAG AA-conscious contrast and responsive behavior (320/768/1024)
- Keep existing routes and intent stable
- Run: bun run type-check, bun run lint, bun run build, bun run test:run, bun run test:e2e

Deliver:
- key UI/UX improvements
- reuse/maintainability improvements
- verification results
```

### 3) Large task template

```text
Autonomous, implement [GOAL] in phases and finish end-to-end.

Rules:
- Plan first, then execute without repeated approval
- Track todos sequentially (one in_progress at a time)
- Do not stop until all todos are completed
- Run final gates: bun run type-check, bun run lint, bun run build, bun run test:run, bun run test:e2e (if UI/routes changed)

Deliver:
- phase-by-phase summary
- important file highlights
- final verification status and blockers (if any)
```

## Anti-Patterns to Avoid

- Stopping after analysis when implementation was requested
- Creating duplicate abstractions where existing primitives/wrappers work
- Skipping focus-visible/keyboard accessibility
- Skipping verification gates
- Claiming completion while todos remain pending

## Companion Skills

- For admin entity/module scaffolding and CRUD page rollouts, use:
  - `.cursor/skills/admin-crud-module-pro/SKILL.md`

## Output Format (Recommended)

1. What changed
2. Why it improves quality/maintainability
3. Validation command results
4. Follow-up recommendations
