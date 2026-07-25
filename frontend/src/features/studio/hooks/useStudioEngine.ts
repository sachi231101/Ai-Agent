/**
 * useStudioEngine — AI Conversation Engine Hook
 *
 * This is the single source of truth for all Studio AI Conversation state.
 * It replaces the previous local mock implementation with real backend API calls.
 *
 * Architecture:
 *   StudioCanvas (View) → useStudioEngine (State & Logic) → conversationApi (HTTP) → Backend Pipeline
 *
 * Responsibilities:
 *   - Conversation lifecycle: create, persist, reset
 *   - Message state: optimistic user message → confirmed response
 *   - Pipeline metadata: stage, readiness, warnings, improvements
 *   - Specification: populated when backend pipeline is complete
 *   - Clarification: question, options, answer submission
 *   - Error handling: graceful fallback messages
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { conversationApi } from '@/services/api/conversation.api';
import type {
  ProcessMessageResponse,
  AgentSpecificationData,
} from '@/services/api/conversation.api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StudioMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  /** Pipeline stage that produced this message (e.g. 'CLARIFICATION') */
  stage?: string;
  /** Ordered clarification options the user can click */
  options?: string[];
  /** Risk/conflict warnings from the ConflictService */
  warnings?: WarningItem[];
  /** Proactive improvements from the ImprovementService */
  improvements?: ImprovementItem[];
  /** Whether this message came with a clarification question */
  hasQuestion?: boolean;
  /** The clarification question text */
  question?: string | null;
  /** Whether the clarification question has been answered */
  questionAnswered?: boolean;
  /** True while we're waiting for API response (optimistic message) */
  isOptimistic?: boolean;
}

export interface WarningItem {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  mitigation: string;
}

export interface ImprovementItem {
  id: string;
  category: string;
  title: string;
  description: string;
  valueAdd: string;
}

export interface ReadinessScore {
  businessUnderstanding: number;
  requirementCompleteness: number;
  securityReadiness: number;
  deploymentReadiness: number;
  integrationReadiness: number;
  conversationCompleteness: number;
  overall: number;
}

// ─── Pipeline Stage Display Labels ───────────────────────────────────────────

export const PIPELINE_STAGE_LABELS: Record<string, string> = {
  INTENT_DETECTION: 'Understanding your idea...',
  REQUIREMENT_GATHERING: 'Identifying requirements...',
  CLARIFICATION: 'Asking for details...',
  PLANNING: 'Designing your agent...',
  SPECIFICATION_GENERATED: 'Agent ready!',
  ERROR: 'Something went wrong',
};

export const PIPELINE_STAGE_STEP: Record<string, number> = {
  INTENT_DETECTION: 1,
  REQUIREMENT_GATHERING: 2,
  CLARIFICATION: 3,
  PLANNING: 4,
  SPECIFICATION_GENERATED: 5,
  ERROR: 0,
};

// ─── Thinking Stages List (for IntelligenceCenterPanel animation) ─────────────

export const THINKING_STAGES_LIST = [
  { key: 'understanding',          label: 'Understanding Intent',          detail: 'NLP parsing...' },
  { key: 'analyzing',              label: 'Analyzing Requirements',         detail: 'Extracting needs...' },
  { key: 'identifying_missing',    label: 'Identifying Gaps',              detail: 'Gap analysis...' },
  { key: 'selecting_integrations', label: 'Selecting Integrations',        detail: 'Matching APIs...' },
  { key: 'designing_agent',        label: 'Designing Agent Architecture',  detail: 'Blueprint gen...' },
  { key: 'preparing_deployment',   label: 'Preparing Deployment',          detail: 'Finalizing spec...' },
] as const;

// ─── Default State ────────────────────────────────────────────────────────────

