import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ----------------------------------------------------------------------

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  id?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  actions,
  id,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden rounded-[calc(var(--radius)*1.3)] border border-white/55 bg-card/85 px-5 py-5 shadow-[0_28px_60px_-38px_rgba(13,28,22,0.34)] backdrop-blur-md sm:px-6',
        className
      )}
      aria-labelledby={id ?? 'page-title'}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
            Control Center
          </span>
          <div>
            <h1
              id={id ?? 'page-title'}
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {title}
            </h1>
            {description && (
              <p
                className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground"
                role="doc-subtitle"
              >
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
