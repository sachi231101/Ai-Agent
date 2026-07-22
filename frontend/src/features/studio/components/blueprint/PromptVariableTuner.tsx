import React, { useState } from 'react';
import { Sparkles, Code, Sliders, CheckCircle2, Copy, Check, Eye } from 'lucide-react';

interface PromptVariableTunerProps {
  systemPrompt: string;
  onUpdatePrompt: (newPrompt: string) => void;
}

export function PromptVariableTuner({ systemPrompt, onUpdatePrompt }: PromptVariableTunerProps) {
  const [variables, setVariables] = useState<Record<string, string>>({
    customer_name: 'Acme Corp Support',
    user_query: 'How do I configure SAML SSO authentication?',
    rag_context: 'SAML SSO can be enabled in Settings > Security by uploading the IdP Metadata XML file.',
  });
  const [showInterpolated, setShowInterpolated] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute interpolated text
  let interpolatedText = systemPrompt;
  Object.entries(variables).forEach(([key, val]) => {
    interpolatedText = interpolatedText.replaceAll(`{{${key}}}`, val);
  });

  const estimatedTokens = Math.ceil(interpolatedText.length / 4);

  const handleVariableChange = (key: string, val: string) => {
    setVariables((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(interpolatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-2xl bg-[#171424] border border-white/10 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-purple-400" />
          <h4 className="text-xs font-bold text-white">Prompt Template & Variable Substitution</h4>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/50 font-mono">
          <span>Est. Tokens: <strong className="text-purple-300 font-bold">{estimatedTokens}</strong></span>
          <button
            type="button"
            onClick={() => setShowInterpolated(!showInterpolated)}
            className="p-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center gap-1 transition-all"
          >
            <Eye size={12} />
            <span>{showInterpolated ? 'Edit Template' : 'Preview Substitution'}</span>
          </button>
        </div>
      </div>

      {showInterpolated ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-white/50">
            <span>Interpolated System Prompt Result:</span>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1 text-purple-300 hover:text-white transition-all"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-[#0d0b14] border border-purple-500/30 text-xs font-mono text-purple-200 whitespace-pre-wrap leading-relaxed">
            {interpolatedText}
          </pre>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-white/70">System Prompt Template</label>
            <textarea
              rows={4}
              value={systemPrompt}
              onChange={(e) => onUpdatePrompt(e.target.value)}
              placeholder="Use {{variable_name}} syntax for dynamic variables..."
              className="w-full p-3 rounded-xl bg-[#0d0b14] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Variables Controls */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider block">Variable Inputs</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(variables).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <span className="font-mono text-[10px] text-purple-400">{`{{${key}}}`}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleVariableChange(key, e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#0d0b14] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
