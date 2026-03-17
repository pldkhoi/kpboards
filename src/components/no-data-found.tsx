import { FileSearch } from 'lucide-react';
import { memo } from 'react';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

function NoDataFound({ title = 'No data found' }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[calc(var(--radius)*1.2)] border border-dashed border-border/80 bg-card/60 px-6 py-10 text-center">
      <div className="inline-flex size-20 items-center justify-center rounded-full bg-primary/8 text-primary">
        <FileSearch className="size-10" strokeWidth={1.4} />
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold tracking-tight text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting filters, search terms, or the selected time range.
        </p>
      </div>
    </div>
  );
}

export default memo(NoDataFound);
