---
description: Standardize package-manager behavior for this repository.
---

# Package Manager Setup Workflow

This project is Bun-first.

1. Verify package manager metadata:
   - `package.json` includes `\"packageManager\": \"bun@...\"`
   - `bun.lock` or `bun.lockb` is present and current
2. Normalize command docs/examples to Bun:
   - `bun install`
   - `bun start` or `bun dev`
   - `bun run <script>`
3. Remove contradictory package-manager instructions from local docs/workflows.
4. Validate with:
   - `bun run type-check`
   - `bun run lint`
   - `bun run build`

Only keep npm/pnpm/yarn references when documenting interoperability.
