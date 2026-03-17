import { cn } from '@/lib/utils';
import { forwardRef, type ReactNode } from 'react';

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(function Page(
  { children, title = '', meta, className, ...other },
  ref
) {
  return (
    <>
      <title>{title ? `${title} | KPBoards` : 'KPBoards'}</title>
      {meta}
      <div ref={ref} className={cn(className)} {...other}>
        {children}
      </div>
    </>
  );
});

export default Page;
