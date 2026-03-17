import { cn } from '@/lib/utils';

export type BadgeStatusEnum = string;

type BadgeSize = 'small' | 'medium' | 'large';

const statusColors: Record<string, string> = {
  offline: 'bg-transparent',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
  online: 'bg-green-500',
  invisible: 'bg-gray-400',
  unread: 'bg-blue-500',
};

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  status?: BadgeStatusEnum;
}

export default function BadgeStatus({
  size = 'medium',
  status = 'offline',
  className,
  ...props
}: Props) {
  const sizeClass = size === 'small' ? 'size-2' : size === 'large' ? 'size-3' : 'size-2.5';

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        sizeClass,
        statusColors[status] ?? 'bg-transparent',
        className
      )}
      {...props}
    />
  );
}
