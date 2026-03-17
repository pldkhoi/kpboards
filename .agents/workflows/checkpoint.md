---
description: Create or verify a checkpoint to safely save state during complex feature development.
---

# Checkpoint Workflow

Follow these steps to manage git-based checkpoints during feature development. This allows the user to safely rollback or compare progress.

## When asked to CREATE a checkpoint (e.g., "create checkpoint feature-start"):
1. **Verify State**: Run `bun run type-check` to ensure the current state is somewhat stable (even if tests are failing, types should ideally pass).
2. **Git Commit/Stash**: Create a git commit with the checkpoint name, or stash changes if the user prefers not to commit yet.
   `git add . && git commit -m "checkpoint: [name]"`
3. **Log Checkpoint**: 
   Log the commit SHA and name to a local file, e.g., `.agents/checkpoints.log`.

## When asked to VERIFY against a checkpoint (e.g., "verify checkpoint feature-start"):
1. **Compare Git Diff**: Run `git diff [checkpoint-commit-sha] --stat` to see what files changed.
2. **Run Tests**: Run `bun run test:run` and `bun run type-check`.
3. **Report**: Produce a markdown summary comparing the current state to the checkpoint.
   - Files changed
   - Build status (Pass/Fail)
   - Test count
