import { CrudModulePage } from '@/components/admin-template';
import type { ColumnDef } from '@tanstack/react-table';
import { SAMPLE_ROLES } from './module-samples';

export default function AdminRolesPage() {
  const columns: ColumnDef<(typeof SAMPLE_ROLES)[number]>[] = [
    { accessorKey: 'name', header: 'Role' },
    { accessorKey: 'scope', header: 'Permission scope' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'updatedAt', header: 'Updated' },
  ];

  return (
    <CrudModulePage
      resource="roles"
      title="Roles & Permissions"
      description="Define role templates and permission sets with reusable contract-first admin patterns."
      tableTitle="Roles List"
      tableDescription="Use this list for role governance, assignment workflows, and future RBAC integration."
      sampleData={SAMPLE_ROLES}
      detailSummary="Render full permission matrices, audit history, and role assignment previews here."
      columns={columns}
    />
  );
}
