import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type IconifyProps = React.SVGAttributes<SVGSVGElement> & {
  icon: string;
  width?: number;
  className?: string;
};

/**
 * Simple SVG icon wrapper - use Lucide or inline SVG for icons.
 * Kept for compatibility; prefer Lucide icons directly.
 */
const Iconify = forwardRef<SVGSVGElement, IconifyProps>(function Iconify(
  { icon: _icon, width = 24, className, ...other },
  ref
) {
  return (
    <svg
      ref={ref}
      className={cn('shrink-0', className)}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      {...other}
    />
  );
});

export default Iconify;
