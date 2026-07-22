import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  HelpCircle,
  Bell,
  ChevronDown,
  Star,
  Download,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Layers,
  Code,
  Users,
  Headphones,
  TrendingUp,
  Volume2,
  FileText,
  Home,
  Briefcase
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState('Trending');
  const [installedMap, setInstalledMap] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Categories', count: '124 agents', icon: Layers, activeColor: 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300' },
    { id: 'productivity', label: 'Productivity', count: '20 agents', icon: Zap, activeColor: 'border-slate-200 dark:border-slate-800' },
    { id: 'marketing', label: 'Marketing', count: '18 agents', icon: Volume2, activeColor: 'border-slate-200 dark:border-slate-800' },
    { id: 'sales', label: 'Sales', count: '16 agents', icon: TrendingUp, activeColor: 'border-slate-200 dark:border-slate-800' },
    { id: 'support', label: 'Support', count: '14 agents', icon: Headphones, activeColor: 'border-slate-200 dark:border-slate-800' },
    { id: 'development', label: 'Development', count: '22 agents', icon: Code, activeColor: 'border-slate-200 dark:border-slate-800' },
    { id: 'hr', label: 'HR', count: '10 agents', icon: Users, activeColor: 'border-slate-200 dark:border-slate-800' },
  ];

  const marketplaceAgents = [
    {
      id: 'm1',
      name: 'Email Summary Agent',
      desc: 'Summarizes important emails every morning and sends a report to Slack.',
      author: 'Vibe Team',
      verified: true,
      rating: '4.8',
      reviewsCount: '124',
      installs: '2.3K installs',
      avatarImg: '/assets-icons/robot-purple.png',
    },
    {
      id: 'm2',
      name: 'Daily Standup Bot',
      desc: 'Collects team updates and shares a summary in Slack.',
      author: 'DevFlow',
      verified: true,
      rating: '4.7',
      reviewsCount: '98',
      installs: '1.8K installs',
      avatarImg: '/assets-icons/slack.png',
    },
    {
      id: 'm3',
      name: 'Notion Sync Agent',
      desc: 'Syncs pages and databases across your Notion workspace.',
      author: 'Notion Labs',
      verified: true,
      rating: '4.9',
      reviewsCount: '156',
      installs: '2.1K installs',
      avatarImg: '/assets-icons/Notion.png',
    },
    {
      id: 'm4',
      name: 'WhatsApp Responder',
      desc: 'Auto-responds to WhatsApp messages and handles FAQs.',
      author: 'ChatFlow',
      verified: true,
      rating: '4.6',
      reviewsCount: '87',
      installs: '1.2K installs',
      avatarImg: '/assets-icons/whatsapp.png',
    },
    {
      id: 'm5',
      name: 'Meeting Notes Agent',
      desc: 'Joins meetings, takes notes and sends summary to participants.',
      author: 'MeetAI',
      verified: false,
      rating: '4.8',
      reviewsCount: '112',
      installs: '1.6K installs',
      avatarImg: '/assets-icons/Google_Calendar_icon.webp',
    },
    {
      id: 'm6',
      name: 'Invoice Generator',
      desc: 'Generates professional invoices from orders and emails.',
      author: 'BizAutomate',
      verified: true,
      rating: '4.7',
      reviewsCount: '75',
      installs: '934 installs',
      avatarImg: '/assets-icons/Google_Drive_Logo.png',
    },
    {
      id: 'm7',
      name: 'Support Ticket Resolver',
      desc: 'Automatically resolves common support tickets using AI.',
      author: 'SupportAI',
      verified: true,
      rating: '4.8',
      reviewsCount: '143',
      installs: '1.9K installs',
      avatarImg: '/assets-icons/bot4.png',
    },
    {
      id: 'm8',
      name: 'Content Ideas Agent',
      desc: 'Generates content ideas and outlines based on trends.',
      author: 'ContentCraft',
      verified: true,
      rating: '4.6',
      reviewsCount: '65',
      installs: '842 installs',
      avatarImg: '/assets-icons/bot5.png',
    },
  ];

  const toggleInstall = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInstalledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover, try and install agents created by the community.
          </p>
        </div>

        {/* Header Search & Actions Right */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Main Top Search Input */}
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search agents, categories or use cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              /
            </span>
          </div>

          <button
            onClick={() => navigate(ROUTES.STUDIO)}
            className="px-4 py-2 rounded-xl border border-violet-200 dark:border-violet-800 bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-300 text-xs font-semibold hover:bg-violet-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Submit Your Agent</span>
          </button>

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

        </div>
      </div>

      {/* ─── FEATURED HERO BANNER ───────────────────────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        
        {/* Decorative Background Light Glowing Circles */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-xl relative z-10">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15 text-xs font-extrabold uppercase tracking-wider">
            Featured
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Supercharge your work with community agents
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Install powerful AI agents built by the community to automate tasks and boost productivity.
          </p>

          {/* Hero Search Box */}
          <div className="relative max-w-md pt-2">
            <Search className="absolute left-3.5 top-5 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
        </div>

        {/* Right 3D Avatar & App Floating Graphics */}
        <div className="relative w-64 h-48 flex items-center justify-center shrink-0 z-10">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 shadow-2xl flex items-center justify-center z-10 animate-bounce">
            <img src="/assets-icons/robot-purple.png" alt="Robot Avatar" className="w-full h-full object-contain" />
          </div>

          {/* Floating App Badges */}
          <div className="absolute top-2 left-4 w-10 h-10 rounded-2xl bg-white p-2 shadow-lg animate-pulse">
            <img src="/assets-icons/gmail.png" alt="Gmail" className="w-full h-full object-contain" />
          </div>

          <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white p-2 shadow-lg">
            <img src="/assets-icons/slack.png" alt="Slack" className="w-full h-full object-contain" />
          </div>

          <div className="absolute bottom-2 left-6 w-10 h-10 rounded-2xl bg-white p-2 shadow-lg">
            <img src="/assets-icons/Notion.png" alt="Notion" className="w-full h-full object-contain" />
          </div>

          <div className="absolute bottom-4 right-6 w-10 h-10 rounded-2xl bg-white p-2 shadow-lg">
            <img src="/assets-icons/Google_Calendar_icon.webp" alt="Calendar" className="w-full h-full object-contain" />
          </div>
        </div>

      </div>

      {/* ─── 2-COLUMN MAIN CONTENT GRID ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN: Categories & Marketplace Cards (Lg: col-8 / col-9) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Browse by Category Ribbon */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Browse by Category
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                <span>View all categories</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Category Cards Horizontal Scroll */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = activeCategory === cat.id;

                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border min-w-[130px] flex-1 cursor-pointer transition-all ${
                      isActive
                        ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/40 shadow-xs'
                        : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CatIcon className={`h-4 w-4 ${isActive ? 'text-violet-600' : 'text-slate-500'}`} />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {cat.label}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">
                      {cat.count}
                    </span>
                  </div>
                );
              })}
              
              <button className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-700 shrink-0">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sub-Tabs & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
            
            {/* Sub-Tabs */}
            <div className="flex items-center gap-6 text-xs font-bold text-slate-500">
              {['Trending', 'Most Installed', 'Top Rated', 'Newly Added'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`pb-1 transition-all ${
                    activeSubTab === tab
                      ? 'border-b-2 border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <button className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-xs">
              <span>Sort by: <strong className="text-slate-900 dark:text-white">Trending</strong></span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

          </div>

          {/* 2x4 Marketplace Cards Grid (8 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {marketplaceAgents.map((ag) => {
              const isInstalled = installedMap[ag.id];

              return (
                <div
                  key={ag.id}
                  onClick={() => navigate(ROUTES.STUDIO)}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    
                    {/* Icon & Title */}
                    <div className="flex items-start gap-3">
                      {ag.avatarImg ? (
                        <img
                          src={ag.avatarImg}
                          alt={ag.name}
                          className="w-10 h-10 rounded-2xl object-cover shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-2xl ${ag.iconBg} flex items-center justify-center text-lg shadow-xs shrink-0 group-hover:scale-105 transition-transform font-bold`}>
                          {ag.iconEmoji}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                          {ag.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {ag.desc}
                        </p>
                      </div>
                    </div>

                    {/* Author & Verification */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span>by <strong className="text-slate-700 dark:text-slate-300">{ag.author}</strong></span>
                      {ag.verified && <CheckCircle2 className="h-3.5 w-3.5 text-violet-600 fill-violet-100 dark:fill-violet-950" />}
                    </div>

                    {/* Rating & Installs */}
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <strong>{ag.rating}</strong> ({ag.reviewsCount})
                      </span>

                      <span className="flex items-center gap-1 text-slate-500">
                        <Download className="h-3.5 w-3.5" />
                        {ag.installs}
                      </span>
                    </div>

                  </div>

                  {/* Install Button */}
                  <button
                    onClick={(e) => toggleInstall(ag.id, e)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isInstalled
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 bg-white dark:bg-slate-800 hover:bg-violet-50'
                    }`}
                  >
                    {isInstalled ? 'Installed ✓' : 'Install'}
                  </button>

                </div>
              );
            })}
          </div>

          {/* Bottom Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
            <span>Showing 1 to 12 of 124 agents</span>

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
              <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center hover:bg-slate-100 transition-colors">
                3
              </button>
              <span className="px-1 text-slate-400 font-bold">...</span>
              <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center hover:bg-slate-100 transition-colors">
                11
              </button>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: Popular Collections & Top Rated (Lg: col-4) ─────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Popular Collections Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Popular Collections
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { name: 'Remote Work Essentials', count: '12 agents', icon: Home, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60' },
                { name: 'Customer Support Suite', count: '8 agents', icon: Headphones, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60' },
                { name: 'Marketing Automation', count: '10 agents', icon: Volume2, color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60' },
                { name: 'Sales Enablement', count: '9 agents', icon: TrendingUp, color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60' },
                { name: 'Developer Productivity', count: '15 agents', icon: Code, color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60' },
              ].map((col, idx) => {
                const ColIcon = col.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/80 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${col.color} flex items-center justify-center font-bold`}>
                        <ColIcon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{col.name}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">{col.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Rated Agents Leaderboard */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Top Rated Agents
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { rank: 1, name: 'Notion Sync Agent', installs: '2.1K installs', rating: '4.9', emoji: '📝', bg: 'bg-slate-100 dark:bg-slate-800' },
                { rank: 2, name: 'Email Summary Agent', installs: '2.3K installs', rating: '4.8', img: '/assets-icons/robot-purple.png' },
                { rank: 3, name: 'Support Ticket Resolver', installs: '1.9K installs', rating: '4.8', icon: Headphones, bg: 'bg-emerald-100 text-emerald-600' },
                { rank: 4, name: 'Meeting Notes Agent', installs: '1.6K installs', rating: '4.8', icon: FileText, bg: 'bg-amber-100 text-amber-600' },
                { rank: 5, name: 'Daily Standup Bot', installs: '1.8K installs', rating: '4.7', emoji: '💬', bg: 'bg-emerald-100 text-emerald-600' },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-3 text-center">
                      {item.rank}
                    </span>

                    {item.img ? (
                      <img src={item.img} alt={item.name} className="w-8 h-8 rounded-xl object-cover shadow-xs" />
                    ) : (
                      <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center font-bold text-xs`}>
                        {item.emoji || (item.icon && <item.icon className="h-4 w-4" />)}
                      </div>
                    )}

                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs truncate max-w-[140px]">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">{item.installs}</span>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {item.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom "Build for the community" Banner Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-xl space-y-3 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <h4 className="text-sm font-extrabold text-white">
                Build for the community
              </h4>
              <p className="text-xs text-violet-100 leading-relaxed font-normal">
                Create and publish agents that thousands of people can use.
              </p>
            </div>

            <button
              onClick={() => navigate(ROUTES.STUDIO)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-violet-700 text-xs font-bold hover:bg-violet-50 transition-colors shadow-md relative z-10"
            >
              <span>Submit Your Agent</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            {/* 3D Purple Isometric Graphic background */}
            <div className="absolute right-[-10px] bottom-[-10px] opacity-20 pointer-events-none text-6xl">
              💎
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
