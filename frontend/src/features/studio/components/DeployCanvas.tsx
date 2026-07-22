import { useState } from 'react';
import { 
  Zap, 
  HelpCircle, 
  Cloud, 
  Pencil, 
  Clock, 
  Sparkles, 
  Layers, 
  Lock, 
  Brain, 
  FileText, 
  Check, 
  MoreHorizontal, 
  ArrowLeft, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { ConnectAppModal } from './workspace/ConnectAppModal';

interface DeployCanvasProps {
  onBackToReview: () => void;
  onSaveAndContinue: () => void;
  agentName?: string;
}

export function DeployCanvas({ onBackToReview, onSaveAndContinue, agentName = 'Email Summary Agent' }: DeployCanvasProps) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  
  const [integrationsList, setIntegrationsList] = useState([
    {
      id: 'gmail',
      name: 'Gmail',
      desc: 'Read emails and manage messages.',
      icon: '/assets-icons/gmail.png',
      connected: true,
    },
    {
      id: 'slack',
      name: 'Slack',
      desc: 'Send messages and get notifications.',
      icon: '⚡',
      connected: true,
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      desc: 'Create events and manage your schedule.',
      icon: '📅',
      connected: true,
    },
    {
      id: 'notion',
      name: 'Notion',
      desc: 'Access pages, databases and content.',
      icon: '📝',
      connected: false,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      desc: 'Send and receive WhatsApp messages.',
      icon: '💬',
      connected: false,
    },
    {
      id: 'drive',
      name: 'Google Drive',
      desc: 'Access files and documents from Drive.',
      icon: '📁',
      connected: false,
    },
    {
      id: 'github',
      name: 'GitHub',
      desc: 'Access repositories and manage issues.',
      icon: '🐙',
      connected: false,
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      desc: 'Access CRM data and manage records.',
      icon: '🎯',
      connected: false,
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      desc: 'Access tickets and customer conversations.',
      icon: '🎧',
      connected: false,
    },
  ]);

  const connectedCount = integrationsList.filter((item) => item.connected).length;

  const toggleConnect = (id: string) => {
    setIntegrationsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col transition-colors overflow-x-hidden">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
        
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
            <Zap className="h-4.5 w-4.5 fill-current" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI Agent Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                Draft
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              Build powerful AI agents with plain English.
            </p>
          </div>
        </div>

        {/* Center Stepper Navigation */}
        <div className="hidden md:flex items-center gap-3 px-6 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold">
          
          {/* Step 1 */}
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              1
            </div>
            <span>Build</span>
          </div>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 2 */}
          <button
            onClick={onBackToReview}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              2
            </div>
            <span>Review</span>
          </button>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 3 */}
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              3
            </div>
            <span>Test</span>
          </div>

          <span className="w-8 h-0.5 bg-violet-500" />

          {/* Step 4: Deploy (Active) */}
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-extrabold">
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm ring-4 ring-violet-500/20">
              4
            </div>
            <span>Deploy</span>
          </div>

        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Opening integrations documentation...')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>

          <button
            onClick={() => alert('Draft saved!')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Cloud className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onSaveAndContinue}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-1.5"
          >
            <span>Next: Deploy</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </header>

      {/* ─── MAIN CONTENT BODY ──────────────────────────────────────────────── */}
      <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Connect Integrations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Connect the apps and services your agent needs to work.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{connectedCount} / {integrationsList.length + 1} connected</span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ─── LEFT COLUMN: Integrations Grid (Lg: col-8) ────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {integrationsList.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-violet-500/40 transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700/60 shadow-xs group-hover:scale-105 transition-transform">
                        {app.icon.startsWith('/') || app.icon.includes('.png') ? (
                          <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xl">{app.icon}</span>
                        )}
                      </div>

                      {app.connected && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                          Connected
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {app.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {app.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {app.connected ? (
                      <>
                        <button
                          onClick={() => toggleConnect(app.id)}
                          className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => toggleConnect(app.id)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => toggleConnect(app.id)}
                        className="w-full py-2 rounded-xl border border-violet-200 dark:border-violet-800/80 bg-violet-50/50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 hover:bg-violet-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Zap className="h-3.5 w-3.5 text-violet-600 fill-current" />
                        <span>Connect</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Webhooks Full Width Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg">
                  ⚛️
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Webhooks</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Send data to any external service with webhooks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <span>Configure</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Agent Summary Sidebar (Lg: col-4) ─────────────── */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs space-y-6">
            
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Agent Summary
              </h3>

              {/* Agent Title & Avatar Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img 
                  src="/assets-icons/robot-purple.png" 
                  alt="Agent" 
                  className="w-12 h-12 rounded-2xl object-cover shadow-md shadow-violet-500/20 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {agentName}
                    </h4>
                    <Pencil className="h-3 w-3 text-violet-500 cursor-pointer" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    Summarizes important emails every morning and sends a report to Slack.
                  </p>
                </div>
              </div>

              {/* Specs Summary List */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Clock className="h-4 w-4 text-violet-500" /> Trigger
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Every day at 9:00 AM</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Sparkles className="h-4 w-4 text-violet-500" /> Capabilities
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">4 capabilities</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Layers className="h-4 w-4 text-violet-500" /> Integrations
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3 connected</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Lock className="h-4 w-4 text-violet-500" /> Data Access
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Gmail, Slack</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <Brain className="h-4 w-4 text-violet-500" /> Memory
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Short-term memory</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-2 text-slate-500 font-medium">
                    <FileText className="h-4 w-4 text-violet-500" /> Outputs
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Slack message, Email report (PDF)</span>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="pt-3 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Permissions</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  This agent will have access to the following data and actions.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Read emails from Gmail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Send messages to Slack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Create events in Google Calendar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Access files in Google Drive</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom "Need another integration?" Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50/70 dark:from-slate-800 dark:to-violet-950/30 border border-violet-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-300">
                  Need another integration?
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  Request a new integration or suggest an app.
                </p>
                <button
                  onClick={() => setIsConnectModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl border border-violet-200 dark:border-violet-700 bg-white dark:bg-slate-800 text-violet-700 dark:text-violet-300 text-xs font-bold hover:bg-violet-50 transition-colors"
                >
                  Request Integration
                </button>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 text-xl font-bold">
                🧩
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ─── BOTTOM ACTION FOOTER BAR ───────────────────────────────────────── */}
      <footer className="h-16 px-6 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky bottom-0 z-30 shadow-lg">
        <button
          onClick={onBackToReview}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Review</span>
        </button>

        <button
          onClick={onSaveAndContinue}
          className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-2"
        >
          <span>Save & Continue to Test</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </footer>

      <ConnectAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

    </div>
  );
}
