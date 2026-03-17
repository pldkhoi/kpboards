---
description: Extract reusable patterns from completed work and save them as local Codex skills.
---

# Learn Workflow

Run this after solving a non-trivial bug, refactor, or architecture problem.

1. Identify a reusable pattern:
   - root cause category
   - repeatable fix/workflow
   - trigger signals
2. Create a focused learned skill at:
   - `.agents/skills/learned/<pattern-name>/SKILL.md`
3. Keep one pattern per skill and include:
   - Problem
   - Solution steps
   - Minimal example
   - When to use
4. Validate the skill by applying it once to a similar local case.

Default behavior is autonomous save (no manual confirmation required) unless the user asks for dry-run mode.
