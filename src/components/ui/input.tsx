import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-11 w-full min-w-0 rounded-[calc(var(--radius)*0.95)] border border-border/80 bg-input px-3.5 py-2 text-sm text-foreground shadow-[0_1px_0_rgba(255,255,255,0.2)_inset] transition-[border-color,box-shadow,background-color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/90 focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/60 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15 dark:bg-input dark:aria-invalid:border-destructive/60',
        className
      )}
      {...props}
    />
  );
}

export { Input };
