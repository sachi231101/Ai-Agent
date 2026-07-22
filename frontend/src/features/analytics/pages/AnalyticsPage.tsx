import { useState } from 'react';
import {
  Calendar,
  Filter,
  Download,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  Info,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Sparkles,
  Bot
} from 'lucide-react';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('May 15 - May 21, 2025');
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');

  const subTabs = ['Overview', 'Agents', 'Usage', 'Users', 'Conversations', 'Custom Reports'];

  const topAgentsList = [
    { rank: 1, name: 'Email Summary Agent', executions: '2,341', avatarImg: '/assets-icons/robot-purple.png' },
    { rank: 2, name: 'Daily Standup Bot', executions: '1,842', avatarImg: '/assets-icons/slack.png' },
    { rank: 3, name: 'Notion Sync Agent', executions: '1,256', avatarImg: '/assets-icons/Notion.png' },
    { rank: 4, name: 'WhatsApp Responder', executions: '1,024', avatarImg: '/assets-icons/whatsapp.png' },
    { rank: 5, name: 'Support Ticket Resolver', executions: '876', avatarImg: '/assets-icons/bot4.png' },
  ];

  const recentActivityList = [
    { type: 'success', text: 'Email Summary Agent executed successfully', time: '2m ago' },
    { type: 'failed', text: 'Daily Standup Bot failed', time: '8m ago' },
    { type: 'success', text: 'Notion Sync Agent executed successfully', time: '15m ago' },
    { type: 'created', text: 'New agent "HR Onboarding Agent" created', time: '32m ago' },
    { type: 'success', text: 'WhatsApp Responder executed successfully', time: '45m ago' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track performance, usage and impact of your agents.
          </p>
        </div>

        {/* Right Header Toolbar Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Date Picker Button */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs cursor-pointer">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Filters Button */}
          <button
            onClick={() => alert('Filter options opened')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </button>

          {/* Export Report Button */}
          <button
            onClick={() => alert('Exporting analytics report as CSV/PDF...')}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Report</span>
            <ChevronDown className="h-3 w-3 opacity-80" />
          </button>

        </div>
      </div>

      {/* ─── SUB-NAVIGATION TABS ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 overflow-x-auto">
        {subTabs.map((tab) => (
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

      {/* ─── TOP 4 STAT METRIC CARDS (ROW 1) ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Executions */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Total Executions
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              12,842
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 pt-0.5">
              <span>↑ 18.6%</span>
              <span className="text-slate-400 font-normal">vs May 8 - May 14</span>
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2: Active Agents */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Active Agents
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              24
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 pt-0.5">
              <span>↑ 9.1%</span>
              <span className="text-slate-400 font-normal">vs May 8 - May 14</span>
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Total Conversations */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Total Conversations
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              8,756
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 pt-0.5">
              <span>↑ 16.3%</span>
              <span className="text-slate-400 font-normal">vs May 8 - May 14</span>
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4: Avg. Response Time */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Avg. Response Time
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              2.34s
            </h3>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 pt-0.5">
              <span>↓ 12.4%</span>
              <span className="text-slate-400 font-normal">vs May 8 - May 14</span>
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Clock className="h-5 w-5" />
          </div>
        </div>

      </div>

      {/* ─── 2-COLUMN MAIN WORKSPACE GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN: Charts & Breakdowns (Lg: col-8) ────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Row 2: Executions Over Time & Executions by Status */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Executions Over Time Line Chart (7 cols) */}
            <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Executions Over Time
                  </h3>
                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
                </div>

                <div className="relative">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none appearance-none pr-7"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Smooth Wave SVG Chart with Hover Tooltip on May 19 */}
              <div className="w-full h-52 relative flex items-end pt-6">
                
                {/* SVG Curve Line */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 0,110 Q 50,80 100,95 T 200,60 T 300,75 T 400,45 T 500,80 L 500,150 L 0,150 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M 0,110 Q 50,80 100,95 T 200,60 T 300,75 T 400,45 T 500,80"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Active Tooltip Point on May 19 (x=300, y=75) */}
                  <circle cx="300" cy="75" r="6" fill="#7c3aed" stroke="#ffffff" strokeWidth="3" />
                </svg>

                {/* Floating Tooltip Box */}
                <div className="absolute top-[35px] left-[55%] -translate-x-1/2 bg-slate-900 text-white text-[10px] p-2 rounded-xl shadow-xl z-20 space-y-0.5 border border-slate-700 pointer-events-none">
                  <div className="font-bold text-slate-300">May 19, 2025</div>
                  <div className="flex items-center gap-1.5 font-extrabold text-violet-400">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span>Executions: 2,560</span>
                  </div>
                </div>

              </div>

              {/* X-Axis Dates */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-2">
                <span>May 15</span>
                <span>May 16</span>
                <span>May 17</span>
                <span>May 18</span>
                <span>May 19</span>
                <span>May 20</span>
                <span>May 21</span>
              </div>
            </div>

            {/* Executions by Status Donut Chart (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Executions by Status
              </h3>

              <div className="flex items-center justify-around py-2">
                
                {/* SVG Donut Chart */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Success Green (79.8%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="70 30" />
                    {/* Failed Red (9.8%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="9 91" strokeDashoffset="-70" />
                    {/* Partial Yellow (6.6%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="6 94" strokeDashoffset="-79" />
                    {/* Cancelled Gray (3.8%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="4.5" strokeDasharray="4 96" strokeDashoffset="-85" />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">
                      12,842
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium mt-0.5">Total</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Success
                    </span>
                    <span className="text-slate-400">10,256 (79.8%)</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Failed
                    </span>
                    <span className="text-slate-400">1,256 (9.8%)</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Partial
                    </span>
                    <span className="text-slate-400">842 (6.6%)</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Cancelled
                    </span>
                    <span className="text-slate-400">488 (3.8%)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Row 3: 3 Breakdown Cards Grid (Top Use Cases, Source, User Engagement) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Top Use Cases (4 cols) */}
            <div className="md:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Top Use Cases
                  </h3>
                  <Info className="h-3 w-3 text-slate-400" />
                </div>
                <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                  View all
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: 'Email Summarization', val: '3,256 (25.4%)', width: '80%' },
                  { name: 'Internal Q&A', val: '2,842 (22.1%)', width: '70%' },
                  { name: 'Data Lookup', val: '2,215 (17.2%)', width: '55%' },
                  { name: 'Task Automation', val: '1,842 (14.3%)', width: '45%' },
                  { name: 'Report Generation', val: '687 (5.3%)', width: '20%' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                      <span>{item.name}</span>
                      <span className="text-slate-400 font-normal">{item.val}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-600 rounded-full" style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executions by Source Donut (4 cols) */}
            <div className="md:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Executions by Source
              </h3>

              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Web App Purple (56.5%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeDasharray="50 50" />
                    {/* API Blue (29.9%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="26 74" strokeDashoffset="-50" />
                    {/* Slack Green (8.0%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="7 93" strokeDashoffset="-76" />
                    {/* Other Gray (5.6%) */}
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="4.5" strokeDasharray="5 95" strokeDashoffset="-83" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">
                      12,842
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">Total</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-600" />
                    <span className="text-slate-700 dark:text-slate-300">Web App</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block pl-3">7,256 (56.5%)</span>

                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-700 dark:text-slate-300">API</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block pl-3">3,842 (29.9%)</span>
                </div>
              </div>
            </div>

            {/* User Engagement Bar Chart (4 cols) */}
            <div className="md:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  User Engagement
                </h3>
                <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                  View all
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 block">Active Users</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">156</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">↑ 14.3%</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 block">New Users</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">28</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">↑ 8.2%</span>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="h-24 pt-2 flex items-end justify-between gap-1.5">
                {[55, 75, 60, 90, 45, 65, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-violet-500 rounded-t-md hover:bg-violet-600 transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

          </div>

          {/* Row 4: Agent Performance Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Agent Performance
                </h3>
                <Info className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View all
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Agent Name</th>
                    <th className="pb-3">Executions</th>
                    <th className="pb-3">Success Rate</th>
                    <th className="pb-3">Avg. Response Time</th>
                    <th className="pb-3">Conversations</th>
                    <th className="pb-3">Trend (7D)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 flex items-center gap-2.5">
                      <img src="/assets-icons/robot-purple.png" alt="Email Agent" className="w-7 h-7 rounded-lg object-cover" />
                      <span className="font-extrabold text-slate-900 dark:text-white">Email Summary Agent</span>
                    </td>
                    <td>2,341</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>98.6%</span>
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span>2.34s</span>
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[70%]" />
                        </div>
                      </div>
                    </td>
                    <td>1,982</td>
                    <td>
                      <svg className="w-16 h-5" viewBox="0 0 60 20">
                        <path d="M0,15 Q15,5 30,12 T60,5" fill="none" stroke="#7c3aed" strokeWidth="2" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: Sidebar (Lg: col-4) ────────────────────────────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Top Agents Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Top Agents
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              {topAgentsList.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-3 text-center">
                      {item.rank}
                    </span>
                    <img src={item.avatarImg} alt={item.name} className="w-7 h-7 rounded-lg object-contain p-0.5 bg-slate-50 border shrink-0" />
                    <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-[140px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-slate-900 dark:text-white font-extrabold">
                    {item.executions}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Recent Activity
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {recentActivityList.map((act, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {act.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />}
                    {act.type === 'failed' && <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}
                    {act.type === 'created' && <PlusCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />}
                    <span className="font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                      {act.text}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Insights
              </h3>
              <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">
                See all
              </button>
            </div>

            <div className="space-y-3">
              {/* Insight 1 */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                    ↗
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Executions are up 18.6%
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-8 leading-relaxed font-normal">
                  You had 18.6% more executions compared to May 8 - May 14.
                </p>
              </div>

              {/* Insight 2 */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                    ⏱
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Response time improved
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-8 leading-relaxed font-normal">
                  Average response time decreased by 12.4% compared to the previous 7 days.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
