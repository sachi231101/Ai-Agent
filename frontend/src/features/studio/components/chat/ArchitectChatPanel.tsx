import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Paperclip,
  Mic,
  Monitor,
  RotateCcw,
  Check,
  Copy,
  Zap,
  Code2,
  GitBranch,
  Shield,
  HelpCircle,
  MessageSquare,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';
import type { ChatMessage, ClarificationQuestion } from '../../types';

interface ArchitectChatPanelProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  onSend: (text: string) => void;
  onAnswerClarification: (questionId: string, optionValue: string) => void;
  onReset: () => void;
}

const SAMPLE_STARTERS = [
  {
    icon: <Zap size={20} className="text-amber-400" />,
    title: '24/7 Customer Support Assistant',
    desc: 'Answer customer questions automatically using your company FAQ and update support tickets.',
    prompt: 'Build me a 24/7 customer support AI agent that answers customer questions using our FAQ docs and connects to Zendesk.',
  },
  {
    icon: <Code2 size={20} className="text-indigo-400" />,
    title: 'Daily Email Digest & Slack Bot',
    desc: 'Summarize unread emails every morning and send a quick report to a Slack channel.',
    prompt: 'Create an email assistant that reads my unread Gmail messages every morning and posts a digest to Slack.',
  },
  {
    icon: <GitBranch size={20} className="text-emerald-400" />,
    title: 'Lead Qualifier & Welcome Emailer',
    desc: 'Check new leads in HubSpot, score their quality, and send personalized welcome emails.',
    prompt: 'Build a sales lead assistant that checks new contacts in HubSpot and sends personalized emails via SendGrid.',
  },
  {
    icon: <Shield size={20} className="text-purple-400" />,
    title: 'Meeting Summarizer & Notion Tasks',
    desc: 'Turn meeting notes or transcripts into structured summaries and action items in Notion.',
    prompt: 'Build a meeting assistant that takes meeting transcripts, summarizes key points, and creates tasks in Notion.',
  },
];

const ACTION_PILLS = [
  'Also notify Microsoft Teams',
  'Run only on weekdays',
  'Only summarize unread emails',
  'Add vector memory storage',
];

export const ArchitectChatPanel: React.FC<ArchitectChatPanelProps> = ({
  messages,
  isProcessing,
  onSend,
  onAnswerClarification,
  onReset,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isProcessing) {
        onSend(input);
        setInput('');
      }
    }
  };

  const handleSendClick = () => {
    if (input.trim() && !isProcessing) {
      onSend(input);
      setInput('');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="flex flex-col h-full bg-[#12101a] border-r border-white/10 overflow-hidden">
      {/* Header */}
      <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0f0d16]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <Sparkles size={16} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">AI Solutions Architect</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            <p className="text-[11px] text-white/40">Conversational AI Agent Design Engine</p>
          </div>
        </div>

        {hasMessages && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs transition-colors"
            title="Start New Architect Session"
          >
            <RotateCcw size={13} />
            <span>New Design</span>
          </button>
        )}
      </div>

      {/* Main Conversation / Starter View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!hasMessages ? (
          <div className="h-full flex flex-col justify-center max-w-lg mx-auto py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium w-fit mb-4">
              <Bot size={14} />
              <span>AI Architect Mode</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              Describe your AI Agent idea
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Just talk in plain English. I'll analyze your requirements, ask clarification questions if needed, design your complete agent specification, and prepare it for deployment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_STARTERS.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => onSend(card.prompt)}
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 text-left transition-all group hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-white/5">{card.icon}</div>
                    <ArrowRight size={14} className="text-white/30 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{card.title}</h4>
                  <p className="text-[11px] text-white/40 leading-snug">{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles size={14} className="text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border border-purple-500/30 text-white rounded-tr-xs'
                      : 'bg-white/[0.04] border border-white/10 text-white/90 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Clarification Engine Interactive Option Chips */}
                  {msg.clarificationQuestion && !msg.clarificationQuestion.answered && (
                    <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-[11px]">
                        <HelpCircle size={13} />
                        <span>{msg.clarificationQuestion.question}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.clarificationQuestion.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => onAnswerClarification(msg.clarificationQuestion!.id, opt.value)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 text-[11px] font-medium transition-all hover:scale-105 active:scale-95"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-1.5 text-[10px] text-white/30 border-t border-white/5">
                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-white transition-colors"
                      title="Copy Message"
                    >
                      {copiedId === msg.id ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-indigo-400" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-white/10 bg-[#0f0d16]/90 space-y-2">
        {/* Action Pills */}
        {hasMessages && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ACTION_PILLS.map((pill, pIdx) => (
              <button
                key={pIdx}
                onClick={() => onSend(pill)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-white/60 hover:text-purple-200 text-[11px] font-medium whitespace-nowrap transition-all"
              >
                + {pill}
              </button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 focus-within:border-purple-500/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Talk to your AI Architect... (e.g. Build an agent that reads Gmail and alerts Slack)"
            rows={2}
            className="w-full bg-transparent border-none outline-none text-white text-xs placeholder:text-white/30 resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <div className="flex items-center gap-2 text-white/40">
              <button className="hover:text-white p-1 transition-colors" title="Attach file">
                <Paperclip size={14} />
              </button>
              <button className="hover:text-white p-1 transition-colors" title="Voice dictation">
                <Mic size={14} />
              </button>
              <button className="hover:text-white p-1 transition-colors" title="Screen context">
                <Monitor size={14} />
              </button>
            </div>
            <button
              onClick={handleSendClick}
              disabled={!input.trim() || isProcessing}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !isProcessing
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40 hover:scale-105'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
