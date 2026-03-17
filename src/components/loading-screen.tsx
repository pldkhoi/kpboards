import { cn } from '@/lib/utils';
import { m } from 'framer-motion';
import Logo from './logo';
import ProgressBar from './progress-bar';

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  className?: string;
};

export default function LoadingScreen({ isDashboard, className }: Props) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <div
          className={cn(
            'fixed inset-0 z-[99999] overflow-hidden bg-background',
            'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(15,143,123,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(18,53,72,0.2),transparent_26%)]',
            className
          )}
          role="status"
          aria-label="Loading"
          aria-live="polite"
        >
          <div className="relative z-10 flex min-h-full items-center justify-center p-6">
            <m.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)*1.55)] border border-white/55 bg-card/88 px-8 py-9 text-center shadow-[0_40px_100px_-50px_rgba(13,28,22,0.42)] backdrop-blur-xl"
            >
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />

              <m.div
                className="mx-auto mb-6 flex size-28 items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
              >
                <div className="absolute size-28 rounded-full border border-primary/12" />
                <div className="absolute size-20 rounded-full border border-secondary/12" />

                <m.span
                  className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_55%,transparent)]"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                />
                <m.span
                  className="absolute bottom-3 right-2 size-2.5 rounded-full bg-secondary shadow-[0_0_18px_color-mix(in_srgb,var(--secondary)_45%,transparent)]"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, delay: 0.25 }}
                />
                <m.div
                  className="relative rounded-[calc(var(--radius)*1.2)] border border-white/45 bg-background/72 px-4 py-3 shadow-[0_20px_55px_-35px_rgba(13,28,22,0.4)]"
                  animate={{ y: [0, -5, 0], scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                >
                  <Logo
                    className="text-foreground [&_span:first-child]:size-12 [&_span:last-child]:text-left"
                    disabledLink
                  />
                </m.div>
              </m.div>

              <div className="space-y-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary">
                  Preparing workspace
                </p>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Loading your experience
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Syncing layouts, theme preferences, and demo session state.
                </p>
              </div>

              <div className="mt-7 space-y-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <m.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-secondary"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[0, 1, 2].map((index) => (
                    <m.span
                      key={index}
                      className="size-2 rounded-full bg-primary/70"
                      animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                      transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: index * 0.16,
                      }}
                    />
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      )}
    </>
  );
}
