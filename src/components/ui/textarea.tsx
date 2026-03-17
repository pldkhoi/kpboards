import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-24 w-full rounded-[calc(var(--radius)*0.95)] border border-border/80 bg-input px-3.5 py-3 text-sm shadow-[0_1px_0_rgba(255,255,255,0.2)_inset] transition-[border-color,box-shadow,background-color] outline-none placeholder:text-muted-foreground/90 focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/60 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
