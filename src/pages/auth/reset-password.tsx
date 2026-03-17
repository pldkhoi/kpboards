import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useResetPassword } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(1, 'Reset token is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const presetToken = searchParams.get('token') ?? '';
  const {
    mutate: resetPasswordMutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useResetPassword();

  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { resetToken: presetToken, newPassword: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (presetToken) {
      methods.setValue('resetToken', presetToken);
    }
  }, [methods, presetToken]);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message ?? t('auth.resetPassword.success');
      toast.success(message);
      methods.reset({ resetToken: presetToken, newPassword: '', confirmPassword: '' });
    }
  }, [isSuccess, data, methods, presetToken, t, toast]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t('auth.resetPassword.errorDefault');
      toast.error(message);
    }
  }, [isError, error, t, toast]);

  const onSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordMutate({ resetToken: values.resetToken, newPassword: values.newPassword });
  };

  return (
    <AuthShell
      title={t('auth.resetPassword.title')}
      description={t('auth.resetPassword.description')}
      footer={
        <Link to={PATH_PAGE.login} className="font-medium text-primary hover:underline">
          {t('auth.common.backToSignIn')}
        </Link>
      }
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <RHFTextField
            name="resetToken"
            label={t('auth.fields.resetToken')}
            placeholder={t('auth.placeholders.resetToken')}
          />
          <RHFTextField
            name="newPassword"
            type="password"
            label={t('auth.fields.newPassword')}
            placeholder={t('auth.placeholders.newPassword')}
          />
          <RHFTextField
            name="confirmPassword"
            type="password"
            label={t('auth.fields.confirmPassword')}
            placeholder={t('auth.placeholders.confirmPassword')}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('auth.resetPassword.submitting') : t('auth.resetPassword.submit')}
          </Button>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
