import CodeBlock from '@/components/admin-layout/code-block';
import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ----------------------------------------------------------------------

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ----------------------------------------------------------------------

interface Props {
  className?: string;
}

export default function FormSection({ className }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [radioValue, setRadioValue] = useState('option-a');

  const profileMethods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  });

  const onSubmitProfile = (_data: ProfileFormValues) => {
    profileMethods.reset();
  };

  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <h2 id="form-controls" className="text-xl font-semibold tracking-tight">
            Form Controls
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Inputs, selects, checkboxes, switches. RHF + Zod for validation with error messages.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">RHF + Zod (validation)</p>
          <FormProvider
            methods={profileMethods}
            onSubmit={profileMethods.handleSubmit(onSubmitProfile)}
          >
            <div className="grid max-w-md gap-4 sm:grid-cols-1">
              <RHFTextField name="name" label="Name" placeholder="Enter name..." />
              <RHFTextField name="email" label="Email" placeholder="you@example.com" />
              <Button type="submit" size="sm">
                Submit
              </Button>
            </div>
          </FormProvider>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Basic controls</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Input</Label>
              <Input id="demo-input" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Textarea</Label>
              <Textarea id="demo-textarea" placeholder="Type a message..." />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Select (Role)</Label>
          <Select defaultValue="user">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="demo-checkbox"
              checked={checked}
              onCheckedChange={(v) => setChecked(!!v)}
            />
            <Label htmlFor="demo-checkbox" className="cursor-pointer">
              Checkbox
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={switched} onCheckedChange={(v) => setSwitched(!!v)} />
            <Label className="cursor-pointer">Switch</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input disabled placeholder="Disabled input" className="w-40" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Radio Group</Label>
          <div className="flex gap-4" role="radiogroup" aria-label="Options">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="demo-radio"
                value="option-a"
                checked={radioValue === 'option-a'}
                onChange={() => setRadioValue('option-a')}
                className="size-4"
              />
              <span className="text-sm">Option A</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="demo-radio"
                value="option-b"
                checked={radioValue === 'option-b'}
                onChange={() => setRadioValue('option-b')}
                className="size-4"
              />
              <span className="text-sm">Option B</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="demo-radio"
                value="option-c"
                checked={radioValue === 'option-c'}
                onChange={() => setRadioValue('option-c')}
                className="size-4"
              />
              <span className="text-sm">Option C</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date Picker</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 size-4" aria-hidden />
                {date ? dayjs(date).format('MMM D, YYYY') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Snippet (RHF + Zod)</p>
          <CodeBlock
            code={`const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
});
const methods = useForm({ resolver: zodResolver(schema) });
<FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
  <RHFTextField name="name" label="Name" />
  <RHFTextField name="email" label="Email" />
</FormProvider>`}
            language="tsx"
          />
        </div>
      </div>
    </section>
  );
}
