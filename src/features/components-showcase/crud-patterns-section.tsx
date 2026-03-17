import { DataTable, createActionsColumn } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ColumnDef } from '@tanstack/react-table';

type DemoRecord = {
  id: string;
  name: string;
  owner: string;
  status: 'active' | 'draft' | 'archived';
  updatedAt: string;
};

const DEMO_DATA: DemoRecord[] = [
  {
    id: 'rec_001',
    name: 'Starter workflow',
    owner: 'Product',
    status: 'active',
    updatedAt: '2026-03-14',
  },
  {
    id: 'rec_002',
    name: 'Audit export',
    owner: 'Security',
    status: 'draft',
    updatedAt: '2026-03-12',
  },
  {
    id: 'rec_003',
    name: 'Archive policy',
    owner: 'Ops',
    status: 'archived',
    updatedAt: '2026-03-10',
  },
];

const noop = () => undefined;

export default function CrudPatternsSection() {
  const columns: ColumnDef<DemoRecord>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'owner', header: 'Owner' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
    },
    { accessorKey: 'updatedAt', header: 'Updated' },
    createActionsColumn({
      getRowId: (row) => row.id,
      items: [
        { label: 'View', onClick: noop },
        { label: 'Edit', onClick: noop },
      ],
    }),
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 id="crud-patterns" className="text-xl font-semibold tracking-tight">
          CRUD Patterns
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reusable admin list/form/detail baseline for server-ready modules.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>List pattern</CardTitle>
          <CardDescription>
            Selection, search, sorting, pagination, and row actions wired through shared
            `DataTable`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={DEMO_DATA}
            enableRowSelection
            enableSearch
            enableSorting
            enablePagination
            searchColumn="name"
            rowsPerPage={5}
          />
        </CardContent>
      </Card>
    </section>
  );
}
