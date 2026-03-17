import { AdminLayoutWrapper } from '@/components/admin-layout';
import LoadingScreen from '@/components/loading-screen';
import AuthGuard from '@/guards/auth-guard';
import GuestGuard from '@/guards/guest-guard';
import LogoOnlyLayout from '@/layouts/logo-only-layout';
import MainLayout from '@/layouts/main';
import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router';
import { PATH_PAGE } from './paths';

const LandingPage = lazy(() => import('@/pages/landing/landing'));
const PagesIndexPage = lazy(() => import('@/pages/pages/pages-index'));
const PortfolioPage = lazy(() => import('@/pages/portfolio/portfolio'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/verify-email'));
const OtpPage = lazy(() => import('@/pages/auth/otp'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/admin-dashboard'));
const AdminUsersPage = lazy(() => import('@/pages/admin/admin-users'));
const AdminRolesPage = lazy(() => import('@/pages/admin/admin-roles'));
const AdminProductsPage = lazy(() => import('@/pages/admin/admin-products'));
const AdminOrdersPage = lazy(() => import('@/pages/admin/admin-orders'));
const AdminAuditLogsPage = lazy(() => import('@/pages/admin/admin-audit-logs'));
const AdminDocsPage = lazy(() => import('@/pages/admin/admin-docs'));
const AdminSettingsPage = lazy(() => import('@/pages/admin/admin-settings'));
const ComponentsShowcasePage = lazy(
  () => import('@/pages/components-showcase/components-showcase')
);
const PrivacyPolicyPage = lazy(() => import('@/pages/legal/privacy-policy'));
const TermsAndConditionsPage = lazy(() => import('@/pages/legal/terms-and-conditions'));
const NotFound = lazy(() => import('@/pages/not-found'));

const publicRoutes = [
  { index: true, element: <LandingPage /> },
  { path: 'portfolio', element: <PortfolioPage /> },
  { path: 'pages', element: <PagesIndexPage /> },
  { path: 'components', element: <ComponentsShowcasePage /> },
  { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
  { path: 'terms-and-conditions', element: <TermsAndConditionsPage /> },
];

const guestRoutes = [
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },
  { path: 'forgot-password', element: <ForgotPasswordPage /> },
  { path: 'reset-password', element: <ResetPasswordPage /> },
  { path: 'verify-email', element: <VerifyEmailPage /> },
  { path: 'otp', element: <OtpPage /> },
];

const adminRoutes = [
  {
    index: true,
    element: <Navigate to={PATH_PAGE.adminDashboard} replace />,
  },
  { path: 'dashboard', element: <AdminDashboardPage /> },
  { path: 'users', element: <AdminUsersPage /> },
  { path: 'roles', element: <AdminRolesPage /> },
  { path: 'products', element: <AdminProductsPage /> },
  { path: 'orders', element: <AdminOrdersPage /> },
  { path: 'audit-logs', element: <AdminAuditLogsPage /> },
  { path: 'settings', element: <AdminSettingsPage /> },
  { path: 'docs', element: <AdminDocsPage /> },
];

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: publicRoutes,
    },
    {
      path: '/',
      element: (
        <GuestGuard>
          <LogoOnlyLayout />
        </GuestGuard>
      ),
      children: guestRoutes,
    },
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <AdminLayoutWrapper />
        </AuthGuard>
      ),
      children: adminRoutes,
    },
    { path: '/dashboard/*', element: <Navigate to={PATH_PAGE.adminDashboard} replace /> },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to={PATH_PAGE.page404} replace /> },
  ]);

  return <Suspense fallback={<LoadingScreen />}>{routes}</Suspense>;
}
