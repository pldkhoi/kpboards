import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH_PAGE } from '@/routes/paths';
import {
  BlocksIcon,
  BookOpenIcon,
  BriefcaseBusinessIcon,
  FileLock2Icon,
  FileSearchIcon,
  FileTextIcon,
  HomeIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  LogInIcon,
  MailCheckIcon,
  PackageIcon,
  RotateCcwIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router';

interface PageItem {
  title: string;
  path: string;
  description: string;
  icon: LucideIcon;
}

interface PageGroup {
  title: string;
  description: string;
  pages: PageItem[];
}

const PAGE_GROUPS: PageGroup[] = [
  {
    title: 'Public Pages',
    description: 'Accessible routes for guests and general navigation.',
    pages: [
      {
        title: 'Home',
        path: PATH_PAGE.home,
        description: 'Landing page and product overview.',
        icon: HomeIcon,
      },
      {
        title: 'Pages Index',
        path: PATH_PAGE.pages,
        description: 'Route catalog and page navigation.',
        icon: LayoutTemplateIcon,
      },
      {
        title: 'Components Showcase',
        path: PATH_PAGE.components,
        description: 'UI component demos and implementation snippets.',
        icon: BlocksIcon,
      },
      {
        title: 'Portfolio',
        path: PATH_PAGE.portfolio,
        description: 'Curated project cards and detailed portfolio case studies.',
        icon: BriefcaseBusinessIcon,
      },
    ],
  },
  {
    title: 'Authentication Pages',
    description: 'Guest-only auth flow and account recovery routes.',
    pages: [
      {
        title: 'Login',
        path: PATH_PAGE.login,
        description: 'Sign in with existing credentials.',
        icon: LogInIcon,
      },
      {
        title: 'Register',
        path: PATH_PAGE.register,
        description: 'Create a new account.',
        icon: UserPlusIcon,
      },
      {
        title: 'Forgot Password',
        path: PATH_PAGE.forgotPassword,
        description: 'Request reset instructions by email.',
        icon: KeyRoundIcon,
      },
      {
        title: 'Reset Password',
        path: PATH_PAGE.resetPassword,
        description: 'Set a new password using a token.',
        icon: RotateCcwIcon,
      },
      {
        title: 'Verify Email',
        path: PATH_PAGE.verifyEmail,
        description: 'Confirm account email ownership.',
        icon: MailCheckIcon,
      },
      {
        title: 'OTP',
        path: PATH_PAGE.otp,
        description: 'Submit one-time verification code.',
        icon: ShieldCheckIcon,
      },
    ],
  },
  {
    title: 'Admin Pages',
    description: 'Protected routes behind authentication and admin workflows.',
    pages: [
      {
        title: 'Admin Dashboard',
        path: PATH_PAGE.adminDashboard,
        description: 'Overview metrics and operational widgets.',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Admin Users',
        path: PATH_PAGE.adminUsers,
        description: 'User management and account operations.',
        icon: UsersIcon,
      },
      {
        title: 'Admin Roles',
        path: PATH_PAGE.adminRoles,
        description: 'Role definitions and permission setup.',
        icon: ShieldIcon,
      },
      {
        title: 'Admin Products',
        path: PATH_PAGE.adminProducts,
        description: 'Product catalog maintenance.',
        icon: PackageIcon,
      },
      {
        title: 'Admin Orders',
        path: PATH_PAGE.adminOrders,
        description: 'Order lifecycle and fulfillment tracking.',
        icon: ShoppingCartIcon,
      },
      {
        title: 'Admin Audit Logs',
        path: PATH_PAGE.adminAuditLogs,
        description: 'System event and activity history.',
        icon: FileSearchIcon,
      },
      {
        title: 'Admin Settings',
        path: PATH_PAGE.adminSettings,
        description: 'Project and user-level configuration.',
        icon: SettingsIcon,
      },
      {
        title: 'Admin Docs',
        path: PATH_PAGE.adminDocs,
        description: 'Admin-side documentation reference.',
        icon: BookOpenIcon,
      },
    ],
  },
  {
    title: 'Legal Pages',
    description: 'Global legal policies for platform use and data handling.',
    pages: [
      {
        title: 'Privacy Policy',
        path: PATH_PAGE.privacyPolicy,
        description: 'How KPBoards collects, uses, and protects your information.',
        icon: FileLock2Icon,
      },
      {
        title: 'Terms and Conditions',
        path: PATH_PAGE.termsAndConditions,
        description: 'Rules and responsibilities for using KPBoards services.',
        icon: FileTextIcon,
      },
    ],
  },
];

export default function PagesIndexPage() {
  const totalPages = PAGE_GROUPS.reduce((sum, group) => sum + group.pages.length, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:space-y-12 sm:py-16">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All Pages</h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Complete route catalog for this project. Use this page to navigate quickly across public,
          auth, admin, and legal sections.
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {totalPages} routes listed
        </p>
      </header>

      {PAGE_GROUPS.map((group) => (
        <section key={group.title} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.pages.map((page) => {
              const Icon = page.icon;

              return (
                <Card key={page.path} className="h-full">
                  <CardHeader>
                    <Icon className="mb-2 size-6 text-primary" aria-hidden />
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                      {page.path}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={page.path}>Open page</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
