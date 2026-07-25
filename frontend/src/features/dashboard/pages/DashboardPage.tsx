import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Bot,
  LayoutGrid,
  Store,
  Layers,
  BookOpen,
  Activity,
  BarChart3,
  Settings,
  Zap,
  Plus,
  Search,
  Bell,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  MoreHorizontal,
  Mail,
  Video,
  Share2,
  MessageSquare,
  Sparkles,
  ChevronDown,
  MessageCircle,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/constants";
import { ProjectEditScreen } from "@/features/studio/components/workspace/ProjectEditScreen";
import { SAMPLE_PROJECTS } from "@/features/studio/data/sampleProjects";
import { useTheme } from "@/providers/ThemeProvider";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { resolvedTheme } = useTheme();

  // User details
  const userName = user?.name || "Sachin A";
  const firstName = userName.split(" ")[0];
  const userRole = "Founder";

  // State
  const [projects, setProjects] = useState<ProjectItem[]>(SAMPLE_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [timeRange, setTimeRange] = useState("This Week");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAgentPrompt, setNewAgentPrompt] = useState("");

  // Sample data for Dashboard UI matching screenshot
  const recentAgents = [
    {
      id: "ag-1",
      name: "Email Assistant",
      desc: "Summarize emails and send daily report",
      status: "Active",
      statusColor: "bg-emerald-500",
      statusBadge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400",
      updated: "Updated 2h ago",
      icon: Bot,
      iconBg:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300",
      avatarImg: "/assets-icons/robot-purple.png",
    },
    {
      id: "ag-2",
      name: "Content Planner",
      desc: "Generate content ideas and calendar",
      status: "Building",
      statusColor: "bg-amber-500",
      statusBadge:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400",
      updated: "Updated 5h ago",
      icon: Sparkles,
      iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300",
      avatarImg: "/assets-icons/robot-blue.png",
    },
    {
      id: "ag-3",
      name: "Lead Qualifier",
      desc: "Qualify leads from form submissions",
      status: "Active",
      statusColor: "bg-emerald-500",
      statusBadge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400",
      updated: "Updated 1d ago",
      icon: Zap,
      iconBg:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
      avatarImg: "/assets-icons/robot-green.png",
    },
    {
      id: "ag-4",
      name: "Slack Notifier",
      desc: "Monitor mentions and notify team",
      status: "Draft",
      statusColor: "bg-slate-400",
      statusBadge:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      updated: "Updated 2d ago",
      icon: MessageSquare,
      iconBg:
        "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
      avatarImg: "/assets-icons/robot-purple.png",
    },
  ];

  const quickStartTemplates = [
    {
      id: "tpl-1",
      name: "Email Summary Agent",
      desc: "Summarize emails and send reports",
      icon: Mail,
      color:
        "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
    },
    {
      id: "tpl-2",
      name: "Meeting Notes Agent",
      desc: "Record, transcribe and summarize meetings",
      icon: Video,
      color:
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300",
    },
    {
      id: "tpl-3",
      name: "Social Media Agent",
      desc: "Create posts and schedule automatically",
      icon: Share2,
      color: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    },
    {
      id: "tpl-4",
      name: "Customer Support Agent",
      desc: "Answer customer queries 24/7",
      icon: MessageSquare,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
    },
  ];

  const recentActivities = [
    {
      id: "act-1",
      title: "Email Assistant was updated",
      time: "2 hours ago",
      icon: Mail,
      color:
        "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    },
    {
      id: "act-2",
      title: "Connected Gmail to Email Assistant",
      time: "5 hours ago",
      icon: Mail,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    },
    {
      id: "act-3",
      title: "Content Planner agent created",
      time: "Yesterday",
      icon: MessageSquare,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      id: "act-4",
      title: "Slack Notifier is now live",
      time: "2 days ago",
      icon: MessageSquare,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      id: "act-5",
      title: "Lead Qualifier was updated",
      time: "3 days ago",
      icon: Zap,
      color: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    },
  ];

  const handleCreateNewAgent = (promptText?: string) => {
    const prompt = promptText || newAgentPrompt;
    if (!prompt.trim()) return;

    setNewAgentPrompt("");
    setIsCreateModalOpen(false);
    navigate(ROUTES.STUDIO, { state: { initialPrompt: prompt } });
  };

  // Dynamic Usage Chart Data bound to timeRange selection
  const usageChartDataMap = {
    'This Week': [
      { name: 'Mon', executions: 1420, messages: 410, hours: 98 },
      { name: 'Tue', executions: 1850, messages: 520, hours: 130 },
      { name: 'Wed', executions: 1680, messages: 490, hours: 115 },
      { name: 'Thu', executions: 2190, messages: 630, hours: 160 },
      { name: 'Fri', executions: 2450, messages: 710, hours: 180 },
      { name: 'Sat', executions: 1210, messages: 240, hours: 90 },
      { name: 'Sun', executions: 1658, messages: 245, hours: 119 },
    ],
    'This Month': [
      { name: 'W1', executions: 8400, messages: 2100, hours: 590 },
      { name: 'W2', executions: 11200, messages: 2850, hours: 780 },
      { name: 'W3', executions: 14900, messages: 3600, hours: 960 },
      { name: 'W4', executions: 16800, messages: 4200, hours: 1120 },
    ],
    'All Time': [
      { name: 'Jan', executions: 18500, messages: 4900, hours: 1300 },
      { name: 'Feb', executions: 24200, messages: 6100, hours: 1720 },
      { name: 'Mar', executions: 31000, messages: 8400, hours: 2200 },
      { name: 'Apr', executions: 42000, messages: 11200, hours: 3100 },
    ],
  };

  const activeChartData = usageChartDataMap[timeRange as keyof typeof usageChartDataMap] || usageChartDataMap['This Week'];

  const totalExecutions = activeChartData.reduce((acc, curr) => acc + curr.executions, 0);
  const totalMessages = activeChartData.reduce((acc, curr) => acc + curr.messages, 0);
  const totalHours = activeChartData.reduce((acc, curr) => acc + curr.hours, 0);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("dashboardSearchInput");
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Render Studio Edit Screen if a project is opened
  const currentProject = projects.find((p) => p.id === selectedProjectId);
  if (selectedProjectId && currentProject) {
    return (
      <div className="w-full h-screen bg-[#0b0a10] text-white flex flex-col overflow-hidden">
        <ProjectEditScreen
          project={currentProject}
          allProjects={projects}
          onBackToProjects={() => setSelectedProjectId(null)}
          onSelectOtherProject={(id) => setSelectedProjectId(id)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ─── MAIN CONTENT CANVAS ─────────────────────────────────────────────── */}
      <main className="w-full p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* ─── TOP HEADER BAR ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Welcome Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Welcome back, {firstName}{" "}
              <span className="animate-bounce inline-block">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal">
              What would you like to build today?
            </p>
          </div>

          {/* Header Controls Right */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input Box */}
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="dashboardSearchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search agents, templates..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 shadow-xs"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => navigate(ROUTES.NOTIFICATIONS)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs relative"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Help Question Icon */}
            <button
              onClick={() => navigate(ROUTES.KNOWLEDGE)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
              title="Help & Docs"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() =>
                navigate(ROUTES.STUDIO, {
                  state: { createNew: true, timestamp: Date.now() },
                })
              }
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-all shadow-md shadow-violet-500/20 flex items-center gap-1.5 shrink-0 hover:scale-[1.02]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Create New Agent</span>
            </button>
          </div>
        </div>

        {/* ─── TOP ACTION CARDS GRID (4 Cards) ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Create New Agent (Highlighted Light Purple) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50/90 to-purple-50/70 dark:from-slate-900 dark:to-violet-950/40 border border-violet-200/80 dark:border-violet-800/60 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-500/20">
                <Plus className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  Create New Agent
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Start building an AI agent with your own idea.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                navigate(ROUTES.STUDIO, {
                  state: { createNew: true, timestamp: Date.now() },
                })
              }
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20"
            >
              <span>Create Agent</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Card 2: Explore Templates */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  Explore Templates
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Choose from 50+ ready-to-use templates.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(ROUTES.TEMPLATES)}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs font-semibold transition-colors"
            >
              Browse Templates
            </button>
          </div>

          {/* Card 3: Connect Integrations */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  Connect Integrations
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Connect your favorite apps and services.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(ROUTES.INTEGRATIONS)}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs font-semibold transition-colors"
            >
              Manage Integrations
            </button>
          </div>

          {/* Card 4: View Documentation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  View Documentation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Learn how to build, test and deploy agents.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(ROUTES.KNOWLEDGE)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs font-semibold transition-colors"
            >
              <span>Read Docs</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ─── MIDDLE SECTION GRID (3 Columns) ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Recent Agents (Lg: col-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Recent Agents
                </h2>
                <button
                  onClick={() => navigate(ROUTES.AGENTS)}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {recentAgents.map((ag) => {
                  const Icon = ag.icon;
                  return (
                    <div
                      key={ag.id}
                      onClick={() => navigate(`/agents/${ag.id}`)}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {ag.avatarImg ? (
                          <img
                            src={ag.avatarImg}
                            alt={ag.name}
                            className="w-9 h-9 rounded-xl object-cover shadow-sm shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-xl ${ag.iconBg} flex items-center justify-center shrink-0`}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                              {ag.name}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${ag.statusBadge}`}
                            >
                              {ag.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {ag.desc}
                          </p>
                        </div>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Start Templates (Lg: col-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Quick Start Templates
                </h2>
                <button
                  onClick={() => navigate(ROUTES.TEMPLATES)}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {quickStartTemplates.map((tpl) => {
                  const Icon = tpl.icon;
                  return (
                    <div
                      key={tpl.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl ${tpl.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {tpl.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {tpl.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(ROUTES.STUDIO)}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 text-xs font-semibold hover:bg-violet-50 dark:hover:bg-slate-700 transition-colors shrink-0 ml-2"
                      >
                        Use
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Recent Activity (Lg: col-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Recent Activity
                </h2>
                <button
                  onClick={() => navigate(ROUTES.ANALYTICS)}
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3.5">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg ${act.color} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">
                          {act.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM SECTION GRID (3 Columns) ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Usage Overview (Lg: col-5) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Usage Overview
              </h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            {/* 3 Metric Summary Boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white block">
                  {totalExecutions.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight block mt-0.5">
                  Agent Executions{" "}
                  <span className="text-emerald-500 font-bold">↑ 24%</span>
                </span>
              </div>

              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white block">
                  {totalMessages.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight block mt-0.5">
                  Messages Processed{" "}
                  <span className="text-emerald-500 font-bold">↑ 18%</span>
                </span>
              </div>

              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white block">
                  {totalHours.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight block mt-0.5">
                  Hours Saved{" "}
                  <span className="text-emerald-500 font-bold">↑ 32%</span>
                </span>
              </div>
            </div>

            {/* Interactive Recharts Area Chart */}
            <div className="h-44 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activeChartData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rechartsPurpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={resolvedTheme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: resolvedTheme === 'dark' ? '#0f172a' : '#ffffff',
                      borderColor: resolvedTheme === 'dark' ? '#334155' : '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '11px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      color: resolvedTheme === 'dark' ? '#f8fafc' : '#0f172a',
                    }}
                    formatter={(value: any) => [Number(value).toLocaleString(), 'Executions']}
                  />
                  <Area
                    type="monotone"
                    dataKey="executions"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#rechartsPurpleGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Column 2: Agents by Status (Lg: col-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Agents by Status
            </h2>

            <div className="flex items-center justify-around py-2">
              {/* Circular Donut Graphic */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  {/* Background Track */}
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Active segment (Emerald) */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="42, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Building segment (Amber) */}
                  <path
                    className="text-amber-500"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-42"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white block leading-none">
                    12
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                    Total Agents
                  </span>
                </div>
              </div>

              {/* Status Legend List */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Active
                  </span>
                  <span className="text-slate-400 text-[11px] ml-auto">
                    5 (42%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Building
                  </span>
                  <span className="text-slate-400 text-[11px] ml-auto">
                    3 (25%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Draft
                  </span>
                  <span className="text-slate-400 text-[11px] ml-auto">
                    2 (17%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Paused
                  </span>
                  <span className="text-slate-400 text-[11px] ml-auto">
                    2 (16%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Need Help? / Community Box (Lg: col-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4 ">
            {/* Embedded 3D Community Graphic */}
            <div className="relative overflow-hidden">
              <img
                src="/images/need-help-card.png"
                alt="Need Help - Join our community"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Bubble Widget Button */}
      <button
        onClick={() => navigate(ROUTES.STUDIO)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-xl shadow-violet-500/30 hover:scale-110 transition-transform z-40"
        title="Open AI Agent Studio"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
      </button>

      {/* ─── CREATE AGENT MODAL ────────────────────────────────────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                  <Plus className="h-4 w-4 stroke-[3]" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Create New AI Agent
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Describe what you want your AI agent to do. Our AI Architect will
              design the instructions, capabilities, and integrations.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateNewAgent();
              }}
              className="space-y-4"
            >
              <textarea
                rows={4}
                value={newAgentPrompt}
                onChange={(e) => setNewAgentPrompt(e.target.value)}
                placeholder="e.g. Build an AI agent that monitors my GitHub repo PRs, runs static code analysis, and posts summary reports to Slack."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 resize-none"
              />

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Quick Idea Templates:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCreateNewAgent(
                        "Build an AI agent that reads my unread Gmail emails every morning at 8:00 AM and sends urgent summaries to WhatsApp.",
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[11px] font-semibold border border-violet-200 dark:border-violet-800 hover:bg-violet-100 transition-colors"
                  >
                    + Gmail to WhatsApp Agent
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleCreateNewAgent(
                        "Build an AI agent that monitors GitHub repo PRs, runs static code analysis, and posts reports to Slack.",
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[11px] font-semibold border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition-colors"
                  >
                    + GitHub PR Reviewer
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleCreateNewAgent(
                        "Build an AI agent that records meeting audio, transcribes it, and sends action items to Notion.",
                      )
                    }
                    className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    + Meeting Summarizer
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newAgentPrompt.trim()}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-violet-500/20 flex items-center gap-1.5"
                >
                  <span>Build Agent</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
