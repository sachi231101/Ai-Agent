import React, { useState } from 'react';
import {
  GitFork,
  Plus,
  Play,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Zap,
  Globe,
  Settings,
  ChevronDown,
  CheckCircle2,
  Sliders,
  FolderGit2,
  RefreshCw,
} from 'lucide-react';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { NodeInspectorDrawer } from '../components/NodeInspectorDrawer';
import { ExecutionSimulatorPanel } from '../components/ExecutionSimulatorPanel';
import type { WorkflowNode, WorkflowEdge, WorkflowItem, ExecutionStepLog } from '../types';
import { useWorkflowsList, useCreateWorkflow, useDeleteWorkflow } from '../hooks/useWorkflows';

export default function WorkflowsPage() {
  const { data: apiWorkflows, isLoading, refetch } = useWorkflowsList();
  const createWorkflowMutation = useCreateWorkflow();
  const deleteWorkflowMutation = useDeleteWorkflow();

  const [localWorkflows, setLocalWorkflows] = useState<WorkflowItem[]>([]);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<ExecutionStepLog[]>([]);

  // Array of workflows from backend or local edits
  const workflows: WorkflowItem[] =
    Array.isArray(apiWorkflows) && apiWorkflows.length > 0
      ? (apiWorkflows as any)
      : localWorkflows;

  const currentWorkflow =
    workflows.find((w) => w.id === activeWorkflowId) ||
    workflows[0] || {
      id: 'empty',
      name: 'Empty Workflow Canvas',
      description: 'Create a new workflow pipeline to begin editing DAG nodes.',
      status: 'draft',
      lastRun: 'Never',
      triggerType: 'Manual',
      nodes: [],
      edges: [],
    };

  // Update node position
  const handleUpdateNodePosition = (nodeId: string, pos: { x: number; y: number }) => {
    setLocalWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== currentWorkflow.id) return wf;
        return {
          ...wf,
          nodes: wf.nodes.map((n) => (n.id === nodeId ? { ...n, position: pos } : n)),
        };
      })
    );
  };

  // Update node config
  const handleUpdateNode = (updatedNode: WorkflowNode) => {
    setLocalWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== currentWorkflow.id) return wf;
        return {
          ...wf,
          nodes: wf.nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)),
        };
      })
    );
  };

  // Delete node
  const handleDeleteNode = (nodeId: string) => {
    setLocalWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== currentWorkflow.id) return wf;
        return {
          ...wf,
          nodes: wf.nodes.filter((n) => n.id !== nodeId),
          edges: wf.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        };
      })
    );
    setSelectedNodeId(null);
  };

  // Add new node to canvas
  const handleAddNode = (type: WorkflowNode['type']) => {
    const newId = `node-${Date.now()}`;
    const newNode: WorkflowNode = {
      id: newId,
      type,
      title: `${type.toUpperCase()} Node`,
      subtitle: 'Configurable pipeline step',
      position: { x: 200 + Math.random() * 100, y: 150 + Math.random() * 50 },
      status: 'idle',
      config: { model: 'Claude 3.5 Sonnet' },
      inputs: [],
      outputs: [],
    };

    if (workflows.length === 0) {
      const newWf: WorkflowItem = {
        id: `wf-${Date.now()}`,
        name: 'New Multi-Agent Workflow',
        description: 'Autonomous DAG pipeline canvas.',
        status: 'draft',
        lastRun: 'Never',
        triggerType: 'Manual',
        nodes: [newNode],
        edges: [],
      };
      setLocalWorkflows([newWf]);
      setActiveWorkflowId(newWf.id);
    } else {
      setLocalWorkflows((prev) =>
        prev.map((wf) => {
          if (wf.id !== currentWorkflow.id) return wf;
          return {
            ...wf,
            nodes: [...wf.nodes, newNode],
          };
        })
      );
    }
    setSelectedNodeId(newId);
  };

  // Run Simulation
  const handleStartSimulation = () => {
    if (currentWorkflow.nodes.length === 0) return;
    setIsSimulating(true);
    setSimulationLogs([]);

    currentWorkflow.nodes.forEach((node, index) => {
      setTimeout(() => {
        const stepLog: ExecutionStepLog = {
          nodeId: node.id,
          nodeTitle: node.title,
          timestamp: new Date().toLocaleTimeString(),
          status: 'success',
          durationMs: Math.floor(200 + Math.random() * 600),
          inputPayload: { trigger: 'webhook_event', nodeId: node.id },
          outputPayload: { status: 'completed', result: `${node.title} executed successfully.` },
          tokensUsed: node.type === 'agent' ? Math.floor(400 + Math.random() * 800) : undefined,
        };
        setSimulationLogs((prev) => [...prev, stepLog]);

        if (index === currentWorkflow.nodes.length - 1) {
          setIsSimulating(false);
        }
      }, (index + 1) * 900);
    });
  };

  const selectedNode = currentWorkflow.nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col bg-background text-foreground overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-3 border-b border-border/50 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
            <GitFork size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {workflows.length > 0 ? (
                <select
                  value={currentWorkflow.id}
                  onChange={(e) => setActiveWorkflowId(e.target.value)}
                  className="font-bold text-sm bg-transparent border-none focus:outline-none cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {workflows.map((w) => (
                    <option key={w.id} value={w.id} className="bg-card text-foreground">
                      {w.name}
                    </option>
                  ))}
                </select>
              ) : (
                <h2 className="font-bold text-sm text-foreground">Workflows Canvas</h2>
              )}
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {currentWorkflow.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{currentWorkflow.description}</p>
          </div>
        </div>

        {/* Workflow Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="p-2 rounded-xl border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            title="Refresh Workflows from Backend"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating || currentWorkflow.nodes.length === 0}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Play size={14} />
            <span>{isSimulating ? 'Simulating...' : 'Simulate Workflow'}</span>
          </button>
          <button
            onClick={() => {
              const name = prompt('Enter new workflow title:');
              if (!name) return;
              const newWf: WorkflowItem = {
                id: `wf-${Date.now()}`,
                name,
                description: 'Custom multi-agent DAG pipeline.',
                status: 'draft',
                lastRun: 'Never',
                triggerType: 'Manual',
                nodes: [],
                edges: [],
              };
              setLocalWorkflows((prev) => [...prev, newWf]);
              setActiveWorkflowId(newWf.id);
              createWorkflowMutation.mutate(newWf);
            }}
            className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus size={14} />
            <span>New Workflow</span>
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        <WorkflowCanvas
          nodes={currentWorkflow.nodes}
          edges={currentWorkflow.edges}
          selectedNodeId={selectedNodeId}
          onSelectNode={(id) => setSelectedNodeId(id)}
          onUpdateNodePosition={handleUpdateNodePosition}
          onAddNode={handleAddNode}
        />

        {selectedNode && (
          <NodeInspectorDrawer
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
          />
        )}
      </div>

      {/* Bottom Telemetry Simulator Drawer */}
      <ExecutionSimulatorPanel
        logs={simulationLogs}
        isSimulating={isSimulating}
        onStartSimulation={handleStartSimulation}
        onStopSimulation={() => setIsSimulating(false)}
        onResetSimulation={() => setSimulationLogs([])}
      />
    </div>
  );
}
