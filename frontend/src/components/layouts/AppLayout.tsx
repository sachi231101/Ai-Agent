import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/navigation/Sidebar';
import { ROUTES } from '@/lib/constants';

export function AppLayout() {
  const location = useLocation();

  // Pages that render full screen without the dashboard sidebar (e.g. Studio Canvas)
  const isFullScreenPage = location.pathname === ROUTES.STUDIO;

  if (isFullScreenPage) {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-100 flex flex-col">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-100 flex transition-colors overflow-hidden">
      {/* Left Navigation Sidebar - Fixed on left */}
      <Sidebar />

      {/* Main Page Workspace Content Container - Scrollable area */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
