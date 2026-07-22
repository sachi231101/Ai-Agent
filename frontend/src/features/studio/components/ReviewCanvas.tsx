import { 
  Zap, 
  HelpCircle, 
  Cloud, 
  Pencil, 
  Target, 
  Sparkles, 
  Check, 
  Clock, 
  Brain, 
  Layers, 
  Lock, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react';

interface ReviewCanvasProps {
  onBackToBuild: () => void;
  onNextToTest: () => void;
  agentName?: string;
}

export function ReviewCanvas({ onBackToBuild, onNextToTest, agentName = 'Email Summary Agent' }: ReviewCanvasProps) {
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
            onClick={onBackToBuild}
            className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Build</span>
          </button>

          <span className="w-8 h-0.5 bg-violet-500" />

          {/* Step 2: Review (Active) */}
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-extrabold">
            <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] shadow-sm ring-4 ring-violet-500/20">
              2
            </div>
            <span>Review</span>
          </div>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 3: Test */}
          <button
            onClick={onNextToTest}
            className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px]">
              3
            </div>
            <span>Test</span>
          </button>

          <span className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Step 4: Deploy */}
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
            onClick={() => alert('Opening studio documentation...')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>

          <button
            onClick={() => alert('Draft saved successfully!')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Cloud className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onNextToTest}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-1.5"
          >
            <span>Next: Test</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </header>

      {/* ─── MAIN CONTENT BODY ──────────────────────────────────────────────── */}
      <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
        
        {/* Page Section Title Header */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Review Your Agent
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review the details of your agent before testing and deploying.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ─── LEFT COLUMN (Lg: col-8) ─────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Card 1: Agent Overview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Agent Overview
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="/assets-icons/robot-purple.png" 
                    alt="Agent Avatar" 
                    className="w-16 h-16 rounded-2xl object-cover shadow-md shadow-violet-500/20 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {agentName}
                      </h3>
                      <Pencil className="h-3.5 w-3.5 text-violet-500 cursor-pointer hover:scale-110 transition-transform" />
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Draft
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      AI agent that summarizes emails every morning and sends a report to Slack.
                    </p>
                  </div>
                </div>

                {/* Right Metadata Info Box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-2 shrink-0 min-w-[200px]">
                  <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">👤 Created by</span>
                    <span className="font-bold text-slate-900 dark:text-white">Sachin A</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">📅 Created on</span>
                    <span className="font-bold text-slate-900 dark:text-white">May 21, 2025</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">⏰ Last updated</span>
                    <span className="font-bold text-slate-900 dark:text-white">Just now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Purpose & Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Purpose */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                  <Target className="h-4 w-4 text-violet-600" />
                  <span>Purpose</span>
                </div>
                <div className="p-4 rounded-2xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Summarize important emails every morning and send a concise report to Slack channel with key points and priority.
                </div>
              </div>

              {/* Capabilities */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <span>Capabilities</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[10px] font-bold">
                    4
                  </span>
                </div>
                <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span>Read emails from Gmail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span>Summarize key points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span>Detect priority and category</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span>Send report to Slack</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 3: How it Works (DAG Pipeline Flowchart) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                How it Works
              </h3>

              {/* DAG Pipeline Diagram Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                
                {/* Node 1: Trigger */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center relative group">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 mx-auto flex items-center justify-center">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Trigger</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      Runs every day at 9:00 AM
                    </p>
                  </div>
                </div>

                {/* Node 2: Fetch Emails */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center relative group">
                  <img src="/assets-icons/gmail.png" alt="Gmail" className="w-7 h-7 mx-auto object-contain" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fetch Emails</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      Fetch unread emails from Gmail
                    </p>
                  </div>
                </div>

                {/* Node 3: Summarize */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center relative group">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Summarize</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      AI summarizes key points and priority
                    </p>
                  </div>
                </div>

                {/* Node 4: Send Report */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center relative group">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center font-bold text-xs">
                    #
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Send Report</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      Sends summary to Slack channel
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Row 4: Knowledge Sources & Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Knowledge Sources */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Knowledge Sources
                  </h4>
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <img src="/assets-icons/gmail.png" alt="Gmail" className="w-5 h-5 object-contain" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Gmail (Emails)</h5>
                      <span className="text-[10px] text-slate-400">Connected account</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">N</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Company Policies (Notion)</h5>
                      <span className="text-[10px] text-slate-400">Employee guide and communication rules</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Outputs
                  </h4>
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">#</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Slack Message</h5>
                      <span className="text-[10px] text-slate-400">Summary posted to #daily-reports</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <FileText className="h-5 w-5 text-violet-500" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Email Report (PDF)</h5>
                      <span className="text-[10px] text-slate-400">Attached summary report (optional)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ─── RIGHT COLUMN: Agent Summary Sidebar (Lg: col-4) ─────────────── */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs space-y-6">
            
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Agent Summary
              </h3>

              <div className="space-y-4 text-xs">
                
                {/* Trigger */}
                <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Trigger</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6">
                    Every day at 9:00 AM
                  </p>
                </div>

                {/* Memory */}
                <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Brain className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Memory</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6">
                    Enabled (Short-term memory)
                  </p>
                </div>

                {/* Integrations */}
                <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Layers className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Integrations</span>
                  </div>
                  <div className="pl-6 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/assets-icons/gmail.png" alt="Gmail" className="w-4 h-4 object-contain" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Gmail</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                        Connected
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold">#</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Slack</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                {/* Data Access */}
                <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <Lock className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Data Access</span>
                  </div>
                  <div className="pl-6 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                    <p>Read Gmail emails</p>
                    <p>Post messages to Slack</p>
                  </div>
                </div>

                {/* Permissions */}
                <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <ShieldCheck className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Permissions</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 pl-6 leading-snug">
                    This agent will only access the data and apps listed above.
                  </p>
                </div>

                {/* Estimated Time Saved */}
                <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <TrendingUp className="h-4 w-4 text-violet-500" />
                    <span className="font-bold text-slate-900 dark:text-white">Estimated Time Saved</span>
                  </div>
                  <p className="text-xs font-bold text-violet-600 dark:text-violet-400 pl-6">
                    ~ 3 hours / week
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-slate-900 dark:text-white">Status</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                    Draft
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Callout Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50/70 dark:from-slate-800 dark:to-violet-950/30 border border-violet-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-violet-900 dark:text-violet-300">
                  Looks good?
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  Test your agent to see it in action before deploying.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ─── BOTTOM ACTION FOOTER BAR ───────────────────────────────────────── */}
      <footer className="h-16 px-6 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky bottom-0 z-30 shadow-lg">
        <button
          onClick={onBackToBuild}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Build</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToBuild}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit Agent</span>
          </button>

          <button
            onClick={onNextToTest}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Test Agent</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>

    </div>
  );
}
