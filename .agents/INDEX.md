# Codex Agent Assets

This folder is the Codex-native mirror of `.cursor/`.

## Structure

- `rules/`: execution rules and precedence for Codex runs.
- `workflows/`: command-style playbooks (Cursor `/commands` mirror).
- `agents/`: role prompts (Cursor `/agents` mirror).
- `skills/`: Codex skills and bridge wrappers.

## Source of Truth

Use `.cursor/` as the canonical source and keep `.agents/` in sync:

- `.cursor/rules/*.mdc`
- `.cursor/commands/*.md`
- `.cursor/agents/*.md`
- `.cursor/skills/*/SKILL.md`

## Package Manager Normalization

This repository is Bun-first (`packageManager: bun@1.3.3`). Translate command docs accordingly:

- `yarn build` -> `bun run build`
- `yarn lint` -> `bun run lint`
- `yarn test` -> `bun run test`
- `npx tsc --noEmit` -> `bun run type-check`

## Execution Policy

Run these assets autonomously in Codex unless a change is destructive or requires privileged escalation.
