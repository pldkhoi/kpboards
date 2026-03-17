import { Skeleton } from '@/components/ui/skeleton';

// ----------------------------------------------------------------------

type Props = React.HTMLAttributes<HTMLTableRowElement>;

export default function TableSkeleton({ className, ...other }: Props) {
  return (
    <tr className={className} {...other}>
      <td colSpan={12}>
        <div className="flex flex-row items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded" />
          <Skeleton className="h-5 flex-1" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-40" />
        </div>
      </td>
    </tr>
  );
}
