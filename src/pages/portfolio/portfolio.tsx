import Page from '@/components/page';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ArrowUpRightIcon,
  ChartNoAxesCombinedIcon,
  Code2Icon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  SmartphoneIcon,
  UsersIcon,
} from 'lucide-react';
import { startTransition, useDeferredValue, useState } from 'react';

interface PortfolioProject {
  name: string;
  url: string;
  category: 'Fintech' | 'SaaS' | 'Operations' | 'IoT' | 'Mobile';
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  highlights: string[];
}

interface Capability {
  title: string;
  description: string;
  icon: typeof Code2Icon;
}

const HERO_POINTS = [
  '10+ years building web and mobile products',
  'React, Next.js, React Native, Expo, and TypeScript',
  'Frontend systems, product UI, and delivery quality',
] as const;

const CAPABILITIES: Capability[] = [
  {
    title: 'Product-focused frontend engineering',
    description:
      'I build interfaces that are clear to use, practical to maintain, and strong enough for real product workflows.',
    icon: Code2Icon,
  },
  {
    title: 'Scalable UI systems',
    description:
      'Reusable components, shared conventions, and frontend architecture that help teams ship consistently.',
    icon: UsersIcon,
  },
  {
    title: 'Complex business products',
    description:
      'Fintech flows, operational dashboards, reporting, approval workflows, and role-aware product experiences.',
    icon: ChartNoAxesCombinedIcon,
  },
  {
    title: 'Mobile and cross-platform apps',
    description:
      'React Native and Expo delivery for finance, IoT, and utility apps with production-ready integrations.',
    icon: SmartphoneIcon,
  },
];

