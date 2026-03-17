import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function RHFDatePicker({
  name,
  label,
  placeholder = 'Pick a date',
  disabled,
  className,
}: RHFDatePickerProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const dateValue = field.value ? dayjs(field.value).toDate() : undefined;

        return (
          <div className={cn('flex flex-col gap-1.5', className)}>
            {label && (
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !dateValue && 'text-muted-foreground',
                    error && 'border-destructive'
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {dateValue ? dayjs(dateValue).format('LL') : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={(date) => {
                    field.onChange(date ? dayjs(date).toISOString() : null);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {error?.message && <p className="text-sm text-destructive">{error.message}</p>}
          </div>
        );
      }}
    />
  );
}
