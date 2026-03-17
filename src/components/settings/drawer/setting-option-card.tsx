import { cn } from '@/lib/utils';
import type { CSSProperties, ChangeEvent, ReactNode } from 'react';

type Props = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
  className?: string;
  checkedClassName?: string;
  uncheckedClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function SettingOptionCard({
  name,
  value,
  checked,
  onChange,
  ariaLabel,
  className,
  checkedClassName,
  uncheckedClassName,
  style,
  children,
}: Props) {
  return (
    <label
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-[calc(var(--radius)*0.95)] border border-border/75 bg-background/70 transition-[transform,box-shadow,border-color,background-color]',
        'focus-within:ring-4 focus-within:ring-ring/60 focus-within:ring-offset-2',
        checked ? checkedClassName : uncheckedClassName,
        className
      )}
      style={style}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className="sr-only"
      />
      {children}
    </label>
  );
}
