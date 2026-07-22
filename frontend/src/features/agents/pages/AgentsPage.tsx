import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Sparkles,
  Play,
  Clock,
  CheckCircle2,
  Share2,
  MoreHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Star,
  User,
  PauseCircle,
  HelpCircle,
  Bell,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Headphones,
  PieChart,
  FileText,
  Database,
  MessageCircle
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function AgentsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>({
    'ag-1': true,
  });

  const agentsList = [
    {
      id: 'ag-1',
      name: 'Email Summary Agent',
      desc: 'Summarizes important emails every morning and sends a report to Slack.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated just now',
      runs: '342 runs',
      saved: '12h saved',
      avatarImg: '/assets-icons/robot-purple.png',
      iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300',
    },
    {
      id: 'ag-2',
      name: 'Social Media Manager',
      desc: 'Creates, schedules and publishes social media posts across platforms.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated 2h ago',
      runs: '210 runs',
      saved: '8h saved',
      icon: Volume2,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400',
    },
    {
      id: 'ag-3',
      name: 'Support Ticket Resolver',
      desc: 'Automatically triages and responds to customer support tickets.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated 5h ago',
      runs: '542 runs',
      saved: '24h saved',
      icon: Headphones,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
    },
    {
      id: 'ag-4',
      name: 'Sales Lead Qualifier',
      desc: 'Qualifies incoming leads and adds high-quality leads to CRM.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated 1d ago',
      runs: '186 runs',
      saved: '9h saved',
      icon: PieChart,
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400',
    },
    {
      id: 'ag-5',
      name: 'Meeting Notes Agent',
      desc: 'Joins meetings, takes notes and sends summary to participants.',
      status: 'Draft',
      statusType: 'draft',
      updated: 'Updated 2d ago',
      runs: '0 runs',
      saved: '0h saved',
      icon: FileText,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400',
    },
    {
      id: 'ag-6',
      name: 'Data Sync Agent',
      desc: 'Syncs data between apps and keeps everything up to date.',
      status: 'Draft',
      statusType: 'draft',
      updated: 'Updated 2d ago',
      runs: '0 runs',
      saved: '0h saved',
      icon: Database,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/80 dark:text-purple-400',
    },
    {
      id: 'ag-7',
      name: 'WhatsApp Responder',
      desc: 'Auto-responds to WhatsApp messages and handles common queries.',
      status: 'Paused',
      statusType: 'paused',
      updated: 'Updated 4d ago',
      runs: '98 runs',
      saved: '4h saved',
      icon: MessageCircle,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
    },
    {
      id: 'ag-8',
      name: 'Invoice Generator',
      desc: 'Generates invoices from orders and emails them to customers.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated 5d ago',
      runs: '156 runs',
      saved: '6h saved',
      icon: FileText,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400',
    },
    {
      id: 'ag-9',
      name: 'Research Assistant',
      desc: 'Searches the web, gathers insights and creates research reports.',
      status: 'Active',
      statusType: 'active',
      updated: 'Updated 6d ago',
      runs: '234 runs',
      saved: '10h saved',
      icon: Search,
      iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400',
    },
  ];

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAgents = agentsList.filter((ag) => {
    const matchesSearch =
      ag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ag.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' || ag.statusType === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Agents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, monitor and improve all your AI agents.
          </p>
        </div>

        {/* Top Header Controls Right */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
            />
          </div>

          <button
            onClick={() => navigate(ROUTES.KNOWLEDGE)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-xs"
            title="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-xs relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              S
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sachin A</span>
              <span className="text-[10px] text-slate-400 font-medium">Founder</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Create New Agent Button */}
          <button
            onClick={() => navigate(ROUTES.STUDIO)}
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] shrink-0"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create New Agent</span>
            <Sparkles className="h-3.5 w-3.5 text-violet-200" />
          </button>
        </div>
      </div>

      {/* ─── TOP 5 METRICS CARDS RIBBON ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Agents */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
              12
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Total Agents
            </span>
          </div>
        </div>

        {/* Active */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Play className="h-4 w-4 fill-current ml-0.5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
              7
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Active
            </span>
          </div>
        </div>

        {/* Drafts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <PauseCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
              3
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Drafts
            </span>
          </div>
        </div>

        {/* Executions */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
              2,341
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Executions (This Month)
            </span>
          </div>
        </div>

        {/* Time Saved */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
              120h
            </span>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Time Saved
            </span>
          </div>
        </div>

      </div>

      {/* ─── WORKSPACE CONTROLS BAR ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggles */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <button className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-xs">
            <span>Sort by: <strong className="text-slate-900 dark:text-white">Last updated</strong></span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ─── 2-COLUMN MAIN CONTENT GRID ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN: Agents 3x3 Grid (Lg: col-9) ────────────────────── */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAgents.map((ag) => {
              const Icon = ag.icon;
              const isStarred = starredMap[ag.id];

              return (
                <div
                  key={ag.id}
                  onClick={() => navigate(`/agents/${ag.id}`)}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    {/* Top Avatar & Star Icon */}
                    <div className="flex items-start justify-between">
                      {ag.avatarImg ? (
                        <img
                          src={ag.avatarImg}
                          alt={ag.name}
                          className="w-12 h-12 rounded-2xl object-cover shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-2xl ${ag.iconBg} flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}>
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => toggleStar(ag.id, e)}
                        className="text-slate-300 dark:text-slate-600 hover:text-amber-400 transition-colors p-1"
                      >
                        <Star className={`h-4 w-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>

                    {/* Agent Title & Description */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                        {ag.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {ag.desc}
                      </p>
                    </div>

                    {/* Status & Timestamp */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ag.statusType === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : ag.statusType === 'draft'
                          ? 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}>
                        {ag.status}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {ag.updated}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Metrics */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <Play className="h-3 w-3 fill-current text-slate-400" />
                        {ag.runs}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {ag.saved}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Copied share link for "${ag.name}"!`);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Share Agent"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Options"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
            <span>Showing 1 to 9 of 12 agents</span>

            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-xl bg-violet-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center hover:bg-slate-100 transition-colors">
                2
              </button>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: Filter Panel (Lg: col-3) ──────────────────────── */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setSelectedStatus('all')}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Status Checkboxes */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Status</span>

              <label className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === 'all'}
                  onChange={() => setSelectedStatus('all')}
                  className="w-4 h-4 text-violet-600 accent-violet-600"
                />
                <span className="font-semibold">All Status</span>
              </label>

              <label className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === 'active'}
                  onChange={() => setSelectedStatus('active')}
                  className="w-4 h-4 text-violet-600 accent-violet-600"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Active</span>
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === 'draft'}
                  onChange={() => setSelectedStatus('draft')}
                  className="w-4 h-4 text-violet-600 accent-violet-600"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span>Draft</span>
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="statusFilter"
                  checked={selectedStatus === 'paused'}
                  onChange={() => setSelectedStatus('paused')}
                  className="w-4 h-4 text-violet-600 accent-violet-600"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Paused</span>
                </span>
              </label>
            </div>

            {/* Labels Filter Dropdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Labels</label>
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span>All Labels</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

            {/* Integrations Filter Dropdown */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Integrations</label>
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span>All Integrations</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

            {/* Last Updated Dropdown */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">Last Updated</label>
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span>Any time</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

          </div>

          {/* Bottom "Need help building agents?" Callout Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-violet-950/40 dark:to-slate-900 border border-violet-100 dark:border-slate-800 space-y-3">
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-300">
                Need help building agents?
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Explore templates or start with AI Assistant.
              </p>
            </div>
            
            <button
              onClick={() => navigate(ROUTES.TEMPLATES)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 text-violet-700 dark:text-violet-300 text-xs font-bold hover:bg-violet-50 transition-colors shadow-xs"
            >
              <span>Explore Templates</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
