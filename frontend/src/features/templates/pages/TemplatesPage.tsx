import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  HelpCircle,
  Bell,
  ChevronDown,
  Star,
  Download,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  User,
  Pencil,
  FileText,
  Mail,
  Share2,
  BarChart3,
  Users,
  Search as SearchIcon,
  Target,
  Code2,
  Plane,
  Wallet,
  Globe
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('All Templates');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedUseCase, setSelectedUseCase] = useState('All Use Cases');
  const [selectedSort, setSelectedSort] = useState('Most Popular');
  const [complexityFilter, setComplexityFilter] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });

  const categoryTabs = [
    'All Templates',
    'Business',
    'Marketing',
    'Productivity',
    'Support',
    'Sales',
    'HR',
    'Development',
    'Finance',
  ];

  const popularTemplates = [
    {
      id: 'p1',
      title: 'Customer Support Agent',
      desc: 'Answer customer questions, resolve issues and provide 24/7 support.',
      category: 'Support',
      tag: 'Popular',
      rating: '4.9',
      reviews: '642',
      uses: '2.4K uses',
      icon: Headphones,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60',
    },
    {
      id: 'p2',
      title: 'Lead Qualification Agent',
      desc: 'Qualify leads, ask the right questions and route to sales.',
      category: 'Sales',
      tag: 'Popular',
      rating: '4.8',
      reviews: '521',
      uses: '1.9K uses',
      icon: User,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60',
    },
    {
      id: 'p3',
      title: 'Content Writer Agent',
      desc: 'Generate blog posts, social content and marketing copy.',
      category: 'Marketing',
      tag: 'Popular',
      rating: '4.9',
      reviews: '705',
      uses: '3.1K uses',
      icon: Pencil,
      iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60',
    },
    {
      id: 'p4',
      title: 'Meeting Notes Agent',
      desc: 'Summarize meetings and extract action items automatically.',
      category: 'Productivity',
      tag: 'Popular',
      rating: '4.8',
      reviews: '483',
      uses: '1.7K uses',
      icon: FileText,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60',
    },
  ];

  const allTemplates = [
    {
      id: 't1',
      title: 'Email Responder Agent',
      desc: 'Automatically draft and send smart replies to emails.',
      category: 'Productivity',
      rating: '4.7',
      uses: '1.2K uses',
      icon: Mail,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60',
    },
    {
      id: 't2',
      title: 'Social Media Manager',
      desc: 'Create, schedule and analyze content across platforms.',
      category: 'Marketing',
      rating: '4.6',
      uses: '1.1K uses',
      icon: Share2,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60',
    },
    {
      id: 't3',
      title: 'Data Analyst Agent',
      desc: 'Analyze data and generate insights with visuals.',
      category: 'Business',
      rating: '4.8',
      uses: '1.6K uses',
      icon: BarChart3,
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60',
    },
    {
      id: 't4',
      title: 'HR Onboarding Agent',
      desc: 'Guide new hires through onboarding and documentation.',
      category: 'HR',
      rating: '4.7',
      uses: '980 uses',
      icon: Users,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60',
    },
    {
      id: 't5',
      title: 'Invoice Generator Agent',
      desc: 'Create professional invoices and send to customers.',
      category: 'Finance',
      rating: '4.6',
      uses: '890 uses',
      icon: FileText,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60',
    },
    {
      id: 't6',
      title: 'Research Assistant',
      desc: 'Find, summarize and cite information from the web.',
      category: 'Productivity',
      rating: '4.8',
      uses: '1.4K uses',
      icon: SearchIcon,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60',
    },
    {
      id: 't7',
      title: 'Habit Tracker Coach',
      desc: 'Help users build better habits and stay consistent.',
      category: 'Lifestyle',
      rating: '4.5',
      uses: '760 uses',
      icon: Target,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60',
    },
    {
      id: 't8',
      title: 'Code Reviewer Agent',
      desc: 'Review code, find issues and suggest improvements.',
      category: 'Development',
      rating: '4.9',
      uses: '1.3K uses',
      icon: Code2,
      iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60',
    },
    {
      id: 't9',
      title: 'Travel Planner Agent',
      desc: 'Plan trips, find places and create itineraries.',
      category: 'Lifestyle',
      rating: '4.6',
      uses: '620 uses',
      icon: Plane,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60',
    },
    {
      id: 't10',
      title: 'Expense Tracker Agent',
      desc: 'Track expenses and generate spending reports.',
      category: 'Finance',
      rating: '4.5',
      uses: '540 uses',
      icon: Wallet,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60',
    },
    {
      id: 't11',
      title: 'Translate Agent',
      desc: 'Translate text between multiple languages.',
      category: 'Productivity',
      rating: '4.8',
      uses: '1.8K uses',
      icon: Globe,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60',
    },
    {
      id: 't12',
      title: 'Slack Bot Assistant',
      desc: 'Assist your team directly inside Slack.',
      category: 'Integration',
      rating: '4.7',
      uses: '1.1K uses',
      iconImg: '/assets-icons/slack.png',
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Templates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kickstart your agent with pre-built templates. Customize and make it your own.
          </p>
        </div>

        {/* Header Search & User Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Top Search Bar */}
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              ⌘ K
            </span>
          </div>

          <button
            onClick={() => navigate(ROUTES.DOCUMENTATION)}
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

      {/* ─── CATEGORY NAVIGATION TABS ───────────────────────────────────────── */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 overflow-x-auto">
        {categoryTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategoryTab(tab)}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeCategoryTab === tab
                ? 'border-b-2 border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── 2-COLUMN MAIN WORKSPACE GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN: Popular Templates & All Templates Grid (Lg: col-8) ─── */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Popular Templates Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Popular Templates
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTemplates.map((tpl) => {
                const TplIcon = tpl.icon;

                return (
                  <div
                    key={tpl.id}
                    onClick={() => navigate(ROUTES.STUDIO)}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-violet-500/40 transition-all cursor-pointer group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-2xl ${tpl.iconBg} flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform`}>
                          <TplIcon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                          {tpl.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                          {tpl.desc}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">
                          {tpl.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400 text-[10px] font-bold">
                          {tpl.tag}
                        </span>
                      </div>

                      {/* Rating & Uses */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3 w-3 fill-amber-400" />
                          {tpl.rating} ({tpl.reviews})
                        </span>
                        <span>⏱ {tpl.uses}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.STUDIO);
                      }}
                      className="w-full py-1.5 rounded-xl border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold bg-white dark:bg-slate-800 hover:bg-violet-50 transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Templates Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              All Templates
            </h3>

            {/* 4x3 Grid of 12 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allTemplates.map((tpl) => {
                const TplIcon = tpl.icon;

                return (
                  <div
                    key={tpl.id}
                    onClick={() => navigate(ROUTES.STUDIO)}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-violet-500/40 transition-all cursor-pointer group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        {tpl.iconImg ? (
                          <img src={tpl.iconImg} alt={tpl.title} className="w-8 h-8 rounded-xl object-contain p-1 bg-slate-50 border shrink-0" />
                        ) : (
                          <div className={`w-8 h-8 rounded-xl ${tpl.iconBg} flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform`}>
                            {TplIcon && <TplIcon className="h-4 w-4" />}
                          </div>
                        )}

                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                          {tpl.title}
                        </h4>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {tpl.desc}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400 text-[10px] font-bold">
                          {tpl.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3 w-3 fill-amber-400" />
                          {tpl.rating}
                        </span>
                        <span>{tpl.uses}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
            <span>Showing 1 to 12 of 48 templates</span>

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
              <button className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center hover:bg-slate-100 transition-colors">
                4
              </button>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: Filters Panel & Featured Template (Lg: col-4) ─────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Filters Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedUseCase('All Use Cases');
                  setComplexityFilter({ beginner: true, intermediate: true, advanced: true });
                }}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Support">Support</option>
                    <option value="Development">Development</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Use Case Filter */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Use Case
                </label>
                <div className="relative">
                  <select
                    value={selectedUseCase}
                    onChange={(e) => setSelectedUseCase(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8"
                  >
                    <option value="All Use Cases">All Use Cases</option>
                    <option value="Automation">Automation</option>
                    <option value="Summarization">Summarization</option>
                    <option value="Customer Care">Customer Care</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Complexity Checkboxes */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Complexity
                </label>

                <div className="space-y-2 pt-1 font-semibold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={complexityFilter.beginner}
                      onChange={(e) => setComplexityFilter({ ...complexityFilter, beginner: e.target.checked })}
                      className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      <span>🍃</span> Beginner
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={complexityFilter.intermediate}
                      onChange={(e) => setComplexityFilter({ ...complexityFilter, intermediate: e.target.checked })}
                      className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      <span>⚡</span> Intermediate
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={complexityFilter.advanced}
                      onChange={(e) => setComplexityFilter({ ...complexityFilter, advanced: e.target.checked })}
                      className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      <span>🔮</span> Advanced
                    </span>
                  </label>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="space-y-1.5 pt-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Sort by
                </label>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8"
                  >
                    <option value="Most Popular">Most Popular</option>
                    <option value="Highest Rated">Highest Rated</option>
                    <option value="Newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Featured Template Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-violet-950/40 dark:to-slate-900 border border-violet-100 dark:border-slate-800 space-y-4 shadow-xs">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
              Featured Template
            </h4>

            {/* Graphic Illustration */}
            <div className="w-full h-36 rounded-2xl bg-white dark:bg-slate-800 border border-violet-100 dark:border-slate-700 p-4 flex items-center justify-around relative overflow-hidden shadow-xs">
              <img src="/assets-icons/robot-purple.png" alt="Robot Head" className="w-20 h-20 object-contain drop-shadow-md" />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-xs">
                  👥
                </div>
                <div className="w-7 h-7 rounded-xl bg-white p-1 shadow-xs border">
                  <img src="/assets-icons/slack.png" alt="Slack" className="w-full h-full object-contain" />
                </div>
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ✉️
                </div>
                <div className="w-7 h-7 rounded-xl bg-white p-1 shadow-xs border">
                  <img src="/assets-icons/gmail.png" alt="Gmail" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Customer Support Agent
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-extrabold">
                  Popular
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                AI agent that handles customer inquiries and provides instant solutions.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-600" />
                <span>Trained on best practices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-600" />
                <span>Multi-channel support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-600" />
                <span>Escalation handling</span>
              </div>
            </div>

            <button
              onClick={() => navigate(ROUTES.STUDIO)}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              <span>Use This Template</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
