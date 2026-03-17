# Admin Template Quick Start

This starter is designed for fast project bootstrapping with reusable CRUD modules and a contract-first service layer.

## 1) Run

```bash
bun install
bun dev
```

## 2) Quality Gates

```bash
bun run type-check
bun run lint
bun run build
bun run test:run
bun run test:e2e
```

## 3) Reusable Module Structure

Use this shape for each new domain module:

- `src/pages/admin/admin-<module>.tsx` - list/form/detail page composition
- `src/services/admin-template/` - API contract-first CRUD service helpers
- `src/hooks/use-query-admin-template.ts` - TanStack Query wrappers
- `src/types/admin-crud.ts` - shared CRUD and API response contracts

## 4) Existing Full CRUD Examples

- Users: `/admin/users`
- Roles: `/admin/roles`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Audit Logs: `/admin/audit-logs`

Each example demonstrates:

- searchable/sortable/paginated tables
- row actions and bulk-selection-ready list patterns
- RHF + Zod validated create/edit form pattern
- detail/preview panel structure
- real API-ready service/hook contract integration

## 5) Replace with Your Domain

1. Copy one admin page module and rename route/title.
2. Define domain types and request/response DTOs.
3. Connect `useAdminCrudList`/detail/mutations to your real endpoint.
4. Keep `PageHeader`, `DataTable`, and tabs composition unchanged for consistency.
5. Add route in `src/routes/index.tsx` and path constant in `src/routes/paths.tsx`.
