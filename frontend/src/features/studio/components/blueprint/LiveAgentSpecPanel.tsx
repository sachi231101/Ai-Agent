import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Save,
  Bot,
  Brain,
  Zap,
  Lock,
  Globe,
  Plug,
  Plus,
  Edit3,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { PromptVariableTuner } from './PromptVariableTuner';
import { AgentCodeExporterModal } from '../deploy/AgentCodeExporterModal';
import type { AgentSpecification, EditHistoryEntry } from '../../types';
import { ConnectAppModal, POPULAR_APPS } from '../workspace/ConnectAppModal';
import type { AppIntegrationItem } from '../workspace/ConnectAppModal';

interface LiveAgentSpecPanelProps {
  agentSpec: AgentSpecification | null;
  explanationText: string;
  editHistory: EditHistoryEntry[];
  onSaveAgent: () => void;
}

export const LiveAgentSpecPanel: React.FC<LiveAgentSpecPanelProps> = ({
  agentSpec,
  explanationText,
  editHistory,
  onSaveAgent,
}) => {
  const [copied, setCopied] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  const [selectedAppForModal, setSelectedAppForModal] = useState<AppIntegrationItem | null>(null);
  const [toneMode, setToneMode] = useState<string>('Helpful & Friendly');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Safety controls state
  const [askHumanBeforeEmail, setAskHumanBeforeEmail] = useState(true);
  const [useCompanyKnowledge, setUseCompanyKnowledge] = useState(true);
  const [escalateFrustrated, setEscalateFrustrated] = useState(true);

  if (!agentSpec) {
    return (
      <div className="flex flex-col h-full bg-[#12101a] overflow-hidden p-6 justify-center items-center text-center space-y-3 border-l border-white/10 text-white">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <Bot size={24} className="text-purple-400 opacity-60" />
        </div>
        <h4 className="text-sm font-bold">AI Agent Builder</h4>
        <p className="text-xs text-white/40 max-w-xs leading-relaxed">
          Type what you want your AI Agent to do in the chat prompt, and we will build it for you in plain English!
        </p>
      </div>
    );
  }

  const responsibilities = agentSpec.responsibilities || [
    'Answer user support questions in plain English',
    'Search company FAQ knowledge base',
    'Send urgent support notifications to Slack'
  ];

  const handleOpenConnectModal = (app?: AppIntegrationItem) => {
    if (app) setSelectedAppForModal(app);
    else setSelectedAppForModal(null);
    setIsConnectModalOpen(true);
  };

  const handleSave = () => {
    onSaveAgent();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0b16] border-l border-white/10 overflow-hidden text-white font-sans">
      {/* Top Header */}
      <div className="h-14 px-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#121020]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {agentSpec.agentName || 'My AI Agent'}
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                ● Ready to Use
              </span>
            </h3>
            <p className="text-[11px] text-white/50">Plain English Configuration • No Code Required</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExporterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-bold transition-all border border-purple-500/30 cursor-pointer"
          >
            <Code2 size={13} />
            <span>Export Code</span>
          </button>

          <button
            onClick={() => handleOpenConnectModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            <Plug size={13} className="text-purple-400" />
            <span>+ Connect App</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 cursor-pointer"
          >
            {savedSuccess ? <Check size={13} className="text-emerald-400" /> : <Save size={13} />}
            <span>{savedSuccess ? 'Saved!' : 'Save Agent'}</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Configuration Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6">
        {/* Section 1: Agent Purpose in Plain English */}
        <div className="p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <Brain size={15} className="text-purple-400" />
              What Your Agent Does (Plain English Goal)
            </h4>
            <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              Auto-Generated
            </span>
          </div>

          <p className="text-xs text-white/80 leading-relaxed font-sans bg-black/30 p-3 rounded-xl border border-white/5">
            "{agentSpec.description || agentSpec.systemPrompt || 'Your agent handles customer inquiries, searches knowledge bases, and performs automated actions.'}"
          </p>

          <div className="space-y-2">
            <h5 className="text-[11px] font-bold text-white/60">Key Tasks Performed:</h5>
            <ul className="space-y-1.5">
              {responsibilities.map((task, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-white/90 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prompt Variable Tuner Component */}
        <PromptVariableTuner
          systemPrompt={agentSpec.systemPrompt || 'You are an autonomous AI Agent built on Vibe Agent.'}
          onUpdatePrompt={(newPrompt) => {
            agentSpec.systemPrompt = newPrompt;
          }}
        />

        {/* Section 2: Connected Applications & 1-Click Connection Grid */}
        <div className="p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <Plug size={15} className="text-blue-400" />
                Connected Apps & Tools
              </h4>
              <p className="text-[11px] text-white/50">Click any button below to connect or manage applications for your agent.</p>
            </div>

            <button
              onClick={() => handleOpenConnectModal()}
              className="px-3 py-1 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
            >
              <Plus size={13} />
              <span>Add Connection</span>
            </button>
          </div>

          {/* App Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_APPS.slice(0, 6).map((app) => (
              <div
                key={app.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl shrink-0">{app.icon}</span>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{app.name}</h5>
                    <p className="text-[10px] text-white/40 truncate">{app.category}</p>
                  </div>
                </div>

                {app.connected ? (
                  <button
                    onClick={() => handleOpenConnectModal(app)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer shrink-0"
                  >
                    ✓ Connected
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenConnectModal(app)}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    + Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Tone & Communication Style */}
        <div className="p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <Volume2 size={15} className="text-amber-400" />
            Agent Tone & Personality
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Helpful & Friendly', icon: '😊' },
              { label: 'Professional & Executive', icon: '💼' },
              { label: 'Short & Concise', icon: '⚡' },
              { label: 'Strict & Formal', icon: '📋' },
            ].map((tone, idx) => (
              <button
                key={idx}
                onClick={() => setToneMode(tone.label)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  toneMode === tone.label
                    ? 'bg-purple-600/30 border-purple-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{tone.icon}</span>
                <span className="text-[11px]">{tone.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Plain English Controls & Approvals */}
        <div className="p-4.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <ShieldCheck size={15} className="text-emerald-400" />
            Safety & Manager Approvals
          </h4>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
              <input
                type="checkbox"
                checked={askHumanBeforeEmail}
                onChange={(e) => setAskHumanBeforeEmail(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
              <div>
                <p className="text-xs font-bold text-white">Ask human manager before sending external emails</p>
                <p className="text-[10px] text-white/40">Saves draft email for approval before dispatching.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
              <input
                type="checkbox"
                checked={useCompanyKnowledge}
                onChange={(e) => setUseCompanyKnowledge(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
              <div>
                <p className="text-xs font-bold text-white">Strictly answer using uploaded company documents</p>
                <p className="text-[10px] text-white/40">Prevents agent from making up unverified facts.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
              <input
                type="checkbox"
                checked={escalateFrustrated}
                onChange={(e) => setEscalateFrustrated(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
              <div>
                <p className="text-xs font-bold text-white">Auto-escalate angry or frustrated customer messages to Slack</p>
                <p className="text-[10px] text-white/40">Alerts team members immediately on high priority tickets.</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      <ConnectAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        selectedApp={selectedAppForModal}
      />

      {/* Code Exporter Modal */}
      <AgentCodeExporterModal
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
        spec={agentSpec}
        agentName={agentSpec.agentName}
      />
    </div>
  );
};
