import { Checkbox } from '@/components/ui/checkbox';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute' as const,
  whiteSpace: 'nowrap' as const,
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

type HeadCell = {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  minWidth?: number | string;
  isSortable?: boolean;
};

type Props = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  headLabel: HeadCell[];
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: React.CSSProperties;
};

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
}: Props) {
  return (
    <thead style={sx}>
      <tr>
        {onSelectAllRows && (
          <th className="w-12 p-0 pe-2">
            <Checkbox
              checked={rowCount > 0 && numSelected === rowCount}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              onCheckedChange={(checked) => onSelectAllRows(checked === true)}
            />
          </th>
        )}

        {headLabel.map((headCell) => (
          <th
            key={headCell.id}
            align={headCell.align || 'left'}
            style={{ width: headCell.width, minWidth: headCell.minWidth }}
            className="px-4 py-3"
          >
            {onSort && (headCell?.isSortable === undefined || headCell?.isSortable) ? (
              <button
                type="button"
                onClick={() => headCell.isSortable !== false && onSort(headCell.id)}
                className="flex items-center font-bold capitalize outline-none hover:underline"
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span style={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </button>
            ) : (
              <span className="font-bold">{headCell.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
