---
description: Enforce test-driven development workflow with Vitest. Scaffold interfaces, generate tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
---

# TDD Command

Invokes the **tdd-guide** agent to enforce test-driven development.

## What This Command Does

1. **Scaffold Interfaces** — Define types/interfaces first
2. **Generate Tests First** — Write failing tests with Vitest (RED)
3. **Implement Minimal Code** — Write just enough to pass (GREEN)
4. **Refactor** — Improve code while keeping tests green (REFACTOR)
5. **Verify Coverage** — Ensure 80%+ test coverage

## When to Use

- Implementing new features
- Adding new functions/components/hooks
- Fixing bugs (write test that reproduces bug first)
- Refactoring existing code

## TDD Cycle

```
RED → GREEN → REFACTOR → REPEAT

RED:      Write a failing test (Vitest + @testing-library/react)
GREEN:    Write minimal code to pass
REFACTOR: Improve code, keep tests passing
REPEAT:   Next feature/scenario
```

## Testing Stack

- **Vitest 4** — test runner (`yarn test`)
- **@testing-library/react** — component tests
- **vi.fn(), vi.mock()** — Vitest mocking

## Integration

- Use `/plan` first to understand what to build
- Use `/tdd` to implement with tests
- Use `/build-fix` if build errors occur
- Use `/code-review` to review implementation
- Use `/test-coverage` to verify coverage
