import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useVerifyEmail } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const presetToken = searchParams.get('token') ?? '';
  const {
    mutate: verifyEmailMutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useVerifyEmail();

  const methods = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { token: presetToken },
  });

  useEffect(() => {
    if (presetToken) {
      methods.setValue('token', presetToken);
    }
  }, [methods, presetToken]);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message ?? t('auth.verifyEmail.success');
      toast.success(message);
    }
  }, [isSuccess, data, t, toast]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t('auth.verifyEmail.errorDefault');
      toast.error(message);
    }
  }, [isError, error, t, toast]);

  const onSubmit = (values: VerifyEmailFormValues) => {
    verifyEmailMutate(values);
  };

  return (
    <AuthShell
      title={t('auth.verifyEmail.title')}
      description={t('auth.verifyEmail.description')}
      footer={
        <Link to={PATH_PAGE.login} className="font-medium text-primary hover:underline">
          {t('auth.common.backToSignIn')}
        </Link>
      }
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <RHFTextField
            name="token"
            label={t('auth.fields.verificationToken')}
            placeholder={t('auth.placeholders.verificationToken')}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('auth.verifyEmail.submitting') : t('auth.verifyEmail.submit')}
          </Button>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
