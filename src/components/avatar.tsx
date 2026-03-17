import { AvatarFallback, AvatarImage, Avatar as ShadcnAvatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

type AvatarColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

const colorClasses: Record<AvatarColor, string> = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-destructive text-destructive-foreground',
};

// ----------------------------------------------------------------------

export interface Props {
  src?: string;
  alt?: string;
  color?: AvatarColor;
  className?: string;
  children?: React.ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, Props>(function Avatar(
  { color = 'default', children, className, src, alt, ...other },
  ref
) {
  const fallbackContent = children ?? (alt ? alt.charAt(0).toUpperCase() : '?');

  return (
    <ShadcnAvatar
      ref={ref}
      className={cn(color !== 'default' && colorClasses[color], className)}
      {...other}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{fallbackContent}</AvatarFallback>
    </ShadcnAvatar>
  );
});

export default Avatar;
