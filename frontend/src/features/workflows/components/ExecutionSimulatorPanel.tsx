import React, { useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Clock, Terminal, ChevronRight, Zap } from 'lucide-react';
import type { ExecutionStepLog } from '../types';

interface ExecutionSimulatorPanelProps {
  logs: ExecutionStepLog[];
  isSimulating: boolean;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  onResetSimulation: () => void;
}

export function ExecutionSimulatorPanel({
  logs,
  isSimulating,
  onStartSimulation,
  onStopSimulation,
  onResetSimulation,
}: ExecutionSimulatorPanelProps) {
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);

  const activeLog = selectedLogId !== null && logs[selectedLogId] ? logs[selectedLogId] : logs[logs.length - 1];

  return (
    <div className="h-64 bg-card border-t border-border/60 flex flex-col justify-between shadow-lg z-10">
      {/* Simulation Control Bar */}
      <div className="px-5 py-3 border-b border-border/50 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            <h3 className="text-xs font-bold text-foreground">Pipeline Execution Simulator</h3>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-semibold">
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isSimulating ? 'animate-ping' : ''}`} />
            {isSimulating ? 'SIMULATING RUNTIME...' : 'READY'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isSimulating ? (
            <button
              onClick={onStopSimulation}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Pause size={13} />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onStartSimulation}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Play size={13} />
              <span>Run Pipeline Simulation</span>
            </button>
          )}

          <button
            onClick={onResetSimulation}
            className="p-1.5 rounded-lg border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold transition-all"
            title="Reset Simulation State"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Logs split view */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x divide-border/40 overflow-hidden">
        {/* Left: Logs List */}
        <div className="p-3 overflow-y-auto space-y-2 font-mono text-xs">
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2 py-6">
              <Zap size={20} className="text-muted-foreground/60" />
              <p className="text-xs">Click "Run Pipeline Simulation" to visualize node execution telemetry.</p>
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedLogId(idx)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeLog === log
                    ? 'bg-primary/10 border-primary/40 text-foreground'
                    : 'bg-background/60 border-border/40 hover:border-border text-muted-foreground'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-semibold text-foreground">{log.nodeTitle}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{log.durationMs}ms</span>
                  {log.tokensUsed && <span>{log.tokensUsed} tokens</span>}
                  <ChevronRight size={12} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Selected Payload JSON Viewer */}
        <div className="p-3 bg-background/40 overflow-y-auto font-mono text-[11px] space-y-2">
          {activeLog ? (
            <div>
              <div className="flex items-center justify-between text-muted-foreground border-b border-border/40 pb-1.5 mb-2">
                <span className="font-semibold text-foreground">{activeLog.nodeTitle} Payload</span>
                <span>Timestamp: {activeLog.timestamp}</span>
              </div>
              <pre className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(
                  {
                    input: activeLog.inputPayload,
                    output: activeLog.outputPayload,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
              Select a step log on the left to inspect input/output JSON payload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
