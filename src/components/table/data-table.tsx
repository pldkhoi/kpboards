import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableNoData from './table-no-data';
import TablePaginationActions from './table-pagination-actions';
import TableSkeleton from './table-skeleton';

// ----------------------------------------------------------------------

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;

  // Pagination
  enablePagination?: boolean;
  rowsPerPage?: number;
  pageCount?: number;
  pageIndex?: number;
  onPaginationChange?: (state: { pageIndex: number; pageSize: number }) => void;

  // Sorting
  enableSorting?: boolean;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;

  // Search
  enableSearch?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchDebounceMs?: number;

  // Row selection
  enableRowSelection?: boolean;
  rowCount?: number;
  selectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getRowId?: (row: TData) => string;

  className?: string;
}

// ----------------------------------------------------------------------

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ----------------------------------------------------------------------

function isNonNullable<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}

function resolvePaginationState(
  updaterOrValue: PaginationState | ((prev: PaginationState) => PaginationState),
  current: PaginationState
): PaginationState {
  return typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue;
}

// ----------------------------------------------------------------------

export default function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  enablePagination = true,
  rowsPerPage = 10,
  pageCount: pageCountProp,
  pageIndex: pageIndexProp,
  onPaginationChange,
  enableSorting = true,
  sorting: sortingProp,
  onSortingChange,
  enableSearch = false,
  searchPlaceholder = 'Search...',
  searchColumn,
  searchValue: searchValueProp,
  onSearchChange,
  searchDebounceMs = 300,
  enableRowSelection = false,
  rowCount: rowCountProp,
  selectedRowIds,
  onSelectionChange,
  getRowId,
  className,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: rowsPerPage,
  });
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [searchInputValue, setSearchInputValue] = useState(searchValueProp ?? '');
  const debouncedSearch = useDebounce(searchInputValue, searchDebounceMs);

  const isServerPagination = onPaginationChange !== undefined;
  const isServerSorting = onSortingChange !== undefined;
  const isServerSearch = onSearchChange !== undefined;
  const isControlledSelection =
    selectedRowIds !== undefined && onSelectionChange !== undefined && getRowId !== undefined;
  const normalizedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter(isNonNullable);
  }, [data]);
  const normalizedColumns = useMemo(() => {
    if (!Array.isArray(columns)) return [];
    return columns.filter(isNonNullable);
  }, [columns]);

  const sorting = sortingProp ?? internalSorting;
  const setSorting = useCallback(
    (updaterOrValue: SortingState | ((prev: SortingState) => SortingState)) => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
      if (isServerSorting) {
        onSortingChange?.(next);
      } else {
        setInternalSorting(next);
      }
    },
    [isServerSorting, onSortingChange, sorting]
  );

  const pagination = useMemo(
    () => ({
      pageIndex: pageIndexProp ?? internalPagination.pageIndex,
      pageSize: internalPagination.pageSize,
    }),
    [pageIndexProp, internalPagination]
  );

  const setPagination = useCallback(
    (
      updaterOrValue:
        | { pageIndex: number; pageSize: number }
        | ((prev: { pageIndex: number; pageSize: number }) => {
            pageIndex: number;
            pageSize: number;
          })
    ) => {
      const next = resolvePaginationState(updaterOrValue, pagination);
      if (isServerPagination) {
        onPaginationChange?.(next);
      } else {
        setInternalPagination(next);
      }
    },
    [isServerPagination, onPaginationChange, pagination]
  );

  const controlledRowSelection = useMemo(() => {
    if (!selectedRowIds) return {};
    return selectedRowIds.reduce<RowSelectionState>((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [selectedRowIds]);
  const rowSelection = isControlledSelection ? controlledRowSelection : internalRowSelection;

  useEffect(() => {
    if (searchValueProp !== undefined) setSearchInputValue(searchValueProp);
  }, [searchValueProp]);

  useEffect(() => {
    if (isServerSearch && debouncedSearch !== (searchValueProp ?? '')) {
      onSearchChange?.(debouncedSearch);
    }
  }, [debouncedSearch, isServerSearch, onSearchChange, searchValueProp]);

  const handleRowSelectionChange = useCallback(
    (updaterOrValue: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
      const next =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;

      if (!isControlledSelection) {
        setInternalRowSelection(next);
        return;
      }

      const ids = Object.entries(next)
        .filter(([, value]) => value)
        .map(([id]) => id);
      onSelectionChange?.(ids);
    },
    [isControlledSelection, rowSelection, onSelectionChange]
  );

  const columnsWithSelection = useMemo(() => {
    let cols = normalizedColumns;

    if (enableSearch && !isServerSearch && searchColumn) {
      cols = normalizedColumns.map((col) => {
        const colId = (col as { id?: string }).id ?? (col as { accessorKey?: string }).accessorKey;
        if (colId === searchColumn) {
          return {
            ...col,
            enableColumnFilter: true,
            filterFn: 'includesString',
          } as ColumnDef<TData, TValue>;
        }
        return col;
      });
    }

    if (!enableRowSelection) return cols;

    const selectColumn: ColumnDef<TData, TValue> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    };

    return [selectColumn, ...cols];
  }, [normalizedColumns, enableRowSelection, enableSearch, isServerSearch, searchColumn]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table hook API is expected here.
  const table = useReactTable({
    data: normalizedData,
    columns: columnsWithSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !isServerSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel:
      enablePagination && !isServerPagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel:
      enableSearch && !isServerSearch && searchColumn ? getFilteredRowModel() : undefined,
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      setPagination((prev) => resolvePaginationState(updater, prev));
    },
    onRowSelectionChange: enableRowSelection ? handleRowSelectionChange : undefined,
    state: {
      sorting,
      pagination: enablePagination ? pagination : undefined,
      // Keep rowSelection state as an object even when disabled, because TanStack row APIs
      // still read selection internals during render in some flows.
      rowSelection,
      columnFilters:
        enableSearch && !isServerSearch && searchColumn
          ? [{ id: searchColumn, value: searchInputValue }]
          : undefined,
    },
    enableRowSelection,
    manualPagination: isServerPagination,
    manualSorting: isServerSorting,
    manualFiltering: isServerSearch,
    pageCount: isServerPagination && pageCountProp !== undefined ? pageCountProp : undefined,
    rowCount: isServerPagination && rowCountProp !== undefined ? rowCountProp : undefined,
    getRowId: getRowId ? (row: TData, index: number) => getRowId(row) ?? String(index) : undefined,
  });

  if (isLoading) {
    return (
      <div className={cn('w-full overflow-auto', className)}>
        <div className="overflow-auto rounded-md border">
          <Table>
            <TableBody>
              <TableSkeleton />
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  const totalRows = isServerPagination
    ? (rowCountProp ?? normalizedData.length)
    : table.getFilteredRowModel().rows.length;
  const pageIndex = enablePagination ? table.getState().pagination.pageIndex : 0;
  const resolvedPageCount =
    isServerPagination && pageCountProp !== undefined
      ? pageCountProp
      : Math.ceil(totalRows / rowsPerPage) || 1;
  const tableRows = table.getRowModel().rows ?? [];

  return (
    <div className={cn('w-full space-y-4', className)}>
      {enableSearch && (
        <div className="relative max-w-sm">
          <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="pl-8"
            aria-label="Search"
          />
        </div>
      )}

      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableRows.length ? (
              tableRows.map((row) => {
                const isSelected =
                  enableRowSelection && typeof row.getIsSelected === 'function'
                    ? row.getIsSelected()
                    : false;
                const visibleCells =
                  typeof row.getVisibleCells === 'function' ? row.getVisibleCells() : [];

                return (
                  <TableRow key={row.id} data-state={isSelected ? 'selected' : undefined}>
                    {visibleCells.map((cell) => (
                      <TableCell key={cell.id} className="px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableNoData isNotFound textNoData="No results." />
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && totalRows > 0 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            {totalRows} row(s)
            {enableRowSelection && table.getSelectedRowModel().rows.length > 0 && (
              <span> ({table.getSelectedRowModel().rows.length} selected)</span>
            )}
          </div>
          <TablePaginationActions
            count={totalRows}
            page={pageIndex}
            rowsPerPage={rowsPerPage}
            pageCount={resolvedPageCount}
            onPageChange={(_, newPage) => table.setPageIndex(newPage)}
          />
        </div>
      )}
    </div>
  );
}
