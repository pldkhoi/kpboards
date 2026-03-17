import { FormProvider, RHFTextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/use-auth';
import { useLogin } from '@/hooks/use-query-auth';
import { useToast } from '@/hooks/use-toast';
import { PATH_PAGE } from '@/routes/paths';
import { setSession } from '@/utils/jwt';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router';
import { z } from 'zod';
import AuthShell from './components/auth-shell';

// ----------------------------------------------------------------------

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const { mutate: loginMutate, isPending, isSuccess, isError, error, data: userData } = useLogin();
  const handledRef = useRef(false);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const { handleSubmit } = methods;
  const fromPath =
    typeof (location.state as { from?: unknown } | null)?.from === 'string'
      ? (location.state as { from: string }).from
      : PATH_PAGE.adminDashboard;

  useEffect(() => {
    if (isSuccess && userData && !handledRef.current) {
      handledRef.current = true;
      setSession(userData);
      login(userData);
      void navigate(fromPath, { replace: true });
    }
  }, [isSuccess, userData, login, navigate, fromPath]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error && error.message ? error.message : t('auth.login.errorDefault');
      toast.error(message);
    }
  }, [isError, error, t, toast]);

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data);
  };

  const applyDemoCredentials = (username: string) => {
    methods.reset({
      username,
      password: 'demo123',
    });
  };

  return (
    <AuthShell
      title={t('auth.login.title')}
      description={t('auth.login.description')}
      footer={
        <>
          {t('auth.login.noAccount')}{' '}
          <Link to={PATH_PAGE.register} className="font-medium text-primary hover:underline">
            {t('auth.login.signUpLink')}
          </Link>
        </>
      }
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="rounded-[calc(var(--radius)*0.95)] border border-primary/15 bg-primary/8 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Demo accounts</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  The app is running in mocked auth mode. Use a preset identity or type any username
                  and password.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyDemoCredentials('demo.admin')}
                >
                  Demo admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyDemoCredentials('demo.reviewer')}
                >
                  Demo reviewer
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <RHFTextField
              name="username"
              label={t('auth.fields.username')}
              placeholder={t('auth.placeholders.username')}
            />
            <RHFTextField
              name="password"
              label={t('auth.fields.password')}
              placeholder={t('auth.placeholders.password')}
              type="password"
            />
            <div className="flex justify-end">
              <Link
                to={PATH_PAGE.forgotPassword}
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                {t('auth.login.forgotPasswordLink')}
              </Link>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? t('auth.login.submitting') : t('auth.login.submit')}
              <ArrowRightIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </FormProvider>
    </AuthShell>
  );
}
