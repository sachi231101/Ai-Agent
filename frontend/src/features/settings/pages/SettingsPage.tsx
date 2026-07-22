import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  Building2,
  Users,
  CreditCard,
  Gauge,
  Sparkles,
  BookOpen,
  Layers,
  Key,
  Shield,
  Palette,
  Code2,
  Copy,
  Check,
  Upload,
  Trash2,
  Globe,
  Clock,
  Save,
  Crown,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Headphones,
  FileText
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Form State
  const [workspaceName, setWorkspaceName] = useState('Vibe Workspace');
  const [workspaceUrl, setWorkspaceUrl] = useState('workspace');
  const [workspaceDesc, setWorkspaceDesc] = useState('AI agents platform to build, deploy and scale intelligent agents.');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [language, setLanguage] = useState('English (US)');
  const [timezone, setTimezone] = useState('(GMT+05:30) Asia/Kolkata');

  // Preferences Toggles
  const [autoSave, setAutoSave] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const [anonymousData, setAnonymousData] = useState(false);

  const handleCopyUrl = () => {
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'workspace', label: 'Workspace', icon: Building2 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'usage', label: 'Usage & Limits', icon: Gauge },
    { id: 'ai-models', label: 'AI Model Settings', icon: Sparkles },
    { id: 'knowledge', label: 'Knowledge Sources', icon: BookOpen },
    { id: 'integrations', label: 'Integrations', icon: Layers },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'advanced', label: 'Advanced', icon: Code2 },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your workspace, preferences and account settings.
          </p>
        </div>

        {/* Search & Header Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none shadow-xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
              ⌘ K
            </span>
          </div>

          <button
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-xs relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs">
              S
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sachin A</span>
              <span className="text-[10px] text-slate-400 font-medium">Founder</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* ─── 3-COLUMN MAIN WORKSPACE GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── COLUMN 1: LEFT VERTICAL SETTINGS TABS (Lg: col-3) ─────────────── */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3 shadow-xs space-y-1">
          {settingsTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-extrabold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── COLUMN 2: CENTER SETTINGS FORM (Lg: col-6) ────────────────────── */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* Form Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white capitalize">
                {activeTab} Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Update your workspace and general preferences.
              </p>
            </div>

            <button
              onClick={() => alert('Settings changes saved successfully!')}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md shadow-violet-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6 text-xs">
            
            {/* Workspace Information Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Workspace Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                
                {/* Left Inputs (7 cols) */}
                <div className="sm:col-span-7 space-y-4">
                  {/* Workspace Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Workspace URL */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block">
                      Workspace URL
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <span className="px-3 py-2.5 text-slate-400 text-xs font-mono border-r border-slate-200 dark:border-slate-700 shrink-0">
                        vibe-agents.com/
                      </span>
                      <input
                        type="text"
                        value={workspaceUrl}
                        onChange={(e) => setWorkspaceUrl(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyUrl}
                        className="px-3 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        title="Copy URL"
                      >
                        {copiedUrl ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium pt-0.5">
                      This is your unique workspace URL.
                    </p>
                  </div>
                </div>

                {/* Right Workspace Logo Upload Box (5 cols) */}
                <div className="sm:col-span-5 space-y-2 text-center sm:text-left">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    Workspace Logo
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 shadow-xs flex items-center justify-center shrink-0">
                      <img src="/assets-icons/robot-purple.png" alt="Workspace Logo" className="w-full h-full object-contain" />
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => alert('Select logo file to upload')}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Change</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert('Logo removed')}
                        className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight pt-1">
                    JPG, PNG or SVG. Max size 2MB.
                  </p>
                </div>

              </div>
            </div>

            {/* Workspace Description */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Workspace Description
              </label>
              <textarea
                rows={3}
                value={workspaceDesc}
                onChange={(e) => setWorkspaceDesc(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none resize-none leading-relaxed"
              />
              <div className="flex justify-end text-[10px] text-slate-400 font-mono">
                {workspaceDesc.length}/200
              </div>
            </div>

            {/* Default Language & Timezone */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Default Language & Timezone
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Language Dropdown */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8"
                    >
                      <option value="English (US)">🌐 English (US)</option>
                      <option value="English (UK)">🌐 English (UK)</option>
                      <option value="Spanish">🌐 Spanish</option>
                      <option value="German">🌐 German</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Timezone Dropdown */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    Timezone
                  </label>
                  <div className="relative">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8 truncate"
                    >
                      <option value="(GMT+05:30) Asia/Kolkata">⏰ (GMT+05:30) Asia/Kolkata</option>
                      <option value="(GMT+00:00) UTC">⏰ (GMT+00:00) UTC</option>
                      <option value="(GMT-05:00) Eastern Time">⏰ (GMT-05:00) Eastern Time</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Preferences
              </h3>

              <div className="space-y-3">
                
                {/* Preference 1: Auto-save */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                      💾
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Auto-save</h4>
                      <p className="text-[10px] text-slate-400">Automatically save your work in real-time.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoSave(!autoSave)}
                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      autoSave ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoSave ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Preference 2: Show tips */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      💡
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Show tips and suggestions</h4>
                      <p className="text-[10px] text-slate-400">Get helpful tips while building your agents.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTips(!showTips)}
                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      showTips ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${showTips ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Preference 3: Anonymous usage data */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
                      📊
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">Anonymous usage data</h4>
                      <p className="text-[10px] text-slate-400">Help us improve by sharing anonymous usage data.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAnonymousData(!anonymousData)}
                    className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      anonymousData ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${anonymousData ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>
            </div>

          </form>

        </div>

        {/* ─── COLUMN 3: RIGHT SIDEBAR CARDS (Lg: col-3) ──────────────────────── */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Card 1: Workspace Plan */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 flex items-center justify-center font-bold">
                  <Crown className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Team Plan
                </h3>
              </div>

              <button
                onClick={() => navigate(ROUTES.BILLING)}
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-0.5"
              >
                <span>Manage Plan</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-semibold pt-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Up to 25 Active Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>50GB Knowledge Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>10,000 Messages / Month</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Advanced AI Models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Priority Support</span>
              </div>
            </div>
          </div>

          {/* Card 2: Danger Zone */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950/80 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-rose-600 uppercase tracking-wider">
              Danger Zone
            </h3>

            {/* Action 1: Reset */}
            <div className="space-y-2">
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5 text-rose-500" />
                  <span>Reset workspace</span>
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  This will reset all settings to default. This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Are you sure you want to reset workspace settings?')}
                className="w-full py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold transition-colors"
              >
                Reset Workspace
              </button>
            </div>

            {/* Action 2: Delete */}
            <div className="space-y-2 pt-2 border-t border-rose-100 dark:border-rose-950">
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                  <span>Delete workspace</span>
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Permanently delete your workspace and all of its data. This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Warning: Workspace deletion requires owner confirmation.')}
                className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Delete Workspace
              </button>
            </div>
          </div>

          {/* Card 3: Need Help? */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                Need Help?
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Visit our documentation or contact support for assistance.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => navigate(ROUTES.DOCUMENTATION)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>View Docs</span>
                <FileText className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => alert('Opening Support Ticket Modal...')}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 transition-colors"
              >
                <span>Contact Support</span>
                <Headphones className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
