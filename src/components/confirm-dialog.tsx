import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AlertTriangleIcon } from 'lucide-react';
import { memo } from 'react';

// ----------------------------------------------------------------------

interface ConfirmDialogProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  cancelButtonText?: string;
  className?: string;
}

// ----------------------------------------------------------------------

function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  cancelButtonText,
  className,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className={cn('max-w-sm', className)} showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangleIcon className="size-7" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {content && (
            <DialogDescription className="text-center leading-6">{content}</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter showCloseButton={false} className="flex justify-end gap-2 border-0 pt-2">
          <Button variant="outline" onClick={onClose}>
            {cancelButtonText || 'Cancel'}
          </Button>
          {action}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ConfirmDialog);
