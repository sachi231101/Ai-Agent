import React, { useState } from 'react';
import {
  X,
  Check,
  Zap,
  Lock,
  Globe,
  CheckCircle2,
  Plug,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Key,
  Mail,
  MessageSquare,
  Database,
  FileText
} from 'lucide-react';

export interface AppIntegrationItem {
  id: string;
  name: string;
  category: string;
  icon: string; // Emoji or logo identifier
  description: string;
  connected: boolean;
  authType: 'oauth' | 'apikey' | 'webhook';
}

export const POPULAR_APPS: AppIntegrationItem[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Email & Workspace',
    icon: '/assets-icons/gmail.png',
    description: 'Read incoming emails, extract tasks, summarize threads, and send automated responses.',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    category: 'Email & Calendar',
    icon: '/assets-icons/outlook.png',
    description: 'Sync Outlook inbox, draft email responses, and manage calendar events automatically.',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'zendesk',
    name: 'Zendesk Support',
    category: 'Customer Support',
    icon: '💬',
    description: 'Read and respond to customer support tickets automatically.',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'slack',
    name: 'Slack Workspace',
    category: 'Team Chat',
    icon: '⚡',
    description: 'Receive notifications and post updates to Slack channels.',
    connected: true,
    authType: 'oauth',
  },
  {
    id: 'pinecone',
    name: 'Knowledge RAG Store',
    category: 'Memory & Search',
    icon: '🧠',
    description: 'Search company PDFs, documents, and website knowledge.',
    connected: true,
    authType: 'apikey',
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    category: 'Sales & Marketing',
    icon: '🎯',
    description: 'Enrich lead contacts and update deal stages.',
    connected: false,
    authType: 'oauth',
  },
  {
    id: 'notion',
    name: 'Notion Workspace',
    category: 'Knowledge Base',
    icon: '📝',
    description: 'Pull team notes, SOPs, and internal wiki docs.',
    connected: false,
    authType: 'oauth',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'Files & Storage',
    icon: '📁',
    description: 'Import PDFs, spreadsheets, and Word documents.',
    connected: false,
    authType: 'oauth',
  },
  {
    id: 'shopify',
    name: 'Shopify Store',
    category: 'E-Commerce',
    icon: '🛍️',
    description: 'Look up customer order status, tracking, and returns.',
    connected: false,
    authType: 'oauth',
  },
  {
    id: 'webhook',
    name: 'Custom Webhook API',
    category: 'Developer API',
    icon: '🔗',
    description: 'Connect any custom web application via HTTPS webhook trigger.',
    connected: true,
    authType: 'webhook',
  },
];

interface ConnectAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppConnected?: (appId: string) => void;
  selectedApp?: AppIntegrationItem | null;
}

export const ConnectAppModal: React.FC<ConnectAppModalProps> = ({
  isOpen,
  onClose,
  onAppConnected,
  selectedApp: initialApp,
}) => {
  const [activeApp, setActiveApp] = useState<AppIntegrationItem>(initialApp || POPULAR_APPS[0]);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedSuccess, setConnectedSuccess] = useState(false);
  const [appsList, setAppsList] = useState<AppIntegrationItem[]>(POPULAR_APPS);

  if (!isOpen) return null;

  const handleConnect = (app: AppIntegrationItem) => {
    setIsConnecting(true);
    setConnectedSuccess(false);

    setTimeout(() => {
      setIsConnecting(false);
      setConnectedSuccess(true);
      setAppsList((prev) =>
        prev.map((item) => (item.id === app.id ? { ...item, connected: true } : item))
      );
      if (onAppConnected) onAppConnected(app.id);

      setTimeout(() => {
        setConnectedSuccess(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#110f1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161426]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Plug size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Connect Apps & Tools</h3>
              <p className="text-xs text-white/50">Allow your AI Agent to perform actions and read data in 1-click</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
          {/* Left App Picker Column (5 cols) */}
          <div className="md:col-span-5 border-r border-white/10 p-3 space-y-1.5 overflow-y-auto bg-[#0d0b16]">
            {appsList.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setActiveApp(app);
                  setConnectedSuccess(false);
                }}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  activeApp.id === app.id
                    ? 'bg-purple-600/20 border border-purple-500/40 text-white'
                    : 'bg-white/[0.02] border border-white/5 hover:bg-white/5 text-white/70'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {app.icon.startsWith('/') || app.icon.includes('.png') ? (
                    <img src={app.icon} alt={app.name} className="w-5 h-5 object-contain shrink-0" />
                  ) : (
                    <span className="text-xl shrink-0">{app.icon}</span>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold truncate">{app.name}</h4>
                    <p className="text-[10px] text-white/40 truncate">{app.category}</p>
                  </div>
                </div>

                {app.connected ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30 shrink-0">
                    ✓ Connected
                  </span>
                ) : (
                  <span className="text-[10px] text-purple-400 font-bold shrink-0">
                    + Connect
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right Setup Details Column (7 cols) */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between overflow-y-auto bg-[#110f1c]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {activeApp.icon.startsWith('/') || activeApp.icon.includes('.png') ? (
                  <img src={activeApp.icon} alt={activeApp.name} className="w-8 h-8 object-contain shrink-0" />
                ) : (
                  <span className="text-3xl">{activeApp.icon}</span>
                )}
                <div>
                  <h4 className="text-base font-bold text-white">{activeApp.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[11px] font-medium">
                    {activeApp.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed bg-white/[0.03] p-3 rounded-xl border border-white/5">
                {activeApp.description}
              </p>

              {/* Status Banner */}
              {activeApp.connected ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">App is Connected!</p>
                    <p className="text-[11px] text-emerald-400/80">Your AI Agent can now interact with {activeApp.name} seamlessly.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-white/80">Easy 1-Click Connection</h5>
                  
                  {activeApp.authType === 'oauth' ? (
                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                      <p className="text-xs text-purple-200">
                        Click the button below to authorize {activeApp.name} securely. No coding required.
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-white/50">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        <span>Encrypted OAuth 2.0 connection</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/80 block">API Key or Secret Token</label>
                      <input
                        type="password"
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        placeholder="Paste your API key here..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-purple-500 transition-all font-mono"
                      />
                      <p className="text-[10px] text-white/40">Keys are encrypted with AES-256 vault security.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>

              {activeApp.connected ? (
                <button
                  onClick={() => {
                    setAppsList((prev) =>
                      prev.map((item) => (item.id === activeApp.id ? { ...item, connected: false } : item))
                    );
                    setActiveApp((prev) => ({ ...prev, connected: false }));
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 text-xs font-bold transition-all cursor-pointer"
                >
                  Disconnect App
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(activeApp)}
                  disabled={isConnecting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer transition-all"
                >
                  {isConnecting ? (
                    <>
                      <Sparkles size={14} className="animate-spin" />
                      <span>Connecting {activeApp.name}...</span>
                    </>
                  ) : connectedSuccess ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Connected Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Plug size={14} />
                      <span>Connect {activeApp.name} Now</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
