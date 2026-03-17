import Logo from '@/components/logo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import useResponsive from '@/hooks/use-responsive';
import { ADMIN_BREADCRUMB_LABELS, ADMIN_NAV_ITEMS } from '@/routes/admin-config';
import { PATH_PAGE } from '@/routes/paths';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import AdminHeader from './admin-header';
import AdminSidebar, {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  type AdminNavItem,
} from './admin-sidebar';

// ----------------------------------------------------------------------

export interface AdminLayoutProps {
  children: React.ReactNode;
  navItems?: AdminNavItem[];
  breadcrumb?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  userMenu?: React.ReactNode;
  userDisplayName?: string;
  logo?: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function AdminLayout({
  children,
  navItems = [],
  breadcrumb,
  searchPlaceholder,
  onSearch,
  userMenu,
  userDisplayName,
  logo,
}: AdminLayoutProps) {
  const isDesktop = useResponsive('up', 'sm');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleCollapseToggle = () => setSidebarCollapsed((v) => !v);
  const handleMobileMenuOpen = () => setMobileSidebarOpen(true);
  const handleMobileSidebarClose = () => setMobileSidebarOpen(false);

  const sidebarWidth = isDesktop ? (sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH) : 0;

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,143,123,0.12),transparent_26%),radial-gradient(circle_at_top_right,rgba(18,53,72,0.12),transparent_22%)]" />
      <AdminSidebar
        navItems={navItems}
        logo={logo}
        isCollapsed={sidebarCollapsed}
        isDesktop={isDesktop}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <div
        className="relative flex min-h-screen flex-1 flex-col transition-[margin-left] duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <AdminHeader
          breadcrumb={breadcrumb}
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
          userMenu={userMenu}
          userDisplayName={userDisplayName}
          isDesktop={isDesktop}
          isCollapsed={sidebarCollapsed}
          onMenuClick={handleMobileMenuOpen}
          onCollapseClick={handleCollapseToggle}
        />

        <main className="relative flex-1 px-4 pb-8 pt-5 md:px-6 md:pb-10 md:pt-6">{children}</main>
      </div>
    </div>
  );
}

export { AdminHeader, AdminSidebar };
export type { AdminNavItem };

// ----------------------------------------------------------------------

export function AdminLayoutWrapper() {
  const { pathname } = useLocation();
  const currentLabel = ADMIN_BREADCRUMB_LABELS[pathname] ?? 'Admin';

  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to={PATH_PAGE.admin} />}>Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <AdminLayout
      navItems={[...ADMIN_NAV_ITEMS] as AdminNavItem[]}
      breadcrumb={breadcrumb}
      searchPlaceholder="Search customers, reports, or settings..."
      logo={<Logo className="text-lg" />}
    >
      <Outlet />
    </AdminLayout>
  );
}
