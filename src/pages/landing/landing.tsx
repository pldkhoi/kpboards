import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PATH_PAGE } from '@/routes/paths';
import { m, useReducedMotion, type MotionProps } from 'framer-motion';
import {
  ArrowRightIcon,
  CircleCheckBigIcon,
  CpuIcon,
  GlobeIcon,
  LayoutIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WorkflowIcon,
  type LucideIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface FeatureCard {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

interface WorkflowStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ShowcaseCard {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface SectionIntroProps {
  id?: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  eyebrow?: string;
}

function SectionIntro({ id, title, description, align = 'center', eyebrow }: SectionIntroProps) {
  return (
    <div className={cn('max-w-3xl space-y-4', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-[color:color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
          <SparklesIcon className="size-3.5" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2
          id={id}
          className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

function LandingBackdrop({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="landing-grid absolute inset-0" />
      <div className="landing-noise absolute inset-0" />

      <m.div
        className="absolute -left-28 top-10 size-[24rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--primary)_26%,transparent)_0%,_transparent_72%)] blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 56, 8, 0], y: [0, -44, 24, 0], scale: [1, 1.08, 0.97, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute right-[-8rem] top-20 size-[28rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--primary-strong)_20%,transparent)_0%,_transparent_72%)] blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -40, 10, 0], y: [0, 28, -24, 0], scale: [1, 0.94, 1.04, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute bottom-[-8rem] left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--foreground)_10%,transparent)_0%,_transparent_72%)] blur-3xl"
        animate={shouldReduceMotion ? undefined : { y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0): MotionProps =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
        };

  const cardHover = shouldReduceMotion ? {} : { whileHover: { y: -10 } };

  const metrics = [
    {
      value: t('landing.page.metrics.appsValue'),
      label: t('landing.page.metrics.appsLabel'),
    },
    {
      value: t('landing.page.metrics.modulesValue'),
      label: t('landing.page.metrics.modulesLabel'),
    },
    {
      value: t('landing.page.metrics.qualityValue'),
      label: t('landing.page.metrics.qualityLabel'),
    },
    {
      value: t('landing.page.metrics.stackValue'),
      label: t('landing.page.metrics.stackLabel'),
    },
  ];

  const proofItems = [
    t('landing.page.proof.itemOne'),
    t('landing.page.proof.itemTwo'),
    t('landing.page.proof.itemThree'),
  ];

  const featureCards: FeatureCard[] = [
    {
      title: t('landing.page.features.uiTitle'),
      description: t('landing.page.features.uiDesc'),
      to: PATH_PAGE.components,
      icon: LayoutIcon,
    },
    {
      title: t('landing.page.features.pagesTitle'),
      description: t('landing.page.features.pagesDesc'),
      to: PATH_PAGE.pages,
      icon: WorkflowIcon,
    },
    {
      title: t('landing.page.features.formsTitle'),
      description: t('landing.page.features.formsDesc'),
      to: PATH_PAGE.components,
      icon: CircleCheckBigIcon,
    },
    {
      title: t('landing.page.features.dataTitle'),
      description: t('landing.page.features.dataDesc'),
      to: PATH_PAGE.portfolio,
      icon: CpuIcon,
    },
    {
      title: t('landing.page.features.qualityTitle'),
      description: t('landing.page.features.qualityDesc'),
      to: PATH_PAGE.pages,
      icon: ShieldCheckIcon,
    },
    {
      title: t('landing.page.features.themingTitle'),
      description: t('landing.page.features.themingDesc'),
      to: PATH_PAGE.components,
      icon: GlobeIcon,
    },
  ];

  const workflowSteps: WorkflowStep[] = [
    {
      title: t('landing.page.workflow.stepOneTitle'),
      description: t('landing.page.workflow.stepOneDesc'),
      icon: LayoutIcon,
    },
    {
      title: t('landing.page.workflow.stepTwoTitle'),
      description: t('landing.page.workflow.stepTwoDesc'),
      icon: CpuIcon,
    },
    {
      title: t('landing.page.workflow.stepThreeTitle'),
      description: t('landing.page.workflow.stepThreeDesc'),
      icon: ShieldCheckIcon,
    },
  ];

  const showcaseCards: ShowcaseCard[] = [
    {
      title: t('landing.page.showcase.publicTitle'),
      description: t('landing.page.showcase.publicDesc'),
      to: PATH_PAGE.pages,
      icon: GlobeIcon,
    },
    {
      title: t('landing.page.showcase.adminTitle'),
      description: t('landing.page.showcase.adminDesc'),
      to: PATH_PAGE.login,
      icon: WorkflowIcon,
    },
    {
      title: t('landing.page.showcase.platformTitle'),
      description: t('landing.page.showcase.platformDesc'),
      to: PATH_PAGE.components,
      icon: ShieldCheckIcon,
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: t('landing.page.testimonials.quoteOne'),
      author: t('landing.page.testimonials.authorOne'),
      role: t('landing.page.testimonials.roleOne'),
    },
    {
      quote: t('landing.page.testimonials.quoteTwo'),
      author: t('landing.page.testimonials.authorTwo'),
      role: t('landing.page.testimonials.roleTwo'),
    },
    {
      quote: t('landing.page.testimonials.quoteThree'),
      author: t('landing.page.testimonials.authorThree'),
      role: t('landing.page.testimonials.roleThree'),
    },
  ];

  const heroProofCards: { label: string; value: string }[] = [
    { label: metrics[2].label, value: metrics[2].value },
    { label: metrics[3].label, value: metrics[3].value },
  ];

  const panelClass =
    'border-border/70 bg-[color:color-mix(in_srgb,var(--card)_86%,transparent)] shadow-[0_40px_120px_-64px_color-mix(in_srgb,var(--foreground)_40%,transparent)] backdrop-blur-2xl';

  const buildLinkClass = (variant: 'default' | 'outline' | 'ghost', extraClassName?: string) =>
    cn(buttonVariants({ variant, size: 'lg' }), 'rounded-full px-6', extraClassName);

  const outlineCardClass =
    'border-border/65 bg-[color:color-mix(in_srgb,var(--background)_78%,transparent)] shadow-[0_30px_85px_-60px_color-mix(in_srgb,var(--foreground)_36%,transparent)] backdrop-blur-xl';

  return (
    <div className="landing-page relative isolate overflow-hidden">
      <LandingBackdrop shouldReduceMotion={shouldReduceMotion} />

      <section className="relative mx-auto max-w-6xl px-4 pb-18 pt-8 sm:px-6 sm:pt-12 lg:pt-18 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
          <m.div className="max-w-2xl space-y-8" {...reveal()}>
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-[color:color-mix(in_srgb,var(--primary)_10%,transparent)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary">
                <SparklesIcon className="size-3.5" aria-hidden />
                {t('landing.page.hero.badge')}
              </span>

              <div className="space-y-5">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  <span className="block">{t('landing.page.hero.title')}</span>
                  <span className="mt-3 block bg-[linear-gradient(135deg,var(--foreground)_0%,var(--primary)_45%,var(--primary-strong)_100%)] bg-clip-text text-transparent">
                    {t('landing.page.hero.highlight')}
                  </span>
                </h1>
                <p className="max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                  {t('landing.page.hero.description')}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={PATH_PAGE.components}
                className={buildLinkClass(
                  'default',
                  'h-12 shadow-[0_26px_58px_-34px_color-mix(in_srgb,var(--primary)_72%,transparent)]'
                )}
              >
                {t('landing.page.hero.primaryCta')}
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
              <Link
                to={PATH_PAGE.pages}
                className={buildLinkClass(
                  'outline',
                  'h-12 border-border/80 bg-[color:color-mix(in_srgb,var(--card)_88%,transparent)] text-foreground hover:border-primary/25 hover:text-foreground'
                )}
              >
                {t('landing.page.hero.secondaryCta')}
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {proofItems.map((item, index) => (
                <m.div
                  key={item}
                  className={cn(
                    outlineCardClass,
                    'rounded-2xl border px-4 py-3',
                    index === proofItems.length - 1 && 'sm:col-span-2'
                  )}
                  {...reveal(0.08 + index * 0.05)}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] text-primary">
                      <CircleCheckBigIcon className="size-[1.125rem]" aria-hidden />
                    </span>
                    <p className="text-sm leading-6 text-foreground/88">{item}</p>
                  </div>
                </m.div>
              ))}
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {t('landing.page.hero.trustNote')}
            </p>
          </m.div>

          <m.div className="relative mx-auto w-full max-w-[34rem]" {...reveal(0.14)}>
            <m.div
              className="relative"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Card className={cn(panelClass, 'overflow-hidden border')}>
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
                <div className="absolute right-8 top-8 size-28 rounded-full bg-[color:color-mix(in_srgb,var(--primary)_18%,transparent)] blur-3xl" />
                <CardContent className="relative space-y-6 p-6 sm:p-7">
                  <div className="flex flex-col gap-4 border-b border-border/65 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-primary">
                        KPBoards
                      </p>
                      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {t('landing.page.proof.title')}
                      </h2>
                    </div>
                    <div className="inline-flex w-fit items-center rounded-full border border-border/70 bg-[color:color-mix(in_srgb,var(--background)_82%,transparent)] px-3 py-1 text-xs font-medium text-muted-foreground">
                      React 19 + Vite 7
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-border/65 bg-[color:color-mix(in_srgb,var(--background)_78%,transparent)] p-4"
                      >
                        <div className="text-2xl font-semibold tracking-tight text-foreground">
                          {metric.value}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {proofItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-border/65 bg-[color:color-mix(in_srgb,var(--background)_82%,transparent)] px-4 py-3"
                      >
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] text-primary">
                          <CircleCheckBigIcon className="size-[1.125rem]" aria-hidden />
                        </span>
                        <p className="text-sm leading-6 text-foreground/88">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={PATH_PAGE.portfolio}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-12 w-full justify-between rounded-2xl border-primary/20 bg-[color:color-mix(in_srgb,var(--primary)_8%,var(--card))] px-4 text-foreground hover:border-primary/35 hover:text-foreground'
                    )}
                  >
                    {t('landing.footer.quickLinks.portfolio')}
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            </m.div>

            <div className="absolute -left-4 bottom-8 hidden w-44 lg:block">
              <FloatingStatCard shouldReduceMotion={shouldReduceMotion}>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {heroProofCards[0].label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {heroProofCards[0].value}
                </p>
              </FloatingStatCard>
            </div>

            <div className="absolute -right-4 top-14 hidden w-44 lg:block">
              <FloatingStatCard shouldReduceMotion={shouldReduceMotion} reverse>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {heroProofCards[1].label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  {heroProofCards[1].value}
                </p>
              </FloatingStatCard>
            </div>
          </m.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <m.div
          className={cn(
            panelClass,
            'grid gap-4 rounded-[2rem] border px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4'
          )}
          {...reveal()}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-border/60 bg-background/35 px-4 py-4"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground">
                {metric.value}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </m.div>
      </section>

      <section
        className="relative mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 sm:py-18"
        aria-labelledby="features-heading"
      >
        <m.div {...reveal()}>
          <SectionIntro
            id="features-heading"
            title={t('landing.page.features.title')}
            description={t('landing.page.features.description')}
            eyebrow={t('landing.page.proof.title')}
          />
        </m.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ title, description, to, icon: Icon }, index) => (
            <m.div key={title} {...reveal(index * 0.05)} {...cardHover}>
              <Card
                className={cn(
                  panelClass,
                  'h-full border transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-primary/20 hover:shadow-[0_42px_110px_-64px_color-mix(in_srgb,var(--primary)_38%,transparent)]'
                )}
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
                <CardHeader className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] text-primary shadow-[inset_0_1px_0_color-mix(in_srgb,var(--primary)_14%,white)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-foreground">{title}</CardTitle>
                    <CardDescription className="text-base leading-7 text-muted-foreground">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="border-t border-border/70 bg-transparent">
                  <Link
                    to={to}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'h-11 rounded-full px-0 text-primary hover:bg-transparent hover:text-[color:var(--primary-strong)]'
                    )}
                  >
                    {t('landing.page.features.cardCta', { feature: title })}
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </Link>
                </CardFooter>
              </Card>
            </m.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <m.div
          className={cn(panelClass, 'overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10')}
          {...reveal()}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <SectionIntro
              title={t('landing.page.workflow.title')}
              description={t('landing.page.workflow.description')}
              align="left"
              eyebrow={t('landing.page.hero.badge')}
            />

            <div className="grid gap-4">
              {workflowSteps.map(({ title, description, icon: Icon }, index) => (
                <m.div
                  key={title}
                  className={cn(
                    outlineCardClass,
                    'relative rounded-[1.75rem] border px-5 py-5 sm:px-6'
                  )}
                  {...reveal(index * 0.06)}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex items-center gap-3 sm:w-44 sm:flex-none">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          Step 0{index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground sm:pt-1">{description}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </section>

      <section className="relative mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 sm:py-18">
        <m.div {...reveal()}>
          <SectionIntro
            title={t('landing.page.showcase.title')}
            description={t('landing.page.showcase.description')}
            eyebrow={t('landing.page.features.title')}
          />
        </m.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {showcaseCards.map(({ title, description, to, icon: Icon }, index) => (
            <m.div key={title} {...reveal(index * 0.05)} {...cardHover}>
              <Card
                className={cn(
                  panelClass,
                  'h-full border transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/22 hover:shadow-[0_40px_120px_-72px_color-mix(in_srgb,var(--primary)_42%,transparent)]'
                )}
              >
                <CardHeader className="space-y-5">
                  <span className="inline-flex size-14 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_14%,transparent),color-mix(in_srgb,var(--primary-strong)_18%,transparent))] text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-foreground">{title}</CardTitle>
                    <CardDescription className="text-base leading-7 text-muted-foreground">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="border-t border-border/70 bg-transparent">
                  <Link
                    to={to}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-11 rounded-full border-border/80 bg-[color:color-mix(in_srgb,var(--card)_90%,transparent)] px-4 text-foreground hover:border-primary/25 hover:text-foreground'
                    )}
                  >
                    {t('landing.page.showcase.cardCta', { area: title })}
                  </Link>
                </CardFooter>
              </Card>
            </m.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <m.div className="space-y-10" {...reveal()}>
          <SectionIntro
            title={t('landing.page.testimonials.title')}
            description={t('landing.page.hero.trustNote')}
            eyebrow={t('landing.page.workflow.title')}
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
            {testimonials.map((testimonial, index) => (
              <m.blockquote
                key={testimonial.author}
                className={cn(
                  panelClass,
                  'rounded-[1.9rem] border p-6',
                  index === 0 && 'lg:row-span-2 lg:p-8'
                )}
                {...reveal(index * 0.05)}
              >
                <div className="flex h-full flex-col">
                  <span className="text-4xl leading-none text-primary/55">&ldquo;</span>
                  <p className="mt-4 flex-1 text-pretty text-base leading-8 text-foreground/88">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-6 border-t border-border/60 pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
                  </footer>
                </div>
              </m.blockquote>
            ))}
          </div>
        </m.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-18 pt-10 sm:px-6 sm:pb-24">
        <m.div
          className="relative overflow-hidden rounded-[2.2rem] border border-primary/18 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_14%,var(--card))_0%,color-mix(in_srgb,var(--background)_82%,transparent)_56%,color-mix(in_srgb,var(--primary-strong)_12%,transparent)_100%)] p-6 sm:p-8 lg:p-12"
          {...reveal()}
        >
          <div
            aria-hidden
            className="absolute -right-12 top-0 size-52 rounded-full bg-[color:color-mix(in_srgb,var(--primary)_18%,transparent)] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-[-5rem] left-[-2rem] size-48 rounded-full bg-[color:color-mix(in_srgb,var(--primary-strong)_18%,transparent)] blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-[color:color-mix(in_srgb,var(--primary)_12%,transparent)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
                <SparklesIcon className="size-3.5" aria-hidden />
                {t('landing.page.cta.primary')}
              </span>
              <div className="space-y-3">
                <h3 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {t('landing.page.cta.title')}
                </h3>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {t('landing.page.cta.description')}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to={PATH_PAGE.components}
                className={buildLinkClass(
                  'default',
                  'h-12 shadow-[0_26px_58px_-34px_color-mix(in_srgb,var(--primary)_72%,transparent)]'
                )}
              >
                {t('landing.page.cta.primary')}
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
              <Link
                to={PATH_PAGE.pages}
                className={buildLinkClass(
                  'outline',
                  'h-12 border-border/80 bg-[color:color-mix(in_srgb,var(--card)_88%,transparent)] text-foreground hover:border-primary/25 hover:text-foreground'
                )}
              >
                {t('landing.page.cta.secondary')}
              </Link>
            </div>
          </div>
        </m.div>
      </section>
    </div>
  );
}

function FloatingStatCard({
  children,
  shouldReduceMotion,
  reverse = false,
}: {
  children: ReactNode;
  shouldReduceMotion: boolean;
  reverse?: boolean;
}) {
  return (
    <m.div
      className="rounded-[1.6rem] border border-border/70 bg-[color:color-mix(in_srgb,var(--card)_92%,transparent)] px-5 py-4 shadow-[0_32px_90px_-60px_color-mix(in_srgb,var(--foreground)_40%,transparent)] backdrop-blur-xl"
      animate={
        shouldReduceMotion
          ? undefined
          : { y: reverse ? [0, 10, 0] : [0, -10, 0], rotate: reverse ? [0, -1.2, 0] : [0, 1.2, 0] }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </m.div>
  );
}
