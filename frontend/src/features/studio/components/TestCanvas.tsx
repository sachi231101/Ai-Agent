import { useState } from 'react';
import { 
  Zap, 
  HelpCircle, 
  Share2, 
  Check, 
  Send, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  Settings, 
  Play, 
  Sparkles, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Rocket, 
  DollarSign, 
  Cpu
} from 'lucide-react';

interface TestCanvasProps {
  onBackToReview: () => void;
  onNextToDeploy: () => void;
  agentName?: string;
}

export function TestCanvas({ onBackToReview, onNextToDeploy, agentName = 'Email Summary Agent' }: TestCanvasProps) {
  const [activeTab, setActiveTab] = useState<'execution' | 'logs'>('execution');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testInput, setTestInput] = useState('');
  
  const [testMessages, setTestMessages] = useState([
    {
      id: 1,
      role: 'user',
      text: 'What are the unread emails in my Gmail today and summarize them?',
      time: '10:30 AM',
    },
  ]);

  const handleRunTest = (customText?: string) => {
    const prompt = (customText || testInput).trim() || 'What are the unread emails in my Gmail today and summarize them?';
    setIsRunningTest(true);

    setTestMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: prompt, time: '10:30 AM' },
    ]);
    if (!customText) setTestInput('');

    setTimeout(() => {
      setIsRunningTest(false);
    }, 1500);
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
          
          {/* Step 1: Build (Completed check) */}
          <button
            onClick={onBackToReview}
            className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Build</span>
          </button>

          <span className="w-8 h-0.5 bg-violet-500" />

          {/* Step 2: Review (Completed check) */}
          <button
            onClick={onBackToReview}
            className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Review</span>
          </button>

          <span className="w-8 h-0.5 bg-violet-500" />

          {/* Step 3: Test (Active) */}
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-extrabold">
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm ring-4 ring-violet-500/20">
              3
            </div>
            <span>Test</span>
          </div>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 4: Deploy */}
          <button
            onClick={onNextToDeploy}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              4
            </div>
            <span>Deploy</span>
          </button>

        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Opening test documentation...')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>

          <button
            onClick={() => alert('Shareable test environment link copied!')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={onNextToDeploy}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-1.5"
          >
            <span>Next: Deploy</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </header>

      {/* ─── MAIN CONTENT BODY ──────────────────────────────────────────────── */}
      <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        
        {/* Page Section Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Test Your Agent
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Test your agent in real-time and see how it performs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Test settings: Sandbox mode ENABLED')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Test settings</span>
            </button>

            <button
              onClick={() => handleRunTest()}
              disabled={isRunningTest}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] disabled:opacity-60"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isRunningTest ? 'Running test...' : 'Run test'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ─── LEFT COLUMN: Real-Time Execution Playground (Lg: col-8) ───── */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs min-h-[640px]">
            
            <div className="space-y-6 overflow-y-auto pr-1">
              
              {/* User Test Prompt */}
              {testMessages.map((msg) => (
                <div key={msg.id} className="flex flex-col items-end space-y-1">
                  <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mr-1">
                    You
                  </span>
                  <div className="max-w-[85%] p-4 rounded-2xl rounded-tr-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-medium leading-relaxed shadow-xs">
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mr-1 flex items-center gap-1 font-mono">
                    {msg.time} <span className="text-violet-500 font-bold">✓✓</span>
                  </span>
                </div>
              ))}

              {/* Agent Progress Box 1 */}
              <div className="flex gap-3 items-start">
                <img 
                  src="/assets-icons/robot-purple.png" 
                  alt="Agent" 
                  className="w-8 h-8 rounded-xl object-cover shadow-md shrink-0 mt-1"
                />
                <div className="flex-1 space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {agentName}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    Sure! Let me fetch your unread emails and summarize them for you.
                  </p>

                  {/* Execution Steps Card */}
                  <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Working on your request...
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium">
                          <img src="/assets-icons/gmail.png" alt="Gmail" className="w-4 h-4 object-contain" />
                          <span>Connecting to Gmail</span>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                          <span>Fetching unread emails</span>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                          <div className="w-4 h-4 rounded-full border-2 border-violet-500 animate-spin border-t-transparent" />
                          <span>Summarizing emails</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                          In progress
                        </span>
                      </div>

                      <div className="flex items-center justify-between opacity-60">
                        <div className="flex items-center gap-2 font-medium text-slate-500">
                          <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">#</span>
                          <span>Sending summary to Slack</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Agent Final Output Summary Box 2 */}
              <div className="flex gap-3 items-start pt-2">
                <img 
                  src="/assets-icons/robot-purple.png" 
                  alt="Agent" 
                  className="w-8 h-8 rounded-xl object-cover shadow-md shrink-0 mt-1"
                />
                <div className="flex-1 space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {agentName}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    Here is your email summary for today:
                  </p>

                  {/* Structured Emails Summary Container Card */}
                  <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-violet-900 dark:text-violet-300">
                      <Mail className="h-4 w-4 text-violet-600" />
                      <span>Unread Emails Summary (5)</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-5">
                      <li>
                        <strong className="text-slate-900 dark:text-white">Project Update – John Doe</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Discussion about the new project timeline and milestones.</p>
                      </li>
                      <li>
                        <strong className="text-slate-900 dark:text-white">Marketing Report – Sarah Smith</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Monthly marketing report and performance insights.</p>
                      </li>
                      <li>
                        <strong className="text-slate-900 dark:text-white">Client Meeting – TechCorp</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Invitation for meeting tomorrow at 11:00 AM.</p>
                      </li>
                      <li>
                        <strong className="text-slate-900 dark:text-white">Newsletter – Product Hunt</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Top products and updates from this week.</p>
                      </li>
                      <li>
                        <strong className="text-slate-900 dark:text-white">Invoice #INV-1087 – Acme Inc.</strong>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Payment request for the recent services.</p>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Test Prompt Form & Action Pills */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={(e) => { e.preventDefault(); handleRunTest(); }} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask anything to test your agent..."
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-4 pr-11 py-3 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-all shadow-xs"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Action Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => handleRunTest('Show unread emails')}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
                >
                  ✉ Show unread emails
                </button>
                <button
                  onClick={() => handleRunTest('Summarize Slack messages')}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
                >
                  ⚡ Summarize Slack messages
                </button>
                <button
                  onClick={() => handleRunTest("What's on my calendar today?")}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
                >
                  📅 What's on my calendar today?
                </button>
                <button
                  onClick={() => handleRunTest('Test with different data')}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold hover:bg-slate-200 transition-colors"
                >
                  🔀 Test with different data
                </button>
                <button
                  onClick={() => setTestMessages([testMessages[0]])}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors ml-auto"
                  title="Reset test session"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Execution Metrics & System Flow (Lg: col-4) ───── */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs space-y-6">
            
            <div className="space-y-5">
              
              {/* Execution / Logs Sub-tabs */}
              <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('execution')}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === 'execution'
                      ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Execution
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === 'logs'
                      ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Logs
                </button>
              </div>

              {/* Card 1: Test Result Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Test Result
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    Success
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-900 dark:text-white">
                      All steps completed successfully!
                    </h5>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Completed in 18.42s
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Metrics Grid (4 Stat Cards) */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Stat 1: Steps */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Steps
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                    4 / 4
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">Completed</span>
                </div>

                {/* Stat 2: Time Taken */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Time Taken
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                    18.42s
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">Total time</span>
                </div>

                {/* Stat 3: Tokens Used */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Tokens Used
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                    2,341
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">Total tokens</span>
                </div>

                {/* Stat 4: Cost */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Cost
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                    $0.0023
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">Estimated cost</span>
                </div>

              </div>

              {/* Card 3: Execution Flow Timeline */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Execution Flow
                </h4>

                <div className="space-y-2 text-xs">
                  
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 dark:text-white truncate">Trigger</h5>
                        <p className="text-[10px] text-slate-400 truncate">Every day at 9:00 AM</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">0.12s</span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 dark:text-white truncate">Connect Gmail</h5>
                        <p className="text-[10px] text-slate-400 truncate">Successfully connected</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">1.23s</span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 dark:text-white truncate">Fetch Unread Emails</h5>
                        <p className="text-[10px] text-slate-400 truncate">Found 5 unread emails</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">3.45s</span>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 dark:text-white truncate">Summarize Emails</h5>
                        <p className="text-[10px] text-slate-400 truncate">Generated summary for 5 emails</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">12.10s</span>
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 dark:text-white truncate">Send to Slack</h5>
                        <p className="text-[10px] text-slate-400 truncate">Message sent to #daily-reports</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">1.52s</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom "Ready to deploy?" Callout Box with Rocket */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:via-violet-950/40 dark:to-slate-900 border border-violet-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-300">
                  Ready to deploy?
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Your agent passed the test. Deploy it to start automating your tasks.
                </p>
                <button
                  onClick={onNextToDeploy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02]"
                >
                  <span>Deploy Agent</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Rocket className="h-8 w-8" />
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
