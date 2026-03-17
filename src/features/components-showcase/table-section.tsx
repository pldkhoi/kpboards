import CodeBlock from '@/components/admin-layout/code-block';
import BadgeStatus from '@/components/badge-status';
import { DataTable } from '@/components/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

// ----------------------------------------------------------------------

type DemoUser = {
  id: string;
  name: string;
  initials: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
};

const demoRows: DemoUser[] = [
  { id: '1', name: 'Emma', initials: 'EM', role: 'Admin', status: 'online' },
  { id: '2', name: 'James', initials: 'JM', role: 'User', status: 'away' },
  { id: '3', name: 'Sofia', initials: 'SF', role: 'User', status: 'busy' },
  { id: '4', name: 'Alex', initials: 'AL', role: 'Guest', status: 'offline' },
  { id: '5', name: 'Taylor', initials: 'TW', role: 'User', status: 'online' },
  { id: '6', name: 'Morgan', initials: 'MR', role: 'Admin', status: 'away' },
];

const columns: ColumnDef<DemoUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>{row.original.initials}</AvatarFallback>
        </Avatar>
        {row.original.name}
      </div>
    ),
  },
  { accessorKey: 'role', header: 'Role' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <BadgeStatus status={row.original.status} />,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="icon-sm" aria-label="Edit">
          <PencilIcon className="size-4" aria-hidden />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Delete">
          <Trash2Icon className="size-4 text-destructive" aria-hidden />
        </Button>
      </div>
    ),
  },
];

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function TableSection({ className }: Props) {
  const [showLoading, setShowLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="table" className="text-xl font-semibold tracking-tight">
            Data Table
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full DataTable with search, sort, pagination. Loading skeleton and empty state demos.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            DataTable (search, sort, paginate)
          </p>
          <DataTable<DemoUser>
            columns={columns}
            data={showEmpty ? [] : demoRows}
            isLoading={showLoading}
            enableSearch
            searchPlaceholder="Search by name..."
            searchColumn="name"
            enableSorting
            enablePagination
            rowsPerPage={4}
            getRowId={(row) => row.id}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowLoading(!showLoading)}>
            {showLoading ? 'Hide' : 'Show'} loading
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowEmpty(!showEmpty)}>
            {showEmpty ? 'Show data' : 'Show empty'}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Basic table</p>
          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoRows.slice(0, 3).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback>{row.initials}</AvatarFallback>
                        </Avatar>
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <BadgeStatus status={row.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon-sm" aria-label="Edit">
                          <PencilIcon className="size-4" aria-hidden />
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label="Delete">
                          <Trash2Icon className="size-4 text-destructive" aria-hidden />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet</p>
          <CodeBlock
            code={`<DataTable
  columns={columns}
  data={data}
  enableSearch
  searchColumn="name"
  enableSorting
  enablePagination
/>`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
