# Test Coverage

Analyze test coverage and generate missing tests to reach 80%+ target.

## Instructions

1. **Run coverage report**:
   ```bash
   yarn test -- --coverage
   ```

2. **Analyze results**:
   - Files below 80% coverage
   - Uncovered branches and functions
   - Missing test files

3. **Generate missing tests**:
   - Use Vitest (`describe`, `it`, `expect`, `vi`)
   - Use `@testing-library/react` for components
   - Use renderWithProviders from src/test/test-utils for components that need context
   - Wrap query hooks in QueryClientProvider
   - Mock axios and external services with `vi.mock()`

4. **Run tests again** to verify coverage improvement

5. **Report**:
   - Overall coverage percentage
   - Files improved
   - Remaining gaps

## Target: 80%+ on branches, functions, lines, statements
