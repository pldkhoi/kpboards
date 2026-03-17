import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type SelectOption = { label: string; value: string };

interface RHFSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function RHFSelect({
  name,
  label,
  placeholder = 'Select...',
  options = [],
  children,
  disabled,
  className,
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('flex w-full flex-col gap-1.5', className)}>
          {label && (
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
          )}
          <Select value={field.value ?? ''} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger
              id={name}
              aria-invalid={!!error}
              className={cn(
                'w-full',
                error && 'border-destructive focus-visible:ring-destructive/20'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {children ??
                options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {error?.message && <p className="text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}
