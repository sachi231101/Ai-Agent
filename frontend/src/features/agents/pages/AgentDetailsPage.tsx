import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  Share2,
  Copy,
  Play,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { AgentWorkflowBuilder } from '../components/AgentWorkflowBuilder';

export default function AgentDetailsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRunAgent = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  const navTabs = ['Overview', 'Build', 'Knowledge', 'Integrations', 'Logs', 'Analytics', 'Settings'];

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Agent executed successfully! Report sent to #daily-reports on Slack.</span>
        </div>
      )}

      {/* ─── TOP BREADCRUMB & HEADER ACTION BAR ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <button onClick={() => navigate(ROUTES.AGENTS)} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            My Agents
          </button>
          <span>&gt;</span>
          <span className="text-slate-900 dark:text-white font-bold">Email Summary Agent</span>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => alert('Share link copied to clipboard!')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() => alert('Agent duplicated as "Email Summary Agent (Copy)"')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Duplicate</span>
          </button>

          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-700 transition-colors shadow-xs">
            <MoreHorizontal className="h-4 w-4" />
          </button>

          <button
            onClick={handleRunAgent}
            disabled={isExecuting}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] disabled:opacity-60 shrink-0"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isExecuting ? 'Running Agent...' : 'Run Agent'}</span>
          </button>
        </div>

      </div>

      {/* ─── MAIN AGENT DETAILS BANNER CARD ─────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-start sm:items-center gap-4">
          <img
            src="/assets-icons/robot-purple.png"
            alt="Agent Avatar"
            className="w-16 h-16 rounded-2xl object-cover shadow-md shadow-violet-500/20 shrink-0"
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Email Summary Agent
              </h1>
              <Pencil className="h-3.5 w-3.5 text-violet-500 cursor-pointer hover:scale-110 transition-transform" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Active
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Summarizes important emails every morning and sends a report to Slack.
            </p>

            {/* Category Labels */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                Productivity
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                Email
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                Reporting
              </span>
              <button className="px-3 py-1 rounded-full border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-[11px] font-medium hover:border-violet-500 transition-colors">
                + Add label
              </button>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 shrink-0 sm:text-right border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-6 w-full md:w-auto">
          <div>Last updated</div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">May 21, 2025 at 10:24 AM</div>
          <div className="pt-1">Created by</div>
          <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center sm:justify-end gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
              S
            </div>
            <span>Sachin A</span>
          </div>
        </div>

      </div>

      {/* ─── SUB-NAVIGATION TABS ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 overflow-x-auto">
        {navTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-violet-600 text-violet-600 dark:text-violet-400 font-extrabold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT WORKSPACE ─────────────────────────────────────────── */}
      {activeTab === 'Build' ? (
        <AgentWorkflowBuilder
          onBackToOverview={() => setActiveTab('Overview')}
          onTestWorkflow={handleRunAgent}
        />
      ) : (
        /* ─── 2-COLUMN MAIN WORKSPACE GRID ───────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN (Lg: col-8) ─────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Row 1: Description & 4 Stat Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Description Box (5 cols) */}
            <div className="md:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Description
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  This agent fetches unread emails from Gmail every morning, summarizes the key points and sends a report to Slack.
                </p>
              </div>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline text-left">
                Show more
              </button>
            </div>

            {/* 4 Stat Metric Cards (7 cols) */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Executions */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Executions
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                  2,341
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block">
                  This month <span className="ml-0.5">↑ 18.5%</span>
                </span>
              </div>

              {/* Success Rate */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Success Rate
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                  98.6%
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block">
                  This month <span className="ml-0.5">↑ 4.2%</span>
                </span>
              </div>

              {/* Avg. Time / Run */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Avg. Time / Run
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                  18.42s
                </span>
                <span className="text-[10px] text-rose-500 font-bold block">
                  This month <span className="ml-0.5">↓ 6.1%</span>
                </span>
              </div>

              {/* Time Saved */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Time Saved
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                  120h
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block">
                  This month <span className="ml-0.5">↑ 22.3%</span>
                </span>
              </div>

            </div>

          </div>

          {/* Card 2: Agent Flow (DAG Pipeline Diagram) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Agent Flow
              </h3>
              <button
                onClick={() => navigate(ROUTES.STUDIO)}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                View in Builder
              </button>
            </div>

            {/* 4-Step Flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              
              {/* Trigger */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center">
                <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 mx-auto flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Trigger</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Every day at 9:00 AM
                  </p>
                </div>
              </div>

              {/* Fetch Emails */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center">
                <img src="/assets-icons/gmail.png" alt="Gmail" className="w-7 h-7 mx-auto object-contain" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fetch Emails</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Get unread emails from Gmail
                  </p>
                </div>
              </div>

              {/* Summarize */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Summarize</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Summarize key points & priority
                  </p>
                </div>
              </div>

              {/* Send to Slack */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center font-bold text-xs">
                  #
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Send to Slack</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Send summary to #daily-reports
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Row 3: Recent Executions & Performance Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Box: Recent Executions */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Recent Executions
                </h3>
                <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                  View all
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { date: 'May 21, 2025  9:00 AM', status: 'Completed', latency: '18.42s' },
                  { date: 'May 20, 2025  9:00 AM', status: 'Completed', latency: '17.81s' },
                  { date: 'May 19, 2025  9:00 AM', status: 'Completed', latency: '18.09s' },
                  { date: 'May 18, 2025  9:00 AM', status: 'Completed', latency: '19.21s' },
                  { date: 'May 17, 2025  9:00 AM', status: 'Completed', latency: '17.64s' },
                ].map((exec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">{exec.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        {exec.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{exec.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Performance Line Chart */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Performance <span className="text-slate-400 font-normal">(This Month)</span>
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>This Month</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="pt-2 relative">
                
                {/* Tooltip Overlay Card */}
                <div className="absolute top-1 right-12 p-2 rounded-xl bg-slate-900 text-white text-[10px] shadow-lg border border-slate-800 font-mono z-10">
                  <div>May 21, 2025</div>
                  <div className="text-violet-400 font-bold">Executions: 2,341</div>
                </div>

                <svg className="w-full h-36 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="purpleChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,70 Q 30,85 60,60 T 120,40 T 180,20 T 240,55 T 300,50 L 300,100 L 0,100 Z"
                    fill="url(#purpleChartGrad)"
                  />
                  <path
                    d="M 0,70 Q 30,85 60,60 T 120,40 T 180,20 T 240,55 T 300,50"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="210" cy="22" r="4" fill="#7c3aed" className="animate-ping" />
                  <circle cx="210" cy="22" r="4" fill="#7c3aed" />
                </svg>

                {/* Date Labels */}
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>May 1</span>
                  <span>May 7</span>
                  <span>May 14</span>
                  <span>May 21</span>
                  <span>May 28</span>
                  <span>May 31</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ─── RIGHT COLUMN: Details & Specification Sidebar (Lg: col-4) ─────── */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-6 shadow-xs">
          
          {/* Details Specs Box */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Status</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Trigger</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Every day at 9:00 AM</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Memory</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Short-term memory</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Created</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">May 10, 2025</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Last updated</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">May 21, 2025</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">Owner</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                    S
                  </div>
                  Sachin A
                </span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                Capabilities
              </h4>
              <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[10px] font-bold">
                4
              </span>
            </div>

            <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-violet-600" />
                <span>Read emails from Gmail</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-violet-600" />
                <span>Summarize key points</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-violet-600" />
                <span>Detect priority and category</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-violet-600" />
                <span>Send report to Slack</span>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                Integrations
              </h4>
              <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[10px] font-bold">
                2
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <img src="/assets-icons/gmail.png" alt="Gmail" className="w-4 h-4 object-contain" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Gmail</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/30">
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

          {/* Outputs */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                Outputs
              </h4>
              <span className="w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center text-[10px] font-bold">
                2
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5">#</span>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Slack message</h5>
                  <p className="text-[10px] text-slate-400">Posted to #daily-reports</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Email report (PDF)</h5>
                  <p className="text-[10px] text-slate-400">Attached summary report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ─── BOTTOM ACTION FOOTER BAR ───────────────────────────────────────── */}
      <footer className="h-16 px-6 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky bottom-0 z-30 shadow-lg">
        <button
          onClick={() => navigate(ROUTES.AGENTS)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Agents</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(ROUTES.STUDIO)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
            <span>Edit Agent</span>
          </button>

          <button
            onClick={() => navigate(ROUTES.STUDIO)}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-2"
          >
            <span>View in Builder</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </footer>

    </div>
  );
}
