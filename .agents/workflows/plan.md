---
description: Restate requirements, assess risks, and create a step-by-step implementation plan for complex features.
---

# Plan Workflow

Use this workflow to structure planning before implementing complex code changes.

1. **Restate Requirements**: Actively read the user's prompt and rewrite what needs to be built in clear, technical terms.
2. **Identify Dependencies**: Check existing files (`src/components`, `src/hooks`, `src/store`) to see what can be reused.
3. **Break Down into Phases**:
   - Phase 1: State / API / Schema (Zustand, TanStack Query, Types).
   - Phase 2: Core Components (shadcn/Tailwind UI development).
   - Phase 3: Integration (Connecting UI to State).
   - Phase 4: Testing (Vitest & RTL).
4. **Assess Risks**: List potential blockers (e.g., missing API endpoints, complex form validations, performance bottlenecks).
5. **Output**: Write the detailed plan to `implementation_plan.md` in the project root or current artifacts location.
6. **Execution Handoff**: Move directly to implementation unless the user explicitly requested planning-only output.
