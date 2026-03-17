import { render, screen } from '@/test/test-utils';
import type { ColumnDef } from '@tanstack/react-table';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DataTable from './data-table';

interface DemoRow {
  id: string;
  name: string;
}

const columns: ColumnDef<DemoRow>[] = [{ accessorKey: 'name', header: 'Name' }];

describe('DataTable', () => {
  it('renders no-data state instead of throwing for undefined-like data input', () => {
    expect(() =>
      render(
        <DataTable
          columns={columns}
          data={undefined as unknown as DemoRow[]}
          enableSearch
          searchColumn="name"
        />
      )
    ).not.toThrow();

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('filters nullish rows and still renders valid rows', () => {
    const mixedData = [
      { id: '1', name: 'Alice' },
      undefined,
      null,
      { id: '2', name: 'Bob' },
    ] as unknown as DemoRow[];

    render(
      <DataTable
        columns={columns}
        data={mixedData}
        enableRowSelection
        getRowId={(row) => row.id}
        enablePagination={false}
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('emits domain ids for controlled row selection', () => {
    const onSelectionChange = vi.fn();

    render(
      <DataTable
        columns={columns}
        data={[
          { id: '1', name: 'Alice' },
          { id: '2', name: 'Bob' },
        ]}
        enableRowSelection
        selectedRowIds={[]}
        onSelectionChange={onSelectionChange}
        getRowId={(row) => row.id}
        enablePagination={false}
      />
    );

    const rowCheckboxes = screen.getAllByRole('checkbox', { name: 'Select row' });
    fireEvent.click(rowCheckboxes[0]);

    expect(onSelectionChange).toHaveBeenCalledWith(['1']);
  });
});
