import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useVerifyOtp } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

const otpSchema = z.object({
  email: z.email('Email is invalid'),
  code: z
    .string()
    .min(4, 'Code is too short')
    .max(8, 'Code is too long')
    .regex(/^[A-Za-z0-9]+$/, 'Code must be letters and numbers only'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutate: verifyOtpMutate, isPending, isSuccess, isError, error, data } = useVerifyOtp();

  const methods = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: '', code: '' },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message ?? t('auth.otp.success');
      toast.success(message);
    }
  }, [isSuccess, data, t, toast]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message ? error.message : t('auth.otp.errorDefault');
      toast.error(message);
    }
  }, [isError, error, t, toast]);

  const onSubmit = (values: OtpFormValues) => {
    verifyOtpMutate(values);
  };

  return (
    <AuthShell
      title={t('auth.otp.title')}
      description={t('auth.otp.description')}
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
          <RHFTextField
            name="code"
            label={t('auth.fields.otpCode')}
            placeholder={t('auth.placeholders.otpCode')}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('auth.otp.submitting') : t('auth.otp.submit')}
          </Button>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
