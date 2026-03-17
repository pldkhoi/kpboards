# Forms Guide

## Overview

Forms are built with **React Hook Form** + **Zod** validation + **shadcn** components. Pre-built wrapper components in `src/components/form/` handle the integration.

## Available Form Components

| Component | Base | Usage |
|-----------|------|-------|
| `RHFTextField` | Input | Text input |
| `RHFSelect` | Select | Dropdown select |
| `RHFAutocomplete` | Combobox | Searchable select |
| `RHFCheckbox` | Checkbox | Single checkbox |
| `RHFRadioGroup` | RadioGroup | Radio button group |
| `RHFSwitch` | Switch | Toggle switch |
| `RHFDatePicker` | react-day-picker | Date picker |
| `RHFTimePicker` | Input | Time picker |
| `RHFNumberField` | Input | Numeric input |
| `RHFUpload` | react-dropzone | File upload |

## Basic Form Example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider, RHFTextField } from 'components/form';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  message: z.string().min(10, 'Too short').min(1, 'Message is required'),
});

type FormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: FormValues) => {
    await submitContactForm(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <RHFTextField name="name" label="Full Name" />
        <RHFTextField name="email" label="Email Address" />
        <RHFTextField name="message" label="Message" multiline minRows={4} />
        <Button type="submit" disabled={isSubmitting}>
          Send
        </Button>
      </div>
    </FormProvider>
  );
}
```

## Validation Patterns

### Required fields

```typescript
z.string().min(1, 'This field is required')
```

### Email validation

```typescript
z.string().email('Must be a valid email').min(1, 'Email is required')
```

### Password with confirmation

```typescript
const schema = z
  .object({
    password: z.string().min(8, 'Min 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
```

### Optional fields

```typescript
z.string().optional()
z.number().optional()
```

### Conditional validation

```typescript
const schema = z.discriminatedUnion('hasCompany', [
  z.object({ hasCompany: z.literal(true), companyName: z.string().min(1, 'Required') }),
  z.object({ hasCompany: z.literal(false), companyName: z.string().optional() }),
]);
```

### Arrays with unique items

```typescript
const schema = z.object({
  items: z
    .array(z.object({ name: z.string() }))
    .refine(
      (items) => new Set(items.map((i) => i.name)).size === items.length,
      { message: 'Items must be unique' }
    ),
});
```

## FormProvider

The `FormProvider` component wraps `react-hook-form`'s `FormProvider` and renders a `<form>` element:

```tsx
<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
  {/* RHF fields here */}
</FormProvider>
```

All `RHF*` components automatically connect to the form context — no need to pass `control` or `register` props.

## Integration with TanStack Query

```tsx
const createUserMutation = useCreateUser();

const onSubmit = async (data: FormValues) => {
  await createUserMutation.mutateAsync(data);
};
```

## Why Zod over Yup?

- **TypeScript-first** — schemas infer types via `z.infer<typeof schema>`
- **Smaller bundle** — ~13KB vs ~40KB
- **Better error messages** — more descriptive by default
- **No runtime prototype pollution** — pure functional approach
- **Growing ecosystem** — tRPC, Conform, Hono all use Zod
