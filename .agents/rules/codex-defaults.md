# Codex Defaults

Use these defaults when applying `.agents` rules in Codex.

## Precedence

1. System/developer runtime instructions
2. Root `AGENTS.md`
3. `.agents/skills/project-rules/SKILL.md`
4. `.agents/workflows/*`
5. `.cursor/*` references

## Command Conventions

- Prefer `bun` commands for all local operations.
- Use repository scripts from `package.json` before ad-hoc CLI invocations.
- Avoid global installs unless explicitly requested.

## Safety & Scope

- Keep changes minimal and task-scoped.
- Prefer incremental verification: `type-check` -> `lint` -> tests -> build.
- Do not run destructive git/file operations unless explicitly requested.

## Context Loading

- Load targeted files only; do not bulk-load entire rule or skill trees.
- Start from `.agents` mirrors, then pull details from `.cursor` when needed.
