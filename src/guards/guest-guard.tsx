import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
// hooks
import useAuth from '@/hooks/use-auth';
// routes
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_PAGE.adminDashboard} replace />;
  }

  return <>{children}</>;
}
