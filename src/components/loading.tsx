import { memo } from 'react';

// ----------------------------------------------------------------------

interface Props {
  isSpinner?: boolean;
  text?: string;
}

function Loading({ isSpinner = false, text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${isSpinner ? 'size-8' : 'size-16'}`}
      />
      {text && <p className="text-base text-muted-foreground">{text}</p>}
    </div>
  );
}

export default memo(Loading);
