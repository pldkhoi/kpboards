---
description: Test-Driven Development (TDD) workflow ensuring code is tested before implementation.
---

# Test-Driven Development (TDD) Workflow

Follow these exact steps when creating a new feature, component, or utility:

1. **Analyze Requirements**: Understand what needs to be built and its edge cases based on the task description. Review the `.agents/skills/project-rules/SKILL.md` for architecture specifics.
2. **Write Failing Test (RED)**: 
   - Create the corresponding `.test.ts` or `.test.tsx` file first.
   - Write Vitest tests covering the expected behavior based on requirements.
   - Run the test using `bun run test <filename>` to verify it fails correctly due to missing code.
3. **Implement Minimum Code (GREEN)**:
   - Write just enough code in the source file to make the tests pass.
   - Run the tests again to ensure they pass.
4. **Refactor (REFACTOR)**:
   - Clean up code, remove duplication, and optimize while keeping tests passing.
   - Verify linting and typing run cleanly (`bun run type-check`, `bun run lint`).
5. **Verify Coverage**: Ensure the new code meets the 80% coverage threshold by running `bun run test:coverage <filename>`.
