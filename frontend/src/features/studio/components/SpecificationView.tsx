/**
 * SpecificationView — Live Agent Specification Preview Panel
 *
 * Displayed in the right column of StudioCanvas once the AI pipeline
 * produces a specification, or shows a "designing" skeleton while in progress.
 *
 * Sections:
 *  - Agent Identity (name, description, status badge)
 *  - Business Purpose
 *  - Capabilities chip list
 *  - Integrations with icons
 *  - Trigger schedule
 *  - Memory strategy
 *  - Workflow steps
 *  - Readiness Score bar
 *  - "Proceed to Review" CTA
 */
import { Check, Zap, Brain, ArrowRight, Shield, Clock, GitBranch } from 'lucide-react';
import type { AgentSpecificationData } from '@/services/api/conversation.api';
import type { ReadinessScore } from '../../hooks/useStudioEngine';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSpecValue(val: unknown, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) return val.map((v) => formatSpecValue(v)).join(', ');
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if (obj['type'] && obj['config']) return `${obj['type']}`;
    if (obj['name']) return String(obj['name']);
    if (obj['title']) return String(obj['title']);
    if (obj['type']) return String(obj['type']);
    return JSON.stringify(val);
  }
  return String(val);
}

const INTEGRATION_ICONS: Record<string, string> = {
  gmail:     '/assets-icons/gmail.png',
  slack:     '/assets-icons/slack.png',
  notion:    '/assets-icons/notion.png',
  github:    '/assets-icons/github.png',
  jira:      '/assets-icons/jira.png',
  zendesk:   '/assets-icons/zendesk.png',
  whatsapp:  '/assets-icons/whatsapp.png',
  outlook:   '/assets-icons/outlook.png',
  teams:     '/assets-icons/teams.png',
  sendgrid:  '/assets-icons/sendgrid.png',
  hubspot:   '/assets-icons/hubspot.png',
  asana:     '/assets-icons/asana.png',
};

function getIcon(name: string): string | undefined {
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return INTEGRATION_ICONS[key];
}

// ─── Readiness Score Bar ──────────────────────────────────────────────────────

function ReadinessBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-violet-500' : 'bg-amber-400';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className="font-bold text-slate-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ─── Skeleton state ───────────────────────────────────────────────────────────

