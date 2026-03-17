import { CrudModulePage } from '@/components/admin-template';
import type { ColumnDef } from '@tanstack/react-table';
import { SAMPLE_PRODUCTS } from './module-samples';

export default function AdminProductsPage() {
  const columns: ColumnDef<(typeof SAMPLE_PRODUCTS)[number]>[] = [
    { accessorKey: 'name', header: 'Product' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'updatedAt', header: 'Updated' },
  ];

  return (
    <CrudModulePage
      resource="products"
      title="Products"
      description="Manage catalog records, availability, and pricing-aligned metadata in a reusable module."
      tableTitle="Products List"
      tableDescription="Template-ready product list with contract-first APIs and table interactions."
      sampleData={SAMPLE_PRODUCTS}
      detailSummary="Attach price tiers, media assets, and inventory signals in this detail pattern."
      columns={columns}
    />
  );
}
