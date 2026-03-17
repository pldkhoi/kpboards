# Build and Fix

Incrementally fix TypeScript, Vite build, and ESLint errors:

1. Run build: `yarn build`

2. Parse error output:
   - Group by file
   - Sort by severity (TS errors > ESLint errors > warnings)

3. For each error:
   - Show error context (5 lines before/after)
   - Explain the issue
   - Propose fix
   - Apply fix
   - Re-run build
   - Verify error resolved

4. Also check:
   - `yarn lint` for ESLint 9 flat config errors
   - Dev server overlay (`vite-plugin-checker`) for real-time errors

5. Stop if:
   - Fix introduces new errors
   - Same error persists after 3 attempts
   - User requests pause

6. Show summary:
   - Errors fixed
   - Errors remaining
   - New errors introduced

Fix one error at a time for safety!
