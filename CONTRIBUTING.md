# Contributing

## Commit Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

<optional body>
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

## Pre-Commit

Husky runs on every commit:

- **lint-staged**: Prettier and ESLint on staged `.ts`, `.tsx` files
- **commit-msg**: Commitlint validates conventional commit format (e.g. `feat: add button`)

## Workflow

1. Create a feature branch from `main` or `develop`
2. Make changes with atomic commits
3. Run `yarn lint`, `yarn type-check`, `yarn test --run`, `yarn build`
4. (Optional) Run `yarn knip` to check for dead code before opening a PR
5. (Optional) Run `yarn test:e2e` for end-to-end tests
6. Open a pull request (consider running `yarn knip` first to catch dead code)

See [.cursor/rules/git-workflow.mdc](.cursor/rules/git-workflow.mdc) for details.
