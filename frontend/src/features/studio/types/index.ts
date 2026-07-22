export interface IntentDetectionResult {
  primaryIntent: string;
  businessDomain: string;
  expectedGoal: string;
  expectedOutcome: string;
  confidenceScore: number; // 0 - 100
}

export interface ExtractedRequirements {
  goal: string;
  tasks: string[];
  requiredIntegrations: string[];
  requiredPermissions: string[];
  requiredCapabilities: string[];
  inputs: string[];
  outputs: string[];
  unknownInformation: string[];
}

export interface ClarificationOption {
  label: string;
  value: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  category: 'integration' | 'trigger' | 'permission' | 'scope' | 'general';
  options: ClarificationOption[];
  answered?: boolean;
  selectedOption?: string;
}

export type ThinkingStage =
  | 'idle'
  | 'understanding'
  | 'analyzing'
  | 'identifying_missing'
  | 'selecting_integrations'
  | 'designing_agent'
  | 'preparing_deployment'
  | 'complete';

export interface ThinkingStageInfo {
  key: ThinkingStage;
  label: string;
  detail: string;
}

export interface AgentSpecificationTool {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface AgentSpecification {
  agentName: string;
  summary?: string;
  purpose?: string;
  description?: string;
  systemPrompt?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responsibilities?: string[];
  capabilities?: string[];
  requiredIntegrations?: string[];
  permissions?: string[];
  memoryStrategy?: string;
  triggerStrategy?: string;
  memoryType?: string;
  expectedInputs?: string[];
  expectedOutputs?: string[];
  tools?: AgentSpecificationTool[];
  subAgents?: string[];
  version: number | string;
}

export interface ReadinessChecklist {
  goalUnderstood: boolean;
  requirementsComplete: boolean;
  integrationsSelected: boolean;
  permissionsIdentified: boolean;
  agentDesigned: boolean;
  readinessScore: number; // 0 - 100
  isReady: boolean;
}

export interface EditHistoryEntry {
  id: string;
  timestamp: Date;
  instruction: string;
  changeSummary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
  clarificationQuestion?: ClarificationQuestion;
  explanationText?: string;
  isThinkingMessage?: boolean;
}
