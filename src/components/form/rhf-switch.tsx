import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFSwitchProps {
  name: string;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function RHFSwitch({ name, label, disabled, className }: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn('flex items-center gap-2', className)}>
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          {label && (
            <Label htmlFor={name} className="cursor-pointer text-sm font-normal">
              {label}
            </Label>
          )}
        </div>
      )}
    />
  );
}
