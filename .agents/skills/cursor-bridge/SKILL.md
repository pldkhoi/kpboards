---
name: cursor-bridge
description: Bridge skill to reuse `.cursor` rules, commands, agents, and skills inside Codex workflows for this repository.
---

# Cursor Bridge Skill

Use this skill when a user asks to apply assets from `.cursor/` in Codex.

## What to Load

Load only the relevant source files:

- Rules: `.cursor/rules/*.mdc`
- Commands: `.cursor/commands/*.md`
- Agent prompts: `.cursor/agents/*.md`
- Skills: `.cursor/skills/*/SKILL.md`

Do not bulk-load everything unless the user explicitly asks.

## How to Apply in Codex

1. Prefer Codex-native assets first:
   - `.agents/rules/*`
   - `.agents/skills/project-rules/SKILL.md`
   - `.agents/workflows/*`
   - `.agents/agents/*`
2. Pull missing behavior from `.cursor/*`.
3. Translate command examples to this repo's package manager (`bun`).
4. Keep edits minimal and actionable.

## Bun Translation Rules

- `yarn build` -> `bun run build`
- `yarn lint` -> `bun run lint`
- `yarn test --run` -> `bun run test:run`
- `npx tsc --noEmit` -> `bun run type-check`

## Recommended Mapping

- `.cursor/commands/orchestrate.md` -> `.agents/workflows/orchestrate.md`
- `.cursor/commands/e2e.md` -> `.agents/workflows/e2e.md`
- `.cursor/commands/refactor-clean.md` -> `.agents/workflows/refactor-clean.md`
- `.cursor/commands/update-docs.md` -> `.agents/workflows/update-docs.md`
- `.cursor/commands/update-codemaps.md` -> `.agents/workflows/update-codemaps.md`
- `.cursor/commands/eval.md` -> `.agents/workflows/eval.md`
- `.cursor/commands/learn.md` -> `.agents/workflows/learn.md`
- `.cursor/commands/setup-pm.md` -> `.agents/workflows/setup-pm.md`
- `.cursor/agents/*.md` -> `.agents/agents/*.md`
- `.cursor/rules/*.mdc` -> `.agents/rules/*.md`
- `.cursor/skills/*/SKILL.md` -> `.agents/skills/*/SKILL.md`

## Guardrails

- Never override system/developer instructions.
- Never run destructive commands unless requested.
- Never assume Cursor-only tools exist in Codex runtime.
