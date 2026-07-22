import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Rocket,
  GitBranch,
  Layers,
  BookOpen,
  Cloud,
  Code2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Mail,
  ExternalLink
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function DocumentationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 't1', title: 'Get Started', desc: 'Quick start guide and basics to get you up and running.', icon: Rocket, color: 'bg-violet-100 text-violet-600 dark:bg-violet-950/60' },
    { id: 't2', title: 'Build Agents', desc: 'Learn how to create powerful agents with workflows.', icon: GitBranch, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60' },
    { id: 't3', title: 'Integrations', desc: 'Connect your agents with apps and services.', icon: Layers, color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60' },
    { id: 't4', title: 'Knowledge', desc: 'Add knowledge sources and manage your company data.', icon: BookOpen, color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60' },
    { id: 't5', title: 'Deployment', desc: 'Deploy your agents and make them available to users.', icon: Cloud, color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60' },
    { id: 't6', title: 'API Reference', desc: 'Complete API reference and endpoints.', icon: Code2, color: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60' },
    { id: 't7', title: 'Examples', desc: 'Real-world examples and use cases to inspire you.', icon: FileText, color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/60' },
    { id: 't8', title: 'Best Practices', desc: 'Tips and best practices for building better agents.', icon: ShieldCheck, color: 'bg-teal-100 text-teal-600 dark:bg-teal-950/60' },
  ];

  const popularGuides = [
    {
      id: 'g1',
      title: 'Create your first agent',
      desc: 'Learn how to build a simple agent in less than 5 minutes.',
      level: 'Beginner',
      levelBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
      time: '5 min read',
      icon: Rocket,
      iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-950/60',
    },
    {
      id: 'g2',
      title: 'Connect Google Drive',
      desc: 'Integrate Google Drive to access and search files.',
      level: 'Integration',
      levelBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
      time: '8 min read',
      iconImg: '/assets-icons/Google_Drive_Logo.png',
    },
    {
      id: 'g3',
      title: 'Build a workflow with conditions',
      desc: 'Add conditions and branching to make smarter agents.',
      level: 'Intermediate',
      levelBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
      time: '12 min read',
      icon: GitBranch,
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/60',
    },
    {
      id: 'g4',
      title: 'Deploy your agent',
      desc: 'Make your agent live and accessible to your team.',
      level: 'Beginner',
      levelBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
      time: '6 min read',
      icon: Cloud,
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60',
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Documentation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Everything you need to build, deploy and scale AI agents.
          </p>
        </div>

        {/* Search & Header Actions Right */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Header Search */}
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              Ctrl K
            </span>
          </div>

          <button
            onClick={() => alert('Opening community forums...')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-xs"
            title="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          <button
            onClick={() => window.open('https://discord.com', '_blank')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Join Community</span>
          </button>

          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] shrink-0"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* ─── FEATURED HERO BANNER ───────────────────────────────────────────── */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        
        {/* Glowing Background FX */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-xl relative z-10">
          <span className="text-xs text-violet-300 font-semibold tracking-wide">
            Welcome to Vibe Agents Docs
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Build powerful AI agents with ease.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Step-by-step guides, references and examples to help you create intelligent agents faster.
          </p>

          {/* Hero Search Box */}
          <div className="relative max-w-md pt-2">
            <Search className="absolute left-3.5 top-5 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
        </div>

        {/* Right 3D Visual Illustration Box */}
        <div className="relative w-72 h-48 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 backdrop-blur-xl shadow-2xl flex items-center justify-center shrink-0 z-10">
          {/* Workflow Thumbnail Card */}
          <div className="w-full h-full rounded-xl bg-slate-950 border border-slate-800/80 p-3 space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex items-center justify-around py-2">
              <div className="w-12 h-8 rounded bg-violet-600/30 border border-violet-500" />
              <div className="w-6 h-0.5 bg-violet-400" />
              <div className="w-12 h-8 rounded bg-emerald-600/30 border border-emerald-500" />
            </div>
          </div>

          <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-white p-1 shadow-2xl animate-bounce">
            <img src="/assets-icons/robot-purple.png" alt="Robot Avatar" className="w-full h-full object-contain" />
          </div>
        </div>

      </div>

      {/* ─── 2-COLUMN MAIN CONTENT GRID ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN: Topics & Guides (Lg: col-8) ────────────────────── */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Browse by Topic */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Browse by Topic
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => {
                const TopicIcon = topic.icon;

                return (
                  <div
                    key={topic.id}
                    onClick={() => alert(`Opening docs section: ${topic.title}`)}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4 hover:border-violet-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-2xl ${topic.color} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                        <TopicIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {topic.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Guides */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Popular Guides
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                <span>View all guides</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {popularGuides.map((guide) => {
                const GuideIcon = guide.icon;

                return (
                  <div
                    key={guide.id}
                    onClick={() => alert(`Opening guide: ${guide.title}`)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 hover:border-violet-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {guide.iconImg ? (
                        <img src={guide.iconImg} alt={guide.title} className="w-9 h-9 rounded-xl object-contain p-1 bg-slate-50 border shrink-0" />
                      ) : (
                        <div className={`w-9 h-9 rounded-xl ${guide.iconBg} flex items-center justify-center shrink-0 font-bold`}>
                          {GuideIcon && <GuideIcon className="h-4.5 w-4.5" />}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-violet-600 transition-colors">
                          {guide.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {guide.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-semibold">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${guide.levelBg}`}>
                        {guide.level}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        ⏱ {guide.time}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: Quick Links & Support Sidebar (Lg: col-4) ──────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Links Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <div className="space-y-2 text-xs font-semibold">
              {[
                { name: 'Release Notes', icon: Rocket },
                { name: 'Changelog', icon: FileText },
                { name: 'System Status', icon: CheckCircle2 },
                { name: 'Roadmap', icon: GitBranch },
                { name: 'Glossary', icon: BookOpen },
              ].map((link, idx) => {
                const LinkIcon = link.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => alert(`Opening link: ${link.name}`)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <div className="flex items-center gap-3">
                      <LinkIcon className="h-4 w-4 text-violet-500" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Need help? Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Need help?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Can't find what you're looking for? We're here to help!
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => alert('Opening Support Ticket Modal...')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-bold hover:bg-violet-100 transition-colors"
              >
                <Headphones className="h-4 w-4" />
                <span>Contact Support</span>
              </button>

              <button
                onClick={() => window.open('https://discord.com', '_blank')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Ask in Community</span>
              </button>

              <button
                onClick={() => window.location.href = 'mailto:support@vibeagents.com'}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </button>
            </div>
          </div>

          {/* API Status Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
              API Status
            </h4>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <p className="text-[10px] text-slate-400">Updated 2 min ago</p>

            <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 pt-1">
              <span>View Status Page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Join our Community Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-violet-950/40 dark:to-slate-900 border border-violet-100 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <h4 className="text-sm font-extrabold text-violet-900 dark:text-violet-300">
                Join our Community
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Connect with other builders, share ideas and get help.
              </p>
            </div>

            <button
              onClick={() => window.open('https://discord.com', '_blank')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-violet-200 dark:border-slate-700 text-violet-700 dark:text-violet-300 text-xs font-bold hover:bg-violet-50 transition-colors shadow-xs relative z-10"
            >
              <span>Join Discord</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