const PROJECTS: PortfolioProject[] = [
  {
    name: 'Pioneer Finance',
    url: 'https://pioneerfinance.co.nz/',
    category: 'Fintech',
    summary:
      'Loan management platform covering the journey from application to approval and account management.',
    problem:
      'The product needed one platform for customers, brokers, partners, and staff, with complex approvals, reporting, and financial integrations.',
    solution:
      'Built core product flows for loan lifecycle management, partner-facing experiences, reporting, and integrations with banking, credit bureau, and e-signature services.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'React Query',
      'NextAuth',
      'TailwindCSS',
      'Shadcn',
      'Prisma',
      'Playwright',
    ],
    highlights: [
      'AI-powered risk assessment and multi-level approvals',
      'Banking, Centrix, Docuseal, and Google Cloud Storage integrations',
      '112+ documented test cases in the delivery workflow',
    ],
  },
  {
    name: 'Monie',
    url: 'https://www.monie.co.nz/',
    category: 'Mobile',
    summary:
      'React Native finance app for loan applications, payments, and connected banking experiences.',
    problem:
      'The mobile product needed secure finance workflows, device-native capabilities, and a release process suitable for rapid iteration.',
    solution:
      'Led the frontend architecture and delivery for NFC payments, QR scanning, Akahu bank integration, biometric access, dashboards, and OTA update workflows.',
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'React Query',
      'Zustand',
      'BetterAuth',
      'Akahu',
      'OneSignal',
      'Sentry',
      'Amplitude',
    ],
    highlights: [
      'NFC payments, QR flows, and biometric authentication',
      'EAS Build and over-the-air update setup',
      'Production tooling with Jest, Husky, ESLint, and Prettier',
    ],
  },
  {
    name: 'AffordX',
    url: 'https://www.affordx.nz/',
    category: 'Fintech',
    summary:
      'Financial services platform for mortgage advisers managing clients, applications, planning, and meetings.',
    problem:
      'Advisers needed a single workspace for client management, mortgage workflows, financial planning, and collaboration in a multi-tenant environment.',
    solution:
      'Led a large React codebase with reusable components, data workflows, charting, Stripe, document generation, and real-time synchronization support.',
    stack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'React Query',
      'MUI',
      'Stripe',
      'Recharts',
      'uPlot',
      'Vite',
      'Vitest',
    ],
    highlights: [
      '175+ reusable components across the platform',
      'Automatic cache busting and bundle optimization',
      'CI/CD with GitHub Actions and AWS CloudFront',
    ],
  },
  {
    name: 'Ampisent',
    url: 'https://app.ampisent.com/',
    category: 'IoT',
    summary:
      'IoT energy monitoring platform for real-time tracking, alerting, analytics, and device management.',
    problem:
      'The product needed dashboards and mobile tools that could make live device data, health information, and configuration workflows easy to operate.',
    solution:
      'Delivered both web and React Native experiences covering device monitoring, historical analytics, alert management, Bluetooth and WiFi setup, and notifications.',
    stack: [
      'React',
      'React Native',
      'TypeScript',
      'Redux Toolkit',
      'React Query',
      'Firebase',
      'OneSignal',
      'Recharts',
      'i18next',
    ],
    highlights: [
      'Real-time voltage, current, and power monitoring',
      'BLE and WiFi device configuration workflows',
      'iOS and Android mobile delivery with Firebase crash reporting',
    ],
  },
  {
    name: 'Design Smart',
    url: 'https://uat.design-smart.devinci.app/',
    category: 'SaaS',
    summary:
      'Construction project management platform with versioning, templates, production tracking, and operational tools.',
    problem:
      'The platform had to coordinate project templates, production orders, inventory, labour, and permissions in one operational workflow.',
    solution:
      'Led the frontend for management dashboards, PDF generation, multilingual UI, drag-and-drop flows, and CI/CD-ready deployment with Docker and GitLab.',
    stack: [
      'React',
      'TypeScript',
      'React Query',
      'Redux Toolkit',
      'MUI',
      'React Konva',
      'React PDF',
      'dnd-kit',
      'Vite PWA',
    ],
    highlights: [
      'Versioning, templates, and production order tracking',
      'Inventory, labour, and role-based access management',
      'GitLab CI/CD and Docker-based deployment',
    ],
  },
  {
    name: 'My Livestock Transport',
    url: 'https://transport.mylivestock.co.nz/login',
    category: 'Operations',
    summary:
      'Operations platform for livestock transportation, scheduling, route planning, and delivery tracking.',
    problem:
      'The business needed multi-user transport workflows across farms, processors, and carriers, with route planning and live operational visibility.',
    solution:
      'Built the React application for planning, scheduling, CRUD workflows, maps, dashboard reporting, authentication, and multilingual delivery support.',
    stack: [
      'React',
      'TypeScript',
      'Redux Toolkit',
      'MUI',
      'Mapbox GL',
      'ApexCharts',
      'D3',
      'React Hook Form',
      'Docker',
    ],
    highlights: [
      'Interactive route planning and geocoding with Mapbox GL',
      'Role-based access with Auth0 and AWS Cognito',
      'Internationalization support across five languages',
    ],
  },
  {
    name: 'Emplify',
    url: 'https://beta.emplify.guru/',
    category: 'SaaS',
    summary:
      'Innovation culture platform with surveys, analytics, action plans, onboarding, and organisation management.',
    problem:
      'The product needed to turn survey and scorecard data into usable dashboards and action-oriented workflows for organisations.',
    solution:
      'Led frontend delivery for SCAN surveys, analytics, action plans, multilingual UX, and plan management with a maintainable React and TypeScript foundation.',
    stack: [
      'React',
      'TypeScript',
      'React Query',
      'Redux Toolkit',
      'MUI',
      'ApexCharts',
      'D3',
      'Jest',
      'Docker',
    ],
    highlights: [
      'SCAN surveys, scorecards, analytics, and action plans',
      'Hub experience for onboarding and newsroom content',
      'English, French, Vietnamese, Chinese, Arabic support',
    ],
  },
];

const PROJECT_CATEGORIES = ['All', 'Fintech', 'SaaS', 'Operations', 'IoT', 'Mobile'] as const;
type PortfolioCategory = (typeof PROJECT_CATEGORIES)[number];

const STACK_BADGE_CLASS_NAME =
  'rounded-full border border-border/70 bg-[color:color-mix(in_srgb,var(--background)_78%,white)] px-2.5 py-1 text-[11px] font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-[color:color-mix(in_srgb,var(--card)_92%,transparent)] dark:text-foreground';

