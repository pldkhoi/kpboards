import { cn } from '@/lib/utils';
import { forwardRef, memo, type ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// ----------------------------------------------------------------------

type ScrollbarProps = {
  children: ReactNode;
  className?: string;
};

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { children, className, ...other },
  ref
) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <div ref={ref} className={cn('overflow-auto', className)} {...other}>
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <SimpleBar
        scrollableNodeProps={{ ref: ref as React.RefObject<HTMLDivElement> }}
        clickOnTrack={false}
        className={cn('max-h-full', className)}
        {...other}
      >
        {children}
      </SimpleBar>
    </div>
  );
});

export default memo(Scrollbar);
