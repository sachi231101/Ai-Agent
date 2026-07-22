import { useState, useCallback, useRef } from 'react';
import type {
  ChatMessage,
  IntentDetectionResult,
  ExtractedRequirements,
  ClarificationQuestion,
  ThinkingStage,
  ThinkingStageInfo,
  AgentSpecification,
  ReadinessChecklist,
  EditHistoryEntry,
} from '../types';

export const THINKING_STAGES_LIST: ThinkingStageInfo[] = [
  { key: 'understanding', label: 'Understanding your goal...', detail: 'Reading what you want your AI Agent to accomplish' },
  { key: 'analyzing', label: 'Planning agent tasks...', detail: 'Listing automated steps and rules for your agent' },
  { key: 'identifying_missing', label: 'Checking needed connections...', detail: 'Finding which apps or login keys are required' },
  { key: 'selecting_integrations', label: 'Connecting your apps...', detail: 'Linking tools like Zendesk, Gmail, Slack, & Google Drive' },
  { key: 'designing_agent', label: 'Building your AI Agent...', detail: 'Setting tone of voice, instructions, and safety rules' },
  { key: 'preparing_deployment', label: 'Getting ready to launch...', detail: 'Testing safety controls and 1-click launch readiness' },
];

const DEFAULT_INTENT: IntentDetectionResult = {
  primaryIntent: 'Pending User Prompt',
  businessDomain: 'General Automation',
  expectedGoal: 'Describe an AI agent requirement to start design',
  expectedOutcome: 'Automated workflow ready for deployment',
  confidenceScore: 0,
};

const DEFAULT_REQUIREMENTS: ExtractedRequirements = {
  goal: 'Waiting for prompt...',
  tasks: [],
  requiredIntegrations: [],
  requiredPermissions: [],
  requiredCapabilities: [],
  inputs: [],
  outputs: [],
  unknownInformation: ['Primary trigger schedule', 'Target destination service'],
};

const DEFAULT_SPEC: AgentSpecification = {
  agentName: 'Unconfigured AI Agent',
  summary: 'Describe what you need in plain English, and your AI Solutions Architect will generate the complete design.',
  purpose: 'Awaiting architectural specification',
  responsibilities: ['Awaiting requirements'],
  capabilities: ['Natural Language Understanding', 'Task Execution'],
  requiredIntegrations: ['Standard Web APIs'],
  permissions: ['read:workspace'],
  memoryStrategy: 'Contextual Session Memory (30-day window)',
  triggerStrategy: 'On-Demand Webhook / Manual Trigger',
  expectedInputs: ['Natural language command payload'],
  expectedOutputs: ['Structured execution summary'],
  version: 1,
};

const DEFAULT_READINESS: ReadinessChecklist = {
  goalUnderstood: false,
  requirementsComplete: false,
  integrationsSelected: false,
  permissionsIdentified: false,
  agentDesigned: false,
  readinessScore: 10,
  isReady: false,
};