const getProjectPreviewImage = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/760/noanimate/${encodeURIComponent(url)}`;

const getProjectFavicon = (url: string) =>
  `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(url)}`;

function ProjectImage({ name, url }: { name: string; url: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_22%_20%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_52%),linear-gradient(145deg,color-mix(in_srgb,var(--card)_90%,transparent),color-mix(in_srgb,var(--accent)_28%,transparent))]">
        <img
          src={getProjectFavicon(url)}
          alt=""
          className="size-16 rounded-2xl border border-border/60 bg-background/90 p-2 shadow-lg"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <img
      src={getProjectPreviewImage(url)}
      alt={`${name} preview`}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setImageFailed(true)}
    />
  );
}

function ProjectDetailsDialog({ project }: { project: PortfolioProject }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="w-full text-left">
          <Card className="group h-full overflow-hidden rounded-[1.75rem] border-border/70 bg-[color:color-mix(in_srgb,var(--background)_92%,transparent)] shadow-[0_28px_80px_-64px_color-mix(in_srgb,var(--foreground)_55%,transparent)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_34px_90px_-60px_color-mix(in_srgb,var(--primary)_42%,transparent)]">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60">
              <ProjectImage name={project.name} url={project.url} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            </div>

            <CardHeader className="space-y-4 pb-3">
              <Badge variant="outline" className="w-fit rounded-full text-[11px]">
                {project.category}
              </Badge>

              <div>
                <CardTitle className="text-2xl tracking-tight">{project.name}</CardTitle>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.summary}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((tag) => (
                  <Badge
                    key={`${project.name}-preview-${tag}`}
                    variant="outline"
                    className={STACK_BADGE_CLASS_NAME}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="rounded-2xl border border-border/65 bg-card/70 px-4 py-3 text-sm leading-6 text-foreground/88">
                {project.highlights[0]}
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex w-full items-center justify-between rounded-xl border border-transparent bg-card/65 px-3 py-2.5 text-sm text-muted-foreground transition-colors group-hover:border-border/80 group-hover:bg-card group-hover:text-foreground">
                <span>View project details</span>
                <ArrowUpRightIcon className="size-4 shrink-0" aria-hidden />
              </div>
            </CardFooter>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto p-0">
        <div className="relative aspect-[16/8] overflow-hidden border-b border-border/60">
          <ProjectImage name={project.name} url={project.url} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/8 to-transparent" />
        </div>

        <div className="p-6 sm:p-7">
          <DialogHeader className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full text-[11px]">
              {project.category}
            </Badge>
            <div>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {project.name}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-7 sm:text-base">
                {project.summary}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/65 bg-card/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Problem
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{project.problem}</p>
            </div>
            <div className="rounded-2xl border border-border/65 bg-card/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Solution
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/90">{project.solution}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Badge
                  key={`${project.name}-stack-${tag}`}
                  variant="outline"
                  className={STACK_BADGE_CLASS_NAME}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Delivery highlights
            </p>
            <div className="mt-3 space-y-2">
              {project.highlights.map((item) => (
                <div
                  key={`${project.name}-detail-${item}`}
                  className="rounded-2xl border border-border/65 bg-[color:color-mix(in_srgb,var(--background)_78%,transparent)] px-4 py-3 text-sm leading-6 text-foreground/88"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-6')}
            >
              Visit live project
              <ArrowUpRightIcon className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PortfolioPage() {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState<PortfolioCategory>('All');
  const deferredSearch = useDeferredValue(searchValue.trim().toLowerCase());

  const visibleProjects = PROJECTS.filter((project) => {
    const matchCategory = category === 'All' ? true : project.category === category;
    if (!deferredSearch) {
      return matchCategory;
    }

    const haystack = [
      project.name,
      project.summary,
      project.problem,
      project.solution,
      project.stack.join(' '),
      project.highlights.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return matchCategory && haystack.includes(deferredSearch);
  });

  return (
    <Page title="Pham Le Dang Khoi - Portfolio" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_58%),radial-gradient(circle_at_88%_8%,color-mix(in_srgb,var(--secondary)_18%,transparent),transparent_48%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_82%,transparent)_0%,transparent_100%)]"
      />

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-8 sm:px-6 lg:pt-10">
        <div className="rounded-[2rem] border border-border/65 bg-[color:color-mix(in_srgb,var(--background)_90%,transparent)] p-6 shadow-[0_40px_100px_-70px_color-mix(in_srgb,var(--foreground)_55%,transparent)] backdrop-blur-xl sm:p-8">
          <Badge className="rounded-full bg-primary/12 px-3 py-1 text-primary hover:bg-primary/15">
            Software Engineer
          </Badge>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            I design and build product interfaces for fintech, SaaS, logistics, IoT, and mobile
            apps.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            I focus on frontend systems that feel clear to use and practical to maintain. My work
            covers React, Next.js, React Native, Expo, and TypeScript, with an emphasis on reusable
            UI, complex product workflows, and dependable delivery.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {HERO_POINTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/65 bg-card/70 px-4 py-3 text-sm leading-6 text-foreground/90"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:pldkhoi@gmail.com"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'rounded-full px-6 shadow-[0_26px_58px_-34px_color-mix(in_srgb,var(--primary)_72%,transparent)]'
              )}
            >
              Get in touch
              <MailIcon className="size-4" aria-hidden />
            </a>
            <a
              href="tel:0901430110"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-full border-border/80 bg-card/80 px-6'
              )}
            >
              0901430110
              <PhoneIcon className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div className="rounded-[2rem] border border-border/60 bg-[color:color-mix(in_srgb,var(--background)_86%,transparent)] p-6 shadow-[0_30px_90px_-72px_color-mix(in_srgb,var(--foreground)_45%,transparent)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="rounded-full border-primary/20 text-primary">
                What I do
              </Badge>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                A concise view of how I work
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              This page stays intentionally short. It focuses on product engineering, selected work,
              and the kinds of systems I enjoy building.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;

              return (
                <Card
                  key={capability.title}
                  className="rounded-3xl border-border/70 bg-card/75 shadow-none"
                >
                  <CardContent className="space-y-3 p-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {capability.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-[2rem] border border-border/60 bg-[color:color-mix(in_srgb,var(--background)_88%,transparent)] p-6 shadow-[0_34px_90px_-70px_color-mix(in_srgb,var(--foreground)_45%,transparent)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="rounded-full bg-primary/12 px-3 py-1 text-primary hover:bg-primary/15">
                Selected work
              </Badge>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Selected projects
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                The cards stay concise on the page. Open a card to see the project context, frontend
                approach, and implementation details.
              </p>
            </div>

            <div className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-sm font-medium text-foreground">
              {visibleProjects.length} projects
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="relative block">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={searchValue}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  startTransition(() => setSearchValue(nextValue));
                }}
                placeholder="Search by project, domain, stack, feature, or responsibility"
                className="pl-9"
                aria-label="Search portfolio projects"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'rounded-full',
                    item === category &&
                      'border-primary/40 bg-[color:color-mix(in_srgb,var(--primary)_14%,var(--card))] text-primary'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectDetailsDialog key={project.url} project={project} />
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <Card className="mx-auto mt-6 max-w-xl rounded-3xl border-border/70 bg-card/80 text-center shadow-none">
              <CardContent className="space-y-2 py-10">
                <h3 className="text-lg font-semibold text-foreground">
                  No projects matched this filter
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Try another keyword or switch category to return to the full project list.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        <Card className="overflow-hidden rounded-[2rem] border-border/65 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--card)_90%,transparent)_0%,color-mix(in_srgb,var(--accent)_28%,transparent)_100%)] shadow-[0_34px_90px_-68px_color-mix(in_srgb,var(--primary)_48%,transparent)]">
          <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <Badge className="rounded-full bg-primary/12 px-3 py-1 text-primary hover:bg-primary/12">
                Contact
              </Badge>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                If the work feels aligned, reach out.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                I enjoy building thoughtful product interfaces, frontend systems, and dependable
                delivery workflows. Email or call if you want to talk about a project.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="mailto:pldkhoi@gmail.com"
                className={cn(buttonVariants({ size: 'lg' }), 'rounded-full px-6')}
              >
                pldkhoi@gmail.com
                <MailIcon className="size-4" aria-hidden />
              </a>
              <a
                href="tel:0901430110"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'rounded-full border-border/75 bg-background/75 px-6'
                )}
              >
                0901430110
                <PhoneIcon className="size-4" aria-hidden />
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </Page>
  );
}
