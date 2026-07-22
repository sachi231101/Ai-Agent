import React, { useState, useRef } from 'react';
import {
  Zap,
  Bot,
  GitBranch,
  Globe,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Move,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import type { WorkflowNode, WorkflowEdge } from '../types';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNodePosition: (nodeId: string, pos: { x: number; y: number }) => void;
  onAddNode: (type: WorkflowNode['type']) => void;
}

export function WorkflowCanvas({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onUpdateNodePosition,
  onAddNode,
}: WorkflowCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle Dragging
  const handleMouseDown = (node: WorkflowNode, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectNode(node.id);
    setDraggingNodeId(node.id);
    setDragOffset({
      x: e.clientX - node.position.x * zoom,
      y: e.clientY - node.position.y * zoom,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId) return;
    const newX = (e.clientX - dragOffset.x) / zoom;
    const newY = (e.clientY - dragOffset.y) / zoom;
    onUpdateNodePosition(draggingNodeId, { x: Math.max(20, newX), y: Math.max(20, newY) });
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative flex-1 w-full h-full bg-[#0d0c14] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
      }}
    >
      {/* Canvas Top Action Palette */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-card/80 backdrop-blur-md p-1.5 rounded-2xl border border-border/60 shadow-lg">
        <span className="text-[11px] font-bold text-muted-foreground px-2">Add Node:</span>
        <button
          onClick={() => onAddNode('trigger')}
          className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Zap size={13} /> Trigger
        </button>
        <button
          onClick={() => onAddNode('agent')}
          className="px-2.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Bot size={13} /> AI Agent
        </button>
        <button
          onClick={() => onAddNode('condition')}
          className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <GitBranch size={13} /> Condition
        </button>
        <button
          onClick={() => onAddNode('webhook')}
          className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Globe size={13} /> Webhook
        </button>
      </div>

      {/* Canvas Zoom Controls */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-card/80 backdrop-blur-md p-1 rounded-xl border border-border/60 shadow-lg text-xs font-medium">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
        >
          <ZoomOut size={14} />
        </button>
        <span className="px-2 font-mono text-[11px] text-foreground">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          title="Reset Zoom"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Scaled Canvas Workspace Container */}
      <div
        className="w-full h-full relative origin-top-left transition-transform duration-75"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* SVG Curved Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const x1 = sourceNode.position.x + 220;
            const y1 = sourceNode.position.y + 40;
            const x2 = targetNode.position.x;
            const y2 = targetNode.position.y + 40;

            const dx = Math.abs(x2 - x1) * 0.5;
            const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            return (
              <g key={edge.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.4)"
                  strokeWidth="3"
                  className="transition-all"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#edgeGradient)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="animate-[dash_2s_linear_infinite]"
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          return (
            <div
              key={node.id}
              onMouseDown={(e) => handleMouseDown(node, e)}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
              }}
              className={`absolute w-56 p-4 rounded-2xl border transition-shadow cursor-grab active:cursor-grabbing z-10 bg-card/95 backdrop-blur-md ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/40 shadow-xl shadow-primary/10'
                  : 'border-border/60 hover:border-primary/50 shadow-md'
              }`}
            >
              {/* Node Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
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
                      <Zap size={14} />
                    ) : node.type === 'agent' ? (
                      <Bot size={14} />
                    ) : node.type === 'condition' ? (
                      <GitBranch size={14} />
                    ) : (
                      <Globe size={14} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground leading-none">{node.title}</h4>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">{node.subtitle}</span>
                  </div>
                </div>

                <span
                  className={`w-2 h-2 rounded-full ${
                    node.status === 'running'
                      ? 'bg-amber-500 animate-ping'
                      : node.status === 'success'
                      ? 'bg-emerald-500'
                      : 'bg-zinc-500'
                  }`}
                />
              </div>

              {/* Node Body Details */}
              {node.config.model && (
                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Model:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Sparkles size={10} className="text-amber-500" />
                    {node.config.model}
                  </span>
                </div>
              )}

              {/* Input/Output Connection Handles */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-card shadow-sm" />
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card shadow-sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
