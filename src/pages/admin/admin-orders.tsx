import { CrudModulePage } from '@/components/admin-template';
import type { ColumnDef } from '@tanstack/react-table';
import { SAMPLE_ORDERS } from './module-samples';

export default function AdminOrdersPage() {
  const columns: ColumnDef<(typeof SAMPLE_ORDERS)[number]>[] = [
    { accessorKey: 'name', header: 'Order' },
    { accessorKey: 'total', header: 'Total' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'updatedAt', header: 'Updated' },
  ];

  return (
    <CrudModulePage
      resource="orders"
      title="Orders"
      description="Track transaction lifecycle states with reusable list/form/detail admin patterns."
      tableTitle="Orders List"
      tableDescription="Use this table for payment state, fulfillment status, and support workflows."
      sampleData={SAMPLE_ORDERS}
      detailSummary="Render buyer details, line items, and timeline history in this detail view."
      columns={columns}
    />
  );
}
