import { useNavigate, useLocation } from "react-router-dom";
import {
  Zap,
  Home,
  Bot,
  LayoutGrid,
  Store,
  Layers,
  BookOpen,
  Activity,
  BarChart3,
  Settings,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: Home, route: ROUTES.DASHBOARD },
    { id: "agents", label: "My Agents", icon: Bot, route: ROUTES.AGENTS },
    {
      id: "templates",
      label: "Templates",
      icon: LayoutGrid,
      route: ROUTES.TEMPLATES,
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: Store,
      route: ROUTES.MARKETPLACE,
    },
    {
      id: "workflows",
      label: "Workflows",
      icon: Activity,
      route: ROUTES.WORKFLOWS,
    },
    {
      id: "blueprint",
      label: "Blueprint & Specs",
      icon: Sparkles,
      route: ROUTES.BLUEPRINT,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Layers,
      route: ROUTES.INTEGRATIONS,
    },
    {
      id: "knowledge",
      label: "Knowledge",
      icon: BookOpen,
      route: ROUTES.KNOWLEDGE,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      route: ROUTES.ANALYTICS,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      route: ROUTES.SETTINGS,
    },
    {
      id: "documentation",
      label: "Documentation",
      icon: BookOpen,
      route: ROUTES.DOCUMENTATION,
    },
  ];

  const currentPath = location.pathname;

  return (
    <aside className="w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shrink-0 p-4 h-screen sticky top-0 z-40 transition-colors">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 px-2 py-1 cursor-pointer"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
            <Zap className="h-4.5 w-4.5 fill-current" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vibe Agents
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 text-sm font-semibold">
          {navItems.map((nav) => {
            const Icon = nav.icon;
            const isActive =
              currentPath === nav.route ||
              (nav.id === "agents" && currentPath.startsWith("/agents")) ||
              (nav.id === "home" && currentPath === "/dashboard");

            return (
              <button
                key={nav.id}
                onClick={() => navigate(nav.route)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-violet-100/80 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${isActive ? "text-violet-600 dark:text-violet-400" : "text-slate-400"}`}
                />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Upgrade to Pro Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:via-violet-950/40 dark:to-slate-800/80 border border-violet-100 dark:border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-violet-900 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span>Upgrade to Pro</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug font-normal">
            Unlock unlimited agents, advanced features and priority support.
          </p>
          <button
            onClick={() => navigate(ROUTES.BILLING)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Workspace Selector Footer */}
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-xs font-bold text-slate-900 dark:text-white cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-violet-600 text-white flex items-center justify-center text-[10px]">
              ❖
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Vibe Workspace
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Team Plan
              </span>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
