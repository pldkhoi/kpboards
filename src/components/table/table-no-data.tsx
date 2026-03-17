import { FileSearch } from 'lucide-react';

// ----------------------------------------------------------------------

type Props = {
  isNotFound?: boolean;
  textNoData?: string;
};

export default function TableNoData({ isNotFound, textNoData = 'No Data' }: Props) {
  return (
    <tr>
      {isNotFound ? (
        <td colSpan={12} className="text-center">
          <div className="flex flex-col items-center gap-4 py-8">
            <FileSearch className="size-16 text-muted-foreground/50" strokeWidth={1} />
            <p className="text-base text-foreground">{textNoData}</p>
          </div>
        </td>
      ) : (
        <td colSpan={12} className="p-0" />
      )}
    </tr>
  );
}
