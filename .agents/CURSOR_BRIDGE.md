# Cursor to Codex Bridge

This repository keeps Cursor assets in `.cursor/` and Codex-native assets in `.agents/`.

Use this bridge to avoid duplicating logic and to keep behavior consistent across tools.

## Source of Truth

- Cursor rules: `.cursor/rules/*.mdc`
- Cursor commands: `.cursor/commands/*.md`
- Cursor agent prompts: `.cursor/agents/*.md`
- Cursor skills: `.cursor/skills/*/SKILL.md`

## Codex Equivalents

- Codex rules: `.agents/rules/*.md`
- Codex workflows: `.agents/workflows/*.md`
- Codex agents: `.agents/agents/*.md`
- Codex skills: `.agents/skills/*/SKILL.md`

## Command Translation

Cursor command docs use mixed package managers (`yarn`, `npm`, `pnpm`).
For this repo, always translate command examples to `bun` when executing:

- `yarn build` -> `bun run build`
- `yarn lint` -> `bun run lint`
- `yarn test` -> `bun run test`
- `npx tsc --noEmit` -> `bun run type-check`

## Priority Order

When instructions conflict, apply in this order:

1. System/developer constraints from Codex runtime
2. Root `AGENTS.md`
3. `.agents/skills/project-rules/SKILL.md`
4. `.agents/workflows/*`
5. `.cursor/*` references (as guidance)

## Maintenance

When `.cursor` assets change, update matching `.agents` rules/workflows/agents/skills in the same PR.
