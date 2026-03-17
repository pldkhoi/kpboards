import { cn } from '@/lib/utils';
import { Link as RouterLink } from 'react-router';

// ----------------------------------------------------------------------

interface Props {
  className?: string;
  disabledLink?: boolean;
}

export default function Logo({ className, disabledLink = false }: Props) {
  const content = (
    <span className={cn('inline-flex items-center gap-3 text-current', className)}>
      <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-[color:var(--primary-strong)] text-sm font-black tracking-[0.22em] text-primary-foreground shadow-[0_18px_36px_-20px_color-mix(in_srgb,var(--primary)_85%,transparent)]">
        KP
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Workspace
        </span>
        <span className="text-base font-semibold tracking-tight text-current">KP Boards</span>
      </span>
    </span>
  );

  if (disabledLink) {
    return content;
  }

  return (
    <RouterLink to="/" className="inline-flex text-inherit no-underline">
      {content}
    </RouterLink>
  );
}
