import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useForgetPassword } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

const forgotPasswordSchema = z.object({
  email: z.email('Email is invalid'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    mutate: forgotPasswordMutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useForgetPassword();

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message ?? t('auth.forgotPassword.success');
      toast.success(message);
    }
  }, [isSuccess, data, t, toast]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t('auth.forgotPassword.errorDefault');
      toast.error(message);
    }
  }, [isError, error, t, toast]);

  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPasswordMutate(values);
  };

  return (
    <AuthShell
      title={t('auth.forgotPassword.title')}
      description={t('auth.forgotPassword.description')}
      footer={
        <Link to={PATH_PAGE.login} className="font-medium text-primary hover:underline">
          {t('auth.common.backToSignIn')}
        </Link>
      }
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <RHFTextField
            name="email"
            label={t('auth.fields.email')}
            placeholder={t('auth.placeholders.email')}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('auth.forgotPassword.submitting') : t('auth.forgotPassword.submit')}
          </Button>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
