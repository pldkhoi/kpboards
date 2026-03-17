import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';

// ----------------------------------------------------------------------

export interface ActionsColumnItem<TData> {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
  onClick: (row: TData) => void;
}

export interface CreateActionsColumnConfig<TData> {
  getRowId: (row: TData) => string;
  items: ActionsColumnItem<TData>[];
  onFeedback?: (msg: string, type?: 'success' | 'error') => void;
}

// ----------------------------------------------------------------------

export function createActionsColumn<TData>(
  config: CreateActionsColumnConfig<TData>
): ColumnDef<TData> {
  const { getRowId, items, onFeedback } = config;

  return {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Row actions">
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {items.map((item, idx) => (
              <DropdownMenuItem
                key={idx}
                variant={item.variant}
                onClick={() => {
                  try {
                    item.onClick(data);
                    onFeedback?.(`${item.label} completed`, 'success');
                  } catch (err) {
                    onFeedback?.(String(err), 'error');
                  }
                }}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: {
      getRowId,
      _type: 'actions' as const,
    },
  };
}
