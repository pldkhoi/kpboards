import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFCheckboxProps {
  name: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function RHFCheckbox({ name, label, helperText, disabled, className }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('flex flex-col gap-1.5', className)}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={(checked) => field.onChange(!!checked)}
              disabled={disabled}
              aria-invalid={!!error}
            />
            {label && (
              <Label htmlFor={name} className="cursor-pointer text-sm font-normal">
                {label}
              </Label>
            )}
          </div>
          {(!!error || helperText) && (
            <p className={cn('text-sm', error && 'text-destructive')}>
              {error ? error.message : helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps {
  name: string;
  options: { label: string; value: string }[];
  row?: boolean;
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  className?: string;
}

export function RHFMultiCheckbox({
  row,
  name,
  label,
  options,
  spacing = 2,
  helperText,
  className,
}: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('flex flex-col gap-1.5', className)}>
          {label && <Label className="mb-1 text-sm font-medium">{label}</Label>}
          <div className={cn('flex flex-col gap-2', row && 'flex-row flex-wrap')}>
            {options.map((option) => (
              <div
                key={option.value}
                className={cn('flex items-center gap-2', row && `mr-${spacing}`)}
              >
                <Checkbox
                  id={`${name}-${option.value}`}
                  checked={field.value?.includes(option.value) ?? false}
                  onCheckedChange={() => {
                    field.onChange(getSelected(field.value ?? [], option.value));
                  }}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          {(!!error || helperText) && (
            <p className={cn('text-sm', error && 'text-destructive')}>
              {error ? error.message : helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}
