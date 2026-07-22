export type NodeType = 'trigger' | 'agent' | 'condition' | 'transformer' | 'action' | 'webhook';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  position: { x: number; y: number };
  status: 'idle' | 'running' | 'success' | 'error';
  config: {
    agentId?: string;
    model?: string;
    prompt?: string;
    webhookUrl?: string;
    conditionField?: string;
    conditionOperator?: string;
    conditionValue?: string;
    retryCount?: number;
    timeoutSeconds?: number;
    [key: string]: any;
  };
  inputs: string[];
  outputs: string[];
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  status?: 'idle' | 'active' | 'success' | 'error';
}

export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  lastRun: string;
  triggerType: 'Webhook' | 'Schedule' | 'Event' | 'Manual';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface ExecutionStepLog {
  nodeId: string;
  nodeTitle: string;
  timestamp: string;
  status: 'running' | 'success' | 'error';
  durationMs: number;
  inputPayload: Record<string, any>;
  outputPayload: Record<string, any>;
  tokensUsed?: number;
}
