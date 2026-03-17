import { FormProvider, RHFCheckbox, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

const registerSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password'),
    acceptTerms: z.boolean().refine((value) => value, 'You must accept terms to continue'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutate: registerMutate, isPending, isSuccess, isError, error, data } = useRegister();
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message ?? t('auth.register.success');
      toast.success(message);
      methods.reset();
    }
  }, [isSuccess, data, methods, toast, t]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message ? error.message : t('auth.register.errorDefault');
      toast.error(message);
    }
  }, [isError, error, toast, t]);

  const onSubmit = (values: RegisterFormValues) => {
    registerMutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <AuthShell
      title={t('auth.register.title')}
      description={t('auth.register.description')}
      footer={
        <>
          {t('auth.register.hasAccount')}{' '}
          <Link to={PATH_PAGE.login} className="font-medium text-primary hover:underline">
            {t('auth.register.signInLink')}
          </Link>
        </>
      }
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <RHFTextField
            name="username"
            label={t('auth.fields.username')}
            placeholder={t('auth.placeholders.username')}
          />
          <RHFTextField
            name="email"
            label={t('auth.fields.email')}
            placeholder={t('auth.placeholders.email')}
          />
          <RHFTextField
            name="password"
            type="password"
            label={t('auth.fields.password')}
            placeholder={t('auth.placeholders.password')}
          />
          <RHFTextField
            name="confirmPassword"
            type="password"
            label={t('auth.fields.confirmPassword')}
            placeholder={t('auth.placeholders.confirmPassword')}
          />
          <RHFCheckbox name="acceptTerms" label={t('auth.register.acceptTerms')} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('auth.register.submitting') : t('auth.register.submit')}
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to={PATH_PAGE.login}>{t('auth.common.backToSignIn')}</Link>
          </Button>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
