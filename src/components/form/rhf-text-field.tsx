import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFTextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  [key: string]: unknown;
}

export default function RHFTextField({
  name,
  label,
  placeholder,
  disabled,
  multiline,
  minRows = 2,
  maxRows,
  size = 'medium',
  className,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  const sizeClasses = {
    small: 'h-7 text-sm',
    medium: 'h-8 text-base',
    large: 'h-9 text-lg',
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div className="flex w-full flex-col gap-1.5">
          {label ? (
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
          ) : null}
          {multiline ? (
            <Textarea
              {...field}
              ref={ref}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={minRows}
              aria-invalid={!!error}
              className={cn(
                'min-h-0 resize-none',
                size === 'small' && 'min-h-14 py-1.5 text-sm',
                size === 'medium' && 'min-h-16 py-2',
                size === 'large' && 'min-h-20 py-2.5 text-lg',
                error && 'border-destructive focus-visible:ring-destructive/20',
                className
              )}
              style={maxRows ? { maxHeight: `${maxRows * 24}px` } : undefined}
              {...other}
            />
          ) : (
            <Input
              {...field}
              ref={ref}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={!!error}
              className={cn(
                sizeClasses[size],
                error && 'border-destructive focus-visible:ring-destructive/20',
                className
              )}
              {...other}
            />
          )}
          {error?.message ? <p className="text-sm text-destructive">{error.message}</p> : null}
        </div>
      )}
    />
  );
}
