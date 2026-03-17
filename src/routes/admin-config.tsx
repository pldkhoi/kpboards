import { PATH_PAGE } from '@/routes/paths';
import {
  FileTextIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ReceiptTextIcon,
  ScrollTextIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: PATH_PAGE.adminDashboard,
    icon: <LayoutDashboardIcon className="size-5" />,
  },
  { title: 'Users', path: PATH_PAGE.adminUsers, icon: <UsersIcon className="size-5" /> },
  { title: 'Roles', path: PATH_PAGE.adminRoles, icon: <ShieldIcon className="size-5" /> },
  { title: 'Products', path: PATH_PAGE.adminProducts, icon: <PackageIcon className="size-5" /> },
  { title: 'Orders', path: PATH_PAGE.adminOrders, icon: <ReceiptTextIcon className="size-5" /> },
  {
    title: 'Audit Logs',
    path: PATH_PAGE.adminAuditLogs,
    icon: <ScrollTextIcon className="size-5" />,
  },
  {
    title: 'Settings',
    path: PATH_PAGE.adminSettings,
    icon: <SettingsIcon className="size-5" />,
  },
  {
    title: 'Docs',
    path: PATH_PAGE.adminDocs,
    icon: <FileTextIcon className="size-5" />,
  },
] as const;

export const ADMIN_BREADCRUMB_LABELS: Record<string, string> = {
  [PATH_PAGE.admin]: 'Admin',
  [PATH_PAGE.adminDashboard]: 'Dashboard',
  [PATH_PAGE.adminUsers]: 'Users',
  [PATH_PAGE.adminRoles]: 'Roles',
  [PATH_PAGE.adminProducts]: 'Products',
  [PATH_PAGE.adminOrders]: 'Orders',
  [PATH_PAGE.adminAuditLogs]: 'Audit Logs',
  [PATH_PAGE.adminSettings]: 'Settings',
  [PATH_PAGE.adminDocs]: 'Docs',
};
