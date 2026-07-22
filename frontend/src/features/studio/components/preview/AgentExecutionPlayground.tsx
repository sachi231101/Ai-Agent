import React, { useState } from 'react';
import {
  Play,
  Terminal,
  Cpu,
  Bot,
  Zap,
  CheckCircle2,
  AlertCircle,
  Database,
  Code2,
  RefreshCw,
  Send,
  Layers,
  Sparkles,
  ShieldCheck,
  Globe,
  Settings
} from 'lucide-react';
import { ToolTesterModal } from './ToolTesterModal';
import type { AgentSpecification, AgentSpecificationTool } from '../../types';

interface AgentExecutionPlaygroundProps {
  spec: AgentSpecification;
  agentName: string;
  domain: string;
  integrations: string[];
}

export const AgentExecutionPlayground: React.FC<AgentExecutionPlaygroundProps> = ({
  spec,
  agentName,
  domain,
  integrations,
}) => {
  const [testInput, setTestInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedToolForModal, setSelectedToolForModal] = useState<AgentSpecificationTool | null>(null);
  const [logs, setLogs] = useState<Array<{ time: string; type: 'info' | 'tool' | 'agent' | 'success'; message: string }>>([
    { time: '12:04:01', type: 'info', message: `Initialized ${spec.agentName} v${spec.version}` },
    { time: '12:04:02', type: 'tool', message: `Connected integrations: ${integrations.join(', ')}` },
    { time: '12:04:03', type: 'agent', message: `Memory type loaded: ${spec.memoryType || 'Vector Store'}` },
  ]);
  const [executionSteps, setExecutionSteps] = useState([
    { name: 'Intent Classifier', status: 'completed', duration: '12ms' },
    { name: 'Memory & Context RAG', status: 'completed', duration: '45ms' },
    { name: 'Tool Binding Evaluator', status: 'ready', duration: '-' },
    { name: 'Response Generator', status: 'idle', duration: '-' },
  ]);

  const handleRunSimulation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = testInput.trim() || 'How do I resolve a payment verification timeout in Zendesk?';
    setIsRunning(true);

    const now = () => new Date().toLocaleTimeString();

    // Log user input
    setLogs((prev) => [
      ...prev,
      { time: now(), type: 'info', message: `[User Trigger]: "${prompt}"` },
    ]);

    // Simulate step 1
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { time: now(), type: 'agent', message: `[Intent Classifier]: Domain identified -> ${domain}. Confidence: 98.4%` },
      ]);
      setExecutionSteps((prev) =>
        prev.map((s, i) => (i === 0 ? { ...s, status: 'completed', duration: '18ms' } : s))
      );
    }, 400);

    // Simulate step 2
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { time: now(), type: 'tool', message: `[RAG Vector Retriever]: Searched index KB-v2. Retracted 3 relevant documentation chunks.` },
      ]);
      setExecutionSteps((prev) =>
        prev.map((s, i) => (i === 1 ? { ...s, status: 'completed', duration: '64ms' } : s))
      );
    }, 900);

    // Simulate step 3
    setTimeout(() => {
      const primaryTool = spec.tools?.[0]?.name || 'api_handler';
      setLogs((prev) => [
        ...prev,
        { time: now(), type: 'tool', message: `[Tool Execution]: Executed "${primaryTool}" -> Response HTTP 200 OK.` },
      ]);
      setExecutionSteps((prev) =>
        prev.map((s, i) => (i === 2 ? { ...s, status: 'completed', duration: '112ms' } : s))
      );
    }, 1400);

    // Simulate completion
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { time: now(), type: 'success', message: `[Agent Output]: Synthesized autonomous response. Task completed successfully.` },
      ]);
      setExecutionSteps((prev) =>
        prev.map((s, i) => (i === 3 ? { ...s, status: 'completed', duration: '32ms' } : s))
      );
      setIsRunning(false);
      setTestInput('');
    }, 1900);
  };

  return (
    <div className="w-full h-full bg-[#08070d] flex flex-col font-sans overflow-hidden border-l border-white/10">
      {/* Top Playground Toolbar */}
      <div className="h-14 px-5 bg-[#0e0c18] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">{spec.agentName || agentName}</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Execution Sandbox
              </span>
            </div>
            <p className="text-[11px] text-white/50">{domain} • Model: {spec.model || 'gpt-4o'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRunSimulation()}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 cursor-pointer"
          >
            {isRunning ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
            <span>{isRunning ? 'Running Simulation...' : 'Test Run Sandbox'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Side: Agent DAG Pipeline & Live Steps (5 cols) */}
        <div className="lg:col-span-5 border-r border-white/10 p-4 flex flex-col gap-4 overflow-y-auto bg-[#0a0912]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-purple-400" />
              Agent Workflow Pipeline
            </h4>
            <span className="text-[11px] text-white/40 font-mono">DAG v{spec.version || '1.0'}</span>
          </div>

          {/* Execution Nodes */}
          <div className="space-y-2.5">
            {executionSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/5 text-purple-400 font-mono text-xs font-bold flex items-center justify-center border border-white/10">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{step.name}</h5>
                    <p className="text-[10px] text-white/40">Latency: {step.duration}</p>
                  </div>
                </div>
                <div>
                  {step.status === 'completed' ? (
                    <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center gap-1 text-[10px]">
                      <CheckCircle2 size={12} /> Ready
                    </span>
                  ) : isRunning ? (
                    <span className="p-1 rounded-md bg-purple-500/20 text-purple-300 flex items-center gap-1 text-[10px]">
                      <RefreshCw size={12} className="animate-spin" /> Processing
                    </span>
                  ) : (
                    <span className="p-1 rounded-md bg-white/5 text-white/40 text-[10px]">
                      Idle
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bound Tools Summary */}
          <div className="mt-2 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <h5 className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-2">
              <Zap size={14} className="text-purple-400" />
              Bound Execution Tools ({spec.tools?.length || 0})
            </h5>
            <div className="space-y-1.5">
              {spec.tools && spec.tools.length > 0 ? (
                spec.tools.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-[11px] text-white/80 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <div>
                      <span className="font-mono text-purple-300 font-semibold block">{t.name}</span>
                      <span className="text-[10px] text-white/40 uppercase">{t.type}</span>
                    </div>
                    <button
                      onClick={() => setSelectedToolForModal(t)}
                      className="px-2 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[10px] font-semibold transition-all border border-purple-500/30 flex items-center gap-1"
                    >
                      <Play size={10} /> Test API
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-white/40">No tools configured yet.</p>
              )}
            </div>
          </div>

          {/* Sub-Agents */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
            <h5 className="text-xs font-bold text-white/70 flex items-center gap-1.5 mb-2">
              <Cpu size={14} className="text-blue-400" />
              Sub-Agent Orchestrators ({spec.subAgents?.length || 0})
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {spec.subAgents?.map((sa, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-[11px] font-semibold border border-blue-500/20">
                  🤖 {sa}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Terminal Execution Console & Input (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-[#05040a]">
          {/* Terminal Console Log Header */}
          <div className="h-10 px-4 bg-[#0a0912] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <Terminal size={14} className="text-emerald-400" />
              <span>Agent Execution Console</span>
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-[10px] text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              Clear Console
            </button>
          </div>

          {/* Console Logs Viewport */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 select-text">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-white/30 text-[10px] shrink-0 pt-0.5">{log.time}</span>
                {log.type === 'info' && <span className="text-blue-400">{log.message}</span>}
                {log.type === 'tool' && <span className="text-purple-300 font-semibold">{log.message}</span>}
                {log.type === 'agent' && <span className="text-amber-300">{log.message}</span>}
                {log.type === 'success' && <span className="text-emerald-400 font-bold">{log.message}</span>}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-purple-400 text-xs animate-pulse">
                <RefreshCw size={12} className="animate-spin" />
                <span>Agent is reasoning and executing steps...</span>
              </div>
            )}
          </div>

          {/* Test Input Box */}
          <form onSubmit={handleRunSimulation} className="p-3 bg-[#0a0912] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Send test event payload or prompt to agent..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-purple-500/50 transition-all font-mono"
            />
            <button
              type="submit"
              disabled={isRunning}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <Send size={13} />
              <span>Trigger</span>
            </button>
          </form>
        </div>
      </div>

      <ToolTesterModal
        isOpen={!!selectedToolForModal}
        onClose={() => setSelectedToolForModal(null)}
        tool={selectedToolForModal}
      />
    </div>
  );
};
