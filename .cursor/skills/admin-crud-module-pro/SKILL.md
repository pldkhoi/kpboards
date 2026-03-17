---
name: admin-crud-module-pro
description: Scaffold and refine reusable admin CRUD modules using this template architecture. Use when the user asks to add a new admin entity/module/page, CRUD screens, table-form-detail patterns, or reusable admin examples.
---

# Admin CRUD Module Pro

Use this skill to implement production-style admin CRUD modules quickly and consistently.

## Where this skill fits

Use for:

- new admin module pages (`users`, `roles`, `products`, `orders`, `audit logs`, or custom entity)
- CRUD examples using list + form + detail patterns
- reusable module scaffolding for template consumers

## Canonical project references

- `docs/CRUD_RECIPE.md`
- `src/components/admin-template/crud-module-page.tsx`
- `src/hooks/use-query-admin-template.ts`
- `src/services/admin-template/index.ts`
- `src/routes/paths.tsx`
- `src/routes/index.tsx`
- `src/components/admin-layout/index.tsx`

## Implementation workflow

1. **Define module contract**
   - choose `resource` key and entity fields
   - align data shape with `src/types/admin-crud.ts`

2. **Create/compose page**
   - create `src/pages/admin/admin-<module>.tsx`
   - compose with `CrudModulePage`
   - provide title, description, columns, sample/fetched data

3. **Wire service and hooks**
   - use `createAdminCrudService(resource)`
   - use hooks from `use-query-admin-template.ts`
   - keep query keys stable and mutation invalidation consistent

4. **Wire routes and navigation**
   - add path in `src/routes/paths.tsx`
   - lazy route in `src/routes/index.tsx`
   - nav/breadcrumb mapping in `src/components/admin-layout/index.tsx`

5. **Form and validation**
   - RHF + Zod for create/edit
   - user-facing strings should be i18n-ready when possible
   - include clear error messages and submit/disabled/loading states

6. **UX + a11y pass**
   - keyboard operability
   - visible focus states
   - labels/roles where needed
   - responsive checks (320, 768, 1024)

7. **Verification gates**
   - `bun run type-check`
   - `bun run lint`
   - `bun run build`
   - `bun run test:run`
   - `bun run test:e2e` when route/UI changed (or document blocker)

## Page skeleton checklist

- `PageHeader` with title/description/actions
- tabbed sections or equivalent:
  - list/table
  - create/edit form
  - detail/preview
- state handling:
  - loading
  - empty
  - error
  - success feedback (toast)
- row actions:
  - view
  - edit
  - delete

## Prompt templates

### 1) New module scaffold

```text
Autonomous, create admin CRUD module for [ENTITY].

Scope:
- Add page `src/pages/admin/admin-[entity].tsx` using `CrudModulePage`
- Add route path and lazy route
- Add admin nav/breadcrumb mapping
- Add typed sample data and table columns

Validation:
- bun run type-check
- bun run lint
- bun run build
- bun run test:run
- bun run test:e2e
```

### 2) Upgrade existing module

```text
Autonomous, refactor admin module [TARGET] to template quality.

Requirements:
- Improve list/form/detail composition
- Strengthen RHF + Zod validation
- Improve loading/empty/error states
- Improve a11y and responsive behavior (320/768/1024)

Run:
- bun run type-check
- bun run lint
- bun run build
- bun run test:run
- bun run test:e2e
```

### 3) Multi-module rollout

```text
Autonomous, implement CRUD modules [LIST] in phases.

Rules:
- Plan first, then execute phase-by-phase
- Keep one todo in_progress at a time
- Reuse shared CRUD architecture, avoid duplicate abstractions
- Do not stop until all phases are completed
```

## Anti-patterns

- hardcoding per-module table/form logic when `CrudModulePage` can be reused
- duplicating service clients instead of using admin-template service factory
- shipping module pages without route + nav integration
- skipping verification gates
