import React from 'react';
import { X, Bot, Zap, GitBranch, Sliders, Code, Globe, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import type { WorkflowNode } from '../types';

interface NodeInspectorDrawerProps {
  node: WorkflowNode | null;
  onClose: () => void;
  onUpdateNode: (updatedNode: WorkflowNode) => void;
  onDeleteNode: (nodeId: string) => void;
}

export function NodeInspectorDrawer({
  node,
  onClose,
  onUpdateNode,
  onDeleteNode,
}: NodeInspectorDrawerProps) {
  if (!node) return null;

  const handleConfigChange = (key: string, value: any) => {
    onUpdateNode({
      ...node,
      config: {
        ...node.config,
        [key]: value,
      },
    });
  };

  const handleTitleChange = (newTitle: string) => {
    onUpdateNode({
      ...node,
      title: newTitle,
    });
  };

  return (
    <div className="w-96 bg-card border-l border-border/60 h-full flex flex-col justify-between shadow-2xl z-20 overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-5 border-b border-border/50 flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
              node.type === 'trigger'
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                : node.type === 'agent'
                ? 'bg-primary/10 text-primary border-primary/20'
                : node.type === 'condition'
                ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            }`}
          >
            {node.type === 'trigger' ? (
              <Zap size={18} />
            ) : node.type === 'agent' ? (
              <Bot size={18} />
            ) : node.type === 'condition' ? (
              <GitBranch size={18} />
            ) : (
              <Globe size={18} />
            )}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {node.type} Node
            </span>
            <input
              type="text"
              value={node.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="font-bold text-sm text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none w-full transition-all"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Configuration Body */}
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Node Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50 text-xs">
          <span className="text-muted-foreground font-medium">Node Execution State</span>
          <span className="capitalize font-semibold text-emerald-500 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> {node.status}
          </span>
        </div>

        {/* Node Type Specific Configurations */}
        {node.type === 'agent' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Assigned LLM Model</label>
              <select
                value={node.config.model || 'Claude 3.5 Sonnet'}
                onChange={(e) => handleConfigChange('model', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              >
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="GPT-4o">GPT-4o</option>
                <option value="GPT-4o-mini">GPT-4o-mini</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">System Prompt Override</label>
              <textarea
                rows={4}
                value={node.config.prompt || ''}
                onChange={(e) => handleConfigChange('prompt', e.target.value)}
                placeholder="Enter prompt instructions for this node..."
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all leading-relaxed resize-none"
              />
            </div>
          </div>
        )}

        {node.type === 'trigger' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Webhook Endpoint URL</label>
              <input
                type="text"
                value={node.config.webhookUrl || 'https://api.vibeagent.io/v1/webhooks/trigger-01'}
                onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
          </div>
        )}

        {node.type === 'condition' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Condition Field</label>
              <input
                type="text"
                value={node.config.conditionField || 'payload.sentimentScore'}
                onChange={(e) => handleConfigChange('conditionField', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Operator</label>
                <select
                  value={node.config.conditionOperator || '>'}
                  onChange={(e) => handleConfigChange('conditionOperator', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                >
                  <option value=">">Greater than (&gt;)</option>
                  <option value="<">Less than (&lt;)</option>
                  <option value="==">Equals (==)</option>
                  <option value="!=">Not equals (!=)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Threshold Value</label>
                <input
                  type="text"
                  value={node.config.conditionValue || '0.8'}
                  onChange={(e) => handleConfigChange('conditionValue', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Retry & Timeout Controls */}
        <div className="pt-4 border-t border-border/40 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Execution Bounds</h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Max Retries</label>
              <input
                type="number"
                min="0"
                max="5"
                value={node.config.retryCount ?? 3}
                onChange={(e) => handleConfigChange('retryCount', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Timeout (sec)</label>
              <input
                type="number"
                min="5"
                max="300"
                value={node.config.timeoutSeconds ?? 30}
                onChange={(e) => handleConfigChange('timeoutSeconds', parseInt(e.target.value) || 30)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Delete */}
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <button
          onClick={() => onDeleteNode(node.id)}
          className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Trash2 size={14} />
          <span>Delete Node from Canvas</span>
        </button>
      </div>
    </div>
  );
}
