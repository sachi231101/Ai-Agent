import React from 'react';
import {
  BrainCircuit,
  Target,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Rocket,
  Check,
  Building2,
  Key,
  Plug,
} from 'lucide-react';
import type {
  IntentDetectionResult,
  ExtractedRequirements,
  ThinkingStage,
  ReadinessChecklist,
} from '../../types';
import { THINKING_STAGES_LIST } from '../../hooks/useStudioEngine';

interface IntelligenceCenterPanelProps {
  intent: IntentDetectionResult;
  requirements: ExtractedRequirements;
  currentStage: ThinkingStage;
  isProcessing: boolean;
  readiness: ReadinessChecklist;
  onDeploy: () => void;
}

export const IntelligenceCenterPanel: React.FC<IntelligenceCenterPanelProps> = ({
  intent,
  requirements,
  currentStage,
  isProcessing,
  readiness,
  onDeploy,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0d0b14] border-r border-white/10 overflow-y-auto p-4 space-y-4 text-white">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} className="text-purple-400" />
          <h3 className="text-sm font-bold tracking-wide">AI Intelligence Engine</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold">
          Internal Workspace
        </span>
      </div>

      {/* STEP 4: AI Thinking Experience Stage Animation */}
      {isProcessing && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-black border border-purple-500/30 shadow-lg shadow-purple-950/30 space-y-3">
          <div className="flex items-center gap-2">
            <Loader2 size={16} className="text-purple-400 animate-spin" />
            <h4 className="text-xs font-bold text-purple-200">Architecting AI Agent Solution...</h4>
          </div>

          <div className="space-y-2">
            {THINKING_STAGES_LIST.map((st, idx) => {
              const stageOrder = THINKING_STAGES_LIST.findIndex((s) => s.key === currentStage);
              const isDone = stageOrder > idx || currentStage === 'complete';
              const isCurrent = stageOrder === idx && currentStage !== 'complete';

              return (
                <div
                  key={st.key}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200'
                      : isCurrent
                      ? 'bg-purple-500/20 border border-purple-500/40 text-purple-100 font-semibold'
                      : 'bg-white/[0.02] border border-white/5 text-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <Check size={13} className="text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    )}
                    <span>{st.label}</span>
                  </div>
                  <span className="text-[10px] opacity-60 font-mono">{st.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: Intent Detection Inspector */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-amber-400" />
            <h4 className="text-xs font-bold tracking-wide uppercase text-white/70">Step 1 — Intent Detection</h4>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-medium flex items-center gap-1">
            <Building2 size={11} />
            {intent.businessDomain}
          </span>
        </div>

        <div>
          <div className="text-sm font-extrabold text-white mb-1">{intent.primaryIntent}</div>
          <p className="text-xs text-white/50 leading-relaxed">{intent.expectedOutcome}</p>
        </div>

        {/* Confidence Score Bar */}
        <div className="pt-2 border-t border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/40">Engine Confidence Score</span>
            <span className="font-bold text-amber-400 font-mono">{intent.confidenceScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${intent.confidenceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* STEP 2: Requirement Extraction Matrix */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-indigo-400" />
            <h4 className="text-xs font-bold tracking-wide uppercase text-white/70">Step 2 — Requirement Extraction</h4>
          </div>
          {requirements.unknownInformation.length > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] font-medium flex items-center gap-1">
              <AlertCircle size={11} />
              {requirements.unknownInformation.length} Missing Info
            </span>
          )}
        </div>

        {/* Tasks */}
        {requirements.tasks.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Identified Tasks</span>
            <div className="space-y-1">
              {requirements.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                  <CheckCircle2 size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Integrations */}
        {requirements.requiredIntegrations.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <Plug size={12} /> Required Integrations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {requirements.requiredIntegrations.map((integ, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-[11px] font-medium"
                >
                  {integ}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Required Permissions */}
        {requirements.requiredPermissions.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <Key size={12} /> Scoped Permissions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {requirements.requiredPermissions.map((perm, pIdx) => (
                <span
                  key={pIdx}
                  className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono"
                >
                  <code>{perm}</code>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Unknown Info */}
        {requirements.unknownInformation.length > 0 && (
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
            <span className="text-[10px] font-bold text-rose-300 uppercase">Missing Information Queued for Clarification</span>
            <div className="flex flex-wrap gap-1">
              {requirements.unknownInformation.map((unk, uIdx) => (
                <span key={uIdx} className="text-[11px] text-rose-200">
                  • {unk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STEP 8: Readiness Assessment & Completion Checklist */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-purple-950/20 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <h4 className="text-xs font-bold tracking-wide uppercase text-white/70">Step 8 — Readiness Assessment</h4>
          </div>
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
              readiness.isReady
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
          >
            {readiness.isReady ? 'Ready for Deployment' : 'Architecting...'}
          </span>
        </div>

        <div className="space-y-1.5">
          <ChecklistItem label="Goal Understood" checked={readiness.goalUnderstood} />
          <ChecklistItem label="Requirements Complete" checked={readiness.requirementsComplete} />
          <ChecklistItem label="Integrations Selected" checked={readiness.integrationsSelected} />
          <ChecklistItem label="Permissions Identified" checked={readiness.permissionsIdentified} />
          <ChecklistItem label="Agent Specification Designed" checked={readiness.agentDesigned} />
        </div>

        <button
          onClick={onDeploy}
          disabled={!readiness.isReady}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            readiness.isReady
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
          }`}
        >
          <Rocket size={14} />
          <span>Deploy AI Agent</span>
        </button>
      </div>
    </div>
  );
};

function ChecklistItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs py-0.5">
      <span className={checked ? 'text-white/80' : 'text-white/30'}>{label}</span>
      {checked ? (
        <Check size={14} className="text-emerald-400" />
      ) : (
        <span className="w-2 h-2 rounded-full bg-white/20" />
      )}
    </div>
  );
}
