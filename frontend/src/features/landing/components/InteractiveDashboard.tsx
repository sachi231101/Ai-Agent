import { useState } from 'react';
import { 
  Check, 
  Send, 
  Sparkles, 
  Eye, 
  Pencil, 
  Clock, 
  Brain, 
  FileText, 
  MoreHorizontal,
  Bot,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

export function InteractiveDashboard() {
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'other'>('gmail');
  const [messages, setMessages] = useState<Array<{ id: number; role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      id: 1,
      role: 'user',
      text: 'Build an AI agent that summarizes my Gmail every morning and sends me a report on Slack.',
      time: '10:21 AM',
    },
    {
      id: 2,
      role: 'assistant',
      text: "Great! I'll help you build that. First, which email provider do you use?",
      time: '10:21 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(3);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: userMsg, time: '10:22 AM' },
    ]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: `Got it! Configuring integration for ${userMsg}. Next, setting up the daily trigger schedule at 9:00 AM.`,
          time: '10:22 AM',
        },
      ]);
      if (currentStep < 5) setCurrentStep(prev => prev + 1);
    }, 800);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-violet-500/10 overflow-hidden font-sans transition-colors">
      
      {/* ─── Top Studio Header Bar ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            AI Agent Studio
          </h2>
        </div>

        {/* Stepper Pill */}
        <div className="flex items-center gap-2 sm:gap-4 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shadow-sm text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400">
            <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px]">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Build</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">---</span>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[9px]">
              2
            </div>
            <span>Review</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">---</span>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[9px]">
              3
            </div>
            <span>Test</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">---</span>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[9px]">
              4
            </div>
            <span>Deploy</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
          Save Draft
        </button>
      </div>

      {/* ─── 3-Column Studio Grid Layout ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
        
        {/* ─── COLUMN 1: Conversation (Chat) ─────────────────────────────── */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-slate-50/30 dark:bg-slate-900/30">
          <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="text-sm">💬</span>
              <span>Conversation</span>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 overflow-y-auto max-h-[380px] pr-1">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  {msg.role === 'user' ? (
                    <div className="flex flex-col items-end">
                      <div className="max-w-[90%] p-3.5 rounded-2xl rounded-tr-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-medium leading-relaxed shadow-sm">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 mr-1 flex items-center gap-1 font-mono">
                        {msg.time} <span className="text-violet-500 font-bold">✓✓</span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2.5 items-start">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0 mt-0.5">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-medium leading-relaxed shadow-sm">
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 ml-1 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Provider Options (Interactive radio choices) */}
              <div className="ml-9 space-y-2 pt-1">
                {/* Gmail option */}
                <button
                  type="button"
                  onClick={() => setSelectedProvider('gmail')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'gmail'
                      ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 text-violet-900 dark:text-violet-200 shadow-sm ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-rose-100 text-rose-600 font-bold text-[11px]">
                      M
                    </span>
                    <span>Gmail</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedProvider === 'gmail' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'gmail' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Outlook option */}
                <button
                  type="button"
                  onClick={() => setSelectedProvider('outlook')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'outlook'
                      ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 text-violet-900 dark:text-violet-200 shadow-sm ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-[11px]">
                      O
                    </span>
                    <span>Outlook</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedProvider === 'outlook' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'outlook' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>

                {/* Other option */}
                <button
                  type="button"
                  onClick={() => setSelectedProvider('other')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    selectedProvider === 'other'
                      ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30 text-violet-900 dark:text-violet-200 shadow-sm ring-1 ring-violet-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[11px]">
                      ✉
                    </span>
                    <span>Other</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedProvider === 'other' 
                      ? 'border-violet-600 bg-violet-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedProvider === 'other' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="mt-4 relative flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* ─── COLUMN 2: Building Progress ───────────────────────────────── */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Zap className="h-4 w-4 text-violet-600" />
              <span>Building Progress</span>
            </div>

            {/* Step Timeline List */}
            <div className="space-y-3 pt-1">
              
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
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
              <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
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

              {/* Step 3 (Active Step) */}
              <div className="flex items-start gap-3 p-3 rounded-xl border border-violet-200 dark:border-violet-800/60 bg-violet-50/40 dark:bg-violet-950/20 shadow-sm ring-1 ring-violet-500/10">
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-violet-900 dark:text-violet-200">
                      Asking missing questions
                    </h4>
                    <MoreHorizontal className="h-4 w-4 text-violet-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-violet-700/80 dark:text-violet-300/80 mt-0.5">
                    Getting important details
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 opacity-60">
                <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Designing your agent
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Creating capabilities & flow
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 opacity-60">
                <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  5
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Preparing for testing
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Configuring & validating
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Next Step Callout Box */}
          <div className="mt-4 p-3.5 rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50/80 to-indigo-50/50 dark:from-violet-950/40 dark:to-slate-900/60 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-violet-700 dark:text-violet-400">
              <span className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px]">+</span>
              <span>Next Step</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug font-medium">
              Answer one more question so we can complete your agent.
            </p>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20">
              <span>Answer Question</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ─── COLUMN 3: Your Agent (Live Preview) ───────────────────────── */}
        <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-slate-50/30 dark:bg-slate-900/30">
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

            {/* Agent Summary Card */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm space-y-4">
              
              {/* Agent Title & Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-md shadow-violet-500/20 shrink-0">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      Email Assistant
                    </h3>
                    <Pencil className="h-3 w-3 text-violet-500 cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    AI email summarizer and reporter
                  </p>
                </div>
              </div>

              {/* Purpose */}
              <div className="p-3 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <span className="font-bold text-violet-900 dark:text-violet-300 block mb-0.5">Purpose</span>
                Summarize important emails every morning and send a report to Slack.
              </div>

              {/* Specs Stack */}
              <div className="space-y-2.5 text-xs">
                
                {/* Capabilities */}
                <div className="flex items-start justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                    <span>Capabilities</span>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight pl-5">
                  Read emails, summarize, detect priority, send reports
                </p>

                {/* Integrations */}
                <div className="flex items-center justify-between pt-2 border-b border-slate-100 dark:border-slate-700/50 pb-2">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                    <Layers className="h-3.5 w-3.5 text-violet-500" />
                    <span>Integrations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[8px] font-bold ring-2 ring-white dark:ring-slate-800">M</span>
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
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                    Slack message, Email report
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
