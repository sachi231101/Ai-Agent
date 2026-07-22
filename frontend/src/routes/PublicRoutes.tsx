import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/lib/constants';

export function PublicRoutes() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return <Outlet />;
}
