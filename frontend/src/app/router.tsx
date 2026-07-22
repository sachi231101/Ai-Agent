import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PublicRoutes } from '@/routes/PublicRoutes';
import { PrivateRoutes } from '@/routes/PrivateRoutes';
import { routeConfig } from '@/routes/routeConfig';
import { AppLayout } from '@/components/layouts/AppLayout';
import { ROUTES } from '@/lib/constants';

const AuthSuccessPage = lazy(() => import('@/features/auth/pages/AuthSuccessPage'));

const fallbackSpinner = (
  <div className="flex h-screen items-center justify-center">
    <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const router = createBrowserRouter([
  // Public routes (unauthenticated only — redirects authenticated to /studio)
  {
    element: <PublicRoutes />,
    children: routeConfig.public.map(({ path, component: Page }) => ({
      path,
      element: <Suspense fallback={fallbackSpinner}><Page /></Suspense>,
    })),
  },
  // Auth success transition — accessible right after login
  {
    path: ROUTES.AUTH_SUCCESS,
    element: <Suspense fallback={fallbackSpinner}><AuthSuccessPage /></Suspense>,
  },
  // Private routes (wrapped in AppLayout with sidebar/topbar)
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: routeConfig.private.map(({ path, component: Page }) => ({
          path,
          element: <Suspense fallback={<div className="flex h-full items-center justify-center"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}><Page /></Suspense>,
        })),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
