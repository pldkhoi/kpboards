import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useLayoutEffect, useRef } from 'react';

// ----------------------------------------------------------------------

type AnchorOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right' | 'center';
};

interface MenuPopoverProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  anchorOrigin?: AnchorOrigin;
  transformOrigin?: AnchorOrigin;
  disabledArrow?: boolean;
  sx?: { width?: number; p?: number; mt?: number; ml?: number; [key: string]: unknown };
  className?: string;
}

// ----------------------------------------------------------------------

export default function MenuPopover({
  children,
  open,
  onClose,
  anchorEl,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  disabledArrow: _disabledArrow,
  sx = {},
  className,
}: MenuPopoverProps) {
  const virtualAnchorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (anchorEl && virtualAnchorRef.current) {
      const rect = anchorEl.getBoundingClientRect();
      const el = virtualAnchorRef.current;
      el.style.position = 'fixed';
      el.style.top = `${rect.top}px`;
      el.style.left = `${rect.left}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.pointerEvents = 'none';
    }
  }, [anchorEl, open]);

  const side = anchorOrigin?.vertical ?? 'bottom';
  const align =
    anchorOrigin?.horizontal === 'right'
      ? 'end'
      : anchorOrigin?.horizontal === 'left'
        ? 'start'
        : 'center';

  return (
    <Popover open={open} onOpenChange={(o) => !o && onClose()}>
      {anchorEl && (
        <PopoverTrigger>
          <span ref={virtualAnchorRef} aria-hidden className="block size-px" />
        </PopoverTrigger>
      )}
      <PopoverContent
        side={side}
        align={align}
        sideOffset={typeof sx?.mt === 'number' ? sx.mt * 8 : 6}
        alignOffset={typeof sx?.ml === 'number' ? sx.ml * 8 : 3}
        className={cn('w-[200px] p-1', className)}
        style={sx?.width ? { width: sx.width } : undefined}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
