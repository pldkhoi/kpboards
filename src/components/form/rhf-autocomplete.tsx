// form
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Option {
  label: string;
  value: unknown;
}

interface Props {
  name: string;
  placeholder?: string;
  options: Option[];
  multiple?: boolean;
  freeSolo?: boolean;
  getOptionLabel?: (option: Option | string) => string;
  isOptionEqualToValue?: (option: Option, value: unknown) => boolean;
}

export default function RHFAutocomplete({
  name,
  placeholder,
  options = [],
  getOptionLabel = (o) => (typeof o === 'string' ? o : (o as Option).label),
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          {placeholder && <Label>{placeholder}</Label>}
          <Input
            value={field.value ? getOptionLabel(field.value as Option | string) : ''}
            onChange={(e) => {
              const v = e.target.value;
              const opt = options.find((o) => o.label === v);
              field.onChange(opt ?? (other.freeSolo ? v : null));
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className={error ? 'border-destructive' : ''}
          />
          {error && <p className="text-sm text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
}
