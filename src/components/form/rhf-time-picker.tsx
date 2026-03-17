import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFTimePickerProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export default function RHFTimePicker({ name, label, disabled, className }: RHFTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ? dayjs(field.value).format('HH:mm') : '';

        return (
          <div className={cn('flex flex-col gap-1.5', className)}>
            {label && (
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
            )}
            <Input
              id={name}
              type="time"
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v ? dayjs(`2000-01-01 ${v}`).toISOString() : null);
              }}
              disabled={disabled}
              aria-invalid={!!error}
              className={cn(error && 'border-destructive focus-visible:ring-destructive/20')}
            />
            {error?.message && <p className="text-sm text-destructive">{error.message}</p>}
          </div>
        );
      }}
    />
  );
}
