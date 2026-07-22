import { useState } from 'react';
import {
  Clock,
  User,
  Sparkles,
  GitBranch,
  Layers,
  Code2,
  OctagonAlert,
  Plus,
  Minus,
  Maximize2,
  Check,
  Trash2,
  ChevronDown,
  ArrowLeft,
  Play,
  Save,
  Pencil
} from 'lucide-react';

interface AgentWorkflowBuilderProps {
  onBackToOverview: () => void;
  onTestWorkflow: () => void;
}

export function AgentWorkflowBuilder({ onBackToOverview, onTestWorkflow }: AgentWorkflowBuilderProps) {
  const [autoLayout, setAutoLayout] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedStep, setSelectedStep] = useState<string>('trigger');

  // Step Inspector State
  const [stepName, setStepName] = useState('Daily Schedule');
  const [triggerType, setTriggerType] = useState('Schedule');
  const [scheduleFreq, setScheduleFreq] = useState('Every day');
  const [scheduleTime, setScheduleTime] = useState('09:00 AM');
  const [description, setDescription] = useState('Runs the workflow every day at 9:00 AM to summarize emails.');
  const [nextStep, setNextStep] = useState('Fetch unread emails from Gmail');

  return (
    <div className="space-y-6">
      
      {/* ─── TITLE & CANVAS CONTROLS BAR ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Agent Workflow
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Design the steps your agent will follow from start to finish.
          </p>
        </div>

        {/* Right Canvas Toolbar Controls */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          
          {/* Auto Layout Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Auto layout</span>
            <button
              onClick={() => setAutoLayout(!autoLayout)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                autoLayout ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  autoLayout ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <span className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(50, prev - 10))}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-[11px] font-bold text-slate-700 dark:text-slate-300 w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 ml-1"
              title="Reset Zoom / Fullscreen"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ─── 3-COLUMN WORKFLOW BUILDER GRID ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── COLUMN 1: Add Step Palette & Minimap (Lg: col-3) ─────────────── */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Add Step Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Add Step
            </h3>

            <div className="space-y-1.5 text-xs">
              {[
                { id: 'trigger', label: 'Trigger', desc: 'Starts the workflow', icon: Clock, iconColor: 'text-violet-600 bg-violet-100 dark:bg-violet-950/60' },
                { id: 'action', label: 'Action', desc: 'Perform an action', icon: User, iconColor: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60' },
                { id: 'llm', label: 'LLM', desc: 'Ask AI to process', icon: Sparkles, iconColor: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-950/60' },
                { id: 'condition', label: 'Condition', desc: 'Branch logic', icon: GitBranch, iconColor: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60' },
                { id: 'integration', label: 'Integration', desc: 'Connect an app', icon: Layers, iconColor: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60' },
                { id: 'delay', label: 'Delay', desc: 'Wait for a time', icon: Clock, iconColor: 'text-blue-600 bg-blue-100 dark:bg-blue-950/60' },
                { id: 'code', label: 'Code', desc: 'Run custom code', icon: Code2, iconColor: 'text-sky-600 bg-sky-100 dark:bg-sky-950/60' },
                { id: 'end', label: 'End', desc: 'Finish the workflow', icon: OctagonAlert, iconColor: 'text-rose-600 bg-rose-100 dark:bg-rose-950/60' },
              ].map((step) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    onClick={() => setSelectedStep(step.id)}
                    className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/80 dark:hover:bg-slate-800 cursor-pointer transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-xl ${step.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{step.label}</h4>
                      <p className="text-[10px] text-slate-400 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimap Visual Canvas Box */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center relative overflow-hidden">
              {/* Thumbnail Flow Lines */}
              <div className="w-16 h-24 border border-violet-300 dark:border-violet-700 rounded-lg flex flex-col items-center justify-around p-1">
                <div className="w-8 h-3 rounded bg-violet-500/20 border border-violet-500" />
                <div className="w-0.5 h-3 bg-violet-400" />
                <div className="w-8 h-3 rounded bg-emerald-500/20 border border-emerald-500" />
                <div className="w-0.5 h-3 bg-violet-400" />
                <div className="w-8 h-3 rounded bg-amber-500/20 border border-amber-500" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <button className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100">
                <Minus className="h-3 w-3" />
              </button>
              <button className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold">
                Fit
              </button>
              <button className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>

        {/* ─── COLUMN 2: CENTER WORKFLOW DAG CANVAS (Lg: col-6) ────────────── */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 min-h-[720px] flex flex-col items-center justify-start shadow-xs relative overflow-x-auto">
          
          <div className="flex flex-col items-center w-full max-w-md space-y-2 py-4">
            
            {/* 1. TRIGGER NODE */}
            <div
              onClick={() => setSelectedStep('trigger')}
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                selectedStep === 'trigger'
                  ? 'border-violet-600 ring-4 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 font-bold">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Trigger</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Every day at 9:00 AM</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Down Connector 1 */}
            <div className="flex flex-col items-center my-1">
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
              <button className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-500 shadow-xs text-xs">
                <Plus className="h-3 w-3" />
              </button>
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* 2. ACTION NODE (GMAIL) */}
            <div
              onClick={() => setSelectedStep('action')}
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                selectedStep === 'action'
                  ? 'border-violet-600 ring-4 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src="/assets-icons/gmail.png" alt="Gmail" className="w-7 h-7 object-contain shrink-0" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Action</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Fetch unread emails from Gmail</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Down Connector 2 */}
            <div className="flex flex-col items-center my-1">
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
              <button className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-500 shadow-xs text-xs">
                <Plus className="h-3 w-3" />
              </button>
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* 3. LLM NODE */}
            <div
              onClick={() => setSelectedStep('llm')}
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                selectedStep === 'llm'
                  ? 'border-violet-600 ring-4 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">LLM</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Summarize emails / Extract key points</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Down Connector 3 */}
            <div className="flex flex-col items-center my-1">
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
              <button className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-500 shadow-xs text-xs">
                <Plus className="h-3 w-3" />
              </button>
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* 4. CONDITION BRANCH NODE */}
            <div
              onClick={() => setSelectedStep('condition')}
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                selectedStep === 'condition'
                  ? 'border-violet-600 ring-4 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Condition</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Any high priority email?</p>
                </div>
              </div>
            </div>

            {/* BRANCHING CONNECTORS (YES / NO) */}
            <div className="w-full flex justify-between px-12 relative pt-2">
              {/* Yes Line Left */}
              <div className="flex flex-col items-center w-1/2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold mb-1">
                  Yes
                </span>
                <div className="w-0.5 h-8 bg-emerald-500" />
              </div>

              {/* No Line Right */}
              <div className="flex flex-col items-center w-1/2">
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 text-[10px] font-bold mb-1">
                  No
                </span>
                <div className="w-0.5 h-8 bg-rose-400" />
              </div>
            </div>

            {/* PARALLEL BRANCH NODES */}
            <div className="grid grid-cols-2 gap-4 w-full pt-1">
              
              {/* Node 5a (Left Branch - Slack) */}
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 text-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold text-xs">
                  #
                </div>
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white">Action</h5>
                <p className="text-[10px] text-slate-400 leading-tight">Send summary to Slack</p>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] mx-auto mt-1">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              </div>

              {/* Node 5b (Right Branch - Gmail Mark Read) */}
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 text-center">
                <img src="/assets-icons/gmail.png" alt="Gmail" className="w-6 h-6 mx-auto object-contain" />
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white">Action</h5>
                <p className="text-[10px] text-slate-400 leading-tight">Mark as read in Gmail</p>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] mx-auto mt-1">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              </div>

            </div>

            {/* Merging Lines to End */}
            <div className="flex flex-col items-center my-2">
              <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* 6. END NODE */}
            <div
              onClick={() => setSelectedStep('end')}
              className={`w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                selectedStep === 'end'
                  ? 'border-violet-600 ring-4 ring-violet-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 font-bold">
                  <OctagonAlert className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">End</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Workflow completed</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ─── COLUMN 3: STEP INSPECTOR PANEL (Lg: col-3) ────────────────────── */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                <Clock className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Trigger
              </h3>
            </div>
            <Pencil className="h-3.5 w-3.5 text-violet-500 cursor-pointer" />
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-xs">
            
            {/* Step Name */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Step name
              </label>
              <input
                type="text"
                value={stepName}
                onChange={(e) => setStepName(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Trigger Type Dropdown */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Trigger type
              </label>
              <div className="relative">
                <select
                  value={triggerType}
                  onChange={(e) => setTriggerType(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8"
                >
                  <option value="Schedule">Schedule</option>
                  <option value="Webhook">Webhook</option>
                  <option value="Event">Event Driven</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Schedule Settings */}
            <div className="space-y-2 pt-1">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Schedule
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <select
                    value={scheduleFreq}
                    onChange={(e) => setScheduleFreq(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-7"
                  >
                    <option value="Every day">Every day</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Custom">Custom</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                </div>

                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none text-center"
                />
              </div>

              <p className="text-[10px] text-slate-400 font-medium pt-0.5">
                Timezone: Asia/Kolkata (GMT +05:30)
              </p>
            </div>

            {/* Description Optional */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Description (optional)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Next Step Output */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Next step
              </label>
              <div className="relative">
                <select
                  value={nextStep}
                  onChange={(e) => setNextStep(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none appearance-none pr-8 truncate"
                >
                  <option value="Fetch unread emails from Gmail">Fetch unread emails from Gmail</option>
                  <option value="Summarize emails">Summarize emails</option>
                  <option value="Send summary to Slack">Send summary to Slack</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Delete Step */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert('Step deleted from workflow')}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Step</span>
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* ─── BOTTOM ACTION FOOTER BAR ───────────────────────────────────────── */}
      <footer className="h-16 px-6 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 sticky bottom-0 z-30 shadow-lg rounded-2xl">
        <button
          onClick={onBackToOverview}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Workflow draft saved!')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={onTestWorkflow}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-all shadow-md shadow-violet-500/20 hover:scale-[1.02] flex items-center gap-2"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Test Workflow</span>
          </button>
        </div>
      </footer>

    </div>
  );
}
