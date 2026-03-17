import { CrudModulePage } from '@/components/admin-template';
import type { ColumnDef } from '@tanstack/react-table';
import { SAMPLE_USERS } from './module-samples';

export default function AdminUsersPage() {
  const columns: ColumnDef<(typeof SAMPLE_USERS)[number]>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'updatedAt', header: 'Updated' },
  ];

  return (
    <CrudModulePage
      resource="users"
      title="Users"
      description="Manage user accounts, status, and profile metadata using reusable CRUD patterns."
      tableTitle="Users List"
      tableDescription="Server-ready list view with search, sorting, pagination, and row actions."
      sampleData={SAMPLE_USERS}
      detailSummary="Display profile, role assignment, and activity metadata here."
      columns={columns}
    />
  );
}