const DEFAULT_READINESS: ReadinessScore = {
  businessUnderstanding: 0,
  requirementCompleteness: 0,
  securityReadiness: 0,
  deploymentReadiness: 0,
  integrationReadiness: 0,
  conversationCompleteness: 0,
  overall: 0,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseStudioEngineOptions {
  /** If provided, the hook will immediately send this as the first message after creating the conversation */
  initialPrompt?: string;
}

export function useStudioEngine(options: UseStudioEngineOptions = {}) {
  const { initialPrompt } = options;

  // Core conversation state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<StudioMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<string>('INTENT_DETECTION');
  const [readiness, setReadiness] = useState<ReadinessScore>(DEFAULT_READINESS);
  const [specification, setSpecification] = useState<AgentSpecificationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Ref to prevent double initialization in React StrictMode
  const initRef = useRef(false);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  /** Maps the raw API response to a StudioMessage for the assistant */
  const mapResponseToAiMessage = useCallback(
    (res: ProcessMessageResponse): StudioMessage => ({
      id: res.aiMessage.id,
      role: 'ai',
      text: res.aiMessage.content,
      timestamp: new Date(res.aiMessage.createdAt),
      stage: res.currentStage,
      options: res.options ?? [],
      warnings: (res.warnings ?? []) as WarningItem[],
      improvements: (res.improvements ?? []) as ImprovementItem[],
      hasQuestion: res.needsClarification,
      question: res.question,
      questionAnswered: false,
    }),
    []
  );

  /** Applies a backend pipeline response to all state slices */
  const applyResponse = useCallback(
    (res: ProcessMessageResponse) => {
      setCurrentStage(res.currentStage);

      if (res.readiness) {
        setReadiness(res.readiness as ReadinessScore);
      }

      if (res.specification) {
        setSpecification(res.specification);
      }

      const aiMsg = mapResponseToAiMessage(res);

      setMessages((prev) => {
        // Replace the optimistic user message with the confirmed one, then append AI message
        const withoutOptimistic = prev.filter((m) => !m.isOptimistic);
        const confirmedUser: StudioMessage = {
          id: res.userMessage.id,
          role: 'user',
          text: res.userMessage.content,
          timestamp: new Date(res.userMessage.createdAt),
        };
        return [...withoutOptimistic, confirmedUser, aiMsg];
      });
    },
    [mapResponseToAiMessage]
  );

  // ─── Initialize: Create Conversation + Optional First Message ───────────────

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    let isMounted = true;

    async function initialize() {
      try {
        setIsInitializing(true);
        setError(null);

        const title = initialPrompt?.slice(0, 50) || 'New AI Agent Session';
        const conv = await conversationApi.createConversation(title);

        if (!isMounted) return;
        setConversationId(conv.id);

        if (initialPrompt?.trim()) {
          // Optimistic user message
          const optimisticUser: StudioMessage = {
            id: `opt-${Date.now()}`,
            role: 'user',
            text: initialPrompt,
            timestamp: new Date(),
            isOptimistic: true,
          };
          setMessages([optimisticUser]);
          setIsProcessing(true);

          const res = await conversationApi.sendMessage(conv.id, initialPrompt);
          if (!isMounted) return;
          applyResponse(res);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message ?? 'Failed to initialize conversation');
        }
      } finally {
        if (isMounted) {
          setIsProcessing(false);
          setIsInitializing(false);
        }
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
  }, []); // Intentionally empty — run once on mount

  // ─── sendMessage: Core user input handler ───────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isProcessing) return;

      setError(null);

      // Ensure we have a conversation (should always exist after init)
      let cid = conversationId;
      if (!cid) {
        try {
          const conv = await conversationApi.createConversation('New AI Agent Session');
          setConversationId(conv.id);
          cid = conv.id;
        } catch (err: any) {
          setError(err?.message ?? 'Failed to create conversation');
          return;
        }
      }

      // Optimistic: immediately show user message in UI
      const optimisticId = `opt-${Date.now()}`;
      const optimisticMsg: StudioMessage = {
        id: optimisticId,
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
        isOptimistic: true,
      };
      setMessages((prev) => [...prev, optimisticMsg]);
      setIsProcessing(true);

      try {
        let res: ProcessMessageResponse;
        try {
          res = await conversationApi.sendMessage(cid, trimmed);
        } catch (apiErr: any) {
          const isNotFound = apiErr?.response?.status === 404 || apiErr?.message?.toLowerCase().includes('not found');
          if (isNotFound) {
            // Auto-recovery: create new conversation and retry
            const newConv = await conversationApi.createConversation(trimmed.slice(0, 50) || 'New AI Agent Session');
            setConversationId(newConv.id);
            res = await conversationApi.sendMessage(newConv.id, trimmed);
          } else {
            throw apiErr;
          }
        }

        // Mark previous clarification question as answered
        setMessages((prev) =>
          prev.map((m) =>
            m.hasQuestion && !m.questionAnswered ? { ...m, questionAnswered: true } : m
          )
        );

        applyResponse(res);
      } catch (err: any) {
        // Remove optimistic message on failure and show error bubble
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticId),
          {
            id: `err-${Date.now()}`,
            role: 'ai',
            text: `⚠️ ${err?.message ?? 'Something went wrong. Please try again.'}`,
            timestamp: new Date(),
          },
        ]);
        setError(err?.message ?? 'Unknown error');
      } finally {
        setIsProcessing(false);
      }
    },
    [conversationId, isProcessing, applyResponse]
  );

  // ─── answerClarification: User clicks an option chip ────────────────────────

  const answerClarification = useCallback(
    (questionMessageId: string, optionValue: string) => {
      // Mark question as answered in the message
      setMessages((prev) =>
        prev.map((m) =>
          m.id === questionMessageId ? { ...m, questionAnswered: true } : m
        )
      );
      // Send the selected option as a regular message
      sendMessage(optionValue);
    },
    [sendMessage]
  );

  // ─── resetConversation: Start fresh ─────────────────────────────────────────

  const resetConversation = useCallback(async () => {
    initRef.current = false;
    setMessages([]);
    setConversationId(null);
    setCurrentStage('INTENT_DETECTION');
    setReadiness(DEFAULT_READINESS);
    setSpecification(null);
    setError(null);
    setIsProcessing(false);
    setIsInitializing(true);

    // Create a fresh conversation
    try {
      const conv = await conversationApi.createConversation('New AI Agent Session');
      setConversationId(conv.id);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to reset conversation');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  // ─── Derived state ────────────────────────────────────────────────────────

  const currentStepNumber = PIPELINE_STAGE_STEP[currentStage] ?? 1;
  const stageLabel = PIPELINE_STAGE_LABELS[currentStage] ?? 'Processing...';
  const isComplete = currentStage === 'SPECIFICATION_GENERATED';

  // Pending clarification: last AI message that has an unanswered question
  const pendingClarification = messages
    .filter((m) => m.role === 'ai' && m.hasQuestion && !m.questionAnswered)
    .at(-1) ?? null;

  return {
    // State
    conversationId,
    messages,
    isProcessing,
    isInitializing,
    currentStage,
    currentStepNumber,
    stageLabel,
    readiness,
    specification,
    isComplete,
    error,
    pendingClarification,
    // Actions
    sendMessage,
    answerClarification,
    resetConversation,
  };
}
