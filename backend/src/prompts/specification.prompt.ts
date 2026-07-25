import { PlanResult } from './planner.prompt';
import { RequirementsResult } from './requirements.prompt';

export interface SpecificationResult {
  version: string;
  metadata: {
    name: string;
    description: string;
    category: string;
    author: string;
    businessObjective: string;
  };
  trigger: {
    type: 'SCHEDULED' | 'WEBHOOK' | 'EVENT' | 'MANUAL';
    config: {
      schedule?: string;
      detail?: string;
    };
  };
  memory: {
    shortTerm: boolean;
    longTerm: boolean;
    vectorStoreNeeded: boolean;
    description: string;
  };
  workflow: {
    steps: Array<{
      id: string;
      name: string;
      action: string;
      provider: string;
      parameters: Record<string, any>;
      onFailure: 'RETRY' | 'CONTINUE' | 'STOP';
    }>;
  };
  tools: Array<{
    name: string;
    type: string;
    config: Record<string, any>;
  }>;
  permissions: string[];
  environmentVariables: string[];
  riskAnalysis: Array<{
    title: string;
    level: string;
    mitigation: string;
  }>;
  estimatedMonthlyCost: {
    llmTokensUsd: number;
    apiCallsUsd: number;
    totalUsd: number;
  };
  improvementSuggestions: string[];
}

export const buildSpecificationPrompt = (
  plan: PlanResult,
  requirements: RequirementsResult
): string => {
  return `You are a Principal AI Systems Architect compiling an executable Agent Specification JSON.

PLAN DETAILS:
${JSON.stringify(plan, null, 2)}

REQUIREMENTS DETAILS:
${JSON.stringify(requirements, null, 2)}

YOUR TASK:
Compile a complete, enterprise-grade Agent Specification JSON that details the entire architecture, workflow steps, triggers, memory configuration, environment variables, security permissions, risk analysis, and estimated monthly cost.

Respond strictly with a JSON object matching this structure:
{
  "version": "1.0.0",
  "metadata": {
    "name": "${plan.name || 'AI Solution Agent'}",
    "description": "${plan.description || 'Autonomous AI Solution Agent'}",
    "category": "Automation",
    "author": "Vibe Agents AI Architect",
    "businessObjective": "Automate processes and improve operational efficiency"
  },
  "trigger": {
    "type": "SCHEDULED",
    "config": {
      "schedule": "0 8 * * *",
      "detail": "Every morning at 8:00 AM"
    }
  },
  "memory": {
    "shortTerm": true,
    "longTerm": true,
    "vectorStoreNeeded": false,
    "description": "Deduplicate processed records across runs"
  },
  "workflow": {
    "steps": [
      {
        "id": "step-1",
        "name": "Fetch Data",
        "action": "fetch_unread",
        "provider": "Primary Integration",
        "parameters": {},
        "onFailure": "RETRY"
      }
    ]
  },
  "tools": [
    {
      "name": "Data Reader",
      "type": "INTEGRATION",
      "config": {}
    }
  ],
  "permissions": ["Read Scope", "Send Permission"],
  "environmentVariables": ["API_KEY", "CLIENT_SECRET"],
  "riskAnalysis": [
    {
      "title": "API Rate Throttling",
      "level": "LOW",
      "mitigation": "Exponential backoff enabled"
    }
  ],
  "estimatedMonthlyCost": {
    "llmTokensUsd": 2.50,
    "apiCallsUsd": 0.50,
    "totalUsd": 3.00
  },
  "improvementSuggestions": [
    "Enable automated failure retry policies",
    "Archive processed records to database"
  ]
}

CRITICAL RULES:
1. Return ONLY the JSON object.`;
};
