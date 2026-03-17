import CodeBlock from '@/components/admin-layout/code-block';
import ConfirmDialog from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import dayjs from 'dayjs';
import { CalendarIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function OverlaySection({ className }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmOpen(false);
    }, 800);
  };

  return (
    <section className={className}>
      <TooltipProvider>
        <div className="space-y-6">
          <div>
            <h2 id="overlays" className="text-xl font-semibold tracking-tight">
              Overlays
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dialog, Sheet, Tooltip, Popover. ConfirmDialog pattern, Sheet with form, loading state
              during submit.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Dialog & ConfirmDialog</p>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to continue? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={() => setConfirmOpen(true)}>
                ConfirmDialog pattern
              </Button>
            </div>
          </div>

          <ConfirmDialog
            open={confirmOpen}
            onClose={() => !isSubmitting && setConfirmOpen(false)}
            title="Delete item?"
            content="This action cannot be undone."
            action={
              <Button variant="destructive" onClick={handleConfirmSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" aria-hidden />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            }
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Sheet with form</p>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>New item</SheetTitle>
                  <p className="text-sm text-muted-foreground">
                    Slide-over panel with a form inside.
                  </p>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sheet-input">Name</Label>
                    <Input id="sheet-input" placeholder="Enter name..." />
                  </div>
                  <Button className="w-full">Submit</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Tooltip & Popover</p>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 size-4" aria-hidden />
                    {date ? dayjs(date).format('MMM D, YYYY') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Popover with actions</Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48">
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      Duplicate
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start text-destructive">
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Snippet</p>
            <CodeBlock
              code={`<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>
<ConfirmDialog open={open} onClose={...} title="Confirm?" action={<Button>Yes</Button>} />`}
              language="tsx"
            />
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}
