---
description: Analyze test coverage and generate missing tests to reach 80%+ target.
---

# Test Coverage Optimization Workflow

When asked to improve test coverage, follow these steps natively:

// turbo
1. **Run Coverage Report**:
   Execute the following command to see current coverage:
   `bun run test:coverage`

2. **Analyze Results**:
   Read the output to identify:
   - Files below the 80% coverage target.
   - Uncovered branches and functions.
   - Missing test files for recently modified or new code.

3. **Generate Missing Tests**:
   For the highlighted files, iteratively write missing tests:
   - Use Vitest (`describe`, `it`, `expect`, `vi`).
   - Use `@testing-library/react` for components.
   - **Crucial Pattern**: Use `renderWithProviders` from `src/test/test-utils` for components. Wrap query hooks in `createWrapperForRenderHook()` from the same file.
   - Mock axios and external services explicitly using `vi.mock()`.

4. **Verify Improvement**:
   Re-run the test coverage command for the specific files you modified to ensure coverage has increased to meet the 80% target.

5. **Summarize**:
   Output a brief report detailing the coverage percentage improvements, the files that were improved, and any remaining logical gaps.
