import { CrudModulePage } from '@/components/admin-template';
import type { ColumnDef } from '@tanstack/react-table';
import { SAMPLE_AUDIT_LOGS } from './module-samples';

export default function AdminAuditLogsPage() {
  const columns: ColumnDef<(typeof SAMPLE_AUDIT_LOGS)[number]>[] = [
    { accessorKey: 'name', header: 'Event' },
    { accessorKey: 'actor', header: 'Actor' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'updatedAt', header: 'Updated' },
  ];

  return (
    <CrudModulePage
      resource="audit-logs"
      title="Audit Logs"
      description="Capture and review security-critical events with an extensible read-focused admin module."
      tableTitle="Audit Log Events"
      tableDescription="Use this list as your baseline for compliance, security, and incident workflows."
      sampleData={SAMPLE_AUDIT_LOGS}
      detailSummary="Display before/after payloads, actor metadata, and trace IDs in this detail pattern."
      columns={columns}
    />
  );
}
