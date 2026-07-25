import { apiClient } from '@/lib/axios';

export interface ConversationData {
  id: string;
  title: string | null;
  status: string;
  userId: string;
  workspaceId: string | null;
  createdAt: string;
  updatedAt: string;
  state?: {
    currentStage: string;
    latestIntent: any;
    extractedRequirements: any;
    askedQuestions: string[];
    isComplete: boolean;
  };
}

export interface MessageData {
  id: string;
  conversationId: string;
  sender: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface AgentSpecificationData {
  id: string;
  conversationId: string;
  name: string;
  description: string | null;
  version: string;
  spec: any;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessMessageResponse {
  conversationId: string;
  userMessage: MessageData;
  aiMessage: MessageData;
  currentStage: string;
  needsClarification: boolean;
  question: string | null;
  options?: string[];
  warnings?: Array<{
    type: string;
    severity: string;
    title: string;
    description: string;
    mitigation: string;
  }>;
  improvements?: Array<{
    id: string;
    category: string;
    title: string;
    description: string;
    valueAdd: string;
  }>;
  readiness?: {
    businessUnderstanding: number;
    requirementCompleteness: number;
    securityReadiness: number;
    deploymentReadiness: number;
    integrationReadiness: number;
    conversationCompleteness: number;
    overall: number;
  };
  specification: AgentSpecificationData | null;
}

export const conversationApi = {
  createConversation: async (initialTitle?: string, workspaceId?: string): Promise<ConversationData> => {
    const res = await apiClient.post('/conversations', { initialTitle, workspaceId });
    return res.data.data;
  },

  sendMessage: async (conversationId: string, content: string): Promise<ProcessMessageResponse> => {
    const res = await apiClient.post('/chat/message', { conversationId, content });
    return res.data.data;
  },

  getConversation: async (id: string): Promise<ConversationData> => {
    const res = await apiClient.get(`/conversation/${id}`);
    return res.data.data;
  },

  getMessages: async (id: string): Promise<MessageData[]> => {
    const res = await apiClient.get(`/conversation/${id}/messages`);
    return res.data.data;
  },

  getSpecification: async (id: string): Promise<AgentSpecificationData | null> => {
    const res = await apiClient.get(`/conversation/${id}/specification`);
    return res.data.data;
  },
};