export function useStudioEngine() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [intent, setIntent] = useState<IntentDetectionResult>(DEFAULT_INTENT);
  const [requirements, setRequirements] = useState<ExtractedRequirements>(DEFAULT_REQUIREMENTS);
  const [currentStage, setCurrentStage] = useState<ThinkingStage>('idle');
  const [activeClarification, setActiveClarification] = useState<ClarificationQuestion | null>(null);
  const [agentSpec, setAgentSpec] = useState<AgentSpecification | null>(null);
  const [explanationText, setExplanationText] = useState<string>('');
  const [readiness, setReadiness] = useState<ReadinessChecklist>(DEFAULT_READINESS);
  const [editHistory, setEditHistory] = useState<EditHistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const activeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to run step-by-step thinking animation
  const runThinkingSequence = (onComplete: () => void) => {
    setIsProcessing(true);
    let stageIdx = 0;
    setCurrentStage(THINKING_STAGES_LIST[0].key);

    const advanceStage = () => {
      stageIdx++;
      if (stageIdx < THINKING_STAGES_LIST.length) {
        setCurrentStage(THINKING_STAGES_LIST[stageIdx].key);
        activeTimeoutRef.current = setTimeout(advanceStage, 450);
      } else {
        setCurrentStage('complete');
        setIsProcessing(false);
        onComplete();
      }
    };

    activeTimeoutRef.current = setTimeout(advanceStage, 450);
  };

  // Process User Input
  const processUserInput = useCallback(
    (userInputText: string) => {
      if (!userInputText.trim() || isProcessing) return;

      const userMsgId = `u-${Date.now()}`;
      const newMsg: ChatMessage = {
        id: userMsgId,
        role: 'user',
        text: userInputText.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMsg]);
      const lower = userInputText.toLowerCase();

      // Check if user is editing an existing specification conversational-style
      if (agentSpec && (lower.includes('also') || lower.includes('only') || lower.includes('add') || lower.includes('change') || lower.includes('update') || lower.includes('run') || lower.includes('notify'))) {
        handleConversationalEdit(userInputText);
        return;
      }

      // Check for ambiguous prompt needing clarification first
      const needsEmailClarification = (lower.includes('email') || lower.includes('inbox') || lower.includes('mail')) && !lower.includes('gmail') && !lower.includes('outlook') && !lower.includes('sendgrid');
      const needsNotificationClarification = (lower.includes('notify') || lower.includes('alert') || lower.includes('digest')) && !lower.includes('slack') && !lower.includes('teams') && !lower.includes('discord');

      if (needsEmailClarification) {
        runThinkingSequence(() => {
          const clarificationQ: ClarificationQuestion = {
            id: `q-${Date.now()}`,
            question: 'Which email service does your organization use?',
            category: 'integration',
            options: [
              { label: 'Google Gmail', value: 'Google Gmail' },
              { label: 'Microsoft Outlook', value: 'Microsoft Outlook' },
              { label: 'Custom SMTP / IMAP', value: 'Custom SMTP' },
              { label: 'Other Service', value: 'Other' },
            ],
          };

          setActiveClarification(clarificationQ);
          setIntent({
            primaryIntent: 'Email Automation & Processing',
            businessDomain: 'Productivity & Communication',
            expectedGoal: 'Process inbox emails and extract key updates',
            expectedOutcome: 'Structured email summaries delivered automatically',
            confidenceScore: 82,
          });

          setRequirements({
            goal: 'Monitor and summarize email communications',
            tasks: ['Connect to mail server', 'Parse incoming unread messages', 'Extract actionable items'],
            requiredIntegrations: ['Email API (Pending Selection)'],
            requiredPermissions: ['read:messages'],
            requiredCapabilities: ['Natural Language Summarization', 'Key Entity Extraction'],
            inputs: ['User Inbox Feed'],
            outputs: ['Formatted Executive Digest'],
            unknownInformation: ['Specific Email Provider'],
          });

          setReadiness({
            goalUnderstood: true,
            requirementsComplete: false,
            integrationsSelected: false,
            permissionsIdentified: true,
            agentDesigned: false,
            readinessScore: 45,
            isReady: false,
          });

          const aiMsg: ChatMessage = {
            id: `a-${Date.now()}`,
            role: 'ai',
            text: "I understand you want to build an email intelligence agent! To tailor the OAuth permissions and integration adapters, could you specify your email provider?",
            timestamp: new Date(),
            clarificationQuestion: clarificationQ,
          };
          setMessages((prev) => [...prev, aiMsg]);
        });
        return;
      }

      if (needsNotificationClarification) {
        runThinkingSequence(() => {
          const clarificationQ: ClarificationQuestion = {
            id: `q-${Date.now()}`,
            question: 'Where should your AI Agent deliver reports and notifications?',
            category: 'integration',
            options: [
              { label: 'Slack Channel', value: 'Slack' },
              { label: 'Microsoft Teams', value: 'Microsoft Teams' },
              { label: 'Email Digest', value: 'Email Digest' },
              { label: 'Custom Webhook', value: 'Custom Webhook' },
            ],
          };

          setActiveClarification(clarificationQ);
          setIntent({
            primaryIntent: 'Automated Alerting & Reporting',
            businessDomain: 'Team Collaboration',
            expectedGoal: 'Deliver intelligent updates to target team channels',
            expectedOutcome: 'Real-time alert dispatch upon key event triggers',
            confidenceScore: 85,
          });

          setRequirements({
            goal: 'Deliver automated reports to team messaging platform',
            tasks: ['Format digest payload', 'Post update to designated channel'],
            requiredIntegrations: ['Notification Endpoint (Pending Selection)'],
            requiredPermissions: ['write:chat_messages'],
            requiredCapabilities: ['Message Formatting', 'Priority Filtering'],
            inputs: ['Event Data Stream'],
            outputs: ['Formatted Team Notification'],
            unknownInformation: ['Target Messaging Platform'],
          });

          setReadiness({
            goalUnderstood: true,
            requirementsComplete: false,
            integrationsSelected: false,
            permissionsIdentified: true,
            agentDesigned: false,
            readinessScore: 50,
            isReady: false,
          });

          const aiMsg: ChatMessage = {
            id: `a-${Date.now()}`,
            role: 'ai',
            text: "I have mapped out your reporting agent's core logic. Which channel or messaging platform should it send alerts to?",
            timestamp: new Date(),
            clarificationQuestion: clarificationQ,
          };
          setMessages((prev) => [...prev, aiMsg]);
        });
        return;
      }

      // Full automatic design sequence for specific prompts
      runThinkingSequence(() => {
        generateAgentFromPrompt(userInputText);
      });
    },
    [agentSpec, isProcessing]
  );

  // Clarification Answer Handler
  const handleAnswerClarification = useCallback(
    (questionId: string, optionValue: string) => {
      if (activeClarification?.id === questionId) {
        setActiveClarification((prev) => (prev ? { ...prev, answered: true, selectedOption: optionValue } : null));
      }

      const answerMsgId = `u-ans-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: answerMsgId,
          role: 'user',
          text: `Selected option: ${optionValue}`,
          timestamp: new Date(),
        },
      ]);

      // Resume thinking and build spec automatically
      runThinkingSequence(() => {
        const fullPrompt = `${messages[0]?.text || 'Email agent'} using ${optionValue}`;
        generateAgentFromPrompt(fullPrompt);
        setActiveClarification(null);
      });
    },
    [activeClarification, messages]
  );

  // Conversational Editing Handler (Step 7)
  const handleConversationalEdit = (editPrompt: string) => {
    runThinkingSequence(() => {
      if (!agentSpec) return;
      const lower = editPrompt.toLowerCase();
      const newIntegrations = [...agentSpec.requiredIntegrations];
      const newPermissions = [...agentSpec.permissions];
      const newResponsibilities = [...agentSpec.responsibilities];
      let newTrigger = agentSpec.triggerStrategy;

      if (lower.includes('teams') && !newIntegrations.includes('Microsoft Teams')) {
        newIntegrations.push('Microsoft Teams API');
        newPermissions.push('chat:write:teams');
      }
      if (lower.includes('slack') && !newIntegrations.includes('Slack Webhook')) {
        newIntegrations.push('Slack Webhook');
        newPermissions.push('channels:write:slack');
      }
      if (lower.includes('jira') && !newIntegrations.includes('Jira REST API')) {
        newIntegrations.push('Jira REST API');
        newPermissions.push('read:jira_issues');
      }
      if (lower.includes('unread')) {
        newResponsibilities.push('Filter out already read items to maintain zero clutter');
      }
      if (lower.includes('weekday')) {
        newTrigger = 'Cron Schedule (Every Weekday at 09:00 AM UTC)';
      } else if (lower.includes('hourly')) {
        newTrigger = 'Cron Schedule (Every Hour, 24/7)';
      }

      const updatedSpec: AgentSpecification = {
        ...agentSpec,
        requiredIntegrations: newIntegrations,
        permissions: newPermissions,
        responsibilities: newResponsibilities,
        triggerStrategy: newTrigger,
        version: agentSpec.version + 1,
      };

      setAgentSpec(updatedSpec);

      const editEntry: EditHistoryEntry = {
        id: `edit-${Date.now()}`,
        timestamp: new Date(),
        instruction: editPrompt,
        changeSummary: `Updated specification (v${updatedSpec.version}): adjusted integrations & triggers based on feedback.`,
      };
      setEditHistory((prev) => [editEntry, ...prev]);

      const simpleExplanation = `Your updated AI Agent will now execute on a ${newTrigger.toLowerCase()}, connecting with ${newIntegrations.join(', ')}. It ensures all permissions (${newPermissions.slice(0, 3).join(', ')}) are strictly respected.`;
      setExplanationText(simpleExplanation);

      const aiMsg: ChatMessage = {
        id: `a-edit-${Date.now()}`,
        role: 'ai',
        text: `I've updated your AI Agent design! ${simpleExplanation}`,
        timestamp: new Date(),
        explanationText: simpleExplanation,
      };
      setMessages((prev) => [...prev, aiMsg]);
    });
  };

  // Generate Agent Spec based on domain matching
  const generateAgentFromPrompt = (promptText: string) => {
    const lower = promptText.toLowerCase();

    let domain = 'Productivity & Automation';
    let intentTitle = 'Executive Summary & Alert Agent';
    let agentName = 'AI Executive Digest & Alert Agent';
    let summary = 'Monitors key communication streams, summarizes critical information, and delivers prioritized digests.';
    let purpose = 'Eliminate manual daily research and communication overload through autonomous AI summarization.';
    let responsibilities = [
      'Fetch unread inbox messages and communication channels every morning.',
      'Analyze message sentiment, importance, and pending action items.',
      'Generate bulleted executive summaries with direct action links.',
      'Deliver digest report directly to target team chat channels.',
    ];
    let capabilities = ['Natural Language Summarization', 'Action Item Extraction', 'Multi-channel Dispatch', 'Entity Recognition'];
    let integrations = ['Google Gmail API', 'Slack Webhook', 'Notion Workspace API'];
    let permissions = ['read:gmail_messages', 'send:slack_chat', 'write:notion_database'];
    let memoryStrategy = 'Short-term Contextual Buffer + Pinecone Vector Memory (30-day retention)';
    let triggerStrategy = 'Cron Schedule (Every Monday-Friday at 09:00 AM UTC)';
    let inputs = ['Gmail Inbox Feed', 'Notion Task Board'];
    let outputs = ['Slack Channel Report', 'Notion Summary Page'];

    if (lower.includes('github') || lower.includes('jira') || lower.includes('pr') || lower.includes('code')) {
      domain = 'Software Engineering & DevOps';
      intentTitle = 'Automated PR & Code Review Guardian';
      agentName = 'GitHub & Jira Engineering Assistant';
      summary = 'Monitors pull requests, performs automated security & style checks, and syncs sprint progress to Jira.';
      purpose = 'Accelerate code reviews and maintain clean Jira ticket synchronization without developer friction.';
      responsibilities = [
        'Scan incoming pull requests for security vulnerabilities and style diffs.',
        'Post inline review comments and summary feedback on GitHub PRs.',
        'Transition corresponding Jira issues to "In Review" or "Done" state.',
        'Alert technical lead on Slack when critical blocking bugs are detected.',
      ];
      capabilities = ['Static Code Analysis', 'Diff Parsing', 'Jira Issue Automation', 'Security Linting'];
      integrations = ['GitHub App Webhook', 'Jira REST API', 'Slack Developer Channel'];
      permissions = ['read:github_prs', 'write:github_comments', 'write:jira_status'];
      memoryStrategy = 'Repository State Cache (Redis) + Vector DB for past PR reviews';
      triggerStrategy = 'Real-time Webhook Event (`pull_request.opened`, `pull_request.synchronize`)';
      inputs = ['GitHub Pull Request Diff Payload', 'Jira Ticket Metadata'];
      outputs = ['GitHub Review Comment', 'Updated Jira Ticket State', 'Slack Security Alert'];
    } else if (lower.includes('customer') || lower.includes('support') || lower.includes('ticket') || lower.includes('zendesk')) {
      domain = 'Customer Experience & Support';
      intentTitle = 'Autonomous Support Triager';
      agentName = 'AI Customer Support Triager & Resolver';
      summary = 'Categorizes incoming support tickets, drafts intelligent responses, and escalates urgent issues.';
      purpose = 'Reduce customer support response times by automatically handling routine inquiries and triaging tickets.';
      responsibilities = [
        'Ingest customer support tickets from Zendesk and email.',
        'Perform sentiment analysis and priority assignment (P1-P4).',
        'Draft context-aware solutions using company knowledge base articles.',
        'Escalate high-priority or dissatisfied customer tickets directly to lead agents.',
      ];
      capabilities = ['Sentiment Analysis', 'Knowledge Base Search', 'Ticket Categorization', 'Response Drafting'];
      integrations = ['Zendesk API', 'Pinecone Vector Knowledge Base', 'Intercom Chat'];
      permissions = ['read:zendesk_tickets', 'write:zendesk_replies', 'read:knowledge_base'];
      memoryStrategy = 'Customer Interaction Timeline Memory + RAG Vector Store';
      triggerStrategy = 'Real-time Webhook Event (`ticket.created`)';
      inputs = ['Customer Support Ticket Payload', 'Knowledge Base Docs'];
      outputs = ['Drafted Support Resolution', 'Ticket Priority Tag', 'Escalation Alert'];
    }

    const detectedIntent: IntentDetectionResult = {
      primaryIntent: intentTitle,
      businessDomain: domain,
      expectedGoal: purpose,
      expectedOutcome: summary,
      confidenceScore: 96,
    };

    const extractedReqs: ExtractedRequirements = {
      goal: purpose,
      tasks: responsibilities,
      requiredIntegrations: integrations,
      requiredPermissions: permissions,
      requiredCapabilities: capabilities,
      inputs: inputs,
      outputs: outputs,
      unknownInformation: [],
    };

    const generatedSpec: AgentSpecification = {
      agentName,
      summary,
      purpose,
      responsibilities,
      capabilities,
      requiredIntegrations: integrations,
      permissions,
      memoryStrategy,
      triggerStrategy,
      expectedInputs: inputs,
      expectedOutputs: outputs,
      version: 1,
    };

    const fullReadiness: ReadinessChecklist = {
      goalUnderstood: true,
      requirementsComplete: true,
      integrationsSelected: true,
      permissionsIdentified: true,
      agentDesigned: true,
      readinessScore: 100,
      isReady: true,
    };

    const simpleExplanation = `Your ${agentName} will run on a ${triggerStrategy.toLowerCase()}. It connects to ${integrations.join(', ')} to automatically perform tasks like ${responsibilities[0].toLowerCase()}, giving you peace of mind with full security scoping (${permissions[0]}).`;

    setIntent(detectedIntent);
    setRequirements(extractedReqs);
    setAgentSpec(generatedSpec);
    setReadiness(fullReadiness);
    setExplanationText(simpleExplanation);

    const aiMsg: ChatMessage = {
      id: `a-gen-${Date.now()}`,
      role: 'ai',
      text: `I've designed your **${agentName}**! Here is a simple overview of what it does:\n\n"${simpleExplanation}"\n\nYou can review the complete specification on the right panel, ask me to make any tweaks, or deploy it immediately.`,
      timestamp: new Date(),
      explanationText: simpleExplanation,
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  const resetEngine = useCallback(() => {
    if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
    setMessages([]);
    setIntent(DEFAULT_INTENT);
    setRequirements(DEFAULT_REQUIREMENTS);
    setCurrentStage('idle');
    setActiveClarification(null);
    setAgentSpec(null);
    setExplanationText('');
    setReadiness(DEFAULT_READINESS);
    setEditHistory([]);
    setIsProcessing(false);
  }, []);

  return {
    messages,
    intent,
    requirements,
    currentStage,
    activeClarification,
    agentSpec,
    explanationText,
    readiness,
    editHistory,
    isProcessing,
    processUserInput,
    handleAnswerClarification,
    resetEngine,
  };
}
