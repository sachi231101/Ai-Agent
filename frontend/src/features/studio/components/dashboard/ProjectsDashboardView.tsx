import React, { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  Sparkles,
  Star,
  Globe,
  Bot,
  Terminal,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
  Share2,
  Zap,
  FolderGit2,
  CheckCircle2,
  Clock,
  Sliders,
  ExternalLink,
  Code,
  Flame,
  FolderPlus,
} from 'lucide-react';
import { ProjectItem } from '../../data/sampleProjects';

interface ProjectsDashboardViewProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
  onCreateNewProject: (prompt: string) => void;
}

export const ProjectsDashboardView: React.FC<ProjectsDashboardViewProps> = ({
  projects,
  onSelectProject,
  onCreateNewProject,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [activeTab, setActiveTab] = useState<'my' | 'recent' | 'starred' | 'templates'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarFilter, setSidebarFilter] = useState<'all' | 'starred' | 'created' | 'shared'>('all');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onCreateNewProject(promptInput);
    setPromptInput('');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (sidebarFilter === 'starred') return matchesSearch && p.starred;
    if (activeTab === 'starred') return matchesSearch && p.starred;
    return matchesSearch;
  });

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="flex h-full w-full bg-[#0b0a10] text-white font-sans overflow-hidden select-none">
      {/* ─── Left Sidebar Navigation ──────────────────────────────────────────────── */}
      <aside className="w-64 border-r border-white/10 bg-[#0f0e17] flex flex-col justify-between shrink-0 p-3 overflow-y-auto">
        <div className="space-y-4">
          {/* Workspace Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-black text-xs text-white shadow-md">
                S
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Sachin's Vibe Agent</span>
            </div>
            <span className="text-white/40 text-[10px]">⌄</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-0.5 text-xs font-semibold">
            <a
              href="#"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 text-white font-bold transition-colors"
            >
              <LayoutDashboard size={15} className="text-purple-400" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Search size={15} />
                <span>Search</span>
              </div>
              <span className="text-[10px] text-white/30 font-mono">Ctrl K</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Globe size={15} />
              <span>Resources</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <FolderGit2 size={15} />
              <span>Connectors</span>
            </a>
          </nav>

          {/* Projects Category Filter */}
          <div className="pt-3 border-t border-white/5 space-y-1">
            <span className="px-3 text-[10px] font-extrabold text-white/30 uppercase tracking-widest">Projects</span>
            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => setSidebarFilter('all')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-colors ${
                  sidebarFilter === 'all' ? 'bg-purple-600/20 text-purple-300 font-bold' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <Layers size={14} />
                <span>All projects</span>
              </button>
              <button
                onClick={() => setSidebarFilter('starred')}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-colors ${
                  sidebarFilter === 'starred' ? 'bg-purple-600/20 text-purple-300 font-bold' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <Star size={14} className="text-amber-400" />
                <span>Starred</span>
              </button>
            </div>
          </div>

          {/* Recents list */}
          <div className="pt-3 border-t border-white/5 space-y-1">
            <span className="px-3 text-[10px] font-extrabold text-white/30 uppercase tracking-widest">Recents</span>
            <div className="space-y-1 text-xs">
              {recentProjects.length === 0 ? (
                <div className="px-3 py-2 text-[11px] text-white/30 font-medium">No recent projects</div>
              ) : (
                recentProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectProject(p.id)}
                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left text-white/70 hover:bg-white/5 hover:text-white transition-colors group"
                  >
                    <span className="truncate">{p.name}</span>
                    {p.starred && <Star size={12} className="text-amber-400 shrink-0 fill-amber-400" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Footer Promotions */}
        <div className="space-y-2 pt-3 border-t border-white/5">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>Share Vibe Agent</span>
              <Share2 size={12} className="text-purple-400" />
            </div>
            <p className="text-[10px] text-white/40 leading-tight">100 credits per paid referral</p>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 space-y-1">
            <div className="text-xs font-bold text-purple-200 flex items-center justify-between">
              <span>Upgrade to Business</span>
              <Zap size={13} className="text-amber-400" />
            </div>
            <p className="text-[10px] text-purple-300/70 leading-tight">Unlock higher limits and team collaboration.</p>
          </div>
        </div>
      </aside>

      {/* ─── Main Canvas Area ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#09080e]">
        {/* Payment Warning Header */}
        <div className="bg-red-600 text-white text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-3 shrink-0 shadow-sm">
          <span>⚠️ Payment issue detected. Your account remains active, but will revert to Free if not resolved.</span>
          <button className="bg-black/30 hover:bg-black/40 text-white text-[11px] font-bold py-0.5 px-2.5 rounded-md border border-white/20 transition-colors">
            Update payment method
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex-1 flex flex-col items-center justify-center p-8 min-h-[400px] bg-gradient-to-b from-purple-950/30 via-indigo-950/20 to-[#09080e] overflow-hidden">
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-2xl mx-auto text-center space-y-6 relative z-10">
            {/* New announcement pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
              <span className="px-1.5 py-0.2 rounded bg-blue-500 text-slate-950 font-extrabold text-[9px] uppercase">New</span>
              <span>Vibe Agent apps now work in ChatGPT and Claude →</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Ready to build, Sachin?
            </h1>

            {/* Prompt Input Box */}
            <form onSubmit={handlePromptSubmit} className="relative w-full">
              <div className="bg-[#171524] border border-white/15 rounded-3xl p-4 shadow-2xl shadow-purple-950/50 focus-within:border-purple-500/60 transition-all">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask Vibe Agent to build a web app or AI agent..."
                  rows={2}
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/30 resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button type="button" className="text-white/40 hover:text-white text-lg font-bold p-1">
                    +
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-white/50 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                      <span>Build</span>
                      <span className="text-[10px]">⌄</span>
                    </div>
                    <button
                      type="submit"
                      disabled={!promptInput.trim()}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        promptInput.trim()
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40 hover:scale-105'
                          : 'bg-white/5 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      Create Project
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ─── Bottom Projects Section (Empty Dashboard View) ────────────────── */}
        <div className="p-8 border-t border-white/10 bg-[#0c0a12] space-y-6 min-h-[300px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Gallery Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white/[0.03] p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('my')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'my' ? 'bg-white/10 text-white shadow-xs' : 'text-white/50 hover:text-white'
                }`}
              >
                My projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'recent' ? 'bg-white/10 text-white shadow-xs' : 'text-white/50 hover:text-white'
                }`}
              >
                Recently viewed
              </button>
              <button
                onClick={() => setActiveTab('starred')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'starred' ? 'bg-white/10 text-white shadow-xs' : 'text-white/50 hover:text-white'
                }`}
              >
                Starred
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'templates' ? 'bg-white/10 text-white shadow-xs' : 'text-white/50 hover:text-white'
                }`}
              >
                Vibe templates
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Empty Dashboard State Card */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto my-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <FolderPlus size={26} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No projects created yet</h3>
                <p className="text-xs text-white/40 leading-relaxed mt-1">
                  Describe what you want to build in the input box above, or click below to start a blank project.
                </p>
              </div>
              <button
                onClick={() => onCreateNewProject('Build a new custom AI agent project')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Create New Project</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj.id)}
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between"
                >
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-blue-950/40 border border-white/10 p-3 flex flex-col justify-between mb-3 relative overflow-hidden group-hover:border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        {proj.domain}
                      </span>
                      {proj.starred && <Star size={14} className="text-amber-400 fill-amber-400" />}
                    </div>

                    <div className="text-left">
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <Bot size={13} className="text-purple-400" />
                        <span>AI Agent Spec</span>
                      </div>
                      <div className="text-[10px] text-white/50 truncate">{proj.spec.agentName}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {proj.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {proj.lastModified}
                    </span>
                    <span className="text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Open Project →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
