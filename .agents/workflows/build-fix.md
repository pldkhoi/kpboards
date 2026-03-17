---
description: Incrementally fixes TypeScript, Vite, and ESLint errors one at a time when the build is broken.
---

# Build Fix Workflow

If the build is failing or the user asks to fix the build, follow this systematic approach to safely restore the project:

1. **Assess the Damage**: Run `bun run type-check`, `bun run lint`, and `bun run build` to capture the complete list of errors.
2. **Prioritize by Type**:
   - **Fix TypeScript first**: Type errors usually cascade into build and lint errors. Address `bun run type-check` failures methodically. Note that `bun run type-check` executes `tsc --noEmit`.
   - **Fix ESLint second**: The project uses the **ESLint 9 Flat Config** architecture via `eslint.config.js`. Address unused variables, react-compiler warnings, and hook dependency warnings via `bun run lint:fix` or manual adjustments.
   - **Fix Vite Build last**: Address module resolution, Rollup chunking, or asset path issues preventing `bun run build`. Note that Vite 7 is in use alongside SWC.
3. **Iterative Fixing**:
   - Do not attempt to fix 50 errors at once across multiple files.
   - Focus on one file or one core shared type at a time.
   - Fix, run `bun run type-check` to verify the single fix didn't break anything else, then move to the next.
4. **Final Verification**: Confirm all three commands pass cleanly before notifying the user that the build is fixed.
