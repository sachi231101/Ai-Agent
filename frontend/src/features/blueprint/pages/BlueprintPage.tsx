import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Code2,
  Cpu,
  Layers,
  Zap,
  Plug,
  Sliders,
  FileCode2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Bot,
  Terminal,
  Database,
  Lock,
  GitBranch,
  Save,
  Play
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function BlueprintPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'architecture' | 'tools' | 'prompts' | 'schema'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('Email Summary Agent');

  const handleCopy = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const sampleJsonSchema = `{
  "agent_id": "ag-email-summary-v2",
  "name": "Email Summary Agent",
  "version": "2.4.0",
  "runtime": {
    "engine": "vibe-architect-v3",
    "model": "gpt-4o",
    "temperature": 0.2,
    "max_tokens": 4096
  },
  "triggers": [
    {
      "type": "schedule",
      "cron": "0 9 * * *",
      "timezone": "Asia/Kolkata"
    }
  ],
  "tools": [
    { "name": "gmail_fetch_unread", "auth": "oauth2" },
    { "name": "slack_send_message", "auth": "bot_token" }
  ]
}`;

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Blueprint & Specifications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              v2.4 Spec
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Deep architectural specifications, tool declarations, and runtime environment bindings.
          </p>
        </div>

        {/* Action Controls Right */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-extrabold text-slate-900 dark:text-white focus:outline-none shadow-xs"
            >
              <option value="Email Summary Agent">Email Summary Agent</option>
              <option value="Daily Standup Bot">Daily Standup Bot</option>
              <option value="Notion Sync Agent">Notion Sync Agent</option>
              <option value="WhatsApp Responder">WhatsApp Responder</option>
            </select>
          </div>

          <button
            onClick={() => navigate(ROUTES.STUDIO)}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Open Studio Canvas</span>
          </button>
        </div>

      </div>

      {/* ─── SUB-NAVIGATION TABS ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500">
        {[
          { id: 'architecture', label: 'Architecture Spec', icon: Cpu },
          { id: 'tools', label: 'Tool Declarations', icon: Plug },
          { id: 'prompts', label: 'System Prompts', icon: FileCode2 },
          { id: 'schema', label: 'JSON Schema Manifest', icon: Code2 },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'border-b-2 border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className={`h-4 w-4 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── MAIN SPECIFICATIONS GRID ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Specification Details Column (Lg: col-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Architecture Spec Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 flex items-center justify-center font-bold">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Agent Execution Architecture
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Configured for {selectedAgent}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Validated Specification</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block text-[10px]">REASONING MODEL</span>
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  GPT-4o (OpenAI)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block text-[10px]">MEMORY CONTEXT</span>
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-blue-500" />
                  Pinecone Vector Store
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block text-[10px]">EXECUTION MODE</span>
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                  Isolated Async DAG
                </span>
              </div>
            </div>

            {/* Pipeline Architecture Diagram */}
            <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3 font-mono text-xs overflow-x-auto border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5 text-violet-400" />
                  <span>Pipeline Execution Flow</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">● 0ms Latency Overhead</span>
              </div>

              <div className="py-2 space-y-2 text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="text-violet-400 font-bold">[Trigger]</span>
                  <span>Schedule (09:00 AM daily)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-emerald-400 font-bold">[Action]</span>
                  <span>Gmail API OAuth2</span>
                </div>
                <div className="flex items-center gap-3 pl-8">
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-indigo-400 font-bold">[LLM Node]</span>
                  <span>Summarize & Priority Filter</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-amber-400 font-bold">[Condition]</span>
                  <span>Is High Priority?</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Declarations Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Plug className="h-4 w-4 text-violet-600" />
              <span>Bound Tools & API Extensions</span>
            </h3>

            <div className="space-y-3">
              {[
                { name: 'gmail_fetch_unread', type: 'REST API', auth: 'OAuth2 Authorized', iconImg: '/assets-icons/gmail.png' },
                { name: 'slack_send_message', type: 'Webhook', auth: 'Bot Token Authorized', iconImg: '/assets-icons/slack.png' },
                { name: 'notion_database_query', type: 'GraphQL', auth: 'Bearer Token', iconImg: '/assets-icons/Notion.png' },
              ].map((tool, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={tool.iconImg} alt={tool.name} className="w-8 h-8 rounded-xl object-contain p-1 bg-white shadow-xs border" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{tool.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{tool.type} • {tool.auth}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                    Active Binding ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right JSON Manifest Inspector Column (Lg: col-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* JSON Manifest Code Inspector */}
          <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-violet-400" />
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Manifest JSON
                </h3>
              </div>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy Spec'}</span>
              </button>
            </div>

            <pre className="text-[11px] font-mono text-violet-300 leading-relaxed overflow-x-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
              {sampleJsonSchema}
            </pre>

            <button
              onClick={() => alert('Saved blueprint updates to cloud repository.')}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save & Publish Blueprint</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
