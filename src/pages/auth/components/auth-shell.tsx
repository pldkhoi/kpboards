import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LockKeyholeIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function AuthShell({
  title,
  description,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden rounded-[calc(var(--radius)*1.5)] border border-white/15 bg-[linear-gradient(145deg,#0b1622,#123548_58%,#0f8f7b)] p-8 text-white shadow-[0_36px_90px_-42px_rgba(9,17,26,0.82)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(15,143,123,0.28),transparent_32%)]" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-8">
              <Logo className="text-white [&_span:last-child]:text-white [&_span:nth-child(2)]:text-white/72" />
              <div className="max-w-xl space-y-4">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/80">
                  Demo Workspace
                </span>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Product-grade authentication for a polished front-end demo.
                </h1>
                <p className="max-w-lg text-sm leading-7 text-white/72 sm:text-base">
                  Explore the mocked sign-in, signup, recovery, and session flows with a UI tuned
                  for a premium admin product rather than a placeholder scaffold.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[calc(var(--radius)*1.05)] border border-white/10 bg-white/8 p-4">
                <SparklesIcon className="size-5 text-white/85" />
                <p className="mt-4 text-sm font-semibold">Fast demo access</p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  Use prefilled accounts to move through the product quickly.
                </p>
              </div>
              <div className="rounded-[calc(var(--radius)*1.05)] border border-white/10 bg-white/8 p-4">
                <ShieldCheckIcon className="size-5 text-white/85" />
                <p className="mt-4 text-sm font-semibold">Mocked securely</p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  Frontend-only auth paths stay believable while backend APIs are absent.
                </p>
              </div>
              <div className="rounded-[calc(var(--radius)*1.05)] border border-white/10 bg-white/8 p-4">
                <LockKeyholeIcon className="size-5 text-white/85" />
                <p className="mt-4 text-sm font-semibold">Session-ready UX</p>
                <p className="mt-1 text-xs leading-5 text-white/65">
                  Clear states, recovery paths, and navigation intent are already wired.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card
          className={cn(
            'w-full self-center border-white/50 bg-card/92 p-2 shadow-[0_36px_80px_-48px_rgba(13,28,22,0.38)] backdrop-blur-xl',
            className
          )}
        >
          <CardHeader className="space-y-3 pb-2 text-left">
            <span className="inline-flex w-fit rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-primary">
              Access
            </span>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
            {footer && <div className="text-sm text-muted-foreground">{footer}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
