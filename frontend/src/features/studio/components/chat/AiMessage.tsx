/**
 * AiMessage — Renders a single AI assistant message in the chat.
 *
 * Features:
 *  - Markdown rendering via react-markdown
 *  - Risk/conflict warnings rendered as amber alert cards
 *  - Improvement suggestions as clickable sky-blue chips
 *  - Clarification option chips (email icons, frequency pills, generic)
 *  - Stage label shown below avatar
 *  - Timestamp
 */
import Markdown from 'react-markdown';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import type { StudioMessage } from '../../hooks/useStudioEngine';

// ─── Option category detection ───────────────────────────────────────────────

const EMAIL_OPTIONS = ['Gmail', 'Outlook / Microsoft 365', 'Yahoo Mail', 'Custom SMTP / IMAP', 'Other'];
const FREQ_OPTIONS  = ['Daily at 9 AM', 'Twice a Day', 'Hourly', 'Every 30 Minutes', 'Real-time Webhook'];

const EMAIL_ICON_MAP: Record<string, string> = {
  'Gmail':                     '/assets-icons/gmail.png',
  'Outlook / Microsoft 365':   '/assets-icons/outlook.png',
  'Yahoo Mail':                '/assets-icons/yahoo.png',
};

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
  asana:     '/assets-icons/asana.png',
  hubspot:   '/assets-icons/hubspot.png',
};

function getIntegrationIcon(name: string): string | undefined {
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return INTEGRATION_ICONS[key];
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AiMessageProps {
  message: StudioMessage;
  stageLabel?: string;
  isDisabled?: boolean;
  onOptionSelect: (messageId: string, option: string) => void;
  onImprovementClick: (improvement: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AiMessage({
  message,
  stageLabel,
  isDisabled,
  onOptionSelect,
  onImprovementClick,
}: AiMessageProps) {
  const { options = [], warnings = [], improvements = [], questionAnswered } = message;

  const isEmailOptions = options.some((o) => EMAIL_OPTIONS.includes(o));
  const isFreqOptions  = !isEmailOptions && options.some((o) => FREQ_OPTIONS.includes(o));
  const isGenericOptions = options.length > 0 && !isEmailOptions && !isFreqOptions;

  return (
    <div className="flex gap-2.5 items-start">
      {/* AI Avatar */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-violet-50 shrink-0">
          <img
            src="/assets-icons/robot-avatar-head.png"
            alt="AI"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/assets-icons/bot4.png'; }}
          />
        </div>
        {stageLabel && (
          <span className="text-[9px] text-violet-500 font-semibold text-center leading-tight w-10 truncate" title={stageLabel}>
            {stageLabel.replace('...', '')}
          </span>
        )}
      </div>

      {/* Bubble */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <span className="text-[11px] font-bold text-violet-600 block">AI Architect</span>

        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[12.5px] text-slate-700 leading-relaxed">
          {/* Markdown content */}
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-slate-800 prose-code:bg-slate-100 prose-code:text-violet-700 prose-code:px-1 prose-code:rounded prose-headings:text-slate-800 prose-headings:font-bold">
            <Markdown>{message.text}</Markdown>
          </div>

          {/* ─── Email Provider Options ─── */}
          {isEmailOptions && !questionAnswered && (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {options.filter((o) => EMAIL_OPTIONS.includes(o)).map((opt) => (
                <button
                  key={opt}
                  onClick={() => onOptionSelect(message.id, opt)}
                  disabled={isDisabled}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {EMAIL_ICON_MAP[opt] ? (
                    <img src={EMAIL_ICON_MAP[opt]} alt={opt} className="w-5 h-5 object-contain flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0 text-[11px]">✉</div>
                  )}
                  <span className="flex-1 text-[12.5px] font-semibold text-slate-700">{opt}</span>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-violet-500 flex-shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* ─── Frequency Options ─── */}
          {isFreqOptions && !questionAnswered && (
            <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3 flex-wrap">
              {options.filter((o) => FREQ_OPTIONS.includes(o)).map((opt) => (
                <button
                  key={opt}
                  onClick={() => onOptionSelect(message.id, opt)}
                  disabled={isDisabled}
                  className="px-4 py-1.5 rounded-full text-[12px] font-semibold border border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-600 transition-all disabled:opacity-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* ─── Generic Option Chips ─── */}
          {isGenericOptions && !questionAnswered && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              {options.map((opt, i) => {
                const icon = getIntegrationIcon(opt);
                return (
                  <button
                    key={i}
                    onClick={() => onOptionSelect(message.id, opt)}
                    disabled={isDisabled}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-200 bg-violet-50 text-violet-700 text-[11px] font-semibold hover:bg-violet-100 transition-colors disabled:opacity-50"
                  >
                    {icon && <img src={icon} alt={opt} className="w-4 h-4 object-contain" />}
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* ─── Answered indicator ─── */}
          {questionAnswered && options.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-100">
              <span className="text-[10.5px] text-emerald-500 font-semibold">✓ Options answered</span>
            </div>
          )}

          {/* ─── Risk Warnings ─── */}
          {warnings.length > 0 && (
            <div className="mt-3 p-3 rounded-xl border border-amber-200 bg-amber-50 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" />
                Risk Analysis ({warnings.length})
              </div>
              {warnings.map((w, i) => (
                <div key={i} className="text-[11px] text-amber-800">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mr-1.5 ${
                    w.severity === 'HIGH' || w.severity === 'CRITICAL'
                      ? 'bg-red-100 text-red-700'
                      : w.severity === 'MEDIUM'
                        ? 'bg-amber-200 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {w.severity}
                  </span>
                  <span className="font-semibold">{w.title}:</span>{' '}
                  <span className="text-amber-700">{w.description}</span>
                </div>
              ))}
            </div>
          )}

          {/* ─── Improvement Chips ─── */}
          {improvements.length > 0 && (
            <div className="mt-3 p-3 rounded-xl border border-sky-200 bg-sky-50 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
                <Lightbulb className="h-3.5 w-3.5" />
                Enhancements ({improvements.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {improvements.map((imp, i) => (
                  <button
                    key={i}
                    onClick={() => onImprovementClick(imp.title)}
                    disabled={isDisabled}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-sky-700 text-[11px] font-semibold border border-sky-200 hover:bg-sky-100 transition-colors disabled:opacity-50"
                    title={imp.description}
                  >
                    <span className="text-sky-500">+</span> {imp.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span className="text-[10px] text-slate-400 font-mono ml-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
