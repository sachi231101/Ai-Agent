import type { AgentSpecification } from '../types';

export interface ProjectChangeLog {
  id: string;
  title: string;
  desc?: string;
  timestamp: string;
  isGitCommit?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: 'active' | 'draft' | 'deployed';
  lastModified: string;
  starred: boolean;
  previewType: 'agent-spec' | 'agent-playground';
  integrations: string[];
  changesLog: ProjectChangeLog[];
  spec: AgentSpecification;
}

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'customer-support-agent',
    name: 'Enterprise Support Agent',
    domain: 'Customer Operations & Support',
    description: 'Autonomous 24/7 customer support AI agent integrated with Zendesk, Pinecone RAG, and Slack escalation hooks.',
    status: 'deployed',
    lastModified: '5 mins ago',
    starred: true,
    previewType: 'agent-spec',
    integrations: ['Zendesk API', 'Pinecone Vector DB', 'Slack Webhooks', 'OpenAI GPT-4o'],
    changesLog: [
      {
        id: 'c1',
        title: 'Bound Pinecone RAG Knowledge Base retriever tool',
        desc: 'Configured vector embedding retrieval with top-k=5 chunk matching for technical doc resolution.',
        timestamp: '10m ago',
        isGitCommit: true,
      },
      {
        id: 'c2',
        title: 'Attached Sentiment Triage sub-agent',
        desc: 'Enabled automatic ticket escalation to #support-tier2 Slack channel when negative sentiment score > 0.85.',
        timestamp: '1h ago',
        isGitCommit: true,
      },
      {
        id: 'c3',
        title: 'Updated Zendesk OAuth credentials & Webhook triggers',
        desc: 'Validated secure connection to production Zendesk workspace.',
        timestamp: '2h ago',
        isGitCommit: true,
      },
    ],
    spec: {
      agentName: 'SupportBot Pro',
      version: '2.1.0',
      description: 'Autonomous multi-agent system handling tier-1 customer inquiries, knowledge retrieval, and automatic Zendesk ticket escalation.',
      systemPrompt: 'You are SupportBot Pro, an enterprise customer support agent for Vibe Agent platform. Answer user technical questions using the vector RAG store, assess customer sentiment, and update Zendesk tickets appropriately.',
      model: 'gpt-4o',
      temperature: 0.3,
      maxTokens: 4096,
      memoryType: 'vector_rag',
      responsibilities: [
        'Answer tier-1 technical support inquiries using knowledge base',
        'Analyze user sentiment and detect urgent support issues',
        'Create and update Zendesk support tickets',
        'Escalate high-priority issues to Slack #support-escalations'
      ],
      capabilities: [
        'Semantic RAG Search',
        'Multi-turn Conversation Memory',
        'Sentiment & Urgency Scoring',
        'Webhook Payload Processing'
      ],
      requiredIntegrations: ['Zendesk API', 'Pinecone Vector Store', 'Slack API'],
      tools: [
        { id: 't1', name: 'rag_kb_search', type: 'vector_search', enabled: true, config: { index: 'kb-docs-v2', topK: 5 } },
        { id: 't2', name: 'zendesk_ticket_update', type: 'rest_api', enabled: true, config: { endpoint: 'https://zendesk.vibeagent.io/api/v2' } },
        { id: 't3', name: 'slack_escalate_alert', type: 'webhook', enabled: true, config: { channel: '#support-tier2' } }
      ],
      subAgents: ['SentimentTriageAgent', 'EscalationBot', 'KnowledgeRetriever']
    }
  },
  {
    id: 'financial-analyst-agent',
    name: 'Financial & SEC RAG Analyst',
    domain: 'Financial Intelligence',
    description: 'Autonomous financial intelligence agent parsing SEC 10-K filings, Yahoo Finance market data, and executing quantitative Python analyses.',
    status: 'active',
    lastModified: '1 hour ago',
    starred: true,
    previewType: 'agent-spec',
    integrations: ['SEC EDGAR API', 'Yahoo Finance API', 'Python Code Sandbox', 'Claude 3.5 Sonnet'],
    changesLog: [
      {
        id: 'f1',
        title: 'Enabled Python Code Interpreter for ratio calculations',
        desc: 'Bound isolated Docker sandbox tool for executing NumPy financial ratio models.',
        timestamp: '30m ago',
        isGitCommit: false,
      },
      {
        id: 'f2',
        title: 'Indexed Q3 Tech Sector SEC Filings',
        desc: 'Loaded 10-K & 10-Q report embeddings into financial vector store.',
        timestamp: '2h ago',
        isGitCommit: true,
      }
    ],
    spec: {
      agentName: 'FinAnalyst AI',
      version: '1.5.0',
      description: 'Deep financial research agent capable of executing Python scripts for quantitative valuation and balance sheet audit.',
      systemPrompt: 'You are FinAnalyst AI, a financial intelligence agent specializing in balance sheet metrics, valuation multiples, and SEC filing synthesis.',
      model: 'claude-3-5-sonnet',
      temperature: 0.1,
      maxTokens: 8192,
      memoryType: 'hierarchical_vector',
      responsibilities: [
        'Retrieve and summarize SEC 10-K and 10-Q corporate filings',
        'Fetch real-time stock quotes & market metrics',
        'Execute Python scripts to calculate DCF models and valuation ratios'
      ],
      capabilities: [
        'SEC Filing Parser',
        'Python Quantitative Sandbox',
        'Financial Table Extraction',
        'Automated Executive Summary Generation'
      ],
      requiredIntegrations: ['SEC EDGAR API', 'Yahoo Finance', 'Python Sandbox'],
      tools: [
        { id: 't4', name: 'sec_edgar_fetch', type: 'api', enabled: true, config: {} },
        { id: 't5', name: 'python_evaluator', type: 'code_sandbox', enabled: true, config: {} }
      ],
      subAgents: ['RatioCalculatorAgent', 'ReportSynthesizer']
    }
  },
  {
    id: 'sales-lead-orchestrator',
    name: 'Sales Lead Qualification Workflow',
    domain: 'CRM & Sales Automation',
    description: 'Multi-agent DAG pipeline scoring inbound leads from HubSpot, enriching firmographics via Clearbit, and drafting automated outreach.',
    status: 'active',
    lastModified: '3 hours ago',
    starred: false,
    previewType: 'agent-spec',
    integrations: ['HubSpot CRM', 'Clearbit API', 'SendGrid Mailer', 'Gmail OAuth'],
    changesLog: [
      {
        id: 's1',
        title: 'Updated lead scoring algorithm threshold',
        desc: 'Adjusted ICP qualification score criteria for B2B Enterprise accounts.',
        timestamp: '1h ago',
        isGitCommit: false,
      }
    ],
    spec: {
      agentName: 'LeadScorer Pro',
      version: '1.0.4',
      description: 'Inbound lead enrichment & automated email sequence orchestrator.',
      systemPrompt: 'Evaluate inbound lead data against ideal customer profile (ICP) parameters and auto-trigger personalized email outreach.',
      model: 'gpt-4o-mini',
      temperature: 0.4,
      maxTokens: 2048,
      memoryType: 'session_cache',
      responsibilities: [
        'Extract company information via Clearbit API',
        'Score lead quality on a 0-100 ICP alignment scale',
        'Draft and queue personalized outreach emails in SendGrid'
      ],
      capabilities: [
        'HubSpot Webhook Trigger',
        'Firmographic Enrichment',
        'Lead Qualification Scoring',
        'SendGrid Email Automation'
      ],
      requiredIntegrations: ['HubSpot', 'Clearbit', 'SendGrid'],
      tools: [
        { id: 't6', name: 'clearbit_enrichment', type: 'api', enabled: true, config: {} },
        { id: 't7', name: 'sendgrid_email_sender', type: 'action', enabled: true, config: {} }
      ],
      subAgents: ['ClearbitEnricher', 'OutreachDrafter']
    }
  },
  {
    id: 'devops-sre-agent',
    name: 'SRE Incident Triage Agent',
    domain: 'DevOps & Cloud Infrastructure',
    description: 'Autonomous SRE agent monitoring Datadog metric spikes, PagerDuty alerts, and running diagnostic kubectl troubleshooting scripts.',
    status: 'draft',
    lastModified: 'Yesterday',
    starred: false,
    previewType: 'agent-spec',
    integrations: ['Datadog Monitor', 'PagerDuty Webhook', 'Kubernetes kubectl', 'GitHub Actions'],
    changesLog: [
      {
        id: 'd1',
        title: 'Added Kubernetes pod log inspection diagnostic tool',
        desc: 'Configured automated log tailing and exception pattern detection.',
        timestamp: 'Yesterday',
        isGitCommit: true,
      }
    ],
    spec: {
      agentName: 'OpsTriage Agent',
      version: '0.9.0',
      description: 'Autonomous incident diagnosis and Kubernetes cluster log triage agent.',
      systemPrompt: 'Diagnose infrastructure alerts, query pod logs, find exception traces, and post root-cause summaries to Slack #incident-room.',
      model: 'gpt-4o',
      temperature: 0.1,
      maxTokens: 4096,
      memoryType: 'short_term_event_log',
      responsibilities: [
        'Catch Datadog & PagerDuty alert webhooks',
        'Query Kubernetes cluster logs via kubectl',
        'Generate incident root-cause analysis reports'
      ],
      capabilities: [
        'K8s Pod Log Inspection',
        'Alert Payload Parsing',
        'Incident Remediation Recommendation'
      ],
      requiredIntegrations: ['Datadog API', 'PagerDuty API', 'Kubernetes API'],
      tools: [
        { id: 't8', name: 'kubectl_logs_fetch', type: 'cli', enabled: true, config: {} },
        { id: 't9', name: 'datadog_metrics_query', type: 'api', enabled: true, config: {} }
      ],
      subAgents: ['LogAnalyzerAgent', 'IncidentReporter']
    }
  }
];
