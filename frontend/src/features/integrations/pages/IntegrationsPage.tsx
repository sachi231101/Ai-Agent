import { useState } from 'react';
import { 
  Search, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { ConnectAppModal } from '@/features/studio/components/workspace/ConnectAppModal';

export default function IntegrationsPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const integrations = [
    {
      id: 'gmail',
      name: 'Gmail',
      category: 'Email & Communication',
      icon: '/assets-icons/gmail.png',
      desc: 'Connect Gmail to allow your AI agents to read emails, summarize threads, and draft responses.',
      status: 'Connected',
      connected: true,
      badge: 'Popular',
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      category: 'Email & Calendar',
      icon: '/assets-icons/outlook.png',
      desc: 'Sync Outlook inbox, manage calendar invites, and trigger automated meeting summaries.',
      status: 'Connected',
      connected: true,
      badge: 'Popular',
    },
    {
      id: 'purple-bot',
      name: 'Vibe Architect Engine',
      category: 'AI Engine',
      icon: '/assets-icons/robot-purple.png',
      desc: 'Core reasoning engine powered by Vibe Architect for prompt tuning & multi-step execution.',
      status: 'Active',
      connected: true,
      badge: 'Core Engine',
    },
    {
      id: 'blue-bot',
      name: 'Vibe Execution Sandbox',
      category: 'Runtime',
      icon: '/assets-icons/robot-blue.png',
      desc: 'Isolated code execution sandbox for running Python, JavaScript, and shell commands safely.',
      status: 'Active',
      connected: true,
      badge: 'Runtime',
    },
    {
      id: 'green-bot',
      name: 'Vibe Knowledge RAG',
      category: 'Knowledge Base',
      icon: '/assets-icons/robot-green.png',
      desc: 'Vector document indexer and embeddings engine for private enterprise context retrieval.',
      status: 'Active',
      connected: true,
      badge: 'RAG Store',
    },
    {
      id: 'slack',
      name: 'Slack Workspace',
      category: 'Team Messaging',
      icon: '/assets-icons/slack.png',
      desc: 'Send real-time alerts, daily summaries, and interactive messages directly to Slack channels.',
      status: 'Connected',
      connected: true,
      badge: 'Popular',
    },
    {
      id: 'notion',
      name: 'Notion Workspace',
      category: 'Knowledge Base',
      icon: '/assets-icons/Notion.png',
      desc: 'Pull team documentation, task databases, and internal wiki notes into agent memory.',
      status: 'Available',
      connected: false,
      badge: 'Workspace',
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'Sales & Marketing',
      icon: '🎯',
      desc: 'Automatically qualify leads, update contacts, and log CRM call notes.',
      status: 'Available',
      connected: false,
      badge: 'CRM',
    },
    {
      id: 'zendesk',
      name: 'Zendesk Support',
      category: 'Customer Support',
      icon: '💬',
      desc: 'Automatically triage support tickets, classify customer intent, and draft replies.',
      status: 'Connected',
      connected: true,
      badge: 'Support',
    },
  ];

  const categories = ['All', 'Email & Communication', 'AI Engine', 'Knowledge Base', 'Team Messaging', 'Sales & Marketing'];

  const filteredIntegrations = integrations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Connectors & Integrations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold">
              9 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connect your favorite email providers, AI reasoning engines, and workspace apps.
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-all shadow-md shadow-violet-500/20 flex items-center gap-2 hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Integration</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Gmail, Outlook, AI Engines..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700/60 shadow-xs group-hover:scale-105 transition-transform">
                  {item.icon.startsWith('/') || item.icon.includes('.png') ? (
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl">{item.icon}</span>
                  )}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                  {item.category}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {item.connected ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Connected & Active</span>
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-400">Not Connected</span>
              )}

              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
              >
                {item.connected ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConnectAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

    </div>
  );
}
