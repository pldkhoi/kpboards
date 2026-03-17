import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFNumberFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function RHFNumberField({
  name,
  label,
  placeholder,
  disabled,
  min,
  max,
  step,
  className,
}: RHFNumberFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div className={cn('flex w-full flex-col gap-1.5', className)}>
          {label && (
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
          )}
          <Input
            {...field}
            ref={ref}
            id={name}
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            aria-invalid={!!error}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                e.preventDefault();
              }
            }}
            className={cn(error && 'border-destructive focus-visible:ring-destructive/20')}
          />
          {error?.message && <p className="text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}
