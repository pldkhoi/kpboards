import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
// components
import LoadingScreen from '@/components/loading-screen';
// hooks
import useAuth from '@/hooks/use-auth';
// routes
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATH_PAGE.login}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <>{children}</>;
}
