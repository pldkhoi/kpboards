import { type ReactNode } from 'react';
// form
import { type FieldValues, type UseFormReturn, FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props<T extends FieldValues = FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
};

export default function FormProvider<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  methods,
}: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
