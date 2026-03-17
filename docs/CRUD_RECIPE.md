# CRUD Module Recipe

Use this recipe to add a new admin CRUD module in under 30 minutes.

## Step 1: Define the route

- Add path in `src/routes/paths.tsx`
- Add lazy route entry in `src/routes/index.tsx`
- Add nav item in `src/components/admin-layout/index.tsx`

## Step 2: Create the page

Create `src/pages/admin/admin-<module>.tsx` using `CrudModulePage`:

- pass `resource` key
- pass title/description
- pass table column definitions
- pass sample or fetched data

## Step 3: Wire service contracts

Use `createAdminCrudService()` from `src/services/admin-template/index.ts`:

- `list`, `detail`, `create`, `update`, `remove`
- keep query params in `AdminCrudListQuery`
- keep runtime response shape aligned with `ReponseSuccessType`

## Step 4: Add query hooks

Use wrappers from `src/hooks/use-query-admin-template.ts`:

- `useAdminCrudList`
- `useAdminCrudDetail`
- `useAdminCrudCreate`
- `useAdminCrudUpdate`
- `useAdminCrudDelete`

## Step 5: Build form validation

- Define schema using Zod
- Bind RHF form with `zodResolver`
- Keep submit handler mutation-ready

## Step 6: Verify

```bash
bun run type-check
bun run lint
bun run build
bun run test:run
```

Run `bun run test:e2e` after route/UI changes.
