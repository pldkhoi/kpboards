---
description: Sync repository documentation from current scripts, env config, and runtime behavior.
---

# Update Docs Workflow

1. Read source-of-truth inputs:
   - `package.json` scripts
   - `.env.example`
   - relevant implementation files touched by the task
2. Update or create documentation under `docs/`:
   - contributor/developer flow
   - script catalog
   - environment variable reference
   - troubleshooting notes for recent changes
3. Prefer updating existing docs over adding duplicate pages.
4. Validate command examples against this repo (`bun` first).
5. Report stale docs (not touched recently and no longer accurate) for removal review.

Use concise docs that reflect current code, not aspirational behavior.
