import React, { useState } from 'react';
import { X, Play, Terminal, Layers, CheckCircle2, AlertCircle, Code, Copy, Check, Sparkles } from 'lucide-react';
import type { AgentSpecificationTool } from '../../types';

interface ToolTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AgentSpecificationTool | null;
}

export function ToolTesterModal({ isOpen, onClose, tool }: ToolTesterModalProps) {
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [inputPayload, setInputPayload] = useState(
    JSON.stringify({ query: 'Get Q3 enterprise SLA performance metrics', topK: 5 }, null, 2)
  );
  const [executionResult, setExecutionResult] = useState<any>(null);

  if (!isOpen || !tool) return null;

  const handleRunToolTest = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        status: 200,
        statusText: 'OK',
        executionDurationMs: 84,
        toolId: tool.id,
        toolName: tool.name,
        result: {
          success: true,
          matchedRecords: 3,
          data: [
            { id: 'vec-01', text: 'Vibe Agent SLA guaranteed uptime: 99.95% across all regions.', score: 0.96 },
            { id: 'vec-02', text: 'Mean Time to Resolution (MTTR) for Tier 1 incidents: 14.2 minutes.', score: 0.89 },
          ],
        },
      });
    }, 600);
  };

  const handleCopyResult = () => {
    if (!executionResult) return;
    navigator.clipboard.writeText(JSON.stringify(executionResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12101b] border border-white/10 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{tool.name}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Tool Sandbox
                </span>
              </div>
              <p className="text-xs text-white/50">Type: {tool.type} • Status: {tool.enabled ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {/* Input JSON Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="font-semibold flex items-center gap-1.5">
                <Terminal size={14} className="text-purple-400" /> Test Input Payload (JSON)
              </span>
              <span className="font-mono text-[10px] text-white/40">JSON format</span>
            </div>
            <textarea
              rows={4}
              value={inputPayload}
              onChange={(e) => setInputPayload(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#0a0812] border border-white/10 text-xs font-mono text-purple-200 focus:outline-none focus:border-purple-500/50 transition-all leading-relaxed resize-none"
            />
          </div>

          {/* Action Trigger */}
          <div className="flex justify-end">
            <button
              onClick={handleRunToolTest}
              disabled={isExecuting}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
            >
              <Play size={14} />
              <span>{isExecuting ? 'Executing Tool API...' : 'Execute Tool Test'}</span>
            </button>
          </div>

          {/* Output Inspection Box */}
          {executionResult && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-semibold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 size={14} /> Tool Execution Output ({executionResult.executionDurationMs}ms)
                </span>
                <button
                  onClick={handleCopyResult}
                  className="p-1 text-[11px] text-white/50 hover:text-white flex items-center gap-1 transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#0a0812] border border-white/10 text-xs font-mono text-emerald-300/90 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {JSON.stringify(executionResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
