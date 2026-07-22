import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  HelpCircle, 
  Share2, 
  Check, 
  Send, 
  Sparkles, 
  Eye, 
  Pencil, 
  Clock, 
  Brain, 
  FileText, 
  Lock, 
  MoreHorizontal,
  Bot,
  Layers,
  ArrowRight,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

interface StudioCanvasProps {
  onBack?: () => void;
  onNextToReview?: () => void;
  agentName?: string;
  initialPrompt?: string;
}

export function StudioCanvas({ onBack, onNextToReview, agentName = 'Email Summary Agent', initialPrompt }: StudioCanvasProps) {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'workspace' | 'other'>('gmail');
  const [selectedFrequency, setSelectedFrequency] = useState<'daily' | 'weekdays' | 'custom'>('daily');
  const [currentStep, setCurrentStep] = useState(3);
  const [inputVal, setInputVal] = useState('');
  
  const [messages, setMessages] = useState<Array<{ id: number; role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      id: 1,
      role: 'user',
      text: initialPrompt || 'Build an AI agent that summarizes my Gmail every morning and sends me a report on Slack.',
      time: '10:21 AM',
    },
    {
      id: 2,
      role: 'assistant',
      text: "Great! I'll build that for you. To start, which email provider do you use?",
      time: '10:21 AM',
    },
  ]);

  const [hasSelectedProvider, setHasSelectedProvider] = useState(true);

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputVal).trim();
    if (!textToSend) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: textToSend, time: '10:22 AM' },
    ]);
    if (!customText) setInputVal('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: `Perfect! I'll connect with ${textToSend}. Next, how often should this agent run?`,
          time: '10:22 AM',
        },
      ]);
      if (currentStep < 6) setCurrentStep((prev) => prev + 1);
    }, 700);
  };

  const handleSelectProviderOption = (providerKey: 'gmail' | 'outlook' | 'workspace' | 'other', name: string) => {
    setSelectedProvider(providerKey);
    setHasSelectedProvider(true);
    handleSendMessage(undefined, name);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col transition-colors overflow-x-hidden">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
        
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors mr-1"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

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
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold">
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              1
            </div>
            <span>Build</span>
          </div>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 2 */}
          <button
            onClick={onNextToReview}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer font-semibold transition-colors"
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

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 4 */}
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              4
            </div>
            <span>Deploy</span>
          </div>

        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(ROUTES.KNOWLEDGE)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>

          <button
            onClick={() => alert('Shareable blueprint link copied to clipboard!')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => {
              alert(`Draft saved for agent: "${agentName}"!`);
              if (onBack) onBack();
              else navigate(ROUTES.DASHBOARD);
            }}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02]"
          >
            Save Draft
          </button>
        </div>

      </header>

      {/* ─── 3-COLUMN CANVAS GRID ─────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 max-w-[1600px] w-full mx-auto">
        
        {/* ─── COLUMN 1: Conversation (Lg: col-4) ───────────────────────────── */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="text-base">💬</span>
              <span>Conversation</span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 overflow-y-auto max-h-[460px] pr-1">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  {msg.role === 'user' ? (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mb-1 mr-1">
                        You
                      </span>
                      <div className="max-w-[90%] p-3.5 rounded-2xl rounded-tr-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-medium leading-relaxed shadow-xs">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 mr-1 flex items-center gap-1 font-mono">
                        {msg.time} <span className="text-violet-500 font-bold">✓✓</span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2.5 items-start">
                      <img 
                        src="/assets-icons/robot-purple.png" 
                        alt="AI Architect" 
                        className="w-7 h-7 rounded-xl object-cover shadow-md shrink-0 mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-slate-900 dark:text-white block mb-1">
                          AI Architect
                        </span>
                        <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-medium leading-relaxed shadow-xs space-y-2">
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 ml-1 font-mono block">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Provider Options (Radio Selection UI) */}
              <div className="ml-9 space-y-2 pt-1">
                {/* Gmail Option */}
                <button
                  type="button"
                  onClick={() => handleSelectProviderOption('gmail', 'Gmail')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'gmail'
                      ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 shadow-xs ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="/assets-icons/gmail.png" 
                      alt="Gmail" 
                      className="w-6 h-6 object-contain"
                    />
                    <span>Gmail</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedProvider === 'gmail' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'gmail' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Outlook Option */}
                <button
                  type="button"
                  onClick={() => handleSelectProviderOption('outlook', 'Outlook')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'outlook'
                      ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 shadow-xs ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="/assets-icons/outlook.png" 
                      alt="Outlook" 
                      className="w-6 h-6 object-contain"
                    />
                    <span>Outlook</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedProvider === 'outlook' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'outlook' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Google Workspace Option */}
                <button
                  type="button"
                  onClick={() => handleSelectProviderOption('workspace', 'Google Workspace')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'workspace'
                      ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 shadow-xs ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600 font-extrabold text-xs shadow-xs">
                      G
                    </span>
                    <span>Google Workspace</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedProvider === 'workspace' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'workspace' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Other Option */}
                <button
                  type="button"
                  onClick={() => handleSelectProviderOption('other', 'Other provider')}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'other'
                      ? 'border-violet-500 bg-violet-50/60 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 shadow-xs ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-extrabold text-xs shadow-xs">
                      ✉
                    </span>
                    <span>Other</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedProvider === 'other' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'other' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              </div>

              {/* Frequency Schedule Pills */}
              {hasSelectedProvider && (
                <div className="ml-9 pt-2 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    Execution Schedule
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFrequency('daily');
                        handleSendMessage(undefined, 'Daily schedule at 9:00 AM');
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedFrequency === 'daily'
                          ? 'bg-violet-100 dark:bg-violet-950 border border-violet-500 text-violet-700 dark:text-violet-300 font-bold'
                          : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFrequency('weekdays');
                        handleSendMessage(undefined, 'Weekdays only schedule');
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedFrequency === 'weekdays'
                          ? 'bg-violet-100 dark:bg-violet-950 border border-violet-500 text-violet-700 dark:text-violet-300 font-bold'
                          : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Weekdays
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFrequency('custom');
                        handleSendMessage(undefined, 'Custom trigger schedule');
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedFrequency === 'custom'
                          ? 'bg-violet-100 dark:bg-violet-950 border border-violet-500 text-violet-700 dark:text-violet-300 font-bold'
                          : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Chat Input Form & Quick Action Pills */}
          <div className="space-y-3 pt-3">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask anything..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-4 pr-11 py-3 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 shadow-xs"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Action Suggestion Pills Under Input */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleSendMessage(undefined, 'Add WhatsApp notifications')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
              >
                <span>+ Add WhatsApp notifications</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage(undefined, 'Only unread emails')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
              >
                <span>+ Only unread emails</span>
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage(undefined, 'Include important emails only')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
              >
                <span>Include important emails only</span>
              </button>
              <button
                type="button"
                onClick={() => setMessages(messages.slice(0, 2))}
                className="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors ml-auto"
                title="Reset Conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── COLUMN 2: Building Progress (Lg: col-4) ──────────────────────── */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span>Building Progress</span>
            </div>

            {/* Timeline Steps Stack */}
            <div className="space-y-3 pt-1">
              
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Understanding your idea
                    </h4>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Goal identified
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Identifying requirements
                    </h4>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Extracted key requirements
                  </p>
                </div>
              </div>

              {/* Step 3 (Active highlighted step) */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-violet-300 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-950/30 shadow-xs ring-1 ring-violet-500/20">
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-200">
                      Asking missing questions
                    </h4>
                    <MoreHorizontal className="h-4 w-4 text-violet-600 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-violet-700/80 dark:text-violet-300/80 mt-0.5 font-medium">
                    Getting important details
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40 opacity-60">
                <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Designing your agent
                    </h4>
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Creating capabilities & flow
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40 opacity-60">
                <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  5
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Preparing for testing
                    </h4>
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Configuring & validating
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40 opacity-60">
                <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  6
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Finalizing & optimizing
                    </h4>
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Optimizing for best performance
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Callout Card */}
          <div className="mt-4 p-4 rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-gradient-to-br from-violet-50/90 to-indigo-50/60 dark:from-violet-950/40 dark:to-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-violet-700 dark:text-violet-400">
              <ArrowRight className="h-4 w-4" />
              <span>Next Step</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug font-medium">
              Answer one more question so we can complete your agent.
            </p>
            <button
              onClick={() => {
                handleSendMessage(undefined, 'Complete agent configuration');
                if (onNextToReview) onNextToReview();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.01]"
            >
              <span>Review Agent</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ─── COLUMN 3: Your Agent (Live Preview) (Lg: col-4) ─────────────── */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Eye className="h-4 w-4 text-violet-600" />
                <span>Your Agent</span>
                <span className="text-slate-400 text-[10px] normal-case font-normal">(Live Preview)</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Designing
              </span>
            </div>

            {/* Agent Spec Container Card */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs space-y-4">
              
              {/* Agent Avatar & Name */}
              <div className="flex items-center gap-3">
                <img 
                  src="/assets-icons/robot-purple.png" 
                  alt="Agent Avatar" 
                  className="w-12 h-12 rounded-2xl object-cover shadow-md shadow-violet-500/20 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {agentName}
                    </h3>
                    <Pencil className="h-3 w-3 text-violet-500 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    AI agent that summarizes emails and sends reports to Slack.
                  </p>
                </div>
              </div>

              {/* Purpose Box */}
              <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <span className="font-bold text-violet-900 dark:text-violet-300 block mb-0.5">Purpose</span>
                Summarize important emails every morning and send a report to Slack.
              </div>

              {/* Specification Stack */}
              <div className="space-y-3 text-xs">
                
                {/* Capabilities */}
                <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                      <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                      <span>Capabilities</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                      4
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                    Read emails, summarize, detect priority, create report, send to Slack
                  </p>
                </div>

                {/* Integrations */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <Layers className="h-3.5 w-3.5 text-violet-500" />
                    <span>Integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center -space-x-1">
                      <img src="/assets-icons/gmail.png" alt="Gmail" className="w-4 h-4 object-contain ring-2 ring-white dark:ring-slate-800 rounded-full" />
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold ring-2 ring-white dark:ring-slate-800">#</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                  </div>
                </div>

                {/* Trigger */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="h-3.5 w-3.5 text-violet-500" />
                    <span>Trigger</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Every day at 9:00 AM
                  </span>
                </div>

                {/* Memory */}
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-700/50 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <Brain className="h-3.5 w-3.5 text-violet-500" />
                    <span>Memory</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    Enabled <Check className="h-3 w-3" />
                  </span>
                </div>

                {/* Outputs */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <FileText className="h-3.5 w-3.5 text-violet-500" />
                    <span>Outputs</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Slack message, Email report (PDF)
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom "What happens next?" Card */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50/70 dark:from-slate-800 dark:to-violet-950/30 border border-violet-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-300">
                What happens next?
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                Once you answer a few more questions, I'll design your agent and show you the complete workflow.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
