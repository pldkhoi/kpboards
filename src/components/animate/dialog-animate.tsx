import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { m } from 'framer-motion';
import { varFade } from './variants';

// ----------------------------------------------------------------------

export interface Props {
  open?: boolean;
  variants?: Record<string, unknown>;
  onClose?: VoidFunction;
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function DialogAnimate({
  open = false,
  variants,
  onClose,
  children,
  title,
  className,
}: Props) {
  const v =
    variants ||
    varFade({
      distance: 120,
      durationIn: 0.32,
      durationOut: 0.24,
      easeIn: 'easeInOut',
    }).inUp;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose?.()}>
      <DialogContent className={className}>
        <m.div {...v} className="flex w-full flex-col">
          {title && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          )}
          {children}
        </m.div>
      </DialogContent>
    </Dialog>
  );
}
