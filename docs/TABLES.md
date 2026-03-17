# Tables

The project provides two table approaches:

## TanStack Table (DataTable)

For advanced tables with sorting, pagination, and row selection, use the `DataTable` component with TanStack Table.

```tsx
import DataTable from '@/components/table/data-table';
import { type ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

function UsersTable() {
  const data = useQuery(...).data ?? [];
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enablePagination
      rowsPerPage={10}
    />
  );
}
```

## use-table hook

For simpler tables with manual layout, use the `use-table` hook for pagination and selection state:

```tsx
import useTable from '@/hooks/use-table';

const table = useTable({
  defaultRowsPerPage: 10,
  defaultOrderBy: 'name',
});
```

## Virtualization

For very long lists (1000+ items), use `VirtualList` with TanStack Virtual:

```tsx
import VirtualList from '@/components/virtual-list';

<VirtualList
  items={items}
  estimateSize={50}
  renderItem={(item, i) => <div key={i}>{item.name}</div>}
/>
```

For virtualized tables combining TanStack Table + Virtual, see the [TanStack Table virtualization guide](https://tanstack.dev/table/latest/docs/guide/virtualization).