function DesigningState({ onFocusInput }: { onFocusInput?: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {/* Pulse placeholders */}
      <div className="flex items-start gap-3 pb-4 border-b border-slate-100 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-slate-100 rounded animate-pulse w-2/3" />
        </div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="py-3 border-b border-slate-100 space-y-2">
          <div className="h-3 bg-slate-100 rounded animate-pulse w-1/3" />
          <div className="h-3 bg-slate-100 rounded animate-pulse w-4/5" />
        </div>
      ))}

      {/* Prompt CTA */}
      <div className="mt-6 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 flex items-start gap-3">
        <div className="flex-1">
          <p className="text-[13px] font-bold text-slate-800 mb-1">Your Agent is Being Designed</p>
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Answer the questions in the chat to complete the agent specification.
          </p>
        </div>
        <button
          onClick={onFocusInput}
          className="shrink-0 px-3 py-2 rounded-xl bg-violet-600 text-white text-[11px] font-bold hover:bg-violet-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SpecificationViewProps {
  specification: AgentSpecificationData | null;
  readiness: ReadinessScore;
  isComplete: boolean;
  onNextToReview?: () => void;
  onFocusInput?: () => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SpecificationView({
  specification,
  readiness,
  isComplete,
  onNextToReview,
  onFocusInput,
}: SpecificationViewProps) {
  const spec = specification?.spec as Record<string, unknown> | undefined;

  // ─── Derived display values ─────────────────────────────────────────────────
  const agentName        = specification?.name || 'Custom AI Agent';
  const agentDesc        = specification?.description || 'Autonomous AI agent being designed...';
  const purpose          = formatSpecValue(spec?.metadata && (spec.metadata as Record<string, unknown>)?.businessObjective || spec?.purpose, agentDesc);

  const rawCaps          = spec?.capabilities;
  const capabilities: string[] = Array.isArray(rawCaps)
    ? rawCaps.map((c) => formatSpecValue(c))
    : [];

  const rawTools         = spec?.tools;
  const toolNames: string[] = Array.isArray(rawTools)
    ? rawTools.map((t) => formatSpecValue((t as Record<string, unknown>)?.name || t))
    : [];

  const rawIntegrations  = spec?.integrations;
  const integrations: string[] = toolNames.length > 0
    ? toolNames
    : Array.isArray(rawIntegrations) ? rawIntegrations.map((i) => formatSpecValue(i)) : [];

  const triggerStr       = formatSpecValue(spec?.trigger, 'Not yet configured');
  const memoryEnabled    = spec?.memory !== false;

  const rawSteps         = (spec?.workflow as Record<string, unknown>)?.steps;
  const workflowSteps: string[] = Array.isArray(rawSteps)
    ? rawSteps.map((s) => formatSpecValue((s as Record<string, unknown>)?.description || s))
    : [];

  const rawPerms         = spec?.permissions;
  const permissions: string[] = Array.isArray(rawPerms) ? rawPerms.map((p) => formatSpecValue(p)) : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-slate-400" />
          <span className="text-[13px] font-bold text-slate-700">Your Agent</span>
          <span className="text-[11px] text-slate-400">(Live Preview)</span>
        </div>
        <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
          isComplete
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            : 'bg-violet-50 text-violet-600 border border-violet-200'
        }`}>
          {isComplete ? '● Ready' : '◌ Designing'}
        </span>
      </div>

      {/* Body */}
      {!specification ? (
        <DesigningState onFocusInput={onFocusInput} />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0 divide-y divide-slate-100">

          {/* ─── Identity ─── */}
          <div className="flex items-start gap-3 pb-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-violet-100 to-indigo-100 shrink-0">
              <img
                src="/assets-icons/robot-avatar-head.png"
                alt="Agent"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/assets-icons/robot-avatar-3d.png'; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-slate-900 truncate">{agentName}</h3>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">{agentDesc}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                {specification.version}
              </span>
            </div>
          </div>

          {/* ─── Purpose ─── */}
          <div className="py-3">
            <p className="text-[11px] font-bold text-violet-600 uppercase tracking-wide mb-1">Purpose</p>
            <p className="text-[12.5px] text-slate-600 leading-relaxed">{purpose}</p>
          </div>

          {/* ─── Capabilities ─── */}
          {capabilities.length > 0 && (
            <div className="py-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-violet-500" />
                <span className="text-[13px] font-semibold text-slate-700">Capabilities</span>
                <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">{capabilities.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {capabilities.map((cap, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-violet-50 text-violet-700 border border-violet-100">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── Integrations ─── */}
          {integrations.length > 0 && (
            <div className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-violet-500" />
                  <span className="text-[13px] font-semibold text-slate-700">Integrations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {integrations.map((integ, idx) => {
                    const src = getIcon(integ);
                    return src ? (
                      <img key={idx} src={src} alt={integ} title={integ} className="w-5 h-5 object-contain rounded" />
                    ) : (
                      <span key={idx} title={integ} className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500">
                        {integ[0]?.toUpperCase() ?? '?'}
                      </span>
                    );
                  })}
                  <span className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold ml-1">
                    {integrations.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ─── Trigger ─── */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-500" />
              <span className="text-[13px] font-semibold text-slate-700">Trigger</span>
            </div>
            <span className="text-[12px] text-slate-500 text-right max-w-[55%]">{triggerStr}</span>
          </div>

          {/* ─── Memory ─── */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-violet-500" />
              <span className="text-[13px] font-semibold text-slate-700">Memory</span>
            </div>
            <span className={`flex items-center gap-1 text-[12px] font-semibold ${memoryEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
              {memoryEnabled ? 'Enabled' : 'Disabled'}{memoryEnabled && <Check className="h-3.5 w-3.5" />}
            </span>
          </div>

          {/* ─── Permissions ─── */}
          {permissions.length > 0 && (
            <div className="py-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-violet-500" />
                <span className="text-[13px] font-semibold text-slate-700">Permissions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {permissions.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10.5px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ─── Workflow Steps ─── */}
          {workflowSteps.length > 0 && (
            <div className="py-3">
              <p className="text-[11px] font-bold text-violet-600 uppercase tracking-wide mb-2">Workflow</p>
              <ol className="space-y-1.5">
                {workflowSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ─── Readiness Score ─── */}
          <div className="py-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Agent Readiness</p>
              <span className={`text-[14px] font-extrabold ${
                readiness.overall >= 80 ? 'text-emerald-600' : readiness.overall >= 50 ? 'text-violet-600' : 'text-amber-600'
              }`}>{readiness.overall}%</span>
            </div>
            <div className="space-y-2.5">
              <ReadinessBar label="Business Understanding" value={readiness.businessUnderstanding} />
              <ReadinessBar label="Requirement Completeness" value={readiness.requirementCompleteness} />
              <ReadinessBar label="Security Readiness" value={readiness.securityReadiness} />
              <ReadinessBar label="Integration Readiness" value={readiness.integrationReadiness} />
              <ReadinessBar label="Deployment Readiness" value={readiness.deploymentReadiness} />
              <ReadinessBar label="Conversation Complete" value={readiness.conversationCompleteness} />
            </div>
          </div>

          {/* ─── CTA ─── */}
          <div className="pt-4 pb-2">
            <button
              onClick={isComplete ? onNextToReview : onFocusInput}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold transition-all shadow-md ${
                isComplete
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-violet-200'
                  : 'bg-violet-100 text-violet-700 hover:bg-violet-200 shadow-none'
              }`}
            >
              {isComplete ? 'Proceed to Review' : 'Continue Conversation'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
