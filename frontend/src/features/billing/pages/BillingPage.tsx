import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown,
  Check,
  CreditCard,
  Plus,
  Download,
  HelpCircle,
  Bell,
  ChevronDown,
  Bot,
  Zap,
  Database,
  Code,
  FileText,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/lib/constants';

export default function BillingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const userName = user?.name || 'Sachin A';
  const userEmail = user?.email || 'sachin@gmail.com';

  // Sample data states
  const [invoices] = useState([
    { id: 'INV-2025-0056', date: '24 May 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2025-0045', date: '24 Apr 2025', amount: '$29.00', status: 'Paid' },
    { id: 'INV-2025-0034', date: '24 Mar 2025', amount: '$29.00', status: 'Paid' },
  ]);

  const [usageData] = useState({
    agents: { current: 32, max: 50, percent: 64 },
    tasks: { current: 6420, max: 10000, percent: 64 },
    storage: { current: 12.4, max: 25, unit: 'GB', percent: 50 },
    apiCalls: { current: 125000, max: 250000, percent: 50 },
  });

  const [billingHistory] = useState([
    {
      id: 'h1',
      title: 'Pro Plan Activated',
      desc: '$29.00 / month',
      date: '24 May 2025',
      time: '10:30 AM',
      icon: Crown,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300',
      active: true,
    },
    {
      id: 'h2',
      title: 'Payment Successful',
      desc: 'Visa •••• 4242',
      date: '24 May 2025',
      time: '10:30 AM',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300',
      active: true,
    },
    {
      id: 'h3',
      title: 'Invoice Generated',
      desc: 'INV-2025-0056',
      date: '24 May 2025',
      time: '10:30 AM',
      icon: FileText,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300',
      active: true,
    },
    {
      id: 'h4',
      title: 'Plan Upgraded',
      desc: 'Starter → Pro',
      date: '24 May 2025',
      time: '10:29 AM',
      icon: Zap,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300',
      active: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#fafafd] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* ─── TOP HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Billing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your subscription, payment methods and billing information.
          </p>
        </div>

        {/* Right Header User Controls */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {/* Pro Plan Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold shadow-xs">
            <Crown className="h-3.5 w-3.5 fill-current" />
            <span>Pro Plan</span>
          </div>

          {/* Help Circle Button */}
          <button
            onClick={() => navigate(ROUTES.DOCUMENTATION)}
            className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
            title="Help & Support"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200 dark:border-purple-800 bg-purple-100 shrink-0">
              <img
                src="/assets-icons/robot-avatar-head.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets-icons/robot-purple.png';
                }}
              />
            </div>
            <div className="hidden md:block text-left text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white block leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                {userEmail}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT GRID (12 Columns) ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ─── LEFT COLUMN (col-7) ─────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CARD 1: CURRENT PLAN */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mb-5">
              Current Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Details */}
              <div className="md:col-span-7 space-y-5">
                <div className="flex items-start gap-4">
                  {/* Glassmorphic Crown Box */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-200 dark:from-purple-950 dark:to-slate-900 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-md shadow-purple-500/10 shrink-0">
                    <Crown className="h-7 w-7 fill-purple-600 dark:fill-purple-300" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        Pro Plan
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                        Active
                      </span>
                    </div>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">
                        $29
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        / month
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Billed monthly • Next billing on 24 Jun 2025
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Everything in Starter, plus more agents, premium integrations, advanced features and priority support.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all active:scale-[0.99]">
                    Upgrade Plan
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-bold text-xs transition-colors">
                    Manage Plan
                  </button>
                </div>
              </div>

              {/* Right Features Checklist */}
              <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 space-y-2.5">
                {[
                  'Up to 50 Agents',
                  '10,000 Tasks / month',
                  'Premium Integrations',
                  'Advanced Analytics',
                  'Team Collaboration',
                  'Priority Support',
                  'Custom Workflows',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* CARD 2: PAYMENT METHOD */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Payment Method
              </h2>
              <button className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                Update
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Default Card */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black tracking-wider text-blue-600 dark:text-blue-400 italic">
                    VISA
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                    Default
                  </span>
                </div>

                <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 tracking-widest">
                  •••• •••• •••• 4242
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Expires 04/27</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{userName}</span>
                </div>
              </div>

              {/* Add Payment Method Box */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors min-h-[110px] group">
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  Add Payment Method
                </span>
              </div>

            </div>
          </div>

          {/* CARD 3: INVOICES TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Invoices
              </h2>
              <button className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                View All Invoices
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                    <th className="pb-3 font-semibold">Invoice</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        {inv.id}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-400">
                        {inv.date}
                      </td>
                      <td className="py-3.5 font-extrabold text-slate-900 dark:text-white">
                        {inv.amount}
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          className="p-1.5 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN (col-5) ────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CARD 1: USAGE OVERVIEW */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Usage Overview
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">
                Resets on 24 Jun 2025
              </span>
            </div>

            {/* Usage Progress Meters */}
            <div className="space-y-4">
              
              {/* Meter 1: Agents */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <span>Agents</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {usageData.agents.current} / {usageData.agents.max}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {usageData.agents.percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                    style={{ width: `${usageData.agents.percent}%` }}
                  />
                </div>
              </div>

              {/* Meter 2: Tasks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span>Tasks</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {usageData.tasks.current.toLocaleString()} / {usageData.tasks.max.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {usageData.tasks.percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                    style={{ width: `${usageData.tasks.percent}%` }}
                  />
                </div>
              </div>

              {/* Meter 3: Knowledge Storage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center">
                      <Database className="h-4 w-4" />
                    </div>
                    <span>Knowledge Storage</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {usageData.storage.current} GB / {usageData.storage.max} GB
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {usageData.storage.percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                    style={{ width: `${usageData.storage.percent}%` }}
                  />
                </div>
              </div>

              {/* Meter 4: API Calls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
                      <Code className="h-4 w-4" />
                    </div>
                    <span>API Calls</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {usageData.apiCalls.current.toLocaleString()} / {usageData.apiCalls.max.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {usageData.apiCalls.percent}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                    style={{ width: `${usageData.apiCalls.percent}%` }}
                  />
                </div>
              </div>

            </div>

            <button
              onClick={() => navigate(ROUTES.ANALYTICS)}
              className="w-full pt-2 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline group"
            >
              <span>View Usage Analytics</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* CARD 2: BILLING HISTORY */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Billing History
              </h2>
              <button className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                View All
              </button>
            </div>

            {/* Vertical Timeline List */}
            <div className="relative space-y-4">
              {billingHistory.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === billingHistory.length - 1;

                return (
                  <div key={item.id} className="relative flex items-start gap-3">
                    {/* Timeline Line Connector */}
                    {!isLast && (
                      <span className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 -mb-4" />
                    )}

                    {/* Timeline Icon Badge */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {item.active && (
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center">
                          <Check className="h-1.5 w-1.5 text-white stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                          {item.desc}
                        </p>
                      </div>

                      <div className="text-right text-[10px] text-slate-400 shrink-0 font-medium">
                        <span className="block">{item.date}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full pt-2 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline group">
              <span>View Full History</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* ─── BOTTOM HELP BANNER ─────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-purple-100 dark:border-slate-800 bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-purple-50/70 dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 overflow-hidden shrink-0 shadow-sm mx-auto sm:mx-0">
            <img
              src="/assets-icons/robot-avatar-head.png"
              alt="Support Robot"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/assets-icons/robot-purple.png';
              }}
            />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Need help with billing?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              If you have any questions or need assistance, our support team is here to help.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => window.open('mailto:support@vibeagents.ai', '_blank')}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={() => navigate(ROUTES.DOCUMENTATION)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all active:scale-[0.99] flex items-center gap-2"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Visit Help Center</span>
          </button>
        </div>

      </div>

    </div>
  );
}
