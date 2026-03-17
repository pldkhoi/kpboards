// form
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  options: { label: string; value: string | number }[];
  label?: string;
  row?: boolean;
  spacing?: number;
  helperText?: React.ReactNode;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing = 2,
  helperText,
  ..._other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <fieldset>
          {label && (
            <legend id={labelledby} className="mb-2 text-sm font-medium">
              {label}
            </legend>
          )}

          <div
            className={`flex gap-2 ${row ? 'flex-row' : 'flex-col'}`}
            style={row ? { marginRight: spacing * 4 } : {}}
            role="radiogroup"
            aria-labelledby={labelledby || undefined}
          >
            {options.map((option) => (
              <label key={String(option.value)} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  onBlur={field.onBlur}
                  className="size-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>

          {(!!error || helperText) && (
            <p className={`mt-1 text-sm ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
              {error ? error.message : helperText}
            </p>
          )}
        </fieldset>
      )}
    />
  );
}
